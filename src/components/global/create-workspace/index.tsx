// "use client"

// import { getWorkSpaces } from "@/app/action/workspace"
// import { useQueryData } from "@/hooks/useQueryData"
// import Modal from "../modal"
// import { Button } from "@/components/ui/button"
// import FolderPlusDuotine from "@/components/icons/folder-plus-duotone"
// import WorkspaceForm from "@/components/form/workspace-form"
// import Spinner from "../loader/spinner"

// type Props = {}

// const CreateWorkspace = (props: Props) => {
//   const { data, isFetching } = useQueryData(["user-workspaces"], getWorkSpaces)

//   if (isFetching) {
//     <Spinner />
//   }

//   const { data: plan } = data as {
//     status: number
//     data: {
//       subscription: {
//         plan: "PRO" | "FREE"
//       } | null
//     }
//   }

//   if (plan.subscription?.plan === "FREE") {
//     return <></>
//   }

//   if (plan.subscription?.plan === "PRO") {
//     return (
//       <Modal
//         title="Create a Workspace"
//         description="Workspaces helps you collaborate with team members. You are assigned a default personal workspace where you can share videos in private with yourself."
//         trigger={
//           <Button className="bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-3 px-3 sm:py-4 sm:px-4 lg:py-6 lg:px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm whitespace-nowrap hover:bg-[#252525] transition-colors">
//             <FolderPlusDuotine />
//             <span>Create Workspace</span>
//             {/* <span className="sm:hidden">Workspace</span> */}
//           </Button>
//         }
//       >
//         <WorkspaceForm />
//       </Modal>
//     )
//   }
// }

// export default CreateWorkspace

"use client";
import { getWorkSpaces } from "@/app/action/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import React from "react";
import Modal from "../modal";
import { Button } from "@/components/ui/button";
import FolderPlusDuotine from "@/components/icons/folder-plus-duotone";
import WorkspaceForm from "@/components/form/workspace-form";
import Spinner from "../loader/spinner";
type Props = {};
const CreateWorkspace = (props: Props) => {
  const { data, isFetching } = useQueryData(["user-workspaces"], getWorkSpaces);
  if (isFetching) {
    <Spinner />;
  }
  const { data: plan } = data as {
    status: number;
    data: { subscription: { plan: "PRO" | "FREE" } | null };
  };
  if (plan.subscription?.plan === "FREE") {
    return <></>;
  }
  if (plan.subscription?.plan === "PRO") {
    return (
      <Modal
        title="Create a Workspace"
        description="Workspaces helps you collaborate with team members. You are assigned a default personal workspace where you can share videos in private with yourself."
        trigger={
          <Button className="bg-[#1D1D1D] text-[#707070] flex items-center gap-2 py-3 px-3 sm:py-4 sm:px-4 lg:py-6 lg:px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm whitespace-nowrap hover:bg-[#252525] transition-colors">
            <FolderPlusDuotine />
            <span>Create a Workspace</span>
          </Button>
        }
      >
        <WorkspaceForm />
      </Modal>
    );
  }
};
export default CreateWorkspace;
