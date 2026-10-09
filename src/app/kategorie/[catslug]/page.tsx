import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  getAllPillars,
  getPillar,
  getMenusByCategory,
  type PillarPage,
} from "@/lib/menus";
import PostCard from "@/components/post-card";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPillars().map((p) => ({ catslug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ catslug: string }>;
}): Promise<Metadata> {
  const { catslug } = await params;
  const pillar = getPillar(catslug);
  if (!pillar) return {};
  const url = `${SITE_URL}/kategorie/${catslug}/`;
  return {
    title: pillar.title,
    description: pillar.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "de_DE",
      siteName: SITE_NAME,
      title: pillar.title,
      description: pillar.metaDescription,
      url,
    },
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function PillarRoute({
  params,
}: {
  params: Promise<{ catslug: string }>;
}) {
  const { catslug } = await params;
  const pillar: PillarPage | undefined = getPillar(catslug);
  if (!pillar) notFound();

  const url = `${SITE_URL}/kategorie/${catslug}/`;
  const group = getMenusByCategory().find(
    (g) => g.category === pillar.category
  );
  const menus = group?.menus ?? [];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: pillar.category, item: url },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: pillar.h1,
    url,
    numberOfItems: menus.length,
    itemListElement: menus.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/${m.slug}/`,
      name: m.h1,
    })),
  };

  return (
    <>
      <div className="narrow">
        <nav className="breadcrumb" aria-label="Brotkrumen">
          <a href="/">Startseite</a>
          <span className="sep">/</span>
          <span>{pillar.category}</span>
        </nav>
      </div>

      <header className="tag-header">
        <span className="tag-count">
          Kategorie · {menus.length} Guides · {formatDate(pillar.updated)}
        </span>
        <h1>
          {pillar.category}
        </h1>
        <p>{pillar.metaDescription}</p>
      </header>

      <div className="inner">
        <div className="post-full-content" style={{ paddingTop: 32 }}>
          {pillar.introParas.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <h2 className="feed-section-title">
          Alle {pillar.category}-Guides
        </h2>
        <div className="post-feed">
          {menus.map((m) => (
            <PostCard key={m.slug} menu={m} />
          ))}
        </div>

        <div className="post-full-content" style={{ paddingTop: 8 }}>
          <p>{pillar.outro}</p>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      </div>
    </>
  );
}
