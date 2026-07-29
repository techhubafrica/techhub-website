import React, { useEffect, useRef, useState } from "react";

interface PageHeroProps {
  tag: string;
  title: React.ReactNode;
  body: string;
  ghost?: string;
  cta?: React.ReactNode;
  stats?: { val: string; label: string }[];
}

const PageHero = ({ tag, title, body, ghost, cta, stats }: PageHeroProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const h = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      });
    };
    const el = ref.current;
    el?.addEventListener("mousemove", h, { passive: true });
    return () => el?.removeEventListener("mousemove", h);
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-primary text-primary-foreground overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 select-none"
    >
      {/* Grain noise */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.055]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Directional gradient — left bias for text legibility */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(110deg, hsl(155 61% 6% / 0.97) 0%, hsl(155 61% 10% / 0.82) 45%, hsl(155 61% 14% / 0.4) 100%)",
        }}
      />

      {/* Mouse-tracked amber spotlight */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${mouse.x}% ${mouse.y}%, hsl(28 92% 50% / 0.1), transparent 62%)`,
          transition: "background 0.4s ease",
        }}
      />

      {/* Top vignette */}
      <div className="absolute inset-x-0 top-0 h-32 z-[2] pointer-events-none bg-gradient-to-b from-primary to-transparent" />

      {/* Amber accent glow — top right */}
      <div className="absolute -top-32 right-10 w-[600px] h-[500px] rounded-full blur-3xl z-[1] pointer-events-none opacity-25"
        style={{ background: "radial-gradient(circle, hsl(28 92% 55% / 0.5), transparent 65%)" }} />

      {/* Ghost watermark text */}
      {ghost && (
        <div className="absolute inset-0 z-[1] flex items-center justify-end pr-8 pointer-events-none overflow-hidden">
          <span
            className="font-display font-black uppercase text-primary-foreground select-none"
            style={{ fontSize: "clamp(6rem,22vw,20rem)", opacity: 0.04, letterSpacing: "-0.04em", lineHeight: 1 }}
          >
            {ghost}
          </span>
        </div>
      )}

      {/* Vertical brand rail */}
      <div className="hidden xl:flex absolute left-6 top-0 bottom-0 flex-col items-center justify-center gap-4 z-10 pointer-events-none">
        <div className="w-px h-20 bg-gradient-to-b from-transparent to-primary-foreground/20" />
        <span className="text-[8px] font-bold uppercase tracking-[0.55em] text-primary-foreground/30 [writing-mode:vertical-rl] rotate-180">
          Tech Hub Africa
        </span>
        <div className="w-px h-20 bg-gradient-to-t from-transparent to-primary-foreground/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 xl:px-20">
        {/* Tag pill */}
        <div className="inline-flex items-center gap-3 mb-8 px-4 py-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-primary-foreground/70">{tag}</span>
        </div>

        {/* Display title */}
        <h1
          className="font-display font-black tracking-[-0.045em] text-primary-foreground animate-fade-up"
          style={{ fontSize: "clamp(2.6rem, 7vw, 6rem)", lineHeight: 0.9, textShadow: "0 20px 60px hsl(155 61% 4% / 0.7)" }}
        >
          {title}
        </h1>

        {/* Accent divider */}
        <div className="flex items-center gap-4 mt-8 mb-8 animate-fade-up stagger-1">
          <div className="h-px w-16 bg-gradient-to-r from-accent to-transparent" />
          <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
        </div>

        {/* Body */}
        <p className="animate-fade-up stagger-2 text-primary-foreground/65 text-base md:text-[1.15rem] leading-[1.8] max-w-[580px]">
          {body}
        </p>

        {/* Optional CTA */}
        {cta && <div className="mt-10 animate-fade-up stagger-3">{cta}</div>}

        {/* Optional stats bar */}
        {stats && stats.length > 0 && (
          <div className="mt-14 pt-10 border-t border-primary-foreground/10 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-up stagger-3">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display font-black text-3xl md:text-4xl text-primary-foreground leading-none">{s.val}</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom edge fade */}
      <div className="absolute inset-x-0 bottom-0 h-20 z-[2] pointer-events-none bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default PageHero;
