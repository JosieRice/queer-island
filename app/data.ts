/**
 * 🛑 Our temporary fake database
 */

import { matchSorter } from "match-sorter";
// import invariant from "tiny-invariant";
import { sortByName } from "./utils/sortByName";

type Sport =
    | "soccer"
    | "basketball"
    | "softball"
    | "cycling"
    | "skate boarding"
    | "fitness"
    | "yoga"
    | "running"
    | "walking"
    | "unknown";

type SkillLevel = "all" | "varies";

type Category = "ball sports" | "wheels" | "gym" | "studio" | "fitness";

type ContactMutation = {
    id: string;
    name: string;
    primarySport: Sport;
    instagram?: string;
    website?: string;
    accessibilityNotes: string[];
    description: string;
    when: string;
    where: string;
    // okayToCheer?: boolean;
    skillLevels: SkillLevel[];
    categories: Category[];
};

export type ContactRecord = ContactMutation & {
    // id: string;
    createdAt: string;
};

/**
 * This is just a fake DB table. At some point we'll need a real db or
 * fetching from an existing API.
 */
const sportsDB = {
    records: {} as Record<string, ContactRecord>,

    async getAll(): Promise<ContactRecord[]> {
        return Object.keys(sportsDB.records)
            .map((key) => sportsDB.records[key])
            .sort(sortByName);
    },

    async get(id: string): Promise<ContactRecord | null> {
        return sportsDB.records[id] || null;
    },

    async create(values: ContactMutation): Promise<ContactRecord> {
        const id = values.id || Math.random().toString(36).substring(2, 9);
        const createdAt = new Date().toISOString();
        const newContact = { createdAt, ...values, id };
        sportsDB.records[id] = newContact;
        return newContact;
    },

    // async set(id: string, values: ContactMutation): Promise<ContactRecord> {
    //   const contact = await sportsDB.get(id);
    //   invariant(contact, `No contact found for ${id}`);
    //   const updatedContact = { ...contact, ...values };
    //   sportsDB.records[id] = updatedContact;
    //   return updatedContact;
    // },

    // destroy(id: string): null {
    //   delete sportsDB.records[id];
    //   return null;
    // },
};

/**
 * Handful of helper functions to be called from route loaders and actions
 * @param query
 * @returns
 */
export async function getSports(query?: string | null) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    let sports = await sportsDB.getAll();
    if (query) {
        sports = matchSorter(sports, query, {
            keys: ["name", "primarySport"],
        });
    }
    return sports.sort(sortByName);
}

// export async function createEmptyContact() {
//   const contact = await sportsDB.create({});
//   return contact;
// }

export async function getSport(id: string) {
    return sportsDB.get(id);
}

// export async function updateContact(id: string, updates: ContactMutation) {
//   const contact = await sportsDB.get(id);
//   if (!contact) {
//     throw new Error(`No contact found for ${id}`);
//   }
//   await sportsDB.set(id, { ...contact, ...updates });
//   return contact;
// }

// export async function deleteContact(id: string) {
//   sportsDB.destroy(id);
// }

