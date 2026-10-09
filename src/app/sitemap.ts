import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllMenus } from "@/lib/menus";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const menus = getAllMenus();
  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-10-09"),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...menus.map((m) => ({
      url: `${SITE_URL}/${m.slug}/`,
      lastModified: new Date(m.updated),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
