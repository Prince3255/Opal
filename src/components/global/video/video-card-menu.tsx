// // import React from "react";
// // import Modal from "../modal";
// // import { Move } from "lucide-react";
// // import ChangeVideoLocation from "@/components/form/change-video-location";

// // type Props = {
// //   videoId: string;
// //   currentWorkspace?: string;
// //   currentFolder?: string;
// //   currentFolderName?: string;
// // };

// // const CardMenu = ({
// //   videoId,
// //   currentFolder,
// //   currentFolderName,
// //   currentWorkspace,
// // }: Props) => {
// //   return (
// //     <Modal
// //       className="flex items-center cursor-pointer gap-x-2"
// //       title="Move to new Workspace/Folder"
// //       description="This action cannot be undone. This will permanently delete your
// //   account and remove your data from our servers."
// //       trigger={
// //         <Move
// //           size={20}
// //           fill="#4f4f4f"
// //           className="text-[#4f4f4f] hover:text-[#f9f9f9]"
// //         />
// //       }
// //     >
// //       <ChangeVideoLocation
// //         currentFolder={currentFolder}
// //         currentWorkspace={currentWorkspace}
// //         videoId={videoId}
// //         currentFolderName={currentFolderName}
// //       />
// //     </Modal>
// //   );
// // };

// // export default CardMenu;

// "use client"

// import type React from "react"
// import Modal from "../modal"
// import { Move } from "lucide-react"
// import ChangeVideoLocation from "@/components/form/change-video-location"

// type Props = {
//   videoId: string
//   currentWorkspace?: string
//   currentFolder?: string
//   currentFolderName?: string
// }

// const CardMenu = ({ videoId, currentFolder, currentFolderName, currentWorkspace }: Props) => {
//   const handleTriggerClick = (e: React.MouseEvent) => {
//     e.preventDefault()
//     e.stopPropagation()
//   }

//   return (
//     <Modal
//       className="flex items-center cursor-pointer gap-x-2"
//       title="Move to new Workspace/Folder"
//       description="Select a new location for your video. This will move the video to the selected workspace and folder."
//       trigger={
//         <div onClick={handleTriggerClick}>
//           <Move
//             size={20}
//             className="text-[#4f4f4f] hover:text-[#f9f9f9] transition-colors cursor-pointer p-1 rounded hover:bg-[#404040]"
//           />
//         </div>
//       }
//     >
//       <ChangeVideoLocation
//         currentFolder={currentFolder}
//         currentWorkspace={currentWorkspace}
//         videoId={videoId}
//         currentFolderName={currentFolderName}
//       />
//     </Modal>
//   )
// }

// export default CardMenu

import React from "react";
import Modal from "../modal";
import { Move } from "lucide-react";
import ChangeVideoLocation from "@/components/form/change-video-location";
type Props = {
  videoId: string;
  currentWorkspace?: string;
  currentFolder?: string;
  currentFolderName?: string;
};
const CardMenu = ({
  videoId,
  currentFolder,
  currentFolderName,
  currentWorkspace,
}: Props) => {
  return (
    <Modal
      className="flex items-center cursor-pointer gap-x-2"
      title="Move to new Workspace/Folder"
      description="This action cannot be undone. This will permanently delete your  account and remove your data from our servers."
      trigger={
        <Move
          size={20}
          fill="#4f4f4f"
          className="text-[#4f4f4f] hover:text-[#f9f9f9]"
        />
      }
    >
      {" "}
      <ChangeVideoLocation
        currentFolder={currentFolder}
        currentWorkspace={currentWorkspace}
        videoId={videoId}
        currentFolderName={currentFolderName}
      />{" "}
    </Modal>
  );
};
export default CardMenu;
