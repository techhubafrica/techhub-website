import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  MapPin,
  ArrowUpRight,
  CheckCircle2,
  X,
  Search,
  Sparkles,
  Users,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Code2,
  Heart,
  BookOpen,
  Award,
} from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import Marquee from "@/components/Marquee";
import {
  internshipsFlyer,
  campusTourFlyer,
  careerDigitalMarketing,
  serviceSoftware,
  serviceWebDesign,
  portfolioThreatLock,
} from "@/assets/photos";

interface JobRole {
  id: string;
  title: string;
  dept: string;
  category: "Engineering" | "Security" | "Product" | "Marketing" | "Internships";
  location: string;
  type: "Full-Time" | "Internship" | "Contract";
  summary: string;
  requirements: string[];
  image: string;
}

const jobOpenings: JobRole[] = [
  {
    id: "digital-marketing",
    title: "Digital Marketing Professional",
    dept: "Marketing & Growth",
    category: "Marketing",
    location: "Accra, Ghana / Hybrid",
    type: "Full-Time",
    summary: "Drive digital marketing campaigns, social media growth, SEO strategy, and brand acquisition across West Africa.",
    requirements: ["SEO, SEM & Social Media strategy", "Content marketing & analytics", "Campaign management"],
    image: careerDigitalMarketing,
  },
  {
    id: "swe-lead",
    title: "Senior Full-Stack Engineer",
    dept: "Engineering & Product",
    category: "Engineering",
    location: "Accra, Ghana / Hybrid",
    type: "Full-Time",
    summary: "Lead the architecture and development of scalable web applications, client portals, and e-commerce infrastructure.",
    requirements: ["React, Node.js & REST APIs", "Database design & Cloud deployment", "5+ years JS/TS experience"],
    image: serviceSoftware,
  },
  {
    id: "cyber-analyst",
    title: "Cybersecurity Threat Lock Analyst",
    dept: "Threat Lock Security",
    category: "Security",
    location: "Accra, Ghana",
    type: "Full-Time",
    summary: "Monitor real-time threat telemetry, perform vulnerability assessments, and safeguard web applications.",
    requirements: ["SOC monitoring & OWASP Top 10", "Vulnerability auditing", "Incident response"],
    image: portfolioThreatLock,
  },
  {
    id: "product-designer",
    title: "Lead UI/UX Product Designer",
    dept: "Product & Design",
    category: "Product",
    location: "Accra / Hybrid",
    type: "Full-Time",
    summary: "Craft intuitive, accessible design systems and high-converting interfaces for web applications and mobile platforms.",
    requirements: ["Figma design system mastery", "User research & wireframing", "Responsive web UX"],
    image: serviceWebDesign,
  },
  {
    id: "intern-swe-2026",
    title: "Software Engineering Intern — 2026 Cohort",
    dept: "Engineering Academy",
    category: "Internships",
    location: "Accra Campus",
    type: "Internship",
    summary: "Intensive 6-month hands-on apprenticeship building real production applications alongside senior architects.",
    requirements: ["HTML, CSS, JavaScript basics", "Fast learner & problem solver", "Final year student or recent grad"],
    image: internshipsFlyer,
  },
];

const culturePillars = [
  {
    icon: Sparkles,
    title: "Purpose & Transformational Impact",
    desc: "Every product, line of code, and campus tour directly empowers African talent and digitizes vital industries across the continent.",
  },
  {
    icon: Heart,
    title: "Equal Opportunity & Inclusion",
    desc: "We foster an inclusive culture where diverse perspectives are celebrated across engineering, design, and executive leadership.",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning & Academy",
    desc: "Direct access to Tech Hub Academy masterclasses, conference stipends, and dedicated time for technical innovation.",
  },
  {
    icon: Users,
    title: "Health, Wellbeing & Flexibility",
    desc: "Hybrid work flexibility, ergonomic workstation setups, and wellness support for balanced, high-performing careers.",
  },
];

const internshipTracks = [
  { title: "Software Engineering", desc: "Build full-stack web platforms and cloud microservices alongside senior engineers." },
  { title: "Cybersecurity & WAF", desc: "Hands-on training in threat monitoring, vulnerability scanning, and security auditing." },
  { title: "Event & Marketing", desc: "Plan summit logistics, campus tour workshops, digital media campaigns, and public relations." },
  { title: "Research & Operations", desc: "Perform tech sector research, startup incubation support, and partner ecosystem management." },
];

