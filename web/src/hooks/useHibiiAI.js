import { useState, useEffect, useCallback } from "react";
import useUser from "@/utils/useUser";

export function useHibiiAI() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [generatedImageId, setGeneratedImageId] = useState(null);
  const [generationMetadata, setGenerationMetadata] = useState(null);
  const [generationHistory, setGenerationHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [selectedModel, setSelectedModel] = useState("hibbi1");
  const [imageSize, setImageSize] = useState("1024x1024");
  const [steps, setSteps] = useState(50);
  const [guidance, setGuidance] = useState(7.5);

  const { data: user } = useUser();

  const loadGenerations = useCallback(async () => {
    setIsLoadingHistory(true);
    try {
      const response = await fetch("/api/generations?limit=12");
      if (!response.ok) throw new Error("Failed to load generations");

      const data = await response.json();
      const formattedGenerations = data.generations.map((gen) => ({
        id: gen.id,
        prompt: gen.prompt,
        imageUrl: gen.image_url,
        model: gen.model_name,
        timestamp: new Date(gen.created_at),
      }));

      setGenerationHistory(formattedGenerations);
    } catch (error) {
      console.error("Error loading generations:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    loadGenerations();
  }, [loadGenerations]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    if (!user) {
      window.location.href = "/account/signin";
      return;
    }

    setIsGenerating(true);
    setGenerationMetadata(null);
    setGeneratedImageId(null);
    setGeneratedImage(null);

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          model: selectedModel,
          size: imageSize,
          steps,
          guidance,
        }),
      });

      if (!response.ok) throw new Error("Generation failed");

      const result = await response.json();
      setGeneratedImage(result.imageUrl);
      setGenerationMetadata(result.metadata);
      setGeneratedImageId(result.id);
      
      await loadGenerations();
    } catch (error) {
      console.error("Generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDeleteGeneration = async (generationId) => {
    try {
      const response = await fetch(`/api/generations/${generationId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete generation");
      setGenerationHistory((prev) =>
        prev.filter((gen) => gen.id !== generationId)
      );
    } catch (error) {
      console.error("Error deleting generation:", error);
    }
  };

  const handleDownload = async () => {
    if (!generatedImageId) {
      if (generatedImage) {
        const link = document.createElement("a");
        link.href = generatedImage;
        link.download = `hibii_ai_${Date.now()}.jpg`;
        link.click();
      }
      return;
    }

    try {
      const response = await fetch(`/api/download/${generatedImageId}`);
      if (!response.ok) throw new Error("Download failed");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const contentDisposition = response.headers.get("content-disposition");
      let filename = "hibii_ai_generated.jpg";
      if (contentDisposition) {
        const matches = /filename="([^"]*)"/.exec(contentDisposition);
        if (matches && matches[1]) filename = matches[1];
      }
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      if (generatedImage) {
        const link = document.createElement("a");
        link.href = generatedImage;
        link.download = `hibii_ai_${Date.now()}.jpg`;
        link.click();
      }
    }
  };

  const handleShare = async () => {
    if (!generatedImage) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Generated with hibiiAI",
          text: `Check out this AI-generated image: "${prompt}"`,
          url: generatedImage,
        });
      } catch (error) {
        console.error("Share error:", error);
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    if (generatedImage) {
      navigator.clipboard.writeText(generatedImage);
      console.log("Image URL copied to clipboard");
    }
  };
  
  const handleSelectHistoryItem = (generation) => {
    setGeneratedImage(generation.imageUrl);
    setGeneratedImageId(generation.id);
    setGenerationMetadata(null); // Old generations don't have metadata to show
  };

  return {
    prompt,
    setPrompt,
    isGenerating,
    generatedImage,
    generationMetadata,
    generationHistory,
    isLoadingHistory,
    selectedModel,
    setSelectedModel,
    imageSize,
    setImageSize,
    steps,
    setSteps,
    guidance,
    setGuidance,
    handleGenerate,
    handleDeleteGeneration,
    handleDownload,
    handleShare,
    handleSelectHistoryItem,
  };
}
