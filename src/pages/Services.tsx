import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { ShieldCheck, Code, Rocket, Building2, Box, ArrowUpRight, CheckCircle2, X, Workflow, MessagesSquare } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import Marquee from "@/components/Marquee";
import ClientShowcase from "@/components/ClientShowcase";
import {
  serviceSoftware,
  serviceWebDesign,
  portfolioThreatLock,
  hackathonFlyer,
  meetup2026Flyer,
} from "@/assets/photos";
import { techGuruShowcase, techGuruPanel } from "@/assets/tech-guru";
import { Link } from "react-router-dom";

const servicesList = [
  {
    num: "01", id: "software", icon: Code,
    title: "Software Engineering & Product Delivery",
    subtitle: "Full-stack web, mobile, and cloud built for scale.",
    desc: "We design and build production-grade software for African enterprises, startups, and public sector orgs — from custom portals to high-performance mobile apps.",
    features: ["Custom Web & Mobile Apps", "Cloud Infrastructure & DevOps", "API Integrations & Microservices", "UI/UX Design Systems"],
    tag: "Core", accent: "hsl(156 24% 24%)",
    image: serviceSoftware,
  },
  {
    num: "02", id: "incubation", icon: Rocket,
    title: "Startup Incubation & Ecosystem Growth",
    subtitle: "From idea to funded African venture.",
    desc: "Early-stage incubation with seed support, technical advisory, go-to-market strategy, and direct access to regional investors and corporate partners.",
    features: ["Technical Advisory & CTO Support", "Investor Readiness Coaching", "Co-working Space & Lab Access", "Corporate Partner Network"],
    tag: "Ventures", accent: "hsl(28 92% 44%)",
    image: hackathonFlyer,
  },
  {
    num: "03", id: "cybersecurity", icon: ShieldCheck,
    title: "Threat Lock Cybersecurity",
    subtitle: "24/7 AI-powered threat detection & auditing.",
    desc: "Our Threat Lock platform safeguards websites and digital infrastructure against DDoS, malware, SQL injection, and breaches — with zero latency overhead.",
    features: ["20+ Real-Time Security Layers", "Automated Vulnerability Scanning", "Incident Response & Remediation", "Compliance Audits"],
    tag: "Flagship", accent: "hsl(28 92% 44%)",
    image: portfolioThreatLock,
  },
  {
    num: "04", id: "enterprise", icon: Building2,
    title: "Enterprise Solutions",
    subtitle: "Connected systems built around your business.",
    desc: "Custom enterprise platforms that connect business processes, operational data and existing tools into one dependable working environment.",
    features: ["Business Process Automation", "Enterprise System Integration", "Custom Business Applications", "Operational Reporting"],
    tag: "Enterprise", accent: "hsl(var(--foreground))",
    image: techGuruShowcase,
  },
  {
    num: "05", id: "metaverse", icon: Box,
    title: "Global Metaverse Virtual Space",
    subtitle: "Explore our virtual space.",
    desc: "A virtual space bringing Tech Hub Africa’s services together in one interactive experience.",
    features: [],
    tag: "Emerging", accent: "hsl(28 92% 44%)",
    image: "https://img.youtube.com/vi/UC3LwmrrLCs/hqdefault.jpg",
  },
  {
    num: "06", id: "techtalks", icon: MessagesSquare,
    title: "Tech Talks & Speaking Engagements",
    subtitle: "Knowledge sharing across Africa's tech community.",
    desc: "Expert-led Tech Talks, panel discussions, and keynote engagements that educate, inspire, and connect Africa's growing technology community.",
    features: ["Panel Discussions & Keynotes", "Campus Tech Talks", "Corporate Speaking Engagements", "Media & Podcast Appearances"],
    tag: "Community", accent: "hsl(156 24% 24%)",
    image: techGuruPanel,
  },
  {
    num: "07", id: "campus-tours", icon: Rocket,
    title: "Campus Tours & Startup Competitions",
    subtitle: "Taking innovation to universities across Africa.",
    desc: "Tech Hub Africa visits university campuses to run startup competitions, hackathons, and mentorship sessions — discovering the next generation of African tech founders.",
    features: ["University Campus Visits", "Startup Pitch Competitions", "On-Campus Hackathons", "Mentorship & Career Sessions"],
    tag: "Education", accent: "hsl(28 92% 44%)",
    image: meetup2026Flyer,
  },
  {
    num: "08", id: "website-dev", icon: Code,
    title: "Tech Hub Website Development",
    subtitle: "Premium websites built and managed for African businesses.",
    desc: "We build production-grade, SEO-optimised websites and web applications for African businesses — designed to convert, perform, and scale.",
    features: ["Custom Design & Development", "SEO & Performance Optimisation", "Ongoing Maintenance & Security", "E-Commerce & Web Apps"],
    tag: "Flagship", accent: "hsl(156 24% 24%)",
    image: serviceWebDesign,
  },
];

