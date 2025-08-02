import { useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { useMutationData } from "./useMutationData";
import useZodForm from "./useZodForm";
import { moveVideoSchema } from "@/components/form/change-video-location/schema";
import {
  getWorkspaceFolders,
  getWorkSpaces,
  moveVideoLocation,
} from "@/app/action/workspace";
import { useDispatch } from "react-redux";
import { FOLDERS } from "@/redux/slice/folders";
import { WORKSPACES } from "@/redux/slice/workspaces";

export function useMoveVideos(
  videoId: string,
  currentWorkspace: string,
  currentFolder?: string
) {
  const dispatch = useDispatch();
  //get state redux
  const { folders } = useAppSelector((state) => state.FolderReducer);
  const { workspaces } = useAppSelector((state) => state.WorkSpaceReducer);

  // fetching states
  const [isFetching, setIsFetching] = useState(false);
  //stat folders
  const [isFolders, setIsFolders] = useState<
    | ({
        _count: {
          videos: number;
        };
      } & {
        id: string;
        name: string;
        createdAt: Date;
        workSpaceId: string | null;
      })[]
    | undefined
  >(undefined);

  //use mutation data optimisc
  const { mutate, isPending } = useMutationData(
    ["change-video-location"],
    (data: { folder_id: string | null; workspace_id: string }) => {
      // Convert null to empty string for backend compatibility
      const folderId = data.folder_id === null ? "" : data.folder_id;
      return moveVideoLocation(videoId, data.workspace_id, folderId);
    },
    ["folder-video", "user-videos", "folder-info", "workspace-folder"]
  );
  //usezodform
  const { errors, onFormSubmit, watch, register, setValue } = useZodForm(
    moveVideoSchema,
    mutate,
    { folder_id: currentFolder || null, workspace_id: currentWorkspace }
  );

  //fetchfolders with a use effeect
  const fetchFolders = async (workspace: string) => {
    setIsFetching(true);
    try {
      const folders = await getWorkspaceFolders(workspace);
      setIsFolders(folders.data || []);
      dispatch(FOLDERS({ folders: folders.data || [] }));
    } catch (error) {
      console.error('Error fetching folders:', error);
      setIsFolders([]);
      dispatch(FOLDERS({ folders: [] }));
    } finally {
      setIsFetching(false);
    }
  };

  const fetchWorkspace = async () => {
    setIsFetching(true);
    const workspaceResult = await getWorkSpaces();
    setIsFetching(false);

    let workspacesArr: {
      type: "PERSONAL" | "PUBLIC";
      name: string;
      id: string;
    }[] = [];
    if (Array.isArray(workspaceResult?.data?.workspace)) {
      let totalPersonalWorkspace = workspaceResult.data.workspace;
      let memberWorkspace = workspaceResult?.data?.members?.map((p) => {
        return p.WorkSpace;
      });
      let arr1 = [...totalPersonalWorkspace, ...memberWorkspace];
      workspacesArr = arr1.filter(Boolean) as {
        type: "PERSONAL" | "PUBLIC";
        name: string;
        id: string;
      }[];
    } else if (
      workspaceResult?.data?.workspace &&
      Array.isArray(workspaceResult.data.workspace)
    ) {
      let totalPersonalWorkspace = workspaceResult.data.workspace;
      let memberWorkspace = workspaceResult?.data?.members?.map((p) => {
        return p.WorkSpace;
      });
      let arr1 = [...totalPersonalWorkspace, ...memberWorkspace];
      workspacesArr = arr1.filter(Boolean) as {
        type: "PERSONAL" | "PUBLIC";
        name: string;
        id: string;
      }[];
    } else if (workspaceResult?.data?.workspace) {
      let totalPersonalWorkspace = workspaceResult.data.workspace;
      let memberWorkspace = workspaceResult?.data?.members?.map((p) => {
        return p.WorkSpace;
      });
      let arr1 = [...totalPersonalWorkspace, ...memberWorkspace];
      workspacesArr = arr1.filter(Boolean) as {
        type: "PERSONAL" | "PUBLIC";
        name: string;
        id: string;
      }[];
    }
    dispatch(WORKSPACES({ workspaces: workspacesArr }));
  };

  useEffect(() => {
    fetchFolders(currentWorkspace);
    fetchWorkspace();
  }, []);

  useEffect(() => {
    const workspace = watch(async (value) => {
      if (value.workspace_id) {
        await fetchFolders(value.workspace_id);
      }
    });

    return () => workspace.unsubscribe();
  }, [watch]);

  // Reset folder_id when folders change and there are no folders
  useEffect(() => {
    if (isFolders !== undefined && isFolders.length === 0) {
      setValue('folder_id', null);
    }
  }, [isFolders, setValue]);

  return {
    onFormSubmit,
    errors,
    register,
    setValue,
    isPending,
    folders,
    workspaces,
    isFetching,
    isFolders,
  };
}
