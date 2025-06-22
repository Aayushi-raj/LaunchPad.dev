"use client";

// import Image from "next/image";
// import Link from "next/link";

// export default function HeroSection() {
//   return (
//     <section className="relative overflow-hidden py-24 bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
//       <div className="max-w-7xl mx-auto px-6 text-center">
//         <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white">
//           Launch Your Dev Career with
//           <br />
//           <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
//             Launchpad.dev
//           </span>
//         </h1>

//         <p className="mt-6 text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
//           AI-powered platform to guide, connect, and accelerate your career —
//           from roadmap to real-world projects.
//         </p>

//         <div className="mt-10 flex justify-center gap-4 flex-wrap">
//           <Link href="/dashboard">
//             <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
//               Get Started for Free
//             </button>
//           </Link>
//           <Link href="#how-it-works">
//             <button className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 dark:bg-transparent dark:text-white dark:border-gray-400 dark:hover:bg-neutral-800 font-semibold py-3 px-6 rounded-lg transition duration-300">
//               See How it Works
//             </button>
//           </Link>
//         </div>

//         <div className="mt-12">
//           <Image
//             src="/images/hero-illustration.svg"
//             alt="Launchpad Illustration"
//             width={800}
//             height={450}
//             className="mx-auto drop-shadow-lg"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }


// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Sparkles, Code, Rocket, Star, Zap, ArrowRight } from "lucide-react";

// const HeroSection = () => {
//   return (
//     <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-pastel-sky/5 to-pastel-lavender/10">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0">
//         {/* Floating geometric shapes */}
//         <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-pastel-coral to-pastel-rose rounded-2xl opacity-20 animate-float"></div>
//         <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-pastel-mint to-pastel-emerald rounded-full opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
//         <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-pastel-peach to-pastel-pink rounded-lg opacity-25 animate-float" style={{ animationDelay: '4s' }}></div>
//         <div className="absolute bottom-20 right-40 w-24 h-24 bg-gradient-to-r from-pastel-purple to-pastel-lavender rounded-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        
//         {/* Grid pattern overlay */}
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
//       </div>

//       <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16">
//         {/* Badge */}
//         <div className="flex justify-center mb-8">
//           <Badge className="bg-gradient-to-r from-pastel-coral/20 to-pastel-rose/20 text-pastel-coral border-pastel-coral/30 px-4 py-2 text-sm font-medium">
//             <Sparkles className="w-4 h-4 mr-2" />
//             AI-Powered Career Acceleration
//           </Badge>
//         </div>

//         {/* Main Heading */}
//         <div className="text-center">
//           <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-6">
//             <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
//               Launch Your
//             </span>
//             <span className="block bg-gradient-to-r from-pastel-coral via-pastel-rose to-pastel-pink bg-clip-text text-transparent animate-gradient-x">
//               Dev Career
//             </span>
//             <span className="block text-gray-800 text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-4">
//               with{" "}
//               <span className="bg-gradient-to-r from-pastel-sky via-pastel-cyan to-pastel-mint bg-clip-text text-transparent font-extrabold">
//                 Launchpad.dev
//               </span>
//             </span>
//           </h1>

//           <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
//             AI-powered platform to{" "}
//             <span className="text-pastel-purple font-semibold">guide</span>,{" "}
//             <span className="text-pastel-mint font-semibold">connect</span>, and{" "}
//             <span className="text-pastel-coral font-semibold">accelerate</span>{" "}
//             your career — from roadmap to real-world projects.
//           </p>

//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
//             <Button 
//               size="lg" 
//               className="bg-gradient-to-r from-pastel-coral to-pastel-rose hover:from-pastel-rose hover:to-pastel-pink text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
//             >
//               <Rocket className="w-5 h-5 mr-2 group-hover:animate-bounce" />
//               Get Started for Free
//               <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
//             </Button>
            
