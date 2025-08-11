"use client";

import React, { useState } from "react";
import { Brain, Cpu } from "lucide-react";

import useUser from "@/utils/useUser";
import { useHibiiAI } from "@/hooks/useHibiiAI";

import LoadingScreen from "@/components/Hibii/LoadingScreen";
import AnimatedBackground from "@/components/Hibii/AnimatedBackground";
import MobileHeader from "@/components/Hibii/MobileHeader";
import Sidebar from "@/components/Hibii/Sidebar";
import MainHeader from "@/components/Hibii/MainHeader";
import GenerationArea from "@/components/Hibii/GenerationArea";
import GenerationHistory from "@/components/Hibii/GenerationHistory";
import GlobalStyles from "@/components/Hibii/GlobalStyles";


const models = [
  {
    id: "hibbi1",
    name: "HIBBI1",
    description: "Advanced proprietary model with DALL-E 3",
    icon: <Brain size={16} className="text-[#06b6d4]" />,
    badge: "Premium",
  },
  {
    id: "stable-diffusion-v3",
    name: "Stable Diffusion V3",
    description: "Professional AI image generation",
    icon: <Cpu size={16} className="text-[#8b5cf6]" />,
    badge: "Pro",
  },
];

const presetPrompts = [
  "A futuristic cyberpunk cityscape with neon lights and flying cars",
  "Photorealistic space station orbiting a colorful nebula",
  "Advanced AI robot artist creating digital masterpieces",
  "Holographic neural network floating in quantum space",
  "Bioluminescent forest with glowing creatures at midnight",
  "Futuristic laboratory with transparent displays and holograms",
];


export default function HibiiAI() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: user, loading: userLoading } = useUser();

  const {
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
  } = useHibiiAI();

  if (userLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#121218] to-[#1a1a2e] font-inter relative overflow-hidden">
      <AnimatedBackground />
      <GlobalStyles />

      <MobileHeader onMenuClick={() => setSidebarOpen(true)} user={user} />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
        models={models}
        selectedModel={selectedModel}
        onSelectModel={setSelectedModel}
        imageSize={imageSize}
        onImageSizeChange={(e) => setImageSize(e.target.value)}
        steps={steps}
        onStepsChange={(e) => setSteps(Number(e.target.value))}
        guidance={guidance}
        onGuidanceChange={(e) => setGuidance(Number(e.target.value))}
        presetPrompts={presetPrompts}
        onSelectPreset={setPrompt}
      />

      <main className="lg:ml-80 pt-20 lg:pt-0">
        <div className="p-6 lg:p-12">
          <MainHeader user={user} />

          <GenerationArea
            prompt={prompt}
            onPromptChange={(e) => setPrompt(e.target.value)}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            generatedImage={generatedImage}
            generationMetadata={generationMetadata}
            onDownload={handleDownload}
            onShare={handleShare}
          />

          <GenerationHistory
            isLoading={isLoadingHistory}
            history={generationHistory}
            onSelect={handleSelectHistoryItem}
            onDelete={handleDeleteGeneration}
          />
        </div>
      </main>
    </div>
  );
}
