import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { Contact } from "@/components/sections/Contact";
import { pageMetadata } from "@/lib/seo";
import { pageSchema, type Crumb } from "@/lib/schema";

const seo = {
  title: "Contact Celestiq Technologies | Start Your Software Project",
  description:
    "Contact Celestiq Technologies about a website, web or mobile app, API or SaaS product. Share your goals and we will get back to you to discuss next steps.",
};

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export const metadata = pageMetadata({ ...seo, path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <JsonLd data={pageSchema({ type: "ContactPage", path: "/contact", ...seo, crumbs })} />
      <PageHero
        eyebrow="Contact"
        crumbs={crumbs}
        title={
          <>
            Contact <span className="text-gradient">Celestiq Technologies</span>
          </>
        }
        intro="Planning a new product, replacing an outdated system or need extra engineering capacity? Send us a few details below and our team will reply directly."
      />
      <div className="-mt-16 sm:-mt-24">
        <Contact />
      </div>
    </>
  );
}
