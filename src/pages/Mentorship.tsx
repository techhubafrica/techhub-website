import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { BookOpen, Award, CheckCircle2, X, ArrowRight } from "lucide-react";

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

      <main className="page-entry bg-background">
        {/* ══ OBJECTIVES — dark section ══ */}
        <section className="relative bg-primary overflow-hidden px-6 py-20">
          <div className="noise-bg" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <span className="text-[9px] font-black uppercase tracking-[0.35em] text-accent mb-4 block">Program Objectives</span>
              <h2 className="font-display font-black text-primary-foreground text-4xl md:text-5xl tracking-tight leading-[0.92] mb-6">
                Why<br /><span className="italic font-light text-accent">mentorship</span><br />matters.
              </h2>
              <p className="text-primary-foreground/50 text-sm leading-relaxed">
                At Tech Hub Africa, we believe mentorship is a powerful catalyst for growth. Our program is designed to connect emerging leaders with the guidance they need to succeed.
              </p>
            </div>
            <div className="lg:col-span-7 space-y-4">
              {objectives.map((o, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl border border-primary-foreground/8 bg-primary-foreground/3 hover:border-accent/20 transition-colors duration-250">
                  <span className="font-display font-black text-2xl leading-none text-accent/20 shrink-0">0{i + 1}</span>
                  <p className="text-primary-foreground/60 text-sm leading-relaxed">{o}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ BENEFITS ══ */}
        <section className="px-6 py-24 md:py-32 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mentee */}
          <div className="rounded-3xl border border-primary/8 bg-secondary/30 p-10 md:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-accent/8 border border-accent/15 flex items-center justify-center text-accent">
                  <BookOpen className="w-5.5 h-5.5" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">For Mentees</span>
              </div>
              <h3 className="font-display font-extrabold text-primary text-2xl md:text-3xl tracking-tight leading-[0.92] mb-6">
                Accelerate your <span className="italic font-light text-accent">career.</span>
              </h3>
              <ul className="space-y-3.5 mb-8">
                {menteeBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-primary/65">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={() => open("Mentee")} className="w-full py-4 rounded-full bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-all">
              Apply as a Mentee <ArrowRight className="w-4 h-4 inline ml-1" />
            </button>
          </div>

          {/* Mentor */}
          <div className="relative rounded-3xl overflow-hidden bg-primary p-10 md:p-12 flex flex-col justify-between">
            <div className="noise-bg" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl border border-accent/25 bg-accent/10 flex items-center justify-center text-accent">
                  <Award className="w-5.5 h-5.5" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">For Mentors</span>
              </div>
              <h3 className="font-display font-extrabold text-primary-foreground text-2xl md:text-3xl tracking-tight leading-[0.92] mb-6">
                Shape the next <span className="italic font-light text-accent">generation.</span>
              </h3>
              <ul className="space-y-3.5 mb-8">
                {mentorBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-primary-foreground/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={() => open("Mentor")} className="relative z-10 w-full py-4 rounded-full border border-primary-foreground/25 text-primary-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all">
              Join as a Mentor <ArrowRight className="w-4 h-4 inline ml-1" />
            </button>
          </div>
        </section>
      </main>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/88" style={{ backdropFilter: "blur(12px)" }} onClick={() => setModalOpen(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl" style={{ animation: "scale-in-modal 0.35s cubic-bezier(0.16,1,0.3,1) forwards" }}>
            <div className="bg-primary px-8 pt-8 pb-6 border-b border-primary-foreground/10 relative">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              <button onClick={() => setModalOpen(false)} className="absolute top-5 right-5 w-8 h-8 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/50 hover:text-primary-foreground transition-all"><X className="w-3.5 h-3.5" /></button>
              <p className="text-[9px] font-black uppercase tracking-[0.35em] text-accent mb-2">Mentorship Program</p>
              <h3 className="font-display font-extrabold text-primary-foreground text-2xl leading-tight">Register as a {role}</h3>
            </div>
            <div className="bg-background px-8 py-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-4 text-accent"><CheckCircle2 className="w-7 h-7" /></div>
                  <h4 className="font-display font-extrabold text-xl text-primary">Registration Submitted!</h4>
                  <p className="mt-2 text-sm text-primary/55">We'll match you with our 2026 cohort within 2 weeks.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {["Full Name", "Email Address", "Area of Expertise / Focus"].map((label) => (
                    <div key={label}>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-primary/60 mb-1.5">{label}</label>
                      <input required type={label.includes("Email") ? "email" : "text"} className="w-full px-4 py-3 rounded-xl border border-primary/12 bg-secondary/60 text-sm text-primary focus:outline-none focus:border-accent/60 transition-colors" />
                    </div>
                  ))}
                  <button type="submit" className="w-full py-4 rounded-full bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-all">Submit Application</button>
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
