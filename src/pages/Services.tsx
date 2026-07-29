import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { ShieldCheck, Code, Rocket, GraduationCap, ArrowRight, CheckCircle2, X } from "lucide-react";

const servicesList = [
  {
    num: "01",
    id: "software",
    icon: Code,
    title: "Software Engineering & Product Delivery",
    subtitle: "Full-stack web, mobile, and cloud built for scale.",
    desc: "We design and build production-grade software for African enterprises, startups, and public sector orgs — from custom portals to high-performance mobile apps.",
    features: ["Custom Web & Mobile Apps", "Cloud Infrastructure & DevOps", "API Integrations & Microservices", "UI/UX Design Systems"],
    tag: "Core",
    accent: "hsl(155 61% 30%)",
  },
  {
    num: "02",
    id: "incubation",
    icon: Rocket,
    title: "Startup Incubation & Ecosystem Growth",
    subtitle: "From idea to funded African venture.",
    desc: "Early-stage incubation with seed support, technical advisory, go-to-market strategy, and direct access to regional investors and corporate partners.",
    features: ["Technical Advisory & CTO Support", "Investor Readiness Coaching", "Co-working Space & Lab Access", "Corporate Partner Network"],
    tag: "Ventures",
    accent: "hsl(28 92% 44%)",
  },
  {
    num: "03",
    id: "cybersecurity",
    icon: ShieldCheck,
    title: "Threat Lock Cybersecurity",
    subtitle: "24/7 AI-powered threat detection & auditing.",
    desc: "Our Threat Lock platform safeguards websites and digital infrastructure against DDoS, malware, SQL injection, and breaches — with zero latency overhead.",
    features: ["20+ Real-Time Security Layers", "Automated Vulnerability Scanning", "Incident Response & Remediation", "Compliance Audits"],
    tag: "Flagship",
    accent: "hsl(28 92% 44%)",
  },
  {
    num: "04",
    id: "campus",
    icon: GraduationCap,
    title: "Tech4All Campus & Talent Development",
    subtitle: "In-demand skills for the next generation.",
    desc: "Nationwide campus tours and hands-on bootcamps training students in cloud, cybersecurity, software engineering, and AI across West Africa.",
    features: ["University Workshops & Hackathons", "Hands-on Tech Bootcamps", "Internship & Job Placement", "Industry Mentorship Network"],
    tag: "Impact",
    accent: "hsl(155 61% 30%)",
  },
];

