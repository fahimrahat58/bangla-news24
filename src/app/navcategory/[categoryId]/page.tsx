import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Marquee from "@/app/components/marquee";

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

  let responseData: { data?: NewsArticle[]; title?: string };
  try {
    const res = await fetch(
      `https://news-api-v2.vercel.app/api/category/${categoryId}`,
      {
        next: { revalidate: 3600 }, 
      }
    );

    if (!res.ok) {
      notFound();
    }

    responseData = await res.json();
  } catch {
    notFound();
  }

  const articles: NewsArticle[] = responseData.data || [];
  const categoryTitle = responseData.title || categoryId;

  if (!articles || articles.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-600">
        
      </div>
    );
  }

  return (
    <><Marquee /><div className="max-w-7xl mx-auto px-4 py-6 bg-gray-50 min-h-screen">
      
      <div className="border-b-2 border-red-700 pb-2 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{categoryTitle}</h1>
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((news) => (
          <Link
            key={news.id}
            href={`/article/${news.id}`}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col group"
          >
           
            <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
              <Image
                src={news.imageUrl || "/placeholder.jpg"}
                alt={news.imageAlt || news.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>

            
            <div className="p-4 flex flex-col grow justify-between">
              <div>
                <span className="text-xs text-red-600 font-medium block mb-1">
                  {news.category}
                </span>

                <h2 className="text-lg font-bold text-gray-800 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug mb-2">
                  {news.title}
                </h2>

                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                  {news.description}
                </p>
              </div>

              
              <div className="text-xs text-gray-400 border-t pt-2 mt-auto flex justify-between items-center">
                <span>
                  {new Date(news.firstPublished).toLocaleDateString("bn-BD", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span>{news.source}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div></>
  );
};

export default CategoryNewsPage;