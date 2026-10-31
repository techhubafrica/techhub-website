import { useState, useEffect } from "react";
import { teamDoreen, awardTop100, awardWhosWho } from "@/assets/photos";
import { techGuruAuditorium, techGuruPanel } from "@/assets/tech-guru";

export interface DoreenMediaItem {
  id: string;
  title: string;
  category: "Keynote" | "Award" | "Media Feature" | "TechTalk" | "Press";
  imageUrl: string;
  date: string;
  description: string;
  externalLink?: string;
}

export interface DoreenProfile {
  name: string;
  title: string;
  role: string;
  organization: string;
  photoUrl: string;
  usaPhone: string;
  ghanaPhone: string;
  email: string;
  location: string;
  headline: string;
  bioParagraphs: string[];
  boardRoles: string[];
  education: string[];
  mediaGallery: DoreenMediaItem[];
  lastUpdated?: string;
}

const STORAGE_KEY = "tha_doreen_profile_v1";

export const DEFAULT_DOREEN_PROFILE: DoreenProfile = {
  name: "Doreen Awuku-Agyeman",
  title: "Founder & Chief Executive Officer",
  role: "Founder & CEO",
  organization: "Tech Hub Africa LLC",
  photoUrl: teamDoreen,
  usaPhone: "+1 973 216 7869",
  ghanaPhone: "+233 550 425 321",
  email: "info@techhubafrica.org",
  location: "United States & Ghana",
  headline: "Transformational Leader & Visionary Entrepreneur Pioneering Africa's Tech Ecosystem",
  bioParagraphs: [
    "Doreen Awuku-Agyeman is a transformational leader and visionary entrepreneur, driving innovation and growth at the intersection of technology, business, and social impact. As the Founder and CEO of Tech Hub Africa LLC, she spearheads the company's mission to empower Africa's tech ecosystem and foster a vibrant, inclusive digital future.",
    "A seasoned executive with over 20 years of experience in the telecom and technology sectors, Doreen has held leadership roles at Verizon and Cox Communications. Her achievements include launching the world's first 5G services, developing innovative marketing strategies, and driving business growth through strategic partnerships and investments.",
    "Doreen serves on the Advisory Boards of the Harvard Business Review and the American National Advertisers Association (ANA). She is also the Regional Administrator for the International Central Gospel Church, North America Region, and holds leadership roles in Women in Technology, Cable, and Media (WITC), and the Holy Child School Past Students Association (HOPSA USA-Canada), where she serves as President.",
    "A passionate advocate for diversity, equity, and inclusion, Doreen has received recognition for her commitment to empowering underrepresented groups in tech. She has been featured in various industry publications and has spoken at conferences on topics such as innovation, leadership, and social impact.",
    "Doreen holds an MBA and dual master's degrees from the University of Maryland, a Stanford Advanced Project Management Certification from Stanford University, and a Bachelor of Science in Computer Networking.",
    "Under her leadership, Tech Hub Africa LLC is poised to revolutionize the African tech landscape, driving economic growth, social progress, and innovation."
  ],
  boardRoles: [
    "Advisory Board Member — Harvard Business Review (HBR)",
    "Advisory Board Member — American National Advertisers Association (ANA)",
    "President — HOPSA USA-Canada (Holy Child School Past Students Association)",
    "Regional Administrator — International Central Gospel Church (North America)",
    "Leadership Member — Women in Technology, Cable, and Media (WITC)"
  ],
  education: [
    "MBA & Dual Master's Degrees — University of Maryland",
    "Stanford Advanced Project Management Certification (SAPM) — Stanford University",
    "Bachelor of Science in Computer Networking"
  ],
  mediaGallery: [
    {
      id: "med-1",
      title: "Top 100 Magazine — Innovators & Founders",
      category: "Award",
      imageUrl: awardTop100,
      date: "2025 – 2026",
      description: "Recognized as a leading innovator driving transatlantic technology investment and tech education in Africa.",
      externalLink: "https://thetop100magazine.com"
    },
    {
      id: "med-2",
      title: "Marquis Who's Who in America Honoree",
      category: "Award",
      imageUrl: awardWhosWho,
      date: "2025",
      description: "Biographical honoree for transformative telecom leadership, 5G deployments, and philanthropic tech empowerment.",
    },
    {
      id: "med-3",
      title: "Keynote Address: The Augmented Continent",
      category: "Keynote",
      imageUrl: techGuruAuditorium,
      date: "Tech Guru Meetup 2026",
      description: "Keynote presentation at La Palm Royal Beach Hotel convening 300+ founders and investors on AI infrastructure in Africa.",
    },
    {
      id: "med-4",
      title: "Executive Panel: Life With AI vs Without AI",
      category: "TechTalk",
      imageUrl: techGuruPanel,
      date: "Executive Dialogue",
      description: "High-level debate exploring AI workforce readiness, education systems, and proprietary African software architectures.",
    }
  ]
};

export function getDoreenProfile(): DoreenProfile {
  if (typeof window === "undefined") return DEFAULT_DOREEN_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_DOREEN_PROFILE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_DOREEN_PROFILE, ...parsed };
  } catch {
    return DEFAULT_DOREEN_PROFILE;
  }
}

export function saveDoreenProfile(updates: Partial<DoreenProfile>): DoreenProfile {
  const current = getDoreenProfile();
  const next: DoreenProfile = {
    ...current,
    ...updates,
    lastUpdated: new Date().toISOString()
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("doreen-profile-updated", { detail: next }));
  } catch (err) {
    console.error("Failed to save Doreen profile to localStorage", err);
  }
  return next;
}

export function resetDoreenProfile(): DoreenProfile {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("doreen-profile-updated", { detail: DEFAULT_DOREEN_PROFILE }));
  } catch (err) {
    console.error("Failed to reset profile", err);
  }
  return DEFAULT_DOREEN_PROFILE;
}

export function useDoreenProfile() {
  const [profile, setProfile] = useState<DoreenProfile>(getDoreenProfile);

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<DoreenProfile>;
      if (custom.detail) {
        setProfile(custom.detail);
      } else {
        setProfile(getDoreenProfile());
      }
    };

    window.addEventListener("doreen-profile-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("doreen-profile-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return {
    profile,
    updateProfile: saveDoreenProfile,
    resetProfile: resetDoreenProfile
  };
}
