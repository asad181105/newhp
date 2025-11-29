"use client";

import { useState, useEffect } from "react";
import AnimatedBackground from "@/components/animatedBackground";
import { getSubmissions } from "@/lib/supabase";

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  query: string;
  agent_name: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      setIsAuthenticated(true);
      fetchSubmissions();
    } else {
      setError("Incorrect password");
    }
  };

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const data = await getSubmissions();
      setSubmissions(data || []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch submissions. Please check your Supabase configuration.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <AnimatedBackground />
        <div className="max-w-md mx-auto relative z-10 mt-20">
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-8 shadow-lg">
            <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 transition-colors"
                  placeholder="Enter admin password"
                />
              </div>
              {error && (
                <div className="p-3 bg-red-600/20 border border-red-600/50 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-8 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-gray-400">Form submissions from all agents</p>
            </div>
            <button
              onClick={fetchSubmissions}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading submissions...</div>
          ) : error ? (
            <div className="p-4 bg-red-600/20 border border-red-600/50 rounded-lg text-red-400">
              {error}
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No submissions yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="pb-3 text-gray-300 font-semibold">Name</th>
                    <th className="pb-3 text-gray-300 font-semibold">Email</th>
                    <th className="pb-3 text-gray-300 font-semibold">Phone</th>
                    <th className="pb-3 text-gray-300 font-semibold">Agent</th>
                    <th className="pb-3 text-gray-300 font-semibold">Query</th>
                    <th className="pb-3 text-gray-300 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission) => (
                    <tr key={submission.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="py-4 text-white">{submission.name}</td>
                      <td className="py-4 text-gray-300">{submission.email}</td>
                      <td className="py-4 text-gray-300">{submission.phone}</td>
                      <td className="py-4 text-orange-500">{submission.agent_name}</td>
                      <td className="py-4 text-gray-300 max-w-md truncate">{submission.query}</td>
                      <td className="py-4 text-gray-400 text-sm">
                        {new Date(submission.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

