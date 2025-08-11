import { Sparkles, Zap } from "lucide-react";

export default function PromptInput({
  prompt,
  onPromptChange,
  onGenerate,
  isGenerating,
}) {
  return (
    <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-[#2a2a3e]/50 rounded-3xl p-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Sparkles className="mr-3 text-[#06b6d4]" size={24} />
        Describe Your Vision
      </h2>

      <textarea
        value={prompt}
        onChange={onPromptChange}
        placeholder="Describe the image you want to create in detail..."
        className="w-full h-40 bg-[#0f0f1a]/80 border border-[#2a2a3e] rounded-2xl p-6 text-white placeholder-white/40 focus:border-[#4f46e5] focus:outline-none resize-none text-lg"
      />

      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-white/60">
          {prompt.length}/1000 characters
        </div>

        <button
          onClick={onGenerate}
          disabled={!prompt.trim() || isGenerating}
          className="bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] text-white px-8 py-4 rounded-2xl font-semibold flex items-center hover:from-[#4338ca] hover:to-[#0891b2] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
              Generating...
            </>
          ) : (
            <>
              <Zap size={18} className="mr-2" />
              Generate Image
            </>
          )}
        </button>
      </div>
    </div>
  );
}
