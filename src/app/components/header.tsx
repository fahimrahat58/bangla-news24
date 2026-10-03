"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.webp";
import { useSession, signOut } from "@/app/lib/auth-client";

const Header = () => {
  const { data: session, isPending } = useSession();

  const today = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
          <div className="hidden md:block w-36" />

          <div className="flex items-center justify-center gap-2 sm:gap-3 text-center">
            <Image
              src={logo}
              alt="Bangla News 24 Logo"
              width={40}
              height={40}
              priority
              className="h-10 sm:h-11 md:h-12 w-auto object-contain"
            />

            <div className="flex flex-col items-start">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#b91c1c] tracking-tight leading-tight">
                Bangla News 24
              </h1>

              <span className="text-[10px] sm:text-xs text-gray-500 font-medium mt-0.5">
                {today}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium">
            {isPending ? (
              <span className="text-gray-400">লোড হচ্ছে...</span>
            ) : session ? (
              <>
                <span className="text-gray-700 whitespace-nowrap">
                  স্বাগতম,{" "}
                  <span className="text-[#b91c1c] font-semibold">
                    {session.user.name}
                  </span>
                </span>

                <button
                  onClick={() => signOut()}
                  className="bg-[#b91c1c] hover:bg-red-800 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer"
                >
                  সাইন আউট
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-gray-700 hover:text-[#b91c1c] transition-colors px-2 py-1.5 whitespace-nowrap cursor-pointer"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/sign-up"
                  className="bg-[#b91c1c] hover:bg-red-800 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;