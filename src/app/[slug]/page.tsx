import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  getAllMenus,
  getMenu,
  getCategory,
  type MenuPage,
} from "@/lib/menus";

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
  const hasApprox = menu.categories.some((c) =>
    c.items.some((i) => i.approx)
  );
  const related = getAllMenus()
    .filter((m) => m.slug !== slug && getCategory(m.slug) === category)
    .slice(0, 6);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: menu.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category,
        item: `${SITE_URL}/#kategorien`,
      },
      { "@type": "ListItem", position: 3, name: menu.h1, item: url },
    ],
  };

  const menuJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: menu.h1,
    url,
    numberOfItems: menu.categories.reduce(
      (n, c) => n + c.items.length,
      0
    ),
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
    <div className="wrap">
      <nav className="crumbs" aria-label="Brotkrumen">
        <a href="/">Startseite</a> &rsaquo; <span>{category}</span> &rsaquo;{" "}
        <span>{menu.h1}</span>
      </nav>

      <h1 className="page-h1">{menu.h1}</h1>
      <p className="meta-line">
        Aktualisiert: {formatDate(menu.updated)} · {category}
      </p>

      <div className="intro">
        {menu.intro.split("\n\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {hasApprox && (
        <p className="approx-note">
          Hinweis: Preise mit „ca.“ sind Schätzungen auf Basis typischer
          Preise in Deutschland, da keine offizielle Preisliste verfügbar ist.
        </p>
      )}

      {menu.categories.map((c) => (
        <table className="price-table" key={c.name}>
          <caption>{c.name}</caption>
          <thead>
            <tr>
              <th>Gericht</th>
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
                <td className="price">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}

      {menu.faqs.length > 0 && (
        <section className="faq">
          <h2 className="section-title">Häufige Fragen</h2>
          {menu.faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </section>
      )}

      {related.length > 0 && (
        <section className="related">
          <h2 className="section-title">Ähnliche Restaurants</h2>
          <div className="grid">
            {related.map((m) => (
              <a className="card" key={m.slug} href={`/${m.slug}/`}>
                <span className="cat">{getCategory(m.slug)}</span>
                <h3>{m.h1}</h3>
                <p>{m.metaDescription}</p>
              </a>
            ))}
          </div>
        </section>
      )}

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
    </div>
  );
}
