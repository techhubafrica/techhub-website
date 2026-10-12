import { Compass, Target, ShieldCheck, Heart, ArrowUpRight, Flag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MeetTheTeam from "@/components/MeetTheTeam";
import { useReveal } from "@/hooks/use-reveal";
import Marquee from "@/components/Marquee";

const values = [
  { num: "01", icon: Compass, title: "Excellence First", desc: "We hold African engineering and product delivery to international standards — no shortcuts, no excuses." },
  { num: "02", icon: Target, title: "Inclusion & Accessibility", desc: "Empowering talent across every region, university, and community — not just capital cities." },
  { num: "03", icon: ShieldCheck, title: "Security & Integrity", desc: "Safeguarding digital assets and building high-trust partnerships across every engagement." },
  { num: "04", icon: Heart, title: "Community Driven", desc: "Built by builders, for builders — lifelong mentorship, collaboration, and shared growth." },
];

const milestones = [
  { year: "2024", title: "Founded in USA & Ghana", desc: "Tech Hub Africa LLC established in the United States of America and Ghana, West Africa — bridging the continent's innovation gap." },
  { year: "2026", title: "Expanding Ecosystem", desc: "Our community continues to grow across software engineering, cybersecurity, and startup acceleration." },
];

const shortTermGoals = [
  "Establish a strong online presence through social media and a website, with a minimum of 10,000 followers and 1,000 website visitors per month.",
  "Host at least 4 successful events, including conferences, workshops, and trade fairs, with a minimum of 200 attendees per event.",
  "Build a network of at least 20 partner organizations and companies in the tech industry.",
  "Offer career services to at least 50 professionals in the tech industry.",
  "Secure at least $200,000 in sponsorships and funding for events and programs.",
];

const mediumTermGoals = [
  "Expand our reach to at least 10 African countries, with a minimum of 1 event per country.",
  "Establish a mentorship program with at least 20 experienced mentors and 50 mentees.",
  "Develop and launch at least 2 online events on tech-related topics, with a minimum of 50 enrollments per webinar.",
  "Build a community of at least 100 innovators, entrepreneurs, and professionals in the tech industry.",
  "Secure at least $500,000 in funding for programs and events.",
];

const longTermGoals = [
  "Establish Tech Hub Africa as a leading brand in the African tech industry, with a strong reputation for innovation and excellence.",
  "Create a sustainable business model that generates at least $1 million in revenue per year.",
  "Expand our programs to include entrepreneurship support, incubation, and acceleration.",
  "Build a network of at least 100 partner organizations and companies in the tech industry.",
  "Contribute to the growth and development of the African tech industry, with a focus on inclusivity, diversity, and impact.",
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

const About = () => (
  <>
    <Header />
    <main className="page-entry bg-background overflow-hidden pt-16 sm:pt-20">
      {/* ══ TEAM (As Top Hero Section) ══ */}
      <MeetTheTeam />

      <Marquee text="Connecting Innovators · Fostering Talent · Showcasing Excellence" />
      {/* ══ VISION & MISSION ══ */}
      <section className="relative py-16 sm:py-20 md:py-28 lg:py-32 px-5 sm:px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="hidden md:block absolute -top-24 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_55%/0.35),transparent_70%)]" />
        
        <Reveal className="mb-14">
          <div className="flex items-baseline gap-6">
            <span className="eyebrow text-accent">01 — Foundations</span>
            <div className="flex-1 divider-elegant" />
            <span className="eyebrow text-foreground/40 hidden md:inline">The North Star</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Vision */}
          <Reveal className="lg:col-span-6" delay={0.05}>
            <div className="card-lift sheen noise-soft relative rounded-3xl overflow-hidden bg-primary p-8 sm:p-12 h-full border border-primary-foreground/10 text-primary-foreground flex flex-col justify-between">
              <div className="noise-bg" />
              <div className="hidden md:block absolute top-0 right-0 w-[280px] h-[220px] rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ background: "radial-gradient(circle, hsl(28 92% 55% / 0.5), transparent)" }} />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              <div className="relative z-10">
                <span className="text-[10px] font-black uppercase tracking-[0.35em] text-accent mb-4 block">Our Vision</span>
                <h3 className="font-display font-extrabold text-primary-foreground text-3xl sm:text-4xl tracking-tight leading-[0.92] mb-6">
                  Africa as a global <span className="italic font-light text-accent">tech leader.</span>
                </h3>
                <p className="text-primary-foreground/80 text-sm sm:text-base leading-relaxed">
                  To create a future where Africa is recognized as a global leader in technology, science, and engineering, where innovation thrives, and talent is nurtured, and where the continent&rsquo;s contributions are celebrated and valued, leading to a more inclusive, sustainable, and prosperous digital age for all Africans.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Mission */}
          <Reveal className="lg:col-span-6" delay={0.15}>
            <div className="card-lift sheen relative rounded-3xl border border-foreground/10 bg-secondary/30 p-8 sm:p-12 h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.35em] text-accent mb-4 block">Our Mission</span>
                <h3 className="font-display font-extrabold text-foreground text-3xl sm:text-4xl tracking-tight leading-[0.92] mb-6">
                  Empowering Africa&rsquo;s <span className="italic font-light text-accent">tech ecosystem.</span>
                </h3>
                <p className="text-foreground/75 text-sm sm:text-base leading-relaxed mb-8">
                  Empowering Africa&rsquo;s tech ecosystem by connecting innovators, fostering talent, and showcasing excellence in technology, science, and engineering, to promote a vibrant and inclusive digital future for the continent.
                </p>
              </div>
              <a href="/services" className="group inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.25em] text-accent hover:text-foreground transition-colors">
                Explore What We Build <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ OUR GOALS (Short-term, Medium-term, Long-term) ══ */}
      <section className="relative bg-secondary text-primary-foreground px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-28 lg:py-32 overflow-hidden">
        <div className="noise-bg" />
        <div className="hidden md:block absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-15 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_55%/0.35),transparent_70%)]" />

        <div className="relative max-w-7xl mx-auto">
          <Reveal className="mb-14">
            <div className="flex items-baseline gap-6 mb-6">
              <span className="eyebrow text-accent">02 — Roadmap &amp; Milestones</span>
              <div className="flex-1 divider-elegant-light" />
            </div>
            <h2 className="font-display font-extrabold text-3.5xl sm:text-5xl md:text-6xl tracking-tight leading-[0.92]">
              Our <span className="italic font-light text-accent">Strategic Goals.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Short-Term */}
            <Reveal delay={0.05}>
              <div className="card-lift sheen rounded-3xl border border-primary-foreground/15 bg-primary/80 backdrop-blur-md p-8 sm:p-9 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[9px] font-black uppercase tracking-[0.28em] text-accent bg-accent/15 px-3 py-1 rounded-full border border-accent/30">
                      1 – 2 Years
                    </span>
                    <Flag className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-primary-foreground mb-6">
                    Short-Term <span className="italic font-light text-accent">Goals</span>
                  </h3>
                  <ul className="space-y-4">
                    {shortTermGoals.map((g, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-primary-foreground/75 leading-relaxed">
                        <span className="font-bold text-accent shrink-0">0{idx + 1}.</span>
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Medium-Term */}
            <Reveal delay={0.12}>
              <div className="card-lift sheen rounded-3xl border border-primary-foreground/15 bg-primary/80 backdrop-blur-md p-8 sm:p-9 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[9px] font-black uppercase tracking-[0.28em] text-accent bg-accent/15 px-3 py-1 rounded-full border border-accent/30">
                      2 – 5 Years
                    </span>
                    <Flag className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-primary-foreground mb-6">
                    Medium-Term <span className="italic font-light text-accent">Goals</span>
                  </h3>
                  <ul className="space-y-4">
                    {mediumTermGoals.map((g, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-primary-foreground/75 leading-relaxed">
                        <span className="font-bold text-accent shrink-0">0{idx + 1}.</span>
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            {/* Long-Term */}
            <Reveal delay={0.18}>
              <div className="card-lift sheen rounded-3xl border border-primary-foreground/15 bg-primary/80 backdrop-blur-md p-8 sm:p-9 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[9px] font-black uppercase tracking-[0.28em] text-accent bg-accent/15 px-3 py-1 rounded-full border border-accent/30">
                      5+ Years
                    </span>
                    <Flag className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-display font-extrabold text-2xl text-primary-foreground mb-6">
                    Long-Term <span className="italic font-light text-accent">Goals</span>
                  </h3>
                  <ul className="space-y-4">
                    {longTermGoals.map((g, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-primary-foreground/75 leading-relaxed">
                        <span className="font-bold text-accent shrink-0">0{idx + 1}.</span>
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ CORE VALUES (Artistic Bento Grid Layout) ══ */}
      <section className="relative px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-28 lg:py-36 max-w-7xl mx-auto">
        <div className="hidden md:block absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full blur-3xl opacity-15 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_44%/0.35),transparent_70%)]" />
        
        <Reveal className="mb-14">
          <div className="flex items-baseline gap-6 mb-6">
            <span className="eyebrow text-accent">03 — What Drives Us</span>
            <div className="flex-1 divider-elegant" />
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.92] text-foreground">
            Our Core <span className="italic font-light text-accent">Values.</span>
          </h2>
        </Reveal>

        {/* Artistic Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* 01. Excellence First (Span 7) */}
          <Reveal className="lg:col-span-7" delay={0.05}>
            <div className="card-lift sheen group relative rounded-3xl border border-foreground/10 bg-primary text-primary-foreground p-8 sm:p-12 overflow-hidden h-full flex flex-col justify-between shadow-xl">
              <div className="noise-bg" />
              <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-3xl opacity-25 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_55%/0.5),transparent_70%)]" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-accent/15 border border-accent/30 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                    <Compass className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent">
                    Pillar 01 — Uncompromising Standard
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-primary-foreground text-3xl sm:text-4xl tracking-tight mb-4 group-hover:text-accent transition-colors">
                  Excellence First.
                </h3>
                <p className="text-primary-foreground/75 text-base sm:text-lg leading-relaxed max-w-xl font-medium">
                  We hold African engineering, software design, and ecosystem delivery to international standards — no shortcuts, no compromises.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-primary-foreground/10 flex items-center justify-between">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest">Global Engineering Standard</span>
                <span className="font-display font-black text-4xl text-primary-foreground/15">01</span>
              </div>
            </div>
          </Reveal>

          {/* 02. Inclusion & Accessibility (Span 5) */}
          <Reveal className="lg:col-span-5" delay={0.12}>
            <div className="card-lift art-card sheen group relative rounded-3xl p-8 sm:p-10 overflow-hidden h-full flex flex-col justify-between hover:border-accent/40 transition-all duration-500">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-primary/30 border border-foreground/15 text-foreground flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Target className="w-5.5 h-5.5" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.25em] text-foreground/70 bg-primary/30 px-2.5 py-1 rounded-full border border-foreground/15">
                    Pillar 02
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-foreground text-2xl sm:text-3xl tracking-tight mb-3 group-hover:text-accent transition-colors">
                  Inclusion &amp; Access.
                </h3>
                <p className="text-foreground/75 text-sm sm:text-base leading-relaxed font-medium">
                  Empowering talent across every region, university, and community — bridging gender and geographic barriers across West Africa and beyond.
                </p>
              </div>

              <div className="mt-8 pt-4 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">Pan-African Reach</span>
                <span className="font-display font-black text-3xl text-foreground/15">02</span>
              </div>
            </div>
          </Reveal>

          {/* 03. Security & Integrity (Span 5) */}
          <Reveal className="lg:col-span-5" delay={0.18}>
            <div className="card-lift art-card sheen group relative rounded-3xl p-8 sm:p-10 overflow-hidden h-full flex flex-col justify-between hover:border-accent/40 transition-all duration-500">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-5.5 h-5.5" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.25em] text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
                    Pillar 03
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-foreground text-2xl sm:text-3xl tracking-tight mb-3 group-hover:text-accent transition-colors">
                  Security &amp; Integrity.
                </h3>
                <p className="text-foreground/75 text-sm sm:text-base leading-relaxed font-medium">
                  Safeguarding digital infrastructure with Threat Lock WAF defense and maintaining high-trust relationships with partners and enterprises.
                </p>
              </div>

              <div className="mt-8 pt-4 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/50">Enterprise Trust</span>
                <span className="font-display font-black text-3xl text-foreground/15">03</span>
              </div>
            </div>
          </Reveal>

          {/* 04. Community Driven (Span 7) */}
          <Reveal className="lg:col-span-7" delay={0.24}>
            <div className="card-lift sheen group relative rounded-3xl border border-foreground/10 bg-secondary text-primary-foreground p-8 sm:p-12 overflow-hidden h-full flex flex-col justify-between shadow-xl">
              <div className="noise-bg" />
              <div className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full blur-3xl opacity-20 pointer-events-none bg-[radial-gradient(circle,hsl(var(--primary)/0.6),transparent_70%)]" />

              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-accent/15 border border-accent/30 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                    <Heart className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent">
                    Pillar 04 — Ecosystem First
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-primary-foreground text-3xl sm:text-4xl tracking-tight mb-4 group-hover:text-accent transition-colors">
                  Community Driven.
                </h3>
                <p className="text-primary-foreground/75 text-base sm:text-lg leading-relaxed max-w-xl font-medium">
                  Built by builders, for builders — uniting founders, mentors, and developers in lifelong collaboration, mentorship, and shared African growth.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-primary-foreground/10 flex items-center justify-between">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest">Collaborative Ecosystem</span>
                <span className="font-display font-black text-4xl text-primary-foreground/15">04</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default About;
