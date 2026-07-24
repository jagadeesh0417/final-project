import type { Metadata } from "next";
import FavouritesView from "../../components/ui/FavouritesView";
import PageHead from "../../components/ui/PageHead";
import { PROPERTIES } from "../../lib/data";

export const metadata: Metadata = {
  title: "Your favourites",
  description: "The properties you have kept.",
};

export default function ShortlistPage() {
  return (
    <>
      <PageHead
        eyebrow="Kept"
        title="Your favourites."
        note="Held in this browser only — nothing is sent to us until you enquire."
      />
      <div className="shell pb-24">
        <FavouritesView all={PROPERTIES} />
      </div>
    </>
  );
}
