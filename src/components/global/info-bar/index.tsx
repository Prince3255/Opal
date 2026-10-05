import { getUserProfile, searchAll } from "@/app/action/user";
import VideoRecorderIcon from "@/components/icons/video-recorder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQueryData } from "@/hooks/useQueryData";
import { UserButton } from "@clerk/nextjs";
import { Folder, Search, UploadIcon, Users, Video } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Spinner from "../loader/spinner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useDebounce } from "@/hooks/useDebounce";
import Loader from "../loader";
import Link from "next/link";

type Props = {};

type Search = {
  folders: { id: string; name: string; workSpaceId: string }[];
  videos: { id: string; title: string; workSpaceId: string }[];
  workspace: { id: string; name: string }[];
};

const InfoBar = (props: Props) => {
  const { data, isFetching } = useQueryData(["user-profile"], getUserProfile);
  const [uploading, setUplaoding] = useState(false);
  const [isResultAvailable, setIsResultAvailable] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // const { user12 } = useSelector((state: any) => state.user);
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();
  if (isFetching || !data) {
    <Spinner />;
  }
  const debounceQuery = useDebounce(searchQuery, 400);
  const { data: searchResult, isFetching: isSearching } = useQuery<Search>({
    queryKey: ["search", debounceQuery],
    queryFn: async (): Promise<Search> => {
      if (!debounceQuery) throw new Error("No search query provided");
      const result = await searchAll(debounceQuery as string);
      return {
        ...result,
        folders: (result.folders || []).map((folder: any) => ({
          ...folder,
          workSpaceId: folder.workSpaceId ?? "",
        })),
        videos: (result.videos || []).map((video: any) => ({
          ...video,
          title: video.title ?? "",
          workSpaceId: video.workSpaceId ?? "",
        })),
      };
    },
    enabled: !!debounceQuery,
  });

  useEffect(() => {
    if (searchQuery) {
      setIsResultAvailable(true);
    } else {
      setIsResultAvailable(false);
    }
  }, [searchQuery]);

  const { status, data: user } = (data || {}) as {
    status: number;
    data: {
      id: string;
      image: string;
      clerkid: string;
      subscription: { plan: string };
      workspace: { id: string }[];
    };
  };

  const handleClick = () => {
    (fileInputRef.current as HTMLInputElement | null)?.click();
  };

  // const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   try {
  //     setUplaoding(true);
  //     const MAX_FILE_SIZE = 100 * 1024 * 1024;

  //     const file = e.target.files?.[0];

  //     if (!file) return;

  //     if (file.size > MAX_FILE_SIZE) {
  //       toast.error("Video must be smaller than 100 MB");
  //       e.target.value = "";
  //       setUplaoding(false);
  //       return;
  //     }

  //     const formData = new FormData();

  //     if (file) {
  //       formData.append("file", file);
  //       formData.append("userId", user?.id);
  //       formData.append("clerkId", user?.clerkid);
  //       formData.append("plan", user?.subscription?.plan);
  //       formData.append("workspaceId", user?.workspace[0]?.id);
  //       let res = await fetch(
  //         "https://opal-express-08so.onrender.com/api/upload",
  //         {
  //           method: "POST",
  //           body: formData,
  //         },
  //       );

  //       if (!res.ok) {
  //         const errorText = await res.text();
  //         console.error("Upload failed:", res.status, errorText);
  //         throw new Error(`Upload failed with status ${res.status}`);
  //       }

  //       let data = await res.json();
  //       if (data.status === 200) {
  //         toast(data?.message);
  //         queryClient.invalidateQueries({ queryKey: ["user-videos"] });
  //       }
  //     }
  //   } catch (error: any) {
  //     console.log("Error while uploading", error);
  //     if (error && typeof error.message === "string") {
  //       toast(error.message || "Something went wrong");
  //     } else {
  //       toast("Something went wrong");
  //     }
  //   } finally {
  //     setUplaoding(false);
  //   }
  // };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const MAX_FILE_SIZE = 500 * 1024 * 1024;

    try {
      setUplaoding(true);

      if (file.size > MAX_FILE_SIZE) {
        throw new Error("Video must be smaller than 500 MB");
      }

      const userId = user?.id;
      const clerkId = user?.clerkid;
      const plan = user?.subscription?.plan ?? "";
      const workspaceId = user?.workspace?.[0]?.id;

      if (!userId || !clerkId || !workspaceId) {
        throw new Error("Missing user or workspace information");
      }

      const formData = new FormData();

      formData.append("file", file);
      formData.append("userId", userId);
      formData.append("clerkId", clerkId);
      formData.append("plan", plan);
      formData.append("workspaceId", workspaceId);

      const response = await fetch(
        "https://opal-express-08so.onrender.com/api/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const responseText = await response.text();

      let result: {
        status?: number;
        message?: string;
        videoUrl?: string;
      };

      try {
        result = JSON.parse(responseText);
      } catch {
        console.error(
          "Server returned invalid JSON:",
          response.status,
          responseText.slice(0, 500),
        );

        throw new Error(`Upload server returned HTTP ${response.status}`);
      }

      if (!response.ok) {
        throw new Error(
          result.message || `Upload failed with status ${response.status}`,
        );
      }

      toast.success(result.message || "Video uploaded successfully");

      await queryClient.invalidateQueries({
        queryKey: ["user-videos"],
      });
    } catch (error) {
      console.error("Error while uploading:", error);

      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setUplaoding(false);
      e.target.value = "";
    }
  };

  return (
    <header className="pl-20 md:pl-[265px] fixed p-4 w-full flex items-center justify-between gap-4">
      <Popover open={isResultAvailable} onOpenChange={setIsResultAvailable}>
        <PopoverTrigger asChild>
          <div className="flex gap-4 justify-center items-center border-2 rounded-full px-4 w-full max-w-screen-xl">
            <Search size={25} className="text-[#707070]" />
            <Input
              placeholder="Search for folders, videos & workspaces "
              aria-label="Search for folders, videos & workspaces "
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              className="border-none focus-visible:ring-0"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="w-[60vw] max-w-screen-xl mt-1 p-0"
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {isSearching && (
            <div className="p-4 flex items-center gap-2 text-muted-foreground">
              <Loader state={isSearching} /> Searching...
            </div>
          )}
          {!isSearching && searchResult && (
            <div className="p-2 max-h-[70vh] overflow-auto">
              {searchResult.folders.length === 0 &&
              searchResult.videos.length === 0 &&
              searchResult.workspace.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No results found.
                </div>
              ) : (
                <>
                  {searchResult.folders.length > 0 && (
                    <div className="text-xs font-semibold text-muted-foreground p-2">
                      Folders
                    </div>
                  )}
                  {searchResult.folders.map((folder) => (
                    <Link
                      key={folder.id}
                      href={`/dashboard/${folder.workSpaceId}/folder/${folder.id}`}
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
                    >
                      <Folder size={16} />
                      {folder.name}
                    </Link>
                  ))}

                  {searchResult.videos.length > 0 && (
                    <div className="text-xs font-semibold text-muted-foreground p-2 mt-2">
                      Videos
                    </div>
                  )}
                  {searchResult.videos.map((video) => (
                    <Link
                      key={video.id}
                      href={`/dashboard/${video.workSpaceId}/video/${video.id}`}
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
                    >
                      <Video size={16} />
                      {video.title}
                    </Link>
                  ))}

                  {searchResult.workspace.length > 0 && (
                    <div className="text-xs font-semibold text-muted-foreground p-2 mt-2">
                      Workspaces
                    </div>
                  )}
                  {searchResult.workspace.map((ws) => (
                    <Link
                      key={ws.id}
                      href={`/dashboard/${ws.id}`}
                      className="flex items-center gap-2 p-2 rounded-md hover:bg-accent"
                    >
                      <Users size={16} />
                      {ws.name}
                    </Link>
                  ))}
                </>
              )}
            </div>
          )}
        </PopoverContent>
      </Popover>
      <div className="flex items-center gap-4">
        <Button
          className={`bg-[#9D9D9D] flex items-center gap-2 ${
            uploading ? "cursor-not-allowed disabled" : ""
          } `}
          onClick={handleClick}
          disabled={uploading}
        >
          <UploadIcon size={20} />{" "}
          <span className="flex items-center gap-2">
            {uploading ? "Uploading..." : "Upload"}
          </span>
          <Input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleChange}
            accept="video/*"
          />
        </Button>
        {/* <Button className="bg-[#9D9D9D] flex items-center gap-2">
          <VideoRecorderIcon />{" "}
          <span className="flex items-center gap-2">Record</span>
        </Button> */}
        <UserButton />
      </div>
    </header>
  );
};

export default InfoBar;
