import {
  shotGhanamall,
  shotGhanafeed,
  shotThreatlock,
  shotVinisee,
  shotDiaspocare,
  shotRablebakes,
} from "@/assets/portfolio-shots";

export interface ClientWebsite {
  id: string;
  name: string;
  category: "E-Commerce" | "Media & Publishing" | "Cybersecurity" | "Logistics & Freight" | "FinTech & Health" | "Events & Ticketing" | "Food & Bakery" | "EdTech & Impact";
  description: string;
  url: string;
  displayUrl: string;
  tags: string[];
  image?: string;
  featured?: boolean;
}

export const clientWebsites: ClientWebsite[] = [
  {
    id: "ghana-mall",
    name: "Ghana Mall Online",
    category: "E-Commerce",
    description: "Multi-vendor digital marketplace enabling West African merchants to list, sell, and ship products continent-wide.",
    url: "https://ghanamallonline.com",
    displayUrl: "GhanaMallonline.com",
    tags: ["E-Commerce", "Payment Gateway", "Multi-Vendor", "React"],
    image: shotGhanamall,
    featured: true,
  },
  {
    id: "ghana-feed",
    name: "GhanaFeed",
    category: "Media & Publishing",
    description: "High-traffic African news and media publishing platform delivering real-time journalism and entertainment trends.",
    url: "https://ghanafeed.com",
    displayUrl: "ghanafeed.com",
    tags: ["Media Portal", "High Traffic", "CMS", "SEO Optimized"],
    image: shotGhanafeed,
    featured: true,
  },
  {
    id: "rable-bakes",
    name: "Rable Bakes",
    category: "Food & Bakery",
    description: "Custom e-commerce ordering experience for artisanal bakery and event confectionery with instant custom quotes.",
    url: "https://www.rablebakes.co.ke/",
    displayUrl: "rablebakes.co.ke",
    tags: ["E-Commerce", "Food Tech", "Custom Ordering", "Kenya"],
    image: shotRablebakes,
    featured: true,
  },
  {
    id: "threat-lock",
    name: "Threat Lock Security",
    category: "Cybersecurity",
    description: "AI-driven Web Application Firewall (WAF) and 24/7 threat monitoring engine protecting enterprise infrastructure.",
    url: "https://threatlock.techhubafrica.org/index",
    displayUrl: "threatlock.techhubafrica.org",
    tags: ["Cybersecurity", "AI WAF", "Threat Detection", "DDoS Shield"],
    image: shotThreatlock,
    featured: true,
  },
  {
    id: "vinisee-movers",
    name: "Vinisee Movers",
    category: "Logistics & Freight",
    description: "Comprehensive moving, cargo, and freight logistics platform offering instant booking and fleet tracking across East Africa.",
    url: "https://www.vinisee-movers.co.ke/",
    displayUrl: "vinisee-movers.co.ke",
    tags: ["Logistics", "Fleet Tracking", "Booking System", "Kenya"],
    image: shotVinisee,
    featured: true,
  },
  {
    id: "vinisee-app",
    name: "Vinisee Cargo App",
    category: "Logistics & Freight",
    description: "Sleek web application for instant freight calculation, shipment dispatch, and customer portal management.",
    url: "https://vinisee.vercel.app/",
    displayUrl: "vinisee.vercel.app",
    tags: ["Web App", "Real-time Quotes", "Logistics", "Vercel"],
    image: shotVinisee,
    featured: false,
  },
  {
    id: "diaspo-care",
    name: "DiaspoCare",
    category: "FinTech & Health",
    description: "Diaspora health financing platform enabling Africans abroad to directly fund medical care and prescriptions for family back home.",
    url: "https://diaspocare.com",
    displayUrl: "diaspocare.com",
    tags: ["FinTech", "HealthTech", "Diaspora Payments", "Cross-Border"],
    image: shotDiaspocare,
    featured: true,
  },
];
