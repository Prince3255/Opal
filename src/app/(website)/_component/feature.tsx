import workspace from '../../../../public/workspace.png'
import recording from '../../../../public/recoding.png'
import folder from '../../../../public/folder.png'
import ai from '../../../../public/ai.png'
import invite from '../../../../public/invite.png'
import Image from "next/image"

type Props = {}

const FeatureSection = (props: Props) => {
  const data = [
    {
      title: "Create Workspaces",
      content: (
        <div className="space-y-6">
          <p className="text-gray-300 font-normal text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Organize your projects efficiently with dedicated workspaces. Invite team members, manage permissions, and
            keep your video content structured for maximum productivity.
          </p>
          <div className="flex justify-center">
            <div className="relative max-w-4xl w-full">
              <Image
                src={workspace}
                alt="Opal workspace interface"
                width={800}
                height={450}
                className="rounded-xl object-cover w-full h-auto shadow-2xl border border-gray-700/50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Record & Upload Videos",
      content: (
        <div className="space-y-6">
          <p className="text-gray-300 font-normal text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Easily record videos directly in your browser or use our desktop app for more advanced recording options.
            High-quality recording made simple.
          </p>
          <div className="flex justify-center">
            <div className="relative max-w-4xl w-full">
              <Image
                src={recording}
                alt="Opal video recording interface"
                width={800}
                height={450}
                className="rounded-xl object-cover w-full h-auto shadow-2xl border border-gray-700/50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Organize & Share",
      content: (
        <div className="space-y-6">
          <p className="text-gray-300 font-normal text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Create folders, tag videos, and use our powerful search feature to keep your content organized. Share videos
            securely with customizable privacy settings and expiration dates.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 max-w-5xl mx-auto">
            <div className="relative">
              <Image
                src={folder}
                alt="Opal video organization interface"
                width={600}
                height={338}
                className="rounded-xl object-cover w-full h-auto shadow-xl border border-gray-700/50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-xl"></div>
            </div>
            <div className="relative">
              <Image
                src={ai}
                alt="Opal AI features"
                width={600}
                height={338}
                className="rounded-xl object-cover w-full h-auto shadow-xl border border-gray-700/50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Collaborate & Feedback",
      content: (
        <div className="space-y-6">
          <p className="text-gray-300 font-normal text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Invite team members or clients to view and comment on your videos. Use time-stamped comments for precise
            feedback and track viewer engagement with detailed analytics.
          </p>
          <div className="flex justify-center">
            <div className="relative max-w-4xl w-full">
              <Image
                src={invite}
                alt="Opal collaboration features"
                width={800}
                height={450}
                className="rounded-xl object-cover w-full h-auto shadow-2xl border border-gray-700/50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "AI-Powered Features",
      content: (
        <div className="space-y-6">
          <p className="text-gray-300 text-base sm:text-lg font-normal leading-relaxed max-w-3xl mx-auto">
            Leverage AI technology for automatic video transcription, smart video titles and descriptions, and content
            summarization. Save time and enhance your video content effortlessly.
          </p>
          <div className="flex justify-center">
            <div className="relative max-w-4xl w-full">
              <Image
                src={ai}
                alt="Opal AI-powered features"
                width={800}
                height={450}
                className="rounded-xl object-cover w-full h-auto shadow-2xl border border-gray-700/50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="w-full bg-gradient-to-b from-gray-900 to-gray-800 py-16 lg:py-24" id="features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {data?.map((d, index) => {
          return (
            <div key={index} className="text-center mb-20 lg:mb-32 last:mb-0">
              <div className="mb-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {d.title}
                </h2>
              </div>
              <div>{d.content}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FeatureSection
