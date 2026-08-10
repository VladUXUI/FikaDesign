import "../assets/site.css";
import "../assets/site-fika.css";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { PostHogProvider } from "@/components/PostHogProvider";

export const metadata = {
  metadataBase: new URL("https://fikadesign.studio"),
  title: "Fika Design Co. — Product Design Studio, Sweden",
  description:
    "Fika Design Co. is a Sweden-based product design studio. We offer product design, design engineering, content design, UX writing, and context engineering for digital products.",
  icons: { icon: "/FikaLogo.svg" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Fika Design Co.",
    locale: "en_US",
    url: "/",
    images: [
      {
        url: "/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Fika Design Co. — a design studio that ships.",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/og-cover.png"] },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body data-motion="bold">
        <PostHogProvider>{children}</PostHogProvider>
        <Analytics />
      </body>
    </html>
  );
}
