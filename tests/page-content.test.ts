import { describe, expect, it } from "vitest";

import { siteRoutes } from "../app/site-routes";
import {
  loadPageContent,
  parseYamlContent,
  toPageContentFoundation,
} from "../content/page-content";

describe("YAML content foundation", () => {
  it("loads one base record for every pageId and locale route", async () => {
    for (const { locale, pageId } of siteRoutes) {
      const content = await loadPageContent(pageId, locale);

      expect(content).toMatchObject({ locale, pageId });
      expect(content.title.trim()).not.toBe("");
    }
  });

  it("rejects custom executable tags and aliases", () => {
    expect(() =>
      parseYamlContent('value: !!js/function "function () {}"'),
    ).toThrow("Invalid YAML content");
    expect(() =>
      parseYamlContent("value: &shared text\ncopy: *shared"),
    ).toThrow();
  });

  it("keeps component and layout directives outside the page contract", () => {
    const rawContent = parseYamlContent(`
pageId: home
locale: zh
title: Eterna Website
component: ArbitraryComponent
layout: arbitrary-layout
`);

    expect(toPageContentFoundation(rawContent, "home", "zh")).toEqual({
      pageId: "home",
      locale: "zh",
      title: "Eterna Website",
    });
  });

  it("rejects content whose identity does not match the requested route", () => {
    expect(() =>
      toPageContentFoundation(
        { pageId: "about", locale: "zh", title: "About" },
        "home",
        "zh",
      ),
    ).toThrow("Invalid content foundation for home/zh");
  });
});