const mentorshipObjectives = [
  "Provide a platform for knowledge sharing and skills development across software, cloud, and product fields.",
  "Build high-trust 1-on-1 relationships between mentors and mentees across Africa.",
  "Accelerate career trajectories and startup launches for all participants.",
  "Foster a lifelong professional network spanning 10+ countries.",
];

const menteeBenefits = [
  "Gain 1-on-1 guidance from experienced tech leaders.",
  "Develop practical skills over structured 6-month cycles.",
  "Expand your professional connections across West and East Africa.",
  "Build confidence, technical expertise, and career momentum.",
];

const mentorBenefits = [
  "Give back to the next generation of African engineering talent.",
  "Expand leadership skills and regional executive network.",
  "VIP invitations to Tech Guru Meetup keynotes and roundtables.",
  "Recognized publicly as a Tech Hub Africa Mentor Partner.",
];

const hiringSteps = [
  { num: "01", title: "Discover & Apply", desc: "Submit your resume, portfolio, or program application." },
  { num: "02", title: "Technical / Case Chat", desc: "Showcase your skills through a practical case or code challenge." },
  { num: "03", title: "Cultural Fit & Vision", desc: "Connect with our team leads to discuss mutual growth and vision." },
  { num: "04", title: "Offer & Onboarding", desc: "Join Tech Hub Africa with a structured 90-day growth plan." },
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
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<JobRole | null>(null);

  const [mentorshipModalOpen, setMentorshipModalOpen] = useState(false);
  const [mentorshipRole, setMentorshipRole] = useState<"Mentee" | "Mentor">("Mentee");

  const [submitted, setSubmitted] = useState(false);
  const [internSubmitted, setInternSubmitted] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleInternFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInternSubmitted(true);
    setTimeout(() => {
      setInternSubmitted(false);
      setSelectedFileName("");
    }, 4000);
  };

  const filteredJobs = jobOpenings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || job.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleApplyRole = (job: JobRole) => {
    setSelectedRole(job);
    setApplyModalOpen(true);
    setSubmitted(false);
  };

  const handleOpenMentorship = (role: "Mentee" | "Mentor") => {
    setMentorshipRole(role);
    setMentorshipModalOpen(true);
    setSubmitted(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setApplyModalOpen(false);
      setMentorshipModalOpen(false);
      setSubmitted(false);
    }, 2500);
  };

  return (
    <>
      <Header />
      <div className="pt-24 sm:pt-28" />
      <Marquee text="Purpose-Driven Work · Full-Time Careers · University Internships · 1-on-1 Mentorship · 2026 Cohort" />

      <main className="page-entry bg-background overflow-hidden">
        {/* ══ 01. CULTURE & LIFE AT TECH HUB (Safaricom Inspired) ══ */}
        <section className="relative px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-28 lg:py-32 max-w-7xl mx-auto">
          <div className="hidden md:block absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_55%/0.35),transparent_70%)]" />

          <Reveal className="mb-14">
            <div className="flex items-baseline gap-6 mb-6">
              <span className="eyebrow text-accent">01 — Life at Tech Hub</span>
              <div className="flex-1 divider-elegant" />
            </div>
            <h2 className="font-display font-extrabold text-foreground leading-[0.9] text-[2.1rem] sm:text-[3rem] md:text-[4.5rem] tracking-tight">
              A workplace designed for <span className="italic font-light text-accent">impact &amp; growth.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {culturePillars.map((c, idx) => (
              <Reveal key={c.title} delay={idx * 0.08}>
                <div className="card-lift sheen group relative rounded-3xl border border-foreground/10 bg-background p-8 transition-all duration-500 hover:border-accent/40 hover:shadow-xl h-full flex flex-col justify-between overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 text-accent flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                      <c.icon className="w-5.5 h-5.5" />
                    </div>
                    <h3 className="font-display font-extrabold text-foreground text-xl mb-3 tracking-tight group-hover:text-accent transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ 02. CAREER & INTERNSHIP OPENINGS (Search & Filter) ══ */}
        <section id="openings" className="relative bg-secondary text-primary-foreground px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-28 lg:py-36 overflow-hidden">
          <div className="noise-bg" />
          <div className="hidden md:block absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-3xl opacity-15 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_55%/0.4),transparent_70%)]" />

          <div className="relative max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-12">
              <div>
                <span className="eyebrow text-accent">02 — Career &amp; Internship Opportunities</span>
                <h2 className="font-display font-extrabold text-3.5xl sm:text-5xl md:text-6xl tracking-tight leading-[0.92] mt-4">
                  Explore open roles.
                </h2>
              </div>
              <p className="text-primary-foreground/70 max-w-md text-sm md:text-base leading-relaxed">
                Find your place at Tech Hub Africa across full-time engineering, cybersecurity, product design, and 2026 internship cohorts.
              </p>
            </div>

            {/* Search & Filter Controls */}
            <div className="space-y-6 mb-12">
              <div className="relative max-w-2xl">
                <Search className="w-5 h-5 text-accent absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search open roles by title, skill, or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-full bg-primary/80 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 text-sm focus:outline-none focus:border-accent transition-all duration-300"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent mr-2">Filter:</span>
                {["All", "Engineering", "Security", "Product", "Internships"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
                      activeCategory === cat
                        ? "bg-accent text-accent-foreground shadow-md"
                        : "bg-primary-foreground/10 text-primary-foreground/60 hover:bg-primary-foreground/20 hover:text-primary-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Roles Card Grid (Matching Old Site Screenshot Layout) */}
            {filteredJobs.length === 0 ? (
              <div className="text-center py-16 rounded-3xl border border-primary-foreground/15 bg-primary/40 p-8">
                <p className="font-display font-bold text-xl text-primary-foreground mb-2">No roles match your search</p>
                <p className="text-sm text-primary-foreground/60">Try searching for a different keyword or resetting filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredJobs.map((job, idx) => (
                  <Reveal key={job.id} delay={idx * 0.07}>
                    <div className="card-lift sheen group relative rounded-3xl border border-foreground/10 bg-card p-6 sm:p-7 flex flex-col justify-between h-full shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-500 overflow-hidden text-foreground">
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div>
                        {/* 1. Title on Top */}
                        <div className="mb-4">
                          <span className="text-[9px] font-black uppercase tracking-[0.25em] text-accent block mb-2">
                            {job.dept}
                          </span>
                          <h3 className="font-display font-extrabold text-xl sm:text-2xl text-foreground leading-tight tracking-tight min-h-[3rem] flex items-center group-hover:text-accent transition-colors">
                            {job.title}
                          </h3>
                        </div>

                        {/* 2. Banner Graphic in Center */}
                        <div className="relative h-44 sm:h-48 w-full rounded-2xl bg-slate-50 border border-foreground/8 flex items-center justify-center p-2 mb-6 overflow-hidden shadow-inner group-hover:scale-[1.02] transition-transform duration-500">
                          <img
                            src={job.image}
                            alt={`${job.title} banner`}
                            loading="lazy"
                            className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className="absolute top-3 right-3 text-[8.5px] font-bold uppercase tracking-wider text-foreground/70 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-foreground/20 shadow-sm">
                            {job.type}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed font-medium mb-6">
                          {job.summary}
                        </p>
                      </div>

                      {/* 3. Black Read More / Apply Now Button at Bottom */}
                      <button
                        onClick={() => handleApplyRole(job)}
                        className="btn-magnetic w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-primary text-primary-foreground font-bold text-[10.5px] uppercase tracking-[0.22em] hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-md"
                      >
                        Read More <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ══ 03. INTERNSHIP PROGRAM SPOTLIGHT ══ */}
        <section id="internships" className="relative px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-28 lg:py-36 max-w-7xl mx-auto">
          {/* Header */}
          <Reveal className="mb-14">
            <span className="eyebrow text-accent">03 — Internship Program</span>
            <div className="flex items-center gap-3 mt-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent font-extrabold text-[10px] uppercase tracking-[0.25em]">
                Don&rsquo;t Miss Out!
              </span>
            </div>
            <h2 className="font-display font-extrabold text-foreground leading-[0.9] text-[2.1rem] sm:text-[3rem] md:text-[4.5rem] tracking-tight mb-6">
              Welcome to <span className="italic font-light text-accent">Tech Hub Internships.</span>
            </h2>
            <p className="text-foreground/75 text-base sm:text-lg leading-relaxed max-w-3xl">
              We are excited to offer internship opportunities to talented and motivated individuals who are passionate about technology and committed to diversity and inclusion in the tech industry.
            </p>
          </Reveal>

          {/* Available Internships Grid */}
          <div className="mb-16">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground tracking-tight mb-8">
              Available Internships
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Event Planning Intern",
                  desc: "Assist with planning and execution of Tech Hub Africa events, including conferences, workshops, and networking sessions.",
                },
                {
                  title: "Marketing Intern",
                  desc: "Help develop and implement marketing campaigns to promote Tech Hub Africa's programs and initiatives.",
                },
                {
                  title: "Research Intern",
                  desc: "Conduct research on diversity and inclusion in the tech industry and assist with data analysis and reporting.",
                },
                {
                  title: "Operations Intern",
                  desc: "Support the day-to-day operations of Tech Hub Africa, including administrative tasks and project management.",
                },
              ].map((intern, idx) => (
                <Reveal key={intern.title} delay={idx * 0.08}>
                  <div className="card-lift sheen group relative rounded-3xl border border-foreground/10 bg-card p-6 sm:p-7 flex flex-col justify-between h-full shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-500 overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-[0.25em] text-accent block mb-2">Role 0{idx + 1}</span>
                      <h4 className="font-display font-extrabold text-xl text-foreground mb-3 group-hover:text-accent transition-colors">
                        {intern.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed font-medium">
                        {intern.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Benefits & Eligibility Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Benefits */}
            <Reveal delay={0.05}>
              <div className="card-lift sheen rounded-3xl border border-foreground/10 bg-card p-8 sm:p-10 flex flex-col justify-between h-full shadow-sm">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-accent/15 border border-accent/30 text-accent flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-2xl text-foreground tracking-tight">
                      Internship <span className="italic font-light text-accent">Benefits</span>
                    </h3>
                  </div>
                  <ul className="space-y-3.5">
                    {[
                      "Gain hands-on experience in the tech industry",
                      "Develop valuable skills and knowledge in event planning, marketing, research, and operations",
                      "Network with professionals in the tech industry",
                      "Contribute to diversity and inclusion initiatives in the tech industry",
                      "Flexible working hours and remote work options available",
                    ].map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground/75 leading-relaxed font-medium">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Eligibility */}
            <Reveal delay={0.12}>
              <div className="card-lift sheen rounded-3xl border border-foreground/10 bg-card p-8 sm:p-10 flex flex-col justify-between h-full shadow-sm">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-accent/15 border border-accent/30 text-accent flex items-center justify-center">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-extrabold text-2xl text-foreground tracking-tight">
                      Eligibility <span className="italic font-light text-accent">Criteria</span>
                    </h3>
                  </div>
                  <ul className="space-y-3.5">
                    {[
                      "Currently enrolled in a degree-granting program (undergraduate or graduate)",
                      "Available to intern for at least 3 months",
                      "Strong communication and teamwork skills",
                      "Passionate about technology and diversity and inclusion in the tech industry",
                    ].map((e, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground/75 leading-relaxed font-medium">
                        <span className="w-2 h-2 rounded-full bg-accent shrink-0 mt-2" />
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Application Form */}
          <Reveal className="mb-20">
            <div className="rounded-3xl border border-foreground/10 bg-card p-8 sm:p-12 shadow-xl max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-primary to-accent" />
              
              <div className="text-center mb-10">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent block mb-2">How to Apply</span>
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight mb-3">
                  Apply For <span className="italic font-light text-accent">Internship.</span>
                </h3>
                <p className="text-sm text-foreground/70 max-w-xl mx-auto leading-relaxed">
                  Send your resume and cover letter by filling the form below. Specify the internship position you are applying for.
                </p>
              </div>

              {internSubmitted ? (
                <div className="text-center py-12 rounded-2xl bg-primary/30 border border-foreground/20 p-8">
                  <div className="w-16 h-16 rounded-full bg-primary/55 text-foreground flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-extrabold text-2xl text-foreground mb-2">Application Submitted!</h4>
                  <p className="text-sm text-foreground/75 max-w-md mx-auto">
                    Thank you for applying. Our talent team will review your resume and contact you at the provided email address.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInternFormSubmit} className="space-y-6">
                  {/* Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-[10.5px] font-bold uppercase tracking-wider text-foreground/70 mb-2">
                        First Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="John"
                        className="w-full px-4 py-3.5 rounded-2xl border border-foreground/15 bg-background text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10.5px] font-bold uppercase tracking-wider text-foreground/70 mb-2">
                        Middle Name
                      </label>
                      <input
                        type="text"
                        placeholder="(Optional)"
                        className="w-full px-4 py-3.5 rounded-2xl border border-foreground/15 bg-background text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10.5px] font-bold uppercase tracking-wider text-foreground/70 mb-2">
                        Last Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Doe"
                        className="w-full px-4 py-3.5 rounded-2xl border border-foreground/15 bg-background text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                  </div>

                  {/* Contact Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10.5px] font-bold uppercase tracking-wider text-foreground/70 mb-2">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="john@example.com"
                        className="w-full px-4 py-3.5 rounded-2xl border border-foreground/15 bg-background text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10.5px] font-bold uppercase tracking-wider text-foreground/70 mb-2">
                        Phone *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+233 xx xxx xxxx"
                        className="w-full px-4 py-3.5 rounded-2xl border border-foreground/15 bg-background text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                  </div>

                  {/* Internship Position Select */}
                  <div>
                    <label className="block text-[10.5px] font-bold uppercase tracking-wider text-foreground/70 mb-2">
                      Internship position you are applying for? *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3.5 rounded-2xl border border-foreground/15 bg-background text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
                    >
                      <option value="">-- Select Position --</option>
                      <option value="Event Planning Intern">Event Planning Intern</option>
                      <option value="Marketing Intern">Marketing Intern</option>
                      <option value="Research Intern">Research Intern</option>
                      <option value="Operations Intern">Operations Intern</option>
                    </select>
                  </div>

                  {/* File Upload Dropzone */}
                  <div>
                    <label className="block text-[10.5px] font-bold uppercase tracking-wider text-foreground/70 mb-2">
                      Upload Resume and Cover letter *
                    </label>
                    <div className="relative border-2 border-dashed border-foreground/20 hover:border-accent/60 rounded-2xl p-6 text-center bg-background/50 transition-colors cursor-pointer group">
                      <input
                        required
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setSelectedFileName(e.target.files?.[0]?.name || "")}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-xs font-semibold text-foreground/70 group-hover:text-accent mb-1 transition-colors">
                          {selectedFileName ? selectedFileName : "No file chosen"}
                        </span>
                        <span className="text-xs text-accent font-bold uppercase tracking-wider">
                          Drag and Drop (or) Choose Files
                        </span>
                        <span className="text-[10px] text-foreground/40 mt-1">PDF, DOC, DOCX up to 10MB</span>
                      </div>
                    </div>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      required
                      type="checkbox"
                      id="consent"
                      className="mt-1 w-4 h-4 accent-accent rounded border-foreground/20 cursor-pointer"
                    />
                    <label htmlFor="consent" className="text-xs text-foreground/75 leading-snug cursor-pointer select-none">
                      Consent * <br />
                      <span className="font-semibold text-foreground">Yes, I agree with the privacy policy and terms and conditions.</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn-magnetic w-full py-4 rounded-full bg-primary text-primary-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-xl"
                  >
                    Submit Now
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Frequently Asked Questions */}
          <div className="max-w-4xl mx-auto">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground tracking-tight mb-8 text-center">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {[
                {
                  num: "01",
                  q: "What kind of internships are available at Tech Hub Africa?",
                  a: "We offer internships in event planning, marketing, research, and operations.",
                },
                {
                  num: "02",
                  q: "How do I apply for an internship at Tech Hub Africa?",
                  a: "Please send your resume and cover letter to info@techhubafrica.org or fill out the application form above.",
                },
                {
                  num: "03",
                  q: "What is the duration of the internship?",
                  a: "Our internships typically last for 3-6 months.",
                },
              ].map((faq) => (
                <Reveal key={faq.num}>
                  <div className="card-lift sheen p-6 sm:p-8 rounded-3xl border border-foreground/10 bg-card flex flex-col sm:flex-row items-start gap-6 shadow-sm">
                    <span className="font-display font-black text-3xl text-accent/40 leading-none shrink-0">{faq.num}</span>
                    <div>
                      <h4 className="font-display font-extrabold text-lg sm:text-xl text-foreground mb-2">
                        {faq.q}
                      </h4>
                      <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed font-medium">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ 04. MENTORSHIP PROGRAM SPOTLIGHT ══ */}
        <section id="mentorship" className="relative bg-secondary text-primary-foreground px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-28 lg:py-36 overflow-hidden">
          <div className="noise-bg" />
          <div className="relative max-w-7xl mx-auto">
            <Reveal className="mb-14">
              <span className="eyebrow text-accent">04 — Mentorship Program</span>
              <h2 className="font-display font-extrabold text-3.5xl sm:text-5xl md:text-6xl tracking-tight leading-[0.92] mt-4 mb-6">
                Mentorship Program <span className="italic font-light text-accent">Overview.</span>
              </h2>
              <p className="text-primary-foreground/80 max-w-3xl text-base md:text-lg leading-relaxed">
                At Tech Hub Africa, we believe that mentorship is a powerful tool for growth, development, and success. Our mentorship program is designed to connect emerging leaders and innovators with experienced professionals and industry experts who can provide guidance, support, and valuable insights.
              </p>
            </Reveal>

            {/* Objectives & Mentee Benefits Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Program Objectives */}
              <Reveal delay={0.05}>
                <div className="card-lift sheen rounded-3xl border border-primary-foreground/15 bg-primary/80 backdrop-blur-md p-8 sm:p-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
                        <BookOpen className="w-5.5 h-5.5" />
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">Goals</span>
                    </div>
                    <h3 className="font-display font-extrabold text-primary-foreground text-2xl md:text-3xl tracking-tight mb-6">
                      Program <span className="italic font-light text-accent">Objectives.</span>
                    </h3>
                    <ul className="space-y-4 mb-6">
                      {[
                        "Provide a platform for knowledge sharing, skills development, and networking.",
                        "Foster meaningful relationships between mentors and mentees.",
                        "Support the growth and development of emerging leaders and innovators in Africa's tech ecosystem.",
                      ].map((obj, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-primary-foreground/80 leading-relaxed">
                          <span className="w-2 h-2 rounded-full bg-accent shrink-0 mt-2" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>

              {/* Benefits for Mentees */}
              <Reveal delay={0.15}>
                <div className="card-lift sheen rounded-3xl border border-primary-foreground/15 bg-primary/80 backdrop-blur-md p-8 sm:p-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
                        <Award className="w-5.5 h-5.5" />
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">Growth</span>
                    </div>
                    <h3 className="font-display font-extrabold text-primary-foreground text-2xl md:text-3xl tracking-tight mb-6">
                      Benefits for <span className="italic font-light text-accent">Mentees.</span>
                    </h3>
                    <ul className="space-y-4 mb-6">
                      {[
                        "Gain valuable insights and guidance from experienced professionals and industry experts.",
                        "Develop new skills and knowledge in specific areas of interest.",
                        "Expand your professional network and connections.",
                        "Enhance your confidence, creativity, and problem-solving skills.",
                      ].map((ben, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-primary-foreground/80 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <span>{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Let's Grow Together Callout Box & Action Buttons */}
            <Reveal delay={0.2}>
              <div className="rounded-3xl border border-accent/30 bg-primary/95 p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-primary-foreground tracking-tight mb-4">
                  Let&rsquo;s Grow <span className="italic font-light text-accent">Together!</span>
                </h3>
                <p className="text-primary-foreground/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-8">
                  At Tech Hub Africa, we&rsquo;re committed to empowering the next generation of African tech leaders and innovators. Join our mentorship program today and take the first step towards achieving your goals!
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <button
                    onClick={() => handleOpenMentorship("Mentee")}
                    className="btn-magnetic py-4 px-8 rounded-full bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.22em] hover:bg-primary-foreground hover:text-foreground transition-all duration-300 shadow-xl"
                    style={{ boxShadow: "0 10px 24px -10px hsl(28 92% 44% / 0.6)" }}
                  >
                    Join Our Mentorship Program
                  </button>
                  <button
                    onClick={() => handleOpenMentorship("Mentor")}
                    className="btn-magnetic py-4 px-8 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground font-bold text-[11px] uppercase tracking-[0.22em] hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300"
                  >
                    Become a Mentor
                  </button>
                </div>

                {/* How to Apply / Email Direct Link */}
                <div className="pt-6 border-t border-primary-foreground/12 max-w-2xl mx-auto text-left sm:text-center">
                  <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">How to Apply</p>
                  <p className="text-xs sm:text-sm text-primary-foreground/75 leading-relaxed">
                    If you&rsquo;re interested in joining our mentorship program, please submit your request and areas of interest to:{" "}
                    <a
                      href="mailto:info@techhubafrica.org"
                      className="font-bold text-accent hover:underline inline-flex items-center gap-1"
                    >
                      info@techhubafrica.org <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    . Our team will review your application and match you with a suitable mentor.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Role Application Modal */}
      {applyModalOpen && selectedRole && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/88" style={{ backdropFilter: "blur(12px)" }} onClick={() => setApplyModalOpen(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl" style={{ animation: "scale-in-modal 0.35s cubic-bezier(0.16,1,0.3,1) forwards" }}>
            <div className="bg-primary px-8 pt-8 pb-6 border-b border-primary-foreground/10 relative text-primary-foreground">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              <button onClick={() => setApplyModalOpen(false)} className="absolute top-5 right-5 w-8 h-8 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/50 hover:text-primary-foreground transition-all"><X className="w-3.5 h-3.5" /></button>
              <p className="text-[9px] font-black uppercase tracking-[0.35em] text-accent mb-2">Role Application</p>
              <h3 className="font-display font-extrabold text-primary-foreground text-2xl leading-tight">{selectedRole.title}</h3>
              <p className="text-xs text-primary-foreground/60 mt-1">{selectedRole.dept} · {selectedRole.location}</p>
            </div>
            <div className="bg-background px-8 py-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-4 text-accent"><CheckCircle2 className="w-7 h-7" /></div>
                  <h4 className="font-display font-extrabold text-xl text-foreground">Application Received!</h4>
                  <p className="mt-2 text-sm text-foreground/55">Thank you for applying. Our talent acquisition team will review your application and respond within 5 business days.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  {["Full Name", "Email Address", "LinkedIn / Portfolio URL"].map((label) => (
                    <div key={label}>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground/60 mb-1.5">{label}</label>
                      <input required type={label.includes("Email") ? "email" : label.includes("URL") ? "url" : "text"} className="w-full px-4 py-3 rounded-xl border border-foreground/12 bg-secondary/60 text-sm text-foreground focus:outline-none focus:border-accent/60 transition-colors duration-200" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground/60 mb-1.5">Brief Cover Letter / Introduction</label>
                    <textarea required rows={3} placeholder="Tell us briefly why you're interested in this role..." className="w-full px-4 py-3 rounded-xl border border-foreground/12 bg-secondary/60 text-sm text-foreground focus:outline-none focus:border-accent/60 resize-none transition-colors duration-200" />
                  </div>
                  <button type="submit" className="btn-magnetic w-full py-4 rounded-full bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-all duration-250">Submit Application</button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mentorship Registration Modal */}
      {mentorshipModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/88" style={{ backdropFilter: "blur(12px)" }} onClick={() => setMentorshipModalOpen(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl" style={{ animation: "scale-in-modal 0.35s cubic-bezier(0.16,1,0.3,1) forwards" }}>
            <div className="bg-primary px-8 pt-8 pb-6 border-b border-primary-foreground/10 relative text-primary-foreground">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              <button onClick={() => setMentorshipModalOpen(false)} className="absolute top-5 right-5 w-8 h-8 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/50 hover:text-primary-foreground transition-all"><X className="w-3.5 h-3.5" /></button>
              <p className="text-[9px] font-black uppercase tracking-[0.35em] text-accent mb-2">Mentorship Program</p>
              <h3 className="font-display font-extrabold text-primary-foreground text-2xl leading-tight">Register as a {mentorshipRole}</h3>
            </div>
            <div className="bg-background px-8 py-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-4 text-accent"><CheckCircle2 className="w-7 h-7" /></div>
                  <h4 className="font-display font-extrabold text-xl text-foreground">Registration Submitted!</h4>
                  <p className="mt-2 text-sm text-foreground/55">We'll match you with our 2026 mentorship cohort within 2 weeks.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  {["Full Name", "Email Address", "Area of Expertise / Focus"].map((label) => (
                    <div key={label}>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-foreground/60 mb-1.5">{label}</label>
                      <input required type={label.includes("Email") ? "email" : "text"} className="w-full px-4 py-3 rounded-xl border border-foreground/12 bg-secondary/60 text-sm text-foreground focus:outline-none focus:border-accent/60 transition-colors duration-200" />
                    </div>
                  ))}
                  <button type="submit" className="btn-magnetic w-full py-4 rounded-full bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-all duration-250">Submit Registration</button>
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
