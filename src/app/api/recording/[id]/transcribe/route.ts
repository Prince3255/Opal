import client from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const { id } = params;
  const content = body.content;
  let source = body.filename;
  if (body.filename.endsWith(".mp4")) {
    source = body.filename.split("/").pop().split(".")[0];
  }
  let workspaceId = body?.workspaceId || null;
  try {
    if (!workspaceId) {
      const user = await client.user.findUnique({
        where: {
          id: id,
        },
        select: {
          workspace: {
            where: {
              type: "PERSONAL",
            },
            select: {
              id: true,
            },
          },
        },
      });
      console.log("user", user);
      workspaceId = user?.workspace[0]?.id;
    }
    if (body.trial) {
      const trial = await client.user.update({
        where: {
          id: id,
        },
        data: {
          trial: true,
        },
      });

      if (trial) {
        console.log("trial ", trial);
      }
    }

    const option = {
      method: "POST",
      url: process.env.VOICEFLOW_KNOWLEDGE_BASE_API,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: process.env.VOICE_FLOW_API_KEY,
      },
      data: {
        data: {
          schema: {
            searchableFields: ["title", "transcript"],
            metadataFields: ["title", "transcript", "workspaceId"],
          },
          name: content.title,
          items: [
            {
              title: content.title,
              transcript: `${body.transcript} [WORKSPACE:${workspaceId}]`,
              workspaceId: workspaceId,
            },
          ],
        },
      },
    };

    const updateKB = await axios.request(option);

    if (updateKB.status === 200 || updateKB.status !== 200) {
      const transcribed = await client.video.update({
        where: {
          userId: id,
          source: source,
        },
        data: {
          title: content.title,
          description: content.description,
          summery: body.transcript,
          documentId: updateKB.data.data.documentID,
        },
      });
      console.log("updatekb data: ", updateKB.data);
      if (transcribed) console.log("transcribed data1: ", transcribed);
      return NextResponse.json({ status: 200 });
    }
    const transcribed = await client.video.update({
      where: {
        userId: id,
        source: source,
      },
      data: {
        title: content.title,
        description: content.description,
        summery: body.transcript,
      },
    });
    if (transcribed) console.log("transcribed data: ", transcribed);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("Error in transcribing video in opal");
    return NextResponse.json({ status: 400 });
  }
}
