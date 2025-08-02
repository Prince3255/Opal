import { getUserProfile } from "@/app/action/user";
import { getPreviewVideo, getVideoComments } from "@/app/action/workspace";
import VideoPreview from "@/components/global/video/preview";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";

type Props = {
  params: {
    videoId: string;
  };
};

const VideoPage = async ({ params: { videoId } }: Props) => {
    const query = new QueryClient()

    await query.prefetchQuery({
        queryKey: ['preview-video'],
        queryFn: () => getPreviewVideo(videoId)
    })

    await query.prefetchQuery({
      queryKey: ['video-comments'],
      queryFn: () => getVideoComments(videoId)
    })

    await query.prefetchQuery({
      queryKey: ['user-profile'],
      queryFn: () => getUserProfile()
    })
    
  return <HydrationBoundary state={dehydrate(query)}>
    <div className="px-10">
        <VideoPreview videoId={videoId} />
    </div>
  </HydrationBoundary>;
};

export default VideoPage;
