import { number } from "zod";

export type WorkspaceProps = {
  data: {
    subscription: {
      plan: "FREE" | "PRO";
    } | null;
    workspace: {
      id: string;
      name: string;
      type: "PUBLIC" | "PERSONAL";
    }[];
    members: {
      WorkSpace: {
        id: string;
        name: string;
        type: "PUBLIC" | "PERSONAL";
      };
    }[];
  };
};

export type NotificationProps = {
  status: number;
  data: {
    _count: {
      notification: number;
    };
  };
};

export type FolderProp = {
  status: number;
  data: {
    name: string;
    _count: {
      videos: number;
    };
  };
};

export type VideoProps = {
  status: number;
  author?: boolean;
  data: {
    id: string;
    title: string | null;
    description: string | null;
    createdAt: Date;
    source: string;
    views?: number;
    processing: boolean;
    summery?: string;
    Folder: {
      id: string;
      name: string;
    } | null;
    User: {
      firstname: string | null;
      lastname: string | null;
      image: string | null;
      clerkId?: string | null;
      id?: string | null
      trial?: boolean | null;
      subscription?: {
        plan?: "PRO" | "FREE";
      } | null;
    } | null;
    WorkSpace: {
      id: string;
      name: string;
    };
  }[];
};

export type CommentRepliesProps = {
  id: string;
  comment: string;
  createdAt: Date;
  commentId: string | null;
  userId: string | null;
  videoId: string | null;
  User: {
    id: string;
    email: string;
    firstname: string | null;
    lastname: string | null;
    createdAt: Date;
    clerkid: string;
    image: string | null;
    trial: boolean;
    firstView: boolean;
  } | null;
};

export type VideoCommentProps = {
  data: {
    User: {
      id: string;
      email: string;
      firstname: string | null;
      lastname: string | null;
      createdAt: Date;
      clerkid: string;
      image: string | null;
      trial: boolean;
      firstView: boolean;
    } | null;
    reply: CommentRepliesProps[];
    id: string;
    comment: string;
    createdAt: Date;
    commentId: string | null;
    userId: string | null;
    videoId: string | null;
  }[];
};
