import MarqueeClient from "./marquee-client";

interface NewsItem {
  _id?: string;
  id?: string;
  title: string;
}

async function getLatestNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch(
      "https://news-api-v2.vercel.app/api/news?limit=10",
      {
        next: {
          revalidate: 60,
        },
      },
    );

    if (!res.ok) {
      console.error(
        "Latest news API error:",
        res.status,
      );

      return [];
    }

    const data = await res.json();

    if (Array.isArray(data?.data)) {
      return data.data;
    }

    if (Array.isArray(data)) {
      return data;
    }

    return [];
  } catch (error) {
    console.error(
      "Error fetching latest news:",
      error,
    );

    return [];
  }
}

export default async function Marquee() {
  const latest = await getLatestNews();

  return <MarqueeClient latest={latest} />;
}