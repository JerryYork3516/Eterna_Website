import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { parseDocument } from "yaml";

import {
  isLocale,
  isPageId,
  pagePaths,
  type Locale,
  type PageId,
} from "../app/site-routes";

export const contentTypes = [
  "ETERNA_ROOT_EXPRESSION",
  "DIGITAL_RESIDENT",
  "PRODUCT_COLLECTION",
  "PRODUCT",
  "ABOUT_PROJECT",
] as const;

export type ContentType = (typeof contentTypes)[number];

export const pageContentTypes = {
  home: "ETERNA_ROOT_EXPRESSION",
  "digital-residents": "DIGITAL_RESIDENT",
  products: "PRODUCT_COLLECTION",
  "product-aftelle": "PRODUCT",
  "product-studio": "PRODUCT",
  about: "ABOUT_PROJECT",
} as const satisfies Record<PageId, ContentType>;

type PageRoute = (typeof pagePaths)[PageId][Locale];

export type TrustedPageContent = Readonly<{
  schemaVersion: 1;
  pageId: PageId;
  locale: Locale;
  pairedPageId: PageId;
  route: PageRoute;
  contentType: ContentType;
  title: string;
}>;

const pageContentFields = new Set<string>([
  "schemaVersion",
  "pageId",
  "locale",
  "pairedPageId",
  "route",
  "contentType",
  "title",
]);

export function parseYamlContent(source: string): unknown {
  const document = parseDocument(source, {
    customTags: [],
    merge: false,
    resolveKnownTags: false,
    schema: "core",
    version: "1.2",
  });
  const [parseIssue] = [...document.errors, ...document.warnings];

  if (parseIssue) {
    throw new Error(`Invalid YAML content: ${parseIssue.message}`);
  }

  const rawContent: unknown = document.toJS({ maxAliasCount: 0 });

  return rawContent;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isContentType(value: string): value is ContentType {
  return contentTypes.some((contentType) => contentType === value);
}

function invalidContent(pageId: PageId, locale: Locale, reason: string): never {
  throw new Error(`Invalid page content for ${pageId}/${locale}: ${reason}`);
}

export function validatePageContent(
  rawContent: unknown,
  expectedPageId: PageId,
  expectedLocale: Locale,
): TrustedPageContent {
  if (!isRecord(rawContent)) {
    invalidContent(expectedPageId, expectedLocale, "record must be an object");
  }

  const fields = Object.keys(rawContent);

  if (
    fields.length !== pageContentFields.size ||
    fields.some((field) => !pageContentFields.has(field))
  ) {
    invalidContent(
      expectedPageId,
      expectedLocale,
      "fields do not match schema",
    );
  }

  if (rawContent.schemaVersion !== 1) {
    invalidContent(expectedPageId, expectedLocale, "invalid schemaVersion");
  }

  if (typeof rawContent.pageId !== "string" || !isPageId(rawContent.pageId)) {
    invalidContent(expectedPageId, expectedLocale, "invalid pageId");
  }

  if (typeof rawContent.locale !== "string" || !isLocale(rawContent.locale)) {
    invalidContent(expectedPageId, expectedLocale, "invalid locale");
  }

  const { pageId, locale } = rawContent;

  if (pageId !== expectedPageId || locale !== expectedLocale) {
    invalidContent(expectedPageId, expectedLocale, "file identity mismatch");
  }

  if (rawContent.pairedPageId !== pageId) {
    invalidContent(expectedPageId, expectedLocale, "invalid pairedPageId");
  }

  if (rawContent.route !== pagePaths[pageId][locale]) {
    invalidContent(expectedPageId, expectedLocale, "route mismatch");
  }

  if (
    typeof rawContent.contentType !== "string" ||
    !isContentType(rawContent.contentType) ||
    rawContent.contentType !== pageContentTypes[pageId]
  ) {
    invalidContent(expectedPageId, expectedLocale, "invalid contentType");
  }

  if (typeof rawContent.title !== "string" || rawContent.title.trim() === "") {
    invalidContent(expectedPageId, expectedLocale, "invalid title");
  }

  return {
    schemaVersion: 1,
    pageId,
    locale,
    pairedPageId: pageId,
    route: pagePaths[pageId][locale],
    contentType: pageContentTypes[pageId],
    title: rawContent.title,
  };
}

export async function loadRawPageContent(
  pageId: PageId,
  locale: Locale,
): Promise<unknown> {
  const filePath = join(
    process.cwd(),
    "content",
    "pages",
    pageId,
    `${locale}.yaml`,
  );
  const source = await readFile(filePath, "utf8");

  return parseYamlContent(source);
}

export async function loadPageContent(
  pageId: PageId,
  locale: Locale,
): Promise<TrustedPageContent> {
  const rawContent = await loadRawPageContent(pageId, locale);

  return validatePageContent(rawContent, pageId, locale);
}
