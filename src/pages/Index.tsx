import { ArrowUpRight, Code2, Smartphone, Layout, Building2, ShoppingBag, Sprout, ShieldCheck, Star, Quote } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImagePlaceholder from "@/components/ImagePlaceholder";

/* ---------- HERO ---------- */
const Hero = () => (
  <section className="relative py-24 md:py-32 px-6 overflow-hidden">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <div className="relative z-10 animate-fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-primary/15 rounded-full text-secondary text-[11px] font-bold tracking-[0.25em] uppercase mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Welcome to Tech Hub Africa LLC
        </div>
        <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.88] tracking-tight text-primary mb-8">
          African <span className="text-accent italic font-light">Tech</span>
          <br />
          Excellence.
        </h1>
        <p className="text-lg md:text-xl text-primary/70 max-w-lg leading-relaxed mb-10">
          Bridging the gap between talent and opportunity through world-class infrastructure,
          elite mentorship, and high-impact digital solutions across the continent.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#vision"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-widest hover:bg-secondary transition-colors"
          >
            Our Vision
          </a>
          <a
            href="#campus"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Campus Tours 2026
          </a>
        </div>
      </div>

      <div className="relative animate-fade-up [animation-delay:120ms]">
        <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
          <ImagePlaceholder tone="forest" label="Hero image — upload here" />
        </div>
        <div className="absolute -bottom-8 -left-8 bg-background border-l-4 border-accent p-8 shadow-2xl max-w-[300px]">
          <p className="font-display font-extrabold text-2xl leading-tight text-primary">
            Innovating from the heart of Ghana.
          </p>
        </div>
        <div className="absolute -top-4 -right-4 hidden md:flex flex-col items-end gap-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/50">Est.</span>
          <span className="font-display font-extrabold text-4xl text-accent">2020</span>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- MARQUEE ---------- */
