"use server";

import client from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { sendEmail } from "./user";
import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";
import axios from "axios";

export const VerifyAccessToWorkspace = async (workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 401 };
    }
    let cleanId = workspaceId.slice(0, 36);
    const isUserInWorkspace = await client.workSpace.findUnique({
      where: {
        id: cleanId,
        OR: [
          {
            User: {
              clerkid: user.id,
            },
          },
          {
            members: {
              some: {
                User: {
                  clerkid: user.id,
                },
              },
            },
          },
        ],
      },
    });
    return { status: 200, data: { workspace: isUserInWorkspace } };
  } catch (error) {
    console.log("error41 ", error);
    return {
      status: 403,
      data: {
        workspace: null,
      },
    };
  }
};

export const getWorkspaceFolders = async (workspaceId: string) => {
  try {
    let cleanId = workspaceId.split(".")[0];
    const isFolder = await client.folder.findMany({
      where: {
        workSpaceId: cleanId,
      },
      include: {
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });

    if (isFolder && isFolder.length > 0) {
      return { status: 200, data: isFolder };
    }

    return { status: 404, data: [] };
  } catch (error) {
    return { status: 403, data: [] };
  }
};

export const getAllUserVideos = async (workspaceId: string) => {
  try {
    const user = currentUser();
    if (!user) {
      return { status: 401, data: [] };
    }
    const isVideoExist = await client.video.findMany({
      where: {
        workSpaceId: workspaceId,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        description: true,
        Folder: {
          select: {
            id: true,
            name: true,
          },
        },
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
            id: true,
          },
        },
        WorkSpace: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (isVideoExist && isVideoExist.length > 0) {
      return { status: 200, data: isVideoExist };
    }

    return { status: 404 };
  } catch (error) {
    return { status: 400 };
  }
};

export const getFolderVideos = async (folderId: string) => {
  try {
    const user = currentUser();
    if (!user) {
      return { status: 401, data: [] };
    }
    const isVideoExist = await client.video.findMany({
      where: {
        folderId: folderId,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        description: true,
        Folder: {
          select: {
            id: true,
            name: true,
          },
        },
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
            id: true,
          },
        },
        WorkSpace: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (isVideoExist && isVideoExist.length > 0) {
      return { status: 200, data: isVideoExist };
    }

    return { status: 404 };
  } catch (error) {
    return { status: 400 };
  }
};

// export const getLatestVideo = async () => {
//   try {
//     const user = await currentUser();

//     if (!user) return { status: 401, data: [] };

//     const video = await client.user.findUnique({
//       where: {
//         clerkid: user.id,
//       },
//       select: {
//         videos: {
//           select: {
//             id: true,
//             title: true,
//             createdAt: true,
//             source: true,
//             processing: true,
//             Folder: {
//               select: {
//                 id: true,
//                 name: true,
//               },
//             },
//             WorkSpace: {
//               select: {
//                 id: true,
//                 name: true,
//               },
//             },
//             User: {
//               select: {
//                 id: true,
//                 firstname: true,
//                 lastname: true,
//                 image: true,
//               },
//             },
//           },
//           orderBy: {
//             createdAt: "desc",
//           },
//         },
//       },
//     });

//     if (video) {
//       const videos = video.videos;
//       const limitedVideos = videos.length > 6 ? videos.slice(0, 8) : videos;
//       return { status: 200, data: limitedVideos };
//     }

//     return { status: 404, data: [] };
//   } catch (error) {
//     return { status: 500, data: [] };
//   }
// };

// export const getWorkSpaces = async () => {
//   try {
//     const user = await currentUser();
//     if (!user) {
//       return { status: 401, data: [] };
//     }
//     const workSpace = await client.user.findMany({
//       where: {
//         clerkid: user.id,
//       },
//       select: {
//           subscription: {
//               select: {
//                   plan: true
//               }
//           },
//           workspace: {
//               select: {
//                   id: true,
//                   name: true,
//                   type: true
//               }
//           },
//           members: {
//               select: {
//                   WorkSpace: {
//                       select: {
//                           id: true,
//                           name: true,
//                           type: true
//                       }
//                   }
//               }
//           }
//       }
//     });

//     if (workSpace) {
//       return { status: 200, data: workSpace };
//     }

//     return { status: 404 };
//   } catch (error) {
//     return { status: 400 };
//   }
// };

export const sendEmailForFirstView = async (videoId: string) => {
  try {
    const user = await currentUser();

    if (!user) return { status: 404 };

    const firstViewSetting = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        firstView: true,
      },
    });

    if (!firstViewSetting?.firstView) return;

    const video = await client.video.findUnique({
      where: {
        id: videoId,
      },
      select: {
        title: true,
        views: true,
        User: {
          select: {
            email: true,
            clerkid: true,
          },
        },
      },
    });

    if (video && video.views === 0) {
      await client.video.update({
        where: {
          id: videoId,
        },
        data: {
          views: video.views + 1,
        },
      });

      if (!video?.User?.email) return;

      const { transporter, mailOption } = await sendEmail(
        video?.User?.email,
        "You got a viewer",
        `Your video ${video.title} just got its first view`
      );

      transporter.sendMail(mailOption, async (error, info) => {
        if (error) {
          console.log(error.message);
        } else {
          const notification = await client.user.update({
            where: {
              clerkid: video.User?.clerkid,
            },
            data: {
              notification: {
                create: {
                  content: mailOption.text,
                },
              },
            },
          });

          if (notification) {
            return { status: 200 };
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getWorkSpaces = async () => {
  try {
    const user = await currentUser();

    if (!user) return { status: 404 };

    const workspaces = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workspace: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        members: {
          select: {
            WorkSpace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });

    if (workspaces) {
      return { status: 200, data: workspaces };
    }
  } catch (error) {
    return { status: 400 };
  }
};

export const getNotifications = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 401 };
    }

    const notification = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        notification: true,
        _count: {
          select: {
            notification: true,
          },
        },
      },
    });

    if (notification && notification.notification.length > 0) {
      return { status: 200, data: notification };
    }

    return { status: 404, data: [] };
  } catch (error) {
    return { status: 400, data: [] };
  }
};

