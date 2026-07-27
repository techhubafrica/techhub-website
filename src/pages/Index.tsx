import { useEffect, useState, useRef } from "react";
import {
  ArrowUpRight, Code2, Smartphone, Layout, Building2, ShoppingBag, Sprout,
  ShieldCheck, Star, Quote, Play, Users, Rocket, Globe2, Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Logo from "@/components/Logo";
import heroImg1 from "@/assets/community-gathering.jpg";
import heroImg2 from "@/assets/impact-hero-bg.jpg";
import heroImg3 from "@/assets/our-story-bg.jpg";
import heroImg4 from "@/assets/hands-planting.jpg";


/* ============================================================
   HERO — full-bleed cinematic slideshow
   Swap the `image` fields below with your own photography.
   ============================================================ */
const heroSlides = [
  {
    tag: "Featured Program",
    kicker: "Tech For All",
    title: "Campus Tours 2026",
    body: "A continent-wide movement bringing hackathons, AI workshops, and founder circles into every major university in Ghana.",
    cta: "Explore the Tour",
    href: "#campus",
    image: heroImg1,
    stat: { k: "12", v: "Cities" },
  },
  {
    tag: "Now Building",
    kicker: "The Hub",
    title: "Africa's Innovation Home",
    body: "A physical and digital home for builders, mentors and investors shaping the continent's next decade of technology.",
    cta: "Step Inside",
    href: "#vision",
    image: heroImg2,
    stat: { k: "300+", v: "Innovators" },
  },
  {
    tag: "Live Event",
    kicker: "Hackathon 72",
    title: "Seventy-Two Hours of Impact",
    body: "Elite teams from across Africa converge to build production-grade solutions in three sleepless days.",
    cta: "See the Build",
    href: "#events",
    image: heroImg3,
    stat: { k: "72h", v: "Non-stop" },
  },
  {
    tag: "Publication",
    kicker: "Top 100",
    title: "Innovators & Entrepreneurs",
    body: "The definitive annual list of the founders, engineers, and creators redefining African technology.",
    cta: "Read the Issue",
    href: "#portfolio",
    image: heroImg4,
    stat: { k: "100", v: "Leaders" },
  },
];


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
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [scrollY, setScrollY] = useState(0);

  const INTERVAL = 6500;

  /* auto-advance + progress */
  useEffect(() => {
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
  const px = (mouse.x - 0.5) * 18;
  const py = (mouse.y - 0.5) * 10;
  const parY = Math.min(scrollY, 500);

  const goto = (i: number) => { setActive(i); setProgress(0); };

  return (
    <section className="relative min-h-[100svh] overflow-hidden select-none bg-primary text-primary-foreground">

      {/* ══ FULL-BLEED BACKGROUND SLIDESHOW ══ */}
      <div className="absolute inset-0 z-0" style={{ transform: `translateY(${parY * 0.18}px)` }}>
        {heroSlides.map((s, i) => (
          <div
            key={s.title}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={s.image}
              alt={`${s.kicker} — ${s.title}`}
              className="w-full h-full object-cover"
              style={{
                transform: i === active ? "scale(1.14)" : "scale(1.02)",
                transition: "transform 9s cubic-bezier(0.22,0.61,0.36,1)",
              }}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* ══ CINEMATIC OVERLAYS ══ */}
      {/* brand-tinted base */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-primary/55 mix-blend-multiply" />
      {/* directional gradient for text legibility */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(100deg, hsl(155 61% 8% / 0.92) 0%, hsl(155 61% 10% / 0.72) 38%, hsl(155 61% 12% / 0.25) 68%, transparent 100%)",
        }}
      />
      {/* top & bottom vignettes */}
      <div className="absolute inset-x-0 top-0 h-44 z-[1] pointer-events-none bg-gradient-to-b from-primary/85 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-64 z-[1] pointer-events-none bg-gradient-to-t from-primary/95 via-primary/40 to-transparent" />
      {/* amber ambient glow */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `radial-gradient(700px circle at ${mouse.x * 100}% ${mouse.y * 100}%, hsl(28 92% 50% / 0.13), transparent 62%)`,
        }}
      />
      {/* fine grain */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* ══ SIGNATURE CONSTELLATION ══ */}
      <div
        className="absolute -top-10 -right-16 md:top-16 md:right-8 w-[360px] md:w-[520px] h-[360px] md:h-[520px] pointer-events-none z-[2] opacity-70"
        style={{
          transform: `translate(${px * 0.5}px, ${py * 0.5 - parY * 0.1}px)`,
          transition: "transform 1s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <Constellation className="w-full h-full" />
      </div>

      {/* Vertical brand rail */}
      <div className="hidden xl:flex absolute left-6 top-0 bottom-0 flex-col items-center justify-between py-32 z-10 pointer-events-none">
        <div className="flex flex-col items-center gap-4">
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-primary-foreground/30" />
          <span className="text-[8.5px] font-bold uppercase tracking-[0.55em] text-primary-foreground/45 [writing-mode:vertical-rl] rotate-180">
            Est · MMXXIV
          </span>
        </div>
        <div className="flex flex-col items-center gap-4">
          <span className="text-[8.5px] font-bold uppercase tracking-[0.55em] text-primary-foreground/45 [writing-mode:vertical-rl] rotate-180">
            Accra · Ghana
          </span>
          <div className="w-px h-16 bg-gradient-to-t from-transparent to-primary-foreground/30" />
        </div>
      </div>

      {/* ══ CONTENT ══ */}
      <div className="relative z-10 min-h-[100svh] flex flex-col max-w-[1360px] mx-auto w-full px-6 xl:px-20 pt-32 md:pt-36 pb-10">

        {/* Chapter label */}
        <div className="flex items-center gap-5 mb-auto">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 backdrop-blur-md">
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-accent opacity-60" />
              <span className="relative w-2 h-2 rounded-full bg-accent" />
            </span>
            <span className="text-[10px] font-bold tracking-[0.32em] uppercase text-primary-foreground/75">
              {slide.tag}
            </span>
          </div>
          <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-primary-foreground/25 to-transparent" />
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-primary-foreground/40 hidden md:block">
            {String(active + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
          </span>
        </div>

        {/* Headline block — keyed for per-slide reveal */}
        <div
          key={slide.title}
          className="glass-panel noise-soft relative max-w-[880px] mt-16 md:mt-20 rounded-[26px] p-8 md:p-12 animate-fade-up"
          style={{ transform: `translate(${px * 0.25}px, ${py * 0.25}px)` }}
        >
          {/* corner light */}
          <div className="pointer-events-none absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-primary-foreground/60 to-transparent" />
          <div className="pointer-events-none absolute inset-0 rounded-[26px] bg-[radial-gradient(120%_90%_at_0%_0%,hsl(28_92%_55%/0.14),transparent_60%)]" />

          <p className="animate-fade-up text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] text-accent mb-6">
            {slide.kicker}
          </p>

          <h1
            className="animate-fade-up stagger-1 font-display font-black tracking-[-0.045em] text-primary-foreground"
            style={{
              lineHeight: 0.88,
              fontSize: "clamp(2.4rem,6.4vw,5.6rem)",
              textShadow: "0 18px 50px hsl(155 61% 6% / 0.55)",
            }}
          >
            {slide.title}
          </h1>

          <div className="animate-fade-up stagger-2 mt-8 flex gap-5 max-w-[560px]">
            <div className="w-px bg-gradient-to-b from-accent/70 via-primary-foreground/25 to-transparent flex-shrink-0" />
            <p className="text-primary-foreground/85 text-[15px] md:text-[17px] leading-[1.85] font-light">
              {slide.body}
            </p>
          </div>


          <div className="animate-fade-up stagger-3 flex flex-wrap items-center gap-5 mt-10">
            <a
              href={slide.href}
              className="btn-magnetic group inline-flex items-center gap-3 px-9 py-4 bg-accent text-accent-foreground text-[11px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-primary-foreground hover:text-primary transition-all duration-500"
              style={{ boxShadow: "0 14px 40px -12px hsl(28 92% 44% / 0.55)" }}
            >
              {slide.cta}
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#campus"
              className="group inline-flex items-center gap-3 text-[11px] font-bold text-primary-foreground/80 hover:text-accent transition-colors uppercase tracking-[0.28em]"
            >
              <div className="w-11 h-11 rounded-full border border-primary-foreground/30 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all backdrop-blur-sm">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              Watch the film
            </a>
          </div>
        </div>

        {/* ══ BOTTOM BAR — slide switcher + stats ══ */}
        <div className="mt-16 md:mt-20 glass-panel rounded-[22px] px-6 md:px-8 py-6 flex flex-col lg:flex-row lg:items-end gap-10 justify-between">

          {/* Slide switcher */}
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {heroSlides.map((s, i) => (
              <button
                key={s.title}
                onClick={() => goto(i)}
                className="group text-left max-w-[180px]"
                aria-label={`Show ${s.title}`}
              >
                <div className="relative h-px w-full bg-primary-foreground/20 mb-3 overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-100"
                    style={{ width: i === active ? `${progress}%` : i < active ? "0%" : "0%" }}
                  />
                </div>
                <p
                  className={`text-[9.5px] font-black uppercase tracking-[0.32em] transition-colors ${
                    i === active ? "text-accent" : "text-primary-foreground/45 group-hover:text-primary-foreground/80"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")} · {s.kicker}
                </p>
              </button>
            ))}
          </div>

          {/* Floating glass stat */}
          <div className="flex items-end gap-6">
            <div className="glass-panel sheen rounded-2xl px-6 py-5 animate-float">
              <p className="font-display font-black text-4xl leading-none text-primary-foreground">
                {slide.stat.k}
              </p>
              <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-accent mt-2">
                {slide.stat.v}
              </p>
            </div>
            <div className="hidden sm:flex flex-col items-center gap-1.5 pb-2">
              <span className="text-[8.5px] font-bold uppercase tracking-[0.4em] text-primary-foreground/40">Scroll</span>
              <div className="w-px h-8 bg-gradient-to-b from-primary-foreground/40 to-transparent" />
            </div>
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
            className="card-lift sheen group relative rounded-2xl overflow-hidden glass-cream"
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
            className="card-lift sheen noise-soft group relative p-10 lg:p-12 rounded-2xl glass-panel overflow-hidden"
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
            className="card-lift sheen group relative rounded-2xl glass-panel p-8 overflow-hidden"
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
      <Testimonials />

      <HubCTA />
    </main>
    <Footer />
  </>
);

export default Index;
