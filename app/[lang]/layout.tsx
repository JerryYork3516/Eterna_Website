import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { isLocale, locales } from "../site-routes";

type LocaleLayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{ lang: string }>;
}>;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
