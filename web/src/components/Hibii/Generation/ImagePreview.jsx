import {
  Image,
  Download,
  Share,
  Monitor,
  Brain,
  Clock,
} from "lucide-react";

export default function ImagePreview({
  generatedImage,
  generationMetadata,
  onDownload,
  onShare,
}) {
  return (
    <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-[#2a2a3e]/50 rounded-3xl p-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <Monitor className="mr-3 text-[#06b6d4]" size={24} />
        Generated Image
      </h2>

      <div className="aspect-square bg-[#0f0f1a]/80 border-2 border-dashed border-[#2a2a3e]/50 rounded-2xl flex items-center justify-center relative overflow-hidden">
        {generatedImage ? (
          <div className="relative w-full h-full">
            <img
              src={generatedImage}
              alt="Generated"
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={onDownload}
                className="bg-black/50 backdrop-blur-sm p-2 rounded-xl text-white hover:bg-black/70 transition-colors"
                title="Download Image"
              >
                <Download size={18} />
              </button>
              <button
                onClick={onShare}
                className="bg-black/50 backdrop-blur-sm p-2 rounded-xl text-white hover:bg-black/70 transition-colors"
                title="Share Image"
              >
                <Share size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Image size={32} className="text-white" />
            </div>
            <p className="text-white/60">
              Your generated image will appear here
            </p>
          </div>
        )}
      </div>

      {generationMetadata?.enhancedPrompt && (
        <div className="mt-6 bg-[#0f0f1a]/60 border border-[#2a2a3e]/30 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
            <Brain className="mr-2 text-[#06b6d4]" size={20} />
            HIBBI1 Enhanced Prompt
          </h3>
          <p className="text-white/80 text-sm leading-relaxed">
            {generationMetadata.enhancedPrompt}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center text-xs text-white/50">
              <Clock size={14} className="mr-1" />
              {generationMetadata.processingTime}ms processing time
            </div>
            <div className="text-xs text-white/50">
              Seed: {generationMetadata.seed}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
