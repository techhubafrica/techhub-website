import tradeshow2026 from "./tradeshow-2026.webp.asset.json";
import meetup2026 from "./meetup-2026.webp.asset.json";
import seminar2026 from "./seminar-2026.webp.asset.json";
import pitch2026 from "./pitch-2026.webp.asset.json";
import meetup2025 from "./meetup-2025.webp.asset.json";
import meetup2024 from "./meetup-2024.webp.asset.json";

const CDN_BASE = "https://d4a8a1c6-054e-44fe-b6e5-31579c478a0c.lovableproject.com";
const url = (asset: { url: string }) =>
  asset.url.startsWith("/__l5e") ? `${CDN_BASE}${asset.url}` : asset.url;

export const eventTradeshow2026 = url(tradeshow2026);
export const eventMeetup2026 = url(meetup2026);
export const eventSeminar2026 = url(seminar2026);
export const eventPitch2026 = url(pitch2026);
export const eventMeetup2025 = url(meetup2025);
export const eventMeetup2024 = url(meetup2024);
