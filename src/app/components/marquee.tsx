import React from 'react';
import ReactMarquee from "react-fast-marquee";
import Link from 'next/link';

interface NewsItem {
  _id?: string;
  id?: string;
  title: string;
  slug?: string;
}

const Marquee = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10", {
    next: { revalidate: 60 }, // ১ মিনিট পরপর ক্যাশ রিলিক্রিয়েট হবে
  });
  const data = await res.json();
  const latest: NewsItem[] = data.data || [];

  return (
    <div className="w-full bg-[#b91c1c] text-white flex items-center overflow-hidden">
      {/* "সর্বশেষ" ব্যাজ (একদম ফিক্সড থাকবে) */}
      <div className="bg-[#881337] px-5 py-2 font-bold text-sm whitespace-nowrap z-10 shadow-md">
        সর্বশেষ
      </div>

      {/* স্ক্রোলিং মার্কি অংশ */}
      <ReactMarquee speed={100} pauseOnHover={true} gradient={false} className="py-2">
        {latest.map((item, index) => (
          <div key={item._id || item.id || index} className="flex items-center text-sm font-medium">
            <Link 
              href={`/news/${item.slug || item._id || '#'}`}
              className="hover:underline px-3 whitespace-nowrap"
            >
              {item.title}
            </Link>
            {/* বুলেট পয়েন্ট ডিভাইডার */}
            <span className="text-red-300 font-bold mx-2">•</span>
          </div>
        ))}
      </ReactMarquee>
    </div>
  );
};

export default Marquee;