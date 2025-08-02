"use client";

import {
  editVideo,
  getPreviewVideo,
  sendEmailForFirstView,
} from "@/app/action/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import { VideoProps } from "@/type/index.type";
import React, { useEffect, useState } from "react";
import CopyLink from "../copy-link";
import { Download } from "lucide-react";
import RichLink from "../rich-link";
import { truncateString } from "@/lib/utils";
import TabMenu from "../../tab";
import AiTools from "../../ai-tools";
import VideoTranscript from "../../video-transcript";
import Activities from "../../activity";
// import EditVideo from "../edit-video";
import Loader from "../../loader";
import { Input } from "@/components/ui/input";
import { useMutationData, useMutationDataState } from "@/hooks/useMutationData";
import { toast } from "sonner";

type Props = {
  videoId: string;
};

const VideoPreview = ({ videoId }: Props) => {
  const [onRenameT, setOnRenameT] = useState(false);
  const [onRenameD, setOnRenameD] = useState(false);
  const [activeTab, setActiveTab] = useState("Ai Tools");

  const { data } = useQueryData(["preview-video"], () =>
    getPreviewVideo(videoId)
  );

  const Rename = () => {
    if (onRenameT) {
      setOnRenameT(false);
    } else {
      setOnRenameD(false);
    }
  };

  const notifyFisrtView = async () => await sendEmailForFirstView(videoId);

  const { status, author, data: video } = data as VideoProps;

  const daysAgo = Math.floor(
    (new Date().getTime() - video?.createdAt.getTime()) / (24 * 60 * 60 * 1000)
  );

  useEffect(() => {
    if (video?.views === 0) {
      notifyFisrtView();
    }

    // return () => {
    //   notifyFisrtView()
    // }
  }, []);

  const { mutate, isPending } = useMutationData(
    ["rename-video"],
    (data: { title: string; description: string }) =>
      editVideo(videoId, data?.title, data?.description),
    "preview-video",
    Rename
  );

  const { latestVariables } = useMutationDataState(["rename-video"]);

  const handleDoubleClick = (
    e: React.MouseEvent<HTMLDivElement | HTMLParagraphElement>,
    type: string
  ) => {
    e.stopPropagation();
    if (type === "title") {
      setOnRenameT(true);
    } else if (type === "description") {
      setOnRenameD(true);
    }
  };

  const updateVideoDetail = (
    e: React.FocusEvent<HTMLInputElement>,
    type: string
  ) => {
    e.stopPropagation();
    let value = e.target.value;
    if (value) {
      if (type === "title") {
        mutate({ title: value, description: video?.description });
      } else if (type === "description") {
        mutate({ title: video?.title, description: value });
      } else {
        console.error("Edit type not defined");
      }
    } else {
      setOnRenameT(false);
      setOnRenameD(false);
      toast(`There should be any content in ${type}`);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 lg:py-10 gap-5">
      <div className="flex flex-col lg:col-span-2 gap-y-10">
        <div>
          <div className="flex gap-x-5 items-start justify-between">
            {onRenameT ? (
              <Input
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                  updateVideoDetail(e, "title");
                }}
                autoFocus
                defaultValue={video?.title}
              />
            ) : (
              <h2
                className="text-white text-4xl font-bold"
                onClick={(e) => e.stopPropagation()}
                onDoubleClick={(e) => handleDoubleClick(e, "title")}
              >
                {isPending && onRenameT
                  ? latestVariables && latestVariables?.status === "pending"
                    ? latestVariables?.variables?.title
                    : video?.title
                  : video?.title}
              </h2>
            )}
            {/* {author ? (
              <EditVideo
                videoId={videoId}
                title={video?.title as string}
                description={video?.description as string}
              />
            ) : (
              <></>
            )} */}
          </div>
          <span className="flex gap-x-3 mt-2">
            <p className="text-[#9D9D9D] capitalize">
              {video?.User?.firstname} {video?.User?.lastname}
            </p>
            <p className="text-[#707070]">
              {daysAgo === 0 ? "Today" : `${daysAgo}d ago`}
            </p>
          </span>
        </div>
        <video
          preload="metadata"
          className="w-full aspect-video opacity-50 rounded-xl"
          controls
        >
          {/* <source
            src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${video?.source}#1`}
          /> */}
          <source src={`${video?.source}`} />
        </video>
        <div className="flex flex-col text-2xl gap-y-4">
          <div className="flex gap-x-5 items-center justify-between">
            <p className="text-[#BDBDBD] text-semibold">Description</p>
            {/* {author ? (
              <EditVideo
                videoId={videoId}
                title={video.title as string}
                description={video.description as string}
              />
            ) : (
              <></>
            )} */}
          </div>
          {onRenameD ? (
            <Input
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                updateVideoDetail(e, "description");
              }}
              autoFocus
              defaultValue={video?.description}
            />
          ) : (
            <p
              className="text-[#9D9D9D] text-lg text-medium"
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={(e) => handleDoubleClick(e, "description")}
            >
              {isPending && onRenameD
                ? latestVariables && latestVariables?.status === "pending"
                  ? latestVariables?.variables?.description
                  : video?.description
                : video?.description}
            </p>
          )}
        </div>
      </div>
      <div className="lg:col-span-1 flex flex-col gap-y-16">
        <div className="flex justify-end gap-x-3 items-center">
          <CopyLink
            variant="outline"
            className="rounded-full bg-transparent px-10"
            videoId={videoId}
          />
          <RichLink
            title={video?.title as string}
            description={truncateString(video?.description as string, 150)}
            source={video?.source}
            id={videoId}
          />
          <Download className="text-[#4d4c4c]" />
        </div>
        <div>
          <TabMenu
            value={activeTab}
            defaultValue="Ai Tools"
            onValueChange={setActiveTab}
            triggers={["Ai Tools", "Transcript", "Activity"]}
          >
            <AiTools
              plan={video?.User?.subscription?.plan}
              trial={video?.User?.trial!}
              videoId={videoId}
              videoUrl={video?.source}
              clerkId={video?.User?.id}
              goToTranscript={() => setActiveTab("Transcript")}
            />
            <VideoTranscript transcript={video?.summery} />
            <div className="overflow-y-scroll max-h-[80vh] scrollbar-thin">
              <Activities
                author={video?.User?.firstname as string}
                videoId={videoId}
              />
            </div>
          </TabMenu>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