const FormModal = ({
  open, onClose, title, submitted, onSubmit,
}: {
  open: boolean; onClose: () => void; title: string; submitted: boolean; onSubmit: (e: React.FormEvent) => void;
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-primary/85" style={{ backdropFilter: "blur(12px)" }} onClick={onClose} />
      <div
        className="relative z-10 w-full max-w-lg rounded-3xl overflow-hidden shadow-[0_40px_120px_-20px_hsl(155_61%_4%/0.9)]"
        style={{ animation: "scale-in-modal 0.4s cubic-bezier(0.16,1,0.3,1) forwards" }}
      >
        {/* dark header strip */}
        <div className="bg-primary px-8 pt-8 pb-6 border-b border-primary-foreground/10 relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
          <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/50 hover:text-primary-foreground hover:border-primary-foreground/50 transition-all">
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="text-[9px] font-black uppercase tracking-[0.35em] text-accent mb-2">Service Request</p>
          <h3 className="font-display font-extrabold text-primary-foreground text-2xl leading-tight">{title || "Get a Quote"}</h3>
        </div>
        {/* form body */}
        <div className="bg-background px-8 py-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-4 text-accent">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-display font-extrabold text-xl text-primary">Inquiry Received!</h4>
              <p className="mt-2 text-sm text-primary/55">Our team will respond within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              {["Your Name", "Email Address"].map((label) => (
                <div key={label}>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-primary/60 mb-1.5">{label}</label>
                  <input required type={label.includes("Email") ? "email" : "text"} className="w-full px-4 py-3 rounded-xl border border-primary/12 bg-secondary/60 text-sm text-primary focus:outline-none focus:border-accent/60 transition-colors" />
                </div>
              ))}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-primary/60 mb-1.5">Project Details</label>
                <textarea required rows={4} className="w-full px-4 py-3 rounded-xl border border-primary/12 bg-secondary/60 text-sm text-primary focus:outline-none focus:border-accent/60 resize-none transition-colors" />
              </div>
              <button type="submit" className="w-full py-4 rounded-full bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                Submit Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const openQuoteModal = (t: string) => { setSelectedService(t); setModalOpen(true); setSubmitted(false); };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setSubmitted(true);
    setTimeout(() => { setModalOpen(false); setSubmitted(false); }, 2500);
  };

  return (
    <>
      <Header />
      <PageHero
        tag="What We Build"
        title={<>Engineering solutions for<br /><span className="italic font-light text-accent">Africa's digital future.</span></>}
        body="From enterprise software and cybersecurity to startup incubation and talent development — technical excellence delivered across the continent."
        ghost="BUILD"
        stats={[
          { val: "50+", label: "Projects Shipped" },
          { val: "12k+", label: "Developers Reached" },
          { val: "4", label: "Service Pillars" },
          { val: "10+", label: "Countries Active" },
        ]}
      />

      <main className="bg-background">
        {/* ══ NUMBERED SERVICE LIST ══ */}
        <section className="px-6 py-24 md:py-32 max-w-7xl mx-auto space-y-6">
          {servicesList.map((s, idx) => (
            <div
              key={s.id}
              className="group relative grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-3xl overflow-hidden border border-primary/8 bg-secondary/40 hover:border-primary/20 transition-all duration-500"
            >
              {/* Left number column */}
              <div className="lg:col-span-2 flex items-start justify-between lg:flex-col lg:items-start gap-4 p-8 pb-0 lg:pb-8 border-b lg:border-b-0 lg:border-r border-primary/8">
                <span
                  className="font-display font-black text-5xl md:text-6xl leading-none select-none"
                  style={{ color: s.accent, opacity: 0.35 }}
                >
                  {s.num}
                </span>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20 shrink-0">
                  {s.tag}
                </span>
              </div>

              {/* Centre content */}
              <div className="lg:col-span-7 p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-accent" style={{ background: `${s.accent}18`, border: `1px solid ${s.accent}30` }}>
                    <s.icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-primary/40 text-xs font-semibold tracking-wider">{s.subtitle}</span>
                </div>

                <h3 className="font-display font-extrabold text-primary text-2xl md:text-3xl tracking-tight leading-snug mb-4">
                  {s.title}
                </h3>
                <p className="text-primary/60 text-sm md:text-base leading-relaxed mb-6">{s.desc}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6">
                  {s.features.map((f) => (
                    <div key={f} className="flex items-center gap-2.5 text-xs font-semibold text-primary/75">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right CTA column */}
              <div className="lg:col-span-3 flex items-center justify-center p-8 border-t lg:border-t-0 lg:border-l border-primary/8">
                <button
                  onClick={() => openQuoteModal(s.title)}
                  className="group/btn w-full lg:w-auto flex flex-col items-center gap-4 py-6 px-8 rounded-2xl border border-primary/12 hover:border-accent/50 hover:bg-accent/5 transition-all duration-400"
                >
                  <div className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center text-accent group-hover/btn:bg-accent group-hover/btn:text-accent-foreground group-hover/btn:border-accent transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary/60 group-hover/btn:text-accent transition-colors text-center">
                    Request<br />Service
                  </span>
                </button>
              </div>

              {/* Hover accent line top */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
            </div>
          ))}
        </section>

        {/* ══ BOTTOM CTA STRIP ══ */}
        <section className="relative overflow-hidden bg-primary px-6 py-20">
          <div className="absolute inset-0 opacity-[0.055]" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")" }} />
          <div className="absolute -top-32 right-10 w-[500px] h-[400px] rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(circle, hsl(28 92% 55% / 0.5), transparent)" }} />
          <div className="relative max-w-4xl mx-auto text-center text-primary-foreground">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-4">Ready to start?</p>
            <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight leading-[0.9] mb-6">
              Let's build<br /><span className="italic font-light">something great.</span>
            </h2>
            <p className="text-primary-foreground/55 text-base mb-10 max-w-md mx-auto leading-relaxed">
              Tell us about your project and our engineering team will get back to you within 24 hours.
            </p>
            <button
              onClick={() => openQuoteModal("General Inquiry")}
              className="inline-flex items-center gap-3 px-9 py-4 bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.3em] rounded-full hover:bg-primary-foreground hover:text-primary transition-all duration-300"
              style={{ boxShadow: "0 14px 40px -12px hsl(28 92% 44% / 0.6)" }}
            >
              Start a Conversation <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>

      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedService}
        submitted={submitted}
        onSubmit={handleSubmit}
      />

      <Footer />
    </>
  );
};

export default Services;
