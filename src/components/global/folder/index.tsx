'use client'

import FolderDuotone from "@/components/icons/folder-duotone";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import React from "react";
import Folders from "./folder";
import { useMutationDataState } from "@/hooks/useMutationData";
import { useQueryData } from "@/hooks/useQueryData";
import { getWorkspaceFolders } from "@/app/action/workspace";

type Props = {
  workspaceId: string;
};

type FolderProps = {
  status: number;
  data: ({
    _count: {
      videos: number;
    };
  } & {
    id: string;
    name: string;
    createdAt: Date;
    workspaceId: string | null;
  })[]
};

const Folder = ({ workspaceId }: Props) => {
  const { data, isFetched } = useQueryData(["workspace-folder"], () =>
    getWorkspaceFolders(workspaceId)
  );

  const { latestVariables } = useMutationDataState(["create-folder"]); 

  if (!isFetched || !data) {
    return (
      ''
    );
  }

  const { status, data: folders } = data as FolderProps;
  // if (isFetched && folders) {

  // }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <FolderDuotone />
          <h2 className="text-[#BDBDBD] text-xl">Folders</h2>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[#BDBDBD]">See all</p>
          <ArrowRight color="#707070" />
        </div>
      </div>
      <div
        className={cn(
          "flex items-center gap-4 overflow-x-auto scrollbar-thin w-full",
          status !== 200 ? "justify-center" : "justify-start"
        )}
      >
        {status !== 200 ? (
          <p className="text-neutral-300">No folders in workspace</p>
        ) : (
          <>
            {latestVariables && latestVariables.status === "pending" && (
              <Folders
                name={latestVariables.variables.name}
                id={latestVariables.variables.id}
                optimistic
              />
            )}
            {folders.map((folder) => (
              <Folders
                name={folder.name}
                count={folder._count.videos}
                id={folder.id}
                key={folder.id}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Folder;
