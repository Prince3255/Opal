"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import Loader from "../loader";
import { usePathname, useRouter } from "next/navigation";
import FolderDuotone from "@/components/icons/folder-duotone";
import { useMutationData, useMutationDataState } from "@/hooks/useMutationData";
import { renameFodler } from "@/app/action/workspace";
import { Input } from "@/components/ui/input";

type Props = {
  id: string;
  name: string;
  optimistic?: boolean;
  count?: number;
};

const Folders = ({ id, name, optimistic, count }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const folderCardRef = useRef<HTMLDivElement | null>(null);
  const pathName = usePathname();
  const router = useRouter();
  const [onRename, setOnRename] = useState(false);

  const Rename = () => setOnRename(true);
  const Renamed = () => setOnRename(false);

  const { mutate, isPending } = useMutationData(
    ["rename-folders"],
    (data: { name: string }) => renameFodler(id, data.name),
    "workspace-folder",
    Renamed
  );

  const { latestVariables } = useMutationDataState(['rename-folders'])

  const handleFolderClick = () => {
    if (onRename) return;
    const basePath = pathName?.replace(/\/$/, '') || '';
    router.push(`${basePath}/folder/${id}`);
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    Rename();
  };

  const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    if (newName) {
      mutate({ name: newName });
    } else {
      Renamed();
    }
  };

  return (
    <div
      onClick={handleFolderClick}
      ref={folderCardRef}
      className={cn(
        optimistic && "opacity-60",
        "flex hover:bg-neutral-800 cursor-pointer transition duration-150 items-center gap-2 justify-between min-w-[250px] py-4 px-4 rounded-lg border-[1px]"
      )}
    >
      <Loader state={isPending}>
        <div className="flex flex-col gap-[1px]">
          {onRename ? (
            <Input
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                updateFolderName(e);
              }}
              autoFocus
              defaultValue={name}
              className="border-none text-neutral-300 text-base w-full outline-none bg-transparent p-0"
              ref={inputRef}
            />
          ) : (
            <p
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={handleDoubleClick}
              className="text-neutral-300"
            >
              {latestVariables && latestVariables?.status === 'pending' && latestVariables?.variables?.id === id ? latestVariables.variables?.name : name}
            </p>
          )}
          <span className="text-sm text-neutral-500">{count || 0} videos</span>
        </div>
      </Loader>
      <FolderDuotone />
    </div>
  );
};

export default Folders;
