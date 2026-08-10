import { WorkPage } from "@/components/WorkPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Our Work — Fika Design Co.",
  description:
    "Skouta is Fika Design Co.'s flagship product — a real-time English-language app for Swedish public alerts, designed and built end-to-end by the Fika team.",
  path: "/work",
});

export default function Page() {
  return <WorkPage />;
}