export const searchUsers = async (query: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };

    const users = await client.user.findMany({
      where: {
        OR: [
          { firstname: { contains: query } },
          { email: { contains: query } },
          { lastname: { contains: query } },
        ],
        NOT: [{ clerkid: user.id }],
      },
      select: {
        id: true,
        subscription: {
          select: {
            plan: true,
          },
        },
        firstname: true,
        lastname: true,
        image: true,
        email: true,
      },
    });

    if (users && users.length > 0) {
      return { status: 200, data: users };
    }

    return { status: 404, data: undefined };
  } catch (error) {
    return { status: 500, data: undefined };
  }
};

export const searchUserFolderProject = async (query: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };

    const onData = await client.user.findMany({
      where: {
        OR: [
          { firstname: { contains: query } },
          { lastname: { contains: query } },
          { workspace: {} },
        ],
      },
    });
  } catch (error) {
    return { status: 500, data: undefined };
  }
};

export const createWorkspace = async (name: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404, data: "User not found" };

    const authorized = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (authorized?.subscription?.plan === "PRO") {
      const workSpace = await client.user.update({
        where: {
          clerkid: user.id,
        },
        data: {
          workspace: {
            create: {
              name,
              type: "PUBLIC",
            },
          },
        },
      });

      if (workSpace) {
        return { status: 201, data: "Workspace Created" };
      }

      return {
        status: 401,
        data: "You are not authorized to create a workspace",
      };
    }

    return {
      status: 401,
      data: "You need a PRO subscription to create a workspace",
    };
  } catch (error) {
    return {
      status: 500,
      data: "An error occurred while creating the workspace",
    };
  }
};

export const renameFodler = async (folderId: string, name: string) => {
  try {
    const folder = await client.folder.update({
      where: {
        id: folderId,
      },
      data: {
        name,
      },
    });

    if (folder) {
      return { status: 200, data: "Folder Renamed" };
    }

    return {
      status: 400,
      data: "Folder not found",
    };
  } catch (error) {
    return { status: 500, data: "Oops! Something went wrong" };
  }
};

export const editVideo = async (
  videoId?: string,
  title?: string,
  description?: string
) => {
  try {
    const video = await client.video.update({
      where: {
        id: videoId,
      },
      data: {
        title,
        description,
      },
    });

    if (video) {
      return { status: 200, data: "Video Updated" };
    }

    return { status: 400, data: "Video not found" };
  } catch (error) {
    return { status: 500, data: "Oops! Something went wrong" };
  }
};

