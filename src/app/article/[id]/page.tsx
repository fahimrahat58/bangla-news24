import Link from "next/link";
import Image from "next/image";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const renderSafeText = (data: any): string => {
  if (data === null || data === undefined) return "";
  if (
    typeof data === "string" ||
    typeof data === "number" ||
    typeof data === "boolean"
  ) {
    return String(data);
  }
  if (typeof data === "object") {
    if (data.name) return renderSafeText(data.name);
    if (data.tag) return renderSafeText(data.tag);
    if (data.text) return renderSafeText(data.text);
    if (data.data?.text) return renderSafeText(data.data.text);
    if (data.title) return renderSafeText(data.title);
    if (data.caption) return renderSafeText(data.caption);
  }
  return "";
};

export default async function ArticleDetailPage({ params }: PageProps) {
  const { id } = await params;

  let articleData: any = null;
  let errorMsg: string | null = null;

  try {
    const res = await fetch(
      `https://news-api-v2.vercel.app/api/article/${id}`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) {
      errorMsg = `API Error Status: ${res.status}`;
    } else {
      const data = await res.json();
      articleData = data?.data || data?.article || data;
    }
  } catch (err: unknown) {
    errorMsg = err instanceof Error ? err.message : "Failed to fetch article";
  }

  if (errorMsg || !articleData || typeof articleData !== "object") {
    return (
      <div className="max-w-4xl mx-auto my-12 p-6 bg-red-50 border border-red-200 rounded-lg text-center font-sans">
        <h2 className="text-xl font-bold text-red-600 mb-2">
          সংবাদ লোড করতে সমস্যা হয়েছে!
        </h2>
        <p className="text-sm text-gray-700 mb-4">
          ডিবাগিং তথ্য: {errorMsg || "Article object is empty or invalid"}
        </p>
        <p className="text-xs text-gray-500 mb-6">
          Article ID: {renderSafeText(id)}
        </p>
        <Link
          href="/"
          className="inline-block bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const category = renderSafeText(articleData.category) || "সংবাদ";
  const title = renderSafeText(articleData.title) || "শিরোনাম পাওয়া যায়নি";
  const source = renderSafeText(articleData.source);
  const description = renderSafeText(articleData.description);
  const imageUrl =
    typeof articleData.imageUrl === "string" ? articleData.imageUrl : null;
  const imageAlt = renderSafeText(articleData.imageAlt) || title;

  let rawContent: any[] = [];
  if (Array.isArray(articleData.content)) {
    rawContent = articleData.content;
  } else if (
    articleData.content &&
    typeof articleData.content === "object" &&
    Array.isArray(articleData.content.blocks)
  ) {
    rawContent = articleData.content.blocks;
  } else if (articleData.content) {
    rawContent = [articleData.content];
  } else if (articleData.body) {
    rawContent = Array.isArray(articleData.body)
      ? articleData.body
      : [articleData.body];
  }

  let tagsList: string[] = [];
  const rawTags =
    articleData.tags || articleData.keywords || articleData.topics;

  if (Array.isArray(rawTags)) {
    tagsList = rawTags
      .map((t) => renderSafeText(t))
      .filter((t) => t.trim() !== "");
  } else if (typeof rawTags === "string" && rawTags.trim() !== "") {
    tagsList = rawTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 font-sans">
      <article className="max-w-4xl mx-auto px-4 bg-white p-6 sm:p-10 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">
            {category}
          </span>
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            ← মূল পাতায় ফিরে যান
          </Link>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 leading-snug mb-4">
          {title}
        </h1>

        <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500 border-y border-gray-100 py-3 mb-6">
          {articleData.firstPublished && (
            <span>
              প্রকাশিত:{" "}
              {new Date(articleData.firstPublished).toLocaleDateString(
                "bn-BD",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
            </span>
          )}
          {source && <span>• সূত্র: {source}</span>}
        </div>

        {imageUrl && (
          <div className="relative w-full h-72 sm:h-112 mb-8 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
        )}

        <div className="prose max-w-none text-gray-800 leading-relaxed space-y-4 text-base sm:text-lg">
          {description && (
            <p className="font-light text-gray-700 bg-gray-50 p-4 border-l-4 border-red-600">
              {description}
            </p>
          )}

          {rawContent.length > 0
            ? rawContent.map((item: any, index: number) => {
                const textContent = renderSafeText(item);
                if (!textContent) return null;
                return <p key={index}>{textContent}</p>;
              })
            : !description && (
                <p className="text-gray-500 italic">
                  সংবাদের কোনো অতিরিক্ত বিবরণ পাওয়া যায়নি।
                </p>
              )}
        </div>

        {tagsList.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 flex-wrap">
              {tagsList.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
