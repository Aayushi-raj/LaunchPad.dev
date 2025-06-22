// import React from "react";

// function WelcomeBanner() {
//     return (
//         <div className="p-5  bg-gradient-to-r from-[#92ccdd] via-[#fdc4ec] to-[#c7eff0] rounded-lg shadow-lg ">
//             <h2 className="text-2xl font-bold text-[#02386E]" >A Launchpad for your career and personal growth</h2>
//             <p className="text-[#02386E]">Turn Confusion into Clarity. Build Your Tech Career with Purpose.
//                 Personalized Roadmaps. Real Projects. Teams That Grow Together.
//                 Not Just Learning. Becoming.</p>
//             <button className="mt-4 bg-[#02386E] text-white py-2 px-4 rounded hover:bg-blue-900">Get Started 🚀</button>
//         </div>
//     )
// }

// export default WelcomeBanner;

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket } from "lucide-react";

const WelcomeBanner = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 border-0 text-white overflow-hidden relative animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
      <CardHeader className="relative z-10 pb-4">
        <CardTitle className="text-3xl font-bold mb-2 animate-slide-down">
          A Launchpad for your career and personal growth
        </CardTitle>
        <CardDescription className="text-blue-100 text-lg animate-fade-in-up animation-delay-300">
          Turn Confusion into Clarity. Build Your Tech Career with Purpose. Personalized Roadmaps. Real Projects. Teams That Grow Together. Not Just Learning. Becoming.
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 pt-0">
        <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 animate-scale-in animation-delay-500">
          <Rocket className="w-5 h-5 mr-2" />
          Get Started
        </Button>
      </CardContent>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 animate-float"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12 animate-bounce-subtle"></div>
    </Card>
  );
};

export default WelcomeBanner;