import Link from "next/link";

interface Navs {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

const NavLinks = async () => {
  let filteredNavs: Navs[] = [];

  try {
    const res = await fetch("https://news-api-v2.vercel.app/api/categories", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return null; // API রেসপন্স সফল না হলে কিছুই রেন্ডার করবে না
    }

    const data = await res.json();
    
    // ডাটা অ্যারে নিশ্চিত করার জন্য fallback দেওয়া হলো
    const navs: Navs[] = data?.data || [];
    filteredNavs = navs.filter((n) => n.scrapable);
  } catch (error) {
    console.error("Failed to fetch navigation categories:", error);
    return null;
  }

  return (
    <nav className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 text-sm text-gray-700 font-medium overflow-x-auto py-2 px-4 no-scrollbar">
        <Link
          href="/"
          className="hover:text-[#b91c1c] transition-colors whitespace-nowrap"
        >
          হোম
        </Link>

        {filteredNavs.map((n) => (
          <Link
            key={n.slug}
            href={`/navcategory/${n.slug}`}
            className="hover:text-[#b91c1c] transition-colors whitespace-nowrap"
          >
            {n.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;