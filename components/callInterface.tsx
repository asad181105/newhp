"use client";

import { useState, useEffect, useRef } from "react";

// Placeholder for 11 Labs AI Caller URL
const CALLER_URL = "";

export default function CallInterface() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Timer logic - stops at 1 minute (60 seconds)
  useEffect(() => {
    if (isCallActive && timer < 60) {
      timerIntervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev >= 59) {
            // Stop at 1 minute
            if (timerIntervalRef.current) {
              clearInterval(timerIntervalRef.current);
            }
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isCallActive, timer]);

  // Format timer as MM:SS
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartCall = () => {
    if (!CALLER_URL) {
      alert("11 Labs AI Caller URL not configured. Please add the URL to the CALLER_URL constant.");
      return;
    }

    setIsCallActive(true);
    setTimer(0);

    // TODO: Connect to 11 Labs AI Caller using CALLER_URL
    // This would typically involve:
    // 1. Establishing WebSocket or HTTP connection
    // 2. Initializing audio context
    // 3. Handling audio streams
    console.log("Connecting to:", CALLER_URL);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setTimer(0);
    setIsMuted(false);
    setIsSpeakerOn(false);

    // Clean up audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    // TODO: Disconnect from 11 Labs AI Caller
    console.log("Call ended");
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    // TODO: Toggle audio output mute
  };

  const handleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
    // TODO: Toggle loudspeaker mode
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-800 relative overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-transparent pointer-events-none"></div>
        
        <div className="relative z-10">
          {/* Call Avatar / Wave / Icon */}
          <div className="flex justify-center mb-8">
            {isCallActive ? (
              <div className="relative">
                <div className="w-32 h-32 bg-orange-600/20 border-2 border-orange-600 rounded-full flex items-center justify-center text-5xl shadow-lg shadow-orange-600/30">
                  📞
                </div>
                {/* Animated rings for active call */}
                <div className="absolute inset-0 rounded-full border-2 border-orange-500 animate-ping opacity-50"></div>
                <div className="absolute inset-0 rounded-full border border-orange-400 animate-pulse opacity-30"></div>
              </div>
            ) : (
              <div className="w-32 h-32 bg-gray-800 border-2 border-gray-700 rounded-full flex items-center justify-center text-5xl">
                📞
              </div>
            )}
          </div>

          {/* Timer Display */}
          <div className="text-center mb-8">
            {isCallActive ? (
              <div className="space-y-2">
                <div className="text-4xl font-mono font-bold text-white tracking-wider">
                  {formatTimer(timer)}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Call Duration</div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="text-2xl text-gray-300 font-medium">Ready to call</div>
                <div className="text-sm text-gray-500">AI Caller Agent</div>
              </div>
            )}
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center gap-4 mb-6">
            {/* Mute Button */}
            <button
              onClick={handleMute}
              disabled={!isCallActive}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                isCallActive
                  ? isMuted
                    ? "bg-red-600 hover:bg-red-700 active:scale-95 shadow-lg shadow-red-600/30"
                    : "bg-gray-800 hover:bg-gray-700 active:scale-95 border border-gray-700 hover:border-gray-600"
                  : "bg-gray-800 opacity-50 cursor-not-allowed border border-gray-700"
              }`}
            >
              <span className="text-2xl">{isMuted ? "🔇" : "🔊"}</span>
            </button>

            {/* Speaker Button */}
            <button
              onClick={handleSpeaker}
              disabled={!isCallActive}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                isCallActive
                  ? isSpeakerOn
                    ? "bg-orange-600 hover:bg-orange-700 active:scale-95 shadow-lg shadow-orange-600/30"
                    : "bg-gray-800 hover:bg-gray-700 active:scale-95 border border-gray-700 hover:border-gray-600"
                  : "bg-gray-800 opacity-50 cursor-not-allowed border border-gray-700"
              }`}
            >
              <span className="text-2xl">🔊</span>
            </button>
          </div>

          {/* Start/End Call Button */}
          <div className="flex justify-center">
            {!isCallActive ? (
              <button
                onClick={handleStartCall}
                className="group px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl hover:shadow-orange-600/50 relative overflow-hidden"
              >
                <span className="relative z-10">Start Call</span>
                <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            ) : (
              <button
                onClick={handleEndCall}
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl hover:shadow-red-600/50"
              >
                End Call
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

