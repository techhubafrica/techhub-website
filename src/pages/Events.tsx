import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Calendar, MapPin, Users, ArrowRight, CheckCircle2, X, ChevronLeft, ChevronRight } from "lucide-react";

const eventsList = [
  {
    num: "01",
    id: "meetup-2026",
    title: "Tech Guru Meetup 2026",
    tag: "Flagship",
    tagColor: "hsl(28 92% 44%)",
    date: "October 14–16, 2026",
    location: "Accra International Conference Centre",
    desc: "The ultimate gathering of African tech leaders, founders, engineers, and investors. Three days of keynotes, live demos, investor matchmaking, and networking.",
    capacity: "2,500+ Attendees",
    status: "Registration Open",
    featured: true,
  },
  {
    num: "02",
    id: "campus-tour",
    title: "Tech4All Campus Tour 2026",
    tag: "Campus",
    tagColor: "hsl(155 61% 30%)",
    date: "Ongoing Throughout 2026",
    location: "Univ. of Ghana · KNUST · Regional Hubs",
    desc: "Empowering university students with coding bootcamps, AI workshops, and career pathways across West Africa.",
    capacity: "5,000+ Students",
    status: "Active Tour",
    featured: false,
  },
  {
    num: "03",
    id: "hackathon-72",
    title: "Seventy-Two Hours of Impact",
    tag: "Hackathon",
    tagColor: "hsl(28 92% 44%)",
    date: "November 20–22, 2026",
    location: "The Hub — East Legon & Virtual",
    desc: "Elite teams build production-grade solutions to real-world African infrastructure, climate, and finance challenges — in 72 sleepless hours.",
    capacity: "50 Teams",
    status: "Applications Open",
    featured: false,
  },
];

const Events = () => {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [rsvpDone, setRsvpDone] = useState(false);

  // Countdown to Oct 14 2026
  const [timeLeft, setTimeLeft] = useState({ days: 77, hours: 14, mins: 25, secs: 40 });
  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((p) => {
        if (p.secs > 0) return { ...p, secs: p.secs - 1 };
        if (p.mins > 0) return { ...p, mins: p.mins - 1, secs: 59 };
        if (p.hours > 0) return { ...p, hours: p.hours - 1, mins: 59, secs: 59 };
        return p;
      });
    }, 1000);
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

      <main className="bg-background">
        {/* ══ FEATURED EVENT — CINEMATIC SUMMIT STAGE ══ */}
        <section className="relative overflow-hidden bg-primary">
          {/* Photo-ready stage backdrop */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,hsl(155_61%_30%/0.55),transparent_65%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_90%,hsl(28_92%_50%/0.22),transparent_60%)]" />
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")" }} />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary to-transparent" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
            {/* Floating glass info card, left-weighted */}
            <div className="max-w-2xl rounded-3xl border border-primary-foreground/12 bg-primary/55 p-8 md:p-12 shadow-2xl" style={{ backdropFilter: "blur(20px)" }}>
              <div className="flex items-center gap-3 mb-7">
                <span className="h-px w-8 bg-accent" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Accra, Ghana · 2026</span>
              </div>

              <h2 className="font-display font-black text-primary-foreground text-[2.75rem] md:text-[4.25rem] leading-[0.92] tracking-tight">
                Tech Guru<br />Meetup 2026
              </h2>
              <p className="mt-5 font-display font-extrabold text-accent text-xl md:text-2xl tracking-tight">
                Where Africa meets what&rsquo;s next.
              </p>

              <p className="mt-8 font-display font-extrabold text-primary-foreground text-lg md:text-xl">
                Wednesday, October 14, 2026 <span className="text-primary-foreground/25 mx-2">|</span> 8:30 AM – 5:00 PM
              </p>
              <p className="mt-3 text-primary-foreground/60 leading-relaxed">
                Accra International Conference Centre<br />
                Independence Avenue, Accra
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <button
                  onClick={() => openRsvp("Tech Guru Meetup 2026")}
                  className="px-8 py-4 rounded-full bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:brightness-110 transition-all"
                  style={{ boxShadow: "0 14px 40px -12px hsl(28 92% 44% / 0.65)" }}
                >
                  Reserve Your Seat
                </button>
                <button
                  onClick={() => openRsvp("Tech Guru Meetup 2026 — Sponsorship")}
                  className="px-8 py-4 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-primary-foreground hover:text-primary transition-all"
                  style={{ backdropFilter: "blur(12px)" }}
                >
                  Become a Sponsor
                </button>
              </div>

              <p className="mt-6 text-sm">
                <span className="font-bold text-accent">General admission is free.</span>{" "}
                <span className="text-primary-foreground/55">Space is limited.</span>
              </p>
            </div>

            {/* Slim countdown strip */}
            <div className="mt-12 flex flex-wrap items-center gap-8">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary-foreground/40">Countdown</span>
              <div className="flex items-center gap-6">
                {[
                  { label: "Days", val: timeLeft.days },
                  { label: "Hours", val: timeLeft.hours },
                  { label: "Mins", val: timeLeft.mins },
                  { label: "Secs", val: timeLeft.secs },
                ].map((u) => (
                  <div key={u.label} className="flex items-baseline gap-2">
                    <span className="font-display font-black text-primary-foreground text-3xl leading-none">{String(u.val).padStart(2, "0")}</span>
                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-primary-foreground/35">{u.label}</span>
                  </div>
                ))}
              </div>
              <div className="hidden md:flex items-center gap-5 ml-auto text-xs font-semibold text-primary-foreground/55">
                <span className="flex items-center gap-2"><Users className="w-4 h-4 text-accent" />2,500+ attendees</span>
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-accent" />AICC, Accra</span>
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-accent" />Oct 14–16</span>
              </div>
            </div>
          </div>
        </section>


        {/* ══ ALL EVENTS ══ */}
        <section className="px-6 pb-28 max-w-7xl mx-auto">
          {/* Tabs */}
          <div className="flex items-center gap-8 mb-12 border-b border-primary/8 pb-0">
            {(["upcoming", "past"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-4 text-xs font-black uppercase tracking-[0.22em] border-b-2 -mb-px transition-all duration-300 ${
                  tab === t ? "border-accent text-accent" : "border-transparent text-primary/40 hover:text-primary/70"
                }`}
              >
                {t === "upcoming" ? "Upcoming 2026" : "Past Events"}
              </button>
            ))}
          </div>

          {tab === "upcoming" ? (
            <div className="space-y-5">
              {eventsList.map((e) => (
                <div key={e.id} className="group relative rounded-2xl border border-primary/8 bg-secondary/30 hover:border-primary/20 overflow-hidden transition-all duration-400 grid grid-cols-1 lg:grid-cols-12">
                  {/* Number */}
                  <div className="lg:col-span-1 flex lg:flex-col items-center justify-center lg:justify-start gap-4 lg:gap-0 px-6 py-6 lg:py-10 border-b lg:border-b-0 lg:border-r border-primary/8">
                    <span className="font-display font-black text-4xl leading-none select-none" style={{ color: e.tagColor, opacity: 0.25 }}>{e.num}</span>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-8 p-6 lg:p-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-[9px] font-black uppercase tracking-[0.25em] px-2.5 py-1 rounded-full border" style={{ color: e.tagColor, background: `${e.tagColor}15`, borderColor: `${e.tagColor}30` }}>{e.tag}</span>
                      <span className="text-xs font-semibold text-primary/50 flex items-center gap-1.5"><Calendar className="w-3 h-3 text-accent" />{e.date}</span>
                      <span className="text-xs font-semibold text-primary/50 flex items-center gap-1.5"><MapPin className="w-3 h-3 text-accent" />{e.location}</span>
                    </div>
                    <h3 className="font-display font-extrabold text-primary text-2xl md:text-3xl tracking-tight mb-3">{e.title}</h3>
                    <p className="text-primary/60 text-sm leading-relaxed">{e.desc}</p>
                    <div className="flex items-center gap-4 mt-4 text-xs font-bold text-primary/50">
                      <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-accent" />{e.capacity}</span>
                      <span className="text-accent">• {e.status}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="lg:col-span-3 flex items-center justify-center p-6 lg:p-10 border-t lg:border-t-0 lg:border-l border-primary/8">
                    <button
                      onClick={() => openRsvp(e.title)}
                      className="w-full py-3.5 px-6 rounded-full bg-primary text-primary-foreground font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-accent hover:text-accent-foreground transition-all"
                    >
                      RSVP / Register
                    </button>
                  </div>

                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-primary/8 bg-secondary/30 p-10 md:p-16 text-center">
              <span className="font-display font-black text-[5rem] leading-none select-none text-primary/8">2025</span>
              <h3 className="font-display font-extrabold text-2xl text-primary mb-3 -mt-4">Tech Guru Meetup 2025 Highlights</h3>
              <p className="text-primary/55 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
                Over 1,800 participants joined us for keynotes, workshops, and startup showcases across Accra. Recorded talks and photos available in the Media hub.
              </p>
              <a href="/media" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:text-accent/70 transition-colors">
                View Media Gallery <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </section>
      </main>

      {/* ══ RSVP MODAL ══ */}
      {rsvpOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/85" style={{ backdropFilter: "blur(12px)" }} onClick={() => setRsvpOpen(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl" style={{ animation: "scale-in-modal 0.4s cubic-bezier(0.16,1,0.3,1) forwards" }}>
            <div className="bg-primary px-8 pt-8 pb-6 border-b border-primary-foreground/10 relative">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              <button onClick={() => setRsvpOpen(false)} className="absolute top-5 right-5 w-8 h-8 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/50 hover:text-primary-foreground transition-all"><X className="w-3.5 h-3.5" /></button>
              <p className="text-[9px] font-black uppercase tracking-[0.35em] text-accent mb-2">Event RSVP</p>
              <h3 className="font-display font-extrabold text-primary-foreground text-2xl leading-tight">{selectedEvent}</h3>
            </div>
            <div className="bg-background px-8 py-8">
              {rsvpDone ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-4 text-accent"><CheckCircle2 className="w-7 h-7" /></div>
                  <h4 className="font-display font-extrabold text-xl text-primary">Spot Reserved!</h4>
                  <p className="mt-2 text-sm text-primary/55">Check your inbox for confirmation and event details.</p>
                </div>
              ) : (
                <form onSubmit={handleRsvp} className="space-y-5">
                  {["Full Name", "Email Address", "Organization / University"].map((label) => (
                    <div key={label}>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-primary/60 mb-1.5">{label}</label>
                      <input required type={label.includes("Email") ? "email" : "text"} className="w-full px-4 py-3 rounded-xl border border-primary/12 bg-secondary/60 text-sm text-primary focus:outline-none focus:border-accent/60 transition-colors" />
                    </div>
                  ))}
                  <button type="submit" className="w-full py-4 rounded-full bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-all">Confirm RSVP</button>
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
