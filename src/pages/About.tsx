import { Compass, Target, ShieldCheck, Heart, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { heroBackdrops } from "@/assets/ktu";
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
  { year: "2020", title: "Founded in Accra", desc: "Tech Hub Africa LLC established to bridge the continent's innovation gap." },
  { year: "2021", title: "First Tech Guru Meetup", desc: "500+ attendees at inaugural tech gathering — a movement begins." },
  { year: "2022", title: "Tech4All Campus Tour Launched", desc: "We took the classroom to the campus — 8 universities, 3,000 students trained." },
  { year: "2023", title: "Threat Lock Platform", desc: "Built our AI-powered cybersecurity platform protecting African digital infrastructure." },
  { year: "2024", title: "Expanded to 10+ Countries", desc: "Operations spanning West Africa, East Africa, and diaspora communities." },
  { year: "2026", title: "12,000 Developers & Counting", desc: "Our community continues to grow — one builder at a time." },
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
    <PageHero
      tag="About Tech Hub Africa"
      title={<>Building Africa's <span className="italic font-light text-accent">next generation</span><br />of technologists.</>}
      body="We connect innovators, empower talent, and showcase the continent's excellence in technology, science, and engineering — from Accra to the world."
      ghost="AFRICA"
      image={heroBackdrops.about}
      imageAlt="Tech Hub Africa community gathered at a campus event in Ghana"
      stats={[
        { val: "2020", label: "Year Founded" },
        { val: "12k+", label: "Developers Trained" },
        { val: "25+", label: "Campuses Reached" },
        { val: "10+", label: "Countries Active" },
      ]}
    />

    <Marquee text="Connecting Innovators · Fostering Talent · Showcasing Excellence" />

    <main className="page-entry bg-background overflow-hidden">

      {/* ══ VISION & MISSION ══ */}
      <section className="relative py-16 sm:py-12 sm:py-16 md:py-20 lg:py-28 lg:py-36 px-5 sm:px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="hidden md:block absolute -top-24 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_55%/0.35),transparent_70%)]" />
        
        <Reveal className="mb-16">
          <div className="flex items-baseline gap-6">
            <span className="eyebrow text-accent">01 — Foundations</span>
            <div className="flex-1 divider-elegant" />
            <span className="eyebrow text-primary/40 hidden md:inline">The North Star</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <Reveal className="lg:col-span-5" delay={0.05}>
            <div className="card-lift sheen noise-soft relative rounded-3xl overflow-hidden bg-primary p-10 md:p-14 h-full border border-primary-foreground/10 text-primary-foreground flex flex-col justify-between">
              <div className="noise-bg" />
              <div className="hidden md:block absolute top-0 right-0 w-[280px] h-[220px] rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ background: "radial-gradient(circle, hsl(28 92% 55% / 0.5), transparent)" }} />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              <div className="relative z-10">
                <span className="text-[10px] font-black uppercase tracking-[0.35em] text-accent mb-6 block">Our Vision</span>
                <h3 className="font-display font-extrabold text-primary-foreground text-3.5xl md:text-4.5xl tracking-tight leading-[0.92] mb-6">
                  Africa as a global tech<br /><span className="italic font-light text-accent">leader.</span>
                </h3>
                <p className="text-primary-foreground/70 text-sm md:text-base leading-relaxed">
                  A future where Africa is recognized as a global leader in technology, science, and engineering — where innovation thrives, talent is nurtured, and the continent's contributions lead to an inclusive, sustainable digital age for all Africans.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.15}>
            <div className="card-lift sheen relative rounded-3xl border border-primary/10 bg-secondary/30 p-10 md:p-14 h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.35em] text-accent mb-6 block">Our Mission</span>
                <h3 className="font-display font-extrabold text-primary text-3.5xl md:text-4.5xl tracking-tight leading-[0.92] mb-6">
                  Empowering Africa's<br /><span className="italic font-light text-accent">tech ecosystem.</span>
                </h3>
                <p className="text-primary/70 text-sm md:text-base leading-relaxed mb-8">
                  Connecting innovators, fostering talent, and showcasing excellence in technology, science, and engineering — to promote a vibrant and inclusive digital future for the continent.
                </p>
              </div>
              <a href="/services" className="group inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.25em] text-accent hover:text-primary transition-colors">
                Explore What We Build <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ TIMELINE ══ */}
      <section className="relative bg-secondary text-primary-foreground overflow-hidden px-5 sm:px-6 lg:px-10 py-16 sm:py-12 sm:py-16 md:py-20 lg:py-28 lg:py-36 cv-auto">
        <div className="hidden md:block absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 pointer-events-none bg-[radial-gradient(circle,hsl(155_61%_35%),transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto">
          <Reveal className="mb-16">
            <div className="flex items-baseline gap-6 mb-6">
              <span className="eyebrow text-accent">02 — Our Journey</span>
              <div className="flex-1 divider-elegant-light" />
            </div>
            <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight leading-[0.9]">
              Built over<br /><span className="italic font-light text-accent">six years.</span>
            </h2>
          </Reveal>

          <div className="relative">
            <div className="absolute left-[calc(3.5rem+1px)] top-0 bottom-0 w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent hidden md:block" />
            <div className="space-y-0">
              {milestones.map((m, i) => (
                <Reveal key={m.year} delay={i * 0.06}>
                  <div className="relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 group">
                    <div className="md:col-span-2 flex items-start gap-4 md:flex-col md:gap-2 pt-8 md:pt-0">
                      <div className="relative flex items-center justify-center md:mt-8">
                        <div className="relative z-10 w-7 h-7 rounded-full border-2 border-accent/50 bg-primary flex items-center justify-center group-hover:border-accent transition-colors duration-300">
                          <div className="w-2 h-2 rounded-full bg-accent group-hover:scale-125 transition-transform duration-300" />
                        </div>
                      </div>
                      <span className="font-display font-black text-3xl text-primary-foreground/20 group-hover:text-accent transition-colors duration-300">{m.year}</span>
                    </div>
                    <div className="md:col-span-10 pb-10 md:pb-14 border-b border-primary-foreground/10 last:border-0">
                      <div className="md:pt-6 md:pl-6">
                        <h4 className="font-display font-extrabold text-primary-foreground text-xl md:text-2xl mb-2 group-hover:text-accent transition-colors">{m.title}</h4>
                        <p className="text-primary-foreground/65 text-sm leading-relaxed max-w-lg">{m.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CORE VALUES ══ */}
      <section className="relative px-5 sm:px-6 lg:px-10 py-16 sm:py-12 sm:py-16 md:py-20 lg:py-28 lg:py-36 max-w-7xl mx-auto cv-auto">
        <div className="hidden md:block absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_44%/0.3),transparent_70%)]" />
        
        <Reveal className="mb-16">
          <div className="flex items-baseline gap-6 mb-6">
            <span className="eyebrow text-accent">03 — What Drives Us</span>
            <div className="flex-1 divider-elegant" />
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight leading-[0.92] text-primary">
            Our Core<br /><span className="italic font-light text-accent">Values.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="card-lift sheen group relative rounded-2xl border border-primary/10 bg-background p-8 md:p-10 overflow-hidden">
                <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 w-[200px] h-[150px] rounded-full blur-2xl pointer-events-none"
                  style={{ background: "radial-gradient(circle, hsl(28 92% 44% / 0.12), transparent)" }} />
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
                    <v.icon className="w-5 h-5" />
                  </div>
                  <span className="font-display font-black text-5xl leading-none select-none text-primary/10">{v.num}</span>
                </div>
                <h3 className="font-display font-extrabold text-primary text-xl mb-3 group-hover:text-accent transition-colors">{v.title}</h3>
                <p className="text-primary/65 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ TEAM ══ */}
      <MeetTheTeam />
    </main>
    <Footer />
  </>
);

export default About;
