import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { heroBackdrops } from "@/assets/ktu";
import { MapPin, ArrowUpRight, CheckCircle2, X } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import Marquee from "@/components/Marquee";

const jobs = [
  { id: "swe", num: "01", title: "Senior Full-Stack Engineer", dept: "Engineering", location: "Accra / Hybrid", type: "Full-Time" },
  { id: "devops", num: "02", title: "Cloud & Security Engineer", dept: "Infrastructure", location: "Accra / Remote", type: "Full-Time" },
  { id: "community", num: "03", title: "Campus Programs Coordinator", dept: "Community", location: "Accra / Regional", type: "Full-Time" },
  { id: "intern-swe", num: "04", title: "Software Engineering Intern — 2026 Cohort", dept: "Engineering", location: "Accra", type: "Internship" },
  { id: "intern-design", num: "05", title: "Product Design Intern", dept: "Design", location: "Accra", type: "Internship" },
];

const perks = [
  { label: "Flexible Work", val: "Remote-first culture with optional East Legon desk." },
  { label: "Mentorship", val: "1-on-1 coaching with senior engineers and industry leaders." },
  { label: "Growth", val: "Fast-track promotions based on impact, not tenure." },
  { label: "Community", val: "Access to THA events, meetups, and alumni network." },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

const Careers = () => {
  const [filter, setFilter] = useState<"all" | "Full-Time" | "Internship">("all");
  const [applyOpen, setApplyOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const filteredJobs = filter === "all" ? jobs : jobs.filter((j) => j.type === filter);

  const handleApply = (t: string) => { setSelectedRole(t); setApplyOpen(true); setSubmitted(false); };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setSubmitted(true);
    setTimeout(() => { setApplyOpen(false); setSubmitted(false); }, 2500);
  };

  return (
    <>
      <Header />
      <PageHero
        tag="Join Our Team"
        title={<>Build the future of<br />African <span className="italic font-light text-accent">technology.</span></>}
        body="We're looking for engineers, designers, community leaders, and operators who are committed to transforming Africa's digital landscape."
        ghost="CAREERS"
        image={heroBackdrops.careers}
        imageAlt="Tech Hub Africa team collaborating at a campus programme"
        stats={[
          { val: "5+", label: "Open Roles" },
          { val: "100%", label: "Mission Driven" },
          { val: "Accra", label: "Headquarters" },
          { val: "2026", label: "Hiring Now" },
        ]}
      />

      <Marquee text="Engineering Roles · Product Design · Campus Operations · 2026 Cohort" />

      <main className="page-entry bg-background overflow-hidden">
        {/* ══ PERKS STRIP ══ */}
        <section className="relative bg-primary text-primary-foreground px-5 sm:px-6 lg:px-10 py-10 sm:py-14 md:py-16 overflow-hidden">
          <div className="noise-bg" />
          <div className="relative max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {perks.map((p) => (
              <div key={p.label} className="border-l-2 border-accent/40 pl-5">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-1.5">{p.label}</p>
                <p className="text-primary-foreground/65 text-xs leading-relaxed">{p.val}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ JOB LISTINGS ══ */}
        <section className="relative px-5 sm:px-6 lg:px-10 py-16 sm:py-12 sm:py-16 md:py-20 lg:py-28 lg:py-36 max-w-7xl mx-auto">
          <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_55%/0.35),transparent_70%)]" />

          <Reveal className="mb-10">
            <div className="flex items-baseline gap-6 mb-6">
              <span className="eyebrow text-accent">01 — Open Roles</span>
              <div className="flex-1 divider-elegant" />
            </div>
            <h2 className="font-display font-extrabold text-primary leading-[0.9] text-[2.1rem] sm:text-[3rem] md:text-[4.5rem] tracking-tight">
              Current <span className="italic font-light text-accent">Opportunities.</span>
            </h2>
          </Reveal>

          {/* Filters */}
          <div className="rail items-center gap-6 sm:gap-8 mb-10 sm:mb-12 border-b border-primary/10 -mx-1 px-1">
            {(["all", "Full-Time", "Internship"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`pb-4 text-xs font-black uppercase tracking-[0.22em] border-b-2 -mb-px transition-all duration-250 ${filter === f ? "border-accent text-accent" : "border-transparent text-primary/40 hover:text-primary/70"}`}>
                {f === "all" ? `All Openings (${jobs.length})` : f === "Full-Time" ? "Full-Time Roles" : "Internship Cohort"}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {filteredJobs.map((j, i) => (
              <Reveal key={j.id} delay={i * 0.08}>
                <div className="card-lift sheen group relative rounded-3xl border border-primary/10 bg-background hover:border-primary/25 transition-all duration-500 overflow-hidden grid grid-cols-1 md:grid-cols-12">
                  <div className="hidden md:col-span-1 md:flex items-center justify-center px-6 lg:px-10 py-10 border-r border-primary/10">
                    <span className="font-display font-black text-3xl leading-none text-primary/20 select-none">{j.num}</span>
                  </div>
                  <div className="md:col-span-8 p-5 sm:p-6 md:p-8">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${j.type === "Full-Time" ? "text-accent bg-accent/10 border-accent/20" : "text-primary/60 bg-primary/5 border-primary/12"}`}>{j.dept}</span>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-primary/40">• {j.type}</span>
                    </div>
                    <h3 className="font-display font-extrabold text-primary text-xl md:text-2xl tracking-tight group-hover:text-accent transition-colors">{j.title}</h3>
                    <p className="text-xs font-semibold text-primary/60 flex items-center gap-1.5 mt-2">
                      <MapPin className="w-3 h-3 text-accent" />{j.location}
                    </p>
                  </div>
                  <div className="md:col-span-3 flex items-center justify-center p-5 sm:p-6 md:p-8 border-t md:border-t-0 md:border-l border-primary/10">
                    <button onClick={() => handleApply(j.title)}
                      className="btn-magnetic w-full py-3.5 px-5 rounded-full bg-primary text-primary-foreground font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-accent hover:text-accent-foreground transition-all duration-250 text-center flex items-center justify-center gap-2">
                      Apply Now <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      {/* Modal */}
      {applyOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/88" style={{ backdropFilter: "blur(12px)" }} onClick={() => setApplyOpen(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl" style={{ animation: "scale-in-modal 0.35s cubic-bezier(0.16,1,0.3,1) forwards" }}>
            <div className="bg-primary px-8 pt-8 pb-6 border-b border-primary-foreground/10 relative text-primary-foreground">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              <button onClick={() => setApplyOpen(false)} className="absolute top-5 right-5 w-8 h-8 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/50 hover:text-primary-foreground transition-all"><X className="w-3.5 h-3.5" /></button>
              <p className="text-[9px] font-black uppercase tracking-[0.35em] text-accent mb-2">Application</p>
              <h3 className="font-display font-extrabold text-primary-foreground text-2xl leading-tight">{selectedRole}</h3>
            </div>
            <div className="bg-background px-8 py-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-4 text-accent"><CheckCircle2 className="w-7 h-7" /></div>
                  <h4 className="font-display font-extrabold text-xl text-primary">Application Submitted!</h4>
                  <p className="mt-2 text-sm text-primary/55">Our talent team will review and respond within 5 business days.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {["Full Name", "Email Address", "LinkedIn / Portfolio URL"].map((label) => (
                    <div key={label}>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-primary/60 mb-1.5">{label}</label>
                      <input required type={label.includes("Email") ? "email" : label.includes("URL") ? "url" : "text"} className="w-full px-4 py-3 rounded-xl border border-primary/12 bg-secondary/60 text-sm text-primary focus:outline-none focus:border-accent/60 transition-colors duration-200" />
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

export default Careers;
