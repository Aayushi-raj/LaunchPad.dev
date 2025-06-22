
"use client";
import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Riya Sharma",
    role: "Frontend Dev Intern at SaaSquad",
    image: "/pic1.jpg",
    rating: 5,
    quote:
      "Launchpad.dev gave me clarity and confidence. I went from confused to building my dream portfolio!",
  },
  {
    name: "Aman Kapoor",
    role: "Backend Developer & Student",
    image: "/pic3.jpg",
    rating: 4,
    quote:
      "I never thought I'd find a team that matched my interests so well. This platform is a game-changer.",
  },
  {
    name: "Neha Patel",
    role: "Product Designer",
    image: "/pic2.jpg",
    rating: 5,
    quote:
      "The AI mentor feature is seriously smart. It helped me navigate my career switch smoothly.",
  },
];

const Testimonials = () => {
  return (
    <div className="mt-24 px-6 py-10 max-w-7xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4 text-gray-800">What Our Users Say</h2>
      <p className="text-gray-600 mb-12 max-w-xl mx-auto">
        Real stories from learners and builders who’ve launched their careers with us.
      </p>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((user, idx) => (
          <motion.div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow-lg text-left hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={user.image}
                alt={user.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{user.name}</h4>
                <p className="text-sm text-gray-500">{user.role}</p>
              </div>
            </div>
            <p className="text-gray-700 italic mb-4">“{user.quote}”</p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < user.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill={i < user.rating ? "#facc15" : "none"}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
