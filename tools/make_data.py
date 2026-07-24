"""Assembles the seed catalogue in lib/data.ts."""
import json, pathlib, random

R = random.Random(4)

AM = {
    "apartment": ["Concierge", "Sky lounge", "Covered parking", "Gym", "Lap pool", "Power backup", "Clubhouse", "EV charging"],
    "villa": ["Private pool", "Garden", "Servant quarters", "Solar array", "Home theatre", "Covered parking", "Rainwater harvesting", "Boundary security"],
    "plot": ["Gated layout", "Compound wall", "Corner plot", "Water connection", "Underground drainage", "Avenue plantation"],
    "commercial": ["Fibre backbone", "Central HVAC", "Freight lift", "Reception lobby", "Basement parking", "24/7 access", "Fire compliance"],
}

AGENTS = [
    ("Ananya Rao", "Meridian Private Office", "+91 98490 11204"),
    ("Karthik Iyer", "Meridian South", "+91 99000 55187"),
    ("Farah Sheikh", "Meridian Coastal", "+91 90300 74412"),
    ("Devansh Mehta", "Meridian Land Desk", "+91 89770 60931"),
    ("Nivedita Menon", "Meridian Commercial", "+91 94470 22608"),
]

# title | tagline | description | deal | category | bd | ba | sqft | plot | facing | floors | year | locality | city | state | pin | lat | lng | price
ROWS = [
    ("Kadamba House", "A courtyard villa turned inward, away from the road",
     "Four bedrooms wrap a planted courtyard that carries daylight to the centre of the plan. The west wall is deliberately blind — traffic noise from the main road never reaches the living floor.",
     "sale", "villa", 4, 5, 4820, 7200, "E", 2, 2021, "Jubilee Hills", "Hyderabad", "Telangana", "500033", 17.4239, 78.4106, 118000000),

    ("Rushikonda Terraces, 11A", "Sea on three sides, from the eleventh floor up",
     "A corner apartment where the living room, kitchen and primary bedroom all hold the water line. Cross-ventilation runs the full depth of the plan, so the sea breeze does most of the cooling.",
     "sale", "apartment", 3, 3, 2410, None, "NE", 1, 2020, "Rushikonda", "Visakhapatnam", "Andhra Pradesh", "530045", 17.7800, 83.3830, 34500000),

    ("Survey 118, Parcel 14", "Two acres of red laterite with a road on two edges",
     "A corner parcel inside a gated layout with the compound wall and drainage already in. Approved for residential development, clear title, and ready for a plan to be drawn on it.",
     "sale", "plot", 0, 0, 87120, 87120, "NW", 0, 2024, "Assagao", "North Goa", "Goa", "403507", 15.5990, 73.7660, 96000000),

    ("The Baner Workshop", "A warehouse frame with the roof lifted off",
     "Nine thousand square feet of column-free floor under a north-lit sawtooth roof. Currently fitted as a design studio; the mezzanine and services stay with the building.",
     "rent", "commercial", 0, 4, 9200, None, "N", 2, 2018, "Baner", "Pune", "Maharashtra", "411045", 18.5590, 73.7770, 480000),

    ("Hebbal Reserve, Tower B", "Lake-facing, and it stays that way",
     "The western setback is protected green belt, so nothing will be built between this apartment and the water. Three bedrooms, a study, and a balcony deep enough to actually use.",
     "sale", "apartment", 3, 3, 2180, None, "W", 1, 2022, "Hebbal", "Bengaluru", "Karnataka", "560024", 13.0358, 77.5970, 28900000),

    ("Marine Drive 9", "A backwater apartment with a working harbour view",
     "Ninth floor, facing the channel, where container traffic moves past all day. Renovated last year — new services throughout, original terrazzo floors kept and polished.",
     "rent", "apartment", 2, 2, 1490, None, "SW", 1, 2009, "Marine Drive", "Kochi", "Kerala", "682031", 9.9816, 76.2760, 78000),

    ("Kokapet Rise, 2402", "Twenty-fourth floor, the financial district below",
     "A high-floor apartment above the new district, with the skyline running east to west across the living room. Two covered parking bays and a storage cage in the basement.",
     "sale", "apartment", 4, 4, 3260, None, "E", 1, 2023, "Kokapet", "Hyderabad", "Telangana", "500075", 17.4050, 78.3320, 52000000),

    ("Siolim Boat House", "River frontage, and a jetty that comes with it",
     "A restored Portuguese house on the Chapora with forty metres of river edge. Three bedrooms, a shaded verandah running the full front, and mooring rights on the jetty.",
     "sale", "villa", 3, 3, 3400, 12000, "N", 2, 1948, "Siolim", "North Goa", "Goa", "403517", 15.6280, 73.7630, 74500000),

    ("Benz Circle Chambers", "Ground-floor commercial on the busiest junction in the city",
     "Two thousand square feet with eleven metres of glazed frontage onto the circle. Fitted for retail, but the services will take a clinic or a bank branch without much work.",
     "rent", "commercial", 0, 2, 2050, None, "S", 1, 2016, "Benz Circle", "Vijayawada", "Andhra Pradesh", "520010", 16.4980, 80.6560, 165000),

    ("Whitefield Row, Unit 6", "A row house that behaves like a villa",
     "Three levels with a private terrace on top and a small rear garden that gets morning sun. Shared compound, individual entries, no lift lobby to walk through.",
     "sale", "villa", 4, 4, 3120, 2400, "NE", 3, 2019, "Whitefield", "Bengaluru", "Karnataka", "560066", 12.9698, 77.7500, 31200000),

    ("Banjara Hills 8-2-293", "A 1970s bungalow on a plot that is now rare",
     "Single-storey on eleven thousand square feet in the middle of Road No. 3. Habitable as it stands, but the value is the land and the mature trees on it.",
     "sale", "villa", 5, 4, 5600, 11000, "SE", 1, 1974, "Banjara Hills", "Hyderabad", "Telangana", "500034", 17.4126, 78.4380, 205000000),

    ("Beach Road 44", "Two floors above the seafront promenade",
     "The whole east elevation is glass onto the Bay of Bengal. Comes furnished, including the built-in joinery, and the building has its own generator and desalination plant.",
     "rent", "apartment", 3, 3, 2740, None, "E", 2, 2021, "Beach Road", "Visakhapatnam", "Andhra Pradesh", "530017", 17.7180, 83.3230, 145000),

    ("Koregaon Park Annexe", "A garden apartment on a lane with no through traffic",
     "Ground floor with direct access to a private eighty-square-metre garden. Old trees on all sides keep the interior cool through the afternoon without air conditioning.",
     "sale", "apartment", 3, 3, 2050, None, "N", 1, 2015, "Koregaon Park", "Pune", "Maharashtra", "411001", 18.5360, 73.8930, 26500000),

    ("Gachibowli Block C", "Twelve floors of office, leased and running",
     "A fully-tenanted commercial block with eight years of weighted average lease term remaining. Sold with tenancies in place; the rent roll is available on request.",
     "sale", "commercial", 0, 24, 96000, None, "W", 12, 2017, "Gachibowli", "Hyderabad", "Telangana", "500032", 17.4400, 78.3480, 1240000000),

    ("Indiranagar 12th Main", "A compact house on a street of compact houses",
     "Two bedrooms over a carport, built in 1996 and updated carefully rather than gutted. Walkable to everything on 100 Feet Road, and quiet after eight.",
     "sale", "villa", 2, 2, 1680, 1800, "S", 2, 1996, "Indiranagar", "Bengaluru", "Karnataka", "560038", 12.9784, 77.6408, 42000000),

    ("Kakkanad Tech Court", "Serviced office floor, ready on the day you sign",
     "Four thousand square feet fitted with workstations, cabins, and a boardroom. Fibre from two providers, and the building runs on generator backup without a break.",
     "rent", "commercial", 0, 6, 4100, None, "NE", 1, 2020, "Kakkanad", "Kochi", "Kerala", "682030", 10.0150, 76.3420, 210000),

    ("Gollapudi Land Bank", "Four acres on the highway edge, held clean",
     "Agricultural conversion complete, with highway frontage of one hundred and ten metres. Suitable for warehousing or a layout; both approvals have precedent on the adjacent parcels.",
     "sale", "plot", 0, 0, 174240, 174240, "SW", 0, 2023, "Gollapudi", "Vijayawada", "Andhra Pradesh", "521225", 16.5490, 80.5810, 58000000),

    ("Assagao Field House", "A new house built to look like it has been there",
     "Laterite walls, a clay tile roof, and a plan that opens completely to a paddy field on the north edge. Three bedrooms, a plunge pool, and a covered outdoor kitchen.",
     "rent", "villa", 3, 4, 2900, 9000, "N", 1, 2022, "Assagao", "North Goa", "Goa", "403507", 15.6020, 73.7710, 385000),

    ("Jubilee Hills Studio", "One room, arranged well",
     "A single-volume studio of nine hundred square feet with a sleeping mezzanine. Suits a pied-à-terre; the building takes care of everything else.",
     "rent", "apartment", 1, 1, 900, None, "SE", 1, 2018, "Jubilee Hills", "Hyderabad", "Telangana", "500033", 17.4310, 78.4050, 62000),

    ("Plot 7, Rushikonda Ridge", "The last uphill plot with an unbroken sea line",
     "Eight thousand square feet on the ridge, with the sea to the east and the hill behind. Layout approved, road and power at the boundary.",
     "sale", "plot", 0, 0, 8000, 8000, "E", 0, 2024, "Rushikonda", "Visakhapatnam", "Andhra Pradesh", "530045", 17.7830, 83.3860, 21500000),

    ("Hebbal Courtyard, Unit 2", "Two bedrooms around a light well",
     "A small apartment planned around a double-height light well, so both bedrooms and the kitchen borrow daylight. Efficient, quiet, and cheap to run.",
     "rent", "apartment", 2, 2, 1240, None, "NW", 1, 2021, "Hebbal", "Bengaluru", "Karnataka", "560024", 13.0380, 77.5920, 54000),

    ("Villa Alcantara", "A Goan quinta with the original chapel intact",
     "Nineteenth-century, restored over four years with lime plaster and salvaged timber. Five bedrooms, two acres of orchard, and a chapel that is still consecrated.",
     "sale", "villa", 5, 6, 7800, 87120, "W", 2, 1876, "Siolim", "North Goa", "Goa", "403517", 15.6310, 73.7580, 265000000),

    ("Banjara Retail Podium", "Street-level retail under a residential tower",
     "Three units totalling six thousand square feet with independent entries and shared service access at the rear. Anchor tenant in place on the largest unit.",
     "rent", "commercial", 0, 5, 6000, None, "N", 1, 2019, "Banjara Hills", "Hyderabad", "Telangana", "500034", 17.4180, 78.4420, 720000),

    ("Marine Drive Penthouse", "The top two floors, and the roof above them",
     "A duplex penthouse with a private roof terrace of two thousand square feet looking across the backwaters. Four bedrooms, a family room, and a lift that opens into the apartment.",
     "sale", "apartment", 4, 5, 4600, None, "SW", 2, 2022, "Marine Drive", "Kochi", "Kerala", "682031", 9.9840, 76.2740, 88000000),
]


