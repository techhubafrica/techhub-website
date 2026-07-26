import { useEffect, useState, useRef } from "react";
import {
  ArrowUpRight, Code2, Smartphone, Layout, Building2, ShoppingBag, Sprout,
  ShieldCheck, Star, Quote, Play, Users, Rocket, Globe2, Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Logo from "@/components/Logo";
import MeetTheTeam from "@/components/MeetTheTeam";


/* ============================================================
   HERO — Netflix-style rotating showcase
   ============================================================ */
const heroSlides = [
  {
    tag: "Featured Program",
    kicker: "Tech For All",
    title: "Campus Tours 2026",
    body: "A continent-wide movement bringing hackathons, AI workshops, and founder circles into every major university in Ghana.",
    cta: "Explore the Tour",
    tone: "deep" as const,
    stat: { k: "12", v: "Cities" },
  },
  {
    tag: "Now Building",
    kicker: "THE HUB",
    title: "Africa's Innovation Home",
    body: "A physical and digital home for builders, mentors and investors shaping the continent's next decade of technology.",
    cta: "Step Inside",
    tone: "forest" as const,
    stat: { k: "300+", v: "Innovators" },
  },
  {
    tag: "Live Event",
    kicker: "Hackathon 72",
    title: "Seventy-Two Hours of Impact",
    body: "Elite teams from across Africa converge to build production-grade solutions in three sleepless days.",
    cta: "See the Build",
    tone: "charcoal" as const,
    stat: { k: "72h", v: "Non-stop" },
  },
  {
    tag: "Publication",
    kicker: "Top 100",
    title: "Innovators & Entrepreneurs",
    body: "The definitive annual list of the founders, engineers, and creators redefining African technology.",
    cta: "Read the Issue",
    tone: "amber" as const,
    stat: { k: "100", v: "Leaders" },
  },
];

/* -- Counting stat sub-component -- */
const CountStat = ({
  target, suffix, label, delay, divider,
}: { target: number; suffix: string; label: string; delay: number; divider: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = 0;
      const duration = 1600;
      const step = target / (duration / 16);
      const timer = setInterval(() => {
        start += step;
        if (start >= target) { setCount(target); clearInterval(timer); }
        else setCount(Math.floor(start));
      }, 16);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, delay]);
  return (
    <div className={`flex-1 ${divider ? "pl-5 border-l border-primary/10" : "pr-5"}`}>
      <p className="font-display font-black text-primary leading-none tracking-[-0.03em]" style={{ fontSize: "clamp(2rem,4vw,2.8rem)" }}>
        {count}{suffix}
      </p>
      <p className="text-[9.5px] font-bold uppercase tracking-[0.3em] text-primary/30 mt-1.5">{label}</p>
    </div>
  );
};

/* -- Morphing words -- */
const cyclicWords = ["Tech", "Digital", "Future", "Hub"];

/* ============================================================
   SIGNATURE ELEMENT — "The Constellation"
   A subtle network of connected nodes representing the
   mentorship / knowledge-exchange fabric of Tech Hub Africa.
   Nodes gently pulse; connecting arcs draw softly. Unique to THA.
   ============================================================ */
const Constellation = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 400 400"
    className={className}
    fill="none"
    aria-hidden
  >
    <defs>
      <radialGradient id="cx-node" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="hsl(28,92%,50%)" stopOpacity="1" />
        <stop offset="100%" stopColor="hsl(28,92%,44%)" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="cx-line" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="hsl(155,61%,15%)" stopOpacity="0.05" />
        <stop offset="50%" stopColor="hsl(28,92%,44%)" stopOpacity="0.35" />
        <stop offset="100%" stopColor="hsl(155,61%,15%)" stopOpacity="0.05" />
      </linearGradient>
    </defs>
    {/* Arcs — knowledge-exchange lines */}
    {[
      "M60 120 Q 200 40 340 140",
      "M40 240 Q 200 180 360 260",
      "M80 340 Q 200 300 320 350",
      "M60 120 Q 140 260 80 340",
      "M340 140 Q 300 250 360 260",
      "M200 40 Q 220 200 200 300",
    ].map((d, i) => (
      <path
        key={i}
        d={d}
        stroke="url(#cx-line)"
        strokeWidth="1"
        strokeDasharray="600"
        strokeDashoffset="600"
        style={{ animation: `draw 2.4s cubic-bezier(0.16,1,0.3,1) ${0.6 + i * 0.15}s both` }}
      />
    ))}
    {/* Nodes */}
    {[
      [60, 120], [340, 140], [200, 40], [40, 240],
      [360, 260], [80, 340], [320, 350], [200, 300],
      [200, 180],
    ].map(([cx, cy], i) => (
      <g key={i} style={{ animation: `fade-in 1s ease-out ${1 + i * 0.08}s both` }}>
        <circle cx={cx} cy={cy} r="14" fill="url(#cx-node)" opacity="0.35" />
        <circle cx={cx} cy={cy} r="3.2" fill="hsl(28,92%,44%)" />
        <circle cx={cx} cy={cy} r="6" fill="none" stroke="hsl(28,92%,44%)" strokeOpacity="0.4">
          <animate attributeName="r" values="4;10;4" dur="4s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="4s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
        </circle>
      </g>
    ))}
  </svg>
);

