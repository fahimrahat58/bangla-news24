"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";
import { Eye, EyeOff } from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData(e.currentTarget);

    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (!token) {
      setErrorMsg("রিসেট লিংকটি সঠিক নয় অথবা মেয়াদ শেষ হয়ে গেছে।");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("দুইটি পাসওয়ার্ড একই নয়।");
      setLoading(false);
      return;
    }

    try {
      const { error } = await authClient.resetPassword({
        newPassword: password,
        token,
      });

      if (error) {
        setErrorMsg(
          error.message || "পাসওয়ার্ড পরিবর্তন করতে সমস্যা হয়েছে.",
        );
        return;
      }

      setSuccessMsg(
        "আপনার পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে। এখন সাইন ইন করতে পারবেন।",
      );

      setTimeout(() => {
        router.push("/sign-in");
      }, 2000);
    } catch (error) {
      console.error("Reset password error:", error);
      setErrorMsg("একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50/30 px-4 py-8 sm:px-6 sm:py-10">
      <div className="w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#c00000] mb-6 sm:mb-8 tracking-wide leading-tight">
          নতুন পাসওয়ার্ড
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
                নতুন পাসওয়ার্ড
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="নতুন পাসওয়ার্ড লিখুন"
                  className="w-full px-3 py-2.5 sm:px-3.5 sm:py-2.5 pr-11 bg-[#fafafa] border border-gray-300 rounded-md outline-none focus:border-[#c00000] focus:bg-white text-gray-800 text-sm transition-all"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-400 hover:text-[#c00000] transition-colors cursor-pointer"
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

            <div>
              <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1.5">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="আবার পাসওয়ার্ড লিখুন"
                  className="w-full px-3 py-2.5 sm:px-3.5 sm:py-2.5 pr-11 bg-[#fafafa] border border-gray-300 rounded-md outline-none focus:border-[#c00000] focus:bg-white text-gray-800 text-sm transition-all"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-400 hover:text-[#c00000] transition-colors cursor-pointer"
                  aria-label={
                    showConfirmPassword
                      ? "পাসওয়ার্ড লুকান"
                      : "পাসওয়ার্ড দেখুন"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} strokeWidth={1.8} />
                  ) : (
                    <Eye size={19} strokeWidth={1.8} />
                  )}
                </button>
              </div>
            </div>

            <div className="pt-1 sm:pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#c00000] hover:bg-[#a00000] active:bg-[#800000] text-white font-medium py-2.5 sm:py-3 rounded-md transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading
                  ? "পাসওয়ার্ড পরিবর্তন হচ্ছে..."
                  : "পাসওয়ার্ড পরিবর্তন করুন"}
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}