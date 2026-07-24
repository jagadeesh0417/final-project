import type { Metadata } from "next";
import SearchBuilder from "../../components/ui/SearchBuilder";
import PageHead from "../../components/ui/PageHead";

export const metadata: Metadata = {
  title: "Advanced search",
  description: "Build a search across city, budget, type, size, orientation and amenities.",
};

export default function FiltersPage() {
  return (
    <>
      <PageHead
        eyebrow="Advanced search"
        title="Narrow it down properly."
        note="Set as much or as little as you like — the count on the right updates as you go, so you always know what you are about to open."
      />
      <div className="shell pb-28">
        <SearchBuilder />
      </div>
    </>
  );
}
