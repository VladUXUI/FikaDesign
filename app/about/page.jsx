import { AboutPage } from "@/components/AboutPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About — Fika Design Co. AB",
  description:
    "Fika Design Co. AB is a Sweden-based product design studio founded by two designers who built Skouta — a live mobile app, iOS first then Android — and now bring the same standard to clients.",
  path: "/about",
});

export default function Page() {
  return <AboutPage />;
}
