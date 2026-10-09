import menusData from "@/data/menus.json";

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

const menus = menusData as MenuPage[];

export function getAllMenus(): MenuPage[] {
  return menus;
}

export function getMenu(slug: string): MenuPage | undefined {
  return menus.find((m) => m.slug === slug);
}

export function getCategory(slug: string): string {
  return CATEGORIES[slug] ?? "Sonstiges";
}

export function getMenusByCategory(): { category: string; menus: MenuPage[] }[] {
  return CATEGORY_ORDER.map((category) => ({
    category,
    menus: menus.filter((m) => getCategory(m.slug) === category),
  })).filter((g) => g.menus.length > 0);
}
