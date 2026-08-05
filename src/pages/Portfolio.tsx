import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Building2, ShoppingBag, Wheat, ShieldCheck, ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import Marquee from "@/components/Marquee";

const ventures = [
  {
    num: "01",
    name: "GH Accommodation",
    tag: "PropTech & Housing",
    icon: Building2,
    desc: "Your Gateway To Affordable, Reliable, And Convenient Housing Across Ghana.",
    summary: "GH Accommodation uses location-based algorithms and verified landlord listings to connect students, young professionals, and families with transparent housing options across Ghana.",
    link: "https://techhubafrica.org/gh-accommodation",
    color: "hsl(155 61% 30%)",
  },
  {
    num: "02",
    name: "GMO Marketplace",
    tag: "E-Commerce & Retail",
    icon: ShoppingBag,
    desc: "Ghana Mall — Your One-Stop Shop for Everything!",
    summary: "A unified digital marketplace empowering West African merchants, artisans, and vendors to list, sell, and deliver goods seamlessly across the continent.",
    link: "https://techhubafrica.org/gmo-marketplace",
    color: "hsl(28 92% 44%)",
  },
  {
    num: "03",
    name: "Ofie Agro Ltd",
    tag: "AgriTech & Supply Chain",
    icon: Wheat,
    desc: "Taste of Tradition, Fresh from Ofie.",
    summary: "Digitizing agricultural supply chains in Ghana — linking smallholder farmers directly to urban distributors, reducing post-harvest losses and ensuring fair market pricing.",
    link: "https://techhubafrica.org/ofie-afro-ltd",
    color: "hsl(155 61% 30%)",
  },
  {
    num: "04",
    name: "Threat Lock Agency",
    tag: "Cybersecurity Platform",
    icon: ShieldCheck,
    desc: "Protect your website. Setup in 5 minutes and stop attacks before they start.",
    summary: "AI-driven Web Application Firewall (WAF) providing real-time malware monitoring, DDoS mitigation, and threat intelligence for African businesses at scale.",
    link: "https://threatlock.techhubafrica.org",
    color: "hsl(28 92% 44%)",
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

const Portfolio = () => (
  <>
    <Header />
    <PageHero
      tag="Venture Portfolio"
      title={<>Backing Africa's most<br /><span className="italic font-light text-accent">promising ventures.</span></>}
      body="We invest technical talent, capital, and market access into high-potential companies across PropTech, AgriTech, E-Commerce, and Cybersecurity."
      ghost="BUILD"
      stats={[
        { val: "4", label: "Portfolio Companies" },
        { val: "$2M+", label: "Value Created" },
        { val: "2020+", label: "Since Inception" },
        { val: "WA", label: "West Africa Focus" },
      ]}
    />

    <Marquee text="PropTech · AgriTech · E-Commerce · Cybersecurity · High Impact Ventures" />

    <main className="page-entry bg-background overflow-hidden">
      <section className="relative px-5 sm:px-6 lg:px-10 py-16 sm:py-12 sm:py-16 md:py-20 lg:py-28 lg:py-36 max-w-7xl mx-auto space-y-6">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_55%/0.35),transparent_70%)]" />

        <Reveal className="mb-12">
          <div className="flex items-baseline gap-6 mb-6">
            <span className="eyebrow text-accent">01 — Active Holdings</span>
            <div className="flex-1 divider-elegant" />
          </div>
          <h2 className="font-display font-extrabold text-primary leading-[0.9] text-[2.1rem] sm:text-[3rem] md:text-[4.5rem] tracking-tight">
            Companies scaling <span className="italic font-light text-accent">innovation</span> across industries.
          </h2>
        </Reveal>

        {ventures.map((v, i) => (
          <Reveal key={v.num} delay={i * 0.08}>
            <div className="card-lift sheen group relative rounded-3xl border border-primary/10 bg-background hover:border-primary/25 transition-all duration-500 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              {/* Number & icon */}
              <div className="lg:col-span-2 flex items-start gap-5 lg:flex-col lg:items-start lg:gap-6 p-8 pb-0 lg:pb-8 border-b lg:border-b-0 lg:border-r border-primary/10">
                <span className="font-display font-black text-5xl leading-none select-none" style={{ color: v.color, opacity: 0.35 }}>{v.num}</span>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${v.color}14`, border: `1px solid ${v.color}28` }}>
                  <v.icon className="w-6 h-6" style={{ color: v.color }} />
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-7 p-8 lg:p-10">
                <span className="text-[9px] font-black uppercase tracking-[0.28em] px-2.5 py-1 rounded-full border mb-4 inline-block" style={{ color: v.color, background: `${v.color}12`, borderColor: `${v.color}28` }}>{v.tag}</span>
                <h3 className="font-display font-extrabold text-primary text-2xl md:text-3xl tracking-tight mb-2 group-hover:text-accent transition-colors">{v.name}</h3>
                <p className="font-semibold text-sm mb-4" style={{ color: v.color }}>{v.desc}</p>
                <p className="text-primary/65 text-sm leading-relaxed">{v.summary}</p>
              </div>

              {/* CTA */}
              <div className="lg:col-span-3 flex items-center justify-center p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-primary/10">
                <a href={v.link} target="_blank" rel="noreferrer"
                  className="btn-magnetic group/btn w-full flex flex-col items-center gap-3 py-6 px-5 sm:px-6 lg:px-10 rounded-2xl border border-primary/10 hover:border-accent/40 hover:bg-accent/5 transition-all duration-400 text-center"
                >
                  <div className="w-10 h-10 rounded-full border border-accent/25 flex items-center justify-center text-accent group-hover/btn:bg-accent group-hover/btn:text-accent-foreground group-hover/btn:border-accent transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.25em] text-primary/60 group-hover/btn:text-accent transition-colors">Visit<br />Venture</span>
                </a>
              </div>

              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </Reveal>
        ))}
      </section>
    </main>
    <Footer />
  </>
);

export default Portfolio;
