import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-4 mt-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-gray-500">
        <div>© {new Date().getFullYear()} BanglaBulletin</div>

        <div>Source: BBC Bangla</div>
      </div>
    </footer>
  );
};

export default Footer;