const sports: ContactMutation[] = [
    {
        name: "Queer Soccer",
        primarySport: "soccer",
        instagram: "https://www.instagram.com/queersoccervic/",
        categories: ["ball sports"],
        description: "pick up soccer",
        when: "Every Saturday 2:30-4:30, all year. Drop-in. Message the instagram page to confirm, sometimes soccer is cancelled if there are not enough people planning to go.",
        where: "David Spencer field",
        // who: "queer, dyke/lesbian, bi women, trans and non-binary adults",
        skillLevels: ["all"],
        // okayToCheer: true,
        // cost: '0',
        accessibilityNotes: [
            "Sidelines crew (non-playing) members welcome.",
            "Ground at the field is somewhat uneven but flat.",
            "Gendered bathrooms nearby",
            "Street parking adjacent to the field",
        ],
        id: "1",
    },
    {
        name: "South Island Basketball",
        primarySport: "basketball",
        instagram:
            "https://www.instagram.com/southislandbasketball?igsh=a3kxMTcxd3hhMXpx",
        description: "Drop-in basketball ",
        when: "Tuesdays 7-9 PM",
        where: "Naden Athletic Centre",
        // Who: Women, trans, and non-binary folx 16+
        // Level of play: All abilities
        // Cost: ~$6/session
        categories: ["ball sports"],
        id: "2",
        skillLevels: ["all"],
        accessibilityNotes: [
            "Bring a form of ID, as you will be asked to enter Naden",
        ],
    },
    {
        name: "The Gay Agenda",
        primarySport: "softball",
        description:
            "tGA is an inclusive recreational queer softball team that plays in a mixed gender league",
        // Tgavictoria@gmail.com
        when: "Spring 2025 *depending on player interest* ",
        where: "Variable",
        // Who: Queer identifying adults of all genders
        // Level of play: Recreational
        // Cost: Variable with fundraising opportunities
        categories: ["ball sports"],
        id: "3",
        skillLevels: ["all"],
        accessibilityNotes: [],
    },
    {
        name: "Victoria Pride Ride",
        instagram: "https://www.instagram.com/vicprideride/",
        primarySport: "cycling",
        categories: ["wheels"],
        description: "Bike riding events",
        when: "Variable",
        where: "Variable",
        // Who: lgbtqia2s+ & allies
        // Cost: Free
        id: "4",
        skillLevels: ["varies"],
        accessibilityNotes: [
            "All types of bike welcome",
            "Rides are marked on a 3-level system",
        ],
    },
    {
        name: "Victoria Queer Skate",
        instagram:
            "https://www.instagram.com/victoriaqueerskate?igsh=ZHdhaG1saXltN215",
        primarySport: "skate boarding",
        categories: ["wheels"],
        id: "5",
        skillLevels: [],
        accessibilityNotes: [],
        description: "drop in skating events at skate parks",
        when: "biweekly evenings (check IG for details)",
        where: "Topaz Park",
        // Who: Queer and marginalized skaters
        // Cost: Free
    },
    {
        name: "Queer Strength",
        primarySport: "fitness",
        id: "6",
        skillLevels: ["all"],
        categories: ["gym"],
        accessibilityNotes: ["be prepared for an indoor or outdoor class"],
        website: "https://www.thirdspacemvmt.com/queer-strength",
        description: "strength class (45 minutes)",
        when: "Variable - schedule on website",
        where: "721 Kings road",
        // Who: members of the LGBTQIA2S+ community and their allies
        // Level of play: No experience required
        // Cost: $5/session, contact them if cost is a barrier
    },
    {
        name: "Queer Yoga",
        primarySport: "yoga",
        id: "7",
        skillLevels: [],
        categories: ["studio"],
        accessibilityNotes: [],
        website: "https://www.danie.gay/",
        description: "yoga classes (1 hour). Drop-in",
        when: "Variable - schedule on website",
        where: "Variable",
        // Cost: Free or by donation
    },
    {
        name: "Vic Queer Run Club",
        instagram:
            "https://www.instagram.com/vicqueerrunclub?igsh=aW0xNXFzcml3aXU4",
        primarySport: "running",
        id: "8",
        skillLevels: [],
        categories: ["fitness"],
        accessibilityNotes: [],
        description: "running club for Two-Spirit and queer people",

        when: "Mondays at 6pm",
        where: "variable, check Strava page at the link on IG",
        // Who: Two-Spirit and queer people
        // Cost: free
    },
    {
        name: "Prime Timers Victoria",
        primarySport: "walking",
        id: "9",
        skillLevels: [],
        categories: ["fitness"],
        accessibilityNotes: [],
        website: "https://primetimersvictoria.weebly.com/calendar.html",
        description:
            "Social organization for gay, bi, and trans men. Includes walking groups and other physical activities",
        when: "Variable - schedule on website",
        where: "unknown",
        // Cost: $30 yearly membership
    },
    // Outdoors
    {
        name: "Open Outdoors",
        instagram: "https://www.instagram.com/open.outdoors/",
        primarySport: "unknown",
        id: "10",
        skillLevels: [],
        categories: [],
        accessibilityNotes: [],
        description:
            "Queer led organization aimed at minimizing barriers to accessing and engaging in the outdoors industry. Has included a used gear library, workshops, and outdoor events.",
        when: "Variable",
        where: "Variable",
        // Who: People who have historically been excluded from the outdoors industry
        // Cost: Typically free
    },
    {
        name: "Queer Bird Club",
        instagram: "",
        primarySport: "unknown",
        id: "11",
        skillLevels: [],
        categories: [],
        accessibilityNotes: [],
        description: "Bird club",
        when: "Last weekend of every month, check instagram page for details",
        where: "Variable",
        // Who: queers and their allies
        // Cost: Free
    },
    {
        name: "Big Kids Play",
        instagram: "",
        primarySport: "unknown",
        id: "12",
        skillLevels: ["all"],
        categories: [],
        accessibilityNotes: ["Detailed accessibility on their page"],
        description: "Queer adult forest play community",
        // https://www.facebook.com/people/Big-Kids/100092947794590/
        when: "Variable. Registration required.",
        where: "Variable",
        // Who: Queer adults
        // Cost: $25-55 per session, 15% off if you register for all 4 sessions. Compassionate pricing options, no one turned away for lack of funds.
    },
    {
        name: "Out in the Woods Vancouver Island",
        instagram: "https://www.instagram.com/outinthewoodsvi/",
        primarySport: "unknown",
        id: "13",
        skillLevels: ["varies"],
        categories: [],
        accessibilityNotes: [],
        description: "Queer hiking group",
        when: "Variable",
        where: "Variable",
        // Who: All genders
        // Cost: Free
    },
    // Other Sports
    {
        name: "GOATS Climbing",
        instagram: "https://www.instagram.com/goats.climb/",
        primarySport: "unknown",
        id: "14",
        skillLevels: [],
        categories: [],
        accessibilityNotes: [],
        description:
            "Queer climbing events and classes, as well as online community",
        when: "unknown",
        where: "Variable (mostly Boulderhouse Langford and Victoria, and Crag X)",
        // Who: All are welcome
        // Level of play: All levels
        // Cost: Drop-ins are typically the cost of admission to the climbing gym. Sometimes offer subsidized lessons.
    },
    {
        name: "Queer Boxing",
        instagram: "",
        primarySport: "unknown",
        id: "15",
        skillLevels: [],
        categories: [],
        accessibilityNotes: [],
        website: "https://fernwoodnrg.ca/events/queer-boxing/",
        description: "drop-in boxing fitness",
        when: "Tuesdays 7-8 PM",
        where: "Fernwood community centre",
        // Who: people who identify as queer
        // Cost: by donation
    },
    {
        name: "Queers Get Wet",
        instagram: "",
        primarySport: "unknown",
        id: "16",
        skillLevels: ["all"],
        categories: [],
        accessibilityNotes: [],
        description: "Facebook group sharing queer swims in Victoria",
        // https://www.facebook.com/groups/1577031539215113/
        when: "Variable",
        where: "Variable, often Gordon Head Pool and Crystal Pool",
        // Who: Typically trans, 2‐spirit and non‐binary community members and their friends and family
    },
    {
        name: "Queer Boxing Victoria BC",
        instagram: "",
        primarySport: "unknown",
        id: "17",
        skillLevels: [],
        categories: [],
        accessibilityNotes: [],
        description: "Private facebook group for queer boxing ",
        when: "unknown",
        where: "unknown",
        // https://www.facebook.com/groups/718429439274028
        // Please add more info if you are a member of this group!
    },
    {
        name: "Vancouver Island Queer Athletics Association",
        instagram: "",
        primarySport: "unknown",
        id: "18",
        skillLevels: [],
        categories: [],
        accessibilityNotes: [],
        website: "https://www.viqaa.info/",
        description: "Advocacy and grants to support 2SLGBTQIA+ youth",
        when: "unknown",
        where: "unknown",
    },
    {
        name: "UVIC Air",
        instagram: "",
        primarySport: "unknown",
        id: "19",
        skillLevels: ["all"],
        categories: [],
        accessibilityNotes: [],
        website: "https://vikesrec.ca/inclusion-accessibility/air",
        description:
            "Inclusive recreation events (eg climbing, dance, swimming) in collaboration with the 5 UVSS advocacy groups (including GEM and Pride)",
        when: "variable",
        where: "unknown",
        // Who: UVic students/community members served by the UVSS advocacy groups
        // Cost: Often free to uvic students
    },
];

