import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { VideoWalkthrough, type WalkthroughItem } from "@/components/ui/VideoWalkthrough";
import { products } from "@/lib/content";

/** Home page: the featured (first) walkthrough of every product that has one. */
export function Walkthroughs() {
  const videos: WalkthroughItem[] = products.flatMap((p) => (p.walkthroughs?.[0] ? [{ ...p.walkthroughs[0], product: p.name }] : []));
  if (!videos.length) return null;

  return (
    <Section id="walkthroughs" labelledBy="walkthroughs-title" className="pt-0 sm:pt-0">
      <div className="container-x">
        <SectionHeading
          id="walkthroughs-title"
          eyebrow="Product walkthroughs"
          title={
            <>
              See our products <span className="text-gradient">in action.</span>
            </>
          }
          intro="Short recorded tours of the real apps, from the first screen to the finished task."
        />
        <Reveal delay={0.1} className="mt-12">
          <VideoWalkthrough videos={videos} tabLabel="product" />
        </Reveal>
      </div>
    </Section>
  );
}
