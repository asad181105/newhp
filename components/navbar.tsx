"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/95 backdrop-blur-md border border-gray-800 rounded-full shadow-xl">
      <div className="px-10 sm:px-16 lg:px-20">
        <div className="flex items-center justify-between h-14 gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/hp_logo.png"
              alt="Hybrid Pillars"
              width={150}
              height={60}
              priority
              className="h-8 sm:h-10 w-auto"
            />
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-10">
            <Link
              href="/agents"
              className={`text-sm font-medium transition-colors duration-200 ${
                pathname === "/agents"
                  ? "text-orange-500"
                  : "text-gray-300 hover:text-orange-500"
              }`}
            >
              AI Agents
            </Link>
            <Link
              href="/get-in-touch"
              className={`text-sm font-medium transition-colors duration-200 ${
                pathname === "/get-in-touch"
                  ? "text-orange-500"
                  : "text-gray-300 hover:text-orange-500"
              }`}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

