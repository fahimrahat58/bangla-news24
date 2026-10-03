"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in with:", { email, password });
    // এখানে আপনার Authentication Logic (NextAuth / Firebase / Custom API) যুক্ত করুন
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50/50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-red-600 tracking-tight">
            সাইন ইন
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            আপনার ইমেইল ও পাসওয়ার্ড দিয়ে একাউন্টে প্রবেশ করুন
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-600 outline-none transition-all duration-200 text-sm text-gray-900 bg-white"
            />
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                পাসওয়ার্ড
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-medium text-red-600 hover:underline"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-600 outline-none transition-all duration-200 text-sm text-gray-900 bg-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            সাইন ইন করুন
          </button>
        </form>

        {/* Redirect to Sign Up */}
        <div className="mt-6 text-center text-sm text-gray-600 border-t border-gray-100 pt-5">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-semibold text-red-600 hover:text-red-700 hover:underline ml-1"
          >
            সাইন আপ করুন
          </Link>
        </div>
      </div>
    </div>
  );
}