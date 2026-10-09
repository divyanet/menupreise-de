import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  getAllMenus,
  getMenu,
  getCategory,
  getBrand,
  getImage,
  getPillarSlug,
  getDetailedContent,
  displayPrice,
  shortParas,
  type MenuPage,
} from "@/lib/menus";
import PostCard from "@/components/post-card";
import { getReadingTime } from "@/lib/menus";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllMenus().map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const menu = getMenu(slug);
  if (!menu) return {};
  const url = `${SITE_URL}/${slug}/`;
  const img = getImage(slug);
  return {
    title: menu.title,
    description: menu.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "de_DE",
      siteName: SITE_NAME,
      title: menu.title,
      description: menu.metaDescription,
      url,
      ...(img ? { images: [{ url: img.featured.url, alt: img.featured.alt }] } : {}),
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

function parseEuro(price: string): number | null {
  const m = price.replace(/\s/g, "").match(/(\d+),(\d{2})/);
  if (!m) return null;
  return parseFloat(`${m[1]}.${m[2]}`);
}

function fmtEuro(v: number): string {
  return v.toFixed(2).replace(".", ",") + " €";
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function MenuPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const menu: MenuPage | undefined = getMenu(slug);
  if (!menu) notFound();

  const url = `${SITE_URL}/${slug}/`;
  const category = getCategory(slug);
  const brand = getBrand(slug);
  const img = getImage(slug);
  const pillarSlug = getPillarSlug(category);
  const detailed = getDetailedContent(slug);
  const introParas = shortParas(menu.intro);

  const allItems = menu.categories.flatMap((c) =>
    c.items.map((i) => ({ ...i, category: c.name }))
  );
  const priced = allItems
    .map((i) => ({ ...i, value: parseEuro(i.price) }))
    .filter((i) => i.value !== null) as (typeof allItems[number] & {
    value: number;
  })[];
  const minP = priced.length
    ? priced.reduce((a, b) => (a.value < b.value ? a : b))
    : null;
  const maxP = priced.length
    ? priced.reduce((a, b) => (a.value > b.value ? a : b))
    : null;

  const fallbackOverview =
    `Die Speisekarte von ${brand} umfasst ${menu.categories.length} Kategorien ` +
    `mit insgesamt ${allItems.length} Gerichten und Getränken.` +
    (minP && maxP
      ? ` Die Preise liegen zwischen ${fmtEuro(minP.value)} und ${fmtEuro(maxP.value)}.`
      : "") +
    ` Alle Angaben findest du in den Tabellen unten – übersichtlich nach Kategorien sortiert.`;

  const overviewParas =
    detailed && detailed.overviewParas.length > 0
      ? detailed.overviewParas
      : [fallbackOverview];

  const popular = menu.categories
    .slice(0, 3)
    .map((c) => c.items[0]?.name)
    .filter(Boolean) as string[];
  const fallbackPopular =
    popular.length >= 2
      ? `Zu den beliebtesten Gerichten bei ${brand} gehören ${popular
          .slice(0, 3)
          .join(", ")
          .replace(/, ([^,]*)$/, " und $1")}.`
      : "";
  const popularParas =
    detailed && detailed.popularParas.length > 0
      ? detailed.popularParas
      : fallbackPopular
        ? [fallbackPopular]
        : [];

  const tipsParas = detailed?.tipsParas ?? [];
  const allFaqs = [...menu.faqs, ...(detailed?.extraFaqs ?? [])];

  const related = getAllMenus()
    .filter((m) => m.slug !== slug && getCategory(m.slug) === category)
    .slice(0, 3);

  const midIndex = Math.ceil(menu.categories.length / 2);

  const mins = getReadingTime(slug);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: category,
        item: pillarSlug
          ? `${SITE_URL}/kategorie/${pillarSlug}/`
          : `${SITE_URL}/#kategorien`,
      },
      { "@type": "ListItem", position: 3, name: menu.h1, item: url },
    ],
  };

  const menuJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: menu.h1,
    url,
    numberOfItems: allItems.length,
    itemListElement: menu.categories.flatMap((c, ci) =>
      c.items.map((item, ii) => ({
        "@type": "ListItem",
        position: ci * 100 + ii + 1,
        item: {
          "@type": "MenuItem",
          name: item.name,
          ...(item.desc ? { description: item.desc } : {}),
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: item.price.replace(/[^\d,]/g, "").replace(",", "."),
          },
        },
      }))
    ),
  };

  return (
    <>
      <div className="narrow">
        <nav className="breadcrumb" aria-label="Brotkrumen">
          <a href="/">Startseite</a>
          <span className="sep">/</span>
          {pillarSlug ? (
            <a href={`/kategorie/${pillarSlug}/`}>{category}</a>
          ) : (
            <span>{category}</span>
          )}
          <span className="sep">/</span>
          <span>{menu.h1}</span>
        </nav>
      </div>

      <header className="post-full-header">
        {pillarSlug ? (
          <a className="post-full-tag" href={`/kategorie/${pillarSlug}/`}>
            {category}
          </a>
        ) : (
          <span className="post-full-tag">{category}</span>
        )}
        <h1 className="post-full-title">{menu.h1}</h1>
        <p className="post-full-excerpt">{menu.metaDescription}</p>
        <div className="byline">
          <span className="avatar" aria-hidden="true">
            M
          </span>
          <span style={{ textAlign: "left" }}>
            <strong>MenüPreise Redaktion</strong>
            {formatDate(menu.updated)} · {mins} Min. Lesezeit
          </span>
        </div>
      </header>

      {img && (
        <figure className="post-full-image">
          <img src={img.featured.url} alt={img.featured.alt} />
          <figcaption>{img.featured.alt}</figcaption>
        </figure>
      )}

      <article className="post-full-content">
        {introParas.slice(0, 2).map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        <nav className="toc" aria-label="Inhaltsverzeichnis">
          <strong>Inhaltsverzeichnis</strong>
          <ol>
            <li>
              <a href="#ueberblick">{brand} Preise im Überblick</a>
            </li>
            {menu.categories.map((c) => (
              <li key={c.name}>
                <a href={`#${slugify(c.name)}`}>{c.name}</a>
              </li>
            ))}
            <li>
              <a href="#beliebte-gerichte">Beliebte Gerichte</a>
            </li>
            {tipsParas.length > 0 && (
              <li>
                <a href="#spartipps">Spartipps</a>
              </li>
            )}
            <li>
              <a href="#faq">Häufige Fragen</a>
            </li>
          </ol>
        </nav>

        {introParas.slice(2).map((p, i) => (
          <p key={`r${i}`}>{p}</p>
        ))}

        <h2 id="ueberblick">
          {brand} Speisekarte &amp; Preise 2026 im Überblick
        </h2>
        {overviewParas.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        {menu.categories.map((c, ci) => (
          <div key={c.name}>
            <h3 id={slugify(c.name)}>
              {c.name} bei {brand}
            </h3>
            {detailed?.categoryIntros?.[c.name] ? (
              <p>{detailed.categoryIntros[c.name]}</p>
            ) : (
              <p>
                Die Kategorie „{c.name}“ bei {brand} umfasst {c.items.length}{" "}
                {c.items.length === 1 ? "Position" : "Positionen"}.
              </p>
            )}
            <table className="price-table">
              <thead>
                <tr>
                  <th>Produkt</th>
                  <th style={{ textAlign: "right" }}>Preis</th>
                </tr>
              </thead>
              <tbody>
                {c.items.map((item) => (
                  <tr key={item.name}>
                    <td>
                      {item.name}
                      {item.desc && (
                        <span className="item-desc">{item.desc}</span>
                      )}
                    </td>
                    <td className="price">{displayPrice(item.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {img && ci === midIndex - 1 && (
              <figure className="inline-image">
                <img
                  src={img.supporting.url}
                  alt={img.supporting.alt}
                  loading="lazy"
                />
                <figcaption>{img.supporting.alt}</figcaption>
              </figure>
            )}
          </div>
        ))}

        {popularParas.length > 0 && (
          <>
            <h2 id="beliebte-gerichte">Beliebte Gerichte bei {brand}</h2>
            {popularParas.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </>
        )}

        {tipsParas.length > 0 && (
          <>
            <h2 id="spartipps">{brand} Spartipps: So zahlst du weniger</h2>
            {tipsParas.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </>
        )}

        {allFaqs.length > 0 && (
          <section id="faq">
            <h2>Häufige Fragen</h2>
            <div className="faq-list">
              {allFaqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}
      </article>

      <div className="post-full-footer">
        <div className="post-tags">
          {pillarSlug && (
            <a className="tag-pill" href={`/kategorie/${pillarSlug}/`}>
              {category}
            </a>
          )}
          <a className="tag-pill" href="/#kategorien">
            Alle Kategorien
          </a>
        </div>

        {related.length > 0 && (
          <section className="read-next">
            <h2>Weiterlesen</h2>
            <div className="post-feed">
              {related.map((m) => (
                <PostCard key={m.slug} menu={m} />
              ))}
            </div>
          </section>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
    </>
  );
}
