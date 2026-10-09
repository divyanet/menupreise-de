import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { getMenusByCategory, getCategory, getAllMenus } from "@/lib/menus";

export const metadata: Metadata = {
  title: `${SITE_NAME} – Speisekarten & Preise in Deutschland 2026`,
  description:
    "Aktuelle Speisekarten und Preise von McDonald's, Burger King, KFC, Subway, Starbucks, Nordsee, Vapiano und vielen mehr – alle Restaurants in Deutschland im Überblick.",
  alternates: { canonical: SITE_URL },
};

export default function Home() {
  const groups = getMenusByCategory();
  const total = getAllMenus().length;
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>Speisekarten &amp; Preise in Deutschland 2026</h1>
          <p>
            Finde aktuelle Menüs und Preise von {total} beliebten Restaurants –
            von McDonald&apos;s und Burger King bis zu Nordsee, Vapiano und
            Hans im Glück. Alle Angaben auf Deutsch, übersichtlich und aktuell.
          </p>
          <span className="updated">Stand: Oktober 2026</span>
        </div>
      </section>

      <div className="wrap" id="restaurants">
        <div id="kategorien">
          {groups.map((g) => (
            <section key={g.category}>
              <h2 className="section-title">{g.category}</h2>
              <p className="section-sub">
                {g.menus.length}{" "}
                {g.menus.length === 1 ? "Restaurant" : "Restaurants"} mit
                aktueller Speisekarte und Preisliste.
              </p>
              <div className="grid">
                {g.menus.map((m) => (
                  <a className="card" key={m.slug} href={`/${m.slug}/`}>
                    <span className="cat">{getCategory(m.slug)}</span>
                    <h3>{m.h1}</h3>
                    <p>{m.metaDescription}</p>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section>
          <h2 className="section-title">Warum {SITE_NAME}?</h2>
          <p>
            Restaurantpreise ändern sich ständig – und sie unterscheiden sich
            von Stadt zu Stadt. Wir sammeln die aktuellen Speisekarten und
            Preislisten der bekanntesten Ketten und Restaurants in Deutschland
            an einem Ort. Jede Seite enthält eine übersichtliche Preistabelle,
            häufige Fragen und wird regelmäßig aktualisiert. Preise, die wir
            nicht offiziell bestätigen konnten, kennzeichnen wir ehrlich mit
            „ca.“.
          </p>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
            inLanguage: "de",
            description:
              "Aktuelle Speisekarten und Preise der beliebtesten Restaurants in Deutschland.",
          }),
        }}
      />
    </>
  );
}
