import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Calendar, MapPin, Clock, Users, ArrowUpRight, CheckCircle2, X,
  Ticket, Play, ChevronDown,
} from "lucide-react";
import {
  upcomingEvents, pastEvents, featuredEvent, priceLine, EVENT_CONTACT,
  type HubEvent,
} from "@/data/eventsHub";
import {
  techGuruAudience, techGuruAuditorium, techGuruCelebration, techGuruCommunity,
  techGuruKeynote, techGuruPreparation, techGuruNetworking, techGuruShowcase,
  techGuruFullHouse, techGuruPanel, techGuruAwards, techGuruInterview, techGuruTeam,
} from "@/assets/tech-guru";
import { useReveal } from "@/hooks/use-reveal";
import Marquee from "@/components/Marquee";

/* ── Ticket tiers for the flagship meetup (rate set by Tech Hub Africa) ── */
const ticketTiers = [
  {
    id: "general", name: "General Ticket", price: "GH₵100",
    blurb: "Full access to keynotes, panels, live demos, and the networking floor.",
    perks: ["All keynote sessions", "Exhibition & demo floor", "Networking reception"],
    pay: "https://paystack.shop/pay/bpbi3v7b-o",
  },
  {
    id: "student", name: "Student Ticket", price: "GH₵50",
    blurb: "Discounted admission for students with a valid school ID.",
    perks: ["All keynote sessions", "Career & mentorship corner", "Student ID required at entry"],
    pay: "https://paystack.shop/pay/ince1ae1jh",
  },
  {
    id: "corporate", name: "Corporate Ticket", price: "GH₵200",
    blurb: "For teams and organizations attending on behalf of a company.",
    perks: ["Priority seating", "Business matchmaking access", "Company listing in attendee directory"],
    pay: "https://paystack.shop/pay/9n8a1voto9",
    featured: true,
  },
  {
    id: "vip", name: "VIP Ticket", price: "GH₵250",
    blurb: "Premium experience with front-row access and the private lounge.",
    perks: ["Front-row reserved seating", "VIP lounge & refreshments", "Speaker & investor meet-and-greet"],
    pay: "https://paystack.shop/pay/q3eyww8q0t",
  },
];

/* ── Sponsorship routes carried over from the events hub ── */
const sponsorTracks = [
  { key: "meetup", label: "Tech Guru Meetup", note: "Stage, lounge and speaker branding at the flagship night." },
  { key: "tradeshow", label: "The Hub Tradeshow", note: "Booth placement in the live innovation showcase." },
  { key: "seminar", label: "Innovation & Leadership Seminar", note: "Executive audience, thought-leadership slot." },
  { key: "pitch", label: "Startup Pitch Competition", note: "Naming rights on the pitch stage and the prize." },
];

const yt = (id: string) => `https://www.youtube.com/watch?v=${id}`;

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

/* ── Light markdown renderer for the feed's rich descriptions ── */
const inline = (s: string) =>
  s.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i} className="font-bold text-foreground">{part.slice(2, -2)}</strong>
      : <span key={i}>{part}</span>
  );

