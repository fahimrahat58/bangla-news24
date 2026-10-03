"use client";

import { useState } from "react";
import Link from "next/link";
import { requestPasswordReset } from "@/app/lib/auth-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setErrorMsg("");

    try {
      const { error } = await requestPasswordReset({
        email,
        redirectTo: "https://bangla-news24.vercel.app/reset-password",
      });

      if (error) {
        setErrorMsg(
          error.message || "পাসওয়ার্ড রিসেট লিংক পাঠাতে সমস্যা হয়েছে।"
        );
        return;
      }

      setMessage(
        "আপনার ইমেইলে পাসওয়ার্ড রিসেট করার একটি লিংক পাঠানো হয়েছে।"
      );

      setEmail("");
    } catch (error) {
      console.error("Forgot password error:", error);

      setErrorMsg(
        "পাসওয়ার্ড রিসেট লিংক পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50/30 px-4 pt-8 pb-8 sm:pt-10">
      <div className="w-full max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#c00000] mb-3 tracking-wide">
          পাসওয়ার্ড ভুলে গেছেন?
        </h1>

        <p className="text-sm text-gray-500 text-center mb-8 leading-relaxed">
          আপনার অ্যাকাউন্টের ইমেইল ঠিকানা দিন।
          <br />
          আমরা আপনাকে পাসওয়ার্ড রিসেট করার লিংক পাঠাব।
        </p>

        {message && (
          <div className="bg-green-50 text-green-700 border border-green-200 text-sm p-3 rounded-md mb-4 text-center">
            {message}
          </div>
        )}

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="আপনার ইমেইল লিখুন"
              className="w-full px-3.5 py-2.5 bg-[#fafafa] border border-gray-300 rounded-md outline-none focus:border-[#c00000] focus:bg-white text-gray-800 text-sm transition-all"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c00000] hover:bg-[#a00000] active:bg-[#800000] text-white font-medium py-3 rounded-md transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading
                ? "লিংক পাঠানো হচ্ছে..."
                : "পাসওয়ার্ড রিসেট লিংক পাঠান"}
            </button>
          </div>
        </form>

        <div className="mt-5 text-center text-sm text-gray-700">
          পাসওয়ার্ড মনে পড়েছে?{" "}
          <Link
            href="/sign-in"
            className="text-[#c00000] font-bold hover:underline cursor-pointer"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </div>
    </main>
  );
}