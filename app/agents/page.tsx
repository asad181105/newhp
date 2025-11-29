import AgentCard from "@/components/agentCard";
import config from "@/config.json";
import AnimatedBackground from "@/components/animatedBackground";

export default function AgentsPage() {
  return (
    <main className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-orange-600/10 border border-orange-600/30 rounded-full mb-6">
            <span className="text-orange-500 text-sm font-medium">AI Agents</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white tracking-tight">
            Our AI Agents
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover our intelligent agents designed to transform your workflow
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.agents.map((agent, index) => (
            <AgentCard
              key={index}
              name={agent.name}
              status={agent.status}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

