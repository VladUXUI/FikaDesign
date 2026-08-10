import { Home } from "@/components/Home";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Fika Design Co. — Product Design Studio, Sweden",
  description:
    "Fika Design Co. is a Sweden-based product design studio. We offer product design, design engineering, content design, UX writing, and context engineering for digital products.",
  path: "/",
});

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Fika Design Co.",
  legalName: "Fika Design Co. AB",
  url: "https://fikadesign.studio/",
  logo: "https://fikadesign.studio/FikaLogo.svg",
  image: "https://fikadesign.studio/og-cover.png",
  email: "team@fikadesign.studio",
  description:
    "Fika Design Co. is a Sweden-based product design studio offering product design, design engineering, content design, UX writing, and context engineering for digital products.",
  vatID: "SE559558451601",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Aspedalsvägen 23",
    postalCode: "417 27",
    addressLocality: "Göteborg",
    addressCountry: "SE",
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <Home />
    </>
  );
}
