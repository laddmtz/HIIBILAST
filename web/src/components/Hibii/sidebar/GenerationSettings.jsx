import { Monitor, Sliders, Palette } from "lucide-react";

export default function GenerationSettings({
  imageSize,
  onImageSizeChange,
  steps,
  onStepsChange,
  guidance,
  onGuidanceChange,
}) {
  return (
    <div className="space-y-6 mb-8">
      <div>
        <label className="text-sm font-medium text-white/80 mb-2 block flex items-center">
          <Monitor size={16} className="mr-2" />
          Image Size
        </label>
        <select
          value={imageSize}
          onChange={onImageSizeChange}
          className="w-full bg-[#1a1a2e]/80 border border-[#2a2a3e] rounded-xl px-4 py-3 text-white focus:border-[#4f46e5] focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/20 transition-all"
        >
          <option value="512x512">512 × 512 (Square)</option>
          <option value="1024x1024">1024 × 1024 (Square)</option>
          <option value="1024x1536">1024 × 1536 (Portrait)</option>
          <option value="1536x1024">1536 × 1024 (Landscape)</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-white/80 mb-2 block flex items-center justify-between">
          <span className="flex items-center">
            <Sliders size={16} className="mr-2" />
            Steps
          </span>
          <span className="text-[#06b6d4] font-mono">{steps}</span>
        </label>
        <input
          type="range"
          min="20"
          max="100"
          value={steps}
          onChange={onStepsChange}
          className="w-full h-2 bg-[#1a1a2e] rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-white/50 mt-1">
          <span>Fast (20)</span>
          <span>Quality (100)</span>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-white/80 mb-2 block flex items-center justify-between">
          <span className="flex items-center">
            <Palette size={16} className="mr-2" />
            Guidance
          </span>
          <span className="text-[#06b6d4] font-mono">{guidance}</span>
        </label>
        <input
          type="range"
          min="1"
          max="20"
          step="0.5"
          value={guidance}
          onChange={onGuidanceChange}
          className="w-full h-2 bg-[#1a1a2e] rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-white/50 mt-1">
          <span>Creative (1)</span>
          <span>Precise (20)</span>
        </div>
      </div>
    </div>
  );
}
