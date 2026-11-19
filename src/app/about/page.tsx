import { PageHero } from "@/components/ui/PageHero";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { About } from "@/components/sections/About";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { pageMetadata } from "@/lib/seo";
import { pageSchema, type Crumb } from "@/lib/schema";

const seo = {
  title: "About Celestiq Technologies | Software & Product Company",
  description:
    "Celestiq Technologies is a software development and product company. We build websites, apps and APIs for clients, and run our own SaaS platforms.",
};

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export const metadata = pageMetadata({
  ...seo,
  path: "/about",
  keywords: ["Celestiq Technologies", "software development company", "technology company", "SaaS product company"],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={pageSchema({ type: "AboutPage", path: "/about", ...seo, crumbs })} />
      <PageHero
        eyebrow="About us"
        crumbs={crumbs}
        title={
          <>
            We build software for clients — <span className="text-gradient">and for ourselves.</span>
          </>
        }
        intro="Celestiq Technologies designs and engineers websites, web and mobile applications and APIs for businesses, and builds and operates its own SaaS products. Running our own platforms in production shapes how we build for every client."
      />
      <About />
      <WhyUs />
      <Process />
      <CtaBanner title="Let's build something together" text="Tell us about your product, platform or project, and we'll get back to you to discuss the next steps." />
    </>
  );
}
