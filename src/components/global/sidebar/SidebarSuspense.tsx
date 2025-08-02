'use client'

import { Suspense } from 'react'
import Sidebar from './index'
import { Loader2 } from 'lucide-react'

const SidebarSuspense = ({ activeWorkspaceId }: { activeWorkspaceId: string }) => {
  return (
    <Suspense 
      fallback={
        <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
          <div className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-3 absolute top-0 left-0 right-0">
            <div className="w-10 h-10 bg-gray-700 rounded animate-pulse" />
            <div className="w-20 h-8 bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="mt-16 w-full">
            <div className="w-full h-10 bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="w-full space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-full h-8 bg-gray-700 rounded animate-pulse" />
            ))}
          </div>
        </div>
      }
    >
      <Sidebar activeWorkspaceId={activeWorkspaceId} />
    </Suspense>
  )
}

export default SidebarSuspense 