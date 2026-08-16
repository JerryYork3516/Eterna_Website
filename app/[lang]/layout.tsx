import type { ReactNode } from "react";

import { locales } from "../site-routes";

type LocaleLayoutProps = Readonly<{
  children: ReactNode;
}>;

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default function LocaleLayout({ children }: LocaleLayoutProps) {
  return children;
}
