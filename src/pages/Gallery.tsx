import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { techGuruGallery } from "@/assets/tech-guru";
import { readSiteImages } from "@/data/siteContentStore";

interface GalleryItem { src: string; caption: string; }

const Gallery = () => {
  // Merge CEO-uploaded images (first) with built-in tech guru photos
  const cmsImages = readSiteImages("gallery").map((i) => ({ src: i.src, caption: i.caption }));
  const builtIn: GalleryItem[] = techGuruGallery.map((src, i) => ({ src, caption: `Tech Guru Meetup 2025 — photograph ${i + 1}` }));
  const allImages: GalleryItem[] = [...cmsImages, ...builtIn];

  const [open, setOpen] = useState<number | null>(null);
  const step = useCallback((direction: number) => {
    setOpen((index) => index === null ? null : (index + direction + allImages.length) % allImages.length);
  }, [allImages.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 sm:pt-40">
        <section className="container mx-auto px-5 sm:px-6 lg:px-10 pb-12">
          <Button asChild variant="link" className="px-0 mb-8">
            <Link to="/"><ArrowLeft /> Back to main page</Link>
          </Button>
          <div className="flex items-center gap-2 text-xs uppercase font-semibold text-accent"><Camera className="h-4 w-4" /> Corporate archive</div>
          <h1 className="mt-5 font-display text-4xl sm:text-6xl font-bold leading-tight">Tech Guru Meetup <span className="text-accent">2025</span></h1>
          <p className="mt-5 max-w-xl text-muted-foreground">Business connections, innovation showcases and the people behind Tech Hub Africa.</p>
          <div className="mt-8 border-y border-border py-6 flex flex-wrap items-center justify-between gap-5">
            <h2 className="font-display text-lg font-semibold">Tech4ALL student &amp; campus photographs</h2>
            <Button asChild variant="outline">
              <a href="https://tech4all.techhubafrica.org/gallery" target="_blank" rel="noopener noreferrer">View Tech4ALL gallery <ArrowUpRight /></a>
            </Button>
          </div>
        </section>
        <section aria-label="Gallery photographs" className="container mx-auto px-5 sm:px-6 lg:px-10 pb-20">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
            {allImages.map((item, index) => (
              <Button key={`${item.src}-${index}`} variant="ghost" onClick={() => setOpen(index)} aria-label={`Open gallery photo: ${item.caption}`} className="mb-5 block w-full h-auto p-0 overflow-hidden rounded-lg">
                <img src={item.src} alt={item.caption} loading={index < 3 ? "eager" : "lazy"} className="w-full h-auto" />
              </Button>
            ))}
          </div>
          <Button asChild variant="link" className="mt-8 px-0"><Link to="/"><ArrowLeft /> Back to main page</Link></Button>
        </section>
      </main>
      <Dialog open={open !== null} onOpenChange={(value) => { if (!value) setOpen(null); }}>
        <DialogContent aria-describedby={undefined} className="max-w-5xl w-[calc(100%-2rem)] p-4 sm:p-6 z-[100]">
          <DialogTitle className="pr-8 font-display">{open !== null ? allImages[open].caption : "Gallery"}</DialogTitle>
          {open !== null && <img src={allImages[open].src} alt={allImages[open].caption} className="w-full max-h-[70vh] object-contain" />}
          <div className="flex items-center justify-between">
            <Button variant="outline" size="icon" aria-label="Previous photograph" onClick={() => step(-1)}><ArrowLeft /></Button>
            <span className="text-sm text-muted-foreground">{open === null ? 0 : open + 1} / {allImages.length}</span>
            <Button variant="outline" size="icon" aria-label="Next photograph" onClick={() => step(1)}><ArrowRight /></Button>
          </div>
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
};

export default Gallery;