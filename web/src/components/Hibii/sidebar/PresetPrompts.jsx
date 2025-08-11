import { Sparkles } from "lucide-react";

export default function PresetPrompts({ presetPrompts, onSelectPreset }) {
  return (
    <div className="flex-1">
      <h3 className="text-sm font-medium text-white/80 mb-4 flex items-center">
        <Sparkles size={16} className="mr-2" />
        Inspiration Prompts
      </h3>
      <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
        {presetPrompts.map((preset, index) => (
          <button
            key={index}
            onClick={() => onSelectPreset(preset)}
            className="w-full text-left p-3 bg-[#1a1a2e]/50 border border-[#2a2a3e]/30 rounded-xl text-white/70 text-sm hover:bg-[#2a2a3e]/50 hover:text-white hover:border-[#4f46e5]/30 transition-all"
          >
            {preset}
          </button>
        ))}
      </div>
    </div>
  );
}
