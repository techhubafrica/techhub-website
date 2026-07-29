import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Wifi, Coffee, Users, Calendar, MapPin, ArrowRight, CheckCircle2, X } from "lucide-react";

const amenities = [
  { num: "01", icon: Wifi, title: "Gigabit Fiber", desc: "Redundant high-speed fiber with 99.9% uptime — no throttling, no excuses." },
  { num: "02", icon: Users, title: "Collaborative Hot Desks", desc: "Ergonomic workstations for founders, developers, and creators of all kinds." },
  { num: "03", icon: Coffee, title: "Artisanal Coffee Bar", desc: "On-site espresso bar and lounge area for informal deep-work sessions." },
  { num: "04", icon: Calendar, title: "100-Person Event Hall", desc: "Fully equipped AV, livestreaming rigs, and flexible seating for workshops and meetups." },
];

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
        stats={[
          { val: "5,000", label: "sq ft Campus" },
          { val: "100+", label: "Event Capacity" },
          { val: "Mon–Sat", label: "Open Daily" },
          { val: "Accra", label: "East Legon" },
        ]}
      />

      <main className="bg-background">
        {/* ══ AMENITIES ══ */}
        <section className="px-6 py-24 md:py-32 max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Facilities</span>
            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight leading-[0.92] mt-3 text-primary">
              Built for<br /><span className="italic font-light text-accent">deep work.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {amenities.map((a, idx) => (
              <div key={a.num} className={`group relative rounded-3xl overflow-hidden p-10 md:p-12 transition-all duration-500 ${idx === 0 || idx === 3 ? "bg-primary" : "border border-primary/8 bg-secondary/30 hover:border-primary/20"}`}>
                {(idx === 0 || idx === 3) && (
                  <>
                    <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")" }} />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                  </>
                )}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${idx === 0 || idx === 3 ? "bg-accent/10 border border-accent/25 text-accent" : "bg-accent/8 border border-accent/15 text-accent"}`}>
                      <a.icon className="w-5.5 h-5.5" />
                    </div>
                    <span className={`font-display font-black text-5xl leading-none select-none ${idx === 0 || idx === 3 ? "text-accent/15" : "text-primary/8"}`}>{a.num}</span>
                  </div>
                  <h3 className={`font-display font-extrabold text-2xl mb-3 ${idx === 0 || idx === 3 ? "text-primary-foreground" : "text-primary"}`}>{a.title}</h3>
                  <p className={`text-sm leading-relaxed ${idx === 0 || idx === 3 ? "text-primary-foreground/55" : "text-primary/55"}`}>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ LOCATION + BOOKING ══ */}
        <section className="relative bg-primary overflow-hidden px-6 py-20">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")" }} />
          <div className="absolute -top-32 right-10 w-[500px] h-[400px] rounded-full blur-3xl opacity-15" style={{ background: "radial-gradient(circle, hsl(28 92% 55% / 0.5), transparent)" }} />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-primary-foreground">
            <div>
              <span className="text-[9px] font-black uppercase tracking-[0.35em] text-accent mb-4 block">Visit Us</span>
              <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight leading-[0.92] mb-5">
                48 IPS Road,<br /><span className="italic font-light text-accent">East Legon.</span>
              </h2>
              <p className="text-primary-foreground/55 text-sm leading-relaxed mb-6 max-w-md">
                Head Office Annex: 48 IPS Road, East Legon, Accra, Ghana, West Africa. Open Monday through Saturday, 8:00 AM – 9:00 PM GMT.
              </p>
              <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                <MapPin className="w-4 h-4" /> Accra, Ghana, West Africa
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-sm space-y-4">
                <div className="p-6 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5">
                  <p className="text-[9px] font-black uppercase tracking-widest text-accent mb-3">Opening Hours</p>
                  <div className="space-y-2 text-sm text-primary-foreground/60 font-semibold">
                    <div className="flex justify-between"><span>Mon – Fri</span><span className="text-primary-foreground/80">8:00 AM – 9:00 PM</span></div>
                    <div className="flex justify-between"><span>Saturday</span><span className="text-primary-foreground/80">9:00 AM – 6:00 PM</span></div>
                    <div className="flex justify-between"><span>Sunday</span><span className="text-primary-foreground/40">Closed</span></div>
                  </div>
                </div>
                <button
                  onClick={() => { setBookingOpen(true); setSubmitted(false); }}
                  className="w-full py-4 rounded-full bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-primary-foreground hover:text-primary transition-all"
                  style={{ boxShadow: "0 14px 40px -12px hsl(28 92% 44% / 0.6)" }}
                >
                  Book a Desk / Tour <ArrowRight className="w-4 h-4 inline ml-2" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Booking Modal */}
      {bookingOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/85" style={{ backdropFilter: "blur(12px)" }} onClick={() => setBookingOpen(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl" style={{ animation: "scale-in-modal 0.4s cubic-bezier(0.16,1,0.3,1) forwards" }}>
            <div className="bg-primary px-8 pt-8 pb-6 border-b border-primary-foreground/10 relative">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              <button onClick={() => setBookingOpen(false)} className="absolute top-5 right-5 w-8 h-8 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/50 hover:text-primary-foreground transition-all"><X className="w-3.5 h-3.5" /></button>
              <p className="text-[9px] font-black uppercase tracking-[0.35em] text-accent mb-2">Campus Booking</p>
              <h3 className="font-display font-extrabold text-primary-foreground text-2xl leading-tight">Book a Desk / Visit Tour</h3>
            </div>
            <div className="bg-background px-8 py-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-4 text-accent"><CheckCircle2 className="w-7 h-7" /></div>
                  <h4 className="font-display font-extrabold text-xl text-primary">Booking Confirmed!</h4>
                  <p className="mt-2 text-sm text-primary/55">Our campus team will prepare your desk pass and email confirmation details.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {["Full Name", "Email Address"].map((label) => (
                    <div key={label}>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-primary/60 mb-1.5">{label}</label>
                      <input required type={label.includes("Email") ? "email" : "text"} className="w-full px-4 py-3 rounded-xl border border-primary/12 bg-secondary/60 text-sm text-primary focus:outline-none focus:border-accent/60 transition-colors" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-primary/60 mb-1.5">Preferred Visit Date</label>
                    <input required type="date" className="w-full px-4 py-3 rounded-xl border border-primary/12 bg-secondary/60 text-sm text-primary focus:outline-none focus:border-accent/60 transition-colors" />
                  </div>
                  <button type="submit" className="w-full py-4 rounded-full bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-all">Confirm Booking</button>
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
