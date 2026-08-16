import { RoutePage, type LocalePageProps } from "./route-page";

export default function HomePage({ params }: LocalePageProps) {
  return <RoutePage pageId="home" params={params} />;
}
