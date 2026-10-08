import React, { useEffect, useRef } from "react";
import logoWatermark from "@/assets/th-logo-transparent.png";

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

      {/* Clear neutral overlay — one readable layer that preserves true photo colour */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: image
            ? "linear-gradient(90deg, hsl(var(--background) / 0.5) 0%, hsl(var(--background) / 0.32) 34%, hsl(var(--background) / 0.1) 62%, hsl(var(--background) / 0.02) 100%)"
            : "linear-gradient(110deg, hsl(var(--background)) 0%, hsl(var(--primary) / 0.45) 100%)",
        }}
      />

      {/* Top vignette — blends into the white navigation zone */}
      <div className={`absolute inset-x-0 top-0 ${image ? "h-28" : "h-32"} z-[2] pointer-events-none bg-gradient-to-b from-background/50 to-transparent`} />


      {/* Logo watermark */}
      {ghost && (
        <div className="absolute inset-0 z-[1] flex items-center justify-end pointer-events-none overflow-hidden">
          <img
            src={logoWatermark}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="select-none h-[clamp(10rem,38vw,28rem)] w-auto mr-[3%] opacity-[0.06]"
            style={{
              filter: "grayscale(1)",
              maskImage: "linear-gradient(to left, black 60%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to left, black 60%, transparent 100%)",
            }}
          />
        </div>
      )}

      {/* Vertical brand rail */}
      <div className="hidden xl:flex absolute left-6 top-0 bottom-0 flex-col items-center justify-center gap-4 z-10 pointer-events-none">
        <div className="w-px h-20 bg-gradient-to-b from-transparent to-primary/20" />
        <span className="text-[8px] font-bold uppercase tracking-[0.55em] text-foreground/35 [writing-mode:vertical-rl] rotate-180">
          Tech Hub Africa
        </span>
        <div className="w-px h-20 bg-gradient-to-t from-transparent to-primary/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 shell xl:px-20">
        {/* Tag pill */}
        <div className="inline-flex items-center gap-2.5 mb-6 sm:mb-8 px-3.5 sm:px-4 py-1.5 rounded-full border border-foreground/15 bg-card/70">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.28em] sm:tracking-[0.35em] text-foreground/70">{tag}</span>
        </div>

        {/* Display title */}
        <h1
          className="font-display font-black tracking-[-0.04em] text-foreground animate-fade-up max-w-[22ch]"
          style={{
            fontSize: "clamp(2.1rem, 8.5vw, 6rem)",
            lineHeight: 0.94,
            textShadow: "0 1px 2px hsl(var(--background) / 0.55), 0 4px 24px hsl(var(--background) / 0.45), 0 0 60px hsl(var(--background) / 0.35)",
          }}
        >
          {title}
        </h1>

        {/* Accent divider */}
        <div className="flex items-center gap-4 mt-6 mb-6 sm:mt-8 sm:mb-8 animate-fade-up stagger-1">
          <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-accent to-transparent" />
          <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
        </div>

        {/* Body */}
        <p
          className="animate-fade-up stagger-2 text-muted-foreground text-[0.95rem] sm:text-base md:text-[1.15rem] leading-[1.75] sm:leading-[1.8] max-w-[580px]"
          style={{ textShadow: "0 1px 2px hsl(var(--background) / 0.6), 0 2px 16px hsl(var(--background) / 0.5)" }}
        >
          {body}
        </p>

        {/* Optional CTA */}
        {cta && <div className="mt-8 sm:mt-10 animate-fade-up stagger-3">{cta}</div>}

        {/* Optional stats bar */}
        {stats && stats.length > 0 && (
          <div className="mt-10 pt-8 sm:mt-14 sm:pt-10 border-t border-foreground/10 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-7 sm:gap-8 animate-fade-up stagger-3">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-foreground leading-none">{s.val}</p>
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] sm:tracking-[0.3em] text-accent mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom edge fade — settles into the white page below */}
      <div className="absolute inset-x-0 bottom-0 h-16 sm:h-24 z-[2] pointer-events-none bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default PageHero;
