import { describe, expect, it } from "vitest";

import {
  getLanguageSwitchPathname,
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

const expectedLanguagePairs = [
  ["/zh", "/en"],
  ["/zh/digital-residents", "/en/digital-residents"],
  ["/zh/products", "/en/products"],
  ["/zh/products/aftelle", "/en/products/aftelle"],
  ["/zh/products/studio", "/en/products/studio"],
  ["/zh/about", "/en/about"],
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

  it("pairs every pageId with its unique route in the other locale", () => {
    const languageSwitchTargets = expectedLanguagePairs.flatMap(
      ([zhPathname, enPathname]) => {
        expect(getLanguageSwitchPathname(zhPathname)).toBe(enPathname);
        expect(getLanguageSwitchPathname(enPathname)).toBe(zhPathname);

        return [
          getLanguageSwitchPathname(zhPathname),
          getLanguageSwitchPathname(enPathname),
        ];
      },
    );

    expect(languageSwitchTargets).toHaveLength(12);
    expect(new Set(languageSwitchTargets).size).toBe(12);
  });

  it("does not infer a language switch target for a non-canonical route", () => {
    expect(getLanguageSwitchPathname("/fr/products/aftelle")).toBeUndefined();
    expect(getLanguageSwitchPathname("/zh/products/unknown")).toBeUndefined();
    expect(getLanguageSwitchPathname("/")).toBeUndefined();
  });
});
