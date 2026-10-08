import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { BookOpen, Award, CheckCircle2, X, ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import Marquee from "@/components/Marquee";

const objectives = [
  "Provide a platform for knowledge sharing and skills development across software, cloud, and product fields.",
  "Build high-trust 1-on-1 relationships between mentors and mentees across Africa.",
  "Accelerate career trajectories and startup launches for all participants.",
  "Foster a lifelong professional network spanning 10+ countries.",
];

const menteeBenefits = [
  "Gain guidance from experienced professionals and industry experts.",
  "Develop new skills in specific areas of interest over 6-month cycles.",
  "Expand your professional connections across West and East Africa.",
  "Enhance confidence, creativity, and problem-solving skills.",
];

const mentorBenefits = [
  "Give back to the next generation of African engineering talent.",
  "Expand leadership skills and regional tech network.",
  "VIP invitations to Tech Guru Meetup keynotes and roundtables.",
  "Recognized publicly as a Tech Hub Africa Mentor Partner.",
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

const Mentorship = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [role, setRole] = useState<"Mentee" | "Mentor">("Mentee");
  const [submitted, setSubmitted] = useState(false);

  const open = (r: "Mentee" | "Mentor") => { setRole(r); setModalOpen(true); setSubmitted(false); };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setSubmitted(true);
    setTimeout(() => { setModalOpen(false); setSubmitted(false); }, 2500);
  };

  return (
    <>
      <Header />
      <PageHero
        tag="Knowledge Exchange"
        title={<>Guiding Africa's<br /><span className="italic font-light text-accent">emerging tech leaders.</span></>}
        body="We connect ambitious students and early-stage innovators with experienced global industry leaders for 1-on-1 career guidance, technical coaching, and network growth."
        ghost="MENTOR"
        stats={[
          { val: "120+", label: "Active Mentors" },
          { val: "600+", label: "Mentees Matched" },
          { val: "6mo", label: "Program Cycle" },
          { val: "10+", label: "Countries" },
        ]}
      />

      <Marquee text="1-on-1 Coaching · Leadership · Technical Mentorship · 6-Month Cycles" />

      <main className="page-entry bg-background overflow-hidden">
        {/* ══ OBJECTIVES — dark section ══ */}
        <section className="relative bg-secondary text-primary-foreground overflow-hidden px-5 sm:px-6 lg:px-10 py-16 sm:py-12 sm:py-16 md:py-20 lg:py-28 lg:py-36">
          <div className="noise-bg" />
          <div className="hidden md:block absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none bg-[radial-gradient(circle,hsl(var(--primary)),transparent_70%)]" />
          <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <Reveal className="lg:col-span-5">
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-accent mb-4 block">01 — Program Objectives</span>
              <h2 className="font-display font-black text-primary-foreground text-4xl md:text-5xl tracking-tight leading-[0.92] mb-6">
                Why<br /><span className="italic font-light text-accent">mentorship</span><br />matters.
              </h2>
              <p className="text-primary-foreground/65 text-sm leading-relaxed">
                At Tech Hub Africa, we believe mentorship is a powerful catalyst for growth. Our program is designed to connect emerging leaders with the guidance they need to succeed.
              </p>
            </Reveal>
            <div className="lg:col-span-7 space-y-4">
              {objectives.map((o, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="card-lift sheen flex items-start gap-4 p-6 rounded-2xl border border-primary-foreground/10 bg-primary/70 hover:border-accent/30 transition-all duration-300">
                    <span className="font-display font-black text-2xl leading-none text-accent shrink-0">0{i + 1}</span>
                    <p className="text-primary-foreground/75 text-sm leading-relaxed">{o}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ BENEFITS ══ */}
        <section className="relative px-5 sm:px-6 lg:px-10 py-16 sm:py-12 sm:py-16 md:py-20 lg:py-28 lg:py-36 max-w-7xl mx-auto cv-auto">
          <div className="hidden md:block absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_55%/0.35),transparent_70%)]" />

          <Reveal className="mb-12">
            <div className="flex items-baseline gap-6 mb-6">
              <span className="eyebrow text-accent">02 — Choose Your Path</span>
              <div className="flex-1 divider-elegant" />
            </div>
            <h2 className="font-display font-extrabold text-foreground leading-[0.9] text-[2.1rem] sm:text-[3rem] md:text-[4.5rem] tracking-tight">
              Get Guidance or <span className="italic font-light text-accent">Give Back.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mentee */}
            <Reveal delay={0.05}>
              <div className="card-lift sheen rounded-3xl border border-foreground/10 bg-background p-10 md:p-12 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                      <BookOpen className="w-5.5 h-5.5" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">For Mentees</span>
                  </div>
                  <h3 className="font-display font-extrabold text-foreground text-2xl md:text-3xl tracking-tight leading-[0.92] mb-6">
                    Accelerate your <span className="italic font-light text-accent">career.</span>
                  </h3>
                  <ul className="space-y-3.5 mb-8">
                    {menteeBenefits.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-foreground/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <button onClick={() => open("Mentee")} className="btn-magnetic w-full py-4 rounded-full bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center gap-2">
                  Apply as a Mentee <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>

            {/* Mentor */}
            <Reveal delay={0.15}>
              <div className="card-lift sheen relative rounded-3xl overflow-hidden bg-primary text-primary-foreground p-10 md:p-12 flex flex-col justify-between h-full border border-primary-foreground/10">
                <div className="noise-bg" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl border border-accent/30 bg-accent/15 flex items-center justify-center text-accent">
                      <Award className="w-5.5 h-5.5" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">For Mentors</span>
                  </div>
                  <h3 className="font-display font-extrabold text-primary-foreground text-2xl md:text-3xl tracking-tight leading-[0.92] mb-6">
                    Shape the next <span className="italic font-light text-accent">generation.</span>
                  </h3>
                  <ul className="space-y-3.5 mb-8">
                    {mentorBenefits.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-primary-foreground/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <button onClick={() => open("Mentor")} className="btn-magnetic relative z-10 w-full py-4 rounded-full border border-primary-foreground/25 text-primary-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 flex items-center justify-center gap-2">
                  Join as a Mentor <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>
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
              <p className="text-[9px] font-black uppercase tracking-[0.35em] text-accent mb-2">Mentorship Program</p>
              <h3 className="font-display font-extrabold text-primary-foreground text-2xl leading-tight">Register as a {role}</h3>
            </div>
            <div className="bg-background px-8 py-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-4 text-accent"><CheckCircle2 className="w-7 h-7" /></div>
                  <h4 className="font-display font-extrabold text-xl text-foreground">Registration Submitted!</h4>
                  <p className="mt-2 text-sm text-foreground/55">We'll match you with our 2026 cohort within 2 weeks.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {["Full Name", "Email Address", "Area of Expertise / Focus"].map((label) => (
                    <div key={label}>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground/60 mb-1.5">{label}</label>
                      <input required type={label.includes("Email") ? "email" : "text"} className="w-full px-4 py-3 rounded-xl border border-foreground/12 bg-secondary/60 text-sm text-foreground focus:outline-none focus:border-accent/60 transition-colors duration-200" />
                    </div>
                  ))}
                  <button type="submit" className="btn-magnetic w-full py-4 rounded-full bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-all duration-250">Submit Application</button>
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

export default Mentorship;
