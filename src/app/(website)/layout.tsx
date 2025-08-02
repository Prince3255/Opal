// import React from 'react';

// type Props = {
//   children: React.ReactNode;
// };

// const Layout = ({ children }: Props) => {
//   return (
//     <div className="flex flex-col py-0 px-10 xl:px-0 container min-w-full min-h-screen scrollbar-thin">
//       {/* <LandingPageNavBar /> */}
//       {children}
//       {/* <VoiceflowAgent /> */}
//     </div>
//   );
// };

// export default Layout;

import type React from "react"

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return <div className="min-h-screen">{children}</div>
}

export default Layout
