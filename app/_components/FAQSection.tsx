"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is Launchpad.dev free to use?",
    answer:
      "Yes! You can get started for free with access to all 3 core AI tools: Career Coach, Roadmap Generator, and TeamUp AI.",
  },
  {
    question: "Do I need technical skills to use Launchpad?",
    answer:
      "Not at all. Whether you're a beginner, switching careers, or just exploring, Launchpad is built for you.",
  },
  {
    question: "How does TeamUp AI work?",
    answer:
      "TeamUp AI matches you with project collaborators based on your skills, interests, and goals — all powered by our matching algorithm.",
  },
  {
    question: "Can I contribute to the platform?",
    answer:
      "Absolutely! Launchpad is open-source friendly. You can contribute via GitHub or join our community discussions.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section className="bg-white py-20 px-6 sm:px-12 lg:px-24 border-t">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6 text-gray-900"
        >
          Frequently Asked Questions
        </motion.h2>
        <p className="text-gray-600 mb-10 text-lg">
          Everything you need to know about how Launchpad.dev works.
        </p>

        <div className="space-y-4 text-left">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-lg px-6 py-4 shadow-sm"
            >
              <button
                className="w-full flex justify-between items-center font-medium text-left text-gray-800"
                onClick={() => toggle(index)}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`transform transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all text-gray-600 mt-2 ${
                  openIndex === index ? "max-h-40" : "max-h-0"
                }`}
              >
                <p className="mt-2 text-sm">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
// This component renders a FAQ section with animated dropdowns for each question.