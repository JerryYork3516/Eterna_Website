import { RoutePage, type LocalePageProps } from "../route-page";

export default function AboutPage({ params }: LocalePageProps) {
  return <RoutePage pageId="about" params={params} />;
}
