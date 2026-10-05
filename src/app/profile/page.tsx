"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/app/lib/auth-client";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-white px-4 py-8 sm:py-10 md:py-12">
      <div className="w-full max-w-[448px] mx-auto">
        {/* Title */}
        <h1 className="text-center text-4xl sm:text-5xl font-bold text-[#b91c1c] mb-8 sm:mb-10">
          প্রোফাইল
        </h1>

        {/* Profile Image */}
        <div className="flex justify-center mb-6 sm:mb-8">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || "Profile"}
              width={112}
              height={112}
              unoptimized
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-[#b91c1c]/10 shadow-sm"
            />
          ) : (
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#b91c1c] to-[#7f1d1d] text-white flex items-center justify-center border-4 border-red-100 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 sm:w-14 sm:h-14"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 4a3 3 0 1 1-3 3 3 3 0 0 1 3-3Zm0 12a7.2 7.2 0 0 1-5.4-2.45 5.5 5.5 0 0 1 10.8 0A7.2 7.2 0 0 1 12 18Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>

        {/* User Information */}
        <div className="space-y-5">
          {/* Name */}
          <div>
            <p className="text-sm sm:text-base text-gray-600 mb-2">নাম</p>

            <div className="w-full min-h-[48px] px-4 flex items-center border border-gray-200 bg-gray-50 rounded-md">
              <p className="text-sm sm:text-base text-gray-800 font-medium break-all">
                {session.user.name || "নাম দেওয়া হয়নি"}
              </p>
            </div>
          </div>

          {/* Email */}
          <div>
            <p className="text-sm sm:text-base text-gray-600 mb-2">ইমেইল</p>

            <div className="w-full min-h-[48px] px-4 flex items-center border border-gray-200 bg-gray-50 rounded-md">
              <p className="text-sm sm:text-base text-gray-700 break-all">
                {session.user.email}
              </p>
            </div>
          </div>

          {/* Profile Image */}
          <div>
            <p className="text-sm sm:text-base text-gray-600 mb-2">
              প্রোফাইল ছবি
            </p>

            <div className="w-full min-h-[48px] px-4 flex items-center border border-gray-200 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-500 break-all">
                {session.user.image || "প্রোফাইল ছবি দেওয়া হয়নি"}
              </p>
            </div>
          </div>

          {/* Update Profile Button */}
          <Link
            href="/update"
            className="w-full h-[48px] flex items-center justify-center bg-[#b91c1c] hover:bg-red-800 text-white rounded-md font-medium text-sm sm:text-base transition-colors"
          >
            প্রোফাইল আপডেট করুন
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-7">
          <div className="flex-1 h-px bg-gray-200" />

          <span className="text-sm text-gray-400">অ্যাকাউন্ট</span>

          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Account Info */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            আপনার অ্যাকাউন্টে লগইন করা হয়েছে
          </p>

          <p className="mt-1 text-sm sm:text-base font-medium text-gray-700 break-all">
            {session.user.email}
          </p>
        </div>
      </div>
    </main>
  );
}
