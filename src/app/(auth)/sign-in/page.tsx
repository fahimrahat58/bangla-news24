"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/app/lib/auth-client";
import { Eye, EyeOff } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    try {
      const { error } = await signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        setErrorMsg(error.message || "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে।");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Sign in error:", error);

      setErrorMsg("সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50/30 px-4 pt-8 pb-8 sm:pt-10">
      <div className="w-full max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#c00000] mb-8 tracking-wide">
          সাইন ইন
        </h1>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 border border-red-200 text-sm p-3 rounded-md mb-4 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1.5">
              ইমেইল
            </label>

            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="w-full px-3.5 py-2.5 bg-[#fafafa] border border-gray-300 rounded-md outline-none focus:border-[#c00000] focus:bg-white text-gray-800 text-sm transition-all"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-gray-700 text-sm font-medium">
                পাসওয়ার্ড
              </label>

              <Link
                href="/forgot-password"
                className="text-xs font-medium text-[#c00000] hover:underline"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                autoComplete="current-password"
                className="w-full px-3.5 py-2.5 pr-11 bg-[#fafafa] border border-gray-300 rounded-md outline-none focus:border-[#c00000] focus:bg-white text-gray-800 text-sm transition-all"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-400 hover:text-[#c00000] transition-colors"
                aria-label={
                  showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                }
              >
                {showPassword ? (
                  <EyeOff size={19} strokeWidth={1.8} />
                ) : (
                  <Eye size={19} strokeWidth={1.8} />
                )}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c00000] hover:bg-[#a00000] active:bg-[#800000] text-white font-medium py-3 rounded-md transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন করুন"}
            </button>
          </div>
        </form>

        <div className="mt-5 text-center text-sm text-gray-700">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/sign-up"
            className="text-[#c00000] font-bold hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </div>
      </div>
    </main>
  );
}
