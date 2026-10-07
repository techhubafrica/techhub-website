/* ══════════════════════════════════════════════════════════════════════
 * Tech Hub Africa — Events Hub records
 * Vendored from https://events.techhubafrica.org/api/events/list?filter=all
 * The feed sends no Access-Control-Allow-Origin header, so the browser cannot
 * read it at runtime; the records are bundled instead and refreshed by hand.
 * Note: the feed lists the Corporate tier at GHS 2,000 — the published ticket
 * cards use the rate set by Tech Hub Africa (GH₵200).
 * ══════════════════════════════════════════════════════════════════════ */

import {
  eventTradeshow2026,
  eventMeetup2026,
  eventSeminar2026,
  eventPitch2026,
  eventMeetup2025,
  eventMeetup2024,
} from "@/assets/events-hub";

export type TicketGroup = {
  name: string;
  description: string;
  price: number;
  currency: string;
  isFree: boolean;
  priceLabel: string;
};

export type RegField = {
  id: string;
  label: string;
  type: "text" | "select" | "textarea" | "file" | "checkbox";
  required: boolean;
  options: string[];
};

export type HubEvent = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  date: string;
  dateLabel: string;
  time: string;
  venue: string;
  location: string;
  organizer: string;
  entryLabel: string;
  isPast: boolean;
  isFeatured: boolean;
  registrationOpen: boolean;
  paymentsEnabled: boolean;
  deadline: string;
  youtubeId: string;
  reach: string;
  expect: string[];
  tickets: TicketGroup[];
  fields: RegField[];
};

