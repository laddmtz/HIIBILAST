import { User, Crown, LogOut, Sparkles } from "lucide-react";

export default function MainHeader({ user }) {
  return (
    <div className="text-center mb-12 relative">
      <div className="hidden lg:flex items-center justify-between mb-8">
        <div></div> {/* Spacer */}
        {user ? (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] rounded-xl flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-white font-medium text-sm">{user.email}</p>
                <div className="flex items-center">
                  <Crown size={12} className="text-[#f59e0b] mr-1" />
                  <p className="text-[#f59e0b] text-xs">Pro Creator</p>
                </div>
              </div>
            </div>
            <a
              href="/account/logout"
              className="p-2 hover:bg-[#2a2a3e]/50 rounded-xl transition-colors"
              title="Sign Out"
            >
              <LogOut size={20} className="text-white/60" />
            </a>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <a
              href="/account/signin"
              className="text-white/70 hover:text-white transition-colors font-medium"
            >
              Sign In
            </a>
            <a
              href="/account/signup"
              className="bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] text-white px-6 py-2 rounded-xl font-medium hover:from-[#4338ca] hover:to-[#0891b2] transition-all"
            >
              Get Started
            </a>
          </div>
        )}
      </div>

      <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 relative">
        <span className="bg-gradient-to-r from-white via-[#06b6d4] to-white bg-clip-text text-transparent">
          Advanced AI Image Generation
        </span>
      </h1>
      <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
        Transform your imagination into stunning visuals with cutting-edge AI
        models. Create, innovate, and bring your creative vision to life.
      </p>

      {!user && (
        <div className="inline-flex items-center px-4 py-2 bg-[#1a1a2e]/50 backdrop-blur-sm border border-[#2a2a3e]/50 rounded-full">
          <Sparkles size={16} className="text-[#f59e0b] mr-2" />
          <span className="text-white/80 text-sm">
            Sign up for unlimited generations
          </span>
        </div>
      )}
    </div>
  );
}
