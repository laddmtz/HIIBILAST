import { Menu, Brain, User } from "lucide-react";

export default function MobileHeader({ onMenuClick, user }) {
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-[#2a2a3e]/50 z-50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="mr-3 p-2 hover:bg-[#2a2a3e]/50 rounded-xl transition-colors"
          >
            <Menu size={20} className="text-white" />
          </button>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] flex items-center justify-center mr-3">
              <Brain size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white">hibii</span>
            <span className="text-xl font-bold text-[#06b6d4] ml-1">AI</span>
          </div>
        </div>

        {user ? (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
          </div>
        ) : (
          <a
            href="/account/signin"
            className="text-[#06b6d4] hover:text-[#0891b2] font-medium text-sm transition-colors"
          >
            Sign In
          </a>
        )}
      </div>
    </div>
  );
}
