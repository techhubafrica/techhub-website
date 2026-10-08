import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { ArrowUpRight, CheckCircle2, X } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import Marquee from "@/components/Marquee";

const tiers = [
  {
    num: "01", name: "Campus Tour Sponsor", tag: "Community Tier",
    desc: "Sponsor digital literacy bootcamps and hackathons at university campuses across Ghana and West Africa.",
    benefits: ["Brand placement at 5+ campus events", "Logo on all campus materials", "Student testimonial features", "CSR impact report"],
  },
  {
    num: "02", name: "Tech Guru Meetup Partner", tag: "Flagship Tier",
    desc: "Premium brand presence, keynote opportunities, and VIP access at our 2,500+ attendee flagship conference.",
    benefits: ["Keynote speaking slot (15 mins)", "Exhibition booth (6×4m)", "VIP networking dinner access", "Full media & press coverage"],
  },
  {
    num: "03", name: "Hackathon Challenge Sponsor", tag: "Innovation Tier",
    desc: "Fund problem statements, prize pools, and cloud credits for top engineering teams building for African impact.",
    benefits: ["Your challenge problem statement", "Direct access to winning teams", "Talent pipeline from top finishers", "Co-branded trophy & certificate"],
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

const CSR = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tier, setTier] = useState("Corporate Sponsor");
  const [submitted, setSubmitted] = useState(false);

  const open = (t: string) => { setTier(t); setModalOpen(true); setSubmitted(false); };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setSubmitted(true);
    setTimeout(() => { setModalOpen(false); setSubmitted(false); }, 2500);
  };

  return (
    <>
      <Header />
      <PageHero
        tag="Social Impact & Partnerships"
        title={<>Driving inclusive <span className="italic font-light text-accent">technological impact</span><br />across Africa.</>}
        body="Through our CSR initiatives, we partner with global tech brands, financial institutions, and foundations to bridge digital inequality and empower communities."
        ghost="IMPACT"
        stats={[
          { val: "12k+", label: "Students Trained" },
          { val: "25+", label: "Campuses Reached" },
          { val: "14", label: "Hackathons Funded" },
          { val: "350+", label: "Scholarships Awarded" },
        ]}
      />

      <Marquee text="CSR Partnerships · Social Impact · Digital Inclusion · Corporate Sponsorships" />

      <main className="page-entry bg-background overflow-hidden">
        {/* ══ SPONSOR TIERS ══ */}
        <section className="relative px-5 sm:px-6 lg:px-10 py-16 sm:py-12 sm:py-16 md:py-20 lg:py-28 lg:py-36 max-w-7xl mx-auto">
          <div className="hidden md:block absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_55%/0.35),transparent_70%)]" />

          <Reveal className="mb-16">
            <div className="flex items-baseline gap-6 mb-6">
              <span className="eyebrow text-accent">01 — Partner With Us</span>
              <div className="flex-1 divider-elegant" />
            </div>
            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight leading-[0.92] text-foreground">
              Sponsorship<br /><span className="italic font-light text-accent">Opportunities.</span>
            </h2>
          </Reveal>

          <div className="space-y-6">
            {tiers.map((t, idx) => (
              <Reveal key={t.num} delay={idx * 0.08}>
                <div className={`card-lift sheen group relative rounded-3xl overflow-hidden transition-all duration-500 border border-foreground/10 ${idx === 1 ? "bg-primary text-primary-foreground" : "bg-background"}`}>
                  {idx === 1 && (
                    <>
                      <div className="noise-bg" />
                      <div className="hidden md:block absolute -top-20 right-10 w-[400px] h-[300px] rounded-full blur-3xl opacity-20 pointer-events-none"
                        style={{ background: "radial-gradient(circle, hsl(28 92% 55% / 0.5), transparent)" }} />
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
                    </>
                  )}

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-2 flex items-start gap-5 lg:flex-col lg:gap-4 p-8 pb-0 lg:pb-8 border-b lg:border-b-0 border-foreground/10 lg:border-r">
                      <span className={`font-display font-black text-5xl leading-none select-none ${idx === 1 ? "text-accent/35" : "text-foreground/15"}`}>{t.num}</span>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${idx === 1 ? "text-accent bg-accent/10 border-accent/25" : "text-accent bg-accent/10 border-accent/20"}`}>{t.tag}</span>
                    </div>

                    <div className="lg:col-span-7 p-8 lg:p-10">
                      <h3 className={`font-display font-extrabold text-2xl md:text-3xl tracking-tight mb-3 ${idx === 1 ? "text-primary-foreground" : "text-foreground"}`}>{t.name}</h3>
                      <p className={`text-sm leading-relaxed mb-6 ${idx === 1 ? "text-primary-foreground/65" : "text-foreground/65"}`}>{t.desc}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6">
                        {t.benefits.map((b) => (
                          <div key={b} className={`flex items-start gap-2.5 text-xs font-semibold ${idx === 1 ? "text-primary-foreground/75" : "text-foreground/75"}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1" />
                            {b}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-3 flex items-center justify-center p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-foreground/10">
                      <button onClick={() => open(t.name)}
                        className={`btn-magnetic w-full py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                          idx === 1
                            ? "bg-accent text-accent-foreground hover:bg-primary-foreground hover:text-foreground"
                            : "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground"
                        }`}
                      >
                        Inquire <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/88" style={{ backdropFilter: "blur(12px)" }} onClick={() => setModalOpen(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl" style={{ animation: "scale-in-modal 0.35s cubic-bezier(0.16,1,0.3,1) forwards" }}>
            <div className="bg-primary px-8 pt-8 pb-6 border-b border-primary-foreground/10 relative text-primary-foreground">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              <button onClick={() => setModalOpen(false)} className="absolute top-5 right-5 w-8 h-8 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/50 hover:text-primary-foreground transition-all"><X className="w-3.5 h-3.5" /></button>
              <p className="text-[9px] font-black uppercase tracking-[0.35em] text-accent mb-2">Sponsorship Inquiry</p>
              <h3 className="font-display font-extrabold text-primary-foreground text-2xl leading-tight">{tier}</h3>
            </div>
            <div className="bg-background px-8 py-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-4 text-accent"><CheckCircle2 className="w-7 h-7" /></div>
                  <h4 className="font-display font-extrabold text-xl text-foreground">Inquiry Received!</h4>
                  <p className="mt-2 text-sm text-foreground/55">Our partnerships lead will send you a detailed package within 48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {["Company / Foundation Name", "Contact Email", "Brief Message"].map((label) => (
                    <div key={label}>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground/60 mb-1.5">{label}</label>
                      {label === "Brief Message"
                        ? <textarea required rows={3} className="w-full px-4 py-3 rounded-xl border border-foreground/12 bg-secondary/60 text-sm text-foreground focus:outline-none focus:border-accent/60 resize-none transition-colors duration-200" />
                        : <input required type={label.includes("Email") ? "email" : "text"} className="w-full px-4 py-3 rounded-xl border border-foreground/12 bg-secondary/60 text-sm text-foreground focus:outline-none focus:border-accent/60 transition-colors duration-200" />
                      }
                    </div>
                  ))}
                  <button type="submit" className="btn-magnetic w-full py-4 rounded-full bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-all duration-250">Submit Inquiry</button>
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

export default CSR;