sports.forEach((sport) => {
    sportsDB.create({
        ...sport,
        id: sport.id,
    });
});

// Still to add

// Sports not specifically geared towards queer population, but with active inclusion and community endorsement
// Power to Be
// https://powertobe.ca/
// What: Accessible outdoor recreation programming
// When: Variable
// Where: Variable
// Who: Youth, families, and adults facing cognitive, physical, financial, and/or social barriers
// Cost: ~$15/session with bursaries available

// Island Circus Space
// https://www.islandcircusspace.com/
// What: Circus classes
// When: Variable
// Where: 3-625 Hillside
// Who: Everyone
// Level of play: Variable
// Cost: Variable

// Eves of Destruction
// https://eod-rollerderby.squarespace.com/about-us
// What: Roller derby
// When: Variable
// Where: Archie Browning

// Found Off the Grid
// https://www.instagram.com/foundoffthegrid/
// What: UVic club organizing outdoor and recreation activities (e.g., climbing and hikes) and offering a free gear library
// When: Variable
// Where: Variable
// Who: Everyone
// Cost: Free

// BOOBS (Babes On and Off Boards)
// https://www.instagram.com/babes.on.and.off.boards/
// What: Skateboard meet-ups
// When: Variable
// Where: Variable
// Cost: Free
// Level of play: all
// Who: All

