import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  getAllPillars,
  getPillar,
  getMenusByCategory,
  getCategory,
  getImage,
  type PillarPage,
} from "@/lib/menus";

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
  const heroImg = menus.length ? getImage(menus[0].slug) : undefined;

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
      <div className="hero slim">
        <div className="wrap">
          <nav className="crumbs light" aria-label="Brotkrumen">
            <a href="/">Startseite</a> &rsaquo; <span>{pillar.category}</span>
          </nav>
          <h1 className="page-h1">{pillar.h1}</h1>
          <p className="meta-line light">
            Aktualisiert: {formatDate(pillar.updated)} · {menus.length}{" "}
            Restaurants
          </p>
        </div>
      </div>

      <div className="wrap">
        <article className="article">
          {pillar.introParas.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </article>

        <h2 className="section-title">
          Alle {pillar.category}-Restaurants im Überblick
        </h2>
        <div className="grid">
          {menus.map((m) => {
            const ri = getImage(m.slug);
            return (
              <a className="card" key={m.slug} href={`/${m.slug}/`}>
                {ri && (
                  <span className="card-img">
                    <img src={ri.featured.url} alt={ri.featured.alt} loading="lazy" />
                  </span>
                )}
                <span className="card-body">
                  <span className="cat">{getCategory(m.slug)}</span>
                  <h3>{m.h1}</h3>
                  <p>{m.metaDescription}</p>
                </span>
              </a>
            );
          })}
        </div>

        <article className="article">
          <p>{pillar.outro}</p>
          {heroImg && (
            <figure className="inline-img">
              <img src={heroImg.supporting.url} alt={heroImg.supporting.alt} loading="lazy" />
            </figure>
          )}
        </article>

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
