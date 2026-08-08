import React, { useEffect, useRef } from "react";

interface PageHeroProps {
  tag: string;
  title: React.ReactNode;
  body: string;
  ghost?: string;
  cta?: React.ReactNode;
  stats?: { val: string; label: string }[];
  /** Optional backdrop photograph for the hero stage. */
  image?: string;
  /** Accessible description of the backdrop photograph. */
  imageAlt?: string;
}

const PageHero = ({ tag, title, body, ghost, cta, stats, image, imageAlt }: PageHeroProps) => {
  const ref = useRef<HTMLDivElement>(null);

  /* spotlight follows the pointer through CSS vars — rAF throttled, zero re-renders */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    )
      return;

    let x = 50, y = 50, frame = 0;
    const paint = () => {
      frame = 0;
      el.style.setProperty("--sx", `${x.toFixed(1)}%`);
      el.style.setProperty("--sy", `${y.toFixed(1)}%`);
    };
    const h = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      x = ((e.clientX - r.left) / r.width) * 100;
      y = ((e.clientY - r.top) / r.height) * 100;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    el.addEventListener("mousemove", h, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      el.removeEventListener("mousemove", h);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-background text-foreground overflow-hidden pt-24 pb-14 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28 select-none"
    >
      {/* Backdrop photograph */}
      {image && (
        <img
          src={image}
          alt={imageAlt ?? ""}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
        />
      )}

      {/* Grain noise */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Cream veil — whisper-light, photograph stays fully visible */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: image
            ? "linear-gradient(105deg, hsl(40 33% 94% / 0.55) 0%, hsl(40 33% 94% / 0.3) 36%, hsl(40 33% 94% / 0.08) 70%, hsl(40 33% 94% / 0) 100%)"
            : "linear-gradient(110deg, hsl(40 33% 96%) 0%, hsl(40 25% 91%) 55%, hsl(40 20% 87%) 100%)",
        }}
      />

      {/* Type halo — soft, keeps headline legible without masking the photo */}
      {image && (
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(90% 85% at 2% 55%, hsl(40 33% 94% / 0.7) 0%, hsl(40 33% 94% / 0.28) 45%, transparent 75%)",
          }}
        />
      )}

      {/* Mouse-tracked amber spotlight */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none hidden md:block"
        style={{
          background:
            "radial-gradient(800px circle at var(--sx, 50%) var(--sy, 50%), hsl(28 92% 50% / 0.1), transparent 62%)",
        }}
      />

      {/* Top vignette — blends into the cream nav zone */}
      <div className={`absolute inset-x-0 top-0 ${image ? "h-28" : "h-32"} z-[2] pointer-events-none bg-gradient-to-b from-background/80 to-transparent`} />


      {/* Amber accent glow — top right */}
      <div className="hidden md:block absolute -top-32 right-10 w-[600px] h-[500px] rounded-full blur-3xl z-[1] pointer-events-none opacity-25"
        style={{ background: "radial-gradient(circle, hsl(28 92% 55% / 0.35), transparent 65%)" }} />

      {/* Ghost watermark text */}
      {ghost && (
        <div className="absolute inset-0 z-[1] flex items-center justify-end pr-8 pointer-events-none overflow-hidden">
          <span
            className="font-display font-black uppercase text-primary select-none"
            style={{ fontSize: "clamp(6rem,22vw,20rem)", opacity: 0.05, letterSpacing: "-0.04em", lineHeight: 1 }}
          >
            {ghost}
          </span>
        </div>
      )}

      {/* Vertical brand rail */}
      <div className="hidden xl:flex absolute left-6 top-0 bottom-0 flex-col items-center justify-center gap-4 z-10 pointer-events-none">
        <div className="w-px h-20 bg-gradient-to-b from-transparent to-primary/20" />
        <span className="text-[8px] font-bold uppercase tracking-[0.55em] text-primary/35 [writing-mode:vertical-rl] rotate-180">
          Tech Hub Africa
        </span>
        <div className="w-px h-20 bg-gradient-to-t from-transparent to-primary/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 shell xl:px-20">
        {/* Tag pill */}
        <div className="inline-flex items-center gap-2.5 mb-6 sm:mb-8 px-3.5 sm:px-4 py-1.5 rounded-full border border-primary/15 bg-card/70">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.28em] sm:tracking-[0.35em] text-primary/70">{tag}</span>
        </div>

        {/* Display title */}
        <h1
          className="font-display font-black tracking-[-0.04em] text-primary animate-fade-up max-w-[22ch]"
          style={{ fontSize: "clamp(2.1rem, 8.5vw, 6rem)", lineHeight: 0.94 }}
        >
          {title}
        </h1>

        {/* Accent divider */}
        <div className="flex items-center gap-4 mt-6 mb-6 sm:mt-8 sm:mb-8 animate-fade-up stagger-1">
          <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-accent to-transparent" />
          <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
        </div>

        {/* Body */}
        <p className="animate-fade-up stagger-2 text-muted-foreground text-[0.95rem] sm:text-base md:text-[1.15rem] leading-[1.75] sm:leading-[1.8] max-w-[580px]">
          {body}
        </p>

        {/* Optional CTA */}
        {cta && <div className="mt-8 sm:mt-10 animate-fade-up stagger-3">{cta}</div>}

        {/* Optional stats bar */}
        {stats && stats.length > 0 && (
          <div className="mt-10 pt-8 sm:mt-14 sm:pt-10 border-t border-primary/10 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-7 sm:gap-8 animate-fade-up stagger-3">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-primary leading-none">{s.val}</p>
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] sm:tracking-[0.3em] text-accent mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom edge fade — settles into the cream page below */}
      <div className="absolute inset-x-0 bottom-0 h-16 sm:h-24 z-[2] pointer-events-none bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default PageHero;
