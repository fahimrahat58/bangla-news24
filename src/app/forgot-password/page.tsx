"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "");

    try {
      const { error } = await authClient.requestPasswordReset({
        email,
        redirectTo: "/reset-password",
      });

      if (error) {
        setErrorMsg(
          error.message || "পাসওয়ার্ড রিসেট লিংক পাঠাতে সমস্যা হয়েছে।",
        );
        return;
      }

      setSuccessMsg("আপনার ইমেইলে পাসওয়ার্ড রিসেট করার লিংক পাঠানো হয়েছে।");
    } catch (error) {
      console.error("Forgot password error:", error);
      setErrorMsg("একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50/30 px-4 py-8 sm:px-6 sm:py-10">
      <div className="w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#c00000] mb-6 sm:mb-8 tracking-wide leading-tight">
          পাসওয়ার্ড রিসেট
        </h1>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 border border-red-200 text-xs sm:text-sm p-3 rounded-md mb-4 text-center leading-relaxed">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="bg-green-50 text-green-700 border border-green-200 text-xs sm:text-sm p-3 sm:p-4 rounded-md mb-4 text-center leading-relaxed">
            {successMsg}
          </div>
        )}

        {!successMsg && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1.5">
                ইমেইল
              </label>

              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="আপনার ইমেইল লিখুন"
                className="w-full px-3 py-2.5 sm:px-3.5 sm:py-2.5 bg-[#fafafa] border border-gray-300 rounded-md outline-none focus:border-[#c00000] focus:bg-white text-gray-800 text-sm transition-all"
              />
            </div>

            <div className="pt-1 sm:pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#c00000] hover:bg-[#a00000] active:bg-[#800000] text-white font-medium py-2.5 sm:py-3 rounded-md transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? "রিসেট লিংক পাঠানো হচ্ছে..." : "রিসেট লিংক পাঠান"}
              </button>
            </div>
          </form>
        )}

        <div className="mt-5 text-center text-xs sm:text-sm text-gray-700">
          পাসওয়ার্ড মনে পড়েছে?{" "}
          <Link
            href="/sign-in"
            className="text-[#c00000] font-bold hover:underline cursor-pointer"
          >
            সাইন ইন করুন
          </Link>
        </div>

        <div className="mt-3 text-center">
          <Link
            href="/"
            className="text-xs text-gray-500 hover:text-[#c00000] transition-colors"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
