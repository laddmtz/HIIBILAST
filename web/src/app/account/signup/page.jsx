import { useState } from "react";
import useAuth from "@/utils/useAuth";
import { Eye, EyeOff, Mail, Lock, User, Zap, Brain, Sparkles } from "lucide-react";

export default function SignUpPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signUpWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      await signUpWithCredentials({
        email,
        password,
        callbackUrl: "/",
        redirect: true,
      });
    } catch (err) {
      const errorMessages = {
        OAuthSignin: "Couldn't start sign-up. Please try again or use a different method.",
        OAuthCallback: "Sign-up failed after redirecting. Please try again.",
        OAuthCreateAccount: "Couldn't create an account with this sign-up option. Try another one.",
        EmailCreateAccount: "This email can't be used. It may already be registered.",
        Callback: "Something went wrong during sign-up. Please try again.",
        OAuthAccountNotLinked: "This account is linked to a different sign-in method. Try using that instead.",
        CredentialsSignin: "Invalid email or password. If you already have an account, try signing in instead.",
        AccessDenied: "You don't have permission to sign up.",
        Configuration: "Sign-up isn't working right now. Please try again later.",
        Verification: "Your sign-up link has expired. Request a new one.",
      };

      setError(errorMessages[err.message] || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#121218] to-[#1a1a2e] flex items-center justify-center p-4 font-inter">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#4f46e5]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#06b6d4]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8b5cf6]/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-[#f59e0b]/10 rounded-full blur-2xl animate-pulse delay-3000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] flex items-center justify-center mr-4 relative">
              <Brain size={32} className="text-white" />
              <div className="absolute -top-1 -right-1">
                <Sparkles size={16} className="text-[#f59e0b] animate-pulse" />
              </div>
            </div>
            <div>
              <span className="text-3xl font-bold text-white">hibii</span>
              <span className="text-3xl font-bold text-[#06b6d4] ml-1">AI</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Join the Future</h1>
          <p className="text-white/60">Create your AI generation workspace</p>
        </div>

        {/* Sign Up Form */}
        <form
          noValidate
          onSubmit={onSubmit}
          className="bg-[#1a1a2e]/50 backdrop-blur-md border border-[#2a2a3e]/50 rounded-3xl p-8"
        >
          <div className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-white/40" />
                </div>
                <input
                  required
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-[#0f0f1a]/80 border border-[#2a2a3e] rounded-xl pl-12 pr-4 py-4 text-white placeholder-white/40 focus:border-[#4f46e5] focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/20 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-white/40" />
                </div>
                <input
                  required
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a secure password"
                  className="w-full bg-[#0f0f1a]/80 border border-[#2a2a3e] rounded-xl pl-12 pr-12 py-4 text-white placeholder-white/40 focus:border-[#4f46e5] focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-white/40 hover:text-white/60 transition-colors" />
                  ) : (
                    <Eye size={18} className="text-white/40 hover:text-white/60 transition-colors" />
                  )}
                </button>
              </div>
              <p className="text-xs text-white/50">
                Minimum 6 characters required
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Terms */}
            <div className="bg-[#0f0f1a]/60 border border-[#2a2a3e]/30 rounded-xl p-4">
              <p className="text-xs text-white/60 leading-relaxed">
                By creating an account, you agree to our{" "}
                <span className="text-[#06b6d4] font-medium">Terms of Service</span>{" "}
                and{" "}
                <span className="text-[#06b6d4] font-medium">Privacy Policy</span>.
                Your data is secured with enterprise-grade encryption.
              </p>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center hover:from-[#4338ca] hover:to-[#0891b2] disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <Zap size={18} className="mr-2" />
                  Launch Workspace
                </>
              )}
            </button>

            {/* Features Preview */}
            <div className="bg-[#0f0f1a]/40 border border-[#2a2a3e]/20 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center">
                <Sparkles size={16} className="mr-2 text-[#06b6d4]" />
                What you'll get:
              </h3>
              <ul className="space-y-2 text-xs text-white/70">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-[#06b6d4] rounded-full mr-2"></div>
                  Unlimited AI image generations
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-[#4f46e5] rounded-full mr-2"></div>
                  Advanced prompt enhancement
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-[#8b5cf6] rounded-full mr-2"></div>
                  Generation history & favorites
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full mr-2"></div>
                  Multiple AI models access
                </li>
              </ul>
            </div>

            {/* Sign In Link */}
            <div className="text-center pt-4">
              <p className="text-white/60 text-sm">
                Already have an account?{" "}
                <a
                  href={`/account/signin${
                    typeof window !== "undefined" ? window.location.search : ""
                  }`}
                  className="text-[#06b6d4] hover:text-[#0891b2] font-medium transition-colors"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/40 text-xs">
            Join thousands of creators using AI to bring their visions to life
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: calc(200px + 100%) 0; }
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200px 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}