const Hero = () => {
  const [active, setActive]   = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const [wordOut, setWordOut] = useState(false);
  const [mouse, setMouse]     = useState({ x: 0.5, y: 0.5 });
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  /* slide auto-advance */
  useEffect(() => {
    const INTERVAL = 6000;
    let elapsed = 0;
    const tick = setInterval(() => {
      elapsed += 50;
      setProgress(Math.min(100, (elapsed / INTERVAL) * 100));
      if (elapsed >= INTERVAL) {
        elapsed = 0;
        setProgress(0);
        setActive((a) => (a + 1) % heroSlides.length);
      }
    }, 50);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setWordOut(true);
      setTimeout(() => { setWordIdx((i) => (i + 1) % cyclicWords.length); setWordOut(false); }, 380);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) =>
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    const s = () => setScrollY(window.scrollY);
    window.addEventListener("mousemove", h, { passive: true });
    window.addEventListener("scroll", s, { passive: true });
    return () => {
      window.removeEventListener("mousemove", h);
      window.removeEventListener("scroll", s);
    };
  }, []);

  const slide = heroSlides[active];
  const px = (mouse.x - 0.5) * 20;
  const py = (mouse.y - 0.5) * 10;
  const parY = Math.min(scrollY, 400);

  const goto = (i: number) => { setActive(i); setProgress(0); };

  return (
    <section className="relative min-h-screen bg-background overflow-hidden select-none">

      {/* ══ LAYERED AMBIENT LIGHTING ══ */}
      {/* Warm cream base gradient */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(1200px 700px at 15% 10%, hsl(40 45% 97%) 0%, transparent 55%)," +
            "radial-gradient(900px 600px at 90% 30%, hsl(28 60% 92% / 0.6) 0%, transparent 55%)," +
            "radial-gradient(700px 500px at 60% 100%, hsl(155 45% 88% / 0.5) 0%, transparent 60%)",
        }}
      />
      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      {/* Cursor spotlight */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(560px circle at ${mouse.x * 100}% ${mouse.y * 100}%, hsl(28 92% 44% / 0.08), transparent 60%)`,
        }}
      />

      {/* ══ SIGNATURE CONSTELLATION — top-right, breathing ══ */}
      <div
        className="absolute -top-16 -right-10 md:top-8 md:right-10 w-[380px] md:w-[520px] h-[380px] md:h-[520px] pointer-events-none z-[1]"
        style={{
          transform: `translate(${px * 0.4}px, ${py * 0.4 - parY * 0.15}px)`,
          transition: "transform 1s cubic-bezier(0.16,1,0.3,1)",
          opacity: 0.85,
        }}
      >
        <Constellation className="w-full h-full" />
      </div>

      {/* Ghost mega mark — very subtle */}
      <div className="absolute inset-0 flex items-end justify-start overflow-hidden pointer-events-none z-0">
        <span
          className="font-display font-black uppercase leading-none tracking-tighter select-none"
          style={{
            fontSize: "34vw",
            opacity: 0.028,
            color: "hsl(155,61%,15%)",
            transform: `translate(${-px * 1.2}px, ${40 - py * 0.8 + parY * 0.1}px)`,
            transition: "transform 1.4s cubic-bezier(0.16,1,0.3,1)",
            marginLeft: "-3vw",
            marginBottom: "-8vw",
          }}
        >
          THA
        </span>
      </div>

      {/* Vertical brand rail — left edge */}
      <div className="hidden xl:flex absolute left-6 top-0 bottom-0 flex-col items-center justify-between py-32 z-10 pointer-events-none">
        <div className="flex flex-col items-center gap-4">
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-primary/25" />
          <span className="text-[8.5px] font-bold uppercase tracking-[0.55em] text-primary/35 [writing-mode:vertical-rl] rotate-180">
            Est · MMXXIV
          </span>
        </div>
        <div className="flex flex-col items-center gap-4">
          <span className="text-[8.5px] font-bold uppercase tracking-[0.55em] text-primary/35 [writing-mode:vertical-rl] rotate-180">
            Accra · Ghana
          </span>
          <div className="w-px h-16 bg-gradient-to-t from-transparent to-primary/25" />
        </div>
      </div>

      {/* ══ MAIN COMPOSITION — asymmetric editorial grid ══ */}
      <div className="relative max-w-[1360px] mx-auto w-full px-6 xl:px-20 pt-28 md:pt-32 pb-16 z-10">

        {/* Chapter label — sits outside the main column */}
        <div className="flex items-center gap-5 mb-10 md:mb-14 md:-ml-2">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-primary/15 rounded-full bg-background/70 backdrop-blur-sm">
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-accent opacity-60" />
              <span className="relative w-2 h-2 rounded-full bg-accent" />
            </span>
            <span className="text-[10px] font-bold tracking-[0.32em] uppercase text-primary/60">
              Chapter 01 · The Ecosystem
            </span>
          </div>
          <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-primary/25 to-transparent" />
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-primary/30 hidden md:block">
            {String(active + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-y-16 lg:gap-x-8 items-start">

          {/* ─── LEFT — EDITORIAL HEADLINE COLUMN ─── */}
          <div className="lg:col-span-7 relative lg:pt-6 lg:z-20">

            {/* Headline — intentional line breaks, oversized */}
            <h1
              className="font-display font-black tracking-[-0.045em] text-primary"
              style={{ lineHeight: 0.82 }}
            >
              <span className="block overflow-hidden">
                <span
                  className="block animate-fade-up"
                  style={{ fontSize: "clamp(3rem,8.4vw,7rem)" }}
                >
                  Where
                </span>
              </span>
              <span className="block overflow-hidden pl-[0.12em]">
                <span
                  className="block animate-fade-up stagger-1"
                  style={{ fontSize: "clamp(3rem,8.4vw,7rem)" }}
                >
                  Africa's
                </span>
              </span>
              <span
                className="block overflow-hidden"
                style={{ fontSize: "clamp(3rem,8.4vw,7rem)" }}
              >
                <span
                  className="inline-block italic font-light text-accent"
                  style={{
                    transform: wordOut ? "translateY(-115%)" : "translateY(0)",
                    opacity: wordOut ? 0 : 1,
                    transition: wordOut
                      ? "transform 0.3s cubic-bezier(0.4,0,1,1), opacity 0.2s ease"
                      : "transform 0.44s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
                  }}
                >
                  {cyclicWords[wordIdx]}
                </span>
              </span>
              <span className="block overflow-hidden relative pl-[0.24em]">
                <span
                  className="block animate-fade-up stagger-2 relative"
                  style={{ fontSize: "clamp(3rem,8.4vw,7rem)" }}
                >
                  future lives.
                  <svg
                    className="absolute left-[0.24em] -bottom-1 w-[90%]"
                    viewBox="0 0 640 13" fill="none" preserveAspectRatio="none" aria-hidden
                  >
                    <path
                      d="M3 8 C90 1, 210 12, 320 6 C430 0, 558 12, 637 7"
                      stroke="hsl(28,92%,44%)" strokeWidth="3.5" strokeLinecap="round"
                      strokeDasharray="720" strokeDashoffset="720"
                      style={{ animation: "draw 1.8s cubic-bezier(0.16,1,0.3,1) 1s both" }}
                    />
                  </svg>
                </span>
              </span>
            </h1>

            {/* Editorial description */}
            <div className="animate-fade-up stagger-3 mt-10 md:mt-12 max-w-[520px] flex gap-5">
              <div className="w-px bg-gradient-to-b from-accent/60 via-primary/20 to-transparent flex-shrink-0" />
              <p className="text-primary/70 text-[15px] md:text-[17px] leading-[1.9] font-light">
                A home for builders, mentors and investors — connecting talent
                to opportunity through world-class infrastructure, elite mentorship
                and high-impact digital work
                <span className="text-primary font-medium"> across the continent.</span>
              </p>
            </div>

            {/* CTAs */}
            <div className="animate-fade-up stagger-4 flex flex-wrap items-center gap-5 mt-10">
              <a
                href="#vision"
                className="btn-magnetic group inline-flex items-center gap-3 px-9 py-4 bg-primary text-primary-foreground text-[11px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-secondary transition-all duration-500"
                style={{ boxShadow: "0 10px 30px -10px hsl(155 61% 15% / 0.4)" }}
              >
                Enter the Hub
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="#campus"
                className="group inline-flex items-center gap-3 text-[11px] font-bold text-primary/70 hover:text-accent transition-colors uppercase tracking-[0.28em]"
              >
                <div className="w-11 h-11 rounded-full border border-primary/25 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                Watch the film
              </a>
            </div>

            {/* Stats — inline editorial */}
            <div className="animate-fade-up stagger-4 mt-14 grid grid-cols-3 max-w-[420px] border-t border-primary/12 pt-7">
              <CountStat target={5}  suffix="+" label="Years"     delay={200} divider={false} />
              <CountStat target={20} suffix="+" label="Programs"  delay={400} divider={true}  />
              <CountStat target={4}  suffix=""  label="Ventures"  delay={600} divider={true}  />
            </div>
          </div>

          {/* ─── RIGHT — MEDIA STAGE ─── */}
          <div
            className="lg:col-span-5 relative animate-fade-up stagger-2 lg:-mt-4 lg:-mr-6 xl:-mr-10"
            style={{ transform: `translateY(${parY * -0.04}px)` }}
          >
            {/* Offset editorial frame — breaks grid */}
            <div className="absolute -top-5 -right-5 -bottom-8 -left-3 border border-accent/25 rounded-[28px] pointer-events-none" />
            <div className="absolute -top-2 -right-2 -bottom-4 -left-1 border border-primary/8 rounded-[24px] pointer-events-none" />

            {/* THE MEDIA STAGE */}
            <div
              className="relative w-full rounded-[22px] overflow-hidden isolate"
              style={{
                aspectRatio: "4/5",
                maxHeight: "min(720px, 78vh)",
                boxShadow:
                  "0 40px 90px -20px hsl(155 61% 15% / 0.28)," +
                  "0 12px 32px -10px hsl(155 61% 15% / 0.16)," +
                  "0 2px 6px -2px hsl(155 61% 15% / 0.08)",
              }}
            >
              {/* Rotating slides */}
              {heroSlides.map((s, i) => (
                <div
                  key={s.title}
                  className={`absolute inset-0 transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    i === active ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-[1.04]"
                  }`}
                >
                  <ImagePlaceholder tone={s.tone} label={s.kicker} />

                  {/* Cinematic top vignette */}
                  <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/25 via-black/5 to-transparent pointer-events-none z-[3]" />
                  {/* Bottom vignette for caption legibility */}
                  <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black/45 to-transparent pointer-events-none z-[3]" />

                  {/* Slide index — top-left */}
                  <div className="absolute top-5 left-5 z-[4] flex items-center gap-2">
                    <span className="w-6 h-px bg-white/60" />
                    <span className="text-[9.5px] font-black uppercase tracking-[0.42em] text-white/85">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Tag — top-right */}
                  <div className="absolute top-5 right-6 z-[4]">
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/70">
                      {s.tag}
                    </span>
                  </div>

                  {/* Editorial caption */}
                  <div className="absolute inset-x-6 bottom-16 z-[4]">
                    <p className="text-[10px] font-bold uppercase tracking-[0.42em] text-accent mb-3">
                      {s.kicker}
                    </p>
                    <h3 className="font-display font-black text-white text-[1.9rem] md:text-[2.2rem] leading-[0.95] tracking-[-0.02em] mb-3 max-w-[85%]">
                      {s.title}
                    </h3>
                    <p className="text-white/70 text-[13px] leading-relaxed font-light max-w-[92%] line-clamp-2">
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}

              {/* Bottom-right chapter action */}
              <a
                href="#"
                className="absolute bottom-5 right-5 z-20 group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/12 backdrop-blur-md border border-white/20 hover:bg-accent hover:border-accent transition-all duration-500"
              >
                <span className="text-[9.5px] font-bold uppercase tracking-[0.32em] text-white">
                  {slide.cta}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* Vertical slide indicators */}
              <div className="absolute top-1/2 -translate-y-1/2 right-4 z-20 flex flex-col gap-2">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goto(i)}
                    aria-label={`Slide ${i + 1}`}
                    className="group relative flex items-center justify-end"
                  >
                    <span className={`transition-all duration-500 rounded-full ${
                      i === active
                        ? "w-[3px] h-10 bg-accent"
                        : "w-[3px] h-3 bg-white/40 group-hover:bg-white/80"
                    }`} />
                  </button>
                ))}
              </div>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/15 z-20">
                <div
                  className="h-full bg-accent"
                  style={{ width: `${progress}%`, transition: "width 50ms linear" }}
                />
              </div>
            </div>

            {/* ── FLOATING ECOSYSTEM CARDS ── */}

            {/* Est. seal — top-left, breaks frame */}
            <div
              className="hidden md:flex absolute -top-8 -left-8 z-30 w-[92px] h-[92px] rounded-full bg-accent flex-col items-center justify-center animate-float"
              style={{ boxShadow: "0 14px 34px -6px hsl(28 92% 44% / 0.55), inset 0 0 0 1px hsl(0 0% 100% / 0.15)" }}
            >
              <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-white/70">Est.</p>
              <p className="font-display font-black text-[1.65rem] text-white leading-none">2024</p>
              <div className="mt-1 w-6 h-px bg-white/40" />
            </div>

            {/* Live metric card — bottom-left, extends beyond frame */}
            <div
              className="hidden md:block absolute -bottom-12 -left-14 z-30 bg-background rounded-2xl px-5 py-4 animate-float"
              style={{
                animationDelay: "1.2s",
                minWidth: "180px",
                border: "1px solid hsl(155 61% 15% / 0.08)",
                boxShadow:
                  "0 20px 50px -12px hsl(155 61% 15% / 0.22)," +
                  "0 4px 12px -4px hsl(155 61% 15% / 0.08)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[8.5px] font-bold uppercase tracking-[0.34em] text-accent">
                  {slide.stat.v}
                </span>
              </div>
              <p
                className="font-display font-black text-primary leading-none tracking-[-0.04em]"
                style={{ fontSize: "2.7rem" }}
              >
                {slide.stat.k}
              </p>
              <div className="mt-3 pt-3 border-t border-primary/8 flex items-center justify-between">
                <span className="text-[8.5px] font-bold uppercase tracking-[0.3em] text-primary/40">
                  {slide.kicker}
                </span>
                <ArrowUpRight className="w-3 h-3 text-primary/40" />
              </div>
            </div>

            {/* Ecosystem theme card — top-right, floats over frame */}
            <div
              className="hidden lg:flex absolute -top-4 -right-10 z-30 items-center gap-3 px-4 py-3 rounded-full bg-background/85 backdrop-blur-md animate-float"
              style={{
                animationDelay: "0.6s",
                border: "1px solid hsl(155 61% 15% / 0.1)",
                boxShadow: "0 12px 30px -8px hsl(155 61% 15% / 0.18)",
              }}
            >
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
              </div>
              <div className="pr-2">
                <p className="text-[8px] font-bold uppercase tracking-[0.32em] text-primary/40 leading-none mb-1">Now</p>
                <p className="font-display font-extrabold text-[12px] text-primary leading-none">Cohort 03 · Open</p>
              </div>
            </div>

            {/* Corner brackets */}
            <div className="hidden md:block absolute -bottom-5 -right-5 z-20">
              <div className="w-8 h-8 border-r-2 border-b-2 border-accent/50 rounded-br-[10px]" />
            </div>
            <div className="hidden md:block absolute -top-5 -right-5 z-20">
              <div className="w-8 h-8 border-r-2 border-t-2 border-primary/20 rounded-tr-[10px]" />
            </div>
          </div>
        </div>

        {/* ══ BOTTOM META BAR ══ */}
        <div className="mt-24 md:mt-28 pt-6 border-t border-primary/10 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-[0.45em] text-primary/35">
              Accra · West Africa
            </span>
          </div>

          {/* Chapter dots — narrative anchor */}
          <div className="hidden md:flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.4em] text-primary/30">
            <span className="text-primary/60">01 · Ecosystem</span>
            <span className="w-6 h-px bg-primary/15" />
            <span>02 · Programs</span>
            <span className="w-6 h-px bg-primary/15" />
            <span>03 · Portfolio</span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[8.5px] font-bold uppercase tracking-[0.4em] text-primary/25">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-primary/25 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   MARQUEE
   ============================================================ */

const Marquee = () => {
  const text = "Connecting Innovators · Fostering Talent · Showcasing Excellence";
  return (
    <div className="relative bg-primary text-primary-foreground py-4 overflow-hidden border-y border-primary-foreground/10">
      <div className="animate-marquee whitespace-nowrap flex">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="text-xs md:text-sm font-bold tracking-[0.35em] uppercase mx-10 text-primary-foreground/60">
            {text} <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};

/* ============================================================
   VISION & MISSION — cream chapter with overlapping accent
   ============================================================ */
const VisionMission = () => (
  <section id="vision" className="relative py-28 md:py-36 px-6 overflow-hidden">
    <div className="absolute -top-24 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_55%/0.35),transparent_70%)]" />
    <div className="relative max-w-7xl mx-auto">
      <div className="flex items-baseline gap-6 mb-16">
        <span className="eyebrow text-accent">01 — Foundations</span>
        <div className="flex-1 divider-elegant" />
        <span className="eyebrow text-primary/40 hidden md:inline">The North Star</span>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-7">
          <h2 className="font-display font-extrabold text-primary leading-[0.9] mb-12 text-[3.5rem] md:text-[5rem] tracking-tight">
            A future where
            <br />
            Africa <span className="italic font-light text-accent">leads.</span>
          </h2>
        </div>

        <div className="lg:col-span-5 space-y-10 lg:pt-8">
          <div className="relative pl-6 border-l border-accent/60">
            <p className="eyebrow text-accent mb-3">Our Vision</p>
            <p className="text-primary/80 leading-relaxed">
              A future where Africa is recognized as a global leader in technology, science and
              engineering — where innovation thrives, talent is nurtured, and the continent's
              contributions are celebrated.
            </p>
          </div>
          <div className="relative pl-6 border-l border-primary/25">
            <p className="eyebrow text-primary/60 mb-3">Our Mission</p>
            <p className="text-primary/80 leading-relaxed">
              Empowering Africa's tech ecosystem by connecting innovators, fostering talent, and
              showcasing excellence — to promote a vibrant and inclusive digital future for the
              continent.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ============================================================
   CAMPUS TOURS — asymmetric break-out
   ============================================================ */
const CampusTours = () => (
  <section id="campus" className="relative py-28 md:py-36 px-6 bg-secondary text-primary-foreground overflow-hidden">
    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none bg-[radial-gradient(circle,hsl(155_61%_35%),transparent_70%)]" />

    <div className="relative max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-6 relative">
        <div className="aspect-[4/5] shadow-[var(--shadow-cinema)]">
          <ImagePlaceholder tone="forest" label="Campus Tour 2026 poster" />
        </div>
        {/* Floating stat card */}
        <div className="hidden md:block absolute -bottom-10 -right-10 glass rounded-lg p-6 min-w-[200px] animate-float">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-accent" />
            <p className="eyebrow text-accent">Students</p>
          </div>
          <p className="font-display font-extrabold text-4xl">5,000+</p>
          <p className="text-xs text-primary-foreground/60 mt-1">reached in prior tours</p>
        </div>
      </div>

      <div className="lg:col-span-6 lg:pl-8">
        <span className="eyebrow text-accent">02 — Flagship Program</span>
        <h2 className="font-display font-extrabold leading-[0.9] mt-6 mb-8 text-[3rem] md:text-[4.5rem] tracking-tight">
          Tech For All
          <br />
          <span className="italic font-light text-accent">Campus Tours</span> 2026
        </h2>
        <p className="text-primary-foreground/70 leading-relaxed mb-8 max-w-lg">
          Join us on a mission to inspire, educate and equip students with the skills to thrive in
          Africa's rapidly evolving tech landscape. Engage with industry experts and discover
          real-world solutions.
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.25em] text-accent hover:text-primary-foreground transition-colors group"
        >
          Explore the Tour Gallery
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>
      </div>
    </div>
  </section>
);

/* ============================================================
   INITIATIVES — premium product-showcase cards
   ============================================================ */
const initiatives = [
  { title: "Tech Guru Meetup", meta: "18 Dec 2026", tone: "forest" as const, Icon: Users },
  { title: "Hackathon Challenge", meta: "72 Hours · Live", tone: "amber" as const, Icon: Rocket },
  { title: "Top 100 Magazine", meta: "Innovators & Founders", tone: "deep" as const, Icon: Sparkles },
  { title: "Marquis Who's Who", meta: "Honored Listee 2025", tone: "charcoal" as const, Icon: Globe2 },
];

const Initiatives = () => (
  <section id="events" className="relative py-28 md:py-36 px-6 bg-cream overflow-hidden">
    <div className="absolute top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 pointer-events-none bg-[radial-gradient(circle,hsl(151_57%_35%/0.4),transparent_70%)]" />

    <div className="relative max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-16">
        <div>
          <span className="eyebrow text-accent">03 — Core Initiatives</span>
          <h2 className="font-display font-extrabold text-primary mt-4 leading-[0.9] text-[3rem] md:text-[4.5rem] tracking-tight">
            Where the <span className="italic font-light text-accent">work</span>
            <br />
            happens.
          </h2>
        </div>
        <p className="text-primary/60 max-w-sm">
          Programs, publications, and platforms building tomorrow's African tech leaders.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {initiatives.map((it, i) => (
          <a
            key={it.title}
            href="#"
            className="card-lift group relative rounded-lg overflow-hidden bg-background border border-primary/10"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <ImagePlaceholder tone={it.tone} label={it.title} showReflection={false} />
              {/* Icon chip */}
              <div className="absolute top-4 left-4 z-[4] w-10 h-10 rounded-full glass flex items-center justify-center">
                <it.Icon className="w-4 h-4 text-accent" strokeWidth={1.6} />
              </div>
              <span className="absolute top-5 right-5 z-[4] text-[10px] font-bold uppercase tracking-[0.3em] text-primary-foreground/70">
                0{i + 1}
              </span>
              {/* Hover glow */}
              <div className="absolute inset-0 z-[3] opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_100%,hsl(28_92%_55%/0.35),transparent_65%)]" />
            </div>

            <div className="p-6 relative">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mb-2">
                {it.meta}
              </p>
              <h3 className="font-display text-xl font-extrabold leading-tight text-primary mb-4">
                {it.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary/60 group-hover:text-accent transition-colors">
                  Learn more
                </span>
                <ArrowUpRight className="w-4 h-4 text-primary/40 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

/* ============================================================
   SERVICES
   ============================================================ */
const services = [
  {
    Icon: Code2,
    title: "Computer Programming",
    desc: "Expert programmers craft custom software solutions tailored to your business — from algorithm development to code optimization.",
  },
  {
    Icon: Smartphone,
    title: "Software & App Development",
    desc: "Cutting-edge software for mobile, web and desktop. From concept to deployment, we handle every stage.",
  },
  {
    Icon: Layout,
    title: "Web Design & Management",
    desc: "Visually stunning, responsive, user-centric websites — plus ongoing management, updates and security.",
  },
];

const Services = () => (
  <section id="services" className="relative py-28 md:py-36 px-6 bg-secondary text-primary-foreground overflow-hidden">
    <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_44%/0.4),transparent_70%)]" />
    <div className="relative max-w-7xl mx-auto">
      <div className="flex items-baseline gap-6 mb-16">
        <span className="eyebrow text-accent">04 — Services</span>
        <div className="flex-1 divider-elegant-light" />
      </div>
      <h2 className="font-display font-extrabold leading-[0.9] mb-16 text-[3rem] md:text-[4.5rem] tracking-tight max-w-3xl">
        Precision engineering for the
        <span className="italic font-light text-accent"> next continent</span>.
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <div
            key={s.title}
            className="card-lift group relative p-10 lg:p-12 rounded-lg bg-primary/80 overflow-hidden border border-primary-foreground/10"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_top,hsl(28_92%_55%/0.25),transparent_60%)]" />
            <div className="relative flex items-center justify-between mb-10">
              <div className="w-14 h-14 rounded-full glass flex items-center justify-center">
                <s.Icon className="w-6 h-6 text-accent" strokeWidth={1.4} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary-foreground/40">
                0{i + 1}
              </span>
            </div>
            <h3 className="relative font-display text-2xl md:text-3xl font-extrabold mb-5 leading-tight">
              {s.title}
            </h3>
            <p className="relative text-sm text-primary-foreground/70 leading-relaxed">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ============================================================
   PROGRAMS BAND
   ============================================================ */
const ProgramsBand = () => (
  <section id="programs" className="relative bg-cream overflow-hidden">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2">
      <div className="p-12 lg:p-20 border-b lg:border-b-0 lg:border-r border-primary/10 relative">
        <span className="eyebrow text-accent">05 — Internships</span>
        <h3 className="font-display font-extrabold text-primary mt-6 mb-6 leading-[0.9] text-[2.5rem] md:text-[3.5rem] tracking-tight">
          Available
          <br />
          <span className="italic font-light text-accent">Internships</span>
        </h3>
        <p className="text-primary/70 leading-relaxed mb-8 max-w-md">
          We offer opportunities to talented, motivated individuals passionate about technology —
          committed to diversity and inclusion across the industry.
        </p>
        <ul className="space-y-3 mb-10">
          {["Event Planning", "Marketing", "Research", "Operations"].map((role) => (
            <li key={role} className="flex items-center gap-4 border-b border-primary/10 pb-3 group cursor-pointer hover:border-accent/60 transition-colors">
              <span className="w-1.5 h-1.5 bg-accent rounded-full group-hover:scale-150 transition-transform" />
              <span className="font-display font-bold text-primary group-hover:text-accent transition-colors">{role}</span>
              <ArrowUpRight className="ml-auto w-4 h-4 text-primary/30 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </li>
          ))}
        </ul>
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.25em] text-primary hover:text-accent transition-colors group"
        >
          Read More <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>
      </div>

      <div className="p-12 lg:p-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-[400px] h-[400px] rounded-full blur-3xl opacity-20 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_44%/0.35),transparent_70%)]" />
        <div className="relative">
          <span className="eyebrow text-accent">06 — Mentorship</span>
          <h3 className="font-display font-extrabold mt-6 mb-6 leading-[0.9] text-[2.5rem] md:text-[3.5rem] tracking-tight">
            Mentorship
            <br />
            <span className="italic font-light text-accent">Program</span>
          </h3>
          <p className="text-primary-foreground/70 leading-relaxed mb-10 max-w-md">
            A powerful tool for growth. We connect emerging leaders and innovators with experienced
            professionals who provide guidance, support and valuable insights.
          </p>
          <a
            href="#"
            className="btn-magnetic inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-[0.25em] rounded-full hover:bg-primary transition-colors duration-300"
          >
            Read More <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <span className="absolute -bottom-8 -right-8 font-display font-extrabold text-[10rem] leading-none text-primary-foreground/[0.04] select-none pointer-events-none">
          06
        </span>
      </div>
    </div>
  </section>
);

/* ============================================================
   PORTFOLIO — glass cards on charcoal
   ============================================================ */
const portfolio = [
  { Icon: Building2, name: "GH Accommodation", sector: "Real Estate Tech", desc: "Your gateway to affordable, reliable housing." },
  { Icon: ShoppingBag, name: "GMO Marketplace", sector: "E-Commerce", desc: "Ghana Mall — your one-stop shop for everything." },
  { Icon: Sprout, name: "Ofie Agro Ltd", sector: "Agri-Tech", desc: "Taste of tradition, fresh from Ofie." },
  { Icon: ShieldCheck, name: "Threat Lock Agency", sector: "Cybersecurity", desc: "Protect your website. Setup in five minutes." },
];

const Portfolio = () => (
  <section id="portfolio" className="relative py-28 md:py-36 px-6 bg-primary text-primary-foreground overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-3xl opacity-15 pointer-events-none bg-[radial-gradient(circle,hsl(151_57%_35%),transparent_70%)]" />

    <div className="relative max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <span className="eyebrow text-accent">07 — Investment Portfolio</span>
          <h2 className="font-display font-extrabold mt-4 leading-[0.9] text-[3rem] md:text-[4.5rem] tracking-tight">
            Companies scaling
            <br />
            <span className="italic font-light text-accent">innovation</span> across industries.
          </h2>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {portfolio.map((p) => (
          <a
            key={p.name}
            href="#"
            className="card-lift group relative rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 p-8 overflow-hidden"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_100%_0%,hsl(28_92%_55%/0.3),transparent_60%)]" />
            <div className="relative flex items-start justify-between mb-10">
              <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                <p.Icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
              </div>
              <ArrowUpRight className="w-5 h-5 text-primary-foreground/30 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="relative text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-3">
              {p.sector}
            </p>
            <h3 className="relative font-display text-xl font-extrabold mb-3 leading-tight">{p.name}</h3>
            <p className="relative text-sm text-primary-foreground/60 leading-relaxed">{p.desc}</p>
          </a>
        ))}
      </div>
    </div>
  </section>
);

/* ============================================================
   TESTIMONIALS
   ============================================================ */
const testimonials = [
  { name: "Bernard Buari", when: "2 months ago", body: "The workshop training was impactful and the audience really loved it." },
  { name: "5Point1Nexus", when: "3 months ago", body: "Tech Hub Africa is doing incredible work supporting and growing the African tech ecosystem. Their focus on innovators is unmatched." },
  { name: "Desmond Nana A.", when: "4 months ago", body: "The best among the rest." },
];

const Testimonials = () => (
  <section className="relative py-28 md:py-36 px-6 overflow-hidden">
    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-25 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_55%/0.35),transparent_70%)]" />
    <div className="relative max-w-7xl mx-auto">
      <div className="flex items-baseline gap-6 mb-16">
        <span className="eyebrow text-accent">08 — Voices</span>
        <div className="flex-1 divider-elegant" />
      </div>
      <h2 className="font-display font-extrabold text-primary leading-[0.9] mb-16 text-[3rem] md:text-[4.5rem] tracking-tight">
        What people <span className="italic font-light text-accent">say.</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <figure
            key={t.name}
            className={`card-lift relative p-8 rounded-lg bg-background border border-primary/10 flex flex-col ${i === 1 ? "md:translate-y-6" : ""}`}
          >
            <div className="absolute -top-4 left-8 w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-lg">
              <Quote className="w-4 h-4 text-accent-foreground" strokeWidth={2} />
            </div>
            <blockquote className="font-display text-xl text-primary leading-snug flex-1 mb-8 mt-4">
              "{t.body}"
            </blockquote>
            <figcaption className="flex items-center justify-between border-t border-primary/10 pt-6">
              <div>
                <p className="font-bold text-sm text-primary">{t.name}</p>
                <p className="text-[10px] uppercase tracking-widest text-primary/50 mt-1">{t.when}</p>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="w-3.5 h-3.5 fill-accent text-accent" />
                ))}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <a
          href="#"
          className="btn-magnetic inline-flex items-center gap-2 px-8 py-4 border border-primary text-primary text-xs font-bold uppercase tracking-[0.25em] rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Give Us Your Review <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  </section>
);

/* ============================================================
   HUB CTA — cinematic close
   ============================================================ */
const HubCTA = () => (
  <section id="hub" className="relative py-32 md:py-40 px-6 bg-primary text-primary-foreground overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 bg-[radial-gradient(circle,hsl(151_57%_40%),transparent_70%)]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 bg-[radial-gradient(circle,hsl(28_92%_44%/0.4),transparent_70%)]" />
    </div>

    <div className="relative max-w-5xl mx-auto text-center">
      <span className="eyebrow text-accent">Visit The Hub</span>
      <h2 className="font-display font-extrabold leading-[0.9] mt-6 mb-8 text-[3.5rem] md:text-[6rem] tracking-tight">
        Step inside the
        <br />
        <span className="italic font-light text-accent">continent's</span> tech engine.
      </h2>
      <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-10">
        A physical and digital home for builders, mentors and investors shaping Africa's next
        decade of innovation.
      </p>
      <a
        href="#"
        className="btn-magnetic inline-flex items-center gap-2 px-10 py-5 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-[0.3em] rounded-full hover:bg-background hover:text-primary transition-all duration-500"
      >
        Visit The Hub <ArrowUpRight className="w-4 h-4" />
      </a>
    </div>
  </section>
);

/* ============================================================
   PAGE
   ============================================================ */
const Index = () => (
  <>
    <Header />
    <main>
      <Hero />
      <Marquee />
      <VisionMission />
      <CampusTours />
      <Initiatives />
      <Services />
      <ProgramsBand />
      <Portfolio />
      <MeetTheTeam />
      <Testimonials />

      <HubCTA />
    </main>
    <Footer />
  </>
);

export default Index;
