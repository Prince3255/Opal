"use server";

import client from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import nodemailer from "nodemailer";

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html?: string
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASSWORD,
    },
  });

  const mailOption = {
    to,
    subject,
    text,
    html,
  };

  return { transporter, mailOption };
};

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return { status: 403 };
    }

    const userExist = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        clerkid: true,
        workspace: true,
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (userExist) {
      return { status: 200, user: userExist };
    }

    const newUser = await client.user.create({
      data: {
        clerkid: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstname: user.firstName,
        lastname: user.lastName,
        image: user.imageUrl,
        workspace: {
          create: {
            name: `${user.firstName}'s Workspace`,
            type: "PERSONAL",
          },
        },
        subscription: {
          create: {},
        },
        studio: {
          create: {},
        },
      },
    });

    if (newUser) {
      const createdUser = await client.user.findUnique({
        where: {
          clerkid: user.id,
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          clerkid: true,
          workspace: true,
          subscription: {
            select: {
              plan: true,
            },
          },
        },
      });

      return { status: 201, user: createdUser };
    }

    return { status: 500 };
  } catch (error) {
    console.log("Error while authenticating", error);
    return { status: 500 };
  }
};

export const getUserProfile = async () => {
  try {
    const user = await currentUser();

    if (!user) return { status: 404, data: [] };

    const profileIdAndImage = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        image: true,
        id: true,
        clerkid: true,
        subscription: {
          select: {
            plan: true,
          },
        },
        workspace: {
          select: {
            id: true
          }
        }
      },
    });
    if (profileIdAndImage) return { status: 200, data: profileIdAndImage };
  } catch (error) {
    return { status: 500, data: [] };
  }
};

export const inviteMembers = async (
  workspaceId: string,
  recieverId: string,
  email: string
) => {
  try {
    const user = await currentUser();

    if (!user) return { status: 404 };

    const senderInfo = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
      },
    });

    if (senderInfo?.id) {
      let cleanId = workspaceId.slice(0, 36);
      const workspace = await client.workSpace.findUnique({
        where: {
          id: cleanId,
        },
        select: {
          name: true,
        },
      });

      if (workspace) {
        const invitation = await client.invite.create({
          data: {
            senderId: senderInfo.id,
            recieverId: recieverId,
            content: `You are invited to join ${workspace.name} Workspace, click accept to confirm`,
            workSpaceId: cleanId,
          },
          select: {
            id: true,
          },
        });

        const recieverInfo = await client.user.findUnique({
          where: {
            id: recieverId,
          },
          select: {
            firstname: true,
            lastname: true,
          }
        })

        await client.user.update({
          where: {
            clerkid: user.id,
          },
          data: {
            notification: {
              create: {
                content: `${user.firstName} ${user?.lastName || ''} invited ${recieverInfo?.firstname} ${recieverInfo?.lastname || ''} into ${workspace.name}`,
              },
            },
          },
        });

        if (invitation) {
          const { transporter, mailOption } = await sendEmail(
            email,
            `You got an invitation from ${user?.firstName} ${user?.lastName || ''} to join ${workspace.name} Workspace`,
            `You are invited to join ${workspace.name} Workspace, click accept to confirm`,
            `<a href="${process.env.NEXT_PUBLIC_HOST_URL}/invite/${invitation.id}" style="background-color: #000; padding: 5px 10px; border-radius: 10px;">Accept Invite</a>`
          );

          transporter.sendMail(mailOption, (error, info) => {
            if (error) {
              console.log("🔴", error.message);
            } else {
              console.log("✅", info);
            }
          });
          return { status: 200, data: "Invite sent" };
        }

        return { status: 400, data: "Error sending invite" };
      }

      return { status: 404, data: "Workspace not found" };
    }

    return { status: 404, data: "Recipient not found" };
  } catch (error) {
    return { status: 500, data: "Oops! something went wrong" };
  }
};

export const acceptInvite = async (inviteId: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { status: 404 };
    }

    const invitation = await client.invite.findUnique({
      where: {
        id: inviteId,
      },
      select: {
        workSpaceId: true,
        reciever: {
          select: {
            clerkid: true,
          },
        },
      },
    });

    if (user.id === invitation?.reciever?.clerkid) {
      const accept = client.invite.update({
        where: {
          id: inviteId,
        },
        data: {
          accepted: true,
        },
      });

      const updateMember = client.user.update({
        where: {
          clerkid: user.id,
        },
        data: {
          members: {
            create: {
              workSpaceId: invitation.workSpaceId,
            },
          },
        },
      });

      const membersTransaction = await client.$transaction([
        accept,
        updateMember,
      ]);

      if (membersTransaction) {
        return { status: 200 };
      }

      return { status: 400 };
    }
  } catch (error) {
    return { status: 400 };
  }
};

export const completeSubscription = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return { status: 404 };
    }

    const subscribe = await client.user.update({
      where: {
        clerkid: user.id,
      },
      data: {
        subscription: {
          update: {
            data: {
              plan: "PRO",
            },
          },
        },
      },
    });
    if (subscribe) {
      return { status: 200 };
    }
    return { status: 400 };
  } catch (error) {
    return { status: 400 };
  }
};

export const searchAll = async (query: string) => {
  const user = await currentUser();

  if (!user) {
    return { folders: [], videos: [], workspace: [] };
  }

  if (!query) {
    return { folders: [], videos: [], workspace: [] };
  }

  const internalUser = await client.user.findUnique({
    where: {
      clerkid: user.id,
    },
    select: {
      id: true,
    },
  });

  if (!internalUser) {
    return { folders: [], videos: [], workspace: [] };
  }

  try {
    const [folders, videos, workspace] = await Promise.all([
      client.folder.findMany({
        where: {
          name: { contains: query, mode: "insensitive" },
          WorkSpace: {
            OR: [
              { userId: internalUser.id }, // Correctly use internal UUID
              { members: { some: { userId: internalUser.id } } },
            ],
          },
        },
        select: { id: true, name: true, workSpaceId: true },
      }),
      client.video.findMany({
        where: {
          title: { contains: query, mode: "insensitive" },
          userId: internalUser.id,
          WorkSpace: {
            OR: [
              { type: "PUBLIC" },
              { userId: internalUser.id },
              { members: { some: { userId: internalUser.id } } },
            ],
          },
        },
        select: { id: true, title: true, workSpaceId: true },
      }),
      client.workSpace.findMany({
        where: {
          name: { contains: query, mode: "insensitive" },
          OR: [
            { userId: internalUser.id },
            {
              members: {
                some: {
                  userId: internalUser.id,
                },
              },
            },
          ],
        },
        select: {
          id: true,
          name: true,
        },
      }),
    ]);

    return { folders, videos, workspace };
  } catch (error) {
    console.error("Error in search: ", error);
    return { folders: [], videos: [], workspace: [] };
  }
};
