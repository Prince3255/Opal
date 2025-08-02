"use client"

import CreateFolder from "@/components/global/create-folder"
import CreateWorkspace from "@/components/global/create-workspace"
import Folder from "@/components/global/folder"
import VideoCard from "@/components/global/video-folder"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Props = {
  params: { workspaceId: string }
}

const page = ({ params }: Props) => {
  const { workspaceId } = params

  return (
    <div className="p-4 sm:p-6">
      <Tabs className="mt-6" defaultValue="videos">
        <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-4 sm:gap-0">
          <TabsList className="bg-transparent gap-2 pl-0 w-full sm:w-auto">
            <TabsTrigger
              className="p-3 px-4 sm:p-[13px] sm:px-6 rounded-full data-[state=active]:bg-[#252525] text-sm flex-1 sm:flex-none"
              value="videos"
            >
              Videos
            </TabsTrigger>
            {/* <TabsTrigger
              className="p-3 px-4 sm:p-[13px] sm:px-6 rounded-full data-[state=active]:bg-[#252525] text-sm flex-1 sm:flex-none"
              value="archive"
            >
              Archive
            </TabsTrigger> */}
          </TabsList>

          <div className="flex gap-0 sm:gap-3 w-full sm:w-auto">
            <div className="flex-1 sm:flex-none">
              <CreateWorkspace />
            </div>
            <div className="flex-1 sm:flex-none">
              <CreateFolder workspaceId={workspaceId} />
            </div>
          </div>
        </div>

        <section className="py-6 sm:py-9">
          <TabsContent value="videos">
            <Folder workspaceId={workspaceId} />
          </TabsContent>
        </section>

        <section className="pb-6 sm:pb-8">
          <TabsContent value="videos">
            <VideoCard workspaceId={workspaceId} />
          </TabsContent>
        </section>
      </Tabs>
    </div>
  )
}

export default page
