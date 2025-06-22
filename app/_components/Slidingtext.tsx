"use client";

import { useEffect, useRef } from "react";

export default function PlanMatchLaunchMarquee() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const scrollSpeed = 30; // Speed in seconds

  const phrase = "PLAN. MATCH. LAUNCH. ";

  useEffect(() => {
    if (marqueeRef.current) {
      const container = marqueeRef.current;
      const content = container.innerHTML;
      container.innerHTML += content; // Duplicate for looping
    }
  }, []);

  return (
    <div className="w-full mt-16 border-y-2 border-gray-900 bg-gradient-to-r from-[#0f0f0f] via-[#161616] to-[#0f0f0f] py-4 overflow-hidden">
      <div
        ref={marqueeRef}
        className="flex whitespace-nowrap animate-scroll"
        style={{
          animation: `scroll-left ${scrollSpeed}s linear infinite`,
        }}
      >
        {Array(20)
          .fill(phrase)
          .map((word, index) => (
            <span
              key={index}
              className={`text-4xl sm:text-5xl font-extrabold tracking-wide mx-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500`}
            >
              {word}
            </span>
          ))}
      </div>

      <style>
        {`
          @keyframes scroll-left {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
}
