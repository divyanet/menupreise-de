import { getCategory, getPillarSlug, getImage, type MenuPage } from "@/lib/menus";

export function readingTime(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function pageText(m: MenuPage): string {
  return [m.intro, m.h1, m.metaDescription].join(" ");
}

export default function PostCard({
  menu,
  featured = false,
}: {
  menu: MenuPage;
  featured?: boolean;
}) {
  const img = getImage(menu.slug);
  const category = getCategory(menu.slug);
  const pillarSlug = getPillarSlug(category);
  const mins = readingTime(pageText(menu));
  return (
    <article className={`post-card${featured ? " featured" : ""}`}>
      <a
        className="post-card-image"
        href={`/${menu.slug}/`}
        aria-label={menu.h1}
      >
        {img && (
          <img src={img.featured.url} alt={img.featured.alt} loading="lazy" />
        )}
      </a>
      <div className="post-card-content">
        {pillarSlug ? (
          <a className="post-card-tag" href={`/kategorie/${pillarSlug}/`}>
            {category}
          </a>
        ) : (
          <span className="post-card-tag">{category}</span>
        )}
        <a href={`/${menu.slug}/`}>
          <h2 className="post-card-title">{menu.h1}</h2>
        </a>
        <p className="post-card-excerpt">{menu.metaDescription}</p>
        <div className="post-card-meta">
          <span className="avatar" aria-hidden="true">
            M
          </span>
          <span>
            <strong style={{ color: "var(--color-text)" }}>
              MenüPreise Redaktion
            </strong>
            <br />
            {menu.updated} · {mins} Min. Lesezeit
          </span>
        </div>
      </div>
    </article>
  );
}
