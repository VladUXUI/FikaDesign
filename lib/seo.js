// Shared per-page metadata builder. Produces complete canonical + Open Graph +
// Twitter tags so each route ships full social metadata (Next replaces, rather
// than deep-merges, the openGraph/twitter objects per route).

const OG_IMAGE = {
  url: "/og-cover.png",
  width: 1200,
  height: 630,
  alt: "Fika Design Co. — a design studio that ships.",
};

export function pageMeta({ title, description, path = "/" }) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Fika Design Co.",
      locale: "en_US",
      url: path,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-cover.png"],
    },
  };
}
