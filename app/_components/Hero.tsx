"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white">
          Launch Your Dev Career with
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Launchpad.dev
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          AI-powered platform to guide, connect, and accelerate your career —
          from roadmap to real-world projects.
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <Link href="/dashboard">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
              Get Started for Free
            </button>
          </Link>
          <Link href="#how-it-works">
            <button className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 dark:bg-transparent dark:text-white dark:border-gray-400 dark:hover:bg-neutral-800 font-semibold py-3 px-6 rounded-lg transition duration-300">
              See How it Works
            </button>
          </Link>
        </div>

        <div className="mt-12">
          <Image
            src="/images/hero-illustration.svg"
            alt="Launchpad Illustration"
            width={800}
            height={450}
            className="mx-auto drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
