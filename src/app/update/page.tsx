"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { updateUser, useSession } from "@/app/lib/auth-client";

export default function ProfileUpdatePage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <p className="py-8 text-center">লোড হচ্ছে...</p>;
  }

  if (!session) {
    return <p className="py-8 text-center">প্রোফাইল দেখতে লগইন করুন</p>;
  }

  return <UpdateForm session={session} />;
}

function UpdateForm({ session }: { session: any }) {
  const [name, setName] = useState(session.user.name || "");
  const [image, setImage] = useState(session.user.image || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      await updateUser({
        name,
        image: image || undefined,
      });

      setMessage("প্রোফাইল সফলভাবে আপডেট হয়েছে");
    } catch {
      setMessage("প্রোফাইল আপডেট করা যায়নি");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white px-4 py-8 sm:py-10 md:py-12">
      <div className="w-full max-w-[448px] mx-auto">
        {/* Title */}
        <h1 className="text-center text-4xl sm:text-5xl font-bold text-[#b91c1c] mb-8 sm:mb-10">
          প্রোফাইল আপডেট
        </h1>

        {/* Profile Image Preview */}
        <div className="flex justify-center mb-7 sm:mb-8">
          {image ? (
            <Image
              src={image}
              alt={name || "Profile"}
              width={112}
              height={112}
              unoptimized
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border border-gray-200 shadow-sm"
            />
          ) : (
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#b91c1c] text-white flex items-center justify-center text-3xl sm:text-4xl font-bold">
              {name?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
        </div>

        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm sm:text-base text-gray-700 mb-2"
            >
              নাম
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম"
              className="w-full h-[48px] px-4 text-sm sm:text-base border border-gray-300 rounded-md outline-none focus:border-[#b91c1c] focus:ring-1 focus:ring-[#b91c1c] transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm sm:text-base text-gray-700 mb-2"
            >
              ইমেইল
            </label>

            <input
              id="email"
              type="email"
              value={session.user.email}
              readOnly
              className="w-full h-[48px] px-4 text-sm sm:text-base border border-gray-200 bg-gray-50 text-gray-500 rounded-md outline-none cursor-not-allowed"
            />
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="image"
              className="block text-sm sm:text-base text-gray-700 mb-2"
            >
              প্রোফাইল ছবি URL
            </label>

            <input
              id="image"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full h-[48px] px-4 text-sm sm:text-base border border-gray-300 rounded-md outline-none focus:border-[#b91c1c] focus:ring-1 focus:ring-[#b91c1c] transition"
            />
          </div>

          {/* Message */}
          {message && (
            <p
              className={`text-center text-sm ${
                message.includes("সফল") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          {/* Update Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[48px] bg-[#b91c1c] hover:bg-red-800 disabled:bg-red-300 text-white rounded-md font-medium text-sm sm:text-base transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
          </button>

          {/* Back to Profile */}
          <Link
            href="/profile"
            className="w-full h-[48px] flex items-center justify-center border border-gray-300 hover:border-[#b91c1c] hover:text-[#b91c1c] text-gray-700 rounded-md font-medium text-sm sm:text-base transition-colors"
          >
            প্রোফাইলে ফিরে যান
          </Link>
        </form>
      </div>
    </main>
  );
}
