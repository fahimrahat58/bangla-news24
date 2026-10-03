"use client";

import { useState } from "react";
import Link from "next/link";
import { signUp } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    const { name, imageUrl, email, password } = formData;

    const result = await signUp.email({
      name,
      email,
      password,
      image: imageUrl || undefined,
      callbackURL: "/",
    });

    if (result.error) {
      setError(result.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
      setIsLoading(false);
      return;
    }

    router.push("/");
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-gray-50/50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-red-600 tracking-tight">
            সাইন আপ
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            নতুন অ্যাকাউন্ট তৈরি করতে নিচের তথ্যগুলো পূরণ করুন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              নাম
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="আপনার পুরো নাম"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-600 outline-none transition-all duration-200 text-sm text-gray-900 bg-white"
            />
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              প্রোফাইল ইমেজ URL
            </label>

            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-600 outline-none transition-all duration-200 text-sm text-gray-900 bg-white"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              ইমেইল
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-600 outline-none transition-all duration-200 text-sm text-gray-900 bg-white"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-600 outline-none transition-all duration-200 text-sm text-gray-900 bg-white"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:bg-red-400 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 mt-2"
          >
            {isLoading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "সাইন আপ করুন"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 border-t border-gray-100 pt-5">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-red-600 hover:text-red-700 hover:underline ml-1"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </div>
    </div>
  );
}