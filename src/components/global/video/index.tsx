'use client'

import { getFolderVideos } from "@/app/action/workspace";
import VideoRecorderDuotone from "@/components/icons/video-recorder-duotone";
import { useQueryData } from "@/hooks/useQueryData";
import { cn } from "@/lib/utils";
import { VideoProps } from "@/type/index.type";
import React from "react";
import VideoCard from "./video-card";

type Props = {
  folderId: string;
  workspaceId: string;
  videoKey: string;
};

const Video = ({ folderId, workspaceId, videoKey }: Props) => {
  const { data: videoData } = useQueryData([videoKey], () =>
    getFolderVideos(folderId)
  );

  const { status: videoStatus, data: videos } = videoData as VideoProps;


  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <VideoRecorderDuotone />
          <h2 className="text-[#BdBdBd] text-xl">Videos</h2>
        </div>
      </div>
      <section
        className={cn(
          videoStatus !== 200
            ? "p-5"
            : "grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        )}
      >
        {videoStatus === 200 ? (
          videos.map((video, index) => (
            <VideoCard key={index} workspaceId={workspaceId} {...video} userId={video.User?.id || null} />
          ))
        ) : (
          <p className="text-[#BDBDBD]"> No videos in workspace</p>
        )}
      </section>
    </div>
  );
};

export default Video;
