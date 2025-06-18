// components/Footer.tsx

import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white py-12 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-xl font-semibold mb-4">Launchpad.dev 🚀</h4>
          <p className="text-sm text-gray-300">
            Empowering developers and students to plan, match, and launch their careers with AI.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="#">Home</Link></li>
            <li><Link href="#">Roadmap Generator</Link></li>
            <li><Link href="#">Career Coach</Link></li>
            <li><Link href="#">TeamUp AI</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="#">Blog</Link></li>
            <li><Link href="#">FAQs</Link></li>
            <li><Link href="#">Open Source</Link></li>
            <li><Link href="#">Support</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Connect with Us</h4>
          <div className="flex space-x-4 text-xl">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Launchpad.dev. All rights reserved.
      </div>
    </footer>
  );
}
// This is a simple footer component for the Launchpad.dev website, providing links to key sections and social media profiles.