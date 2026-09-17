import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { heroBackdrops } from "@/assets/ktu";
import { Wifi, Coffee, Users, Calendar, Box, MapPin, ArrowUpRight, CheckCircle2, X } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import Marquee from "@/components/Marquee";

const amenities = [
  { num: "01", icon: Wifi, title: "Gigabit Fiber", desc: "Redundant high-speed fiber with 99.9% uptime — no throttling, no excuses." },
  { num: "02", icon: Users, title: "Collaborative Hot Desks", desc: "Ergonomic workstations for founders, developers, and creators of all kinds." },
  { num: "03", icon: Coffee, title: "Artisanal Coffee Bar", desc: "On-site espresso bar and lounge area for informal deep-work sessions." },
  { num: "04", icon: Calendar, title: "100-Person Event Hall", desc: "Fully equipped AV, livestreaming rigs, and flexible seating for workshops and meetups." },
  { num: "05", icon: Box, title: "Global Metaverse VR Hub", desc: "Equipped with VR rigs, 3D development suites, and metaverse access points connecting East Legon to virtual labs worldwide." },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

const TheHub = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setSubmitted(true);
    setTimeout(() => { setBookingOpen(false); setSubmitted(false); }, 2500);
  };

  return (
    <>
      <Header />
      <PageHero
        tag="Innovation Campus"
        title={<>THE HUB —<br /><span className="italic font-light text-accent">East Legon, Accra.</span></>}
        body="Our flagship co-working, incubation, and event space at 48 IPS Road, East Legon. Purpose-built to fuel collaboration across Africa's tech community."
        ghost="HUB"
        image={heroBackdrops.hub}
        imageAlt="Innovation campus workspace at Tech Hub Africa East Legon"
        stats={[
          { val: "5,000", label: "sq ft Campus" },
          { val: "100+", label: "Event Capacity" },
          { val: "Mon–Sat", label: "Open Daily" },
          { val: "Accra", label: "East Legon" },
        ]}
      />

      <Marquee text="Co-Working Space · Innovation Hub · East Legon · Accra Campus" />

      <main className="page-entry bg-background overflow-hidden">
        {/* ══ AMENITIES ══ */}
        <section className="relative px-5 sm:px-6 lg:px-10 py-16 sm:py-12 sm:py-16 md:py-20 lg:py-28 lg:py-36 max-w-7xl mx-auto">
          <div className="hidden md:block absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_55%/0.35),transparent_70%)]" />

          <Reveal className="mb-16">
            <div className="flex items-baseline gap-6 mb-6">
              <span className="eyebrow text-accent">01 — Facilities</span>
              <div className="flex-1 divider-elegant" />
            </div>
            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight leading-[0.92] text-foreground">
              Built for<br /><span className="italic font-light text-accent">deep work.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {amenities.map((a, idx) => (
              <Reveal key={a.num} delay={idx * 0.08}>
                <div className={`card-lift sheen group relative rounded-3xl overflow-hidden p-10 md:p-12 transition-all duration-500 border border-foreground/10 ${idx === 0 || idx === 3 || idx === 4 ? "bg-primary text-primary-foreground" : "bg-background"} ${idx === 4 ? "md:col-span-2" : ""}`}>
                  {(idx === 0 || idx === 3 || idx === 4) && (
                    <>
                      <div className="noise-bg" />
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                    </>
                  )}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${idx === 0 || idx === 3 || idx === 4 ? "bg-accent/15 border border-accent/30 text-accent" : "bg-accent/10 border border-accent/20 text-accent"}`}>
                        <a.icon className="w-5.5 h-5.5" />
                      </div>
                      <span className={`font-display font-black text-5xl leading-none select-none ${idx === 0 || idx === 3 || idx === 4 ? "text-accent/25" : "text-foreground/10"}`}>{a.num}</span>
                    </div>
                    <h3 className={`font-display font-extrabold text-2xl mb-3 ${idx === 0 || idx === 3 || idx === 4 ? "text-primary-foreground" : "text-foreground"}`}>{a.title}</h3>
                    <p className={`text-sm leading-relaxed ${idx === 0 || idx === 3 || idx === 4 ? "text-primary-foreground/65" : "text-foreground/65"}`}>{a.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ LOCATION + BOOKING ══ */}
        <section className="relative bg-secondary text-primary-foreground overflow-hidden px-5 sm:px-6 lg:px-10 py-16 sm:py-12 sm:py-16 md:py-20 lg:py-28 lg:py-36 cv-auto">
          <div className="noise-bg" />
          <div className="hidden md:block absolute -top-32 right-10 w-[500px] h-[400px] rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, hsl(28 92% 55% / 0.5), transparent)" }} />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          
          <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-accent mb-4 block">02 — Visit Us</span>
              <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight leading-[0.92] mb-5">
                48 IPS Road,<br /><span className="italic font-light text-accent">East Legon.</span>
              </h2>
              <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6 max-w-md">
                Head Office Annex: 48 IPS Road, East Legon, Accra, Ghana, West Africa. Open Monday through Saturday, 8:00 AM – 9:00 PM GMT.
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                <MapPin className="w-4 h-4" /> Accra, Ghana, West Africa
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-sm space-y-4">
                  <div className="card-lift p-6 rounded-2xl border border-primary-foreground/15 bg-primary/60 backdrop-blur-md">
                    <p className="text-[9px] font-black uppercase tracking-widest text-accent mb-3">Opening Hours</p>
                    <div className="space-y-2 text-sm text-primary-foreground/70 font-semibold">
                      <div className="flex justify-between"><span>Mon – Fri</span><span className="text-primary-foreground/90">8:00 AM – 9:00 PM</span></div>
                      <div className="flex justify-between"><span>Saturday</span><span className="text-primary-foreground/90">9:00 AM – 6:00 PM</span></div>
                      <div className="flex justify-between"><span>Sunday</span><span className="text-primary-foreground/40">Closed</span></div>
                    </div>
                  </div>
                  <button
                    onClick={() => { setBookingOpen(true); setSubmitted(false); }}
                    className="btn-magnetic w-full py-4 rounded-full bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-primary-foreground hover:text-foreground transition-all duration-300 flex items-center justify-center gap-2"
                    style={{ boxShadow: "0 14px 40px -12px hsl(28 92% 44% / 0.6)" }}
                  >
                    Book a Desk / Tour <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Booking Modal */}
      {bookingOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/88" style={{ backdropFilter: "blur(12px)" }} onClick={() => setBookingOpen(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl" style={{ animation: "scale-in-modal 0.35s cubic-bezier(0.16,1,0.3,1) forwards" }}>
            <div className="bg-primary px-8 pt-8 pb-6 border-b border-primary-foreground/10 relative text-primary-foreground">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              <button onClick={() => setBookingOpen(false)} className="absolute top-5 right-5 w-8 h-8 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/50 hover:text-primary-foreground transition-all"><X className="w-3.5 h-3.5" /></button>
              <p className="text-[9px] font-black uppercase tracking-[0.35em] text-accent mb-2">Campus Booking</p>
              <h3 className="font-display font-extrabold text-primary-foreground text-2xl leading-tight">Book a Desk / Visit Tour</h3>
            </div>
            <div className="bg-background px-8 py-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-4 text-accent"><CheckCircle2 className="w-7 h-7" /></div>
                  <h4 className="font-display font-extrabold text-xl text-foreground">Booking Confirmed!</h4>
                  <p className="mt-2 text-sm text-foreground/55">Our campus team will prepare your desk pass and email confirmation details.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {["Full Name", "Email Address"].map((label) => (
                    <div key={label}>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground/60 mb-1.5">{label}</label>
                      <input required type={label.includes("Email") ? "email" : "text"} className="w-full px-4 py-3 rounded-xl border border-foreground/12 bg-secondary/60 text-sm text-foreground focus:outline-none focus:border-accent/60 transition-colors duration-200" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground/60 mb-1.5">Preferred Visit Date</label>
                    <input required type="date" className="w-full px-4 py-3 rounded-xl border border-foreground/12 bg-secondary/60 text-sm text-foreground focus:outline-none focus:border-accent/60 transition-colors duration-200" />
                  </div>
                  <button type="submit" className="btn-magnetic w-full py-4 rounded-full bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-all duration-250">Confirm Booking</button>
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

export default TheHub;
