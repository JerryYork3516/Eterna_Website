import { describe, expect, it } from "vitest";

import { siteRoutes } from "../app/site-routes";
import {
  loadPageContent,
  pageContentTypes,
  parseYamlContent,
  validatePageContent,
} from "../content/page-content";

const validHomeContent = {
  schemaVersion: 1,
  pageId: "home",
  locale: "zh",
  pairedPageId: "home",
  route: "/zh",
  contentType: "ETERNA_ROOT_EXPRESSION",
  title: "Eterna Website",
};

describe("YAML content schema", () => {
  it("loads all twelve records into the trusted content contract", async () => {
    for (const { locale, pageId, pathname } of siteRoutes) {
      await expect(loadPageContent(pageId, locale)).resolves.toEqual({
        schemaVersion: 1,
        pageId,
        locale,
        pairedPageId: pageId,
        route: pathname,
        contentType: pageContentTypes[pageId],
        title: expect.any(String),
      });
    }
  });

  it("validates a complete positive fixture", () => {
    expect(validatePageContent(validHomeContent, "home", "zh")).toEqual(
      validHomeContent,
    );
  });

  it.each([
    {
      name: "missing required field",
      content: {
        schemaVersion: 1,
        pageId: "home",
        locale: "zh",
        pairedPageId: "home",
        route: "/zh",
        contentType: "ETERNA_ROOT_EXPRESSION",
      },
    },
    {
      name: "unknown field",
      content: { ...validHomeContent, component: "ArbitraryComponent" },
    },
    {
      name: "unsupported schema version",
      content: { ...validHomeContent, schemaVersion: 2 },
    },
    {
      name: "unknown pageId",
      content: { ...validHomeContent, pageId: "unknown" },
    },
    {
      name: "unknown locale",
      content: { ...validHomeContent, locale: "fr" },
    },
    {
      name: "pageId file identity mismatch",
      content: { ...validHomeContent, pageId: "about", pairedPageId: "about" },
    },
    {
      name: "locale file identity mismatch",
      content: { ...validHomeContent, locale: "en", route: "/en" },
    },
    {
      name: "paired page identity mismatch",
      content: { ...validHomeContent, pairedPageId: "about" },
    },
    {
      name: "route mismatch",
      content: { ...validHomeContent, route: "/zh/about" },
    },
    {
      name: "unknown content type",
      content: { ...validHomeContent, contentType: "UNKNOWN" },
    },
    {
      name: "page content type mismatch",
      content: { ...validHomeContent, contentType: "PRODUCT" },
    },
    {
      name: "wrong title type",
      content: { ...validHomeContent, title: 1 },
    },
  ])("fails closed for $name", ({ content }) => {
    expect(() => validatePageContent(content, "home", "zh")).toThrow(
      "Invalid page content for home/zh",
    );
  });

  it("rejects custom executable tags and aliases before validation", () => {
    expect(() =>
      parseYamlContent('value: !!js/function "function () {}"'),
    ).toThrow("Invalid YAML content");
    expect(() =>
      parseYamlContent("value: &shared text\ncopy: *shared"),
    ).toThrow();
  });
});
