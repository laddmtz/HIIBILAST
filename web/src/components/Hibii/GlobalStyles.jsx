"use client";

export default function GlobalStyles() {
  return (
    <style jsx global>{`
      .slider::-webkit-slider-thumb {
        appearance: none;
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
        border-radius: 50%;
        cursor: pointer;
      }
      
      .slider::-moz-range-thumb {
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%);
        border-radius: 50%;
        cursor: pointer;
        border: none;
      }

      .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #2a2a3e;
        border-radius: 2px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #4f46e5;
      }
    `}</style>
  );
}
