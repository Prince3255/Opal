// import React from "react";

// type Props = {};

// const VideoShowcase = (props: Props) => {
//   const video = {
//     id: 1,
//     src: "https://res.cloudinary.com/dzgaw9gfu/video/upload/v1752599096/video-recording-opal/8fc7ad73-89b2-4571-b2bd-983ed2e144e6-dbf4c29f.webm",
//     title: "Opal Tutorial",
//     description: "How Opal works",
//   };

//   return (
//     <section className="bg-gray-800 py-20">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold mb-8 text-center">
//           See Opal in Action
//         </h2>
//         <div defaultValue="workspace" className="w-full max-w-4xl mx-auto">
//           <h3 className="text-xl font-semibold mt-4">{video.title}</h3>
//           <p className="text-gray-300 mt-2">{video.description}</p>
//           <div key={video.id} className="mt-4">
//             <video
//               src={video.src}
//               className="w-full h-full object-cover"
//               controls={true}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default VideoShowcase;


type Props = {}

const VideoShowcase = (props: Props) => {
  const video = {
    id: 1,
    src: "https://res.cloudinary.com/dzgaw9gfu/video/upload/v1752599096/video-recording-opal/8fc7ad73-89b2-4571-b2bd-983ed2e144e6-dbf4c29f.webm",
    title: "Opal Tutorial",
    description: "See how Opal transforms your video workflow",
  }

  return (
    <section className="bg-gradient-to-b from-gray-800 to-gray-900 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            See Opal in{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Action</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Watch how Opal streamlines your video creation and collaboration process
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-700/50">
            <div className="aspect-video rounded-xl overflow-hidden bg-gray-900 shadow-2xl">
              <video
                src={video.src}
                className="w-full h-full object-cover"
                controls={true}
                poster="/placeholder.svg?height=450&width=800"
              />
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">{video.title}</h3>
              <p className="text-gray-400 text-base sm:text-lg">{video.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoShowcase
