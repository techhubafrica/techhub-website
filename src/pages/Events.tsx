import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Calendar, MapPin, Users, ArrowUpRight, CheckCircle2, X } from "lucide-react";
import { heroAudience, heroCelebration, meetup2026Flyer, hackathonFlyer, campusTourFlyer, networking } from "@/assets/photos";
import { useReveal } from "@/hooks/use-reveal";

const eventsList = [
  {
    num: "01", id: "meetup-2026",
    title: "Tech Guru Meetup 2026", tag: "Flagship", tagColor: "hsl(28 92% 44%)",
    date: "October 14–16, 2026", location: "Accra International Conference Centre",
    desc: "The ultimate gathering of African tech leaders, founders, engineers, and investors. Three days of keynotes, live demos, investor matchmaking, and networking.",
    capacity: "2,500+ Attendees", status: "Registration Open", image: meetup2026Flyer,
  },
  {
    num: "02", id: "campus-tour",
    title: "Tech4All Campus Tour 2026", tag: "Campus", tagColor: "hsl(155 61% 30%)",
    date: "Ongoing Throughout 2026", location: "Univ. of Ghana · KNUST · Regional Hubs",
    desc: "Empowering university students with coding bootcamps, AI workshops, and career pathways across West Africa.",
    capacity: "5,000+ Students", status: "Active Tour", image: campusTourFlyer,
  },
  {
    num: "03", id: "hackathon-72",
    title: "Seventy-Two Hours of Impact", tag: "Hackathon", tagColor: "hsl(28 92% 44%)",
    date: "November 20–22, 2026", location: "The Hub — East Legon & Virtual",
    desc: "Elite teams build production-grade solutions to real-world African infrastructure, climate, and finance challenges — in 72 sleepless hours.",
    capacity: "50 Teams", status: "Applications Open", image: hackathonFlyer,
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

const Marquee = () => {
  const text = "Conferences · Campus Tours · Hackathons · Tech Guru Meetup 2026";
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

const Events = () => {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [rsvpDone, setRsvpDone] = useState(false);

  const [timeLeft, setTimeLeft] = useState({ days: 77, hours: 14, mins: 25, secs: 40 });
  useEffect(() => {
    const target = new Date("2026-10-14T08:30:00").getTime();
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
      <PageHero
        tag="Gatherings & Conferences"
        title={<>Connecting Africa's <span className="italic font-light text-accent">innovators</span><br />live, in person.</>}
        body="From our annual flagship Tech Guru Meetup to nationwide campus tours and 72-hour hackathons — discover where the community converges."
        ghost="EVENTS"
      />

      <Marquee />

      <main className="page-entry bg-background overflow-hidden">
        {/* ══ FEATURED EVENT ══ */}
        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          <div className="absolute inset-0">
            <img src={heroAudience} alt="Attendees at the Tech Guru Meetup in Accra"
              className="absolute inset-0 w-full h-full object-cover opacity-35" loading="lazy" />
            <div className="absolute inset-0 bg-primary/72" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,hsl(155_61%_30%/0.5),transparent_65%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_90%,hsl(28_92%_50%/0.2),transparent_60%)]" />
            <div className="noise-bg" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary to-transparent" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
            <div className="card-lift sheen max-w-2xl rounded-3xl border border-primary-foreground/15 bg-primary/60 p-8 md:p-12 shadow-2xl"
              style={{ backdropFilter: "blur(18px)" }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-accent" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Accra, Ghana · 2026</span>
              </div>
              <h2 className="font-display font-black text-primary-foreground text-[2.6rem] md:text-[4rem] leading-[0.92] tracking-tight">
                Tech Guru<br />Meetup 2026
              </h2>
              <p className="mt-4 font-display font-extrabold text-accent text-xl md:text-2xl tracking-tight">
                Where Africa meets what&rsquo;s next.
              </p>
              <p className="mt-7 font-display font-extrabold text-primary-foreground text-lg md:text-xl">
                Wednesday, October 14, 2026 <span className="text-primary-foreground/25 mx-2">|</span> 8:30 AM – 5:00 PM
              </p>
              <p className="mt-2 text-primary-foreground/65 leading-relaxed text-sm">
                Accra International Conference Centre<br />Independence Avenue, Accra
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => openRsvp("Tech Guru Meetup 2026")}
                  className="btn-magnetic px-7 py-3.5 rounded-full bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:brightness-110 transition-all duration-200"
                  style={{ boxShadow: "0 12px 36px -10px hsl(28 92% 44% / 0.6)" }}>
                  Reserve Your Seat
                </button>
                <button onClick={() => openRsvp("Tech Guru Meetup 2026 — Sponsorship")}
                  className="btn-magnetic px-7 py-3.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-primary-foreground hover:text-primary transition-all duration-200"
                  style={{ backdropFilter: "blur(10px)" }}>
                  Become a Sponsor
                </button>
              </div>
              <p className="mt-5 text-sm">
                <span className="font-bold text-accent">General admission is free.</span>{" "}
                <span className="text-primary-foreground/60">Space is limited.</span>
              </p>
            </div>

            {/* Countdown */}
            <div className="mt-12 flex flex-wrap items-center gap-8">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary-foreground/40">Countdown</span>
              <div className="flex items-center gap-6">
                {[
                  { label: "Days", val: timeLeft.days },
                  { label: "Hours", val: timeLeft.hours },
                  { label: "Mins", val: timeLeft.mins },
                  { label: "Secs", val: timeLeft.secs },
                ].map((u) => (
                  <div key={u.label} className="flex items-baseline gap-1.5">
                    <span className="font-display font-black text-primary-foreground text-3xl leading-none tabular-nums">
                      {String(u.val).padStart(2, "0")}
                    </span>
                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary-foreground/40">{u.label}</span>
                  </div>
                ))}
              </div>
              <div className="hidden md:flex items-center gap-5 ml-auto text-xs font-semibold text-primary-foreground/60">
                <span className="flex items-center gap-2"><Users className="w-4 h-4 text-accent" />2,500+ attendees</span>
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-accent" />AICC, Accra</span>
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-accent" />Oct 14–16</span>
              </div>
            </div>
          </div>
        </section>

        {/* ══ ALL EVENTS ══ */}
        <section className="relative px-6 py-28 md:py-36 max-w-7xl mx-auto cv-auto">
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 pointer-events-none bg-[radial-gradient(circle,hsl(155_61%_35%),transparent_70%)]" />

          <Reveal className="mb-10">
            <div className="flex items-baseline gap-6 mb-6">
              <span className="eyebrow text-accent">02 — Calendar</span>
              <div className="flex-1 divider-elegant" />
            </div>
            <h2 className="font-display font-extrabold text-primary leading-[0.9] text-[3rem] md:text-[4.5rem] tracking-tight">
              Upcoming & Past <span className="italic font-light text-accent">Gatherings.</span>
            </h2>
          </Reveal>

          {/* Tabs */}
          <div className="flex items-center gap-8 mb-12 border-b border-primary/10">
            {(["upcoming", "past"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`pb-4 text-xs font-black uppercase tracking-[0.22em] border-b-2 -mb-px transition-all duration-250 ${
                  tab === t ? "border-accent text-accent" : "border-transparent text-primary/40 hover:text-primary/70"
                }`}>
                {t === "upcoming" ? "Upcoming 2026" : "Past Events"}
              </button>
            ))}
          </div>

          {tab === "upcoming" ? (
            <div className="space-y-6">
              {eventsList.map((e, i) => (
                <Reveal key={e.id} delay={i * 0.08}>
                  <div className="card-lift sheen group relative rounded-3xl border border-primary/10 bg-background hover:border-primary/25 overflow-hidden transition-all duration-500 grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-3 relative overflow-hidden border-b lg:border-b-0 lg:border-r border-primary/10">
                      <img src={e.image} alt={`${e.title} — Tech Hub Africa`} loading="lazy"
                        className="w-full h-48 lg:h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-4 font-display font-black text-3xl leading-none text-primary-foreground/90 select-none">{e.num}</span>
                    </div>
                    <div className="lg:col-span-6 p-6 lg:p-9">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] px-2.5 py-1 rounded-full border"
                          style={{ color: e.tagColor, background: `${e.tagColor}18`, borderColor: `${e.tagColor}35` }}>{e.tag}</span>
                        <span className="text-xs font-semibold text-primary/50 flex items-center gap-1.5"><Calendar className="w-3 h-3 text-accent" />{e.date}</span>
                        <span className="text-xs font-semibold text-primary/50 flex items-center gap-1.5"><MapPin className="w-3 h-3 text-accent" />{e.location}</span>
                      </div>
                      <h3 className="font-display font-extrabold text-primary text-2xl md:text-3xl tracking-tight mb-3 group-hover:text-accent transition-colors">{e.title}</h3>
                      <p className="text-primary/65 text-sm leading-relaxed">{e.desc}</p>
                      <div className="flex items-center gap-4 mt-4 text-xs font-bold text-primary/60">
                        <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-accent" />{e.capacity}</span>
                        <span className="text-accent">• {e.status}</span>
                      </div>
                    </div>
                    <div className="lg:col-span-3 flex items-center justify-center p-6 lg:p-9 border-t lg:border-t-0 lg:border-l border-primary/10">
                      <button onClick={() => openRsvp(e.title)}
                        className="btn-magnetic w-full py-3.5 px-6 rounded-full bg-primary text-primary-foreground font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-accent hover:text-accent-foreground transition-all duration-250">
                        RSVP / Register
                      </button>
                    </div>
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="card-lift sheen rounded-3xl border border-primary/10 bg-background overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <img src={heroCelebration} alt="Tech Guru Meetup 2025 celebration" loading="lazy" className="w-full h-64 md:h-full object-cover" />
                  <img src={networking} alt="Networking at the Tech Guru Meetup 2025" loading="lazy" className="hidden md:block w-full h-full object-cover" />
                </div>
                <div className="p-10 md:p-16 text-center">
                  <span className="font-display font-black text-[5rem] leading-none select-none text-primary/10">2025</span>
                  <h3 className="font-display font-extrabold text-2xl text-primary mb-3 -mt-4">Tech Guru Meetup 2025 Highlights</h3>
                  <p className="text-primary/65 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
                    Over 1,800 participants joined us for keynotes, workshops, and startup showcases across Accra. Recorded talks and photos available in the Media hub.
                  </p>
                  <a href="/media" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:text-primary transition-colors duration-200 group">
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
                  <h4 className="font-display font-extrabold text-xl text-primary">Spot Reserved!</h4>
                  <p className="mt-2 text-sm text-primary/55">Check your inbox for confirmation and event details.</p>
                </div>
              ) : (
                <form onSubmit={handleRsvp} className="space-y-5">
                  {["Full Name", "Email Address", "Organization / University"].map((label) => (
                    <div key={label}>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-primary/60 mb-1.5">{label}</label>
                      <input required type={label.includes("Email") ? "email" : "text"}
                        className="w-full px-4 py-3 rounded-xl border border-primary/12 bg-secondary/60 text-sm text-primary focus:outline-none focus:border-accent/60 transition-colors duration-200" />
                    </div>
                  ))}
                  <button type="submit"
                    className="btn-magnetic w-full py-4 rounded-full bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-all duration-250">
                    Confirm RSVP
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
