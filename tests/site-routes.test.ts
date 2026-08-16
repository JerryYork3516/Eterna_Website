import { describe, expect, it } from "vitest";

import {
  isLocale,
  locales,
  pageIds,
  pagePaths,
  siteRoutes,
} from "../app/site-routes";

const expectedRoutes = [
  { pageId: "home", locale: "zh", pathname: "/zh" },
  { pageId: "home", locale: "en", pathname: "/en" },
  {
    pageId: "digital-residents",
    locale: "zh",
    pathname: "/zh/digital-residents",
  },
  {
    pageId: "digital-residents",
    locale: "en",
    pathname: "/en/digital-residents",
  },
  { pageId: "products", locale: "zh", pathname: "/zh/products" },
  { pageId: "products", locale: "en", pathname: "/en/products" },
  {
    pageId: "product-aftelle",
    locale: "zh",
    pathname: "/zh/products/aftelle",
  },
  {
    pageId: "product-aftelle",
    locale: "en",
    pathname: "/en/products/aftelle",
  },
  {
    pageId: "product-studio",
    locale: "zh",
    pathname: "/zh/products/studio",
  },
  {
    pageId: "product-studio",
    locale: "en",
    pathname: "/en/products/studio",
  },
  { pageId: "about", locale: "zh", pathname: "/zh/about" },
  { pageId: "about", locale: "en", pathname: "/en/about" },
] as const;

describe("site route and page identity contract", () => {
  it("defines exactly six stable and unique pageIds", () => {
    expect(pageIds).toEqual([
      "home",
      "digital-residents",
      "products",
      "product-aftelle",
      "product-studio",
      "about",
    ]);
    expect(new Set(pageIds).size).toBe(6);
  });

  it("maps each pageId to one zh and one en route", () => {
    expect(locales).toEqual(["zh", "en"]);
    expect(siteRoutes).toEqual(expectedRoutes);
    expect(siteRoutes).toHaveLength(12);
    expect(new Set(siteRoutes.map(({ pathname }) => pathname)).size).toBe(12);

    for (const { locale, pageId, pathname } of siteRoutes) {
      expect(pagePaths[pageId][locale]).toBe(pathname);
    }
  });

  it("allows only zh and en locales", () => {
    expect(isLocale("zh")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("zh-Hans")).toBe(false);
  });
});
