import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useMoveVideos } from "@/hooks/useFolders";
import React from "react";

type Props = {
  videoId: string;
  currentFolderName?: string;
  currentWorkspace?: string;
  currentFolder?: string;
};

const ChangeVideoLocation = ({
  currentFolder,
  currentWorkspace,
  videoId,
  currentFolderName,
}: Props) => {
  const {
    register,
    isPending,
    onFormSubmit,
    workspaces,
    isFetching,
    isFolders,
    errors,
  } = useMoveVideos(videoId, currentWorkspace!, currentFolder);

  const workspace = workspaces.find((w) => w.id === currentWorkspace);  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(e);
  };

  const handleButtonClick = () => {
    try {
      onFormSubmit();
    } catch (error) {
      console.error('Error calling onFormSubmit:', error);
    }
  };

  return (
    <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
      <div className="border-[1px] rounded-xl p-5">
        <h2 className="text-xs text-[#a4a4a4]">Current Workspace</h2>
        {workspace && <p>{workspace.name}</p>}
        <h2 className="text-xs text-[#a4a4a4] mt-4">Current Folder</h2>
        {currentFolderName ? <p>{currentFolderName}</p> : 'This video has no folder'}
      </div>
      <Separator orientation="horizontal" />
      <div className="flex flex-col gap-y-5 p-5 border-[1px] rounded-xl">
        <h2 className="text-xs text-[#a4a4a4]">To</h2>
        <Label className="flex-col gap-y-2 flex">
          <p className="text-xs">Workspace</p>
          <select className="rounded-xl text-base bg-transparent" {...register('workspace_id')}>
          {workspaces.map((space) => (
              <option
                key={space.id}
                className="text-[#a4a4a4]"
                value={space.id}
              >
                {space.name}
              </option>
            ))}
          </select>
        </Label>
        {isFetching && isFolders === undefined ? (
          <Skeleton className="w-full h-[40px] rounded-xl" />
        ) : (
          <Label className="flex flex-col gap-y-2">
            <p className="text-xs">Folders in this workspace</p>
            {isFolders && isFolders.length > 0 ? (
              <select {...register('folder_id')} className="rounded-xl bg-transparent text-base">
                <option value="" className="text-[#a4a4a4]">
                  No folder
                </option>
                {isFolders.map((folder) => (
                  <option value={folder.id} key={folder.id} className="text-[#a4a4a4]">
                    {folder.name}
                  </option>
                ))}
              </select>
            ) : (
              <div className="flex flex-col gap-y-2">
                <p className="text-[#a4a4a4]">
                  This workspace has no folders. Video will be moved to workspace root.
                </p>
                <input 
                  type="hidden" 
                  {...register('folder_id')} 
                  value="" 
                />
              </div>
            )}
          </Label>
        )}
      </div>
      {/* {errors && Object.keys(errors).length > 0 && (
        <div className="text-red-500 text-sm">
          {Object.entries(errors).map(([field, error]) => (
            <p key={field}>{field}: {String(error?.message || 'Invalid field')}</p>
          ))}
        </div>
      )} */}
      <Button 
        type="button" 
        disabled={isPending}
        onClick={handleButtonClick}
      >
        <Loader state={isPending} color="#000">
          Transfer
        </Loader>
      </Button>
    </form>
  );
};

export default ChangeVideoLocation;




// import { Links } from "@/components/icons";import { Button } from "@/components/ui/button";import React from "react";import { toast } from "sonner";type Props = {  videoId: string;  className?: string;  variant?:    | "default"    | "destructive"    | "outline"    | "secondary"    | "ghost"    | "link"    | null;};const CopyLink = ({ videoId, className, variant }: Props) => {  const onCopyClipboard = () => {    navigator.clipboard.writeText(      `${process.env.NEXT_PUBLIC_HOST_URL}/preview/${videoId}`    );    toast("Copied", { description: "Link successfully copied" });  };  return (    <Button variant={variant} onClick={onCopyClipboard} className={className}>      <Links />    </Button>  );};export default CopyLink;