"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingCTA() {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-20 px-6 sm:px-12 lg:px-24 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold mb-6"
        >
          Start Your Career Journey Today 🚀
        </motion.h2>
        <p className="text-lg sm:text-xl mb-10">
          Whether you're just starting out or ready to build, Launchpad.dev gives you the tools to grow.
        </p>
        <div className="flex justify-center flex-wrap gap-4">
          <Link href="/dashboard">
            <button className="bg-white text-blue-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition">
              Get Started Free
            </button>
          </Link>
          <Link href="/pricing">
            <button className="bg-transparent border border-white py-3 px-6 rounded-xl hover:bg-white hover:text-blue-700 transition font-semibold">
              View Pricing
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
// This component is a call-to-action section for pricing, encouraging users to start their career journey with Launchpad.dev.