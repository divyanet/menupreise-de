import type { Metadata } from "next";
import "./globals.css";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import {
  getAllMenus,
  getCategory,
  getPillarSlug,
  CATEGORY_ORDER,
} from "@/lib/menus";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} – Speisekarten & Preise in Deutschland 2026`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_TAGLINE,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: SITE_NAME,
    title: `${SITE_NAME} – Speisekarten & Preise in Deutschland 2026`,
    description: SITE_TAGLINE,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menus = getAllMenus();
  const popular = menus.slice(0, 6);
  const cats = CATEGORY_ORDER.filter((c) =>
    menus.some((m) => getCategory(m.slug) === c)
  );
  return (
    <html lang="de">
      <body>
        <header className="site-head">
          <div className="inner">
            <a className="brand" href="/">
              Menü<em>Preise</em>
            </a>
            <nav className="site-nav" aria-label="Hauptnavigation">
              <a href="/">Start</a>
              <a href="/#kategorien">Kategorien</a>
              <a href="/#neueste">Neueste</a>
              <a className="nav-cta" href="/#kategorien">
                Alle Restaurants
              </a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-foot">
          <div className="inner">
            <div className="foot-grid">
              <div>
                <a className="foot-brand" href="/">
                  Menü<em>Preise</em>
                </a>
                <p>{SITE_TAGLINE}.</p>
              </div>
              <div>
                <h4>Beliebte Guides</h4>
                <ul>
                  {popular.map((m) => (
                    <li key={m.slug}>
                      <a href={`/${m.slug}/`}>{m.h1}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Kategorien</h4>
                <ul>
                  {cats.map((c) => (
                    <li key={c}>
                      <a href={`/kategorie/${getPillarSlug(c)}/`}>{c}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="disclaimer">
              Hinweis: Alle Preise sind unverbindliche Richtwerte in Euro,
              Stand Oktober 2026. Die tatsächlichen Preise können je nach
              Standort und Filiale abweichen. Alle Angaben ohne Gewähr. ©
              2026 {SITE_NAME}.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
