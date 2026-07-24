import type { Metadata } from "next";
import AdminDesk from "../../components/ui/AdminDesk";
import PageHead from "../../components/ui/PageHead";
import { PROPERTIES } from "../../lib/data";
import type { Inquiry } from "../../lib/types";

export const metadata: Metadata = {
  title: "The desk",
  description: "Internal register management.",
  robots: { index: false, follow: false },
};

const ENQUIRIES: Inquiry[] = [
  {
    id: "EN-4401",
    propertyId: "MP-1001",
    name: "Sridhar Kalyan",
    email: "sridhar@example.in",
    phone: "+91 98661 20044",
    message: "Interested in the courtyard house. Can we see it on Saturday morning?",
    status: "new",
    createdAt: "2026-07-19",
  },
  {
    id: "EN-4402",
    propertyId: "MP-1003",
    name: "Reema Fernandes",
    email: "reema@example.in",
    phone: "+91 91100 38210",
    message: "Asking about FAR on the Assagao parcel and whether the layout permits a second block.",
    status: "new",
    createdAt: "2026-07-20",
  },
  {
    id: "EN-4403",
    propertyId: "MP-1014",
    name: "Ajay Bhatnagar",
    email: "ajay@example.in",
    phone: "+91 99450 77321",
    message: "Need the rent roll and WALT breakdown for the Gachibowli block before we proceed.",
    status: "contacted",
    createdAt: "2026-07-15",
  },
  {
    id: "EN-4404",
    propertyId: "MP-1008",
    name: "Priya Nambiar",
    email: "priya@example.in",
    phone: "+91 90070 11562",
    message: "Confirmed the viewing for the river house. Sending the offer this week.",
    status: "closed",
    createdAt: "2026-07-08",
  },
];

export default function AdminPage() {
  return (
    <>
      <PageHead
        eyebrow="Internal"
        title="The desk."
        note="Moderate the register and work through enquiries. Changes here live in this session — connect MONGODB_URI to persist them."
      />
      <div className="shell pb-24">
        <AdminDesk seed={PROPERTIES} enquiries={ENQUIRIES} />
      </div>
    </>
  );
}
