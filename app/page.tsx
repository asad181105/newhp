import Link from "next/link";
import config from "@/config.json";
import AnimatedBackground from "@/components/animatedBackground";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      <AnimatedBackground />
      <div className="text-center px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 text-white tracking-tight">
          <span className="block mb-2">{config.landingPage.heroHeading}</span>
          <span className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-400 mt-4 block">
            Powered by AI
          </span>
        </h1>
        <Link href="/agents">
          <button className="group px-8 py-4 bg-orange-600 text-white font-semibold rounded-lg text-lg hover:bg-orange-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-2xl hover:shadow-orange-600/50 relative overflow-hidden">
            <span className="relative z-10">{config.landingPage.ctaText}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
          </button>
        </Link>
      </div>
    </main>
  );
}

