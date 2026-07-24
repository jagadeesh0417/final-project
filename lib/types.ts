export type Deal = "sale" | "rent";

export type Category = "apartment" | "villa" | "plot" | "commercial";

export type Facing = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";

export type Status = "approved" | "pending" | "rejected";

export interface Address {
  locality: string;
  city: string;
  state: string;
  pincode: string;
  lat: number;
  lng: number;
}

export interface Agent {
  name: string;
  firm: string;
  phone: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  /** Rupees. For rentals this is the monthly figure. */
  price: number;
  deal: Deal;
  category: Category;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  plotSqft?: number;
  facing: Facing;
  floors: number;
  yearBuilt: number;
  address: Address;
  amenities: string[];
  sheet: number;
  agent: Agent;
  status: Status;
  featured: boolean;
  views: number;
  listedAt: string;
}

export interface Filters {
  q: string;
  city: string;
  deal: Deal | "";
  category: Category | "";
  bedrooms: number;
  min: number;
  max: number;
  minArea: number;
  facing: Facing | "";
  amenities: string[];
  sort: "recent" | "price-asc" | "price-desc" | "area-desc";
  page: number;
}

export interface Inquiry {
  id: string;
  propertyId: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}
