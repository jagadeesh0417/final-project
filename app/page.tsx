import Hero from "../components/sections/Hero";
import FeaturedCollection from "../components/sections/FeaturedCollection";
import WhyAkradhi from "../components/sections/WhyAkradhi";
import PropertyGrid from "../components/sections/PropertyGrid";
import FeaturedProjects from "../components/sections/FeaturedProjects";
import OurProcess from "../components/sections/OurProcess";
import Testimonials from "../components/sections/Testimonials";
import Gallery from "../components/sections/Gallery";
import Investment from "../components/sections/Investment";
import CTA from "../components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCollection />
      <WhyAkradhi />
      <PropertyGrid />
      <FeaturedProjects />
      <OurProcess />
      <Testimonials />
      <Gallery />
      <Investment />
      <CTA />
    </>
  );
}