export const createFolder = async (workspaceId: string) => {
  try {
    const newFolder = await client.workSpace.update({
      where: {
        id: workspaceId,
      },
      data: {
        folders: {
          create: {
            name: "Untitled",
          },
        },
      },
    });

    if (newFolder) {
      return { status: 200, data: "Folder created" };
    }

    return { status: 400, data: "Folder not created" };
  } catch (error) {
    return { status: 500, data: "Oops! Something went wrong" };
  }
};

export const getFodlerInfo = async (folderId: string) => {
  try {
    const folder = await client.folder.findUnique({
      where: {
        id: folderId,
      },
      select: {
        name: true,
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });

    if (folder) {
      return { status: 200, data: folder };
    }

    return { status: 404, data: null };
  } catch (error) {
    return { status: 500, data: null };
  }
};

export const moveVideoLocation = async (
  videoId: string,
  workspaceId: string,
  folderId: string
) => {
  console.log('moveVideoLocation called with:', { videoId, workspaceId, folderId });
  const user1 = await currentUser();

  try {
    const user = await client.user.findUnique({
      where: {
        clerkid: user1?.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    const video = await client.video.findUnique({
      where: {
        id: videoId,
      },
      select: {
        documentId: true,
        workSpaceId: true,
        summery: true,
      },
    });

    if (user?.subscription?.plan === "PRO" && video?.documentId) {
      try {
        const voiceflowResponse = await axios.get(
          `https://api.voiceflow.com/v1/knowledge-base/docs/${video.documentId}`,
          {
            headers: {
              Authorization: process.env.VOICE_FLOW_API_KEY,
              "Content-Type": "application/json",
            },
          }
        );
        
        if (voiceflowResponse.status === 200) {
          const targetChunk = voiceflowResponse.data.chunks.find(
            (chunk: any) =>
              chunk.metadata && chunk.metadata.workspaceId == video.workSpaceId
          );
          if (targetChunk && targetChunk?.chunkID) {
            let transcript =
              video.summery?.replace(/\[WORKSPACE:[^\]]*\]/g, "") || "";
            transcript = transcript.trim() + ` [WORKSPACE:${workspaceId}]`;
            const updateResponse = await axios.patch(
              `https://api.voiceflow.com/v1/knowledge-base/docs/${video.documentId}/chunk/${targetChunk.chunkID}`,
              {
                data: {
                  metadata: {
                    transcript: transcript,
                  },
                },
              },
              {
                headers: {
                  Authorization: process.env.VOICE_FLOW_API_KEY,
                  "Content-Type": "application/json",
                },
              }
            );

            if (updateResponse.status === 200) {
              console.log('done 12');
            }
          }
        }
      } catch (voiceflowError) {
        console.error("❌ Failed to update Voiceflow KB:", voiceflowError);
      }
    } else {
      console.log(
        "🔒 Skipping Voiceflow update - User plan:",
        user?.subscription?.plan,
        "DocumentId:",
        video?.documentId
      );
    }

    const location = await client.video.update({
      where: {
        id: videoId,
      },
      data: {
        folderId: folderId || null,
        workSpaceId: workspaceId,
      },
    });

    if (location) {
      console.log("video moved");
      return {
        status: 200,
        data: "Video moved successfully",
      };
    }

    return { status: 400, data: "Failed to move video" };
  } catch (error) {
    console.error("❌ Error in moveVideoLocation:", error);
    return { status: 500, data: "Oops! Something went wrong" };
  }
};

// export const moveVideoLocation = async (
//   videoId: string,
//   workspaceId: string,
//   folderId: string
// ) => {
//   const user1 = await currentUser()
//   try {
//     const user = await client.user.findUnique({
//       where: {
//         clerkid: user1?.id
//       },
//       select: {
//         subscription: {
//           select: {
//             plan: true
//           }
//         }
//       }
//     })

//     const video = await client.video.findUnique({
//       where: {
//         id: videoId,
//       },
//       select: {
//         documentId: true,
//       }
//     })

//     if (user?.subscription?.plan === 'PRO' && video?.documentId) {
//       const voiceflowResponse = await axios.patch(
//         `https://api.voiceflow.com/v1/knowledge-base/docs/${video.documentId}`,
//         {
//           metadata: {
//             workspaceId: workspaceId
//           }
//         },
//         {
//           headers: {
//             'Authorization': process.env.VOICE_FLOW_API_KEY,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (voiceflowResponse.status === 200) {
//         console.log('vd ', voiceflowResponse.data)
//       }
//     }
//     // console.log(videoId, workspaceId, folderId);
//     const location = await client.video.update({
//       where: {
//         id: videoId,
//       },
//       data: {
//         folderId: folderId || null,
//         workSpaceId: workspaceId,
//       },
//     });

//     if (location) return { status: 200, data: "Folder changed successfully" };
//     return { status: 400, data: "Folder not changed" };
//   } catch (error) {
//     return { status: 500, data: "Oops! Something went wrong" };
//   }
// };

export const getPreviewVideo = async (videoId: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { status: 404 };
    }

    const video = await client.video.findUnique({
      where: {
        id: videoId,
      },
      select: {
        title: true,
        createdAt: true,
        source: true,
        description: true,
        processing: true,
        views: true,
        summery: true,
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
            id: true,
            trial: true,
            subscription: {
              select: {
                plan: true,
              },
            },
          },
        },
        WorkSpace: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (video) {
      return {
        status: 200,
        data: video,
        author: user.id === video.User?.id ? true : false,
      };
    }

    return { status: 404 };
  } catch (error) {
    return { status: 400 };
  }
};

export const getPaymentInfo = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 401 };
    }

    const paymentInfo = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (paymentInfo) {
      return { status: 200, data: paymentInfo };
    }

    return { status: 404 };
  } catch (error) {
    return { status: 400 };
  }
};

