import { ContactPage } from "@/components/ContactPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact — Fika Design Co.",
  description:
    "Get in touch with Fika Design Co. — a Sweden-based product design studio. We take on a limited number of projects at a time.",
  path: "/contact",
});

export default function Page() {
  return <ContactPage />;
}
