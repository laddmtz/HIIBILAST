import useAuth from "@/utils/useAuth";
import { LogOut, Brain, Zap } from "lucide-react";

export default function LogoutPage() {
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#121218] to-[#1a1a2e] flex items-center justify-center p-4 font-inter">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#4f46e5]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#06b6d4]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8b5cf6]/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] flex items-center justify-center mr-4">
              <Brain size={32} className="text-white" />
            </div>
            <div>
              <span className="text-3xl font-bold text-white">hibii</span>
              <span className="text-3xl font-bold text-[#06b6d4] ml-1">AI</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Sign Out</h1>
          <p className="text-white/60">Thanks for using hibiiAI</p>
        </div>

        {/* Sign Out Form */}
        <div className="bg-[#1a1a2e]/50 backdrop-blur-md border border-[#2a2a3e]/50 rounded-3xl p-8">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-[#4f46e5]/20 to-[#06b6d4]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <LogOut size={32} className="text-white/60" />
            </div>
            <p className="text-white/70 mb-6">
              You're about to sign out of your hibiiAI workspace. Your generations and settings will be saved.
            </p>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center hover:from-[#4338ca] hover:to-[#0891b2] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Zap size={18} className="mr-2" />
            Sign Out
          </button>

          <div className="text-center mt-6">
            <p className="text-white/60 text-sm">
              Want to stay?{" "}
              <a
                href="/"
                className="text-[#06b6d4] hover:text-[#0891b2] font-medium transition-colors"
              >
                Go back to workspace
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/40 text-xs">
            Your creativity powered by AI
          </p>
        </div>
      </div>
    </div>
  );
}