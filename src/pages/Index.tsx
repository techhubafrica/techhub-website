import { useEffect, useState } from "react";
import {
  ArrowUpRight, Code2, Smartphone, Layout, Building2, ShoppingBag, Sprout,
  ShieldCheck, Star, Quote, Play, Sparkles, Users, Rocket, Globe2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImagePlaceholder from "@/components/ImagePlaceholder";

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

const Hero = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const slide = heroSlides[active];

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-6 overflow-hidden bg-grad-charcoal text-primary-foreground grain grain-strong">
      {/* Ambient glows */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-40 pointer-events-none blur-3xl bg-[radial-gradient(circle,hsl(151_57%_25%),transparent_70%)]" />
      <div className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full opacity-40 pointer-events-none blur-3xl bg-[radial-gradient(circle,hsl(28_92%_44%/0.6),transparent_65%)] animate-pulse-glow" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-20 items-center">
        {/* LEFT — Story text */}
        <div className="relative z-10">
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Tech Hub Africa · Est. 2020
          </div>

          <h1 className="font-display font-extrabold leading-[0.86] tracking-tight mb-8 animate-fade-up stagger-1">
            <span className="block text-[3.5rem] md:text-[5.5rem] lg:text-[7rem]">African</span>
            <span className="block text-[3.5rem] md:text-[5.5rem] lg:text-[7rem]">
              <span className="italic font-light text-accent">Tech</span> Excellence.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-xl leading-relaxed mb-10 animate-fade-up stagger-2">
            Bridging talent and opportunity through world-class infrastructure, elite mentorship,
            and high-impact digital solutions across the continent.
          </p>

          <div className="flex flex-wrap gap-4 mb-14 animate-fade-up stagger-3">
            <a
              href="#vision"
              className="btn-magnetic inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-[0.25em] rounded-full hover:shadow-[var(--shadow-glow-amber)] transition-all duration-500"
            >
              Our Vision
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#campus"
              className="inline-flex items-center gap-2 px-8 py-4 border border-primary-foreground/25 text-primary-foreground text-xs font-bold uppercase tracking-[0.25em] rounded-full hover:bg-primary-foreground/10 hover:border-primary-foreground/50 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Campus Tours 2026
            </a>
          </div>

          {/* Floating stat row */}
          <div className="grid grid-cols-3 gap-4 max-w-lg animate-fade-up stagger-4">
            {[
              { k: "5+", v: "Years Building" },
              { k: "20+", v: "Programs Run" },
              { k: "4", v: "Portfolio Cos." },
            ].map((s, i) => (
              <div
                key={s.v}
                className={`glass rounded-lg p-4 ${i === 1 ? "animate-float" : ""}`}
                style={{ animationDelay: `${i * 0.6}s` }}
              >
                <p className="font-display font-extrabold text-2xl md:text-3xl text-primary-foreground">{s.k}</p>
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-primary-foreground/60 mt-1">{s.v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Netflix showcase */}
        <div className="relative animate-fade-up stagger-2">
          <div className="relative aspect-[4/5] max-h-[640px]">
            {heroSlides.map((s, i) => (
              <div
                key={s.title}
                className={`absolute inset-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  i === active ? "opacity-100 scale-100 z-10" : "opacity-0 scale-[1.03] z-0"
                }`}
              >
                <div className="relative w-full h-full">
                  <ImagePlaceholder tone={s.tone} label={`${s.kicker} — imagery slot`} />
                  {/* Slide meta overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-7 z-[4] text-primary-foreground">
                    <span className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full text-[9px] font-bold uppercase tracking-[0.3em] mb-4">
                      <Sparkles className="w-3 h-3 text-accent" /> {s.tag}
                    </span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-1">{s.kicker}</p>
                    <h3 className="font-display font-extrabold text-2xl md:text-3xl leading-tight mb-3">{s.title}</h3>
                    <p className="text-sm text-primary-foreground/75 leading-relaxed max-w-sm mb-4">{s.body}</p>
                    <a href="#" className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-accent group">
                      {s.cta}
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Floating stat card — bottom-left break-out */}
          <div className="hidden md:block absolute -bottom-8 -left-8 z-20 glass rounded-lg p-5 min-w-[180px] animate-float shadow-[var(--shadow-cinema)]">
            <p className="font-display font-extrabold text-4xl text-primary-foreground leading-none">{slide.stat.k}</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mt-2">{slide.stat.v}</p>
          </div>

          {/* Est. badge — top right */}
          <div className="hidden md:flex absolute -top-6 -right-4 flex-col items-end gap-1 z-20">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary-foreground/50">Est.</span>
            <span className="font-display font-extrabold text-5xl text-accent leading-none">2020</span>
          </div>

          {/* Slide indicators */}
          <div className="absolute -bottom-14 right-0 flex items-center gap-2 z-20">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === active ? "w-10 bg-accent" : "w-4 bg-primary-foreground/25 hover:bg-primary-foreground/50"
                }`}
              />
            ))}
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
    <div className="relative bg-charcoal text-primary-foreground py-4 overflow-hidden border-y border-primary-foreground/10">
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
  <section id="campus" className="relative py-28 md:py-36 px-6 bg-grad-charcoal text-primary-foreground grain overflow-hidden">
    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-40 pointer-events-none bg-[radial-gradient(circle,hsl(151_57%_30%),transparent_70%)]" />

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
  <section id="services" className="relative py-28 md:py-36 px-6 bg-grad-forest text-primary-foreground grain overflow-hidden">
    <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_50%/0.5),transparent_70%)]" />
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
            className="card-lift group relative p-10 lg:p-12 rounded-lg glass overflow-hidden"
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

      <div className="p-12 lg:p-20 bg-grad-charcoal text-primary-foreground relative overflow-hidden grain">
        <div className="absolute -top-10 -right-10 w-[400px] h-[400px] rounded-full blur-3xl opacity-40 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_50%/0.5),transparent_70%)]" />
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
            className="btn-magnetic inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-[0.25em] rounded-full hover:shadow-[var(--shadow-glow-amber)] transition-all duration-500"
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
  <section id="portfolio" className="relative py-28 md:py-36 px-6 bg-grad-charcoal text-primary-foreground grain overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-3xl opacity-25 pointer-events-none bg-[radial-gradient(circle,hsl(151_57%_35%),transparent_70%)]" />

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
            className="card-lift group relative rounded-lg glass p-8 overflow-hidden"
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
            <div className="absolute -top-4 left-8 w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-[var(--shadow-glow-amber)]">
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
  <section id="hub" className="relative py-32 md:py-40 px-6 bg-grad-charcoal text-primary-foreground grain overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-40 bg-[radial-gradient(circle,hsl(151_57%_30%),transparent_70%)]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-40 bg-[radial-gradient(circle,hsl(28_92%_50%/0.5),transparent_70%)] animate-pulse-glow" />
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
        className="btn-magnetic inline-flex items-center gap-2 px-10 py-5 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-[0.3em] rounded-full hover:shadow-[var(--shadow-glow-amber)] transition-all duration-500"
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
