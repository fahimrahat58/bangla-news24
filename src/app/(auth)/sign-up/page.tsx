"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn, signUp, useSession } from "@/app/lib/auth-client";
import { Eye, EyeOff } from "lucide-react";
import { getImageUrl } from "@/app/lib/image-url";

export default function SignUpPage() {
  const { data: session, isPending: sessionPending } = useSession();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name")?.toString().trim() || "";

    const image = getImageUrl(formData.get("image")?.toString().trim() || "");

    const email = formData.get("email")?.toString().trim() || "";
    const password = formData.get("password")?.toString() || "";

    try {
      const result = await signUp.email({
        name,
        email,
        password,
        ...(image ? { image } : {}),
        callbackURL: "/",
      });

      if (result.error) {
        setErrorMsg(result.error.message || "সাইন আপ করতে সমস্যা হয়েছে।");
        return;
      }

      setSuccessMsg(
        "আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে। আপনার ইমেইলে একটি নিশ্চিতকরণ লিংক পাঠানো হয়েছে। অনুগ্রহ করে আপনার ইমেইল খুলে লিংকটিতে ক্লিক করে অ্যাকাউন্টটি নিশ্চিত করুন। নিশ্চিতকরণ সম্পন্ন হলে আপনাকে স্বয়ংক্রিয়ভাবে হোম পেজে নিয়ে যাওয়া হবে।",
      );
    } catch {
      setErrorMsg("একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setErrorMsg("");

    try {
      const result = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (result.error) {
        setErrorMsg(
          result.error.message || "Google দিয়ে সাইন ইন করতে সমস্যা হয়েছে.",
        );
        setGoogleLoading(false);
      }
    } catch {
      setErrorMsg("Google দিয়ে সাইন ইন করতে সমস্যা হয়েছে.");
      setGoogleLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setFacebookLoading(true);
    setErrorMsg("");

    try {
      const result = await signIn.social({
        provider: "facebook",
        callbackURL: "/",
      });

      if (result.error) {
        setErrorMsg(
          result.error.message || "Facebook দিয়ে সাইন ইন করতে সমস্যা হয়েছে.",
        );
        setFacebookLoading(false);
      }
    } catch {
      setErrorMsg(
        "Facebook দিয়ে সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      );
      setFacebookLoading(false);
    }
  };

  if (sessionPending) {
    return null;
  }

  if (session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/30 px-4 py-8">
        <div className="w-full max-w-md text-center">
          <p className="text-gray-700 text-sm">
            আপনি ইতিমধ্যে সাইন ইন করা আছেন।
          </p>

          <Link
            href="/"
            className="inline-block mt-3 text-[#c00000] font-bold hover:underline cursor-pointer"
          >
            হোম পেজে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/30 px-4 py-8">
      <div className="w-full max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#c00000] mb-8 tracking-wide">
          সাইন আপ
        </h1>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 border border-red-200 text-sm p-3 rounded-md mb-4 text-center">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="bg-green-50 text-green-700 border border-green-200 text-sm p-4 rounded-md mb-4 text-center leading-relaxed">
            {successMsg}
          </div>
        )}

        {!successMsg && (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">
                  নাম
                </label>

                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-3.5 py-2.5 bg-[#fafafa] border border-gray-300 rounded-md outline-none focus:border-[#c00000] focus:bg-white text-gray-800 text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">
                  Image <span className="text-gray-400">(Optional)</span>
                </label>

                <input
                  type="url"
                  name="image"
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full px-3.5 py-2.5 bg-[#fafafa] border border-gray-300 rounded-md outline-none focus:border-[#c00000] focus:bg-white text-gray-800 text-sm transition-all"
                />
              </div>

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
                <label className="block text-gray-700 text-sm font-medium mb-1.5">
                  পাসওয়ার্ড
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    autoComplete="new-password"
                    className="w-full px-3.5 py-2.5 pr-11 bg-[#fafafa] border border-gray-300 rounded-md outline-none focus:border-[#c00000] focus:bg-white text-gray-800 text-sm transition-all"
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

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || googleLoading || facebookLoading}
                  className="w-full bg-[#c00000] hover:bg-[#a00000] active:bg-[#800000] text-white font-medium py-3 rounded-md transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? "সাইন আপ হচ্ছে..." : "সাইন আপ করুন"}
                </button>
              </div>
            </form>

            <div className="mt-5 text-center text-sm text-gray-700">
              <div>
                অ্যাকাউন্ট আছে?{" "}
                <Link
                  href="/sign-in"
                  className="text-[#c00000] font-bold hover:underline cursor-pointer"
                >
                  সাইন ইন করুন
                </Link>
              </div>

              <div className="flex items-center gap-3 my-5">
                <div className="h-px flex-1 bg-gray-200" />

                <span className="text-xs text-gray-400">অথবা</span>

                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={googleLoading || loading || facebookLoading}
                  className="cursor-pointer! w-full bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:text-[#c00000] hover:shadow-md hover:-translate-y-0.5 text-gray-800 font-medium py-3 rounded-md transition-all duration-200 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {googleLoading
                    ? "Google দিয়ে সাইন ইন হচ্ছে..."
                    : "Google দিয়ে সাইন ইন করুন"}
                </button>

                <button
                  type="button"
                  onClick={handleFacebookLogin}
                  disabled={facebookLoading || loading || googleLoading}
                  className="cursor-pointer! w-full bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:text-[#1877F2] hover:shadow-md hover:-translate-y-0.5 text-gray-800 font-medium py-3 rounded-md transition-all duration-200 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {facebookLoading
                    ? "Facebook দিয়ে সাইন ইন হচ্ছে..."
                    : "Facebook দিয়ে সাইন ইন করুন"}
                </button>
              </div>
            </div>
          </>
        )}

        {successMsg && (
          <div className="text-center mt-5">
            <p className="text-sm text-gray-600 mb-3">
              ইমেইলটি নিশ্চিত করার পর আপনার অ্যাকাউন্ট ব্যবহার করতে পারবেন।
            </p>

            <Link
              href="/sign-in"
              className="inline-block text-[#c00000] font-bold hover:underline cursor-pointer"
            >
              সাইন ইন পেজে যান
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
