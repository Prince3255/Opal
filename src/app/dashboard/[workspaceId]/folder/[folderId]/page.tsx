import { getFodlerInfo, getFolderVideos } from "@/app/action/workspace";
import FolderInfo from "@/components/global/folder/folder-info";
import Video from "@/components/global/video";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";

export const dynamic = 'force-dynamic'

type Props = {
  params: {
    workspaceId: string;
    folderId: string;
  };
};

const page = async ({ params: { folderId, workspaceId } }: Props) => {
  const query = new QueryClient();
  await query.prefetchQuery({
    queryKey: ["folder-video"],
    queryFn: () => getFolderVideos(folderId),
  });

  await query.prefetchQuery({
    queryKey: ["folder-info"],
    queryFn: () => getFodlerInfo(folderId)
  })
  
  return <HydrationBoundary state={dehydrate(query)}>
    <FolderInfo folderId={folderId} />
    <Video folderId={folderId} workspaceId={workspaceId} videoKey='folder-video' />
  </HydrationBoundary>;
};

export default page;
