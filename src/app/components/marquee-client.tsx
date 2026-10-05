"use client";

import Link from "next/link";
import ReactMarquee from "react-fast-marquee";

interface NewsItem {
  _id?: string;
  id?: string;
  title: string;
}

interface MarqueeClientProps {
  latest: NewsItem[];
}

export default function MarqueeClient({
  latest,
}: MarqueeClientProps) {
  if (latest.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-[#b91c1c] text-white flex items-center overflow-hidden">
      <div className="shrink-0 bg-[#881337] px-4 sm:px-5 py-2 font-bold text-xs sm:text-sm whitespace-nowrap z-10 shadow-md">
        সর্বশেষ
      </div>

      <div className="min-w-0 flex-1">
        <ReactMarquee
          speed={70}
          pauseOnHover
          gradient={false}
          className="py-2"
        >
          {latest.map((item, index) => {
            const articleId = item._id || item.id;

            if (!articleId) {
              return null;
            }

            return (
              <div
                key={`${articleId}-${index}`}
                className="flex items-center text-xs sm:text-sm font-medium"
              >
                <Link
                  href={`/article/${articleId}`}
                  className="px-3 whitespace-nowrap hover:text-yellow-200 hover:underline transition-colors"
                >
                  {item.title}
                </Link>

                <span className="text-red-300 font-bold mx-2">
                  •
                </span>
              </div>
            );
          })}
        </ReactMarquee>
      </div>
    </div>
  );
}