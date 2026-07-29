import { Compass, Target, ShieldCheck, Heart, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import MeetTheTeam from "@/components/MeetTheTeam";

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

const About = () => (
  <>
    <Header />
    <PageHero
      tag="About Tech Hub Africa"
      title={<>Building Africa's <span className="italic font-light text-accent">next generation</span><br />of technologists.</>}
      body="We connect innovators, empower talent, and showcase the continent's excellence in technology, science, and engineering — from Accra to the world."
      ghost="AFRICA"
      stats={[
        { val: "2020", label: "Year Founded" },
        { val: "12k+", label: "Developers Trained" },
        { val: "25+", label: "Campuses Reached" },
        { val: "10+", label: "Countries Active" },
      ]}
    />

    <main className="bg-background">

      {/* ══ VISION & MISSION ══ */}
      <section className="px-6 py-24 md:py-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-5 relative rounded-3xl overflow-hidden bg-primary p-10 md:p-14">
          <div className="absolute inset-0 opacity-[0.055]" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")" }} />
          <div className="absolute top-0 right-0 w-[300px] h-[250px] rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(circle, hsl(28 92% 55% / 0.5), transparent)" }} />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <div className="relative z-10">
            <span className="text-[9px] font-black uppercase tracking-[0.35em] text-accent mb-6 block">Our Vision</span>
            <h3 className="font-display font-extrabold text-primary-foreground text-3xl md:text-4xl tracking-tight leading-[0.92] mb-6">
              Africa as a global tech<br /><span className="italic font-light text-accent">leader.</span>
            </h3>
            <p className="text-primary-foreground/55 text-sm md:text-base leading-relaxed">
              A future where Africa is recognized as a global leader in technology, science, and engineering — where innovation thrives, talent is nurtured, and the continent's contributions lead to an inclusive, sustainable digital age for all Africans.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 rounded-3xl border border-primary/10 bg-secondary/30 p-10 md:p-14">
          <span className="text-[9px] font-black uppercase tracking-[0.35em] text-accent mb-6 block">Our Mission</span>
          <h3 className="font-display font-extrabold text-primary text-3xl md:text-4xl tracking-tight leading-[0.92] mb-6">
            Empowering Africa's<br /><span className="italic font-light text-accent">tech ecosystem.</span>
          </h3>
          <p className="text-primary/60 text-sm md:text-base leading-relaxed mb-8">
            Connecting innovators, fostering talent, and showcasing excellence in technology, science, and engineering — to promote a vibrant and inclusive digital future for the continent.
          </p>
          <a href="/services" className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.25em] text-accent hover:gap-5 transition-all duration-300">
            Explore What We Build <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ══ TIMELINE ══ */}
      <section className="relative bg-primary overflow-hidden px-6 py-24 md:py-32">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")" }} />
        <div className="absolute -top-40 right-0 w-[600px] h-[500px] rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(circle, hsl(28 92% 55% / 0.5), transparent)" }} />
        <div className="relative max-w-7xl mx-auto text-primary-foreground">
          <div className="mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Our Journey</span>
            <h2 className="font-display font-black text-4xl md:text-6xl tracking-tight leading-[0.9] mt-3">
              Built over<br /><span className="italic font-light">six years.</span>
            </h2>
          </div>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[calc(3.5rem+1px)] top-0 bottom-0 w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent hidden md:block" />

            <div className="space-y-0">
              {milestones.map((m, i) => (
                <div key={m.year} className="relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 group">
                  {/* Year + node */}
                  <div className="md:col-span-2 flex items-start gap-4 md:flex-col md:gap-2 pt-8 md:pt-0">
                    <div className="relative flex items-center justify-center md:mt-8">
                      <div className="relative z-10 w-7 h-7 rounded-full border-2 border-accent/50 bg-primary flex items-center justify-center group-hover:border-accent transition-colors">
                        <div className="w-2 h-2 rounded-full bg-accent group-hover:scale-125 transition-transform" />
                      </div>
                    </div>
                    <span className="font-display font-black text-3xl text-primary-foreground/15 group-hover:text-accent/30 transition-colors">{m.year}</span>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-10 pb-10 md:pb-14 border-b border-primary-foreground/8 last:border-0">
                    <div className="md:pt-6 md:pl-6">
                      <h4 className="font-display font-extrabold text-primary-foreground text-xl md:text-2xl mb-2">{m.title}</h4>
                      <p className="text-primary-foreground/50 text-sm leading-relaxed max-w-lg">{m.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CORE VALUES ══ */}
      <section className="px-6 py-24 md:py-32 max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">What Drives Us</span>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight leading-[0.92] mt-3 text-primary">
            Our Core<br /><span className="italic font-light text-accent">Values.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v) => (
            <div key={v.title} className="group relative rounded-2xl border border-primary/8 bg-secondary/30 p-8 md:p-10 hover:border-primary/20 transition-all duration-400 overflow-hidden">
              <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 w-[200px] h-[150px] rounded-full blur-2xl" style={{ background: "radial-gradient(circle, hsl(28 92% 44% / 0.08), transparent)" }} />
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-accent/8 border border-accent/15 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                  <v.icon className="w-5.5 h-5.5" />
                </div>
                <span className="font-display font-black text-5xl leading-none select-none text-primary/6">{v.num}</span>
              </div>
              <h3 className="font-display font-extrabold text-primary text-xl mb-3">{v.title}</h3>
              <p className="text-primary/55 text-sm leading-relaxed">{v.desc}</p>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
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