const Marquee = () => {
  const text = "Connecting Innovators · Fostering Talent · Showcasing Excellence";
  return (
    <div className="bg-primary text-primary-foreground py-4 overflow-hidden border-y border-primary-foreground/10">
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

/* ---------- VISION & MISSION ---------- */
const VisionMission = () => (
  <section id="vision" className="py-28 px-6 border-b border-primary/10">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-baseline gap-6 mb-16">
        <span className="eyebrow text-accent">01 — Foundations</span>
        <div className="flex-1 h-px bg-primary/15" />
      </div>

      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
        <div>
          <h2 className="font-display text-5xl md:text-6xl font-extrabold text-primary leading-[0.95] mb-8">
            Our Vision
          </h2>
          <p className="text-lg text-primary/70 leading-relaxed">
            To create a future where Africa is recognized as a global leader in technology, science,
            and engineering — where innovation thrives, talent is nurtured, and the continent's
            contributions are celebrated. A more inclusive, sustainable, and prosperous digital age
            for all Africans.
          </p>
        </div>
        <div>
          <h2 className="font-display text-5xl md:text-6xl font-extrabold text-primary leading-[0.95] mb-8">
            Our Mission
          </h2>
          <p className="text-lg text-primary/70 leading-relaxed">
            Empowering Africa's tech ecosystem by connecting innovators, fostering talent, and
            showcasing excellence in technology, science, and engineering — to promote a vibrant
            and inclusive digital future for the continent.
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- CAMPUS TOURS ---------- */
const CampusTours = () => (
  <section id="campus" className="py-28 px-6 bg-cream-warm">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <span className="eyebrow text-accent">02 — Flagship Program</span>
        <h2 className="font-display text-5xl md:text-6xl font-extrabold text-primary leading-[0.95] mt-6 mb-8">
          Tech For All
          <br />
          Campus Tours 2026
        </h2>
        <p className="text-primary font-medium text-lg mb-4">
          Empowering the next generation of tech leaders.
        </p>
        <p className="text-primary/70 leading-relaxed mb-8">
          Join us on a mission to inspire, educate, and equip students with the skills and knowledge
          needed to thrive in Africa's rapidly evolving tech landscape. Our campus tours offer a
          unique opportunity to engage with industry experts and discover innovative solutions to
          real-world problems.
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors group"
        >
          Explore Tour Gallery
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>
      </div>
      <div className="aspect-[4/5] shadow-2xl">
        <ImagePlaceholder tone="deep" label="Campus Tour 2026 poster" />
      </div>
    </div>
  </section>
);

/* ---------- CORE INITIATIVES ---------- */
const initiatives = [
  { title: "Tech Guru Meetup", meta: "18 Dec 2026", tone: "forest" as const },
  { title: "Hackathon Challenge", meta: "72 Hours · Live", tone: "amber" as const },
  { title: "Top 100 Magazine", meta: "Innovators & Entrepreneurs", tone: "forest" as const },
  { title: "Marquis Who's Who", meta: "Honored Listee 2025", tone: "deep" as const },
];

const Initiatives = () => (
  <section id="events" className="py-28 bg-primary text-primary-foreground">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-16">
        <div>
          <span className="eyebrow text-accent">03 — Core Initiatives</span>
          <h2 className="font-display text-5xl md:text-6xl font-extrabold mt-4 leading-[0.95]">
            Where the work happens.
          </h2>
        </div>
        <p className="text-primary-foreground/60 max-w-sm">
          Programs, publications, and platforms building tomorrow's African tech leaders.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {initiatives.map((it, i) => (
          <a
            key={it.title}
            href="#"
            className="group relative aspect-[3/4] overflow-hidden border border-primary-foreground/10"
          >
            <ImagePlaceholder tone={it.tone} label={it.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                0{i + 1}
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary-foreground/60 mb-2">
                  {it.meta}
                </p>
                <h3 className="font-display text-2xl font-bold leading-tight">{it.title}</h3>
                <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- SERVICES ---------- */
const services = [
  {
    Icon: Code2,
    title: "Computer Programming",
    desc: "Expert programmers craft custom software solutions tailored to your business. From algorithm development to code optimization, we deliver efficient, scalable, and reliable results.",
  },
  {
    Icon: Smartphone,
    title: "Software & App Development",
    desc: "Cutting-edge software and app development for mobile, web, and desktop. From concept to deployment, we handle every stage to exceed user expectations.",
  },
  {
    Icon: Layout,
    title: "Web Design & Management",
    desc: "Visually stunning, responsive, user-centric websites that captivate audiences and drive growth — plus ongoing management, updates, and security.",
  },
];

const Services = () => (
  <section id="services" className="py-28 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-baseline gap-6 mb-16">
        <span className="eyebrow text-accent">04 — Services</span>
        <h2 className="font-display text-5xl md:text-6xl font-extrabold text-primary leading-[0.95]">
          Our Services
        </h2>
        <div className="flex-1 h-px bg-primary/15 hidden md:block" />
      </div>

      <div className="grid md:grid-cols-3 border border-primary/10 bg-background">
        {services.map((s, i) => (
          <div
            key={s.title}
            className={`group p-10 lg:p-12 transition-colors duration-500 hover:bg-primary hover:text-primary-foreground ${
              i < services.length - 1 ? "md:border-r border-b md:border-b-0 border-primary/10" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-10">
              <s.Icon className="w-10 h-10 text-accent" strokeWidth={1.3} />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40 group-hover:text-primary-foreground/40">
                0{i + 1}
              </span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold mb-6 leading-tight">
              {s.title}
            </h3>
            <p className="text-sm text-primary/60 group-hover:text-primary-foreground/70 leading-relaxed">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- INTERNSHIPS + MENTORSHIP ---------- */
const ProgramsBand = () => (
  <section id="programs" className="bg-cream-warm border-y border-primary/10">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2">
      <div className="p-12 lg:p-20 border-b lg:border-b-0 lg:border-r border-primary/10">
        <span className="eyebrow text-accent">05 — Internships</span>
        <h3 className="font-display text-4xl md:text-5xl font-extrabold text-primary mt-6 mb-6 leading-[0.95]">
          Available Internships
        </h3>
        <p className="text-primary/70 leading-relaxed mb-8 max-w-md">
          We offer internship opportunities to talented and motivated individuals passionate about
          technology — committed to diversity and inclusion across the industry.
        </p>
        <ul className="space-y-3 mb-10">
          {["Event Planning", "Marketing", "Research", "Operations"].map((role) => (
            <li key={role} className="flex items-center gap-4 border-b border-primary/10 pb-3">
              <span className="w-1.5 h-1.5 bg-accent rounded-full" />
              <span className="font-display font-bold text-primary">{role}</span>
            </li>
          ))}
        </ul>
        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors group"
        >
          Read More <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>
      </div>

      <div className="p-12 lg:p-20 bg-primary text-primary-foreground relative overflow-hidden">
        <span className="eyebrow text-accent">06 — Mentorship</span>
        <h3 className="font-display text-4xl md:text-5xl font-extrabold mt-6 mb-6 leading-[0.95]">
          Mentorship Program
        </h3>
        <p className="text-primary-foreground/70 leading-relaxed mb-10 max-w-md">
          Mentorship is a powerful tool for growth. Our program connects emerging leaders and
          innovators with experienced professionals who provide guidance, support, and valuable
          insights.
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground text-sm font-bold uppercase tracking-widest hover:bg-background hover:text-primary transition-colors"
        >
          Read More <ArrowUpRight className="w-4 h-4" />
        </a>
        <span className="absolute -bottom-8 -right-8 font-display font-extrabold text-[10rem] leading-none text-primary-foreground/5 select-none">
          06
        </span>
      </div>
    </div>
  </section>
);

/* ---------- INVESTMENT PORTFOLIO ---------- */
const portfolio = [
  { Icon: Building2, name: "GH Accommodation", sector: "Real Estate Tech", desc: "Your gateway to affordable, reliable housing." },
  { Icon: ShoppingBag, name: "GMO Marketplace", sector: "E-Commerce", desc: "Ghana Mall — your one-stop shop for everything." },
  { Icon: Sprout, name: "Ofie Agro Ltd", sector: "Agri-Tech", desc: "Taste of tradition, fresh from Ofie." },
  { Icon: ShieldCheck, name: "Threat Lock Agency", sector: "Cybersecurity", desc: "Protect your website. Setup in 5 minutes." },
];

const Portfolio = () => (
  <section id="portfolio" className="py-28 bg-secondary text-secondary-foreground">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <span className="eyebrow text-accent">07 — Investment Portfolio</span>
          <h2 className="font-display text-5xl md:text-6xl font-extrabold mt-4 leading-[0.95]">
            Companies scaling
            <br />
            innovation across industries.
          </h2>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-secondary-foreground/10 border border-secondary-foreground/10">
        {portfolio.map((p) => (
          <a
            key={p.name}
            href="#"
            className="group bg-secondary p-10 hover:bg-primary transition-colors duration-500"
          >
            <div className="flex items-start justify-between mb-10">
              <p.Icon className="w-10 h-10 text-accent" strokeWidth={1.3} />
              <ArrowUpRight className="w-5 h-5 text-secondary-foreground/40 group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-3">
              {p.sector}
            </p>
            <h3 className="font-display text-2xl font-extrabold mb-3 leading-tight">{p.name}</h3>
            <p className="text-sm text-secondary-foreground/60 leading-relaxed">{p.desc}</p>
          </a>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- TESTIMONIALS ---------- */
const testimonials = [
  {
    name: "Bernard Buari",
    when: "2 months ago",
    body: "The workshop training was impactful and the audience really loved it.",
  },
  {
    name: "5Point1Nexus",
    when: "3 months ago",
    body: "Tech Hub Africa is doing incredible work in supporting and growing the African tech ecosystem. Their focus on innovators is unmatched.",
  },
  {
    name: "Desmond Nana A.",
    when: "4 months ago",
    body: "The best among the rest.",
  },
];

const Testimonials = () => (
  <section className="py-28 px-6 border-t border-primary/10">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-baseline gap-6 mb-16">
        <span className="eyebrow text-accent">08 — Testimonials</span>
        <h2 className="font-display text-5xl md:text-6xl font-extrabold text-primary leading-[0.95]">
          What people say.
        </h2>
        <div className="flex-1 h-px bg-primary/15 hidden md:block" />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="p-8 border border-primary/10 bg-background hover:border-accent/60 transition-colors flex flex-col"
          >
            <Quote className="w-8 h-8 text-accent mb-6" strokeWidth={1.4} />
            <blockquote className="font-display text-xl text-primary leading-snug flex-1 mb-8">
              "{t.body}"
            </blockquote>
            <figcaption className="flex items-center justify-between border-t border-primary/10 pt-6">
              <div>
                <p className="font-bold text-sm text-primary">{t.name}</p>
                <p className="text-[10px] uppercase tracking-widest text-primary/50 mt-1">{t.when}</p>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                ))}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <a
          href="#"
          className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Give Us Your Review <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  </section>
);

/* ---------- HUB CTA ---------- */
const HubCTA = () => (
  <section id="hub" className="py-28 px-6 bg-primary text-primary-foreground">
    <div className="max-w-5xl mx-auto text-center">
      <span className="eyebrow text-accent">Visit THE HUB</span>
      <h2 className="font-display text-5xl md:text-7xl font-extrabold leading-[0.95] mt-6 mb-8">
        Step inside the
        <br />
        continent's tech engine.
      </h2>
      <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-10">
        A physical and digital home for builders, mentors, and investors shaping Africa's next
        decade of innovation.
      </p>
      <a
        href="#"
        className="inline-flex items-center gap-2 px-10 py-5 bg-accent text-accent-foreground text-sm font-bold uppercase tracking-[0.25em] hover:bg-background hover:text-primary transition-colors"
      >
        Visit THE HUB <ArrowUpRight className="w-4 h-4" />
      </a>
    </div>
  </section>
);

/* ---------- PAGE ---------- */
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
