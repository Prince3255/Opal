import { getUserProfile } from "@/app/action/user";
import { useQueryData } from "./useQueryData";
import { useMutationData } from "./useMutationData";
import { createCommentAndReply } from "@/app/action/workspace";
import useZodForm from "./useZodForm";
import { createCommentSchema } from "@/components/form/comment-form/schema";
import Spinner from "@/components/global/loader/spinner";

export const useVideoComment = (videoId: string, commentId?: string) => {
  const { data, isFetching } = useQueryData(["user-profile"], getUserProfile);

  const { status, data: user } = (data || {}) as {
    status: number;
    data: {
      id: string;
      image: string;
      clerkId: string;
      subscription: { plan: string };
      workspace: { id: string }[];
    };
  };

  const { isPending, mutate } = useMutationData(
    ["new-comment"],
    (data: { comment: string }) =>
      createCommentAndReply(user.id, data.comment, videoId, commentId),
    "video-comments",
    () => reset()
  );

  const { register, onFormSubmit, errors, reset } = useZodForm(
    createCommentSchema,
    mutate
  );

  return { isPending, errors, isFetching, register, onFormSubmit };
};
