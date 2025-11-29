"use client";

import Link from "next/link";
import { useState } from "react";

interface AgentCardProps {
  name: string;
  status: "active" | "coming-soon";
}

export default function AgentCard({ name, status }: AgentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isActive = status === "active";
  const cardContent = (
    <div
      className={`relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-lg transition-all duration-500 group ${
        isActive
          ? "hover:border-orange-600 hover:shadow-2xl hover:shadow-orange-600/30 hover:scale-[1.02] cursor-pointer hover:bg-gray-900"
          : "opacity-60"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect on hover */}
      {isActive && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-600/0 to-orange-600/0 group-hover:from-orange-600/10 group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>
      )}

      {/* Coming Soon Badge */}
      {!isActive && (
        <div className="absolute top-4 right-4 bg-gray-800/90 backdrop-blur-sm text-gray-400 text-xs font-semibold px-3 py-1.5 rounded-md border border-gray-700">
          Coming Soon
        </div>
      )}

      {/* Active Badge */}
      {isActive && (
        <div className="absolute top-4 right-4 bg-orange-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-lg shadow-orange-600/50">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          ACTIVE
        </div>
      )}

      {/* Icon */}
      <div className="mb-4 relative">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-500 ${
          isActive 
            ? "bg-orange-600/20 border-2 border-orange-600 group-hover:bg-orange-600/30 group-hover:scale-110" 
            : "bg-gray-800 border-2 border-gray-700"
        }`}>
          🤖
        </div>
        {isActive && (
          <div className="absolute inset-0 rounded-full bg-orange-600/20 blur-xl group-hover:bg-orange-600/30 transition-all duration-500"></div>
        )}
      </div>

      {/* Agent Name */}
      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">{name}</h3>

      {/* Hover Effect Indicator */}
      {isActive && isHovered && (
        <div className="mt-4 text-sm text-orange-500 font-medium flex items-center gap-2 animate-fade-in">
          <span>Click to explore</span>
          <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
        </div>
      )}
    </div>
  );

  if (isActive) {
    return (
      <Link href="/caller-agent" className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

