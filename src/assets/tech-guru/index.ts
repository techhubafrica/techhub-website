import audience from "./tech-guru-9339.webp.asset.json";
import auditorium from "./tech-guru-9384.webp.asset.json";
import celebration from "./tech-guru-9504.webp.asset.json";
import keynote from "./tech-guru-9207.webp.asset.json";
import community from "./tech-guru-9598.webp.asset.json";
import preparation from "./tech-guru-8832.webp.asset.json";
import networking from "./tech-guru-8955.webp.asset.json";
import showcase from "./tech-guru-9011.webp.asset.json";
import fullHouse from "./tech-guru-9248.webp.asset.json";
import panel from "./tech-guru-9292.webp.asset.json";
import awards from "./tech-guru-9460.webp.asset.json";
import interview from "./tech-guru-9555.webp.asset.json";
import team from "./tech-guru-9615.webp.asset.json";

const url = (asset: { url: string }) => asset.url;

export const techGuruAudience = url(audience);
export const techGuruAuditorium = url(auditorium);
export const techGuruCelebration = url(celebration);
export const techGuruKeynote = url(keynote);
export const techGuruCommunity = url(community);
export const techGuruPreparation = url(preparation);
export const techGuruNetworking = url(networking);
export const techGuruShowcase = url(showcase);
export const techGuruFullHouse = url(fullHouse);
export const techGuruPanel = url(panel);
export const techGuruAwards = url(awards);
export const techGuruInterview = url(interview);
export const techGuruTeam = url(team);

export const techGuruGallery = [
  techGuruAudience,
  techGuruKeynote,
  techGuruCelebration,
  techGuruCommunity,
  techGuruPreparation,
  techGuruNetworking,
  techGuruShowcase,
  techGuruFullHouse,
  techGuruPanel,
  techGuruAwards,
  techGuruInterview,
  techGuruTeam,
];