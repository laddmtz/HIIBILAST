"use client";

import { Brain } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#121218] to-[#1a1a2e] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] flex items-center justify-center mx-auto mb-4">
          <Brain size={32} className="text-white animate-pulse" />
        </div>
        <p className="text-white/60">Loading hibiiAI...</p>
      </div>
    </div>
  );
}
