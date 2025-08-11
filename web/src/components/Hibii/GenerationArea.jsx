import PromptInput from "./Generation/PromptInput";
import ImagePreview from "./Generation/ImagePreview";

export default function GenerationArea({
  prompt,
  onPromptChange,
  onGenerate,
  isGenerating,
  generatedImage,
  generationMetadata,
  onDownload,
  onShare,
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 mb-12">
      <PromptInput
        prompt={prompt}
        onPromptChange={onPromptChange}
        onGenerate={onGenerate}
        isGenerating={isGenerating}
      />
      <ImagePreview
        generatedImage={generatedImage}
        generationMetadata={generationMetadata}
        onDownload={onDownload}
        onShare={onShare}
      />
    </div>
  );
}
