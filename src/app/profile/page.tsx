"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/app/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <p className="text-gray-500">লোড হচ্ছে...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            প্রোফাইল দেখতে সাইন ইন করুন।
          </p>

          <Link
            href="/sign-in"
            className="inline-block bg-[#b91c1c] hover:bg-red-800 text-white px-5 py-2 rounded-md transition-colors"
          >
            সাইন ইন
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#b91c1c] h-32 sm:h-40" />

          <div className="px-5 sm:px-8 pb-8">
            <div className="flex justify-center -mt-16 sm:-mt-20">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white shadow-md"
                />
              ) : (
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#b91c1c] to-[#7f1d1d] text-white flex items-center justify-center border-4 border-white shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-14 h-14 sm:w-16 sm:h-16"
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

            <div className="text-center mt-5">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {session.user.name}
              </h1>

              <p className="text-gray-500 mt-1 break-all">
                {session.user.email}
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="border border-gray-200 rounded-xl p-4">
                <p className="text-sm text-gray-500">নাম</p>
                <p className="mt-1 font-medium text-gray-900">
                  {session.user.name}
                </p>
              </div>

              <div className="border border-gray-200 rounded-xl p-4">
                <p className="text-sm text-gray-500">ইমেইল</p>
                <p className="mt-1 font-medium text-gray-900 break-all">
                  {session.user.email}
                </p>
              </div>

              <div className="border border-gray-200 rounded-xl p-4">
                <p className="text-sm text-gray-500">অ্যাকাউন্ট ID</p>
                <p className="mt-1 font-medium text-gray-900 break-all">
                  {session.user.id}
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                href="/profile/edit"
                className="bg-[#b91c1c] hover:bg-red-800 text-white px-6 py-2.5 rounded-md font-medium transition-colors"
              >
                প্রোফাইল এডিট
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}