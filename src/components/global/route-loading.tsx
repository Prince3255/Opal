'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

const RouteLoading = () => {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [currentPath, setCurrentPath] = useState(pathname)

  useEffect(() => {
    if (pathname !== currentPath) {
      setIsLoading(true)
      setCurrentPath(pathname)
      
      // Hide loading after a short delay to allow for navigation
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [pathname, currentPath])

  if (!isLoading) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
      <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-2 rounded-lg flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Loading...</span>
      </div>
    </div>
  )
}

export default RouteLoading 