import { createWorkspace } from "@/app/action/workspace";
import { useMutationData } from "./useMutationData";
import useZodForm from "./useZodForm";
import { workspaceSchema } from "@/components/form/workspace-form/schema";

export const useCreateWorkspace = () => {
  // left name error
  const { mutate, isPending } = useMutationData(
    ["create-workspace"],
    (data: { name: string }) => createWorkspace(data.name),
    "user-workspaces"
  );

  
  const { errors, onFormSubmit, register } = useZodForm(
      workspaceSchema,
      mutate,
      { name: "" }
    );


  return { errors, onFormSubmit, register, isPending };
};
