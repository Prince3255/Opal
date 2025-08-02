"use client";

import { getVideoComments } from "@/app/action/workspace";
import { TabsContent } from "@/components/ui/tabs";
import { useQueryData } from "@/hooks/useQueryData";
import { VideoCommentProps } from "@/type/index.type";
import React from "react";
import CommentCard from "../comment-card";
import CommentForm from "@/components/form/comment-form";

type Props = {
  author: string;
  videoId: string;
};

const Activities = ({ author, videoId }: Props) => {
  const { data } = useQueryData(["video-comments"], () =>
    getVideoComments(videoId)
  );

  const { data: comments } = data as VideoCommentProps;
  // WIP: check the comments and the reply part
// console.log(comments)
  return (
    <TabsContent value="Activity" className="rounded-xl flex flex-col gap-y-5">
      <CommentForm author={author} videoId={videoId} />
      {comments?.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment.comment}
          reply={comment.reply}
          videoId={videoId}
          commentId={comment.id}
          author={{
            image: comment?.User?.image!,
            firstname: comment?.User?.firstname!,
            lastname: comment?.User?.lastname!,
          }}
          createdAt={comment.createdAt}
        />
      ))}
    </TabsContent>
  );
};

export default Activities;