export const getFirstView = async () => {
  try {
    const user = await currentUser();

    if (!user) return { status: 401 };

    const firstView = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        firstView: true,
      },
    });

    if (firstView) {
      return { status: 200, data: firstView };
    }

    return { status: 404 };
  } catch (error) {
    return { status: 400 };
  }
};

export const enableFirstView = async (state: boolean) => {
  try {
    const user = await currentUser();

    if (!user) return { status: 401 };

    const view = await client.user.update({
      where: {
        clerkid: user.id,
      },
      data: {
        firstView: state,
      },
    });

    if (view) {
      return { status: 200, data: "Setting updated" };
    }
  } catch (error) {
    return { status: 400 };
  }
};

export const getVideoComments = async (videoId: string) => {
  try {
    const comment = await client.comment.findMany({
      where: {
        OR: [{ videoId: videoId }, { commentId: videoId }],
      },
      include: {
        reply: {
          include: {
            User: true,
          },
        },
        User: true,
      },
    });

    return { status: 200, data: comment };
  } catch (error) {
    return { status: 400 };
  }
};

export const createCommentAndReply = async (
  userId: string,
  comment: string,
  videoId: string,
  commentId?: string | undefined
) => {
  try {
    if (commentId) {
      const reply = await client.comment.update({
        where: {
          id: commentId,
        },
        data: {
          reply: {
            create: {
              comment,
              userId,
              videoId,
            },
          },
        },
      });

      if (reply) {
        return { status: 200, data: "Reply posted" };
      }
    }

    const newComment = await client.video.update({
      where: {
        id: videoId,
      },
      data: {
        Comment: {
          create: {
            comment,
            userId,
          },
        },
      },
    });

    if (newComment) {
      return { status: 200, data: "New comment added" };
    }
  } catch (error) {
    return { status: 400 };
  }
};

export const getWixContent = async () => {
  try {
    const myWixClient = createClient({
      modules: { items },
      auth: OAuthStrategy({
        clientId: process.env.WIX_AUTH_ID as string,
      }),
    });

    const video1 = await myWixClient.items.query("Opal-Video").find();

    const videoId = video1.items.map((v) => v?.title);

    const video = await client.video.findMany({
      where: {
        id: {
          in: videoId,
        },
      },
      select: {
        id: true,
        createdAt: true,
        title: true,
        source: true,
        processing: true,
        workSpaceId: true,
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
          },
        },
        Folder: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (video && video.length > 0) {
      return { status: 200, data: video };
    }
    return { status: 404 };
  } catch (error) {
    console.log("Error fetching Wix content:", error);
    return { status: 500 };
  }
};

export const deleteVideo = async (id: string) => {
  const user = await currentUser();
  if (!user) {
    return { status: 401 };
  }

  try {
    const video = await client.video.delete({
      where: {
        id: id,
      },
    });

    if (video) {
      return { status: 200 };
    }
  } catch (error) {
    console.log("Error while deleting video:", error);
    return { status: 500 };
  }
};
