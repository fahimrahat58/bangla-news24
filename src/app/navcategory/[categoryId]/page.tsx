import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  type: string;
  isLive: boolean;
  firstPublished: string;
  lastPublished: string;
  source: string;
}

interface PageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

const CategoryNewsPage = async ({ params }: PageProps) => {
  const { categoryId } = await params;

  if (!categoryId) {
    notFound();
  }

  let responseData: {
    data?: NewsArticle[];
    title?: string;
  };

  try {
    const res = await fetch(
      `https://news-api-v2.vercel.app/api/category/${categoryId}`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!res.ok) {
      notFound();
    }

    responseData = await res.json();
  } catch {
    notFound();
  }

  const articles = responseData.data || [];
  const categoryTitle = responseData.title || categoryId;

  if (articles.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 text-base">
          এই ক্যাটাগরিতে কোনো সংবাদ পাওয়া যায়নি।
        </p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Category Title */}
      <div className="border-b-2 border-red-700 pb-2 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {categoryTitle}
        </h1>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {articles.map((news) => (
          <Link
            key={news.id}
            href={`/article/${news.id}`}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col group"
          >
            {/* Image */}
            <div className="relative w-full h-52 sm:h-48 bg-gray-200 overflow-hidden">
              <Image
                src={news.imageUrl || "/placeholder.jpg"}
                alt={news.imageAlt || news.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
              <div>
                {/* Category */}
                <span className="text-xs text-red-600 font-medium block mb-1.5">
                  {news.category}
                </span>

                {/* Title */}
                <h2 className="text-lg font-bold text-gray-800 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug mb-2">
                  {news.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                  {news.description}
                </p>
              </div>

              {/* Footer */}
              <div className="text-xs text-gray-400 border-t border-gray-100 pt-2 mt-4 flex justify-between items-center gap-3">
                <span>
                  {new Date(news.firstPublished).toLocaleDateString("bn-BD", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>

                <span className="truncate">{news.source}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default CategoryNewsPage;