export const hubEvents: HubEvent[] = [
  {
    id: 6,
    slug: "the-hub-tradeshow-2026",
    title: "The Hub Tradeshow - 2026",
    summary: "Immersive Tech Showcase: Live experience of cutting-edge innovations from Tech Hub Africa and partners.",
    description: "## Key Highlights\n**Immersive Tech Showcase:** Live experience of cutting-edge innovations from Tech Hub Africa and partners.\n\n**Hackathon Finale:** Unveiling of solutions to 3 major national challenges.\n\n**REIMAGINED Panel:** High-level dialogue on Life With AI vs Life Without AI.\n\n**Pitch Competition:** Live pitch with $1,000 Angel Funding for the winner.\n\n**Strategic Networking:** Curated networking with founders, investors, and ecosystem leaders.\n\n## Objective\nTo foster collaboration, showcase Ghanaian innovation, and build scalable connections that accelerate Africa's digital economy.",
    image: eventTradeshow2026,
    date: "2026-12-18",
    dateLabel: "Dec 18, 2026",
    time: "4:00 p.m.",
    venue: "La Palm Royal Beach Hotel",
    location: "Accra, Ghana",
    organizer: "Tech Hub Africa",
    entryLabel: "Registration open",
    isPast: false,
    isFeatured: false,
    registrationOpen: true,
    paymentsEnabled: false,
    deadline: "2026-11-30",
    youtubeId: "",
    reach: "Worldwide",
    expect: [
      "Immersive Tech Showcase \u2014 live innovations from Tech Hub Africa and partners",
    ],
    tickets: [
      { name: "General Ticket Fee", description: "Standard admission", price: 0, currency: "GHS", isFree: true, priceLabel: "Free" },
      { name: "Student Ticket Fee", description: "Valid student ID required at the door", price: 0, currency: "GHS", isFree: true, priceLabel: "Free" },
      { name: "VIP Ticket Fee", description: "Priority seating and networking", price: 0, currency: "GHS", isFree: true, priceLabel: "Free" },
      { name: "Complimentary", description: "Free registration", price: 0, currency: "GHS", isFree: true, priceLabel: "Free" },
      { name: "Corporate Ticket Fee", description: "Corporate admission", price: 0, currency: "GHS", isFree: true, priceLabel: "Free" },
    ],
    fields: [
      { id: "status", label: "Select Your Status", type: "select", required: true, options: ["To Be A Vendor", "To Educate People", "To Recruit Others"] },
    ],
  },
  {
    id: 5,
    slug: "tech-guru-meetup-2026",
    title: "Tech Guru Meetup - 2026",
    summary: "The Augmented Continent: Where Africa Builds, Showcases & Scales The Future",
    description: "## Theme\nThe Augmented Continent: Where Africa Builds, Showcases & Scales The Future\n\n## Panel Discussion Topic\nReimagined: Life With AI vs. Life Without AI \u2014 The future of Work, School, Business and Creation in Africa.\n\n## Executive Summary\nTech Guru Meetup 2026: The Augmented Continent Edition is Tech Hub Africa's annual flagship tech networking event, convening over 300+ tech enthusiasts, innovators, founders, industry leaders, investors, and creatives.\n\n**Theme:** The Augmented Continent: Where Africa Builds, Showcases & Scales The Future \u2014 focused on the transformative role of AI, immersive technology, and homegrown innovation in Africa's development.\n\n**Date & Venue:** Friday, 18th December, 2026 | 4:00 PM | La Palm Royal Beach Hotel, Accra, Ghana.\n\n## Key Highlights\n**Immersive Tech Showcase:** Live experience of cutting-edge innovations from Tech Hub Africa and partners.\n\n**Hackathon Finale:** Unveiling of solutions to 3 major national challenges.\n\n**REIMAGINED Panel:** High-level dialogue on Life With AI vs Life Without AI.\n\n**Pitch Competition:** Live pitch with $1,000 Angel Funding for the winner.\n\n**Strategic Networking:** Curated networking with founders, investors, and ecosystem leaders.\n\n## Objective\nTo foster collaboration, showcase Ghanaian innovation, and build scalable connections that accelerate Africa's digital economy.",
    image: eventMeetup2026,
    date: "2026-12-18",
    dateLabel: "Dec 18, 2026",
    time: "4:00 p.m. to 9:00 p.m.",
    venue: "La Palm Royal Beach Hotel",
    location: "1 Labadi Road, Accra, Ghana",
    organizer: "Tech Hub Africa",
    entryLabel: "Registration open",
    isPast: false,
    isFeatured: true,
    registrationOpen: true,
    paymentsEnabled: true,
    deadline: "2026-12-04",
    youtubeId: "",
    reach: "Worldwide",
    expect: [
      "Immersive Tech Showcase \u2014 live innovations from Tech Hub Africa and partners",
      "Hackathon Finale \u2014 solutions to 3 major national challenges",
      "REIMAGINED Panel \u2014 Life With AI vs Life Without AI",
      "Pitch Competition \u2014 $1,000 Angel Funding for the winner",
      "Strategic Networking with founders, investors, and ecosystem leaders",
    ],
    tickets: [
      { name: "General Ticket Fee", description: "Standard admission", price: 100, currency: "GHS", isFree: false, priceLabel: "GHS 100.00" },
      { name: "Student Ticket Fee", description: "Valid student ID required at the door", price: 50, currency: "GHS", isFree: false, priceLabel: "GHS 50.00" },
      { name: "VIP Ticket Fee", description: "Priority seating and networking", price: 250, currency: "GHS", isFree: false, priceLabel: "GHS 250.00" },
      { name: "Complimentary", description: "Free registration", price: 0, currency: "GHS", isFree: true, priceLabel: "Free" },
      { name: "Corporate Ticket Fee", description: "Corporate admission", price: 2000, currency: "GHS", isFree: false, priceLabel: "GHS 2,000.00" },
    ],
    fields: [
    ],
  },
  {
    id: 4,
    slug: "innovation-leadership-seminar-2026",
    title: "Innovation & Leadership Seminar - 2026",
    summary: "A high-energy seminar for founders, executives, and rising leaders shaping Africa's tech economy.",
    description: "A high-energy seminar for founders, executives, and rising leaders shaping Africa's tech economy.",
    image: eventSeminar2026,
    date: "2026-12-18",
    dateLabel: "Dec 18, 2026",
    time: "10:00 a.m. - 12:00 p.m.",
    venue: "La Palm Royal Beach Hotel",
    location: "1 Labadi Road, Accra, Ghana",
    organizer: "Tech Hub Africa",
    entryLabel: "Application opened",
    isPast: false,
    isFeatured: false,
    registrationOpen: true,
    paymentsEnabled: true,
    deadline: "2026-12-04",
    youtubeId: "",
    reach: "Worldwide",
    expect: [
      "Networking with Africa's tech community",
      "Talks and knowledge sharing",
      "Industry connections",
      "Opportunities to collaborate",
      "Community moments",
    ],
    tickets: [
      { name: "General Ticket Fee", description: "Standard admission", price: 100, currency: "GHS", isFree: false, priceLabel: "GHS 100.00" },
      { name: "Student Ticket Fee", description: "Valid student ID required at the door", price: 50, currency: "GHS", isFree: false, priceLabel: "GHS 50.00" },
      { name: "VIP Ticket Fee", description: "Priority seating and networking", price: 250, currency: "GHS", isFree: false, priceLabel: "GHS 250.00" },
      { name: "Complimentary", description: "Free registration", price: 0, currency: "GHS", isFree: true, priceLabel: "Free" },
      { name: "Corporate Ticket Fee", description: "Corporate admission", price: 2000, currency: "GHS", isFree: false, priceLabel: "GHS 2,000.00" },
    ],
    fields: [
      { id: "occupation", label: "Occupation/Role", type: "text", required: true, options: [] },
      { id: "describes_you", label: "What best describes you?", type: "select", required: true, options: ["Student Attendee", "Professional Attendee"] },
      { id: "topic", label: "Which topic interests you the most?", type: "select", required: true, options: ["AI-Driven Leadership", "Machine Learning for Social Impact", "Team Building & Leadership", "AI & Ethics", "Future Technology Trends"] },
      { id: "comments", label: "Additional Comments or Questions?", type: "textarea", required: false, options: [] },
    ],
  },
  {
    id: 3,
    slug: "startup-pitch-competition-2026",
    title: "Startup Pitch Competition - 2026",
    summary: "Showcase your venture to investors, mentors, and industry leaders across Africa.",
    description: "Showcase your venture to investors, mentors, and industry leaders across Africa.\n\n## Who should apply\n- Early-stage founders\n- Student innovators\n- Startup teams ready to pitch",
    image: eventPitch2026,
    date: "2026-12-18",
    dateLabel: "Dec 18, 2026",
    time: "4:00 p.m. to 9:00 p.m.",
    venue: "La Palm Royal Beach Hotel",
    location: "1 Labadi Road, Accra, Ghana",
    organizer: "Tech Hub Africa",
    entryLabel: "Application opened",
    isPast: false,
    isFeatured: false,
    registrationOpen: true,
    paymentsEnabled: false,
    deadline: "2026-09-20",
    youtubeId: "",
    reach: "Worldwide",
    expect: [
      "Networking with Africa's tech community",
      "Talks and knowledge sharing",
      "Industry connections",
      "Opportunities to collaborate",
      "Community moments",
    ],
    tickets: [
      { name: "General Ticket Fee", description: "Standard admission", price: 0, currency: "GHS", isFree: true, priceLabel: "Free" },
      { name: "Student Ticket Fee", description: "Valid student ID required at the door", price: 0, currency: "GHS", isFree: true, priceLabel: "Free" },
      { name: "VIP Ticket Fee", description: "Priority seating and networking", price: 0, currency: "GHS", isFree: true, priceLabel: "Free" },
      { name: "Complimentary", description: "Free registration", price: 0, currency: "GHS", isFree: true, priceLabel: "Free" },
      { name: "Corporate Ticket Fee", description: "Corporate admission", price: 0, currency: "GHS", isFree: true, priceLabel: "Free" },
    ],
    fields: [
      { id: "pitch_topic", label: "Startup Pitch Topic", type: "text", required: true, options: [] },
      { id: "age_18", label: "Are you 18 years of age or above?", type: "select", required: true, options: ["Yes", "No"] },
      { id: "pitch_document", label: "Upload your document", type: "file", required: true, options: [] },
      { id: "why_considered", label: "Why Should you be Considered?", type: "textarea", required: true, options: [] },
      { id: "consent", label: "Check the box to acknowledge your consent.", type: "checkbox", required: true, options: [] },
    ],
  },
  {
    id: 7,
    slug: "tech-guru-meetup-2025",
    title: "Tech Guru Meetup - 2025",
    summary: "Highlights from Tech Guru Meetup 2025 \u2014 community, talks, and connections across Accra.",
    description: "Highlights from Tech Guru Meetup 2025 \u2014 community, talks, and connections across Accra.",
    image: eventMeetup2025,
    date: "2025-12-19",
    dateLabel: "Dec 19, 2025",
    time: "4:00 p.m. to 9:00 p.m.",
    venue: "La Palm Royal Beach Hotel",
    location: "1 Labadi Road, Accra, Ghana",
    organizer: "Tech Hub Africa",
    entryLabel: "Event ended",
    isPast: true,
    isFeatured: false,
    registrationOpen: false,
    paymentsEnabled: false,
    deadline: "2025-12-01",
    youtubeId: "6IM6rxiudjQ",
    reach: "Worldwide",
    expect: [
      "Networking with founders, builders and mentors",
      "Lightning talks from practitioners",
      "Industry connections and community announcements",
      "Opportunities to meet partners and hiring teams",
    ],
    tickets: [
    ],
    fields: [
    ],
  },
  {
    id: 8,
    slug: "tech-guru-meetup-2024",
    title: "Tech Guru Meetup - 2024",
    summary: "Highlights from Tech Guru Meetup 2024.",
    description: "Highlights from Tech Guru Meetup 2024.",
    image: eventMeetup2024,
    date: "2024-12-20",
    dateLabel: "Dec 20, 2024",
    time: "4:00 p.m. to 9:00 p.m.",
    venue: "La Palm Royal Beach Hotel",
    location: "1 Labadi Road, Accra, Ghana",
    organizer: "Tech Hub Africa",
    entryLabel: "Event ended",
    isPast: true,
    isFeatured: false,
    registrationOpen: false,
    paymentsEnabled: false,
    deadline: "2024-12-02",
    youtubeId: "TV5LNZHhSXg",
    reach: "Worldwide",
    expect: [
      "Networking with founders, builders and mentors",
      "Lightning talks from practitioners",
      "Industry connections and community announcements",
      "Opportunities to meet partners and hiring teams",
    ],
    tickets: [
    ],
    fields: [
    ],
  },
];

export const upcomingEvents = hubEvents.filter((e) => !e.isPast);
export const pastEvents = hubEvents.filter((e) => e.isPast);
export const featuredEvent = hubEvents.find((e) => e.isFeatured) ?? upcomingEvents[0];

/** Lowest paid ticket, or 0 when every tier is complimentary. */
export const lowestTicket = (e: HubEvent) => {
  const paid = e.tickets.filter((t) => !t.isFree).map((t) => t.price);
  return paid.length ? Math.min(...paid) : 0;
};

/** "GH₵50" / "Free" — never a bare number. */
export const priceLine = (e: HubEvent) => {
  const p = lowestTicket(e);
  return p ? `From GH₵${p.toLocaleString()}` : "Free";
};

export const EVENT_CONTACT = "events@techhubafrica.org";
