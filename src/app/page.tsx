import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Services } from "@/components/sections/Services";
import { Products } from "@/components/sections/Products";
import { RecentProjects } from "@/components/sections/RecentProjects";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { homeSchema } from "@/lib/schema";

const seo = {
  title: "Celestiq Technologies | Software Development Company",
  description:
    "Celestiq Technologies is a software development company building custom web and mobile apps, websites, APIs and SaaS products for growing businesses.",
};

export const metadata = pageMetadata({
  ...seo,
  path: "/",
  keywords: [
    "software development company",
    "custom software development",
    "web application development",
    "mobile app development company",
    "SaaS product development",
    "IT solutions company",
  ],
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeSchema(seo)} />
      <Hero />
      <TechMarquee />
      <Services />
      <Products />
      <RecentProjects />
      <WhyUs />
      <Process />
      <About />
      <Contact />
    </>
  );
}