// Archive - Sport events that have finished (please let us know if they’re back on!)
// Pride on the Water
// https://www.instagram.com/gorgenarrows?igsh=MTVydTRmMTlxbG13cQ==
// What: 8 week rowing program
// When: Tuesdays 6-8 from June 18 to august 6. Drop-in, but must register
// Where: 105-2940 Jutland road (and the Gorge)
// Who: 18+
// Level of play: no experience necessary. Must be comfortable being submerged in water.
// Cost: $53.25 if not a member

// WYLD 2sLGBTQIA+ and Allied Teens Backpacking Camp
// https://strathconaparklodge.com/youth-programs/wyld-expeditions-camps/?fbclid=IwZXh0bgNhZW0CMTAAAR3X0kVYrsWIS8kAmhgiZ3pR5rC--8i8uqUh_iJ2up73z6XyGkzA_EUqZIQ_aem_ZmFrZWR1bW15MTZieXRlcw
// What: 5-day backpacking camp for youth
// When: August 19-23 2024
// Where: Strathcona Park Lodge
// Who: 2SLGBTQIA+ teens and allies (age 14-17)
// Cost: $1160

// Summer 2024 Outdoor Hoops
// https://www.instagram.com/southislandbasketball?igsh=a3kxMTcxd3hhMXpx
// What: Pick-up basketball
// When: Select Sundays 5:30-7:30 PM, May-August. Drop-in
// Where: Crystal Pool outdoor courts
// Who: 1st Sunday of each month is for queer individuals, 3rd and 5th Sunday of each month is for all women, trans, and non-binary individuals
// Cost: $2-5/session, if cost is a barrier you are still encouraged to come without paying
// Accessibility notes: Also encouraging a cheering section on the benches.