def slugify(t):
    out = []
    for ch in t.lower():
        if ch.isalnum():
            out.append(ch)
        elif out and out[-1] != "-":
            out.append("-")
    return "".join(out).strip("-")


items = []
for i, r in enumerate(ROWS):
    (title, tagline, desc, deal, cat, bd, ba, sqft, plot, facing,
     floors, year, loc, city, state, pin, lat, lng, price) = r
    pool = AM[cat]
    ams = R.sample(pool, min(len(pool), R.randint(4, 6)))
    ag = AGENTS[i % len(AGENTS)]
    item = {
        "id": f"MP-{1001 + i}",
        "slug": slugify(title),
        "title": title,
        "tagline": tagline,
        "description": desc,
        "price": price,
        "deal": deal,
        "category": cat,
        "bedrooms": bd,
        "bathrooms": ba,
        "areaSqft": sqft,
        "facing": facing,
        "floors": floors,
        "yearBuilt": year,
        "address": {"locality": loc, "city": city, "state": state, "pincode": pin, "lat": lat, "lng": lng},
        "amenities": ams,
        "sheet": (i % 12) + 1,
        "agent": {"name": ag[0], "firm": ag[1], "phone": ag[2]},
        "status": "pending" if i in (5, 18) else ("rejected" if i == 21 else "approved"),
        "featured": i in (0, 1, 2, 7, 10, 23),
        "views": R.randint(180, 7400),
        "listedAt": f"2026-0{R.randint(1,7)}-{R.randint(10,28)}",
    }
    if plot:
        item["plotSqft"] = plot
    items.append(item)

body = json.dumps(items, indent=2, ensure_ascii=False)
ts = f"""import type {{ Property }} from "./types";

/**
 * Seed catalogue. The whole site runs off this array, so `npm run dev` works
 * with no database and no environment variables.
 *
 * Moving to MongoDB: keep this file as your seed source and import it from
 * scripts/seed.ts — see the README.
 */
export const PROPERTIES: Property[] = {body};

export const CITIES = [
  "Hyderabad",
  "Bengaluru",
  "Visakhapatnam",
  "Vijayawada",
  "Pune",
  "Kochi",
  "North Goa",
];

export const AMENITIES = Array.from(
  new Set(PROPERTIES.flatMap((p) => p.amenities))
).sort();

export function bySlug(slug: string) {{
  return PROPERTIES.find((p) => p.slug === slug);
}}
"""
out = pathlib.Path(__file__).resolve().parent.parent / "lib" / "data.ts"
out.write_text(ts)
print("wrote", len(items), "listings ->", out)
