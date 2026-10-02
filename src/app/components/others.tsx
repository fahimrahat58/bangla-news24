import Image from "next/image";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  firstPublished?: string;
}

// তারিখ ও সময়কে সংক্ষেপিত বাংলায় রূপান্তর করার ফাংশন
function formatBengaliDateTime(isoString?: string) {
  if (!isoString) return "";

  const date = new Date(isoString);

  const dateFormatted = date.toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const timeFormatted = date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(/[0-9]/g, (digit) => "০১২৩৪৫৬৭৮৯"[parseInt(digit)]);

  return `${dateFormatted} এ ${timeFormatted}`;
}

async function getSelectedNews(): Promise<Article[]> {
  try {
    const res = await fetch("https://news-api-v2.vercel.app/api/news/sections", {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json();
    const selectedNewsSection = data?.data?.find(
      (section: { title?: string }) => section.title === "অন্যান্য খবর"
    );

    return selectedNewsSection?.articles || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

export default async function Others() {
  const articles = await getSelectedNews();

  if (!articles || articles.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-gray-500">
        কোনো খবর পাওয়া যায়নি।
      </div>
    );
  }

  return (
    /* max-w-4xl ব্যবহার করে পুরো সেকশনের চওড়া কমানো হয়েছে */
    <section className="max-w-4xl mx-auto px-4 py-6">
      {/* হেডার */}
      <div className="border-b-2 border-red-700 mb-5 pb-1">
        <h2 className="text-lg font-bold text-gray-900">অন্যান্য খবর</h2>
      </div>

      {/* গ্যাপ কমিয়ে gap-4 করা হয়েছে এবং আরও ছোট কার্ড সাইজ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-[#f7f7f7] rounded-md p-3 flex flex-col justify-between border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div>
              {/* ছবির হাইট কিছুটা কমিয়ে h-36 করা হয়েছে */}
              <div className="relative w-full h-36 mb-2.5 rounded overflow-hidden bg-gray-200">
                {article.imageUrl ? (
                  <Image
                    src={article.imageUrl}
                    alt={article.imageAlt || article.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* ক্যাটাগরি */}
              <span className="text-[11px] text-red-600 font-semibold block mb-0.5">
                {article.category || "নির্বাচিত খবর"}
              </span>

              {/* শিরোনাম */}
              <Link href={article.link || "#"} target="_blank">
                <h3 className="text-sm font-bold text-gray-900 line-clamp-2 hover:text-red-600 transition-colors duration-150 mb-1.5 leading-snug">
                  {article.title}
                </h3>
              </Link>

              {/* সংক্ষিপ্ত বর্ণনা */}
              <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed mb-3">
                {article.description}
              </p>
            </div>

            {/* তারিখ ও সময় */}
            {article.firstPublished && (
              <div className="text-[10px] text-gray-400 mt-auto pt-1.5 border-t border-gray-200">
                {formatBengaliDateTime(article.firstPublished)}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}