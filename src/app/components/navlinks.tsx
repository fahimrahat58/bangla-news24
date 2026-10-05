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
      return null;
    }

    const data = await res.json();

    const navs: Navs[] = Array.isArray(data?.data) ? data.data : [];

    filteredNavs = navs.filter((n) => n.scrapable);
  } catch (error) {
    console.error("Failed to fetch navigation categories:", error);
    return null;
  }

  return (
    <nav className="w-full bg-white border-b border-gray-100">
      <div
        className="
          max-w-xl mx-auto
          flex items-center justify-between
          gap-3 sm:gap-4 md:gap-5 lg:gap-6
          text-xs sm:text-sm
          text-gray-700
          font-medium
          overflow-x-auto
          py-2.5 sm:py-3
          px-3 sm:px-4
          no-scrollbar
        "
      >
        <Link
          href="/"
          className="
            shrink-0
            hover:text-[#b91c1c]
            transition-colors
          "
        >
          হোম
        </Link>

        {filteredNavs.map((n) => (
          <Link
            key={n.slug}
            href={`/navcategory/${n.slug}`}
            className="
              shrink-0
              hover:text-[#b91c1c]
              transition-colors
            "
          >
            {n.title}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;
