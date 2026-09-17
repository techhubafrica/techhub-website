import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X, Camera, MapPin, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ktuAll } from "@/assets/ktu";

const CHUNK = 24;

const Gallery = () => {
  const [visible, setVisible] = useState(CHUNK);
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + ktuAll.length) % ktuAll.length)),
    []
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ---------- Editorial masthead ---------- */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground pt-36 pb-20 md:pt-44 md:pb-28">
        <div
          className="absolute inset-0 opacity-25 bg-cover bg-center"
          style={{ backgroundImage: `url(${ktuAll[0]})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/85 to-primary/60" />
        <div className="absolute -top-24 right-[-10%] h-[420px] w-[420px] rounded-full bg-accent/20 blur-[120px]" />
        <div className="relative container mx-auto px-5 sm:px-6 lg:px-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] backdrop-blur">
              <Camera className="h-3.5 w-3.5 text-accent" /> Event Archive
            </span>
            <h1 className="mt-7 font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">
              Tech Hub @ KTU
              <span className="block text-accent">Campus Tour 2026</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-primary-foreground/75 leading-relaxed">
              A full day inside Koforidua Technical University — tablet labs, VR demos, mentor
              circles and a few thousand watts of student energy. {ktuAll.length} curated frames.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="https://tech4all.techhubafrica.org/gallery"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-magnetic inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground hover:bg-white hover:text-foreground transition-all duration-300 shadow-lg"
              >
                Visit Tech4All Official Gallery <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-sm text-primary-foreground/70">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-accent" /> 25 June 2026
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" /> Koforidua Technical University
              </span>
              <span className="inline-flex items-center gap-2">
                <Camera className="h-4 w-4 text-accent" /> {ktuAll.length} photographs
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Masonry archive ---------- */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-28">
        <div className="container mx-auto px-5 sm:px-6 lg:px-10">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
            {ktuAll.slice(0, visible).map((src, i) => (
              <button
                key={src}
                onClick={() => setOpen(i)}
                className="group relative mb-5 block w-full overflow-hidden rounded-2xl border border-border bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <img
                  src={src}
                  alt={`Tech Hub Africa campus tour at KTU — frame ${i + 1}`}
                  loading={i < 6 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="pointer-events-none absolute bottom-4 left-4 translate-y-3 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  KTU · {String(i + 1).padStart(3, "0")}
                </span>
              </button>
            ))}
          </div>

          {visible < ktuAll.length && (
            <div className="mt-14 flex justify-center">
              <button
                onClick={() => setVisible((v) => v + CHUNK)}
                className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent"
              >
                Load more frames
                <span className="text-primary-foreground/60 group-hover:text-primary-foreground">
                  {visible}/{ktuAll.length}
                </span>
              </button>
            </div>
          )}

          <div className="mt-20 flex flex-wrap items-center justify-center gap-6 text-center">
            <a
              href="https://tech4all.techhubafrica.org/gallery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-accent hover:text-foreground transition-colors"
            >
              Explore Full Tech4All Gallery Portal <ArrowUpRight className="h-4 w-4" />
            </a>
            <span className="text-foreground/20 hidden sm:inline">•</span>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline-offset-4 hover:text-accent hover:underline"
            >
              See upcoming events <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Lightbox ---------- */}
      {open !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/95 backdrop-blur-xl animate-in fade-in"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 rounded-full border border-primary-foreground/20 p-3 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label="Previous"
            className="absolute left-3 md:left-8 rounded-full border border-primary-foreground/20 p-3 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <figure className="max-h-[86vh] max-w-[92vw]" onClick={(e) => e.stopPropagation()}>
            <img
              src={ktuAll[open]}
              alt={`Tech Hub Africa campus tour at KTU — frame ${open + 1}`}
              className="max-h-[80vh] w-auto rounded-xl shadow-2xl"
            />
            <figcaption className="mt-4 text-center text-xs uppercase tracking-[0.3em] text-primary-foreground/60">
              KTU Campus Tour 2026 · {String(open + 1).padStart(3, "0")} / {ktuAll.length}
            </figcaption>
          </figure>

          <button
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label="Next"
            className="absolute right-3 md:right-8 rounded-full border border-primary-foreground/20 p-3 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
