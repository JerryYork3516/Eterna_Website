import type { ReactNode } from "react";

type EntryLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function EntryLayout({ children }: EntryLayoutProps) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  );
}
