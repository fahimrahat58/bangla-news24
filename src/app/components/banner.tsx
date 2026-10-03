import React from "react";
import Image from "next/image";
import Link from "next/link";

const toBengaliNumber = (num: number | string | null | undefined) => {
  const bnNums = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return (
    num?.toString().replace(/\d/g, (digit: string) => bnNums[Number(digit)]) ||
    ""
  );
};

const formatBengaliDateTime = (dateString: string | null | undefined) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const months = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];

  const day = toBengaliNumber(date.getDate());
  const month = months[date.getMonth()];
  const year = toBengaliNumber(date.getFullYear());

  let hours = date.getHours();
  const minutes = toBengaliNumber(
    date.getMinutes().toString().padStart(2, "0"),
  );
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const bnHours = toBengaliNumber(hours);

  return `${day} ${month}, ${year} এ ${bnHours}:${minutes} ${ampm}`;
};

interface Article {
  id: string | number;
  title: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  category?: string;
  firstPublished?: string;
  lastPublished?: string;
}

const Banner = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections", {
    cache: "no-store",
  });
  const data = await res.json();

  const mainNewsSection = data?.data?.find(
    (section: { title?: string }) => section.title === "প্রধান খবর",
  );
  const articles = mainNewsSection?.articles || [];

  const res2 = await fetch(
    "https://news-api-v2.vercel.app/api/news/most-read",
    {
      cache: "no-store",
    },
  );
  const data2 = await res2.json();
  const mostread = Array.isArray(data2?.data)
    ? data2.data
    : data2?.data?.articles || [];

  const mainStory: Article | undefined = articles[0];
  const sideNews: Article[] = articles.slice(1, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {mainStory && (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
              <div>
                {mainStory.imageUrl && (
                  <div className="w-full h-52 relative">
                    <Image
                      src={mainStory.imageUrl}
                      alt={mainStory.imageAlt || mainStory.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4 pb-2">
                  <span className="text-red-600 font-bold text-xs block mb-1">
                    {mainStory.category || "প্রধান খবর"}
                  </span>
                  <Link
                    href={`/article/${mainStory.id}`}
                    className="text-lg font-bold text-gray-900 mb-2 leading-snug hover:text-red-600 block transition-colors"
                  >
                    {mainStory.title}
                  </Link>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-1">
                    {mainStory.description}
                  </p>
                </div>
              </div>
              <div className="px-4 pb-4">
                <p className="text-gray-400 text-[11px] mt-0">
                  {formatBengaliDateTime(
                    mainStory.firstPublished || mainStory.lastPublished,
                  )}
                </p>
              </div>
            </div>
          )}

          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between divide-y divide-gray-100">
            {sideNews.map((item: Article, idx: number) => (
              <div key={item.id || idx} className="py-2.5 first:pt-0 last:pb-0">
                <span className="text-red-600 font-bold text-xs block mb-0.5">
                  {item.category || "প্রধান খবর"}
                </span>
                <Link
                  href={`/article/${item.id}`}
                  className="text-sm font-bold text-gray-900 leading-snug hover:text-red-600 block transition-colors"
                >
                  {item.title}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            সর্বাধিক পঠিত
          </h2>
          <div className="flex flex-col space-y-3.5">
            {mostread.map((item: Article, index: number) => (
              <div key={item.id || index} className="flex items-start gap-3">
                <span className="text-lg font-bold text-red-600 leading-none min-w-[20px]">
                  {toBengaliNumber(index + 1)}
                </span>
                <Link
                  href={`/article/${item.id}`}
                  className="text-xs md:text-sm font-semibold text-gray-800 leading-snug hover:text-red-600 block transition-colors -mt-0.5"
                >
                  {item.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
