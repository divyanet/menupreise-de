import type { Metadata } from "next";
import "./globals.css";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import { getAllMenus, getCategory } from "@/lib/menus";

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
  const featured = menus.slice(0, 8);
  return (
    <html lang="de">
      <body>
        <header className="site-header">
          <div className="wrap">
            <a className="brand" href="/">
              Menü<span>Preise</span>
            </a>
            <nav className="site-nav">
              <a href="/">Startseite</a>
              <a href="/#restaurants">Restaurants</a>
              <a href="/#kategorien">Kategorien</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="wrap">
            <div className="footer-grid">
              <div>
                <h4>{SITE_NAME}</h4>
                <p>{SITE_TAGLINE}.</p>
              </div>
              <div>
                <h4>Beliebt</h4>
                <ul>
                  {featured.map((m) => (
                    <li key={m.slug}>
                      <a href={`/${m.slug}/`}>{m.h1}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Kategorien</h4>
                <ul>
                  {Array.from(new Set(menus.map((m) => getCategory(m.slug)))).map(
                    (c) => (
                      <li key={c}>
                        <a href={`/#kategorien`}>{c}</a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            <p className="disclaimer">
              Hinweis: Alle Preise sind unverbindliche Angaben in Euro, Stand
              Oktober 2026. Preise mit „ca.“ sind Schätzungen auf Basis
              typischer Preise in Deutschland. Die tatsächlichen Preise können
              je nach Standort abweichen. Alle Angaben ohne Gewähr.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
