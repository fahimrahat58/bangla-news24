import Link from "next/link";

interface Navs {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

const NavLinks = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/categories", {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  const navs: Navs[] = data.data;
  const filteredNavs = navs.filter((n) => n.scrapable);

  return (
    <nav className="w-full bg-white">
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
            href={`/category/${n.slug}`}
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