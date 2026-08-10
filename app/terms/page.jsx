import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Terms of Service — Fika Design Co. AB",
  description:
    "Terms of service for fikadesign.studio, operated by Fika Design Co. AB, a registered Swedish limited company.",
  path: "/terms",
});

export default function Page() {
  return <LegalPage kind="terms" />;
}
