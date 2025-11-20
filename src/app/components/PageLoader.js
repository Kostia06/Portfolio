"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress - faster
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 50) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 200);
          return 50;
        }
        return prev + Math.random() * 30;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[10001] bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8 relative">
          <div className="text-8xl font-black">
            <span className="gradient-text animate-pulse">K</span>
            <span className="text-white animate-pulse" style={{ animationDelay: "0.2s" }}>
              I
            </span>
          </div>
          <div className="absolute inset-0 blur-2xl opacity-50">
            <div className="text-8xl font-black">
              <span className="gradient-text">K</span>
              <span className="text-white">I</span>
            </div>
          </div>
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden mx-auto">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          >
            <div className="w-full h-full animate-gradient bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-50" />
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-gray-400 mt-6 font-mono text-sm">
          Loading Portfolio... {Math.floor(progress)}%
        </p>

        {/* Animated Dots */}
        <div className="flex gap-2 justify-center mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
