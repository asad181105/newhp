import CallInterface from "@/components/callInterface";
import AnimatedBackground from "@/components/animatedBackground";

export default function CallerAgentPage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 w-full">
        <CallInterface />
      </div>
    </main>
  );
}

