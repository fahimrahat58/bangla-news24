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
    .replace(/[0-9]/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);

  return `${dateFormatted} এ ${timeFormatted}`;
}

async function getSelectedNews(): Promise<Article[]> {
  try {
    const res = await fetch(
      "https://news-api-v2.vercel.app/api/news/sections",
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    const selectedNewsSection = data?.data?.find(
      (section: { title?: string }) => section.title === "অন্যান্য খবর",
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
      <section className="w-full px-4 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">কোনো খবর পাওয়া যায়নি।</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="flex items-center justify-between border-b border-gray-200 mb-6 sm:mb-8">
        <div className="relative">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 pb-3">
            অন্যান্য খবর
          </h2>

          <span className="absolute bottom-0 left-0 w-16 sm:w-20 h-0.5 bg-red-600" />
        </div>

        <Link
          href="/category/technology"
          className="text-xs sm:text-sm font-medium text-gray-500 hover:text-red-600 transition-colors duration-200"
        >
          আরও দেখুন →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.id}`}
            className="group block h-full"
          >
            <article className="h-full overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
                {article.imageUrl ? (
                  <Image
                    src={article.imageUrl}
                    alt={article.imageAlt || article.title}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              <div className="flex flex-col p-4 sm:p-5">
                <span className="w-fit text-xs font-semibold text-red-600 mb-2">
                  {article.category || "অন্যান্য খবর"}
                </span>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-7 line-clamp-3 group-hover:text-red-600 transition-colors duration-200">
                  {article.title}
                </h3>

                {article.description && (
                  <p className="mt-3 text-sm text-gray-600 leading-6 line-clamp-3">
                    {article.description}
                  </p>
                )}

                {article.firstPublished && (
                  <div className="mt-5 pt-3 border-t border-gray-100">
                    <time className="text-xs text-gray-400">
                      {formatBengaliDateTime(article.firstPublished)}
                    </time>
                  </div>
                )}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
