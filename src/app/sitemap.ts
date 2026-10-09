import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllMenus, getAllPillars } from "@/lib/menus";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const menus = getAllMenus();
  const pillars = getAllPillars();
  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-10-09"),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...pillars.map((p) => ({
      url: `${SITE_URL}/kategorie/${p.slug}/`,
      lastModified: new Date(p.updated),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...menus.map((m) => ({
      url: `${SITE_URL}/${m.slug}/`,
      lastModified: new Date(m.updated),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
