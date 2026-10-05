import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <div className="relative mb-6">
          <h1 className="text-[120px] sm:text-[160px] md:text-[200px] leading-none font-black tracking-tight text-[#b91c1c]/10 select-none">
            404
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl sm:text-6xl md:text-7xl font-black text-[#b91c1c]">
              404
            </span>
          </div>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="w-8 h-8 text-[#b91c1c]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.172 16.172a4 4 0 0 0 5.656 0M9 10h.01M15 10h.01"
              />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
          পেজটি খুঁজে পাওয়া যায়নি
        </h2>

        <p className="mt-3 max-w-md mx-auto text-sm sm:text-base leading-7 text-gray-500">
          দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরানো হয়েছে, পরিবর্তন করা
          হয়েছে অথবা এই ঠিকানায় আর নেই।
        </p>

        {/* Home Button */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="min-w-[170px] h-11 px-6 flex items-center justify-center bg-[#b91c1c] hover:bg-red-800 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
          >
            হোমে ফিরে যান
          </Link>
        </div>

        {/* Bottom Text */}
        <p className="mt-10 text-xs text-gray-400">
          Error Code: 404 • Page Not Found
        </p>
      </div>
    </main>
  );
}
