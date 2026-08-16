import { RoutePage, type LocalePageProps } from "../../route-page";

export default function StudioPage({ params }: LocalePageProps) {
  return <RoutePage pageId="product-studio" params={params} />;
}
