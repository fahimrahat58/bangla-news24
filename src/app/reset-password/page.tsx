"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/app/lib/auth-client";
import { Eye, EyeOff } from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");

    if (!token) {
      setErrorMsg(
        "পাসওয়ার্ড রিসেট লিংকটি সঠিক নয় অথবা মেয়াদ শেষ হয়ে গেছে।"
      );
      return;
    }

    if (password.length < 8) {
      setErrorMsg("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("দুইটি পাসওয়ার্ড একই নয়।");
      return;
    }

    setLoading(true);

    try {
      const { error } = await resetPassword({
        newPassword: password,
        token,
      });

      if (error) {
        setErrorMsg(
          error.message ||
            "পাসওয়ার্ড পরিবর্তন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
        );
        return;
      }

      setSuccessMsg(
        "আপনার পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে। এখন সাইন ইন করুন।"
      );

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.replace("/sign-in");
      }, 2000);
    } catch (error) {
      console.error("Reset password error:", error);

      setErrorMsg(
        "পাসওয়ার্ড পরিবর্তন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50/30 px-4 pt-8 pb-8 sm:pt-10">
      <div className="w-full max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#c00000] mb-3 tracking-wide">
          নতুন পাসওয়ার্ড
        </h1>

        <p className="text-sm text-gray-500 text-center mb-8 leading-relaxed">
          আপনার অ্যাকাউন্টের জন্য একটি নতুন পাসওয়ার্ড সেট করুন।
        </p>

        {successMsg && (
          <div className="bg-green-50 text-green-700 border border-green-200 text-sm p-3 rounded-md mb-4 text-center">
            {successMsg}
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
              নতুন পাসওয়ার্ড
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="নতুন পাসওয়ার্ড লিখুন"
                className="w-full px-3.5 py-2.5 pr-11 bg-[#fafafa] border border-gray-300 rounded-md outline-none focus:border-[#c00000] focus:bg-white text-gray-800 text-sm transition-all"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-400 hover:text-[#c00000] transition-colors cursor-pointer"
                aria-label={
                  showPassword
                    ? "পাসওয়ার্ড লুকান"
                    : "পাসওয়ার্ড দেখুন"
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
            <label className="block text-gray-700 text-sm font-medium mb-1.5">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="পাসওয়ার্ড আবার লিখুন"
                className="w-full px-3.5 py-2.5 pr-11 bg-[#fafafa] border border-gray-300 rounded-md outline-none focus:border-[#c00000] focus:bg-white text-gray-800 text-sm transition-all"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
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

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c00000] hover:bg-[#a00000] active:bg-[#800000] text-white font-medium py-3 rounded-md transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading
                ? "পাসওয়ার্ড পরিবর্তন হচ্ছে..."
                : "পাসওয়ার্ড পরিবর্তন করুন"}
            </button>
          </div>
        </form>

        <div className="mt-5 text-center text-sm text-gray-700">
          পাসওয়ার্ড পরিবর্তন করবেন না?{" "}
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

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-gray-50/30 px-4">
          <p className="text-gray-500">লোড হচ্ছে...</p>
        </main>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}