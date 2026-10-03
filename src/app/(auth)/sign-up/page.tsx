"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up data:", formData);
    // এখানে আপনার Registration Logic (API/Firebase/NextAuth) যুক্ত করুন
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-gray-50/50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-red-600 tracking-tight">
            সাইন আপ
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            নতুন অ্যাকাউন্ট তৈরি করতে নিচের তথ্যগুলো পূরণ করুন
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
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

          {/* Image URL Field */}
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              ইমেজ (Image URL)
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
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-600 outline-none transition-all duration-200 text-sm text-gray-900 bg-white"
            />
          </div>

          {/* Password Field */}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 mt-2"
          >
            সাইন আপ করুন
          </button>
        </form>

        {/* Redirect to Sign In */}
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