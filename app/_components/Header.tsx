"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="Launchpad Logo" width={75} height={50} />
          {/* <span className="text-xl font-bold text-gray-800">Launchpad.dev</span> */}
        </Link>

        {/* Profile */}
        <div className="flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}
