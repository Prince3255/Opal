import { z } from "zod";

export const moveVideoSchema = z.object({
    folder_id: z.string().optional().transform(val => val === "" ? null : val),
    workspace_id: z.string(),
}).transform(data => ({
    ...data,
    folder_id: data.folder_id === "" ? null : data.folder_id
}));