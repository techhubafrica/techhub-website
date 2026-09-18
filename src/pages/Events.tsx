import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ktuHero } from "@/assets/ktu";
import { Calendar, MapPin, Users, ArrowUpRight, CheckCircle2, X, Ticket } from "lucide-react";
import { heroAudience, meetup2026Flyer, hackathonFlyer, campusTourFlyer, networking } from "@/assets/photos";
import { useReveal } from "@/hooks/use-reveal";
import Marquee from "@/components/Marquee";

const eventsList = [
  {
    num: "01", id: "tech-guru",
    title: "Tech Guru Meetup 2026", tag: "Flagship", tagColor: "hsl(28 92% 44%)",
    date: "December 18, 2026", location: "Location TBA",
    desc: "The ultimate gathering of African tech leaders, founders, engineers, and investors. Keynotes, live demos, investor matchmaking, and networking.",
    status: "Registration Open", image: meetup2026Flyer,
  },
  {
    num: "02", id: "campus-tour",
    title: "Tech4All Campus Tour 2026", tag: "Campus", tagColor: "hsl(156 24% 24%)",
    date: "Ongoing Throughout 2026", location: "Univ. of Ghana · KNUST · Regional Hubs",
    desc: "Empowering university students with coding bootcamps, AI workshops, and career pathways across West Africa.",
    status: "Active Tour", image: campusTourFlyer,
  },
  {
    num: "03", id: "hackathon-challenge",
    title: "Month-Long Hackathon Challenge", tag: "Hackathon", tagColor: "hsl(28 92% 44%)",
    date: "November 1–30, 2026", location: "The Hub — East Legon & Virtual",
    desc: "Elite teams build production-grade solutions to real-world African infrastructure, climate, and finance challenges over an intensive month-long competition.",
    status: "Applications Open", image: hackathonFlyer,
  },
];

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

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

