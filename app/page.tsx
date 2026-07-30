import Hero from "../components/sections/Hero";
import SearchBar from "../components/sections/SearchBar";
import FeaturedListings from "../components/sections/FeaturedListings";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import Statistics from "../components/sections/Statistics";
import Testimonials from "../components/sections/Testimonials";
import Gallery from "../components/sections/Gallery";
import CTA from "../components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedListings />
      <WhyChooseUs />
      <Statistics />
      <Testimonials />
      <Gallery />
      <CTA />
    </>
  );
}
