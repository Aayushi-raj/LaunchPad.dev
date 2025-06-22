"use client";
import { motion } from "framer-motion";
import { Lightbulb, Workflow, Rocket } from "lucide-react";

const steps = [
  {
    icon: <Lightbulb size={32} className="text-indigo-600" />,
    title: "Discover Your Path",
    description:
      "Get personalized career guidance through our AI Career Coach based on your skills, interests, and goals.",
  },
  {
    icon: <Workflow size={32} className="text-indigo-600" />,
    title: "Get a Custom Roadmap",
    description:
      "Launchpad auto-generates a learning roadmap tailored for you, step-by-step and beginner-friendly.",
  },
  {
    icon: <Rocket size={32} className="text-indigo-600" />,
    title: "Build with a Team",
    description:
      "Use TeamUp AI to connect with creators and start building real projects with aligned teammates.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 py-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6 text-gray-900"
        >
          How Launchpad Works
        </motion.h2>
        <p className="text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
          Just three steps to start your journey toward clarity, confidence, and career-building.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 border hover:shadow-lg transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
// This component outlines how Launchpad.dev works in three simple steps, using animations for a modern touch.