const Events = () => {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [rsvpDone, setRsvpDone] = useState(false);

  const [timeLeft, setTimeLeft] = useState({ days: 77, hours: 14, mins: 25, secs: 40 });
  useEffect(() => {
    const target = new Date("2026-12-18T09:00:00").getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days:  Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins:  Math.floor((diff % 3600000)  / 60000),
        secs:  Math.floor((diff % 60000)    / 1000),
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const openRsvp = (title: string) => { setSelectedEvent(title); setRsvpOpen(true); setRsvpDone(false); };
  const handleRsvp = (e: React.FormEvent) => {
    e.preventDefault(); setRsvpDone(true);
    setTimeout(() => { setRsvpOpen(false); setRsvpDone(false); }, 2500);
  };

  return (
    <>
      <Header />

      <main className="page-entry bg-background overflow-hidden">
        {/* ══ HERO FEATURED EVENT: TECH GURU MEETUP ══ */}
        <section className="relative overflow-hidden bg-background text-foreground pt-20 sm:pt-24 md:pt-28">
          <div className="absolute inset-0">
            <img src={heroAudience} alt="Attendees at the Tech Guru Meetup in Accra"
              className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(100deg, hsl(0 0% 100% / 0.5) 0%, hsl(0 0% 100% / 0.26) 40%, hsl(0 0% 100% / 0.06) 74%, hsl(0 0% 100% / 0) 100%)" }} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_90%,hsl(28_92%_50%/0.14),transparent_60%)]" />
            <div className="noise-bg" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-14 sm:py-20 md:py-24 lg:py-28">
            <div className="card-lift sheen glass-cream max-w-2xl rounded-3xl p-8 md:p-12"
              style={{ backdropFilter: "blur(18px)" }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-accent" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">December 18, 2026 · Location TBA</span>
              </div>
              <h1 className="font-display font-black text-foreground text-[2.6rem] md:text-[4rem] leading-[0.92] tracking-tight">
                Tech Guru<br />Meetup 2026
              </h1>
              <p className="mt-4 font-display font-extrabold text-accent text-xl md:text-2xl tracking-tight">
                Where Africa meets what&rsquo;s next.
              </p>
              <p className="mt-7 font-display font-extrabold text-foreground text-lg md:text-xl">
                Friday, December 18, 2026 <span className="text-foreground/25 mx-2">|</span> Time TBA
              </p>
              <p className="mt-2 text-muted-foreground leading-relaxed text-sm">
                Location TBA<br />Official venue announcement coming soon
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => document.getElementById("reservations")?.scrollIntoView({ behavior: "smooth" })}
                  className="btn-magnetic px-7 py-3.5 rounded-full bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:brightness-110 transition-all duration-200"
                  style={{ boxShadow: "0 12px 36px -10px hsl(28 92% 44% / 0.5)" }}>
                  Reserve Your Seat
                </button>
                <button onClick={() => openRsvp("Tech Guru Meetup 2026 — Sponsorship")}
                  className="btn-magnetic px-7 py-3.5 rounded-full border border-foreground/20 bg-primary/5 text-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  style={{ backdropFilter: "blur(10px)" }}>
                  Become a Sponsor
                </button>
              </div>
              <p className="mt-5 text-sm">
                <span className="font-bold text-accent">Tickets from GH₵50.</span>{" "}
                <span className="text-muted-foreground">Space is limited.</span>
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
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-accent" />Location TBA</span>
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-accent" />Dec 18, 2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* ══ CONVEYOR BELT MARQUEE (Right below Tech Guru Meetup Hero) ══ */}
        <Marquee text="Conferences · Campus Tours · Hackathons · Tech Guru Meetup 2026" />

        {/* ══ RESERVATIONS / TICKETS ══ */}
        <section id="reservations" className="relative px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-24 lg:py-32 max-w-7xl mx-auto cv-auto">
          <div className="hidden md:block absolute -top-20 right-0 w-[480px] h-[480px] rounded-full blur-3xl opacity-15 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_50%),transparent_70%)]" />

          <Reveal className="mb-10 sm:mb-14">
            <div className="flex items-baseline gap-6 mb-6">
              <span className="eyebrow text-accent">02 — Reservations</span>
              <div className="flex-1 divider-elegant" />
            </div>
            <h2 className="font-display font-extrabold text-foreground leading-[0.9] text-[2.1rem] sm:text-[3rem] md:text-[4.5rem] tracking-tight">
              Reserve your <span className="italic font-light text-accent">place.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm sm:text-base text-foreground/65 leading-relaxed">
              Tech Guru Meetup 2026 · Friday, 18 December 2026 · Location TBA. Select a ticket tier, complete payment,
              then submit the registration form with your payment receipt.
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
                  {/* ghost numeral */}
                  <span aria-hidden className={`pointer-events-none absolute -top-8 -right-3 font-display font-black leading-none tracking-tighter select-none transition-transform duration-700 group-hover:-translate-y-2 ${
                    t.featured ? "text-[9rem] text-primary-foreground/[0.06]" : "text-[9rem] text-foreground/[0.05]"
                  }`}>
                    {["01", "02", "03", "04"][i]}
                  </span>
                  {/* top accent hairline that draws on hover */}
                  <span className={`absolute top-0 left-7 h-[3px] w-10 rounded-full transition-all duration-500 group-hover:w-20 ${t.featured ? "bg-accent" : "bg-accent"}`} />

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
                          <span className={`mt-[5px] w-1.5 h-1.5 rounded-full shrink-0 ${t.featured ? "bg-accent" : "bg-accent"}`} />
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
                      <button onClick={() => openRsvp(`Tech Guru Meetup 2026 — ${t.name}`)}
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
              <span className="text-xs text-foreground/65 flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-accent" />Registration closes once capacity is reached</span>
              <span className="text-xs text-foreground/65 flex items-center gap-2"><Ticket className="w-3.5 h-3.5 text-accent" />Payments are processed securely via Paystack</span>
            </div>
          </Reveal>
        </section>

        {/* ══ ALL EVENTS ══ */}
        <section className="relative px-5 sm:px-6 lg:px-10 py-16 sm:py-12 sm:py-16 md:py-20 lg:py-28 lg:py-36 max-w-7xl mx-auto cv-auto">
          <div className="hidden md:block absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 pointer-events-none bg-[radial-gradient(circle,hsl(var(--primary)),transparent_70%)]" />

          <Reveal className="mb-10">
            <div className="flex items-baseline gap-6 mb-6">
              <span className="eyebrow text-accent">03 — Calendar</span>
              <div className="flex-1 divider-elegant" />
            </div>
            <h2 className="font-display font-extrabold text-foreground leading-[0.9] text-[2.1rem] sm:text-[3rem] md:text-[4.5rem] tracking-tight">
              Upcoming & Past <span className="italic font-light text-accent">Gatherings.</span>
            </h2>
          </Reveal>

          {/* Tabs */}
          <div className="rail items-center gap-6 sm:gap-8 mb-10 sm:mb-12 border-b border-foreground/10 -mx-1 px-1">
            {(["upcoming", "past"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`pb-4 text-xs font-black uppercase tracking-[0.22em] border-b-2 -mb-px transition-all duration-250 ${
                  tab === t ? "border-accent text-accent" : "border-transparent text-foreground/40 hover:text-foreground/70"
                }`}>
                {t === "upcoming" ? "Upcoming 2026" : "Past Events"}
              </button>
            ))}
          </div>

          {tab === "upcoming" ? (
            <div className="space-y-6">
              {eventsList.map((e, i) => (
                <Reveal key={e.id} delay={i * 0.08}>
                  <div className="card-lift art-card sheen group relative rounded-3xl hover:border-accent/40 overflow-hidden transition-all duration-500 grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-3 relative overflow-hidden border-b lg:border-b-0 lg:border-r border-foreground/10">
                      <img src={e.image} alt={`${e.title} — Tech Hub Africa`} loading="lazy"
                        className="w-full h-48 lg:h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-4 font-display font-black text-3xl leading-none text-primary-foreground/90 select-none">{e.num}</span>
                    </div>
                    <div className="lg:col-span-6 p-6 lg:p-9">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] px-2.5 py-1 rounded-full border"
                          style={{ color: e.tagColor, background: `${e.tagColor}18`, borderColor: `${e.tagColor}35` }}>{e.tag}</span>
                        <span className="text-xs font-semibold text-foreground/50 flex items-center gap-1.5"><Calendar className="w-3 h-3 text-accent" />{e.date}</span>
                        <span className="text-xs font-semibold text-foreground/50 flex items-center gap-1.5"><MapPin className="w-3 h-3 text-accent" />{e.location}</span>
                      </div>
                      <h3 className="font-display font-extrabold text-foreground text-2xl md:text-3xl tracking-tight mb-3 group-hover:text-accent transition-colors">{e.title}</h3>
                      <p className="text-foreground/65 text-sm leading-relaxed">{e.desc}</p>
                      <div className="flex items-center gap-4 mt-4 text-xs font-bold text-foreground/60">
                        <span className="text-accent">{e.status}</span>
                      </div>
                    </div>
                    <div className="lg:col-span-3 flex items-center justify-center p-6 lg:p-9 border-t lg:border-t-0 lg:border-l border-foreground/10">
                      {e.id === "campus-tour" ? (
                        <a
                          href="https://tech4all.techhubafrica.org/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-magnetic w-full py-3.5 px-5 sm:px-6 lg:px-10 rounded-full bg-primary text-primary-foreground font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-accent hover:text-accent-foreground transition-all duration-250 text-center flex items-center justify-center gap-2"
                        >
                          Visit Portal <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <button onClick={() => openRsvp(e.title)}
                          className="btn-magnetic w-full py-3.5 px-5 sm:px-6 lg:px-10 rounded-full bg-primary text-primary-foreground font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-accent hover:text-accent-foreground transition-all duration-250">
                          RSVP / Register
                        </button>
                      )}
                    </div>
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="card-lift art-card sheen rounded-3xl overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <img src={ktuHero[1]} alt="Campus Tour hands-on technology session" loading="lazy" className="w-full h-64 md:h-full object-cover" />
                  <img src={networking} alt="Networking at the Tech Guru Meetup 2025" loading="lazy" className="hidden md:block w-full h-full object-cover" />
                </div>
                <div className="p-10 md:p-16 text-center">
                  <span className="font-display font-black text-[5rem] leading-none select-none text-foreground/10">2025</span>
                  <h3 className="font-display font-extrabold text-2xl text-foreground mb-3 -mt-4">Tech Guru Meetup 2025 Highlights</h3>
                  <p className="text-foreground/65 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
                    Over 1,800 participants joined us for keynotes, workshops, and startup showcases across Accra. Recorded talks and photos available in the Media hub.
                  </p>
                  <a href="/media" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:text-foreground transition-colors duration-200 group">
                    View Media Gallery <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </Reveal>
          )}
        </section>
      </main>

      {/* ══ RSVP MODAL ══ */}
      {rsvpOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/88" style={{ backdropFilter: "blur(12px)" }} onClick={() => setRsvpOpen(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
            style={{ animation: "scale-in-modal 0.35s cubic-bezier(0.16,1,0.3,1) forwards" }}>
            <div className="bg-primary px-8 pt-8 pb-6 border-b border-primary-foreground/10 relative text-primary-foreground">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              <button onClick={() => setRsvpOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/50 hover:text-primary-foreground hover:border-primary-foreground/50 transition-all duration-200">
                <X className="w-3.5 h-3.5" />
              </button>
              <p className="text-[9px] font-black uppercase tracking-[0.35em] text-accent mb-2">Event RSVP</p>
              <h3 className="font-display font-extrabold text-primary-foreground text-2xl leading-tight">{selectedEvent}</h3>
            </div>
            <div className="bg-background px-8 py-8">
              {rsvpDone ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-4 text-accent">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-display font-extrabold text-xl text-foreground">Spot Reserved!</h4>
                  <p className="mt-2 text-sm text-foreground/55">Check your inbox for confirmation and event details.</p>
                </div>
              ) : (
                <form onSubmit={handleRsvp} className="space-y-5">
                  {["Full Name", "Email Address", "Phone", "Occupation / Role", "Organization / University"].map((label) => (
                    <div key={label}>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground/60 mb-1.5">{label}</label>
                      <input required={label !== "Organization / University"}
                        type={label.includes("Email") ? "email" : label === "Phone" ? "tel" : "text"}
                        className="w-full px-4 py-3 rounded-xl border border-foreground/12 bg-secondary/60 text-sm text-foreground focus:outline-none focus:border-accent/60 transition-colors duration-200" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground/60 mb-1.5">Ticket Type</label>
                    <select required defaultValue={ticketTiers.find((t) => selectedEvent.includes(t.name))?.id ?? ""}
                      className="w-full px-4 py-3 rounded-xl border border-foreground/12 bg-secondary/60 text-sm text-foreground focus:outline-none focus:border-accent/60 transition-colors duration-200">
                      <option value="" disabled>Select one</option>
                      {ticketTiers.map((t) => (
                        <option key={t.id} value={t.id}>{t.name} — {t.price}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground/60 mb-1.5">Payment Receipt Screenshot</label>
                    <input type="file" accept="image/*,application/pdf"
                      className="w-full px-4 py-3 rounded-xl border border-foreground/12 bg-secondary/60 text-xs text-foreground/70 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:bg-primary file:text-primary-foreground file:text-[10px] file:font-bold file:uppercase file:tracking-wider" />
                    <p className="mt-2 text-[11px] text-foreground/50 leading-relaxed">
                      Pay first via the ticket card, then upload the receipt emailed to you.
                    </p>
                  </div>
                  <label className="flex gap-3 text-[11px] text-foreground/60 leading-relaxed">
                    <input required type="checkbox" className="mt-0.5 accent-current shrink-0" />
                    <span>
                      I consent to Tech Hub Africa LLC processing my details for event management and future event updates,
                      in line with Ghana&rsquo;s Data Protection Laws. I may opt out at any time.
                    </span>
                  </label>
                  <button type="submit"
                    className="btn-magnetic w-full py-4 rounded-full bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-all duration-250">
                    Submit Registration
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
