import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { parseDocument } from "yaml";

import {
  isLocale,
  isPageId,
  pagePaths,
  siteRoutes,
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

export const factStates = [
  "CURRENT_VERIFIED",
  "IN_DEVELOPMENT",
  "LONG_TERM",
  "RESEARCH",
] as const;

export type FactState = (typeof factStates)[number];

export const publicationStates = [
  "DRAFT",
  "REVIEW_REQUIRED",
  "PUBLISHED",
  "WITHDRAWN",
] as const;

export type PublicationState = (typeof publicationStates)[number];

export const pageContentTypes = {
  home: "ETERNA_ROOT_EXPRESSION",
  "digital-residents": "DIGITAL_RESIDENT",
  products: "PRODUCT_COLLECTION",
  "product-aftelle": "PRODUCT",
  "product-studio": "PRODUCT",
  about: "ABOUT_PROJECT",
} as const satisfies Record<PageId, ContentType>;

type PageRoute = (typeof pagePaths)[PageId][Locale];

export type ContentSource = Readonly<{
  sourceId: string;
  repository: string;
  document: string;
  revision: string;
  scope: string;
  checkedAt: string;
  publicAuthorization: "APPROVED";
}>;

export type TrustedPageContent = Readonly<{
  schemaVersion: 2;
  pageId: PageId;
  locale: Locale;
  pairedPageId: PageId;
  route: PageRoute;
  contentType: ContentType;
  factState: FactState;
  publicationState: "PUBLISHED";
  sources: readonly ContentSource[];
  ctaTarget: PageRoute | null;
  assetRefs: readonly string[];
  title: string;
}>;

const pageContentFields = new Set<string>([
  "schemaVersion",
  "pageId",
  "locale",
  "pairedPageId",
  "route",
  "contentType",
  "factState",
  "publicationState",
  "sources",
  "ctaTarget",
  "assetRefs",
  "title",
]);

const contentSourceFields = new Set<string>([
  "sourceId",
  "repository",
  "document",
  "revision",
  "scope",
  "checkedAt",
  "publicAuthorization",
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

function isFactState(value: string): value is FactState {
  return factStates.some((factState) => factState === value);
}

function isPublicationState(value: string): value is PublicationState {
  return publicationStates.some(
    (publicationState) => publicationState === value,
  );
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== "";
}

function hasExactFields(
  record: Record<string, unknown>,
  allowedFields: ReadonlySet<string>,
) {
  const fields = Object.keys(record);

  return (
    fields.length === allowedFields.size &&
    fields.every((field) => allowedFields.has(field))
  );
}

function isIsoDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const parsedDate = new Date(`${value}T00:00:00.000Z`);

  return (
    !Number.isNaN(parsedDate.valueOf()) &&
    parsedDate.toISOString().startsWith(value)
  );
}

function invalidContent(pageId: PageId, locale: Locale, reason: string): never {
  throw new Error(`Invalid page content for ${pageId}/${locale}: ${reason}`);
}

function validateContentSource(
  rawSource: unknown,
  sourceIndex: number,
  pageId: PageId,
  locale: Locale,
): ContentSource {
  if (!isRecord(rawSource) || !hasExactFields(rawSource, contentSourceFields)) {
    invalidContent(pageId, locale, `invalid sources[${sourceIndex}] fields`);
  }

  if (
    !isNonEmptyString(rawSource.sourceId) ||
    !isNonEmptyString(rawSource.repository) ||
    !isNonEmptyString(rawSource.document) ||
    !isNonEmptyString(rawSource.revision) ||
    !isNonEmptyString(rawSource.scope) ||
    !isIsoDate(rawSource.checkedAt) ||
    rawSource.publicAuthorization !== "APPROVED"
  ) {
    invalidContent(pageId, locale, `invalid sources[${sourceIndex}]`);
  }

  if (rawSource.repository === "Eterna_Website") {
    invalidContent(pageId, locale, "Website content cannot be its own source");
  }

  return {
    sourceId: rawSource.sourceId,
    repository: rawSource.repository,
    document: rawSource.document,
    revision: rawSource.revision,
    scope: rawSource.scope,
    checkedAt: rawSource.checkedAt,
    publicAuthorization: "APPROVED",
  };
}

export function validatePageContent(
  rawContent: unknown,
  expectedPageId: PageId,
  expectedLocale: Locale,
): TrustedPageContent {
  if (!isRecord(rawContent)) {
    invalidContent(expectedPageId, expectedLocale, "record must be an object");
  }

  if (!hasExactFields(rawContent, pageContentFields)) {
    invalidContent(
      expectedPageId,
      expectedLocale,
      "fields do not match schema",
    );
  }

  if (rawContent.schemaVersion !== 2) {
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

  if (
    typeof rawContent.factState !== "string" ||
    !isFactState(rawContent.factState)
  ) {
    invalidContent(expectedPageId, expectedLocale, "invalid factState");
  }

  if (
    typeof rawContent.publicationState !== "string" ||
    !isPublicationState(rawContent.publicationState)
  ) {
    invalidContent(expectedPageId, expectedLocale, "invalid publicationState");
  }

  if (rawContent.publicationState !== "PUBLISHED") {
    invalidContent(
      expectedPageId,
      expectedLocale,
      "content is not published for production",
    );
  }

  if (!Array.isArray(rawContent.sources) || rawContent.sources.length === 0) {
    invalidContent(expectedPageId, expectedLocale, "missing required source");
  }

  const sources = rawContent.sources.map((rawSource, sourceIndex) =>
    validateContentSource(rawSource, sourceIndex, pageId, locale),
  );

  const rawCtaTarget = rawContent.ctaTarget;
  let ctaTarget: PageRoute | null = null;

  if (rawCtaTarget !== null) {
    if (typeof rawCtaTarget !== "string") {
      invalidContent(expectedPageId, expectedLocale, "invalid CTA target");
    }

    const targetRoute = siteRoutes.find(
      (siteRoute) =>
        siteRoute.locale === locale && siteRoute.pathname === rawCtaTarget,
    );

    if (!targetRoute) {
      invalidContent(expectedPageId, expectedLocale, "invalid CTA target");
    }

    ctaTarget = targetRoute.pathname;
  }

  if (!Array.isArray(rawContent.assetRefs)) {
    invalidContent(expectedPageId, expectedLocale, "invalid assetRefs");
  }

  if (rawContent.assetRefs.some((assetRef) => !isNonEmptyString(assetRef))) {
    invalidContent(expectedPageId, expectedLocale, "invalid assetRefs");
  }

  if (rawContent.assetRefs.length > 0) {
    invalidContent(
      expectedPageId,
      expectedLocale,
      "unregistered asset reference",
    );
  }

  if (typeof rawContent.title !== "string" || rawContent.title.trim() === "") {
    invalidContent(expectedPageId, expectedLocale, "invalid title");
  }

  return {
    schemaVersion: 2,
    pageId,
    locale,
    pairedPageId: pageId,
    route: pagePaths[pageId][locale],
    contentType: pageContentTypes[pageId],
    factState: rawContent.factState,
    publicationState: "PUBLISHED",
    sources,
    ctaTarget,
    assetRefs: [],
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
