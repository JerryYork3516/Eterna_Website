import { describe, expect, it } from "vitest";

import { siteRoutes } from "../app/site-routes";
import {
  loadPageContent,
  pageContentTypes,
  parseYamlContent,
  validatePageContent,
} from "../content/page-content";

const validSource = {
  sourceId: "eterna-docs-node-6-information-architecture-v0.1",
  repository: "Eterna_Docs",
  document: "Node 6 Information Architecture v0.1",
  revision: "25972b9a1c106710988a98961b77904ef2a1acc9",
  scope: "Website 1.0 page identity, route, and title",
  checkedAt: "2026-08-16",
  publicAuthorization: "APPROVED",
};

const validHomeContent = {
  schemaVersion: 2,
  pageId: "home",
  locale: "zh",
  pairedPageId: "home",
  route: "/zh",
  contentType: "ETERNA_ROOT_EXPRESSION",
  factState: "CURRENT_VERIFIED",
  publicationState: "PUBLISHED",
  sources: [validSource],
  ctaTarget: null,
  assetRefs: [],
  title: "Eterna Website",
};

describe("YAML content schema", () => {
  it("loads all twelve records into the trusted content contract", async () => {
    for (const { locale, pageId, pathname } of siteRoutes) {
      await expect(loadPageContent(pageId, locale)).resolves.toEqual({
        schemaVersion: 2,
        pageId,
        locale,
        pairedPageId: pageId,
        route: pathname,
        contentType: pageContentTypes[pageId],
        factState: "CURRENT_VERIFIED",
        publicationState: "PUBLISHED",
        sources: [validSource],
        ctaTarget: null,
        assetRefs: [],
        title: expect.any(String),
      });
    }
  });

  it("validates a complete positive fixture", () => {
    expect(validatePageContent(validHomeContent, "home", "zh")).toEqual(
      validHomeContent,
    );
  });

  it("accepts an enabled same-locale CTA target", () => {
    const contentWithCta = {
      ...validHomeContent,
      ctaTarget: "/zh/digital-residents",
    };

    expect(validatePageContent(contentWithCta, "home", "zh")).toEqual(
      contentWithCta,
    );
  });

  it("accepts an empty asset reference list without inventing assets", () => {
    expect(
      validatePageContent(validHomeContent, "home", "zh").assetRefs,
    ).toEqual([]);
  });

  it.each([
    {
      name: "missing required field",
      content: {
        schemaVersion: 2,
        pageId: "home",
        locale: "zh",
        pairedPageId: "home",
        route: "/zh",
        contentType: "ETERNA_ROOT_EXPRESSION",
        factState: "CURRENT_VERIFIED",
        publicationState: "PUBLISHED",
        sources: [validSource],
        ctaTarget: null,
        assetRefs: [],
      },
    },
    {
      name: "unknown field",
      content: { ...validHomeContent, component: "ArbitraryComponent" },
    },
    {
      name: "unsupported schema version",
      content: { ...validHomeContent, schemaVersion: 1 },
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
      name: "unknown fact state",
      content: { ...validHomeContent, factState: "UNKNOWN" },
    },
    {
      name: "unknown publication state",
      content: { ...validHomeContent, publicationState: "UNKNOWN" },
    },
    {
      name: "missing required source",
      content: { ...validHomeContent, sources: [] },
    },
    {
      name: "source missing revision",
      content: {
        ...validHomeContent,
        sources: [{ ...validSource, revision: "" }],
      },
    },
    {
      name: "source with invalid checked date",
      content: {
        ...validHomeContent,
        sources: [{ ...validSource, checkedAt: "2026-02-30" }],
      },
    },
    {
      name: "source without public authorization",
      content: {
        ...validHomeContent,
        sources: [{ ...validSource, publicAuthorization: "REVIEW_REQUIRED" }],
      },
    },
    {
      name: "Website content used as its own source",
      content: {
        ...validHomeContent,
        sources: [{ ...validSource, repository: "Eterna_Website" }],
      },
    },
    {
      name: "CTA target outside the route allowlist",
      content: { ...validHomeContent, ctaTarget: "/zh/contact" },
    },
    {
      name: "CTA target in the wrong locale",
      content: { ...validHomeContent, ctaTarget: "/en/about" },
    },
    {
      name: "unregistered asset reference",
      content: { ...validHomeContent, assetRefs: ["unapproved-hero"] },
    },
    {
      name: "invalid asset reference list",
      content: { ...validHomeContent, assetRefs: "unapproved-hero" },
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

  it.each(["DRAFT", "REVIEW_REQUIRED", "WITHDRAWN"])(
    "rejects %s content from the production contract",
    (publicationState) => {
      expect(() =>
        validatePageContent(
          { ...validHomeContent, publicationState },
          "home",
          "zh",
        ),
      ).toThrow("content is not published for production");
    },
  );

  it("rejects custom executable tags and aliases before validation", () => {
    expect(() =>
      parseYamlContent('value: !!js/function "function () {}"'),
    ).toThrow("Invalid YAML content");
    expect(() =>
      parseYamlContent("value: &shared text\ncopy: *shared"),
    ).toThrow();
  });
});
