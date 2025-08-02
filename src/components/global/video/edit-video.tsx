import React, { useState } from "react";

type Props = {
  description: string;
  title: string;
  videoId: string;
};

const EditVideo = ({ description, title, videoId }: Props) => {
  return <div>EditVideo</div>;
};

export default EditVideo;





// "use client";

// import { getPreviewVideo, sendEmailForFirstView } from "@/app/action/workspace";
// import { useQueryData } from "@/hooks/useQueryData";
// import { VideoProps } from "@/type/index.type";
// import React, { useEffect } from "react";
// import CopyLink from "../copy-link";
// import { Download } from "lucide-react";
// import RichLink from "../rich-link";
// import { truncateString } from "@/lib/utils";
// import TabMenu from "../../tab";
// import AiTools from "../../ai-tools";
// import VideoTranscript from "../../video-transcript";
// import Activities from "../../activity";
// import EditVideo from "../edit-video";

// type Props = {
//   videoId: string;
// };

// const VideoPreview = ({ videoId }: Props) => {
//   const { data } = useQueryData(["preview-video"], () =>
//     getPreviewVideo(videoId)
//   );

//   console.log('data ',  data)

//   const notifyFisrtView = async () => await sendEmailForFirstView(videoId)

//   const { status, author, data: video } = data as VideoProps;

//   const daysAgo = Math.floor(
//     (new Date().getTime() - video?.createdAt.getTime()) / (24 * 60 * 60 * 1000)
//   );

//   useEffect(() => {
//     if (video?.views === 0) {
//       notifyFisrtView()
//     }

//     // return () => {
//     //   notifyFisrtView()
//     // }
//   }, [])

//   return (
//     <div className="grid grid-cols-1 xl:grid-cols-3 lg:py-10 overflow-y-auto gap-5">
//       <div className="flex flex-col lg:col-span-2 gap-y-10">
//         <div>
//           <div className="flex gap-x-5 items-start justify-between">
//             <h2 className="text-white text-4xl font-bold">{video?.title}</h2>
//             {/* {author ? (
//               <EditVideo
//                 videoId={videoId}
//                 title={video?.title as string}
//                 description={video?.description as string}
//               />
//             ) : (
//               <></>
//             )} */}
//           </div>
//           <span className="flex gap-x-3 mt-2">
//             <p className="text-[#9D9D9D] capitalize">
//               {video?.User?.firstname} {video?.User?.lastname}
//             </p>
//             <p className="text-[#707070]">
//               {daysAgo === 0 ? "Today" : `${daysAgo}d ago`}
//             </p>
//           </span>
//         </div>
//         <video
//           preload="metadata"
//           className="w-full aspect-video opacity-50 rounded-xl"
//           controls
//         >
//           {/* <source
//             src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${video?.source}#1`}
//           /> */}
//           <source
//             src={`${video?.source}`}
//           />
//         </video>
//         <div className="flex flex-col text-2xl gap-y-4">
//           <div className="flex gap-x-5 items-center justify-between">
//             <p className="text-[#BDBDBD] text-semibold">Description</p>
//             {/* {author ? (
//               <EditVideo
//                 videoId={videoId}
//                 title={video.title as string}
//                 description={video.description as string}
//               />
//             ) : (
//               <></>
//             )} */}
//           </div>
//           <p className="text-[#9D9D9D] text-lg text-medium">
//             {video?.description}
//           </p>
//         </div>
//       </div>
//       <div className="lg:col-span-1 flex flex-col gap-y-16">
//         <div className="flex justify-end gap-x-3 items-center">
//           <CopyLink
//             variant="outline"
//             className="rounded-full bg-transparent px-10"
//             videoId={videoId}
//           />
//           <RichLink
//             title={video?.title as string}
//             description={truncateString(video?.description as string, 150)}
//             source={video?.source}
//             id={videoId}
//           />
//           <Download className="text-[#4d4c4c]" />
//         </div>
//         <div>
//           <TabMenu
//             defaultValue="Ai Tools"
//             triggers={["Ai Tools", "Transcript", "Activity"]}
//           >
//             <AiTools
//               plan={video?.User?.subscription?.plan}
//               trial={video?.User?.trial!}
//               videoId={videoId}
//             />
//             <VideoTranscript transcript={video?.summery} />
//             <Activities
//               author={video?.User?.firstname as string}
//               videoId={videoId}
//             />
//           </TabMenu>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoPreview;
