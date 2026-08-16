import { notFound } from "next/navigation";

import { loadPageContent } from "../../content/page-content";
import { isLocale, type PageId } from "../site-routes";

export type LocalePageProps = Readonly<{
  params: Promise<{ lang: string }>;
}>;

type RoutePageProps = LocalePageProps &
  Readonly<{
    pageId: PageId;
  }>;

export async function RoutePage({ pageId, params }: RoutePageProps) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const content = await loadPageContent(pageId, lang);

  return (
    <main data-locale={lang} data-page-id={pageId}>
      <h1>{content.title}</h1>
    </main>
  );
}
