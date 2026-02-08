import PageClient from "./page.client";

type Locale = "en" | "pl";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pl" }];
}

export default function Page({ params }: { params: { locale: Locale } }) {
  const locale = params.locale ?? "en";
  return <PageClient locale={locale} />;
}
