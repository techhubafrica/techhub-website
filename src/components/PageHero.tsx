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

const PageHero = ({ tag, title, body, ghost, cta, stats }: PageHeroProps) => {
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
      className="relative overflow-hidden bg-background text-foreground pt-28 pb-14 sm:pt-36 sm:pb-20 md:pt-44 md:pb-24 select-none"
    >
      {/* ── Ambient brand illumination ── */}
      <div
        className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full blur-3xl opacity-35 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.7) 0%, transparent 70%)",
        }}
      />
      <div
        className="hidden md:block absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.5) 0%, transparent 65%)",
        }}
      />

      {/* Mouse-tracked amber spotlight */}
      <div
        className="absolute inset-0 z-0 pointer-events-none hidden md:block"
        style={{
          background:
            "radial-gradient(650px circle at var(--sx, 50%) var(--sy, 50%), hsl(28 92% 50% / 0.07), transparent 60%)",
        }}
      />

      {/* Subtle architectural dot matrix grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ghost watermark text */}
      {ghost && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none overflow-hidden pr-6 md:pr-12 z-0">
          <span
            className="font-display font-black uppercase text-foreground/[0.035] tracking-tighter leading-none block whitespace-nowrap"
            style={{ fontSize: "clamp(6rem, 20vw, 18rem)" }}
          >
            {ghost}
          </span>
        </div>
      )}

      {/* Subtle logo watermark */}
      <div className="absolute right-[-4%] top-1/2 -translate-y-1/2 select-none pointer-events-none overflow-hidden z-0 opacity-[0.035]">
        <img
          src={logoWatermark}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="h-[clamp(14rem,35vw,26rem)] w-auto grayscale"
        />
      </div>

      {/* Vertical brand rail */}
      <div className="hidden xl:flex absolute left-8 top-0 bottom-0 flex-col items-center justify-center gap-4 z-10 pointer-events-none">
        <div className="w-px h-20 bg-gradient-to-b from-transparent to-foreground/15" />
        <span className="text-[8px] font-bold uppercase tracking-[0.55em] text-foreground/35 [writing-mode:vertical-rl] rotate-180">
          Tech Hub Africa
        </span>
        <div className="w-px h-20 bg-gradient-to-t from-transparent to-foreground/15" />
      </div>

      {/* Content */}
      <div className="relative z-10 shell xl:px-20">
        {/* Tag pill */}
        <div className="inline-flex items-center gap-2.5 mb-6 sm:mb-8 px-3.5 sm:px-4 py-1.5 rounded-full border border-foreground/12 bg-primary/20 backdrop-blur-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.28em] sm:tracking-[0.35em] text-foreground/80">
            {tag}
          </span>
        </div>

        {/* Display title */}
        <h1
          className="font-display font-black tracking-[-0.04em] text-foreground animate-fade-up max-w-[22ch]"
          style={{
            fontSize: "clamp(2.3rem, 6.5vw, 5.2rem)",
            lineHeight: 0.94,
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
        <p className="animate-fade-up stagger-2 text-muted-foreground text-[0.98rem] sm:text-base md:text-[1.12rem] leading-[1.8] max-w-[620px]">
          {body}
        </p>

        {/* Optional CTA */}
        {cta && <div className="mt-8 sm:mt-10 animate-fade-up stagger-3">{cta}</div>}

        {/* Optional stats bar */}
        {stats && stats.length > 0 && (
          <div className="mt-10 pt-8 sm:mt-14 sm:pt-10 border-t border-foreground/10 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-7 sm:gap-8 animate-fade-up stagger-3">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-foreground leading-none">
                  {s.val}
                </p>
                <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] sm:tracking-[0.3em] text-accent mt-2">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subtle bottom edge line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent pointer-events-none" />
    </section>
  );
};

export default PageHero;
