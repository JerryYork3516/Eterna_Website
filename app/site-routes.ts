export const locales = ["zh", "en"] as const;

export type Locale = (typeof locales)[number];

export const pageIds = [
  "home",
  "digital-residents",
  "products",
  "product-aftelle",
  "product-studio",
  "about",
] as const;

export type PageId = (typeof pageIds)[number];

export const pagePaths = {
  home: { zh: "/zh", en: "/en" },
  "digital-residents": {
    zh: "/zh/digital-residents",
    en: "/en/digital-residents",
  },
  products: { zh: "/zh/products", en: "/en/products" },
  "product-aftelle": {
    zh: "/zh/products/aftelle",
    en: "/en/products/aftelle",
  },
  "product-studio": {
    zh: "/zh/products/studio",
    en: "/en/products/studio",
  },
  about: { zh: "/zh/about", en: "/en/about" },
} as const satisfies Record<PageId, Record<Locale, string>>;

export const siteRoutes = pageIds.flatMap((pageId) =>
  locales.map((locale) => ({
    pageId,
    locale,
    pathname: pagePaths[pageId][locale],
  })),
);

export function isLocale(value: string): value is Locale {
  return value === "zh" || value === "en";
}
