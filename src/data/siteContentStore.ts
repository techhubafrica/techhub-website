import { useState, useEffect } from "react";

/* ─── Types ─────────────────────────────────────────────────── */

export type ImageSection = "gallery" | "events" | "media";

export interface SiteImage {
  id: string;
  section: ImageSection;
  /** base64 data URL or a remote https:// URL */
  src: string;
  caption: string;
  date: string;
  tag?: string;
  externalLink?: string;
  addedAt: string;
}

export interface SiteContent {
  images: SiteImage[];
}

const STORAGE_KEY = "tha_site_content_v1";
const DEFAULT_CONTENT: SiteContent = { images: [] };

function load(): SiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as SiteContent;
  } catch {}
  return DEFAULT_CONTENT;
}

function save(content: SiteContent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(load);
  useEffect(() => { save(content); }, [content]);

  const addImage = (img: Omit<SiteImage, "id" | "addedAt">) => {
    const newImg: SiteImage = {
      ...img,
      id: `img-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      addedAt: new Date().toISOString(),
    };
    setContent((prev) => ({ images: [newImg, ...prev.images] }));
  };

  const removeImage = (id: string) =>
    setContent((prev) => ({ images: prev.images.filter((i) => i.id !== id) }));

  const bySection = (section: ImageSection) =>
    content.images.filter((i) => i.section === section);

  return { content, addImage, removeImage, bySection };
}

export function readSiteImages(section: ImageSection): SiteImage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return (JSON.parse(raw) as SiteContent).images.filter((i) => i.section === section);
  } catch {
    return [];
  }
}