/* -- Productivity & Efficiency: the operating layer beneath the software -- */
const productivityList = [
  {
    num: "01",
    icon: Workflow,
    tag: "Efficiency",
    title: "Smart Work",
    subtitle: "Curated efficiency programs & tools for employees",
    desc: "We design and roll out the working systems your teams actually adopt — curated productivity stacks, automation playbooks and enablement programmes that turn scattered tools into measurable output.",
    features: ["Curated Tool Stacks", "Workflow Automation Playbooks", "Team Enablement Programmes", "Output & Time Analytics"],
  },
  {
    num: "02",
    icon: MessagesSquare,
    tag: "Platform",
    title: "CRM & Corporate Communication Platform",
    subtitle: "One connected spine for customers, teams and stakeholders",
    desc: "A single platform where leads, clients, campaigns and internal channels live together — so every conversation, deal and announcement stays traceable from first touch to renewal.",
    features: ["Pipeline & Client Records", "Unified Messaging Channels", "Campaign & Outreach Automation", "Executive Dashboards"],
  },
  {
    num: "03",
    icon: Building2,
    tag: "Workplace",
    title: "Corporate Intranet",
    subtitle: "A secure home for your organisation's information",
    desc: "Connect employees with company news, shared knowledge and internal resources through an intranet tailored to your organisation.",
    features: ["Employee Directory", "Company News & Announcements", "Document & Knowledge Hub", "Access-Controlled Team Spaces"],
  },
  {
    num: "04",
    icon: ShieldCheck,
    tag: "Security",
    title: "Threat Lock",
    subtitle: "Cyber security mitigation services",
    desc: "Threat Lock closes the gaps attackers exploit — continuous monitoring, rapid mitigation and hardening across web, cloud and endpoint surfaces, with zero latency overhead for your users.",
    features: ["Real-Time Threat Mitigation", "Attack Surface Hardening", "Incident Response Drills", "Compliance & Audit Reporting"],
  },
  {
    num: "05",
    icon: Workflow,
    tag: "HR",
    title: "HR Tools & People Management",
    subtitle: "Streamlined HR operations for growing organisations",
    desc: "From onboarding to performance reviews, our HR tools help organisations manage their most important asset — their people — with clarity and efficiency.",
    features: ["Employee Onboarding Workflows", "Performance Review Systems", "Leave & Attendance Tracking", "HR Analytics Dashboards"],
  },
  {
    num: "06",
    icon: MessagesSquare,
    tag: "Content",
    title: "Vaults & Secure Data Storage",
    subtitle: "Enterprise-grade encrypted storage for sensitive data",
    desc: "Encrypted digital vaults for storing, managing, and sharing sensitive organisational data — with granular access controls and full audit trails.",
    features: ["End-to-End Encryption", "Granular Access Controls", "Full Audit Trails", "Secure File Sharing"],
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

const FormModal = ({ open, onClose, title, submitted, onSubmit }: {
  open: boolean; onClose: () => void; title: string; submitted: boolean; onSubmit: (e: React.FormEvent) => void;
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-primary/88" style={{ backdropFilter: "blur(12px)" }} onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
        style={{ animation: "scale-in-modal 0.35s cubic-bezier(0.16,1,0.3,1) forwards" }}>
        <div className="bg-primary px-8 pt-8 pb-6 border-b border-primary-foreground/10 relative text-primary-foreground">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
          <button onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/50 hover:text-primary-foreground hover:border-primary-foreground/50 transition-all duration-200">
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="text-[9px] font-black uppercase tracking-[0.35em] text-accent mb-2">Service Request</p>
          <h3 className="font-display font-extrabold text-primary-foreground text-2xl leading-tight">{title || "Get a Quote"}</h3>
        </div>
        <div className="bg-background px-8 py-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-4 text-accent">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-display font-extrabold text-xl text-foreground">Inquiry Received!</h4>
              <p className="mt-2 text-sm text-foreground/55">Our team will respond within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              {["Your Name", "Email Address"].map((label) => (
                <div key={label}>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground/60 mb-1.5">{label}</label>
                  <input required type={label.includes("Email") ? "email" : "text"}
                    className="w-full px-4 py-3 rounded-xl border border-foreground/12 bg-secondary/60 text-sm text-foreground focus:outline-none focus:border-accent/60 transition-colors duration-200" />
                </div>
              ))}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground/60 mb-1.5">Project Details</label>
                <textarea required rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-foreground/12 bg-secondary/60 text-sm text-foreground focus:outline-none focus:border-accent/60 resize-none transition-colors duration-200" />
              </div>
              <button type="submit"
                className="btn-magnetic w-full py-4 rounded-full bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-all duration-300">
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
        body="From enterprise software and cybersecurity to startup incubation and enterprise integration — technical excellence delivered across the continent."
        ghost="BUILD"
        stats={[
          { val: "50+", label: "Projects Shipped" },
          { val: "12k+", label: "Developers Reached" },
          { val: "5", label: "Service Pillars" },
          { val: "10+", label: "Countries Active" },
        ]}
      />

      <Marquee text="Engineering Solutions · Enterprise Software · Cybersecurity · Incubating Ventures" />

      <main className="page-entry bg-background overflow-hidden">
        {/* ══ SERVICE LIST (REDESIGNED MATCHING IMAGE 2) ══ */}
        <section className="relative px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-28 lg:py-32 max-w-7xl mx-auto space-y-16 lg:space-y-24">
          <div className="hidden md:block absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_55%/0.35),transparent_70%)]" />
          
          <Reveal className="mb-14">
            <div className="flex items-baseline gap-6 mb-6">
              <span className="eyebrow text-accent">01 — Service Pillars</span>
              <div className="flex-1 divider-elegant" />
            </div>
            <h2 className="font-display font-extrabold text-foreground leading-[0.9] text-[2.1rem] sm:text-[3rem] md:text-[4.5rem] tracking-tight">
              Precision solutions <span className="italic font-light text-accent">built to scale.</span>
            </h2>
          </Reveal>

          <div className="space-y-14 lg:space-y-20">
            {servicesList.map((s, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <Reveal key={s.id} delay={0.06}>
                  <div id={s.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center rounded-3xl p-7 sm:p-9 lg:p-12 bg-card border border-foreground/10 hover:border-accent/30 transition-all duration-500 shadow-sm hover:shadow-xl scroll-mt-28">
                    {/* Editorial Column */}
                    <div className={`lg:col-span-7 flex flex-col justify-between ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">
                            SERVICE {s.num} — {s.tag}
                          </span>
                          <span className="h-px w-8 bg-accent/30" />
                          <span className="text-foreground/50 text-xs font-semibold">{s.subtitle}</span>
                        </div>

                        <h3 className="font-display font-extrabold text-foreground text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-snug mb-4">
                          {s.id === "metaverse" ? (
                            <Link to="/metaverse" className="hover:text-accent transition-colors">{s.title}</Link>
                          ) : s.title}
                        </h3>

                        <p className="text-foreground/75 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
                          {s.desc}
                        </p>

                        {s.features.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6 mb-8 pt-4 border-t border-foreground/10">
                            {s.features.map((f) => (
                              <div key={f} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-foreground/80">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                                {f}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        {s.id === "metaverse" && (
                          <Link to="/metaverse" className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-accent/40 text-accent font-bold text-xs uppercase tracking-widest hover:bg-accent/10 transition-all duration-300">
                            Explore Virtual Space <ArrowUpRight className="w-4 h-4" />
                          </Link>
                        )}
                        <button
                          onClick={() => openQuoteModal(s.title)}
                          className="btn-magnetic inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-accent text-accent-foreground font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-md"
                        >
                          Request Service <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Service media */}
                    <div className={`lg:col-span-5 ${isEven ? "lg:order-1" : "lg:order-2"} flex justify-center`}>
                      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-foreground/10 aspect-[4/3] group bg-muted">
                        <img
                          src={s.image}
                          alt={s.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ══ PRODUCTIVITY & EFFICIENCY ══ */}
        <section id="productivity" className="relative px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-28 lg:py-32 max-w-7xl mx-auto">
          <div className="hidden md:block absolute top-16 left-0 w-[440px] h-[440px] rounded-full blur-3xl opacity-[0.16] pointer-events-none bg-[radial-gradient(circle,hsl(156_62%_58%/0.55),transparent_70%)]" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Heading block */}
            <Reveal className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <div className="flex items-baseline gap-6 mb-6">
                  <span className="eyebrow text-accent">02 — Productivity &amp; Efficiency</span>
                  <div className="flex-1 divider-elegant" />
                </div>
                <h2 className="font-display font-extrabold text-foreground leading-[0.9] tracking-tight text-[2.1rem] sm:text-[3rem] md:text-[3.4rem]">
                  Productivity <span className="italic font-light text-accent">and</span><br />
                  Efficiency
                </h2>
                <p className="mt-6 text-sm md:text-base text-foreground/65 leading-relaxed max-w-md">
                  The operating layer beneath the software: programmes, platforms and protection that keep
                  teams moving, customers close and the business secure.
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <span className="h-px w-16 bg-accent/45" />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-foreground/40">
                    Four capabilities
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Ledger rows */}
            <div className="lg:col-span-7 space-y-5">
              {productivityList.map((p, idx) => (
                <Reveal key={p.title} delay={idx * 0.08}>
                  <div className="card-lift art-card sheen noise-soft group relative overflow-hidden rounded-3xl p-7 sm:p-9 border border-foreground/10 hover:border-accent/30 transition-all duration-300">
                    <div className="relative flex items-start gap-5 sm:gap-7">
                      <div
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 text-accent"
                        style={{ background: "hsl(var(--primary) / 0.5)", border: "1px solid hsl(var(--primary))" }}
                      >
                        <p.icon className="w-5 h-5" strokeWidth={1.5} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20 shrink-0">
                            {p.tag}
                          </span>
                          <span className="h-px w-8 bg-accent/30" />
                        </div>

                        <h3 className="font-display font-extrabold text-foreground text-xl sm:text-2xl tracking-tight leading-snug group-hover:text-accent transition-colors">
                          {p.title}
                        </h3>
                        <p className="mt-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-foreground/50">
                          {p.subtitle}
                        </p>
                        <p className="mt-4 text-sm text-foreground/65 leading-relaxed">{p.desc}</p>

                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
                          {p.features.map((f) => (
                            <div key={f} className="flex items-center gap-2.5 text-xs font-semibold text-foreground/75">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                              {f}
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 pt-5 border-t border-foreground/10 flex items-center justify-between gap-4">
                          <span className="font-display font-black text-[10px] uppercase tracking-[0.3em] text-foreground/25 select-none">
                            {p.num} / 04
                          </span>
                          <button
                            onClick={() => openQuoteModal(p.title)}
                            className="btn-magnetic inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-foreground/55 hover:text-accent transition-colors duration-250"
                          >
                            Request Service <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ LIVE CLIENT WEBSITES SHOWCASE ══ */}
        <ClientShowcase
          title="Live Websites & Web Apps Built by Tech Hub Africa"
          subtitle="Explore real production websites, e-commerce portals, news platforms, logistics engines, and security applications engineered and delivered by our team."
        />

        {/* ══ BOTTOM CTA ══ */}
        <section className="relative overflow-hidden bg-primary px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-28 cv-auto text-primary-foreground">
          <div className="noise-bg" />
          <div className="hidden md:block absolute -top-32 right-10 w-[500px] h-[400px] rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, hsl(28 92% 55% / 0.5), transparent)" }} />
          <div className="relative max-w-4xl mx-auto text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent mb-4">Ready to start?</p>
            <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight leading-[0.9] mb-6">
              Let's build<br /><span className="italic font-light text-accent">something great.</span>
            </h2>
            <p className="text-primary-foreground/65 text-base mb-10 max-w-md mx-auto leading-relaxed">
              Tell us about your project and our engineering team will get back to you within 24 hours.
            </p>
            <button onClick={() => openQuoteModal("General Inquiry")}
              className="btn-magnetic inline-flex items-center gap-3 px-9 py-4 bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.3em] rounded-full hover:bg-primary-foreground hover:text-foreground transition-all duration-300"
              style={{ boxShadow: "0 14px 40px -12px hsl(28 92% 44% / 0.6)" }}>
              Start a Conversation <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>

      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={selectedService} submitted={submitted} onSubmit={handleSubmit} />
      <Footer />
    </>
  );
};

export default Services;
