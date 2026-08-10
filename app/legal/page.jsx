import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Legal Notice — Fika Design Co. AB",
  description:
    "Legal information for Fika Design Co. AB — organization number, registered address, and entity status.",
  path: "/legal",
});

export default function Page() {
  return <LegalPage kind="legal" />;
}
