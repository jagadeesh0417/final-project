import AboutHero from "../../components/sections/about/AboutHero";
import CompanyStory from "../../components/sections/about/CompanyStory";
import MissionVision from "../../components/sections/about/MissionVision";
import WhyChooseUs from "../../components/sections/about/WhyChooseUs";
import Statistics from "../../components/sections/about/Statistics";
import Team from "../../components/sections/about/Team";
import Values from "../../components/sections/about/Values";
import Process from "../../components/sections/about/Process";
import Awards from "../../components/sections/about/Awards";
import AboutTestimonials from "../../components/sections/about/AboutTestimonials";
import VideoSection from "../../components/sections/about/VideoSection";
import OfficeLocations from "../../components/sections/about/OfficeLocations";
import FAQ from "../../components/sections/about/FAQ";
import AboutCTA from "../../components/sections/about/AboutCTA";

export const metadata = {
  title: "About Us — AKRADHI Luxury Real Estate",
  description:
    "For over a decade, AKRADHI has been helping families and investors discover luxury homes, premium villas, apartments, and commercial properties across India.",
  openGraph: {
    title: "About AKRADHI — Luxury Real Estate",
    description:
      "Discover our story, mission, and the team behind India's most trusted luxury property platform.",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <CompanyStory />
      <MissionVision />
      <WhyChooseUs />
      <Statistics />
      <Team />
      <Values />
      <Process />
      <Awards />
      <AboutTestimonials />
      <VideoSection />
      <OfficeLocations />
      <FAQ />
      <AboutCTA />
    </>
  );
}
