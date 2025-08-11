import { User, LogOut, Crown } from "lucide-react";

export default function UserSection({ user }) {
  if (!user) {
    return (
      <div className="mb-6 p-4 bg-gradient-to-r from-[#1a1a2e]/50 to-[#2a2a3e]/30 rounded-2xl border border-[#2a2a3e]/50">
        <p className="text-white/70 text-sm mb-3">
          Sign in to save your generations and access premium features.
        </p>
        <div className="flex space-x-2">
          <a
            href="/account/signin"
            className="flex-1 bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] text-white px-3 py-2 rounded-xl text-sm font-medium text-center transition-all hover:from-[#4338ca] hover:to-[#0891b2]"
          >
            Sign In
          </a>
          <a
            href="/account/signup"
            className="flex-1 bg-[#2a2a3e]/50 text-white px-3 py-2 rounded-xl text-sm font-medium text-center transition-all hover:bg-[#2a2a3e]/70"
          >
            Sign Up
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-[#1a1a2e]/50 to-[#2a2a3e]/30 rounded-2xl border border-[#2a2a3e]/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] rounded-xl flex items-center justify-center mr-3">
            <User size={20} className="text-white" />
          </div>
          <div>
            <p className="text-white font-medium text-sm truncate max-w-[120px]">
              {user.email}
            </p>
            <div className="flex items-center mt-1">
              <Crown size={12} className="text-[#f59e0b] mr-1" />
              <p className="text-[#f59e0b] text-xs font-medium">
                Pro Creator
              </p>
            </div>
          </div>
        </div>
        <a
          href="/account/logout"
          className="p-2 hover:bg-[#2a2a3e]/50 rounded-xl transition-colors"
          title="Sign Out"
        >
          <LogOut size={16} className="text-white/60" />
        </a>
      </div>
    </div>
  );
}
