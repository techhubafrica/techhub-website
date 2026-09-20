import audience from "./tech-guru-9339.webp.asset.json";
import auditorium from "./tech-guru-9384.webp.asset.json";
import celebration from "./tech-guru-9504.webp.asset.json";
import keynote from "./tech-guru-9207.webp.asset.json";
import community from "./tech-guru-9598.webp.asset.json";

const url = (asset: { url: string }) => asset.url;

export const techGuruAudience = url(audience);
export const techGuruAuditorium = url(auditorium);
export const techGuruCelebration = url(celebration);
export const techGuruKeynote = url(keynote);
export const techGuruCommunity = url(community);

export const techGuruGallery = [
  techGuruAudience,
  techGuruKeynote,
  techGuruCelebration,
  techGuruCommunity,
];