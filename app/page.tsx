import Hero from "../components/sections/Hero";
import WhyUs from "../components/sections/WhyUs";
import Ledger from "../components/sections/Ledger";
import ScrollingStrip from "../components/sections/ScrollingStrip";
import Cities from "../components/sections/Cities";
import Method from "../components/sections/Method";
import Enquire from "../components/sections/Enquire";
import { PROPERTIES } from "../lib/data";

export default function HomePage() {
  const featured = PROPERTIES.filter((p) => p.featured && p.status === "approved").slice(0, 6);

  return (
    <>
      <Hero />
      <WhyUs />
      <Ledger />
      <ScrollingStrip items={featured} />
      <Cities />
      <Method />
      <Enquire />
    </>
  );
}
