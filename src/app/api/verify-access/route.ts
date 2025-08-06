import client from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log('body', body)
  const { userId, workspaceId } = body;

  try {
    const workspace = await client.workSpace.findUnique({
      where: {
        id: workspaceId,
      },
      select: {
        userId: true,
        members: {
          where: {
            userId: userId,
          },
        },
      },
    });

    if (!workspace) {
      return NextResponse.json({
        authorized: false,
        message: "Workspace not found",
      });
    }

    if (
      workspace &&
      (workspace.userId === userId || workspace.members.length > 0)
    ) {
      console.log("Access granted");
      return NextResponse.json({
        authorized: true,
        message: "Access granted",
      });
    }

    return NextResponse.json({
      authorized: false,
      message: "Access denied",
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({
      authorized: false,
      message: "Server error",
    });
  }
}
