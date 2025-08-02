// import { Button } from "@/components/ui/button";
// import { Check, X } from "lucide-react";
// import Link from "next/link";
// import React from "react";

// type Props = {};

// const PricingSection = (props: Props) => {
//   const plans = [
//     {
//       name: "Free",
//       price: { monthly: "$0" },
//       features: [
//         { name: "Single workspace", included: true },
//         { name: "720p video quality", included: true },
//         { name: "Basic video sharing", included: true },
//         { name: "AI-powered transcripts", included: false },
//         { name: "Automatic video title generation", included: false },
//         { name: "Invite user in workspace", included: false },
//       ],
//     },
//     {
//       name: "Pro",
//       price: { monthly: "$99" },
//       features: [
//         { name: "Unlimited workspaces", included: true },
//         { name: "1080p video quality", included: true },
//         { name: "Advanced sharing options", included: true },
//         { name: "AI-powered transcripts", included: true },
//         { name: "Automatic video title generation", included: true },
//         { name: "Invite user in workspace", included: true },
//       ],
//     },
//   ];

//   return (
//     <section className="py-20 bg-gray-900" id="pricing">
//       <div className="container mx-auto px-4">
//         <h2 className="text-4xl font-bold mb-12 text-center">
//           Choose Your Plan
//         </h2>
//         <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
//           {plans.map((plan, index) => (
//             <div
//               key={plan.name}
//               className="bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-700 relative overflow-hidden"
//             >
//               {plan.name === "Pro" && (
//                 <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
//                   POPULAR
//                 </div>
//               )}
//               <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
//               <div className="mb-6">
//                 <span className="text-5xl font-bold">{plan.price.monthly}</span>
//                 <span className="text-gray-400 ml-2">/month</span>
//               </div>
//               <ul className="space-y-3 mb-8">
//                 {plan.features.map((feature, featureIndex) => (
//                   <div>
//                     {feature.included ? (
//                       <Check className="text-green-500 mr-2 flex-shrink-0" />
//                     ) : (
//                       <X className="text-red-500 mr-2 flex-shrink-0" />
//                     )}
//                     <span
//                       className={
//                         feature.included ? "text-gray-200" : "text-gray-400"
//                       }
//                     >
//                       {feature.name}
//                     </span>
//                   </div>
//                 ))}
//               </ul>
//               <Link href="/auth/sign-in">
//                 <Button
//                   className="w-full"
//                   variant={plan.name === "Pro" ? "default" : "outline"}
//                 >
//                   {plan.name === "Free" ? "Get Started" : "Upgrade to Pro"}
//                 </Button>
//               </Link>
//             </div>
//           ))}
//         </div>
//         <p className="text-center text-gray-400 mt-8">
//           All plans come with a 14-day money-back guarantee. No questions asked.
//         </p>
//       </div>
//     </section>
//   );
// };

// export default PricingSection;


import { Button } from "@/components/ui/button"
import { Check, X, Star } from "lucide-react"
import Link from "next/link"

type Props = {}

const PricingSection = (props: Props) => {
  const plans = [
    {
      name: "Free",
      price: { monthly: "$0" },
      description: "Perfect for getting started",
      features: [
        { name: "Single workspace", included: true },
        { name: "720p video quality", included: true },
        { name: "Basic video sharing", included: true },
        { name: "5GB storage", included: true },
        { name: "AI-powered transcripts", included: false },
        { name: "Automatic video title generation", included: false },
        { name: "Invite users in workspace", included: false },
        { name: "Advanced analytics", included: false },
      ],
    },
    {
      name: "Pro",
      price: { monthly: "$99" },
      description: "For teams and professionals",
      popular: true,
      features: [
        { name: "Unlimited workspaces", included: true },
        { name: "4K video quality", included: true },
        { name: "Advanced sharing options", included: true },
        { name: "100GB storage", included: true },
        { name: "AI-powered transcripts", included: true },
        { name: "Automatic video title generation", included: true },
        { name: "Invite users in workspace", included: true },
        { name: "Advanced analytics", included: true },
      ],
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-800 to-gray-900" id="pricing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Plan</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Start free and upgrade as you grow. All plans include our core features.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border transition-all duration-300 hover:transform hover:scale-105 ${
                plan.popular
                  ? "border-purple-500/50 ring-2 ring-purple-500/20"
                  : "border-gray-700/50 hover:border-purple-500/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold px-4 py-2 rounded-full flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl sm:text-5xl font-bold">{plan.price.monthly}</span>
                  <span className="text-gray-400 ml-2 text-lg">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    {feature.included ? (
                      <Check className="text-green-500 h-5 w-5 flex-shrink-0" />
                    ) : (
                      <X className="text-red-500 h-5 w-5 flex-shrink-0" />
                    )}
                    <span className={`text-sm sm:text-base ${feature.included ? "text-gray-200" : "text-gray-500"}`}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href="/auth/sign-in">
                <Button
                  className={`w-full py-3 text-base font-semibold rounded-full transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                  }`}
                >
                  {plan.name === "Free" ? "Get Started Free" : "Upgrade to Pro"}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm sm:text-base">
            All plans come with a 14-day money-back guarantee. No questions asked.
          </p>
        </div>
      </div>
    </section>
  )
}

export default PricingSection
