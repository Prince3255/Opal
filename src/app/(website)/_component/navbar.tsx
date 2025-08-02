// import { Button } from '@/components/ui/button';
// import { User } from 'lucide-react';
// import Image from 'next/image';
// import Link from 'next/link';
// import React from 'react';

// type Props = {};

// const LandingPageNavBar = (props: Props) => {
//   return (
//     <div className="flex w-full justify-between items-center px-1">
//       <div className="text-3xl font-semibold flex items-center gap-x-3">
//         <Image alt="logo" src="/opal-logo.svg" width={40} height={40} />
//         Opal
//       </div>
//       <div className="hidden gap-x-10 items-center lg:flex">
//         <Link href="/" className="bg-[#7320DD] py-2 px-5 font-semibold text-lg rounded-full hover:bg-[#7320DD]/80">Home</Link>
//         <Link href="#pricing">Pricing</Link>
//         <Link href="#features">Features</Link>
//       </div>
//       <Link href="/auth/sign-in">
//         <Button className="text-base flex gap-x-2">
//           <User fill="#000" />
//           Login
//         </Button>
//       </Link>
//     </div>
//   );
// };

// export default LandingPageNavBar;



"use client"

import { Button } from "@/components/ui/button"
import { User, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

type Props = {}

const LandingPageNavBar = (props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex w-full justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl sm:text-3xl font-bold flex items-center gap-x-3">
            <Image alt="logo" src="/opal-logo.svg" width={40} height={40} className="rounded-lg" />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Opal</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-x-8 items-center">
            <Link
              href="/"
              className="bg-purple-600 hover:bg-purple-700 py-2 px-6 font-semibold text-base rounded-full transition-all duration-300"
            >
              Home
            </Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors duration-300 font-medium">
              Pricing
            </Link>
            <Link
              href="#features"
              className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
            >
              Features
            </Link>
          </div>

          {/* Desktop Login Button */}
          <div className="hidden lg:block">
            <Link href="/auth/sign-in">
              <Button className="text-base flex gap-x-2 bg-white text-gray-900 hover:bg-gray-100 px-6 py-2 rounded-full font-semibold transition-all duration-300">
                <User className="h-4 w-4" />
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-800 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#pricing"
                className="text-gray-300 hover:text-white transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#features"
                className="text-gray-300 hover:text-white transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link href="/auth/sign-in" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full text-base flex gap-x-2 bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-full font-semibold transition-all duration-300 mt-4">
                  <User className="h-4 w-4" />
                  Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default LandingPageNavBar
