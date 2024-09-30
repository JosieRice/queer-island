/**
 * 🛑 Our temporary fake database
 */

import { matchSorter } from "match-sorter";
// import invariant from "tiny-invariant";
import { sortByName } from "./utils/sortByName";

type Sport =
    | "basketball"
    | "boxing"
    | "cycling"
    | "fitness"
    | "running"
    | "skate boarding"
    | "soccer"
    | "softball"
    | "unknown"
    | "walking"
    | "yoga";

type SkillLevel = "all" | "recreational" | "varies";

type Category =
    | "ball sports"
    | "climbing"
    | "dancing"
    | "fitness"
    | "gym"
    | "martial arts"
    | "outdoors"
    | "studio"
    | "swimming"
    | "wheels";

type ContactMutation = {
    accessibilityNotes: string[];
    categories: Category[];
    cost: string;
    description: string;
    id: string;
    instagram?: string;
    name: string;
    primarySport: Sport;
    skillLevels: SkillLevel[];
    website?: string;
    when: string;
    where: string;
    who: string;
};

export type ContactRecord = ContactMutation & {
    createdAt: string;
    id: string;
};

/**
 * This is just a fake DB table. At some point we'll need a real db or
 * fetching from an existing API.
 */
const sportsDB = {
    async create(values: ContactMutation): Promise<ContactRecord> {
        const id = values.id || Math.random().toString(36).substring(2, 9);
        const createdAt = new Date().toISOString();
        const newContact = { createdAt, ...values, id };
        sportsDB.records[id] = newContact;
        return newContact;
    },

    async get(id: string): Promise<ContactRecord | null> {
        return sportsDB.records[id] || null;
    },

    async getAll(): Promise<ContactRecord[]> {
        return Object.keys(sportsDB.records)
            .map((key) => sportsDB.records[key])
            .sort(sortByName);
    },

    records: {} as Record<string, ContactRecord>,

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
export async function getSports(query?: null | string) {
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
        accessibilityNotes: [
            "Sidelines crew (non-playing) members welcome.",
            "Ground at the field is somewhat uneven but flat.",
            "Gendered bathrooms nearby",
            "Street parking adjacent to the field",
        ],
        categories: ["ball sports"],
        cost: "0",
        description: "pick up soccer",
        id: "1",
        instagram: "https://www.instagram.com/queersoccervic/",
        name: "Queer Soccer",
        primarySport: "soccer",
        skillLevels: ["all"],
        when: "Every Saturday 2:30-4:30, all year. Drop-in. Message the instagram page to confirm, sometimes soccer is cancelled if there are not enough people planning to go.",
        where: "David Spencer field",
        who: "queer, dyke/lesbian, bi women, trans and non-binary adults",
    },
    {
        accessibilityNotes: [
            "Bring a form of ID, as you will be asked to enter Naden",
        ],
        categories: ["ball sports"],
        cost: "~$6/session",
        description: "Drop-in basketball ",
        id: "2",
        instagram:
            "https://www.instagram.com/southislandbasketball?igsh=a3kxMTcxd3hhMXpx",
        name: "South Island Basketball",
        primarySport: "basketball",
        skillLevels: ["all"],
        when: "Tuesdays 7-9 PM",
        where: "Naden Athletic Centre",
        who: "Women, trans, and non-binary folx 16+",
    },
    {
        accessibilityNotes: [],

        categories: ["ball sports"],
        cost: "Variable with fundraising opportunities",
        description:
            "tGA is an inclusive recreational queer softball team that plays in a mixed gender league",
        id: "3",
        name: "The Gay Agenda",
        primarySport: "softball",
        skillLevels: ["recreational", "all"],
        // Tgavictoria@gmail.com
        when: "Spring 2025 *depending on player interest* ",
        where: "Variable",
        who: "Queer identifying adults of all genders",
    },
    {
        accessibilityNotes: [
            "All types of bike welcome",
            "Rides are marked on a 3-level system",
        ],
        categories: ["wheels"],
        cost: "Free",
        description: "Bike riding events",

        id: "4",
        instagram: "https://www.instagram.com/vicprideride/",
        name: "Victoria Pride Ride",
        primarySport: "cycling",
        skillLevels: ["varies"],
        when: "Variable",
        where: "Variable",
        who: "lgbtqia2s+ & allies",
    },
    {
        accessibilityNotes: [],
        categories: ["wheels"],
        cost: "Free",
        description: "drop in skating events at skate parks",
        id: "5",
        instagram:
            "https://www.instagram.com/victoriaqueerskate?igsh=ZHdhaG1saXltN215",
        name: "Victoria Queer Skate",
        primarySport: "skate boarding",
        skillLevels: [],
        when: "biweekly evenings (check IG for details)",
        where: "Topaz Park",
        who: "Queer and marginalized skaters",
    },
    {
        accessibilityNotes: ["be prepared for an indoor or outdoor class"],
        categories: ["gym"],
        cost: "$5/session, contact them if cost is a barrier",
        description: "strength class (45 minutes), no experience required",
        id: "6",
        name: "Queer Strength",
        primarySport: "fitness",
        skillLevels: ["all"],
        website: "https://www.thirdspacemvmt.com/queer-strength",
        when: "Variable - schedule on website",
        where: "721 Kings road",
        who: "members of the LGBTQIA2S+ community and their allies",
    },
    {
        accessibilityNotes: [],
        categories: ["studio"],
        cost: "Free or by donation",
        description: "yoga classes (1 hour). Drop-in",
        id: "7",
        name: "Queer Yoga",
        primarySport: "yoga",
        skillLevels: [],
        website: "https://www.danie.gay/",
        when: "Variable - schedule on website",
        where: "Variable",
        who: "queer",
    },
    {
        accessibilityNotes: [],
        categories: ["fitness"],
        cost: "free",
        description: "running club for Two-Spirit and queer people",
        id: "8",
        instagram:
            "https://www.instagram.com/vicqueerrunclub?igsh=aW0xNXFzcml3aXU4",
        name: "Vic Queer Run Club",
        primarySport: "running",
        skillLevels: [],

        when: "Mondays at 6pm",
        where: "variable, check Strava page at the link on IG",
        who: "Two-Spirit and queer people",
    },
    {
        accessibilityNotes: [],
        categories: ["fitness"],
        cost: "$30 yearly membership",
        description:
            "Social organization for gay, bi, and trans men. Includes walking groups and other physical activities",
        id: "9",
        name: "Prime Timers Victoria",
        primarySport: "walking",
        skillLevels: [],
        website: "https://primetimersvictoria.weebly.com/calendar.html",
        when: "Variable - schedule on website",
        where: "unknown",
        who: "unknown",
    },
    {
        accessibilityNotes: [],
        categories: ["outdoors"],
        cost: "Typically free",
        description:
            "Queer led organization aimed at minimizing barriers to accessing and engaging in the outdoors industry. Has included a used gear library, workshops, and outdoor events.",
        id: "10",
        instagram: "https://www.instagram.com/open.outdoors/",
        name: "Open Outdoors",
        primarySport: "unknown",
        skillLevels: [],
        when: "Variable",
        where: "Variable",
        who: "People who have historically been excluded from the outdoors industry",
    },
    {
        accessibilityNotes: [],
        categories: ["outdoors"],
        cost: "Free",
        description: "Bird club",
        id: "11",
        instagram: "",
        name: "Queer Bird Club",
        primarySport: "unknown",
        skillLevels: [],
        when: "Last weekend of every month, check instagram page for details",
        where: "Variable",
        who: "queers and their allies",
    },
    {
        accessibilityNotes: ["Detailed accessibility on their page"],
        categories: ["outdoors"],
        cost: "$25-55 per session, 15% off if you register for all 4 sessions. Compassionate pricing options, no one turned away for lack of funds.",
        description: "Queer adult forest play community",
        id: "12",
        instagram: "",
        name: "Big Kids Play",
        primarySport: "unknown",
        skillLevels: ["all"],
        // https://www.facebook.com/people/Big-Kids/100092947794590/
        when: "Variable. Registration required.",
        where: "Variable",
        who: "Queer adults",
    },
    {
        accessibilityNotes: [],
        categories: ["outdoors"],
        cost: "Free",
        description: "Queer hiking group",
        id: "13",
        instagram: "https://www.instagram.com/outinthewoodsvi/",
        name: "Out in the Woods Vancouver Island",
        primarySport: "unknown",
        skillLevels: ["varies"],
        when: "Variable",
        where: "Variable",
        who: "All genders",
    },
    {
        accessibilityNotes: [],
        categories: ["climbing"],
        cost: "Drop-ins are typically the cost of admission to the climbing gym. Sometimes offer subsidized lessons.",
        description:
            "Queer climbing events and classes, as well as online community",
        id: "14",
        instagram: "https://www.instagram.com/goats.climb/",
        name: "GOATS Climbing",
        primarySport: "unknown",
        skillLevels: ["all"],
        when: "unknown",
        where: "Variable (mostly Boulderhouse Langford and Victoria, and Crag X)",
        who: "All are welcome",
    },
    {
        accessibilityNotes: [],
        categories: ["fitness"],
        cost: "by donation",
        description: "drop-in boxing fitness",
        id: "15",
        instagram: "",
        name: "Queer Boxing",
        primarySport: "unknown",
        skillLevels: [],
        website: "https://fernwoodnrg.ca/events/queer-boxing/",
        when: "Tuesdays 7-8 PM",
        where: "Fernwood community centre",
        who: "people who identify as queer",
    },
    {
        accessibilityNotes: [],
        categories: ["swimming"],
        cost: "unknown",
        description: "Facebook group sharing queer swims in Victoria",
        id: "16",
        instagram: "",
        name: "Queers Get Wet",
        primarySport: "unknown",
        skillLevels: ["all"],
        // https://www.facebook.com/groups/1577031539215113/
        when: "Variable",
        where: "Variable, often Gordon Head Pool and Crystal Pool",
        who: "Typically trans, 2‐spirit and non‐binary community members and their friends and family",
    },
    {
        accessibilityNotes: [],
        categories: ["martial arts"],
        cost: "unknown",
        description: "Private facebook group for queer boxing ",
        id: "17",
        instagram: "",
        name: "Queer Boxing Victoria BC",
        primarySport: "unknown",
        skillLevels: [],
        when: "unknown",
        where: "unknown",
        who: "unknown",
        // https://www.facebook.com/groups/718429439274028
    },
    {
        accessibilityNotes: [],
        categories: [],
        cost: "unknown",
        description: "Advocacy and grants to support 2SLGBTQIA+ youth",
        id: "18",
        instagram: "",
        name: "Vancouver Island Queer Athletics Association",
        primarySport: "unknown",
        skillLevels: [],
        website: "https://www.viqaa.info/",
        when: "unknown",
        where: "unknown",
        who: "unknown",
    },
    {
        accessibilityNotes: [],
        categories: ["climbing", "dancing", "swimming"],
        cost: "Often free to uvic students",
        description:
            "Inclusive recreation events (eg climbing, dance, swimming) in collaboration with the 5 UVSS advocacy groups (including GEM and Pride)",
        id: "19",
        instagram: "",
        name: "UVIC Air",
        primarySport: "unknown",
        skillLevels: ["all"],
        website: "https://vikesrec.ca/inclusion-accessibility/air",
        when: "variable",
        where: "unknown",
        who: "UVic students/community members served by the UVSS advocacy groups",
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