//             <Button 
//               variant="outline" 
//               size="lg" 
//               className="border-2 border-pastel-lavender text-pastel-purple hover:bg-pastel-lavender/10 font-semibold px-8 py-4 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 group"
//             >
//               <Code className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
//               See How it Works
//             </Button>
//           </div>

          {/* Feature Highlights */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white/60 backdrop-blur-sm border border-pastel-mint/20 rounded-3xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
              <div className="w-12 h-12 bg-gradient-to-r from-pastel-mint to-pastel-emerald rounded-2xl flex items-center justify-center mb-4 group-hover:animate-pulse">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">AI Roadmaps</h3>
              <p className="text-gray-600">Personalized learning paths powered by AI</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm border border-pastel-sky/20 rounded-3xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
              <div className="w-12 h-12 bg-gradient-to-r from-pastel-sky to-pastel-cyan rounded-2xl flex items-center justify-center mb-4 group-hover:animate-pulse">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Real Projects</h3>
              <p className="text-gray-600">Build portfolio-worthy applications</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm border border-pastel-coral/20 rounded-3xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
              <div className="w-12 h-12 bg-gradient-to-r from-pastel-coral to-pastel-rose rounded-2xl flex items-center justify-center mb-4 group-hover:animate-pulse">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Career Connect</h3>
              <p className="text-gray-600">Network with industry professionals</p>
            </div>
          </div> */}

          {/* Code Preview */}
          {/* <div className="bg-gray-900 rounded-3xl p-8 max-w-4xl mx-auto shadow-2xl border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-pastel-coral rounded-full"></div>
                <div className="w-3 h-3 bg-pastel-peach rounded-full"></div>
                <div className="w-3 h-3 bg-pastel-mint rounded-full"></div>
              </div>
              <span className="text-gray-400 text-sm font-mono">career-roadmap.js</span>
            </div>
            <div className="text-left font-mono text-sm space-y-2">
              <div className="text-pastel-sky">const <span className="text-pastel-mint">career</span> = <span className="text-pastel-peach">new</span> <span className="text-white">DeveloperPath</span>();</div>
              <div className="text-gray-400">// AI-powered guidance</div>
              <div className="text-pastel-coral">career.<span className="text-white">learn</span>(<span className="text-pastel-lavender">'react'</span>);</div>
              <div className="text-pastel-coral">career.<span className="text-white">build</span>(<span className="text-pastel-lavender">'portfolio'</span>);</div>
              <div className="text-pastel-coral">career.<span className="text-white">connect</span>(<span className="text-pastel-lavender">'mentors'</span>);</div>
              <div className="text-pastel-mint">career.<span className="text-white">launch</span>(); <span className="text-gray-400">// 🚀</span></div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Bottom gradient fade
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section> */}
//         </div>
//         </div>
//         </section>
//   );
// };

// export default HeroSection;

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
      </div>

      {/* Header */}
      {/* <header className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg"></div>
          <span className="text-white font-bold text-xl">LAUNCHPAD.DEV</span>
        </div>
      </header> */}
      {/* <div className="flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div> */}
        <div className="absolute top-4 right-6 z-10">
        <UserButton afterSignOutUrl="/" />
      </div>
      

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-4 pt-5">
        <div className="text-center max-w-6xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-pink-500/20 to-violet-500/20 border border-pink-500/30 backdrop-blur-sm mb-8">
            <span className="text-pink-400 font-medium">✨ AI-Powered Career Acceleration</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tight leading-tight font-black leading-none mb-8">
            <span className="block text-white tracking-tight">Launch Your</span>
            <span className="block bg-gradient-to-r from-pink-500 via-red-500 to-orange-400 bg-clip-text text-transparent">
              Dev Career
            </span>
            <span className="block text-white tracking-tight">with</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              Launchpad.dev
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            AI-powered platform to <span className="text-purple-400 font-semibold animate-glow">guide</span>, <span className="text-cyan-400 font-semibold animate-glow">connect</span>, and <span className="text-pink-400 font-semibold animate-glow">accelerate</span> your career — from roadmap to real-world projects.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
           <Link href="/dashboard">
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-2xl shadow-pink-500/25 hover:scale-105 hover:shadow-pink-500/40 transition-all duration-300">
              Start Your Journey
            </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 font-semibold px-8 py-4 text-lg rounded-full bg-transparent backdrop-blur-sm hover:scale-105 transition-all duration-300">
              Watch Demo
            </Button>
          </div>

          {/* Stats or features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">10k+</div>
              <div className="text-gray-400 font-medium">Developers Launched</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">500+</div>
              <div className="text-gray-400 font-medium">Partner Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">95%</div>
              <div className="text-gray-400 font-medium">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </div>
  );
};

export default Index;
