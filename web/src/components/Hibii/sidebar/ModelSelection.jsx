import { Cpu } from "lucide-react";

export default function ModelSelection({ models, selectedModel, onSelectModel }) {
  return (
    <div className="mb-6">
      <label className="text-sm font-medium text-white/80 mb-3 block flex items-center">
        <Cpu size={16} className="mr-2" />
        AI Model
      </label>
      <div className="space-y-2">
        {models.map((model) => (
          <button
            key={model.id}
            onClick={() => onSelectModel(model.id)}
            className={`w-full p-3 rounded-xl border transition-all text-left ${
              selectedModel === model.id
                ? "bg-gradient-to-r from-[#4f46e5]/20 to-[#06b6d4]/20 border-[#4f46e5]/50"
                : "bg-[#1a1a2e]/50 border-[#2a2a3e]/50 hover:bg-[#2a2a3e]/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {model.icon}
                <div className="ml-3">
                  <p className="text-white font-medium text-sm">
                    {model.name}
                  </p>
                  <p className="text-white/60 text-xs">
                    {model.description}
                  </p>
                </div>
              </div>
              <span className="text-xs px-2 py-1 bg-gradient-to-r from-[#4f46e5]/20 to-[#06b6d4]/20 text-[#06b6d4] rounded-lg">
                {model.badge}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
