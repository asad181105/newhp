"use client";

import { useState } from "react";
import AnimatedBackground from "@/components/animatedBackground";

export default function GetInTouchPage() {
  const [formData, setFormData] = useState({
    name: "Jane Doe",
    email: "jane@company.com",
    message: "",
    responseTime: "Within 1 hour",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Section - Immediate Response Information */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-sm uppercase tracking-wider text-white font-semibold">
                  IMMEDIATE RESPONSE
                </h2>
                <div className="h-px bg-orange-600 flex-1"></div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                Need answers now? Our rapid response desk is on it.
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                Share a few details and our specialists will reply within the next hour—via your preferred channel. For mission-critical issues, call or start a live chat instantly.
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Live Chat Card */}
              <div className="bg-gray-900/80 backdrop-blur-sm border border-orange-600/30 rounded-lg p-6 hover:border-orange-600/50 transition-colors">
                <div className="text-3xl mb-3">💬</div>
                <h3 className="text-white font-semibold mb-1">Live chat</h3>
                <p className="text-gray-400 text-sm">Available 24/7</p>
              </div>

              {/* Priority Hotline Card */}
              <div className="bg-gray-900/80 backdrop-blur-sm border border-orange-600/30 rounded-lg p-6 hover:border-orange-600/50 transition-colors">
                <div className="text-3xl mb-3">📞</div>
                <h3 className="text-white font-semibold mb-1">Priority hotline</h3>
                <p className="text-orange-500 text-sm font-medium">+91 8247579990</p>
              </div>

              {/* Average Response Card */}
              <div className="bg-gray-900/80 backdrop-blur-sm border border-orange-600/30 rounded-lg p-6 hover:border-orange-600/50 transition-colors">
                <div className="text-3xl mb-3">⏱️</div>
                <h3 className="text-white font-semibold mb-1">Average response</h3>
                <p className="text-gray-400 text-sm">Under 27 minutes</p>
              </div>

              {/* NDA Card */}
              <div className="bg-gray-900/80 backdrop-blur-sm border border-orange-600/30 rounded-lg p-6 hover:border-orange-600/50 transition-colors">
                <div className="text-3xl mb-3">✈️</div>
                <h3 className="text-white font-semibold mb-1">Need NDA first?</h3>
                <p className="text-gray-400 text-sm">We'll send one immediately</p>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-900/80 backdrop-blur-sm border border-orange-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-600 transition-colors"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Work email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-900/80 backdrop-blur-sm border border-orange-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-600 transition-colors"
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  What do you need help with?
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Share context, links, or questions..."
                  className="w-full bg-gray-900/80 backdrop-blur-sm border border-red-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors resize-none"
                  required
                />
              </div>

              {/* Response Time Field */}
              <div>
                <label htmlFor="responseTime" className="block text-sm font-medium text-gray-300 mb-2">
                  Preferred response time
                </label>
                <select
                  id="responseTime"
                  name="responseTime"
                  value={formData.responseTime}
                  onChange={handleChange}
                  className="w-full bg-gray-900/80 backdrop-blur-sm border border-red-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"
                >
                  <option value="Within 1 hour">Within 1 hour</option>
                  <option value="Within 4 hours">Within 4 hours</option>
                  <option value="Within 24 hours">Within 24 hours</option>
                  <option value="No rush">No rush</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-100 shadow-lg hover:shadow-xl hover:shadow-orange-600/50"
              >
                Notify the rapid response team
              </button>

              {/* Privacy Notice */}
              <p className="text-xs text-gray-500 leading-relaxed">
                We keep your information secure and never share it without permission. Already a customer? Use the in-product command /help for priority routing.
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

