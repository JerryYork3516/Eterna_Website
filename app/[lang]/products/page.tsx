import { RoutePage, type LocalePageProps } from "../route-page";

export default function ProductsPage({ params }: LocalePageProps) {
  return <RoutePage pageId="products" params={params} />;
}
