import { Brain, X } from "lucide-react";
import UserSection from "./sidebar/UserSection";
import ModelSelection from "./sidebar/ModelSelection";
import GenerationSettings from "./sidebar/GenerationSettings";
import PresetPrompts from "./sidebar/PresetPrompts";

export default function Sidebar({
  isOpen,
  onClose,
  user,
  models,
  selectedModel,
  onSelectModel,
  imageSize,
  onImageSizeChange,
  steps,
  onStepsChange,
  guidance,
  onGuidanceChange,
  presetPrompts,
  onSelectPreset,
}) {
  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-75 z-40"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed left-0 top-0 h-full bg-[#0f0f1a]/95 backdrop-blur-md border-r border-[#2a2a3e]/50 transition-all duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-80`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden absolute top-4 right-4 p-2 hover:bg-[#2a2a3e]/50 rounded-xl transition-colors"
          >
            <X size={18} className="text-white/60" />
          </button>

          {/* Brand */}
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] flex items-center justify-center mr-3 relative">
              <Brain size={24} className="text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#f59e0b] rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="text-2xl font-bold text-white">hibii</span>
              <span className="text-2xl font-bold text-[#06b6d4] ml-1">AI</span>
            </div>
          </div>

          <UserSection user={user} />
          <ModelSelection
            models={models}
            selectedModel={selectedModel}
            onSelectModel={onSelectModel}
          />
          <GenerationSettings
            imageSize={imageSize}
            onImageSizeChange={onImageSizeChange}
            steps={steps}
            onStepsChange={onStepsChange}
            guidance={guidance}
            onGuidanceChange={onGuidanceChange}
          />
          <PresetPrompts
            presetPrompts={presetPrompts}
            onSelectPreset={onSelectPreset}
          />
        </div>
      </div>
    </>
  );
}
