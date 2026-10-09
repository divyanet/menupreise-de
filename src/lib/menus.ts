import menusData from "@/data/menus.json";
import images1 from "@/data/images-1.json";
import images2 from "@/data/images-2.json";
import images3 from "@/data/images-3.json";
import pillarsData from "@/data/pillars.json";
import content1 from "@/data/content-1.json";
import content2 from "@/data/content-2.json";
import content3 from "@/data/content-3.json";
import content4 from "@/data/content-4.json";
import content5 from "@/data/content-5.json";

export interface MenuItem {
  name: string;
  price: string;
  approx: boolean;
  desc?: string;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export interface Faq {
  q: string;
  a: string;
}

export interface MenuPage {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  categories: MenuCategory[];
  faqs: Faq[];
  updated: string;
}

export interface PageImage {
  url: string;
  alt: string;
}

export interface ImageEntry {
  slug: string;
  featured: PageImage;
  supporting: PageImage;
}

export interface PillarPage {
  slug: string;
  category: string;
  title: string;
  metaDescription: string;
  h1: string;
  introParas: string[];
  outro: string;
  updated: string;
}

export interface DetailedContent {
  slug: string;
  overviewParas: string[];
  categoryIntros: Record<string, string>;
  popularParas: string[];
  tipsParas: string[];
  extraFaqs: Faq[];
}

export const CATEGORIES: Record<string, string> = {
  "mc-donalds-preise": "Burger & Fast Food",
  "mc-donalds-fruhstuck": "Burger & Fast Food",
  "mcdonalds-getranke-menu": "Burger & Fast Food",
  "mc-donalds-happy-meal": "Burger & Fast Food",
  "burger-king-preise": "Burger & Fast Food",
  "burger-king-fruhstuck": "Burger & Fast Food",
  "burger-king-cheeseburger-preis": "Burger & Fast Food",
  "burger-king-spielzeug": "Burger & Fast Food",
  "kfc-speisekarte-preise": "Burger & Fast Food",
  "kfc-gutscheine": "Burger & Fast Food",
  "subway-preise": "Burger & Fast Food",
  "five-guys-preise": "Burger & Fast Food",
  "peter-pane-speisekarte": "Burger & Fast Food",
  "hans-im-gluck-speisekarte": "Burger & Fast Food",
  "timberjacks-speisekarte": "Burger & Fast Food",
  "dunkin-donuts-preise": "Burger & Fast Food",
  "fast-food-preise": "Burger & Fast Food",
  "haus-des-doners-speisekarte": "Burger & Fast Food",
  "ditsch-speisekarte": "Burger & Fast Food",
  "pizza-hut-speisekarte": "Pizza & Italienisch",
  "dominos-pizza-speisekarte": "Pizza & Italienisch",
  "call-a-pizza-speisekarte": "Pizza & Italienisch",
  "l-osteria-speisekarte": "Pizza & Italienisch",
  "vapiano-speisekarte-preise": "Pizza & Italienisch",
  "edmondo-speisekarte": "Pizza & Italienisch",
  "starbucks-preise": "Kaffee, Donuts & Snacks",
  "coffee-fellows-speisekarte": "Kaffee, Donuts & Snacks",
  "backwerk-speisekarte": "Kaffee, Donuts & Snacks",
  "yormas-speisekarte": "Kaffee, Donuts & Snacks",
  "nordsee-speisekarte-preise": "Fisch & Meeresfrüchte",
  "gosch-speisekarte": "Fisch & Meeresfrüchte",
  "block-house-speisekarte": "Deutsche Küche",
  "deutsches-haus-speisekarte": "Deutsche Küche",
  "landgasthof-adler-speisekarte": "Deutsche Küche",
  "gasthof-zur-post-speisekarte": "Deutsche Küche",
  "brauhaus-speisekarte": "Deutsche Küche",
  "borchardt-speisekarte": "Deutsche Küche",
  "hofmanns-menu": "Deutsche Küche",
  "db-speisekarte": "Deutsche Küche",
  "buddha-lounge-flensburg-speisekarte": "Asiatisch & International",
  "sausalitos-speisekarte": "Asiatisch & International",
  "dean-david-speisekarte": "Asiatisch & International",
  "poseidon-speisekarte": "Asiatisch & International",
  "akropolis-speisekarte": "Asiatisch & International",
  "hello-fresh-preise": "Gesund & Lieferdienste",
  "frittenwerk-speisekarte": "Gesund & Lieferdienste",
  "cafe-del-sol-speisekarte": "Gesund & Lieferdienste",
  "cafe-buur-speisekarte": "Gesund & Lieferdienste",
  "alex-speisekarte": "Gesund & Lieferdienste",
};

export const CATEGORY_ORDER = [
  "Burger & Fast Food",
  "Pizza & Italienisch",
  "Kaffee, Donuts & Snacks",
  "Fisch & Meeresfrüchte",
  "Deutsche Küche",
  "Asiatisch & International",
  "Gesund & Lieferdienste",
];

export const PILLAR_SLUGS: Record<string, string> = {
  "Burger & Fast Food": "burger-fast-food",
  "Pizza & Italienisch": "pizza-italienisch",
  "Kaffee, Donuts & Snacks": "kaffee-donuts-snacks",
  "Fisch & Meeresfrüchte": "fisch-meeresfruechte",
  "Deutsche Küche": "deutsche-kueche",
  "Asiatisch & International": "asiatisch-international",
  "Gesund & Lieferdienste": "gesund-lieferdienste",
};

export const BRANDS: Record<string, string> = {
  "mc-donalds-preise": "McDonald's",
  "mc-donalds-fruhstuck": "McDonald's",
  "mcdonalds-getranke-menu": "McDonald's",
  "mc-donalds-happy-meal": "McDonald's",
  "burger-king-preise": "Burger King",
  "burger-king-fruhstuck": "Burger King",
  "burger-king-cheeseburger-preis": "Burger King",
  "burger-king-spielzeug": "Burger King",
  "kfc-speisekarte-preise": "KFC",
  "kfc-gutscheine": "KFC",
  "subway-preise": "Subway",
  "dunkin-donuts-preise": "Dunkin'",
  "fast-food-preise": "die großen Fast-Food-Ketten",
  "starbucks-preise": "Starbucks",
  "pizza-hut-speisekarte": "Pizza Hut",
  "nordsee-speisekarte-preise": "Nordsee",
  "vapiano-speisekarte-preise": "Vapiano",
  "peter-pane-speisekarte": "Peter Pane",
  "hans-im-gluck-speisekarte": "Hans im Glück",
  "block-house-speisekarte": "Block House",
  "l-osteria-speisekarte": "L'Osteria",
  "dean-david-speisekarte": "dean&david",
  "five-guys-preise": "Five Guys",
  "dominos-pizza-speisekarte": "Domino's",
  "sausalitos-speisekarte": "Sausalitos",
  "frittenwerk-speisekarte": "Frittenwerk",
  "timberjacks-speisekarte": "Timberjacks",
  "haus-des-doners-speisekarte": "Haus des Döners",
  "cafe-del-sol-speisekarte": "Café del Sol",
  "gosch-speisekarte": "Gosch",
  "alex-speisekarte": "ALEX",
  "cafe-buur-speisekarte": "Café Buur",
  "brauhaus-speisekarte": "Brauhaus",
  "hofmanns-menu": "Hofmanns",
  "edmondo-speisekarte": "Edmondo",
  "db-speisekarte": "Deutsche Bahn",
  "hello-fresh-preise": "HelloFresh",
  "poseidon-speisekarte": "Poseidon",
  "deutsches-haus-speisekarte": "Deutsches Haus",
  "buddha-lounge-flensburg-speisekarte": "Buddha Lounge",
  "landgasthof-adler-speisekarte": "Landgasthof Adler",
  "gasthof-zur-post-speisekarte": "Gasthof Zur Post",
  "akropolis-speisekarte": "Akropolis",
  "borchardt-speisekarte": "Borchardt",
  "ditsch-speisekarte": "Ditsch",
  "yormas-speisekarte": "Yorma's",
  "backwerk-speisekarte": "BackWerk",
  "coffee-fellows-speisekarte": "Coffee Fellows",
  "call-a-pizza-speisekarte": "Call a Pizza",
};

const menus = menusData as MenuPage[];
const imageEntries = [
  ...(images1 as ImageEntry[]),
  ...(images2 as ImageEntry[]),
  ...(images3 as ImageEntry[]),
];
const pillars = pillarsData as PillarPage[];

interface RawDetailedContent {
  slug?: string;
  overviewParas?: string[];
  categoryIntros?: Record<string, string | undefined>;
  popularParas?: string[];
  tipsParas?: string[];
  extraFaqs?: Faq[];
}

function normalizeContent(raw: RawDetailedContent[]): DetailedContent[] {
  return raw
    .filter((r) => typeof r.slug === "string")
    .map((r) => ({
      slug: r.slug as string,
      overviewParas: r.overviewParas ?? [],
      categoryIntros: Object.fromEntries(
        Object.entries(r.categoryIntros ?? {}).filter(
          ([, v]) => typeof v === "string"
        )
      ) as Record<string, string>,
      popularParas: r.popularParas ?? [],
      tipsParas: r.tipsParas ?? [],
      extraFaqs: r.extraFaqs ?? [],
    }));
}

const detailedContents = normalizeContent([
  ...(content1 as RawDetailedContent[]),
  ...(content2 as RawDetailedContent[]),
  ...(content3 as RawDetailedContent[]),
  ...(content4 as RawDetailedContent[]),
  ...(content5 as RawDetailedContent[]),
]);

export function getDetailedContent(slug: string): DetailedContent | undefined {
  return detailedContents.find((d) => d.slug === slug);
}

export function getAllMenus(): MenuPage[] {
  return menus;
}

export function getMenu(slug: string): MenuPage | undefined {
  return menus.find((m) => m.slug === slug);
}

export function getCategory(slug: string): string {
  return CATEGORIES[slug] ?? "Sonstiges";
}

export function getBrand(slug: string): string {
  return BRANDS[slug] ?? slug;
}

export function getPillarSlug(category: string): string {
  return PILLAR_SLUGS[category] ?? "";
}

export function getImage(slug: string): ImageEntry | undefined {
  return imageEntries.find((i) => i.slug === slug);
}

export function getAllPillars(): PillarPage[] {
  return pillars;
}

export function getPillar(slug: string): PillarPage | undefined {
  return pillars.find((p) => p.slug === slug);
}

/** Display price like the reference site: no "ca." prefix. */
export function displayPrice(price: string): string {
  return price.replace(/^ca\.\s*/, "").trim();
}

export function getMenusByCategory(): { category: string; menus: MenuPage[] }[] {
  return CATEGORY_ORDER.map((category) => ({
    category,
    menus: menus.filter((m) => getCategory(m.slug) === category),
  })).filter((g) => g.menus.length > 0);
}

/** Split a long intro into short 2-3 sentence paragraphs. */
export function shortParas(text: string): string[] {
  const sentences = text
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const paras: string[] = [];
  for (let i = 0; i < sentences.length; i += 3) {
    paras.push(sentences.slice(i, i + 3).join(" "));
  }
  return paras.slice(0, 4);
}
