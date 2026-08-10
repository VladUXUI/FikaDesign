import { ServicesPage } from "@/components/ServicesPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Services — Fika Design Co.",
  description:
    "Fika Design Co. offers product design, design engineering, content design, UX writing, and context engineering for digital products. Based in Sweden.",
  path: "/services",
});

export default function Page() {
  return <ServicesPage />;
}
