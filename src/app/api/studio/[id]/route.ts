import client from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();

  const studio = await client.user.update({
    where: {
      id: id,
    },
    data: {
      studio: {
        update: {
          screen: body.screen,
          mic: body.audio,
          preset: body.preset,
        },
      },
    },
  });

  if (studio) {
    return NextResponse.json({
      status: 200,
      message: "Studio updated successfully",
    });
  }

  return NextResponse.json({
    status: "400",
    message: "Oops! Something went wrong.",
  });
}
