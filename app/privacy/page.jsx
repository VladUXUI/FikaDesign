import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy Policy — Fika Design Co. AB",
  description:
    "Privacy policy for fikadesign.studio, operated by Fika Design Co. AB, a registered Swedish limited company.",
  path: "/privacy",
});

export default function Page() {
  return <LegalPage kind="privacy" />;
}
