import { notFound } from "next/navigation";

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

  return (
    <main data-locale={lang} data-page-id={pageId}>
      <h1>Eterna Website</h1>
    </main>
  );
}
