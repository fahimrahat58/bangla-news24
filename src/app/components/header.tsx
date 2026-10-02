import React from "react";
import Image from "next/image";
import logo from "../../../public/logo.webp";


const Header = () => {
  const today = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="w-full bg-white border-b border-gray-200 py-3 px-4 md:px-8">
      {/* Header Top Section */}
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Spacer (to keep the center perfectly balanced) */}
        <div className="w-36 hidden md:block"></div>

        {/* Center: Logo, Title & Date */}
        <div className="flex items-center gap-3 justify-center text-center">
          <Image
            src={logo}
            alt="Logo"
            width={40}
            height={40}
            className="h-12 w-auto object-contain"
          />
          <div className="flex flex-col items-start">
            <h1 className="text-2xl md:text-3xl font-bold text-[#b91c1c] tracking-tight">
              Bangla News 24
            </h1>
            <span className="text-xs text-gray-500 font-medium">{today}</span>
          </div>
        </div>

        {/* Right: Sign In & Sign Up Buttons */}
        <div className="flex items-center gap-3 text-sm font-medium">
          <button className="text-gray-700 hover:text-red-600 transition-colors px-2 py-1">
            সাইন ইন
          </button>
          <button className="bg-[#b91c1c] hover:bg-red-800 text-white px-4 py-1.5 rounded text-sm font-medium transition-colors">
            সাইন আপ
          </button>
        </div>
      </div>
      
    </header>
  );
};

export default Header;
