import client from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const body = await req.json()
        const personalWorkspaceId = await client.user.findUnique({
            where: {
                id
            },
            select: {
                workspace: {
                    where: {
                        type: 'PERSONAL'
                    },
                    select: {
                        id: true
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            }
        })
        let cleanId = personalWorkspaceId?.workspace[0].id?.split('.')[0]
        const startProcessingVideo = await client.workSpace.update({
            where: {
                id: cleanId
            },
            data: {
                videos: {
                    create: {
                        source: body?.filename,
                        userId: id
                    }
                }   
            },
            select: {
                User: {
                    select: {
                        subscription: {
                            select: {
                                plan: true
                            }
                        }
                    }
                }
            }
        })
console.log('cleanId ', cleanId)
        if (startProcessingVideo) {
            return NextResponse.json({
                status: 200,
                plan: startProcessingVideo.User?.subscription?.plan,
                workspaceId: cleanId
            })
        }

        return NextResponse.json({ status: 400 })
    } catch (error) {
        console.log('Error in processing video', error)
    }
}
