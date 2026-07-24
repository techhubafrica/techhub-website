import { useEffect, useState, useRef } from "react";
import {
  ArrowUpRight, Code2, Smartphone, Layout, Building2, ShoppingBag, Sprout,
  ShieldCheck, Star, Quote, Play, Users, Rocket, Globe2, Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Logo from "@/components/Logo";

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

const Hero = () => {
  const [active, setActive]   = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const [wordOut, setWordOut] = useState(false);
  const [mouse, setMouse]     = useState({ x: 0.5, y: 0.5 });
  const [progress, setProgress] = useState(0);

  /* slide auto-advance */
  useEffect(() => {
    const INTERVAL = 5500;
    let elapsed = 0;
    const tick = setInterval(() => {
      elapsed += 50;
      setProgress(Math.min(100, (elapsed / INTERVAL) * 100));
      if (elapsed >= INTERVAL) {
        elapsed = 0;
        setActive((a) => (a + 1) % heroSlides.length);
      }
    }, 50);
    return () => clearInterval(tick);
  }, []);

  /* morphing word cycle */
  useEffect(() => {
    const t = setInterval(() => {
      setWordOut(true);
      setTimeout(() => { setWordIdx((i) => (i + 1) % cyclicWords.length); setWordOut(false); }, 380);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  /* mouse tracking */
  useEffect(() => {
    const h = (e: MouseEvent) =>
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", h, { passive: true });
    return () => window.removeEventListener("mousemove", h);
  }, []);

  const slide = heroSlides[active];
  const px = (mouse.x - 0.5) * 28;
  const py = (mouse.y - 0.5) * 12;

  return (
    <section className="relative min-h-screen bg-background overflow-hidden flex flex-col select-none">

      {/* ══ CURSOR SPOTLIGHT ══ */}
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-[background] duration-200"
        style={{
          background: `radial-gradient(700px circle at ${mouse.x * 100}% ${mouse.y * 100}%,
            hsl(28 92% 44% / 0.065), transparent 55%)`,
        }}
      />

      {/* ══ GHOST MEGA TEXT (parallax) ══ */}
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none">
        <span
          className="font-display font-black uppercase leading-none tracking-tighter"
          style={{
            fontSize: "31vw",
            opacity: 0.026,
            color: "hsl(155,61%,15%)",
            transform: `translate(${px * -1.6}px, ${py * -1.1}px)`,
            transition: "transform 1.6s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          THA
        </span>
      </div>

      {/* ══ CONCENTRIC RINGS (parallax) ══ */}
      <div
        className="absolute -top-48 -right-48 pointer-events-none"
        style={{
          transform: `translate(${px * 0.45}px, ${py * 0.45}px)`,
          transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div className="w-[680px] h-[680px] rounded-full border border-accent/[0.13]" />
        <div className="absolute top-[90px] left-[90px] w-[500px] h-[500px] rounded-full border border-accent/[0.09]" />
        <div className="absolute top-[175px] left-[175px] w-[330px] h-[330px] rounded-full border border-accent/[0.06]" />
        <div className="absolute top-[250px] left-[250px] w-[180px] h-[180px] rounded-full border border-accent/[0.06]" />
      </div>

      {/* ══ DOT MATRIX (8×8, parallax) ══ */}
      <div
        className="absolute top-36 right-[42%] grid grid-cols-8 gap-[9px] pointer-events-none hidden lg:grid"
        style={{
          opacity: 0.2,
          transform: `translate(${px * 0.25}px, ${py * 0.25}px)`,
          transition: "transform 1.1s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {Array.from({ length: 64 }).map((_, i) => (
          <div
            key={i}
            className="w-[2.5px] h-[2.5px] rounded-full bg-accent"
            style={{ opacity: i % 4 === 0 ? 1 : i % 3 === 0 ? 0.55 : 0.2 }}
          />
        ))}
      </div>

      <div className="absolute top-[19%] inset-x-0 pointer-events-none hidden lg:block">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/6 to-transparent" />
        </div>
      </div>

      {/* ══ MAIN CONTENT ══ */}
      <div className="relative flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-8 flex flex-col z-10">
        <div className="flex-1 grid lg:grid-cols-[1.15fr_0.95fr] gap-12 lg:gap-16 items-center">

          {/* ─── LEFT COLUMN ─── */}
          <div className="relative z-10 flex flex-col justify-center">

            {/* Eyebrow Pill */}
            <div className="animate-fade-up flex items-center gap-4 mb-9">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-primary/14 rounded-full bg-background/80 backdrop-blur-sm">
                <span className="relative flex w-2 h-2">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-accent opacity-60" />
                  <span className="relative w-2 h-2 rounded-full bg-accent" />
                </span>
                <span className="text-[10.5px] font-bold tracking-[0.28em] uppercase text-primary/60">
                  Tech Hub Africa · Est. 2024
                </span>
              </div>
              <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-primary/20 to-transparent" />
              <span className="text-[9.5px] font-bold uppercase tracking-[0.35em] text-primary/30 hidden md:block">Accra, Ghana</span>
            </div>

            {/* ── GIANT TYPOGRAPHY HEADLINE ── */}
            <h1
              className="font-display font-black tracking-[-0.04em] text-primary mb-9"
              style={{ lineHeight: 0.83 }}
            >
              {/* Line 1: African */}
              <span className="block overflow-hidden">
                <span
                  className="block animate-fade-up"
                  style={{ fontSize: "clamp(3.4rem,9vw,7.4rem)" }}
                >
                  African
                </span>
              </span>

              {/* Line 2: morphing word */}
              <span
                className="block overflow-hidden"
                style={{ fontSize: "clamp(3.4rem,9vw,7.4rem)" }}
              >
                <span
                  className="inline-block italic font-light text-accent"
                  style={{
                    transform: wordOut ? "translateY(-115%)" : "translateY(0)",
                    opacity: wordOut ? 0 : 1,
                    transition: wordOut
                      ? "transform 0.3s cubic-bezier(0.4,0,1,1), opacity 0.2s ease"
                      : "transform 0.42s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
                  }}
                >
                  {cyclicWords[wordIdx]}
                </span>
              </span>

              {/* Line 3: Excellence + animated underline */}
              <span className="block overflow-hidden relative">
                <span
                  className="block animate-fade-up stagger-2 relative"
                  style={{ fontSize: "clamp(3.4rem,9vw,7.4rem)" }}
                >
                  Excellence
                  <svg
                    className="absolute left-0 -bottom-1 w-[105%]"
                    viewBox="0 0 640 13"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <path
                      d="M3 8 C90 1, 210 12, 320 6 C430 0, 558 12, 637 7"
                      stroke="hsl(28,92%,44%)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeDasharray="720"
                      strokeDashoffset="720"
                      style={{ animation: "draw 1.8s cubic-bezier(0.16,1,0.3,1) 0.9s both" }}
                    />
                  </svg>
                </span>
              </span>
            </h1>

            {/* Description */}
            <p className="animate-fade-up stagger-2 text-primary/65 max-w-xl text-base md:text-lg leading-[1.85] mb-9 font-light">
              Bridging talent and opportunity through world-class infrastructure, elite mentorship,
              and high-impact digital solutions <span className="text-primary font-medium">across the continent.</span>
            </p>

            {/* CTAs */}
            <div className="animate-fade-up stagger-3 flex flex-wrap items-center gap-4 mb-12">
              <a
                href="#vision"
                className="group inline-flex items-center gap-2.5 px-8 py-4 bg-primary text-primary-foreground text-[11px] font-bold uppercase tracking-[0.28em] rounded-full hover:bg-secondary transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Our Vision
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="#campus"
                className="group inline-flex items-center gap-3 text-[11px] font-bold text-primary/70 hover:text-accent transition-colors uppercase tracking-[0.25em] px-4 py-2"
              >
                <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                Campus Tours 2026
              </a>
            </div>

            {/* COUNTING STATS */}
            <div className="animate-fade-up stagger-4 grid grid-cols-3 max-w-sm border-t border-primary/10 pt-7">
              <CountStat target={5}  suffix="+" label="Years"     delay={200} divider={false} />
              <CountStat target={20} suffix="+" label="Programs"  delay={400} divider={true}  />
              <CountStat target={4}  suffix=""  label="Companies" delay={600} divider={true}  />
            </div>
          </div>

          {/* ─── RIGHT COLUMN — Showcase panel ─── */}
          <div className="relative animate-fade-up stagger-1 self-stretch flex items-center py-8 lg:py-0">

            {/* Rotated sidebar label */}
            <div className="hidden xl:block absolute -left-11 top-1/2 -translate-y-1/2 -rotate-90 origin-center whitespace-nowrap">
              <p className="text-[8px] font-bold uppercase tracking-[0.65em] text-primary/14">
                Africa · Innovation · Excellence · 2024
              </p>
            </div>

            {/* Offset decorative frame */}
            <div className="absolute -top-3 -right-3 bottom-[-12px] left-[-12px] border border-accent/16 rounded-[24px] pointer-events-none" />

            {/* ── IMAGE PANEL ── */}
            <div
              className="relative w-full rounded-[22px] overflow-hidden"
              style={{
                aspectRatio: "3/4",
                maxHeight: "min(680px, 74vh)",
                boxShadow:
                  "0 32px 72px -16px hsl(155 61% 15% / 0.24), 0 8px 24px -8px hsl(155 61% 15% / 0.12)",
              }}
            >
              {/* Slides */}
              {heroSlides.map((s, i) => (
                <div
                  key={s.title}
                  className={`absolute inset-0 transition-opacity duration-[900ms] ease-in-out ${
                    i === active ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <ImagePlaceholder tone={s.tone} label={s.kicker} />

                  {/* Subtle top gradient */}
                  <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/15 to-transparent pointer-events-none z-[3]" />

                  {/* Slide number — top-left */}
                  <div className="absolute top-4 left-4 z-[4]">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/50">
                      {String(i + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Bottom glass info card */}
                  <div className="absolute inset-x-3 bottom-3 z-[4]">
                    <div
                      className="rounded-2xl px-4 py-3.5 border border-white/25"
                      style={{
                        background: "hsl(40 33% 94% / 0.88)",
                        backdropFilter: "blur(20px) saturate(160%)",
                        WebkitBackdropFilter: "blur(20px) saturate(160%)",
                      }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[8.5px] font-bold uppercase tracking-[0.35em] text-accent mb-0.5">{s.tag}</p>
                          <h3 className="font-display font-extrabold text-[0.95rem] text-primary leading-tight truncate">
                            {s.title}
                          </h3>
                        </div>
                        <a
                          href="#"
                          className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-secondary transition-colors"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5 text-primary-foreground" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Vertical slide pills — right inside panel */}
              <div className="absolute top-1/2 -translate-y-1/2 right-3.5 z-20 flex flex-col gap-1.5">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={`w-[2.5px] rounded-full transition-all duration-500 ${
                      i === active ? "h-9 bg-accent" : "h-3 bg-white/35 hover:bg-white/65"
                    }`}
                  />
                ))}
              </div>

              {/* Slide progress bar — bottom of panel */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary/10 z-20">
                <div
                  className="h-full bg-accent transition-none"
                  style={{ width: `${progress}%`, transition: "width 50ms linear" }}
                />
              </div>
            </div>

            {/* Floating Est. badge */}
            <div
              className="hidden md:flex absolute -top-6 -left-6 z-20 w-[72px] h-[72px] rounded-full bg-accent flex-col items-center justify-center animate-float"
              style={{ boxShadow: "0 6px 22px -4px hsl(28 92% 44% / 0.55)" }}
            >
              <p className="text-[7.5px] font-bold uppercase tracking-[0.22em] text-white/65">Est.</p>
              <p className="font-display font-black text-[1.45rem] text-white leading-none">2024</p>
            </div>

            {/* Live stat card */}
            <div
              className="hidden md:block absolute -bottom-10 -left-10 z-20 bg-background rounded-[18px] px-5 py-4 animate-float"
              style={{
                animationDelay: "1.2s",
                minWidth: "160px",
                border: "1px solid hsl(155 61% 15% / 0.08)",
                boxShadow: "0 14px 40px -8px hsl(155 61% 15% / 0.14)",
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[8.5px] font-bold uppercase tracking-[0.32em] text-accent">
                  {slide.stat.v}
                </span>
              </div>
              <p
                className="font-display font-black text-primary leading-none tracking-[-0.04em]"
                style={{ fontSize: "2.85rem" }}
              >
                {slide.stat.k}
              </p>
            </div>

            {/* Corner accent bracket */}
            <div className="hidden lg:block absolute -bottom-2 -right-2 z-20">
              <div className="w-6 h-6 border-r border-b border-accent/30" />
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="mt-7 pt-5 border-t border-primary/7 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-[0.45em] text-primary/20">
              Accra, Ghana · West Africa
            </span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[8.5px] font-bold uppercase tracking-[0.38em] text-primary/18">Scroll</span>
            <div className="w-px h-7 bg-gradient-to-b from-primary/16 to-transparent" />
          </div>
          <span className="text-[9.9px] font-bold uppercase tracking-[0.45em] text-primary/20 hidden md:block">
            Since 2024 · Building Africa
          </span>
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
      <Testimonials />
      <HubCTA />
    </main>
    <Footer />
  </>
);

export default Index;
