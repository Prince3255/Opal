import { createFolder } from "@/app/action/workspace"
import { useMutationData } from "./useMutationData"

export const useCreateFolder = (workspaceId: string) => {
    const {mutate, isPending} = useMutationData(
        ['create-folder'],
        () => createFolder(workspaceId),
        'workspace-folder'
    )

    const onCreateNewFolder = () => mutate({ name: 'Untitled', id: 'optimistic-id'})
    return { onCreateNewFolder }
}