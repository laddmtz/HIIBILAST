"use client";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4f46e5]/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#06b6d4]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-[#8b5cf6]/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-[#f59e0b]/5 rounded-full blur-3xl animate-pulse delay-3000"></div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
          backgroundSize: "50px 50px",
        }}
      ></div>
    </div>
  );
}
