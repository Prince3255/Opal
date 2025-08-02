import FormGenerator from "@/components/global/form-generator";
import Loader from "@/components/global/loader";
import Spinner from "@/components/global/loader/spinner";
import { Button } from "@/components/ui/button";
import { useVideoComment } from "@/hooks/useVideoComment";
import { Send } from "lucide-react";
import React from "react";

type Props = {
  author: string;
  videoId: string;
  close?: () => void;
  commentId?: string;
};

const CommentForm = ({ author, videoId, close, commentId }: Props) => {
  const { errors, isPending, isFetching, onFormSubmit, register } = useVideoComment(
    videoId,
    commentId
  );

  if (isFetching) {
    <Spinner />
  }
  
  return (
    <form className="relative w-full" onSubmit={onFormSubmit}>
      <FormGenerator
        register={register}
        errors={errors}
        placeholder={`Respond to ${author}...`}
        name="comment"
        inputType="input"
        lines={8}
        type="text"
      />
      <Button
        className="p-0 bg-transparent absolute top-[1px] right-3 hover:bg-transparent "
        type="submit"
      >
        <Loader state={isPending}>
          <Send
            className="text-white/50 cursor-pointer hover:text-white/80"
            size={18}
          />
        </Loader>
      </Button>
    </form>
  );
};

export default CommentForm;
