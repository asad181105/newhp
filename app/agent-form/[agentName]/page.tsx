"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AnimatedBackground from "@/components/animatedBackground";
import { submitForm } from "@/lib/emailjs";
import { saveToSupabase } from "@/lib/supabase";

export default function AgentFormPage() {
  const params = useParams();
  const router = useRouter();
  const agentName = decodeURIComponent(params.agentName as string).replace(/-/g, " ");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    query: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Save to Supabase
      await saveToSupabase({
        ...formData,
        agentName: agentName,
      });

      // Send email via EmailJS
      await submitForm({
        ...formData,
        agentName: agentName,
      });

      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", query: "" });
      
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/agents");
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-2 bg-orange-600/10 border border-orange-600/30 rounded-full mb-4">
              <span className="text-orange-500 text-sm font-medium">Contact Form</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-white">
              Get in Touch
            </h1>
            <p className="text-gray-400">
              Interested in <span className="text-orange-500 font-semibold">{agentName}</span>? Fill out the form below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 transition-colors"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 transition-colors"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label htmlFor="query" className="block text-sm font-medium text-gray-300 mb-2">
                Query *
              </label>
              <textarea
                id="query"
                name="query"
                required
                rows={5}
                value={formData.query}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 transition-colors resize-none"
                placeholder="Tell us about your requirements or questions..."
              />
            </div>

            {submitStatus === "success" && (
              <div className="p-4 bg-green-600/20 border border-green-600/50 rounded-lg text-green-400 text-sm">
                ✓ Form submitted successfully! Redirecting...
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-4 bg-red-600/20 border border-red-600/50 rounded-lg text-red-400 text-sm">
                ✗ There was an error submitting the form. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-2xl hover:shadow-orange-600/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

