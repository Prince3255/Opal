import { getWixContent } from "@/app/action/workspace";
import HowToPost from "@/components/global/how-to-post";
import VideoCard from "@/components/global/video/video-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export const dynamic = 'force-dynamic'

type Props = {};

const Home = async (props: Props) => {
  const response = await getWixContent();
  const introVideo =
    response?.status === 200 &&
    Array.isArray(response?.data) &&
    response.data.length > 0
      ? response.data[0]
      : null;

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* <h1 className='text-3xl font-bold mb-6'>Getting Started with Opal</h1> */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Content Area: The Interactive Guide */}
        <div className="lg:col-span-2">
          <HowToPost />
        </div>

        {/* Sidebar Area: The Intro Video */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>See Opal in Action</CardTitle>
            </CardHeader>
            <CardContent>
              {introVideo ? (
                <VideoCard
                  {...introVideo}
                  workspaceId={introVideo.workSpaceId!}
                  userId={null}
                />
              ) : (
                <div className="flex aspect-video items-center justify-center rounded-lg border-2 border-dashed text-muted-foreground">
                  <p>Intro video could not be loaded.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
