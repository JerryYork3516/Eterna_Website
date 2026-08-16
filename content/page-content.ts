import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { parseDocument } from "yaml";

import type { Locale, PageId } from "../app/site-routes";

export type PageContentFoundation = Readonly<{
  pageId: PageId;
  locale: Locale;
  title: string;
}>;

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

export function toPageContentFoundation(
  rawContent: unknown,
  pageId: PageId,
  locale: Locale,
): PageContentFoundation {
  if (
    typeof rawContent !== "object" ||
    rawContent === null ||
    Array.isArray(rawContent)
  ) {
    throw new Error(`Invalid content foundation for ${pageId}/${locale}`);
  }

  const content = rawContent as Record<string, unknown>;

  if (
    content.pageId !== pageId ||
    content.locale !== locale ||
    typeof content.title !== "string" ||
    content.title.trim() === ""
  ) {
    throw new Error(`Invalid content foundation for ${pageId}/${locale}`);
  }

  return {
    pageId,
    locale,
    title: content.title,
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
): Promise<PageContentFoundation> {
  const rawContent = await loadRawPageContent(pageId, locale);

  return toPageContentFoundation(rawContent, pageId, locale);
}
