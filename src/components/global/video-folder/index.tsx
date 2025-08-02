// "use client"

// import { getAllUserVideos } from "@/app/action/workspace"
// import VideoRecorderDuotone from "@/components/icons/video-recorder-duotone"
// import { useQueryData } from "@/hooks/useQueryData"
// import { cn } from "@/lib/utils"
// import Video from "./video"

// type Props = {
//   workspaceId: string
// }

// type videoProp = {
//   status: number
//   data: {
//     id: string
//     title: string
//     createdAt: Date
//     source: string
//     processing: boolean
//     Folder: {
//       id: string
//       name: string
//     }
//     WorkSpace: {
//       id: string
//       name: string
//     }
//     User: {
//       firstname: string
//       lastname: string
//       image: string
//       id: string
//     }
//   }
// }

// const VideoCard = ({ workspaceId }: Props) => {
//   const { data, isFetched } = useQueryData(["user-videos"], () => getAllUserVideos(workspaceId))

//   if (!data || !isFetched) {
//     return ""
//   }

//   const { status, data: videoData } = data as videoProp

//   return (
//     <div className="flex flex-col gap-4 sm:gap-6">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center gap-3 sm:gap-4">
//           <VideoRecorderDuotone />
//           <h2 className="text-lg sm:text-xl text-[#BDBDBD]">Recent Videos</h2>
//         </div>
//       </div>

//       <div
//         className={cn(
//           "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6",
//           status !== 200 ? "flex justify-center items-center min-h-[200px]" : "",
//         )}
//       >
//         {status !== 200 ? (
//           <p className="text-neutral-300 text-center col-span-full">No video found</p>
//         ) : (
//           <>
//             {Array?.isArray(videoData) ? (
//               videoData?.map((video, index) => (
//                 <Video
//                   key={index}
//                   id={video.id}
//                   title={video.title}
//                   source={video?.source}
//                   processing={video.processing}
//                   workspaceId={video.WorkSpace.id}
//                   workspaceName={video.WorkSpace.name}
//                   folderId={video?.Folder?.id}
//                   currentFolderName={video?.Folder?.name}
//                   firstname={video?.User?.firstname}
//                   lastname={video?.User?.lastname}
//                   image={video?.User?.image}
//                   userId={video?.User?.id}
//                   createdAt={video?.createdAt}
//                 />
//               ))
//             ) : (
//               <Video
//                 id={videoData.id}
//                 title={videoData.title}
//                 source={videoData.source}
//                 processing={videoData.processing}
//                 workspaceId={videoData.WorkSpace.id}
//                 workspaceName={videoData.WorkSpace.name}
//                 folderId={videoData.Folder.id}
//                 currentFolderName={videoData.Folder.name}
//                 firstname={videoData.User.firstname}
//                 lastname={videoData.User.lastname}
//                 image={videoData.User.image}
//                 userId={videoData.User.id}
//                 createdAt={videoData.createdAt}
//               />
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

// export default VideoCard

"use client";
import { getAllUserVideos } from "@/app/action/workspace";
import VideoRecorderDuotone from "@/components/icons/video-recorder-duotone";
import { useQueryData } from "@/hooks/useQueryData";
import { cn } from "@/lib/utils";
import React from "react";
import Video from "./video";
type Props = { workspaceId: string };
type videoProp = {
  status: number;
  data: {
    id: string;
    title: string;
    createdAt: Date;
    source: string;
    processing: boolean;
    Folder: { id: string; name: string };
    WorkSpace: { id: string; name: string };
    User: { firstname: string; lastname: string; image: string; id: string };
  };
};
const videoCard = ({ workspaceId }: Props) => {
  const { data, isFetched } = useQueryData(["user-videos"], () =>
    getAllUserVideos(workspaceId)
  );
  if (!data || !isFetched) {
    return "";
  }
  const { status, data: videoData } = data as videoProp;
  return (
    // <div className="flex flex-col gap-4">
      
    //   <div className="flex justify-between items-center">
        
    //     <div className="flex items-center gap-4">
    //       <VideoRecorderDuotone />
    //       <h2 className="text-xl text-[#BDBDBD]">Recent Videos</h2>
    //     </div>
    //   </div>
    //   <div
    //     className={cn(
    //       "flex items-center gap-4 overflow-x-auto w-full",
    //       status !== 200 ? "justify-center" : "justify-start"
    //     )}
    //   >
        
    //     {status !== 200 ? (
    //       <p className="text-neutral-300">No video found</p>
    //     ) : (
    //       <>
            
    //         {Array?.isArray(videoData) ? (
    //           videoData?.map((video, index) => (
    //             <Video
    //               key={index}
    //               id={video.id}
    //               title={video.title}
    //               source={video?.source}
    //               processing={video.processing}
    //               workspaceId={video.WorkSpace.id}
    //               workspaceName={video.WorkSpace.name}
    //               folderId={video?.Folder?.id}
    //               currentFolderName={video?.Folder?.name}
    //               firstname={video?.User?.firstname}
    //               lastname={video?.User?.lastname}
    //               image={video?.User?.image}
    //               userId={video?.User?.id}
    //               createdAt={video?.createdAt}
    //             />
    //           ))
    //         ) : (
    //           <Video
    //             id={videoData.id}
    //             title={videoData.title}
    //             source={videoData.source}
    //             processing={videoData.processing}
    //             workspaceId={videoData.WorkSpace.id}
    //             workspaceName={videoData.WorkSpace.name}
    //             folderId={videoData.Folder.id}
    //             currentFolderName={videoData.Folder.name}
    //             firstname={videoData.User.firstname}
    //             lastname={videoData.User.lastname}
    //             image={videoData.User.image}
    //             userId={videoData.User.id}
    //             createdAt={videoData.createdAt}
    //           />
    //         )}
    //       </>
    //     )}
    //   </div>
    // </div>
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 sm:gap-4">
          <VideoRecorderDuotone />
          <h2 className="text-lg sm:text-xl text-[#BDBDBD]">Recent Videos</h2>
        </div>
      </div>

      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6",
          status !== 200 ? "flex justify-center items-center min-h-[200px]" : "",
        )}
      >
        {status !== 200 ? (
          <p className="text-neutral-300 text-center col-span-full">No video found</p>
        ) : (
          <>
            {Array?.isArray(videoData) ? (
              videoData?.map((video, index) => (
                <Video
                  key={index}
                  id={video.id}
                  title={video.title}
                  source={video?.source}
                  processing={video.processing}
                  workspaceId={video.WorkSpace.id}
                  workspaceName={video.WorkSpace.name}
                  folderId={video?.Folder?.id}
                  currentFolderName={video?.Folder?.name}
                  firstname={video?.User?.firstname}
                  lastname={video?.User?.lastname}
                  image={video?.User?.image}
                  userId={video?.User?.id}
                  createdAt={video?.createdAt}
                />
              ))
            ) : (
              <Video
                id={videoData.id}
                title={videoData.title}
                source={videoData.source}
                processing={videoData.processing}
                workspaceId={videoData.WorkSpace.id}
                workspaceName={videoData.WorkSpace.name}
                folderId={videoData.Folder.id}
                currentFolderName={videoData.Folder.name}
                firstname={videoData.User.firstname}
                lastname={videoData.User.lastname}
                image={videoData.User.image}
                userId={videoData.User.id}
                createdAt={videoData.createdAt}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default videoCard;