function RichText({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  let para: string[] = [];
  let list: string[] = [];

  const flushPara = () => {
    if (para.length) {
      nodes.push(
        <p key={`p${nodes.length}`} className="text-[13px] sm:text-sm leading-relaxed text-foreground/70">
          {inline(para.join(" "))}
        </p>
      );
    }
    para = [];
  };

  const flushList = () => {
    if (list.length) {
      nodes.push(
        <ul key={`l${nodes.length}`} className="space-y-2">
          {list.map((l, j) => (
            <li key={j} className="flex gap-3 text-[13px] leading-relaxed text-foreground/70">
              <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              <span>{inline(l)}</span>
            </li>
          ))}
        </ul>
      );
    }
    list = [];
  };

  text.replace(/\r/g, "").split("\n").forEach((raw) => {
    const line = raw.trim();
    if (!line) { flushPara(); flushList(); return; }
    if (/^#{1,3}\s/.test(line)) {
      flushPara(); flushList();
      nodes.push(
        <h4 key={`h${nodes.length}`} className="font-display font-extrabold text-foreground text-xs uppercase tracking-[0.22em] mt-7 first:mt-0">
          {inline(line.replace(/^#{1,3}\s+/, ""))}
        </h4>
      );
      return;
    }
    if (/^[-*]\s+/.test(line)) { flushPara(); list.push(line.replace(/^[-*]\s+/, "")); return; }
    flushList();
    para.push(line);
  });
  flushPara(); flushList();

  return <div className="space-y-4">{nodes}</div>;
}

const Events = () => {
  const [modal, setModal] = useState<{ mode: "event" | "sponsor"; title: string; event?: HubEvent } | null>(null);
  const [done, setDone] = useState(false);
  const [openProgramme, setOpenProgramme] = useState<number | null>(featuredEvent.id);
  const [email, setEmail] = useState("");

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    const target = Date.UTC(2026, 11, 18, 16, 0, 0); // 4:00 p.m. GMT, 18 Dec 2026
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const openEvent = (event: HubEvent) => { setModal({ mode: "event", title: event.title, event }); setDone(false); };
  const openSponsor = (label?: string) => {
    setModal({ mode: "sponsor", title: label ? `Sponsorship — ${label}` : "Sponsorship — Tech Hub Africa 2026" });
    setDone(false);
  };
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setDone(true); setTimeout(() => { setModal(null); setDone(false); }, 2500); };
  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${EVENT_CONTACT}?subject=${encodeURIComponent("Newsletter signup — Tech Hub Africa events")}&body=${encodeURIComponent(email)}`;
  };

  const inputCls = "w-full px-4 py-3 rounded-xl border border-foreground/12 bg-secondary/60 text-sm text-foreground focus:outline-none focus:border-accent/60 transition-colors duration-200";
  const fileCls = "w-full px-4 py-3 rounded-xl border border-foreground/12 bg-secondary/60 text-xs text-foreground/70 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:bg-primary file:text-primary-foreground file:text-[10px] file:font-bold file:uppercase file:tracking-wider";

  const meetup2025 = pastEvents.find((e) => e.slug === "tech-guru-meetup-2025");
  const meetup2024 = pastEvents.find((e) => e.slug === "tech-guru-meetup-2024");
  const hasOwnConsent = (e?: HubEvent) => !!e?.fields.some((f) => f.type === "checkbox");

  return (
    <>
      <Header />

      <main className="page-entry bg-background overflow-hidden">
        {/* ══ HERO — FEATURED EVENT ══ */}
        <section className="relative overflow-hidden bg-background text-foreground pt-20 sm:pt-24 md:pt-28">
          <div className="absolute inset-0">
            <img src={techGuruAudience} alt="Attendees at the Tech Guru Meetup in Accra"
              className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, hsl(0 0% 100% / 0.5) 0%, hsl(0 0% 100% / 0.26) 40%, hsl(0 0% 100% / 0.06) 74%, hsl(0 0% 100% / 0) 100%)" }} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_90%,hsl(28_92%_50%/0.14),transparent_60%)]" />
            <div className="noise-bg" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-14 sm:py-20 md:py-24 lg:py-28">
            <div className="card-lift sheen glass-cream max-w-2xl rounded-3xl p-8 md:p-12" style={{ backdropFilter: "blur(18px)" }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-accent" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">
                  {featuredEvent.dateLabel} · {featuredEvent.venue}
                </span>
              </div>
              <h1 className="font-display font-black text-foreground text-[2.6rem] md:text-[4rem] leading-[0.92] tracking-tight">
                Tech Guru<br />Meetup 2026
              </h1>
              <p className="mt-4 font-display font-extrabold text-accent text-lg md:text-xl tracking-tight leading-snug">
                The Augmented Continent: Where Africa Builds, Showcases &amp; Scales The Future.
              </p>
              <p className="mt-7 font-display font-extrabold text-foreground text-lg md:text-xl">
                Friday, 18 December 2026 <span className="text-foreground/25 mx-2">|</span> 4:00 p.m. – 9:00 p.m.
              </p>
              <p className="mt-2 text-muted-foreground leading-relaxed text-sm">
                {featuredEvent.venue}, {featuredEvent.location}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => document.getElementById("reservations")?.scrollIntoView({ behavior: "smooth" })}
                  className="btn-magnetic px-7 py-3.5 rounded-full bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:brightness-110 transition-all duration-200"
                  style={{ boxShadow: "0 12px 36px -10px hsl(28 92% 44% / 0.5)" }}>
                  Reserve Your Seat
                </button>
                <button onClick={() => openSponsor("Tech Guru Meetup 2026")}
                  className="btn-magnetic px-7 py-3.5 rounded-full border border-foreground/20 bg-primary/5 text-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  style={{ backdropFilter: "blur(10px)" }}>
                  Become a Sponsor
                </button>
              </div>
              <p className="mt-5 text-sm">
                <span className="font-bold text-accent">Tickets from GH₵50.</span>{" "}
                <span className="text-muted-foreground">Registration closes 4 December 2026.</span>
              </p>
            </div>

            {/* Countdown */}
            <div className="glass-cream mt-12 rounded-2xl px-6 py-5 flex flex-wrap items-center gap-8" style={{ backdropFilter: "blur(14px)" }}>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-foreground/45">Countdown</span>
              <div className="flex items-center gap-6">
                {[
                  { label: "Days", val: timeLeft.days },
                  { label: "Hours", val: timeLeft.hours },
                  { label: "Mins", val: timeLeft.mins },
                  { label: "Secs", val: timeLeft.secs },
                ].map((u) => (
                  <div key={u.label} className="flex items-baseline gap-1.5">
                    <span className="font-display font-black text-foreground text-3xl leading-none tabular-nums">
                      {String(u.val).padStart(2, "0")}
                    </span>
                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-foreground/45">{u.label}</span>
                  </div>
                ))}
              </div>
              <div className="hidden md:flex items-center gap-5 ml-auto text-xs font-semibold text-muted-foreground">
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-accent" />{featuredEvent.venue}</span>
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-accent" />{featuredEvent.dateLabel}</span>
              </div>
            </div>
          </div>
        </section>

        <Marquee text="Conferences · Workshops · Hackathons · Tech Guru Meetup 2026" />

        {/* ══ 02 — UPCOMING EVENTS ══ */}
        <section className="relative px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-24 lg:py-32 max-w-7xl mx-auto cv-auto">
          <div className="hidden md:block absolute -top-20 right-0 w-[480px] h-[480px] rounded-full blur-3xl opacity-15 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_50%),transparent_70%)]" />

          <Reveal className="mb-10 sm:mb-14">
            <div className="flex items-baseline gap-6 mb-6">
              <span className="eyebrow text-accent">02 — What&rsquo;s coming</span>
              <div className="flex-1 divider-elegant" />
            </div>
            <h2 className="font-display font-extrabold text-foreground leading-[0.9] text-[2.1rem] sm:text-[3rem] md:text-[4.5rem] tracking-tight">
              Upcoming <span className="italic font-light text-accent">events.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm sm:text-base text-foreground/65 leading-relaxed">
              Four gatherings, one season — the flagship meetup, a tradeshow, a leadership seminar and a
              pitch competition. All at La Palm Royal Beach Hotel, Accra.
            </p>
          </Reveal>

          <div className="space-y-6">
            {upcomingEvents.map((e, i) => {
              const isOpen = openProgramme === e.id;
              return (
                <Reveal key={e.id} delay={i * 0.07}>
                  <div className="card-lift art-card sheen group relative rounded-3xl hover:border-accent/40 overflow-hidden transition-all duration-500 grid grid-cols-1 lg:grid-cols-12">
                    {/* media */}
                    <div className="lg:col-span-3 relative overflow-hidden border-b lg:border-b-0 lg:border-r border-foreground/10">
                      <img src={e.image} alt={`${e.title} — Tech Hub Africa`} loading="lazy"
                        className="w-full h-56 lg:h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/45 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-4 font-display font-black text-3xl leading-none text-white/90 select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {e.isFeatured && (
                        <span className="absolute top-4 left-4 text-[8px] font-black uppercase tracking-[0.24em] px-2.5 py-1 rounded-full bg-accent text-accent-foreground">
                          Flagship
                        </span>
                      )}
                    </div>

                    {/* body */}
                    <div className="lg:col-span-6 p-6 lg:p-9">
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] px-2.5 py-1 rounded-full border border-accent/35 text-accent bg-accent/10">
                          {e.entryLabel}
                        </span>
                        <span className="text-xs font-semibold text-foreground/55 flex items-center gap-1.5"><Calendar className="w-3 h-3 text-accent" />{e.dateLabel}</span>
                        <span className="text-xs font-semibold text-foreground/55 flex items-center gap-1.5"><Clock className="w-3 h-3 text-accent" />{e.time}</span>
                        <span className="text-xs font-semibold text-foreground/55 flex items-center gap-1.5"><MapPin className="w-3 h-3 text-accent" />{e.venue}</span>
                      </div>
                      <h3 className="font-display font-extrabold text-foreground text-2xl md:text-3xl tracking-tight mb-3 group-hover:text-accent transition-colors">
                        {e.title}
                      </h3>
                      <p className="text-foreground/65 text-sm leading-relaxed">{e.summary}</p>

                      <button
                        onClick={() => setOpenProgramme(isOpen ? null : e.id)}
                        aria-expanded={isOpen}
                        className="mt-5 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-foreground/55 hover:text-accent transition-colors">
                        {isOpen ? "Hide programme" : "Full programme"}
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                      </button>

                      <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "grid-rows-[1fr] mt-5 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                        <div className="overflow-hidden">
                          <div className="border-l-2 border-accent/30 pl-5">
                            <RichText text={e.description} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* action */}
                    <div className="lg:col-span-3 flex flex-col justify-center gap-4 p-6 lg:p-9 border-t lg:border-t-0 lg:border-l border-foreground/10">
                      <div>
                        <p className="font-display font-black text-foreground text-2xl leading-none tracking-tight">{priceLine(e)}</p>
                        <p className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-foreground/40">
                          {e.registrationOpen ? "Registration open" : "Not open"} · {e.reach}
                        </p>
                      </div>
                      <button onClick={() => openEvent(e)}
                        className="btn-magnetic w-full py-3.5 px-5 sm:px-6 lg:px-8 rounded-full bg-primary text-primary-foreground font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-accent hover:text-accent-foreground transition-all duration-250 flex items-center justify-center gap-2">
                        Register <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                      <a href="#reservations" onClick={(ev) => { ev.preventDefault(); document.getElementById("reservations")?.scrollIntoView({ behavior: "smooth" }); }}
                        className="w-full py-3 rounded-full border border-foreground/15 text-foreground/65 hover:border-foreground/40 hover:text-foreground font-bold text-[9px] uppercase tracking-[0.22em] transition-all duration-250 text-center">
                        Tickets &amp; tiers
                      </a>
                    </div>
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ══ 03 — RESERVATIONS ══ */}
        <section id="reservations" className="relative px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-24 lg:py-32 max-w-7xl mx-auto cv-auto">
          <div className="hidden md:block absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 pointer-events-none bg-[radial-gradient(circle,hsl(var(--primary)),transparent_70%)]" />

          <Reveal className="mb-10 sm:mb-14">
            <div className="flex items-baseline gap-6 mb-6">
              <span className="eyebrow text-accent">03 — Reservations</span>
              <div className="flex-1 divider-elegant" />
            </div>
            <h2 className="font-display font-extrabold text-foreground leading-[0.9] text-[2.1rem] sm:text-[3rem] md:text-[4.5rem] tracking-tight">
              Reserve your <span className="italic font-light text-accent">place.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm sm:text-base text-foreground/65 leading-relaxed">
              Tech Guru Meetup 2026 · Friday, 18 December 2026 · La Palm Royal Beach Hotel, Accra.
              Select a ticket tier, complete payment, then submit the registration form with your payment receipt.
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {ticketTiers.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.07} className={i % 2 === 1 ? "lg:translate-y-10" : ""}>
                <div className={`group relative h-full flex flex-col overflow-hidden rounded-[1.75rem] transition-all duration-500 hover:-translate-y-2 ${
                  t.featured
                    ? "bg-primary text-primary-foreground shadow-[0_32px_80px_-28px_hsl(var(--primary)/0.55)]"
                    : "art-card border border-foreground/15 shadow-[0_20px_50px_-32px_hsl(var(--foreground)/0.35)] hover:border-accent/40"
                }`}>
                  <span aria-hidden className={`pointer-events-none absolute -top-8 -right-3 font-display font-black leading-none tracking-tighter select-none transition-transform duration-700 group-hover:-translate-y-2 ${
                    t.featured ? "text-[9rem] text-primary-foreground/[0.06]" : "text-[9rem] text-foreground/[0.05]"
                  }`}>
                    {["01", "02", "03", "04"][i]}
                  </span>
                  <span className="absolute top-0 left-7 h-[3px] w-10 rounded-full transition-all duration-500 group-hover:w-20 bg-accent" />

                  <div className="relative flex-1 p-7 lg:p-8 flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${t.featured ? "text-primary-foreground/50" : "text-foreground/40"}`}>
                        Tier {["I", "II", "III", "IV"][i]}
                      </span>
                      {t.featured && (
                        <span className="text-[8px] font-black uppercase tracking-[0.24em] px-2.5 py-1 rounded-full bg-accent text-accent-foreground">
                          Popular
                        </span>
                      )}
                    </div>

                    <h3 className={`mt-6 font-display font-extrabold text-2xl tracking-tight leading-[1.05] ${t.featured ? "text-primary-foreground" : "text-foreground"}`}>
                      {t.name.replace(" Ticket", "")}
                      <span className={`block italic font-light text-base mt-1 ${t.featured ? "text-accent" : "text-foreground/45"}`}>ticket</span>
                    </h3>

                    <p className="mt-5 flex items-baseline gap-2">
                      <span className={`font-display font-black text-[2.9rem] leading-none tracking-tight ${t.featured ? "text-primary-foreground" : "text-foreground"}`}>{t.price}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${t.featured ? "text-primary-foreground/50" : "text-foreground/40"}`}>/ seat</span>
                    </p>

                    <p className={`mt-4 text-[13px] leading-relaxed ${t.featured ? "text-primary-foreground/70" : "text-foreground/65"}`}>{t.blurb}</p>

                    <div className={`my-6 h-px w-full ${t.featured ? "bg-primary-foreground/15" : "bg-primary/10"}`} />

                    <ul className="space-y-3 flex-1">
                      {t.perks.map((p) => (
                        <li key={p} className={`flex gap-2.5 text-xs leading-relaxed ${t.featured ? "text-primary-foreground/80" : "text-foreground/70"}`}>
                          <span className="mt-[5px] w-1.5 h-1.5 rounded-full shrink-0 bg-accent" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 space-y-2.5">
                      <a href={t.pay} target="_blank" rel="noopener noreferrer"
                        className={`btn-magnetic w-full py-3.5 rounded-full font-bold text-[10px] uppercase tracking-[0.22em] transition-all duration-300 flex items-center justify-center gap-2 ${
                          t.featured
                            ? "bg-accent text-accent-foreground hover:shadow-[0_12px_36px_-10px_hsl(var(--accent)/0.7)]"
                            : "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"
                        }`}>
                        Pay Now <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                      <button onClick={() => openEvent(featuredEvent)}
                        className={`w-full py-3 rounded-full border font-bold text-[10px] uppercase tracking-[0.22em] transition-all duration-300 ${
                          t.featured
                            ? "border-primary-foreground/25 text-primary-foreground/80 hover:border-primary-foreground/60 hover:text-primary-foreground"
                            : "border-foreground/15 text-foreground/70 hover:border-foreground/40 hover:text-foreground"
                        }`}>
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="glass-cream mt-8 lg:mt-16 rounded-2xl border border-foreground/10 px-6 py-5 flex flex-wrap items-center gap-x-8 gap-y-3">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-foreground/45">Good to know</span>
              <span className="text-xs text-foreground/65 flex items-center gap-2"><Users className="w-3.5 h-3.5 text-accent" />Students must present a valid school ID at entry</span>
              <span className="text-xs text-foreground/65 flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-accent" />Registration closes 4 December 2026</span>
              <span className="text-xs text-foreground/65 flex items-center gap-2"><Ticket className="w-3.5 h-3.5 text-accent" />Payments are processed securely via Paystack</span>
            </div>
          </Reveal>
        </section>

        {/* ══ 04 — PAST EVENTS ══ */}
        <section className="relative px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-24 lg:py-32 max-w-7xl mx-auto cv-auto">
          <Reveal className="mb-10 sm:mb-14">
            <div className="flex items-baseline gap-6 mb-6">
              <span className="eyebrow text-accent">04 — Archive</span>
              <div className="flex-1 divider-elegant" />
            </div>
            <h2 className="font-display font-extrabold text-foreground leading-[0.9] text-[2.1rem] sm:text-[3rem] md:text-[4.5rem] tracking-tight">
              Past <span className="italic font-light text-accent">gatherings.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm sm:text-base text-foreground/65 leading-relaxed">
              Highlights from previous editions of the Tech Guru Meetup.
            </p>
          </Reveal>

          {/* 2025 — full photo story */}
          <Reveal>
            <div className="card-lift art-card sheen rounded-3xl overflow-hidden mb-6">
              <div className="grid grid-cols-2 md:grid-cols-12 auto-rows-[9rem] sm:auto-rows-[12rem] gap-1 bg-background">
                <img src={techGuruAuditorium} alt="A packed Tech Guru Meetup 2025 audience" loading="lazy" className="col-span-2 md:col-span-7 row-span-2 w-full h-full object-cover" />
                <img src={techGuruKeynote} alt="A Tech Guru Meetup speaker addressing attendees" loading="lazy" className="md:col-span-5 row-span-2 w-full h-full object-cover" />
                <img src={techGuruPreparation} alt="The Tech Guru Meetup welcome gifts prepared for guests" loading="lazy" className="md:col-span-3 w-full h-full object-cover" />
                <img src={techGuruNetworking} alt="Guests connecting at the Tech Guru Meetup" loading="lazy" className="md:col-span-5 w-full h-full object-cover" />
                <img src={techGuruShowcase} alt="Young innovators exploring a technology demonstration" loading="lazy" className="md:col-span-4 w-full h-full object-cover" />
                <img src={techGuruFullHouse} alt="The full 2025 Tech Guru Meetup audience" loading="lazy" className="col-span-2 md:col-span-8 row-span-2 w-full h-full object-cover" />
                <img src={techGuruPanel} alt="Tech Guru Meetup panelists in conversation" loading="lazy" className="md:col-span-4 w-full h-full object-cover" />
                <img src={techGuruAwards} alt="An award presentation at the Tech Guru Meetup" loading="lazy" className="md:col-span-4 w-full h-full object-cover" />
                <img src={techGuruCelebration} alt="Tech Guru Meetup community celebrating together" loading="lazy" className="md:col-span-3 w-full h-full object-cover" />
                <img src={techGuruCommunity} alt="Women from the Tech Guru Meetup community" loading="lazy" className="md:col-span-3 w-full h-full object-cover" />
                <img src={techGuruInterview} alt="A guest interview at the Tech Guru Meetup" loading="lazy" className="md:col-span-3 w-full h-full object-cover" />
                <img src={techGuruTeam} alt="The Tech Guru Meetup organizing team" loading="lazy" className="col-span-2 md:col-span-6 w-full h-full object-cover" />
              </div>
              <div className="p-10 md:p-16 text-center">
                <span className="font-display font-black text-[5rem] leading-none select-none text-foreground/10">2025</span>
                <h3 className="font-display font-extrabold text-2xl text-foreground mb-3 -mt-4">
                  {meetup2025?.title ?? "Tech Guru Meetup 2025"}
                </h3>
                <p className="text-foreground/65 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
                  {meetup2025?.summary ?? "Highlights from Tech Guru Meetup 2025 — community, talks, and connections across Accra."}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {meetup2025?.youtubeId && (
                    <a href={yt(meetup2025.youtubeId)} target="_blank" rel="noopener noreferrer"
                      className="btn-magnetic inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-accent-foreground font-bold text-[10px] uppercase tracking-[0.22em] hover:brightness-110 transition-all duration-250">
                      <Play className="w-3.5 h-3.5" /> Watch the recap film
                    </a>
                  )}
                  <a href="/gallery" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-foreground/15 text-foreground/70 hover:border-foreground/40 hover:text-foreground font-bold text-[10px] uppercase tracking-[0.22em] transition-all duration-250">
                    View photo gallery <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 2024 — recap card */}
          {meetup2024 && (
            <Reveal delay={0.08}>
              <div className="card-lift art-card sheen group relative rounded-3xl hover:border-accent/40 overflow-hidden transition-all duration-500 grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-4 relative overflow-hidden border-b lg:border-b-0 lg:border-r border-foreground/10">
                  <img src={meetup2024.image} alt="Tech Guru Meetup 2024 in Accra" loading="lazy"
                    className="w-full h-56 lg:h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/45 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 font-display font-black text-3xl leading-none text-white/90 select-none">2024</span>
                </div>
                <div className="lg:col-span-8 p-6 lg:p-10 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-4 mb-4">
                    <span className="text-[9px] font-black uppercase tracking-[0.25em] px-2.5 py-1 rounded-full border border-foreground/15 text-foreground/50">
                      {meetup2024.entryLabel}
                    </span>
                    <span className="text-xs font-semibold text-foreground/55 flex items-center gap-1.5"><Calendar className="w-3 h-3 text-accent" />{meetup2024.dateLabel}</span>
                    <span className="text-xs font-semibold text-foreground/55 flex items-center gap-1.5"><MapPin className="w-3 h-3 text-accent" />{meetup2024.venue}</span>
                  </div>
                  <h3 className="font-display font-extrabold text-foreground text-2xl md:text-3xl tracking-tight mb-3 group-hover:text-accent transition-colors">
                    {meetup2024.title}
                  </h3>
                  <p className="text-foreground/65 text-sm leading-relaxed max-w-xl mb-6">{meetup2024.summary}</p>
                  {meetup2024.youtubeId && (
                    <a href={yt(meetup2024.youtubeId)} target="_blank" rel="noopener noreferrer"
                      className="btn-magnetic inline-flex w-fit items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-[10px] uppercase tracking-[0.22em] hover:bg-accent hover:text-accent-foreground transition-all duration-250">
                      <Play className="w-3.5 h-3.5" /> Watch the recap film
                    </a>
                  )}
                </div>
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              </div>
            </Reveal>
          )}
        </section>

        {/* ══ 05 — SPONSORSHIP ══ */}
        <section className="relative px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-24 lg:py-32 max-w-7xl mx-auto cv-auto">
          <Reveal className="mb-10 sm:mb-14">
            <div className="flex items-baseline gap-6 mb-6">
              <span className="eyebrow text-accent">05 — Partnerships</span>
              <div className="flex-1 divider-elegant" />
            </div>
            <h2 className="font-display font-extrabold text-foreground leading-[0.9] text-[2.1rem] sm:text-[3rem] md:text-[4.5rem] tracking-tight">
              Put your brand <span className="italic font-light text-accent">on stage.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm sm:text-base text-foreground/65 leading-relaxed">
              Sponsor our flagship events and reach founders, investors, students and ecosystem leaders
              across Ghana and beyond.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sponsorTracks.map((s, i) => (
              <Reveal key={s.key} delay={i * 0.06}>
                <button onClick={() => openSponsor(s.label)}
                  className="group art-card-mint h-full w-full text-left rounded-3xl p-7 border border-foreground/12 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40 flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-foreground/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display font-extrabold text-lg text-foreground tracking-tight leading-[1.1] group-hover:text-accent transition-colors">
                    {s.label}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-foreground/60 flex-1">{s.note}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-accent">
                    Enquire <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ 06 — STAY UPDATED ══ */}
        <section className="px-5 sm:px-6 lg:px-10 pb-20 sm:pb-28">
          <Reveal>
            <div className="glass-cream card-lift rounded-3xl px-6 sm:px-12 py-12 sm:py-16 max-w-3xl mx-auto text-center" style={{ backdropFilter: "blur(14px)" }}>
              <p className="eyebrow text-accent">Stay updated</p>
              <h2 className="font-display font-extrabold text-foreground leading-[0.95] text-[1.8rem] sm:text-[2.6rem] tracking-tight mt-3">
                Be the first to hear about upcoming events.
              </h2>
              <form onSubmit={subscribe} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address" aria-label="Email address"
                  className="flex-1 px-5 py-3.5 rounded-full border border-foreground/15 bg-background/80 text-sm text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-accent/60 transition-colors"
                />
                <button type="submit"
                  className="btn-magnetic px-8 py-3.5 rounded-full bg-accent text-accent-foreground font-bold text-[10px] uppercase tracking-[0.22em] hover:brightness-110 transition-all duration-250">
                  Subscribe
                </button>
              </form>
              <p className="mt-4 text-[11px] text-foreground/45">
                Or write to us directly at{" "}
                <a href={`mailto:${EVENT_CONTACT}`} className="text-accent hover:underline">{EVENT_CONTACT}</a>.
              </p>
            </div>
          </Reveal>
        </section>
      </main>

      {/* ══ REGISTRATION / SPONSORSHIP MODAL ══ */}
      {modal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/88" style={{ backdropFilter: "blur(12px)" }} onClick={() => setModal(null)} />
          <div className="relative z-10 w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-3xl overflow-x-hidden shadow-2xl"
            style={{ animation: "scale-in-modal 0.35s cubic-bezier(0.16,1,0.3,1) forwards" }}>
            <div className="bg-primary px-8 pt-8 pb-6 border-b border-primary-foreground/10 relative text-primary-foreground sticky top-0 z-10">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              <button onClick={() => setModal(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/50 hover:text-primary-foreground hover:border-primary-foreground/50 transition-all duration-200">
                <X className="w-3.5 h-3.5" />
              </button>
              <p className="text-[9px] font-black uppercase tracking-[0.35em] text-accent mb-2">
                {modal.mode === "event" ? "Event registration" : "Sponsorship enquiry"}
              </p>
              <h3 className="font-display font-extrabold text-primary-foreground text-2xl leading-tight">{modal.title}</h3>
              {modal.event && (
                <p className="mt-2 text-[11px] text-primary-foreground/60">
                  {modal.event.dateLabel} · {modal.event.time} · {modal.event.venue}
                </p>
              )}
            </div>

            <div className="bg-background px-8 py-8">
              {done ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-4 text-accent">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-display font-extrabold text-xl text-foreground">
                    {modal.mode === "event" ? "Spot Reserved!" : "Enquiry Received!"}
                  </h4>
                  <p className="mt-2 text-sm text-foreground/55">Check your inbox for confirmation and next steps.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground/60 mb-1.5">
                      {modal.mode === "sponsor" ? "Contact Name" : "Full Name"}
                    </label>
                    <input required type="text" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground/60 mb-1.5">Email Address</label>
                    <input required type="email" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground/60 mb-1.5">Phone</label>
                    <input required type="tel" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground/60 mb-1.5">
                      Organization / University
                    </label>
                    <input type="text" className={inputCls} />
                  </div>

                  {/* event-specific fields carried from the events hub */}
                  {modal.event?.fields.map((f) =>
                    f.type === "checkbox" ? (
                      <label key={f.id} className="flex gap-3 text-[11px] text-foreground/60 leading-relaxed">
                        <input required type="checkbox" className="mt-0.5 accent-current shrink-0" />
                        <span>{f.label}</span>
                      </label>
                    ) : (
                      <div key={f.id}>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground/60 mb-1.5">
                          {f.label}{f.required && <span className="text-accent"> *</span>}
                        </label>
                        {f.type === "select" ? (
                          <select required={f.required} defaultValue="" className={inputCls}>
                            <option value="" disabled>Select one</option>
                            {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                          </select>
                        ) : f.type === "textarea" ? (
                          <textarea required={f.required} rows={3} className={inputCls} />
                        ) : f.type === "file" ? (
                          <input type="file" required={f.required} className={fileCls} />
                        ) : (
                          <input required={f.required} type="text" className={inputCls} />
                        )}
                      </div>
                    )
                  )}

                  {/* ticket + receipt for paid editions */}
                  {modal.mode === "event" && modal.event?.tickets.length ? (
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground/60 mb-1.5">Ticket Type</label>
                      <select required defaultValue="" className={inputCls}>
                        <option value="" disabled>Select one</option>
                        {modal.event.tickets.map((t) => (
                          <option key={t.name} value={t.name}>
                            {t.name} — {t.isFree ? "Free" : `GH₵${t.price.toLocaleString()}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null}

                  {modal.mode === "event" && modal.event?.paymentsEnabled && (
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground/60 mb-1.5">
                        Payment Receipt Screenshot
                      </label>
                      <input type="file" accept="image/*,application/pdf" className={fileCls} />
                      <p className="mt-2 text-[11px] text-foreground/50 leading-relaxed">
                        Pay first via the ticket card, then upload the receipt emailed to you.
                      </p>
                    </div>
                  )}

                  {modal.mode === "sponsor" && (
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground/60 mb-1.5">
                        What would you like to support?
                      </label>
                      <textarea rows={3} className={inputCls} />
                    </div>
                  )}

                  {modal.mode === "event" && !hasOwnConsent(modal.event) && (
                    <label className="flex gap-3 text-[11px] text-foreground/60 leading-relaxed">
                      <input required type="checkbox" className="mt-0.5 accent-current shrink-0" />
                      <span>
                        I consent to Tech Hub Africa LLC processing my details for event management and future event updates,
                        in line with Ghana&rsquo;s Data Protection Laws. I may opt out at any time.
                      </span>
                    </label>
                  )}

                  <button type="submit"
                    className="btn-magnetic w-full py-4 rounded-full bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-all duration-250">
                    {modal.mode === "event" ? "Submit Registration" : "Send Enquiry"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Events;
