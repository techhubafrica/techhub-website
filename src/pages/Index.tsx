import { useEffect, useState, useRef } from "react";
import {
  ArrowUpRight, Award, Code2, Layout, Building2, ShoppingBag, Sprout, Workflow,
  ShieldCheck, Star, Quote, Play, Users, Rocket, Globe2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import {
  heroAudience, heroCelebration, heroPanel,
  awardTop100, awardWhosWho,
  serviceProgramming, serviceSoftware, serviceWebDesign,
} from "@/assets/photos";
import { techGuruAudience, techGuruShowcase, techGuruNetworking, techGuruPanel } from "@/assets/tech-guru";
import Marquee from "@/components/Marquee";
import { Link } from "react-router-dom";
import ClientShowcase from "@/components/ClientShowcase";



/* ============================================================
   HERO — full-bleed cinematic slideshow
   ============================================================ */
const heroSlides = [
  {
    tag: "Community-Focused", kicker: "Community-Focused", title: "One Community. Endless Possibilities.",
    body: "A growing community of innovators, creators and changemakers working together to make a difference.",
    cta: "Explore Our Community", href: "/about", image: heroCelebration,
    stat: { k: "01", v: "Community" },
  },
  {
    tag: "Connected Workplace", kicker: "Corporate Intranet", title: "Your Teams, Connected",
    body: "Bring company knowledge, employee communication and everyday workflows together in a corporate intranet.",
    cta: "Connect Your Workplace", href: "/services#productivity", image: techGuruNetworking,
    stat: { k: "02", v: "Workplace" },
  },
  {
    tag: "Business Platforms", kicker: "Nkabom™ CRM", title: "Every Relationship Matters",
    body: "Connect customer records, sales pipelines and corporate communication in one cohesive business platform.",
    cta: "Explore Nkabom™", href: "/services#productivity", image: techGuruPanel,
    stat: { k: "03", v: "Customer Success" },
  },
  {
    tag: "Flagship Gathering", kicker: "Tech Guru Meetup", title: "Where Business Connects",
    body: "Meet founders, industry leaders and investors at Tech Guru Meetup — Africa’s business and technology community, together.",
    cta: "Explore the Meetup", href: "https://events.techhubafrica.org", external: true, image: techGuruAudience,
    stat: { k: "2026", v: "Tech Guru Meetup" },
  },
  {
    tag: "Cybersecurity", kicker: "Threat Lock", title: "Protect What You Build",
    body: "The Threat Lock cybersecurity ecosystem helps safeguard your organisation’s websites and digital infrastructure.",
    cta: "Explore Threat Lock", href: "/services#productivity", image: techGuruShowcase,
    stat: { k: "05", v: "Security" },
  },
];

const INTERVAL = 6500;

const Hero = () => {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(0);
  const [maxLoaded, setMaxLoaded] = useState(1);
  const stageRef = useRef<HTMLElement | null>(null);

  /* auto-advance */
  useEffect(() => {
    const t = setInterval(() => {
      setActive((a) => {
        setPrev(a);
        return (a + 1) % heroSlides.length;
      });
    }, INTERVAL);
    return () => clearInterval(t);
  }, []);

  /* progressive image loading */
  useEffect(() => {
    setMaxLoaded((m) => Math.max(m, active + 1));
  }, [active]);

  /* pointer glow + scroll parallax — rAF, no React re-renders */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduced) return;

    let mx = 0.5, my = 0.5, sy = 0, frame = 0, inView = true;

    const paint = () => {
      frame = 0;
      el.style.setProperty("--hx", `${(mx * 100).toFixed(2)}%`);
      el.style.setProperty("--hy", `${(my * 100).toFixed(2)}%`);
      el.style.setProperty("--pmx", `${((mx - 0.5) * 18).toFixed(2)}px`);
      el.style.setProperty("--pmy", `${((my - 0.5) * 10).toFixed(2)}px`);
      el.style.setProperty("--par", `${Math.min(sy, 500).toFixed(0)}px`);
    };
    const schedule = () => {
      if (!frame && inView) frame = requestAnimationFrame(paint);
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
      schedule();
    };
    const onScroll = () => {
      sy = window.scrollY;
      schedule();
    };

    if (finePointer) window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        el.dataset.inview = String(inView);
      },
      { threshold: 0 },
    );
    io.observe(el);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const slide = heroSlides[active];
  const goto = (i: number) => {
    setPrev(active);
    setActive(i);
  };

  return (
    <section
      ref={stageRef}
      className="hero-stage relative min-h-[100svh] overflow-hidden select-none bg-background text-foreground"
    >
      {/* ══ FULL-BLEED BACKGROUND SLIDESHOW ══ */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transform: "translate3d(0, calc(var(--par, 0px) * 0.18), 0)" }}
      >
        {heroSlides.map((s, i) => {
          /* active slide fades in on top; previous slide stays visible underneath; all others hidden */
          const isActive = i === active;
          const isPrev = i === prev && prev !== active;
          return (
            <div
              key={s.title}
              aria-hidden={!isActive}
              className={`absolute inset-0 ${
                isActive
                  ? "opacity-100 z-[2] transition-opacity duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  : isPrev
                    ? "opacity-100 z-[1]"
                    : "opacity-0 z-0"
              }`}
            >
              {i <= maxLoaded && (
                <img
                  src={s.image}
                  alt={`${s.kicker} — ${s.title}`}
                  className="w-full h-full object-cover"
                  style={{
                    transform: isActive ? "scale(1.14)" : "scale(1.02)",
                    transition: "transform 9s cubic-bezier(0.22,0.61,0.36,1)",
                    filter: "brightness(1.1) saturate(1.06)",
                  }}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding={i === 0 ? "sync" : "async"}
                  fetchPriority={i === 0 ? "high" : "low"}
                  draggable={false}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Softer left scrim keeps copy clear while letting the photos feel bright. */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, hsl(0 0% 0% / 0.4) 0%, hsl(0 0% 0% / 0.24) 35%, hsl(0 0% 0% / 0.06) 60%, transparent 80%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-80 z-[1] pointer-events-none bg-gradient-to-t from-black/55 via-black/25 to-transparent" />

      {/* amber ambient glow — position driven by CSS vars */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none hidden md:block"
        style={{
          background:
            "radial-gradient(700px circle at var(--hx, 50%) var(--hy, 50%), hsl(28 92% 50% / 0.12), transparent 62%)",
        }}
      />
      {/* fine grain */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Vertical brand rail */}
      <div className="hidden xl:flex absolute left-8 top-0 bottom-0 flex-col items-center justify-between py-24 md:py-32 z-10 pointer-events-none">
        <div className="flex flex-col items-center gap-4">
          <div className="w-px h-20 bg-gradient-to-b from-transparent to-white/20" />
          <span className="text-[8.5px] font-bold uppercase tracking-[0.55em] text-white/40 [writing-mode:vertical-rl] rotate-180">
            Est · MMXXIV
          </span>
        </div>
        <div className="flex flex-col items-center gap-4">
          <span className="text-[8.5px] font-bold uppercase tracking-[0.55em] text-white/40 [writing-mode:vertical-rl] rotate-180">
            Accra · Ghana
          </span>
          <div className="w-px h-20 bg-gradient-to-t from-transparent to-white/20" />
        </div>
      </div>

      {/* ══ CONTENT ══ */}
      <div className="relative z-10 min-h-[100svh] flex flex-col max-w-[1360px] mx-auto w-full px-5 sm:px-8 xl:px-24 pt-24 sm:pt-32 md:pt-36 pb-5 md:pb-12">

        {/* Chapter label */}
        <div className="flex items-center gap-5 mb-7 sm:mb-auto">
          <div className="inline-flex items-center gap-3 pl-3 pr-4 py-1.5 rounded-full border border-white/12 bg-white/5 backdrop-blur-sm">
            <span className="relative flex w-1.5 h-1.5">
              <span className="animate-ping absolute h-full w-full rounded-full bg-accent opacity-60" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-accent" />
            </span>
            <span className="text-[9.5px] font-extrabold tracking-[0.34em] uppercase text-white/90" style={{ textShadow: "0 1px 6px hsl(0 0% 0% / 0.5)" }}>
              {slide.tag}
            </span>
          </div>
          <div className="h-px flex-1 max-w-32 bg-gradient-to-r from-white/15 to-transparent" />
        </div>

        {/* Headline block — keyed for per-slide reveal */}
        <div key={slide.title} className="relative max-w-[860px] mt-0 sm:mt-12 md:mt-16">
          <div className="flex items-center gap-4 mb-4 sm:mb-6 animate-fade-up">
            <span className="h-px w-10 bg-accent" />
            <p className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.32em] sm:tracking-[0.5em] text-accent">
              {slide.kicker}
            </p>
          </div>

          <h1
            className="animate-fade-up stagger-1 font-display font-black tracking-[-0.05em] text-white"
            style={{
              lineHeight: 0.88,
              fontSize: "clamp(2.4rem,7.2vw,6.2rem)",
              textShadow: "0 2px 20px hsl(0 0% 0% / 0.7), 0 4px 40px hsl(0 0% 0% / 0.4)",
            }}
          >
            {slide.title}
          </h1>

          {/* description — editorial column */}
          <div className="animate-fade-up stagger-2 mt-5 sm:mt-8 max-w-[540px] border-t border-white/15 pt-4 sm:pt-6 flex gap-4 sm:gap-6">
            <span className="font-display font-black text-[11px] leading-none text-accent pt-1.5 tabular-nums">
              {String(active + 1).padStart(2, "0")}
            </span>
            <p className="text-white/90 text-[15px] md:text-[17px] leading-[1.75] font-semibold" style={{ textShadow: "0 1px 8px hsl(0 0% 0% / 0.6)" }}>
              {slide.body}
            </p>
          </div>

          <div className="animate-fade-up stagger-3 flex flex-wrap items-center gap-4 sm:gap-6 mt-6 sm:mt-10">
            {slide.external ? (
              <a
                href={slide.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-magnetic group inline-flex items-center gap-3 px-6 py-3.5 sm:px-9 sm:py-4 bg-accent text-accent-foreground text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.22em] sm:tracking-[0.3em] rounded-full hover:bg-white hover:text-foreground transition-all duration-500"
                style={{ boxShadow: "0 18px 46px -16px hsl(28 92% 44% / 0.55)" }}
              >
                {slide.cta}
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            ) : (
              <Link
                to={slide.href}
                className="btn-magnetic group inline-flex items-center gap-3 px-6 py-3.5 sm:px-9 sm:py-4 bg-accent text-accent-foreground text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.22em] sm:tracking-[0.3em] rounded-full hover:bg-white hover:text-foreground transition-all duration-500"
                style={{ boxShadow: "0 18px 46px -16px hsl(28 92% 44% / 0.55)" }}
              >
                {slide.cta}
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            )}
            <Link
              to="/about"
              className="group inline-flex items-center gap-3 text-[10px] sm:text-[10.5px] font-extrabold text-white hover:text-accent transition-colors uppercase tracking-[0.2em] sm:tracking-[0.28em]" style={{ textShadow: "0 1px 6px hsl(0 0% 0% / 0.5)" }}
            >
              Learn More
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ══ BOTTOM BAR — trust strip + index ladder + stat ══ */}
        <div className="mt-auto pt-6 sm:pt-12 flex flex-col gap-5 sm:gap-8">

          {/* Trust metrics */}
          <div className="hero-trust-strip">
            <div className="trust-item">
              <span className="font-display font-black text-accent text-lg" style={{ textShadow: "0 1px 8px hsl(0 0% 0% / 0.7)" }}>CRM</span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-white/80 font-extrabold" style={{ textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}>Customer Platforms</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              <span className="font-display font-black text-accent text-lg" style={{ textShadow: "0 1px 8px hsl(0 0% 0% / 0.7)" }}>Intranet</span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-white/80 font-extrabold" style={{ textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}>Connected Teams</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              <span className="font-display font-black text-accent text-lg" style={{ textShadow: "0 1px 8px hsl(0 0% 0% / 0.7)" }}>10+</span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-white/80 font-extrabold" style={{ textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}>Countries</span>
            </div>
          </div>

          {/* Index ladder + stat */}
          <div className="flex flex-col-reverse lg:flex-row lg:items-end gap-8 lg:gap-14 justify-between">

            {/* Index ladder */}
            <div className="flex-1 min-w-0 max-w-2xl">
              <div className="flex items-baseline justify-between gap-6 mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-black text-white text-3xl md:text-4xl leading-none tabular-nums" style={{ textShadow: "0 2px 10px hsl(0 0% 0% / 0.7)" }}>
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[9.5px] font-extrabold uppercase tracking-[0.35em] text-white/70" style={{ textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}>
                    / {String(heroSlides.length).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-[9.5px] font-black uppercase tracking-[0.32em] text-accent truncate" style={{ textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}>
                  {slide.kicker}
                </span>
              </div>
              <div className="flex items-stretch gap-1.5">
                {heroSlides.map((s, i) => (
                  <button
                    key={s.title}
                    onClick={() => goto(i)}
                    aria-label={`Show ${s.title}`}
                    aria-current={i === active}
                    className={`group relative h-8 flex items-end transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      i === active ? "flex-grow-[3]" : "flex-grow"
                    }`}
                    style={{ flexBasis: 0 }}
                  >
                    <span className="relative block w-full h-[2px] bg-white/15 overflow-hidden group-hover:bg-white/30 transition-colors">
                      {i === active && (
                        <span key={active} className="hero-progress absolute inset-y-0 left-0 bg-accent" />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stat plate + scroll cue */}
            <div className="hidden sm:flex items-end gap-6 shrink-0">
              <div className="relative px-7 py-5 border border-white/10 bg-white/5 backdrop-blur-md">
                <span className="absolute -top-px -left-px w-2.5 h-2.5 border-t border-l border-accent" />
                <span className="absolute -bottom-px -right-px w-2.5 h-2.5 border-b border-r border-accent" />
                <p className="font-display font-black text-4xl leading-none text-white tabular-nums">
                  {slide.stat.k}
                </p>
                <p className="text-[8.5px] font-bold uppercase tracking-[0.35em] text-accent mt-2">
                  {slide.stat.v}
                </p>
              </div>
              <div className="hidden sm:flex flex-col items-center gap-1.5 pb-2">
                <span className="text-[8.5px] font-extrabold uppercase tracking-[0.4em] text-white/70" style={{ textShadow: "0 1px 6px hsl(0 0% 0% / 0.7)" }}>Scroll</span>
                <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
              </div>
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

/* ============================================================
   VISION & MISSION — white chapter with overlapping accent
   ============================================================ */
const VisionMission = () => (
  <section id="vision" className="relative py-16 sm:py-12 sm:py-16 md:py-20 lg:py-28 lg:py-36 px-5 sm:px-6 lg:px-10 overflow-hidden">
    <div className="hidden md:block absolute -top-24 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_55%/0.35),transparent_70%)]" />
    <div className="relative max-w-7xl mx-auto">
      <div className="flex items-baseline gap-6 mb-16">
        <span className="eyebrow text-accent">01 — Foundations</span>
        <div className="flex-1 divider-elegant" />
        <span className="eyebrow text-foreground/40 hidden md:inline">The North Star</span>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-7">
          <h2 className="font-display font-extrabold text-foreground leading-[0.9] mb-12 text-[2.2rem] sm:text-[3.5rem] md:text-[5rem] tracking-tight">
            A future where
            <br />
            Africa <span className="italic font-light text-accent">leads.</span>
          </h2>
        </div>

        <div className="lg:col-span-5 space-y-10 lg:pt-8">
          <div className="relative pl-6 border-l border-accent/60">
            <p className="eyebrow text-accent mb-3">Our Vision</p>
            <p className="text-foreground/80 leading-relaxed">
              A future where Africa is recognized as a global leader in technology, science and
              engineering — where innovation thrives, talent is nurtured, and the continent's
              contributions are celebrated.
            </p>
          </div>
          <div className="relative pl-6 border-l border-foreground/25">
            <p className="eyebrow text-foreground/60 mb-3">Our Mission</p>
            <p className="text-foreground/80 leading-relaxed">
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
   AWARDS & RECOGNITION
   ============================================================ */
const awards: { title: string; detail: string; category: string; image?: string }[] = [
  {
    title: "Featured in the TOP 100 Innovators & Entrepreneurs",
    detail: "Doreen Awuku-Agyeman, Co-Founder and CEO, was featured in the magazine for her work across energy, technology, and telecommunications and her support for Africa’s tech ecosystem.",
    category: "Industry Recognition",
    image: awardTop100,
  },
  {
    title: "Marquis Who’s Who 2025",
    detail: "Tech Hub Africa’s official recognition archive highlights this 2025 Marquis Who’s Who recognition among its professional honors.",
    category: "Professional Recognition",
    image: awardWhosWho,
  },
  {
    title: "Recognition for Jemima Prempeh",
    detail: "The official profile celebrates Co-Founder and COO Jemima Prempeh’s leadership in innovation and marketing communications, drawing on more than two decades of experience.",
    category: "Leadership Recognition",
  },
  {
    title: "Citation of Appreciation — UPSA",
    detail: "UPSA honored Kingsley Aduhene for his contribution to its PR and Communication Conference. He presented on technology and communication and shared practical ways to use digital tools.",
    category: "Individual Recognition",
  },
  {
    title: "Excellence in Tech Ecosystem Support and Innovation Advocacy",
    detail: "Awarded to Tech Hub Africa at the 2nd Ghana Strategic Customer Relations Conference and Awards 2025.",
    category: "Organizational Award · 2025",
  },
  {
    title: "Cybersecurity Professional Development",
    detail: "Doreen Awuku-Agyeman earned a Certificate of Completion and 7 CPE credits at Cybersecurity Summit: Atlanta.",
    category: "Professional Development · 2026",
  },
  {
    title: "30 Black Stars Recognition",
    detail: "The official profile notes Doreen Awuku-Agyeman’s recognition in the United States by the organizers of 30 Black Stars.",
    category: "Leadership Recognition",
  },
  {
    title: "Business Executive Recognition",
    detail: "Business Executive in Ghana recognized Doreen Awuku-Agyeman for supporting technology ecosystems and advancing innovation.",
    category: "Industry Recognition",
  },
];

const AwardsRecognition = () => (
  <section id="awards" className="relative py-16 sm:py-20 md:py-28 lg:py-36 px-5 sm:px-6 lg:px-10 bg-cream overflow-hidden">
    <div className="hidden md:block absolute top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-25 pointer-events-none bg-[radial-gradient(circle,hsl(var(--primary)/0.5),transparent_70%)]" />
    <div className="relative max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-12 sm:mb-16">
        <div>
          <span className="eyebrow text-accent">Awards &amp; Recognition</span>
          <h2 className="font-display font-extrabold text-foreground mt-4 leading-[0.95] text-[2.1rem] sm:text-[3rem] md:text-[4.5rem] tracking-tight">
            Celebrating <span className="italic font-light text-accent">excellence.</span>
          </h2>
        </div>
        <p className="text-foreground/60 max-w-sm leading-relaxed">
          Recognitions and achievements honoring our people, work, and contribution to Africa’s technology ecosystem.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
        {awards.map((item, index) => (
          <article
            key={item.title}
            className="relative flex min-h-[210px] flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-background p-5"
          >
            <div className="flex items-start justify-between gap-3 mb-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
                <Award className="h-5 w-5" strokeWidth={1.7} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/35">{String(index + 1).padStart(2, "0")}</span>
              {item.image && <img src={item.image} alt="" aria-hidden className="h-10 max-w-[80px] object-contain object-right" loading="lazy" />}
            </div>
            <div className="mt-auto">
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-accent mb-2">{item.category}</p>
              <h3 className="font-display font-extrabold text-lg leading-tight text-foreground mb-2">{item.title}</h3>
              <p className="text-xs leading-relaxed text-foreground/65">{item.detail}</p>
            </div>
          </article>
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
    title: "Software & App Development",
    desc: "Custom web, mobile and desktop software, built from product design through deployment.",
  },
  {
    Icon: Layout,
    title: "Website Design & Development",
    desc: "Responsive, SEO-ready websites and web applications, with ongoing management, updates and security.",
  },
  {
    Icon: ShieldCheck,
    title: "Threat Lock Cybersecurity",
    desc: "Threat monitoring, mitigation, vulnerability auditing and infrastructure hardening for your digital assets.",
  },
  {
    Icon: Building2,
    title: "Enterprise Solutions & Integrations",
    desc: "Connected business applications, process automation, operational reporting and enterprise system integration.",
  },
  {
    Icon: Users,
    title: "Corporate Intranet",
    desc: "A secure home for company news, employee directories, shared knowledge and team resources.",
  },
  {
    Icon: ShoppingBag,
    title: "CRM & Corporate Communication",
    desc: "Connect customer records, sales pipelines, campaigns and internal communications in one platform.",
  },
  {
    Icon: Workflow,
    title: "Smart Work & Workflow Automation",
    desc: "Productivity tools, automation playbooks and team enablement to make everyday work more effective.",
  },
  {
    Icon: Building2,
    title: "HR & People Management Tools",
    desc: "Streamline onboarding, performance reviews, leave and attendance tracking, and people analytics.",
  },
  {
    Icon: ShieldCheck,
    title: "Vaults & Secure Data Storage",
    desc: "Encrypted storage and sharing for sensitive organisational data, with access controls and audit trails.",
  },
  {
    Icon: Globe2,
    title: "Global Metaverse Virtual Space",
    desc: "Explore our virtual space, where Tech Hub Africa’s ecosystems come together.",
  },
  {
    Icon: Rocket,
    title: "Tech Talks & Speaking Engagements",
    desc: "Keynotes, panels and expert-led talks for campuses, companies and Africa's technology community.",
  },
  {
    Icon: Sprout,
    title: "Startup Competitions",
    desc: "Pitch competitions and hackathons connect founders with mentorship, industry leaders and potential investors.",
  },
  {
    Icon: Code2,
    title: "Cloud, DevOps & API Integration",
    desc: "Cloud infrastructure, delivery pipelines, API integrations and microservices that help products scale.",
  },
];

const Services = () => (
  <section id="services" className="relative py-16 sm:py-12 sm:py-16 md:py-20 lg:py-28 lg:py-36 px-5 sm:px-6 lg:px-10 bg-secondary text-primary-foreground overflow-hidden">
    <div className="hidden md:block absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_44%/0.4),transparent_70%)]" />
    <div className="relative max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <span className="eyebrow text-accent">03 — Ecosystems</span>
          <h2 className="font-display font-extrabold leading-[0.9] mt-4 text-[2.1rem] sm:text-[3rem] md:text-[4.5rem] tracking-tight max-w-3xl">
            Where <span className="italic font-light text-accent">work happens</span>
          </h2>
        </div>
        <Link
          to="/services"
          className="btn-magnetic inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-primary-foreground hover:text-foreground transition-all duration-300 self-start md:self-auto"
        >
          Explore All Ecosystems <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <div
            key={s.title}
            className="card-lift art-card-mint sheen noise-soft group relative p-10 lg:p-12 rounded-3xl overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-background/65 to-background/85" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_top,hsl(28_92%_55%/0.25),transparent_60%)]" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-primary/70 border border-foreground/15 flex items-center justify-center">
                  <s.Icon className="w-6 h-6 text-accent" strokeWidth={1.4} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/40">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
                {s.title}
              </h3>
              <p className="text-sm text-foreground/70 leading-relaxed mb-6">
                {s.desc}
              </p>
            </div>

            <div className="relative pt-6 border-t border-foreground/10 flex items-center justify-between">
              <Link
                to={s.title === "Global Metaverse Virtual Space" ? "/metaverse" : "/services"}
                className="text-xs font-bold uppercase tracking-[0.2em] text-accent group-hover:text-primary-foreground transition-colors flex items-center gap-2"
              >
                Learn More <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const StartupIncubation = () => (
  <section id="startup-support" className="relative overflow-hidden bg-primary px-5 py-16 text-primary-foreground sm:px-6 sm:py-20 lg:px-10 lg:py-24">
    <div className="pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
    <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-7">
        <span className="eyebrow text-accent">Founder Support Program</span>
        <h2 className="mt-5 font-display text-[2.2rem] font-extrabold leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
          Startup Incubation <span className="italic font-light text-accent">&amp; Advisory</span>
        </h2>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-primary-foreground/70 sm:text-base">
          We help early-stage founders turn promising ideas into resilient ventures through practical guidance, founder mentorship, and access to the people and networks that can help them grow.
        </p>
      </div>
      <div className="lg:col-span-5">
        <ul className="space-y-3 border-l border-primary-foreground/15 pl-5 text-sm font-semibold text-primary-foreground/85 sm:pl-7">
          <li>Founder mentorship and technical guidance</li>
          <li>Go-to-market and investor readiness support</li>
          <li>Connections to partners and the wider ecosystem</li>
        </ul>
        <Link to="/#contact" className="btn-magnetic mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-accent-foreground transition-all hover:bg-primary-foreground hover:text-foreground">
          Talk to our team <ArrowUpRight className="h-4 w-4" />
        </Link>
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
      <div className="p-12 lg:p-20 border-b lg:border-b-0 lg:border-r border-foreground/10 relative">
        <span className="eyebrow text-accent">05 — Internships</span>
        <h3 className="font-display font-extrabold text-foreground mt-6 mb-6 leading-[0.9] text-[2.5rem] md:text-[3.5rem] tracking-tight">
          Available
          <br />
          <span className="italic font-light text-accent">Internships</span>
        </h3>
        <p className="text-foreground/70 leading-relaxed mb-8 max-w-md">
          We offer opportunities to talented, motivated individuals passionate about technology —
          committed to diversity and inclusion across the industry.
        </p>
        <ul className="space-y-3 mb-10">
          {["Event Planning", "Marketing", "Research", "Operations"].map((role) => (
            <li key={role} className="flex items-center gap-4 border-b border-foreground/10 pb-3 group cursor-pointer hover:border-accent/60 transition-colors">
              <span className="w-1.5 h-1.5 bg-accent rounded-full group-hover:scale-150 transition-transform" />
              <span className="font-display font-bold text-foreground group-hover:text-accent transition-colors">{role}</span>
              <ArrowUpRight className="ml-auto w-4 h-4 text-foreground/30 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </li>
          ))}
        </ul>
        <Link
          to="/careers"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.25em] text-foreground hover:text-accent transition-colors group"
        >
          Read More <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </div>

      <div className="p-12 lg:p-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="hidden md:block absolute -top-10 -right-10 w-[400px] h-[400px] rounded-full blur-3xl opacity-20 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_44%/0.35),transparent_70%)]" />
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
          <Link
            to="/mentorship"
            className="btn-magnetic inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-[0.25em] rounded-full hover:bg-primary transition-colors duration-300"
          >
            Read More <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <span className="absolute -bottom-8 -right-8 font-display font-extrabold text-[10rem] leading-none text-primary-foreground/[0.04] select-none pointer-events-none">
          06
        </span>
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
  <section className="relative py-16 sm:py-12 sm:py-16 md:py-20 lg:py-28 lg:py-36 px-5 sm:px-6 lg:px-10 overflow-hidden">
    <div className="hidden md:block absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-25 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_55%/0.35),transparent_70%)]" />
    <div className="relative max-w-7xl mx-auto">
      <div className="flex items-baseline gap-6 mb-16">
        <span className="eyebrow text-accent">08 — Voices</span>
        <div className="flex-1 divider-elegant" />
      </div>
      <h2 className="font-display font-extrabold text-foreground leading-[0.9] mb-16 text-[2.1rem] sm:text-[3rem] md:text-[4.5rem] tracking-tight">
        What people <span className="italic font-light text-accent">say.</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <figure
            key={t.name}
            className={`card-lift art-card sheen relative p-8 rounded-2xl flex flex-col ${i === 1 ? "md:translate-y-6" : ""}`}
          >
            <div className="absolute -top-4 left-8 w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-lg">
              <Quote className="w-4 h-4 text-accent-foreground" strokeWidth={2} />
            </div>
            <blockquote className="font-display text-xl text-foreground leading-snug flex-1 mb-8 mt-4">
              "{t.body}"
            </blockquote>
            <figcaption className="flex items-center justify-between border-t border-foreground/10 pt-6">
              <div>
                <p className="font-bold text-sm text-foreground">{t.name}</p>
                <p className="text-[10px] uppercase tracking-widest text-foreground/50 mt-1">{t.when}</p>
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
          className="btn-magnetic inline-flex items-center gap-2 px-8 py-4 border border-foreground text-foreground text-xs font-bold uppercase tracking-[0.25em] rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
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
  <section id="hub" className="relative py-20 sm:py-14 sm:py-20 md:py-24 lg:py-32 lg:py-40 px-5 sm:px-6 lg:px-10 bg-primary text-primary-foreground overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 bg-[radial-gradient(circle,hsl(var(--primary)),transparent_70%)]" />
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
      <Link
        to="/thehub"
        className="btn-magnetic inline-flex items-center gap-2 px-10 py-5 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-[0.3em] rounded-full hover:bg-background hover:text-foreground transition-all duration-500"
      >
        Visit The Hub <ArrowUpRight className="w-4 h-4" />
      </Link>
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
      <Marquee text="Connecting Innovators · Fostering Talent · Showcasing Excellence" />
      <VisionMission />
      <Services />
      <StartupIncubation />
      <AwardsRecognition />
      <ClientShowcase
        limit={6}
        title="Live Production Websites Built by Tech Hub Africa"
        subtitle="Don't just take our word for it. Explore live e-commerce portals, news networks, logistics platforms, and security applications engineered by our team."
      />
      <Testimonials />

      <HubCTA />
    </main>
    <Footer />
  </>
);

export default Index;
