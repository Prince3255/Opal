import client from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await req.json();
    const { id } = params;

    const content = body.content || {};
    const source = body.filename;
    const transcript = body.transcript;
    let workspaceId = body.workspaceId || null;

    console.log("Transcribe request:", {
      userId: id,
      source,
      workspaceId,
      title: content.title,
      description: content.description,
      transcriptLength: transcript?.length,
    });

    if (!source || !transcript || !content.title) {
      return NextResponse.json(
        {
          status: 400,
          message: "Source, title, or transcript is missing",
        },
        { status: 400 },
      );
    }

    if (!workspaceId) {
      const user = await client.user.findUnique({
        where: {
          id,
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

      workspaceId = user?.workspace?.[0]?.id;
    }

    if (!workspaceId) {
      return NextResponse.json(
        {
          status: 400,
          message: "Workspace was not found",
        },
        { status: 400 },
      );
    }

    if (body.trial) {
      await client.user.update({
        where: {
          id,
        },
        data: {
          trial: true,
        },
      });
    }

    const updateKB = await axios.post(
      process.env.VOICEFLOW_KNOWLEDGE_BASE_API as string,
      {
        data: {
          schema: {
            searchableFields: ["title", "transcript"],
            metadataFields: ["title", "transcript", "workspaceId"],
          },
          name: content.title,
          items: [
            {
              title: content.title,
              transcript: `${transcript} [WORKSPACE:${workspaceId}]`,
              workspaceId,
            },
          ],
        },
      },
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: process.env.VOICE_FLOW_API_KEY,
        },
      },
    );

    console.log("Voiceflow response:", updateKB.data);

    const documentId =
      updateKB.data?.data?.documentID || updateKB.data?.data?.documentId;

    if (!documentId) {
      return NextResponse.json(
        {
          status: 502,
          message: "Voiceflow document ID was not returned",
        },
        { status: 502 },
      );
    }

    const existingVideo = await client.video.findFirst({
      where: {
        userId: id,
        source,
      },
    });

    console.log("Matching video:", existingVideo);

    if (!existingVideo) {
      return NextResponse.json(
        {
          status: 404,
          message: "Video was not found",
          lookup: {
            userId: id,
            source,
          },
        },
        { status: 404 },
      );
    }

    const transcribed = await client.video.update({
      where: {
        id: existingVideo.id,
      },
      data: {
        title: content.title,
        description: content.description,
        summery: transcript,
        documentId,
      },
    });

    console.log("Updated video:", transcribed);

    return NextResponse.json({
      status: 200,
      message: "Video updated successfully",
      data: transcribed,
    });
  } catch (error: any) {
    console.error("Error in transcribing video:", {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack,
    });

    return NextResponse.json(
      {
        status: 500,
        message: error.message || "Failed to update video",
        code: error.code || null,
      },
      { status: 500 },
    );
  }
}