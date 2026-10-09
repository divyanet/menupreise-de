import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, SITE_TAGLINE } from "@/lib/site";
import {
  getAllMenus,
  getMenusByCategory,
  getPillarSlug,
} from "@/lib/menus";
import PostCard from "@/components/post-card";

export const metadata: Metadata = {
  title: `${SITE_NAME} – Speisekarten & Preise in Deutschland 2026`,
  description: SITE_TAGLINE,
  alternates: { canonical: SITE_URL },
};

export default function Home() {
  const menus = getAllMenus();
  const [featured, ...rest] = menus;
  const latest = rest.slice(0, 8);
  const groups = getMenusByCategory();
  return (
    <>
      <div className="site-hero">
        <h1>
          Menü<em>Preise</em>
        </h1>
        <p>{SITE_TAGLINE} – ausführliche Guides mit Preistabellen, Spartipps und FAQs.</p>
      </div>

      <div className="inner" id="neueste">
        <h2 className="feed-section-title">Empfohlener Guide</h2>
        <div className="post-feed">
          <PostCard menu={featured} featured />
        </div>

        <h2 className="feed-section-title">Neueste Guides</h2>
        <div className="post-feed">
          {latest.map((m) => (
            <PostCard key={m.slug} menu={m} />
          ))}
        </div>

        <h2 className="feed-section-title" id="kategorien">
          Kategorien
        </h2>
        <div className="tag-cloud">
          {groups.map((g) => (
            <a
              key={g.category}
              className="tag-pill"
              href={`/kategorie/${getPillarSlug(g.category)}/`}
            >
              {g.category}
              <small>{g.menus.length}</small>
            </a>
          ))}
        </div>

        {groups.map((g) => (
          <div key={g.category}>
            <h2 className="feed-section-title">{g.category}</h2>
            <div className="post-feed">
              {g.menus.slice(0, 3).map((m) => (
                <PostCard key={m.slug} menu={m} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
