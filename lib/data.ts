import type { Property } from "./types";

/**
 * Seed catalogue. The whole site runs off this array, so `npm run dev` works
 * with no database and no environment variables.
 *
 * Moving to MongoDB: keep this file as your seed source and import it from
 * scripts/seed.ts — see the README.
 */
export const PROPERTIES: Property[] = [
  {
    "id": "MP-1001",
    "slug": "kadamba-house",
    "title": "Kadamba House",
    "tagline": "A courtyard villa turned inward, away from the road",
    "description": "Four bedrooms wrap a planted courtyard that carries daylight to the centre of the plan. The west wall is deliberately blind — traffic noise from the main road never reaches the living floor.",
    "price": 118000000,
    "deal": "sale",
    "category": "villa",
    "bedrooms": 4,
    "bathrooms": 5,
    "areaSqft": 4820,
    "facing": "E",
    "floors": 2,
    "yearBuilt": 2021,
    "address": {
      "locality": "Jubilee Hills",
      "city": "Hyderabad",
      "state": "Telangana",
      "pincode": "500033",
      "lat": 17.4239,
      "lng": 78.4106
    },
    "amenities": [
      "Home theatre",
      "Private pool",
      "Covered parking",
      "Solar array"
    ],
    "sheet": 1,
    "agent": {
      "name": "Ananya Rao",
      "firm": "AKRADHI Private Office",
      "phone": "+91 98490 11204"
    },
    "status": "approved",
    "featured": true,
    "views": 4102,
    "listedAt": "2026-02-12",
    "plotSqft": 7200
  },
  {
    "id": "MP-1002",
    "slug": "rushikonda-terraces-11a",
    "title": "Rushikonda Terraces, 11A",
    "tagline": "Sea on three sides, from the eleventh floor up",
    "description": "A corner apartment where the living room, kitchen and primary bedroom all hold the water line. Cross-ventilation runs the full depth of the plan, so the sea breeze does most of the cooling.",
    "price": 34500000,
    "deal": "sale",
    "category": "apartment",
    "bedrooms": 3,
    "bathrooms": 3,
    "areaSqft": 2410,
    "facing": "NE",
    "floors": 1,
    "yearBuilt": 2020,
    "address": {
      "locality": "Rushikonda",
      "city": "Visakhapatnam",
      "state": "Andhra Pradesh",
      "pincode": "530045",
      "lat": 17.78,
      "lng": 83.383
    },
    "amenities": [
      "Concierge",
      "Gym",
      "Lap pool",
      "Covered parking"
    ],
    "sheet": 2,
    "agent": {
      "name": "Karthik Iyer",
      "firm": "AKRADHI South",
      "phone": "+91 99000 55187"
    },
    "status": "approved",
    "featured": true,
    "views": 6737,
    "listedAt": "2026-07-11"
  },
  {
    "id": "MP-1003",
    "slug": "survey-118-parcel-14",
    "title": "Survey 118, Parcel 14",
    "tagline": "Two acres of red laterite with a road on two edges",
    "description": "A corner parcel inside a gated layout with the compound wall and drainage already in. Approved for residential development, clear title, and ready for a plan to be drawn on it.",
    "price": 96000000,
    "deal": "sale",
    "category": "plot",
    "bedrooms": 0,
    "bathrooms": 0,
    "areaSqft": 87120,
    "facing": "NW",
    "floors": 0,
    "yearBuilt": 2024,
    "address": {
      "locality": "Assagao",
      "city": "North Goa",
      "state": "Goa",
      "pincode": "403507",
      "lat": 15.599,
      "lng": 73.766
    },
    "amenities": [
      "Underground drainage",
      "Avenue plantation",
      "Corner plot",
      "Compound wall"
    ],
    "sheet": 3,
    "agent": {
      "name": "Farah Sheikh",
      "firm": "AKRADHI Coastal",
      "phone": "+91 90300 74412"
    },
    "status": "approved",
    "featured": true,
    "views": 6567,
    "listedAt": "2026-02-13",
    "plotSqft": 87120
  },
  {
    "id": "MP-1004",
    "slug": "the-baner-workshop",
    "title": "The Baner Workshop",
    "tagline": "A warehouse frame with the roof lifted off",
    "description": "Nine thousand square feet of column-free floor under a north-lit sawtooth roof. Currently fitted as a design studio; the mezzanine and services stay with the building.",
    "price": 480000,
    "deal": "rent",
    "category": "commercial",
    "bedrooms": 0,
    "bathrooms": 4,
    "areaSqft": 9200,
    "facing": "N",
    "floors": 2,
    "yearBuilt": 2018,
    "address": {
      "locality": "Baner",
      "city": "Pune",
      "state": "Maharashtra",
      "pincode": "411045",
      "lat": 18.559,
      "lng": 73.777
    },
    "amenities": [
      "Central HVAC",
      "Fibre backbone",
      "Freight lift",
      "Basement parking",
      "24/7 access"
    ],
    "sheet": 4,
    "agent": {
      "name": "Devansh Mehta",
      "firm": "AKRADHI Land Desk",
      "phone": "+91 89770 60931"
    },
    "status": "approved",
    "featured": false,
    "views": 1530,
    "listedAt": "2026-03-19"
  },
  {
    "id": "MP-1005",
    "slug": "hebbal-reserve-tower-b",
    "title": "Hebbal Reserve, Tower B",
    "tagline": "Lake-facing, and it stays that way",
    "description": "The western setback is protected green belt, so nothing will be built between this apartment and the water. Three bedrooms, a study, and a balcony deep enough to actually use.",
    "price": 28900000,
    "deal": "sale",
    "category": "apartment",
    "bedrooms": 3,
    "bathrooms": 3,
    "areaSqft": 2180,
    "facing": "W",
    "floors": 1,
    "yearBuilt": 2022,
    "address": {
      "locality": "Hebbal",
      "city": "Bengaluru",
      "state": "Karnataka",
      "pincode": "560024",
      "lat": 13.0358,
      "lng": 77.597
    },
    "amenities": [
      "Power backup",
      "Concierge",
      "Lap pool",
      "Covered parking",
      "Gym",
      "EV charging"
    ],
    "sheet": 5,
    "agent": {
      "name": "Nivedita Menon",
      "firm": "AKRADHI Commercial",
      "phone": "+91 94470 22608"
    },
    "status": "approved",
    "featured": false,
    "views": 2218,
    "listedAt": "2026-02-17"
  },
  {
    "id": "MP-1006",
    "slug": "marine-drive-9",
    "title": "Marine Drive 9",
    "tagline": "A backwater apartment with a working harbour view",
    "description": "Ninth floor, facing the channel, where container traffic moves past all day. Renovated last year — new services throughout, original terrazzo floors kept and polished.",
    "price": 78000,
    "deal": "rent",
    "category": "apartment",
    "bedrooms": 2,
    "bathrooms": 2,
    "areaSqft": 1490,
    "facing": "SW",
    "floors": 1,
    "yearBuilt": 2009,
    "address": {
      "locality": "Marine Drive",
      "city": "Kochi",
      "state": "Kerala",
      "pincode": "682031",
      "lat": 9.9816,
      "lng": 76.276
    },
    "amenities": [
      "Lap pool",
      "Concierge",
      "EV charging",
      "Covered parking",
      "Clubhouse"
    ],
    "sheet": 6,
    "agent": {
      "name": "Ananya Rao",
      "firm": "AKRADHI Private Office",
      "phone": "+91 98490 11204"
    },
    "status": "pending",
    "featured": false,
    "views": 2571,
    "listedAt": "2026-05-19"
  },
  {
    "id": "MP-1007",
    "slug": "kokapet-rise-2402",
    "title": "Kokapet Rise, 2402",
    "tagline": "Twenty-fourth floor, the financial district below",
    "description": "A high-floor apartment above the new district, with the skyline running east to west across the living room. Two covered parking bays and a storage cage in the basement.",
    "price": 52000000,
    "deal": "sale",
    "category": "apartment",
    "bedrooms": 4,
    "bathrooms": 4,
    "areaSqft": 3260,
    "facing": "E",
    "floors": 1,
    "yearBuilt": 2023,
    "address": {
      "locality": "Kokapet",
      "city": "Hyderabad",
      "state": "Telangana",
      "pincode": "500075",
      "lat": 17.405,
      "lng": 78.332
    },
    "amenities": [
      "Gym",
      "EV charging",
      "Clubhouse",
      "Lap pool",
      "Covered parking",
      "Sky lounge"
    ],
    "sheet": 7,
    "agent": {
      "name": "Karthik Iyer",
      "firm": "AKRADHI South",
      "phone": "+91 99000 55187"
    },
    "status": "approved",
    "featured": false,
    "views": 3877,
    "listedAt": "2026-02-17"
  },
  {
    "id": "MP-1008",
    "slug": "siolim-boat-house",
    "title": "Siolim Boat House",
    "tagline": "River frontage, and a jetty that comes with it",
    "description": "A restored Portuguese house on the Chapora with forty metres of river edge. Three bedrooms, a shaded verandah running the full front, and mooring rights on the jetty.",
    "price": 74500000,
    "deal": "sale",
    "category": "villa",
    "bedrooms": 3,
    "bathrooms": 3,
    "areaSqft": 3400,
    "facing": "N",
    "floors": 2,
    "yearBuilt": 1948,
    "address": {
      "locality": "Siolim",
      "city": "North Goa",
      "state": "Goa",
      "pincode": "403517",
      "lat": 15.628,
      "lng": 73.763
    },
    "amenities": [
      "Home theatre",
      "Rainwater harvesting",
      "Private pool",
      "Covered parking",
      "Boundary security"
    ],
    "sheet": 8,
    "agent": {
      "name": "Farah Sheikh",
      "firm": "AKRADHI Coastal",
      "phone": "+91 90300 74412"
    },
    "status": "approved",
    "featured": true,
    "views": 3970,
    "listedAt": "2026-06-18",
    "plotSqft": 12000
  },
  {
    "id": "MP-1009",
    "slug": "benz-circle-chambers",
    "title": "Benz Circle Chambers",
    "tagline": "Ground-floor commercial on the busiest junction in the city",
    "description": "Two thousand square feet with eleven metres of glazed frontage onto the circle. Fitted for retail, but the services will take a clinic or a bank branch without much work.",
    "price": 165000,
    "deal": "rent",
    "category": "commercial",
    "bedrooms": 0,
    "bathrooms": 2,
    "areaSqft": 2050,
    "facing": "S",
    "floors": 1,
    "yearBuilt": 2016,
    "address": {
      "locality": "Benz Circle",
      "city": "Vijayawada",
      "state": "Andhra Pradesh",
      "pincode": "520010",
      "lat": 16.498,
      "lng": 80.656
    },
    "amenities": [
      "Basement parking",
      "24/7 access",
      "Reception lobby",
      "Freight lift",
      "Fibre backbone",
      "Fire compliance"
    ],
    "sheet": 9,
    "agent": {
      "name": "Devansh Mehta",
      "firm": "AKRADHI Land Desk",
      "phone": "+91 89770 60931"
    },
    "status": "approved",
    "featured": false,
    "views": 724,
    "listedAt": "2026-04-16"
  },
  {
    "id": "MP-1010",
    "slug": "whitefield-row-unit-6",
    "title": "Whitefield Row, Unit 6",
    "tagline": "A row house that behaves like a villa",
    "description": "Three levels with a private terrace on top and a small rear garden that gets morning sun. Shared compound, individual entries, no lift lobby to walk through.",
    "price": 31200000,
    "deal": "sale",
    "category": "villa",
    "bedrooms": 4,
    "bathrooms": 4,
    "areaSqft": 3120,
    "facing": "NE",
    "floors": 3,
    "yearBuilt": 2019,
    "address": {
      "locality": "Whitefield",
      "city": "Bengaluru",
      "state": "Karnataka",
      "pincode": "560066",
      "lat": 12.9698,
      "lng": 77.75
    },
    "amenities": [
      "Boundary security",
      "Servant quarters",
      "Garden",
      "Rainwater harvesting",
      "Solar array",
      "Home theatre"
    ],
    "sheet": 10,
    "agent": {
      "name": "Nivedita Menon",
      "firm": "AKRADHI Commercial",
      "phone": "+91 94470 22608"
    },
    "status": "approved",
    "featured": false,
    "views": 5003,
    "listedAt": "2026-03-27",
    "plotSqft": 2400
  },
  {
    "id": "MP-1011",
    "slug": "banjara-hills-8-2-293",
    "title": "Banjara Hills 8-2-293",
    "tagline": "A 1970s bungalow on a plot that is now rare",
    "description": "Single-storey on eleven thousand square feet in the middle of Road No. 3. Habitable as it stands, but the value is the land and the mature trees on it.",
    "price": 205000000,
    "deal": "sale",
    "category": "villa",
    "bedrooms": 5,
    "bathrooms": 4,
    "areaSqft": 5600,
    "facing": "SE",
    "floors": 1,
    "yearBuilt": 1974,
    "address": {
      "locality": "Banjara Hills",
      "city": "Hyderabad",
      "state": "Telangana",
      "pincode": "500034",
      "lat": 17.4126,
      "lng": 78.438
    },
    "amenities": [
      "Covered parking",
      "Private pool",
      "Rainwater harvesting",
      "Garden"
    ],
    "sheet": 11,
    "agent": {
      "name": "Ananya Rao",
      "firm": "AKRADHI Private Office",
      "phone": "+91 98490 11204"
    },
    "status": "approved",
    "featured": true,
    "views": 2453,
    "listedAt": "2026-07-28",
    "plotSqft": 11000
  },
  {
    "id": "MP-1012",
    "slug": "beach-road-44",
    "title": "Beach Road 44",
    "tagline": "Two floors above the seafront promenade",
    "description": "The whole east elevation is glass onto the Bay of Bengal. Comes furnished, including the built-in joinery, and the building has its own generator and desalination plant.",
    "price": 145000,
    "deal": "rent",
    "category": "apartment",
    "bedrooms": 3,
    "bathrooms": 3,
    "areaSqft": 2740,
    "facing": "E",
    "floors": 2,
    "yearBuilt": 2021,
    "address": {
      "locality": "Beach Road",
      "city": "Visakhapatnam",
      "state": "Andhra Pradesh",
      "pincode": "530017",
      "lat": 17.718,
      "lng": 83.323
    },
    "amenities": [
      "Gym",
      "Concierge",
      "Covered parking",
      "Sky lounge",
      "Power backup",
      "Lap pool"
    ],
    "sheet": 12,
    "agent": {
      "name": "Karthik Iyer",
      "firm": "AKRADHI South",
      "phone": "+91 99000 55187"
    },
    "status": "approved",
    "featured": false,
    "views": 390,
    "listedAt": "2026-01-21"
  },
  {
    "id": "MP-1013",
    "slug": "koregaon-park-annexe",
    "title": "Koregaon Park Annexe",
    "tagline": "A garden apartment on a lane with no through traffic",
    "description": "Ground floor with direct access to a private eighty-square-metre garden. Old trees on all sides keep the interior cool through the afternoon without air conditioning.",
    "price": 26500000,
    "deal": "sale",
    "category": "apartment",
    "bedrooms": 3,
    "bathrooms": 3,
    "areaSqft": 2050,
    "facing": "N",
    "floors": 1,
    "yearBuilt": 2015,
    "address": {
      "locality": "Koregaon Park",
      "city": "Pune",
      "state": "Maharashtra",
      "pincode": "411001",
      "lat": 18.536,
      "lng": 73.893
    },
    "amenities": [
      "Sky lounge",
      "Covered parking",
      "Power backup",
      "Clubhouse",
      "Concierge",
      "EV charging"
    ],
    "sheet": 1,
    "agent": {
      "name": "Farah Sheikh",
      "firm": "AKRADHI Coastal",
      "phone": "+91 90300 74412"
    },
    "status": "approved",
    "featured": false,
    "views": 2547,
    "listedAt": "2026-03-14"
  },
  {
    "id": "MP-1014",
    "slug": "gachibowli-block-c",
    "title": "Gachibowli Block C",
    "tagline": "Twelve floors of office, leased and running",
    "description": "A fully-tenanted commercial block with eight years of weighted average lease term remaining. Sold with tenancies in place; the rent roll is available on request.",
    "price": 1240000000,
    "deal": "sale",
    "category": "commercial",
    "bedrooms": 0,
    "bathrooms": 24,
    "areaSqft": 96000,
    "facing": "W",
    "floors": 12,
    "yearBuilt": 2017,
    "address": {
      "locality": "Gachibowli",
      "city": "Hyderabad",
      "state": "Telangana",
      "pincode": "500032",
      "lat": 17.44,
      "lng": 78.348
    },
    "amenities": [
      "Reception lobby",
      "Basement parking",
      "Fibre backbone",
      "Freight lift",
      "Fire compliance",
      "24/7 access"
    ],
    "sheet": 2,
    "agent": {
      "name": "Devansh Mehta",
      "firm": "AKRADHI Land Desk",
      "phone": "+91 89770 60931"
    },
    "status": "approved",
    "featured": false,
    "views": 3818,
    "listedAt": "2026-03-14"
  },
  {
    "id": "MP-1015",
    "slug": "indiranagar-12th-main",
    "title": "Indiranagar 12th Main",
    "tagline": "A compact house on a street of compact houses",
    "description": "Two bedrooms over a carport, built in 1996 and updated carefully rather than gutted. Walkable to everything on 100 Feet Road, and quiet after eight.",
    "price": 42000000,
    "deal": "sale",
    "category": "villa",
    "bedrooms": 2,
    "bathrooms": 2,
    "areaSqft": 1680,
    "facing": "S",
    "floors": 2,
    "yearBuilt": 1996,
    "address": {
      "locality": "Indiranagar",
      "city": "Bengaluru",
      "state": "Karnataka",
      "pincode": "560038",
      "lat": 12.9784,
      "lng": 77.6408
    },
    "amenities": [
      "Rainwater harvesting",
      "Home theatre",
      "Garden",
      "Servant quarters",
      "Private pool"
    ],
    "sheet": 3,
    "agent": {
      "name": "Nivedita Menon",
      "firm": "AKRADHI Commercial",
      "phone": "+91 94470 22608"
    },
    "status": "approved",
    "featured": false,
    "views": 3156,
    "listedAt": "2026-01-24",
    "plotSqft": 1800
  },
  {
    "id": "MP-1016",
    "slug": "kakkanad-tech-court",
    "title": "Kakkanad Tech Court",
    "tagline": "Serviced office floor, ready on the day you sign",
    "description": "Four thousand square feet fitted with workstations, cabins, and a boardroom. Fibre from two providers, and the building runs on generator backup without a break.",
    "price": 210000,
    "deal": "rent",
    "category": "commercial",
    "bedrooms": 0,
    "bathrooms": 6,
    "areaSqft": 4100,
    "facing": "NE",
    "floors": 1,
    "yearBuilt": 2020,
    "address": {
      "locality": "Kakkanad",
      "city": "Kochi",
      "state": "Kerala",
      "pincode": "682030",
      "lat": 10.015,
      "lng": 76.342
    },
    "amenities": [
      "Freight lift",
      "Fire compliance",
      "24/7 access",
      "Fibre backbone"
    ],
    "sheet": 4,
    "agent": {
      "name": "Ananya Rao",
      "firm": "AKRADHI Private Office",
      "phone": "+91 98490 11204"
    },
    "status": "approved",
    "featured": false,
    "views": 3778,
    "listedAt": "2026-02-23"
  },
  {
    "id": "MP-1017",
    "slug": "gollapudi-land-bank",
    "title": "Gollapudi Land Bank",
    "tagline": "Four acres on the highway edge, held clean",
    "description": "Agricultural conversion complete, with highway frontage of one hundred and ten metres. Suitable for warehousing or a layout; both approvals have precedent on the adjacent parcels.",
    "price": 58000000,
    "deal": "sale",
    "category": "plot",
    "bedrooms": 0,
    "bathrooms": 0,
    "areaSqft": 174240,
    "facing": "SW",
    "floors": 0,
    "yearBuilt": 2023,
    "address": {
      "locality": "Gollapudi",
      "city": "Vijayawada",
      "state": "Andhra Pradesh",
      "pincode": "521225",
      "lat": 16.549,
      "lng": 80.581
    },
    "amenities": [
      "Gated layout",
      "Avenue plantation",
      "Underground drainage",
      "Water connection"
    ],
    "sheet": 5,
    "agent": {
      "name": "Karthik Iyer",
      "firm": "AKRADHI South",
      "phone": "+91 99000 55187"
    },
    "status": "approved",
    "featured": false,
    "views": 6218,
    "listedAt": "2026-02-14",
    "plotSqft": 174240
  },
  {
    "id": "MP-1018",
    "slug": "assagao-field-house",
    "title": "Assagao Field House",
    "tagline": "A new house built to look like it has been there",
    "description": "Laterite walls, a clay tile roof, and a plan that opens completely to a paddy field on the north edge. Three bedrooms, a plunge pool, and a covered outdoor kitchen.",
    "price": 385000,
    "deal": "rent",
    "category": "villa",
    "bedrooms": 3,
    "bathrooms": 4,
    "areaSqft": 2900,
    "facing": "N",
    "floors": 1,
    "yearBuilt": 2022,
    "address": {
      "locality": "Assagao",
      "city": "North Goa",
      "state": "Goa",
      "pincode": "403507",
      "lat": 15.602,
      "lng": 73.771
    },
    "amenities": [
      "Private pool",
      "Home theatre",
      "Solar array",
      "Rainwater harvesting",
      "Garden",
      "Covered parking"
    ],
    "sheet": 6,
    "agent": {
      "name": "Farah Sheikh",
      "firm": "AKRADHI Coastal",
      "phone": "+91 90300 74412"
    },
    "status": "approved",
    "featured": false,
    "views": 471,
    "listedAt": "2026-01-26",
    "plotSqft": 9000
  },
  {
    "id": "MP-1019",
    "slug": "jubilee-hills-studio",
    "title": "Jubilee Hills Studio",
    "tagline": "One room, arranged well",
    "description": "A single-volume studio of nine hundred square feet with a sleeping mezzanine. Suits a pied-à-terre; the building takes care of everything else.",
    "price": 62000,
    "deal": "rent",
    "category": "apartment",
    "bedrooms": 1,
    "bathrooms": 1,
    "areaSqft": 900,
    "facing": "SE",
    "floors": 1,
    "yearBuilt": 2018,
    "address": {
      "locality": "Jubilee Hills",
      "city": "Hyderabad",
      "state": "Telangana",
      "pincode": "500033",
      "lat": 17.431,
      "lng": 78.405
    },
    "amenities": [
      "Clubhouse",
      "Power backup",
      "Sky lounge",
      "Gym",
      "EV charging"
    ],
    "sheet": 7,
    "agent": {
      "name": "Devansh Mehta",
      "firm": "AKRADHI Land Desk",
      "phone": "+91 89770 60931"
    },
    "status": "pending",
    "featured": false,
    "views": 2161,
    "listedAt": "2026-04-23"
  },
  {
    "id": "MP-1020",
    "slug": "plot-7-rushikonda-ridge",
    "title": "Plot 7, Rushikonda Ridge",
    "tagline": "The last uphill plot with an unbroken sea line",
    "description": "Eight thousand square feet on the ridge, with the sea to the east and the hill behind. Layout approved, road and power at the boundary.",
    "price": 21500000,
    "deal": "sale",
    "category": "plot",
    "bedrooms": 0,
    "bathrooms": 0,
    "areaSqft": 8000,
    "facing": "E",
    "floors": 0,
    "yearBuilt": 2024,
    "address": {
      "locality": "Rushikonda",
      "city": "Visakhapatnam",
      "state": "Andhra Pradesh",
      "pincode": "530045",
      "lat": 17.783,
      "lng": 83.386
    },
    "amenities": [
      "Gated layout",
      "Compound wall",
      "Water connection",
      "Underground drainage",
      "Avenue plantation"
    ],
    "sheet": 8,
    "agent": {
      "name": "Nivedita Menon",
      "firm": "AKRADHI Commercial",
      "phone": "+91 94470 22608"
    },
    "status": "approved",
    "featured": false,
    "views": 5483,
    "listedAt": "2026-04-16",
    "plotSqft": 8000
  },
  {
    "id": "MP-1021",
    "slug": "hebbal-courtyard-unit-2",
    "title": "Hebbal Courtyard, Unit 2",
    "tagline": "Two bedrooms around a light well",
    "description": "A small apartment planned around a double-height light well, so both bedrooms and the kitchen borrow daylight. Efficient, quiet, and cheap to run.",
    "price": 54000,
    "deal": "rent",
    "category": "apartment",
    "bedrooms": 2,
    "bathrooms": 2,
    "areaSqft": 1240,
    "facing": "NW",
    "floors": 1,
    "yearBuilt": 2021,
    "address": {
      "locality": "Hebbal",
      "city": "Bengaluru",
      "state": "Karnataka",
      "pincode": "560024",
      "lat": 13.038,
      "lng": 77.592
    },
    "amenities": [
      "Gym",
      "Concierge",
      "Clubhouse",
      "Covered parking",
      "Lap pool"
    ],
    "sheet": 9,
    "agent": {
      "name": "Ananya Rao",
      "firm": "AKRADHI Private Office",
      "phone": "+91 98490 11204"
    },
    "status": "approved",
    "featured": false,
    "views": 2165,
    "listedAt": "2026-05-16"
  },
  {
    "id": "MP-1022",
    "slug": "villa-alcantara",
    "title": "Villa Alcantara",
    "tagline": "A Goan quinta with the original chapel intact",
    "description": "Nineteenth-century, restored over four years with lime plaster and salvaged timber. Five bedrooms, two acres of orchard, and a chapel that is still consecrated.",
    "price": 265000000,
    "deal": "sale",
    "category": "villa",
    "bedrooms": 5,
    "bathrooms": 6,
    "areaSqft": 7800,
    "facing": "W",
    "floors": 2,
    "yearBuilt": 1876,
    "address": {
      "locality": "Siolim",
      "city": "North Goa",
      "state": "Goa",
      "pincode": "403517",
      "lat": 15.631,
      "lng": 73.758
    },
    "amenities": [
      "Rainwater harvesting",
      "Boundary security",
      "Servant quarters",
      "Garden"
    ],
    "sheet": 10,
    "agent": {
      "name": "Karthik Iyer",
      "firm": "AKRADHI South",
      "phone": "+91 99000 55187"
    },
    "status": "rejected",
    "featured": false,
    "views": 2842,
    "listedAt": "2026-01-20",
    "plotSqft": 87120
  },
  {
    "id": "MP-1023",
    "slug": "banjara-retail-podium",
    "title": "Banjara Retail Podium",
    "tagline": "Street-level retail under a residential tower",
    "description": "Three units totalling six thousand square feet with independent entries and shared service access at the rear. Anchor tenant in place on the largest unit.",
    "price": 720000,
    "deal": "rent",
    "category": "commercial",
    "bedrooms": 0,
    "bathrooms": 5,
    "areaSqft": 6000,
    "facing": "N",
    "floors": 1,
    "yearBuilt": 2019,
    "address": {
      "locality": "Banjara Hills",
      "city": "Hyderabad",
      "state": "Telangana",
      "pincode": "500034",
      "lat": 17.418,
      "lng": 78.442
    },
    "amenities": [
      "Fibre backbone",
      "Basement parking",
      "Reception lobby",
      "Fire compliance",
      "Central HVAC",
      "Freight lift"
    ],
    "sheet": 11,
    "agent": {
      "name": "Farah Sheikh",
      "firm": "AKRADHI Coastal",
      "phone": "+91 90300 74412"
    },
    "status": "approved",
    "featured": false,
    "views": 941,
    "listedAt": "2026-04-16"
  },
  {
    "id": "MP-1024",
    "slug": "marine-drive-penthouse",
    "title": "Marine Drive Penthouse",
    "tagline": "The top two floors, and the roof above them",
    "description": "A duplex penthouse with a private roof terrace of two thousand square feet looking across the backwaters. Four bedrooms, a family room, and a lift that opens into the apartment.",
    "price": 88000000,
    "deal": "sale",
    "category": "apartment",
    "bedrooms": 4,
    "bathrooms": 5,
    "areaSqft": 4600,
    "facing": "SW",
    "floors": 2,
    "yearBuilt": 2022,
    "address": {
      "locality": "Marine Drive",
      "city": "Kochi",
      "state": "Kerala",
      "pincode": "682031",
      "lat": 9.984,
      "lng": 76.274
    },
    "amenities": [
      "Covered parking",
      "EV charging",
      "Clubhouse",
      "Gym",
      "Power backup",
      "Sky lounge"
    ],
    "sheet": 12,
    "agent": {
      "name": "Devansh Mehta",
      "firm": "AKRADHI Land Desk",
      "phone": "+91 89770 60931"
    },
    "status": "approved",
    "featured": true,
    "views": 4505,
    "listedAt": "2026-02-18"
  }
];

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

export function bySlug(slug: string) {
  return PROPERTIES.find((p) => p.slug === slug);
}
