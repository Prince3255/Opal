"use client"

import FolderDuotone from "@/components/icons/folder-duotone"
import { Button } from "@/components/ui/button"
import { useCreateFolder } from "@/hooks/useCreateFolder"

type Props = {
  workspaceId: string
}

const CreateFolder = ({ workspaceId }: Props) => {
  const { onCreateNewFolder } = useCreateFolder(workspaceId)

  return (
    <Button
      className="bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-3 px-3 sm:py-4 sm:px-4 lg:py-6 lg:px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm whitespace-nowrap hover:bg-[#252525] transition-colors"
      onClick={onCreateNewFolder}
    >
      <FolderDuotone />
      <span>Create Folder</span>
      {/* <span className="sm:hidden">Folder</span> */}
    </Button>
  )
}

export default CreateFolder

// "use client";
// import FolderDuotone from "@/components/icons/folder-duotone";
// import { Button } from "@/components/ui/button";
// import { useCreateFolder } from "@/hooks/useCreateFolder";
// import React from "react";
// type Props = { workspaceId: string };
// const CreateFolder = ({ workspaceId }: Props) => {
//   const { onCreateNewFolder } = useCreateFolder(workspaceId);
//   return (
//     <Button
//       className="bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl"
//       onClick={onCreateNewFolder}
//     >
//       <FolderDuotone /> CreateFolder{" "}
//     </Button>
//   );
// };
// export default CreateFolder;
