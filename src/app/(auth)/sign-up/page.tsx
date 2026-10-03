"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/app/lib/auth-client";
import { Eye, EyeOff } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    try {
      const { error } = await signUp.email({
        name: data.name,
        image: data.image,
        email: data.email,
        password: data.password,
        callbackURL: "/",
      });

      if (error) {
        setErrorMsg(error.message || "সাইন আপ করতে সমস্যা হয়েছে।");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Sign up error:", err);
      setErrorMsg("একটি অপ্রত্যাশিত ত্রুটি ঘটেছে।");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: "google",
    });
  };

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
              Image
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
              {loading ? "প্রসেসিং হচ্ছে..." : "সাইন আপ করুন"}
            </button>
          </div>
        </form>

        <div className="mt-5 text-center text-sm text-gray-700">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/sign-in"
            className="text-[#c00000] font-bold hover:underline"
          >
            সাইন ইন করুন
          </Link>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="cursor-pointer! w-full mt-3 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:text-[#c00000] hover:shadow-md hover:-translate-y-0.5 text-gray-800 font-medium py-3 rounded-md transition-all duration-200 text-base"
          >
            Google দিয়ে সাইন ইন করুন
          </button>
        </div>
      </div>
    </div>
  );
}
