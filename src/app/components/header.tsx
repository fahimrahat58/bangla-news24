"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.webp";
import { signOut, useSession } from "@/app/lib/auth-client";
import { getImageUrl } from "@/app/lib/image-url";

const Header = () => {
  const { data: session, isPending } = useSession();

  const today = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-8 py-3 sm:py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 md:gap-0">
          <div className="hidden md:block w-36" />

          <div className="flex items-center justify-center gap-2 sm:gap-3 text-center min-w-0">
            <Image
              src={logo}
              alt="Bangla News 24 Logo"
              width={48}
              height={48}
              priority
              className="h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12 shrink-0 object-contain"
            />

            <div className="flex flex-col items-start min-w-0">
              <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-[#b91c1c] tracking-tight leading-tight whitespace-nowrap">
                Bangla News 24
              </h1>

              <span className="text-[9px] sm:text-[10px] md:text-xs text-gray-500 font-medium mt-0.5 whitespace-nowrap">
                {today}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 text-[11px] sm:text-xs md:text-sm font-medium w-full md:w-auto">
            {isPending ? (
              <span className="text-gray-400">লোড হচ্ছে...</span>
            ) : session ? (
              <div className="flex items-center justify-center gap-2 sm:gap-3 max-w-full">
                <div className="flex items-center gap-2 min-w-0">
                  <Link
                    href="/profile"
                    title="প্রোফাইল দেখুন"
                    className="shrink-0 rounded-full"
                  >
                    {session.user.image ? (
                      <img
                        src={getImageUrl(session.user.image)}
                        alt={session.user.name || "User"}
                        className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full object-cover border-2 border-[#b91c1c]/20 hover:border-[#b91c1c] transition-all"
                      />
                    ) : (
                      <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#b91c1c] to-[#7f1d1d] text-white flex items-center justify-center border-2 border-red-100 shadow-sm hover:shadow-md transition-all">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 sm:w-5 sm:h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 4a3 3 0 1 1-3 3 3 3 0 0 1 3-3Zm0 12a7.2 7.2 0 0 1-5.4-2.45 5.5 5.5 0 0 1 10.8 0A7.2 7.2 0 0 1 12 18Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </Link>

                  <span className="text-gray-700 truncate max-w-[110px] sm:max-w-[180px] md:max-w-none">
                    স্বাগতম,{" "}
                    <span className="text-[#b91c1c] font-semibold">
                      {session.user.name}
                    </span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="shrink-0 bg-[#b91c1c] hover:bg-red-800 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-[11px] sm:text-xs md:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer"
                >
                  সাইন আউট
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                <Link
                  href="/sign-in"
                  className="text-gray-700 hover:text-[#b91c1c] transition-colors px-2 sm:px-2.5 py-1.5 whitespace-nowrap cursor-pointer"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/sign-up"
                  className="bg-[#b91c1c] hover:bg-red-800 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-[11px] sm:text-xs md:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;