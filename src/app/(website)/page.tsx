import LandingPageNavBar from "./_component/navbar"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Play } from "lucide-react"
import VideoShowcase from "./_component/showcase"
import FeatureSection from "./_component/feature"
import PricingSection from "./_component/pricing"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <LandingPageNavBar />
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              Record, Share,{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Collaborate
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Opal is your all-in-one solution for video recording and sharing, designed for seamless collaboration and
              productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/sign-in">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Start for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link
                href="https://res.cloudinary.com/dzgaw9gfu/video/upload/v1752599096/video-recording-opal/8fc7ad73-89b2-4571-b2bd-983ed2e144e6-dbf4c29f.webm"
                target="_blank"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-gray-600 text-white hover:bg-gray-800 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300 bg-transparent"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <VideoShowcase />

        {/* Features Grid Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Opal?</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Everything you need to create, share, and collaborate on video content
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Web & Desktop Recording",
                description: "Record directly in your browser or use our desktop app",
              },
              {
                title: "Workspace Collaboration",
                description: "Invite team members and manage permissions easily",
              },
              {
                title: "Folder Organization",
                description: "Keep your videos organized with smart folder structure",
              },
              {
                title: "Secure Video Sharing",
                description: "Share videos securely with customizable privacy settings",
              },
              {
                title: "View Notifications",
                description: "Get notified when someone views or comments on your videos",
              },
              {
                title: "AI-Powered Features",
                description: "Automatic transcription and smart content generation",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-start space-x-4">
                  <CheckCircle className="text-green-500 h-6 w-6 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <FeatureSection />
        <PricingSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-400">&copy; 2025 Opal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
