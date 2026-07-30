import Hero from "../components/sections/Hero";
import SignatureProperty from "../components/sections/SignatureProperty";
import CuratedCollection from "../components/sections/CuratedCollection";
import WhyAkradhi from "../components/sections/WhyAkradhi";
import MarketIntelligence from "../components/sections/MarketIntelligence";
import Gallery from "../components/sections/Gallery";
import Testimonials from "../components/sections/Testimonials";
import OurProcess from "../components/sections/OurProcess";
import Investment from "../components/sections/Investment";
import CTA from "../components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SignatureProperty />
      <CuratedCollection />
      <WhyAkradhi />
      <MarketIntelligence />
      <Gallery />
      <Testimonials />
      <OurProcess />
      <Investment />
      <CTA />
    </>
  );
}
