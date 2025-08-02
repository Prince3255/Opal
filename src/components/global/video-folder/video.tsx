"use client"

import type React from "react"
import CopyLink from "../video/copy-link"
import CardMenu from "../video/video-card-menu"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dot, Share2, User } from "lucide-react"
import { useUser } from "@/hooks/useUser"
import DeleteVideo from "../video/delete-video"

type Props = {
  id: string
  title: string
  source: string
  processing: boolean
  workspaceId: string
  folderId: string
  currentFolderName: string
  firstname: string
  lastname: string
  image: string
  userId: string
  createdAt: Date
  workspaceName: string
}

const Video = ({
  id,
  title,
  source,
  processing,
  workspaceId,
  folderId,
  currentFolderName,
  firstname,
  lastname,
  image,
  createdAt,
  userId,
  workspaceName,
}: Props) => {
  const daysAgo = Math.floor((new Date().getTime() - createdAt.getTime()) / (24 * 60 * 60 * 1000))
  const user = useUser()

  const handleActionClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <>
      {processing ? (
        ""
      ) : (
        <div className="group overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl w-full max-w-sm mx-auto hover:border-[#404040] transition-all duration-200">
          <div
            className="absolute top-3 right-3 z-50 gap-x-2 sm:gap-x-3 hidden group-hover:flex"
            onClick={handleActionClick}
          >
            {userId === user?.id && (
              <div onClick={handleActionClick}>
                <DeleteVideo videoId={id} />
              </div>
            )}
            <div onClick={handleActionClick}>
              <CardMenu
                currentFolderName={currentFolderName}
                videoId={id}
                currentWorkspace={workspaceId}
                currentFolder={folderId}
              />
            </div>
            <div onClick={handleActionClick}>
              <CopyLink
                className="p-[5px] h-5 bg-hover:bg-transparent bg-[#252525]"
                videoId={id}
              />
            </div>
          </div>

          <Link
            href={`/dashboard/${workspaceId}/video/${id}`}
            className="hover:bg-[#252525] transition duration-150 flex flex-col justify-between h-full"
          >
            <div className="relative">
              <video
                controls={false}
                preload="metadata"
                className="w-full aspect-video opacity-50 z-20"
              >
                <source src={`${source}`} />
              </video>
            </div>

            <div className="px-4 sm:px-5 py-3 flex flex-col gap-2 z-20">
              <h2 className="text-sm font-semibold text-[#BDBDBD] truncate" title={title}>
                {title}
              </h2>

              <div className="flex gap-x-2 items-center mt-2">
                <Avatar className="w-7 h-7 sm:w-8 sm:h-8">
                  <AvatarImage src={(image as string) || "/placeholder.svg"} />
                  <AvatarFallback>
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="capitalize text-xs text-[#BDBDBD] truncate">
                    {firstname} {lastname}
                  </p>
                  <p className="text-[#6d6b6b] text-xs flex items-center">
                    <Dot className="w-3 h-3" />
                    {daysAgo === 0 ? "Today" : `${daysAgo}d ago`}
                  </p>
                </div>
              </div>

              <div className="mt-3 space-y-1">
                <p className="text-xs text-[#9D9D9D] truncate" title={`Folder: ${currentFolderName}`}>
                  Folder: {currentFolderName}
                </p>
                <div className="flex gap-x-1 items-center">
                  <Share2 fill="#9D9D9D" className="text-[#9D9D9D] flex-shrink-0" size={12} />
                  <p className="text-xs text-[#9D9D9D] capitalize truncate" title={workspaceName}>
                    {workspaceName}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  )
}

export default Video

// import React from "react";
// import CopyLink from "../video/copy-link";
// import CardMenu from "../video/video-card-menu";
// import Link from "next/link";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Dot, Share2, User } from "lucide-react";
// import { useUser } from "@/hooks/useUser";
// import DeleteVideo from "../video/delete-video";
// type Props = {
//   id: string;
//   title: string;
//   source: string;
//   processing: boolean;
//   workspaceId: string;
//   folderId: string;
//   currentFolderName: string;
//   firstname: string;
//   lastname: string;
//   image: string;
//   userId: string;
//   createdAt: Date;
//   workspaceName: string;
// };
// const Video = ({
//   id,
//   title,
//   source,
//   processing,
//   workspaceId,
//   folderId,
//   currentFolderName,
//   firstname,
//   lastname,
//   image,
//   createdAt,
//   userId,
//   workspaceName,
// }: Props) => {
//   const daysAgo = Math.floor(
//     (new Date().getTime() - createdAt.getTime()) / (24 * 60 * 60 * 1000)
//   );
//   const user = useUser();
//   return (
//     <>
//       {processing ? (
//         ""
//       ) : (
//         <div className="group overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl min-w-72 max-w-72">
//           <div className="absolute top-3 right-3 z-50 gap-x-3 hidden group-hover:flex">
//             {userId === user?.id && <DeleteVideo videoId={id} />}
//             <CardMenu
//               currentFolderName={currentFolderName}
//               videoId={id}
//               currentWorkspace={workspaceId}
//               currentFolder={folderId}
//             />
//             <CopyLink
//               className="p-[5px] h-5 bg-hover:bg-transparent bg-[#252525]"
//               videoId={id}
//             />
//           </div>
//           <Link
//             href={`/dashboard/${workspaceId}/video/${id}`}
//             className="hover:bg-[#252525] transition duration-150 flex flex-col justify-between h-full"
//           >
//             <video
//               controls={false}
//               preload="metadata"
//               className="w-full aspect-video opacity-50 z-20"
//             >
//               <source src={`${source}`} />
//             </video>
//             <div className="px-5 py-3 flex flex-col gap-7-2 z-20">
//               <h2 className="text-sm font-semibold text-[#BDBDBD] truncate">
//                 {title}
//               </h2>
//               <div className="flex gap-x-2 items-center mt-4">
//                 <Avatar className=" w-8 h-8">
//                   <AvatarImage src={image as string} />
//                   <AvatarFallback>
//                     <User />
//                   </AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="capitalize text-xs text-[#BDBDBD]">
//                     {firstname} {lastname}
//                   </p>
//                   <p className="text-[#6d6b6b] text-xs flex items-center ">
//                     <Dot /> {daysAgo === 0 ? "Today" : `${daysAgo}d ago`}
//                   </p>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <p className="text-xs text-[#9D9D9D] mb-2">
//                   Folder: {currentFolderName}
//                 </p>
//                 <span className="flex gap-x-1 items-center">
//                   <Share2 fill="#9D9D9D" className="text-[#9D9D9D]" size={12} />
//                   <p className="text-xs text-[#9D9D9D] capitalize">
//                     {workspaceName}
//                   </p>
//                 </span>
//               </div>
//             </div>
//           </Link>
//         </div>
//       )}
//     </>
//   );
// };
// export default Video;
