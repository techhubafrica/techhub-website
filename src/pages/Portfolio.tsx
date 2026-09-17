import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { heroBackdrops } from "@/assets/ktu";
import { ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import Marquee from "@/components/Marquee";
import {
  portfolioGh,
  portfolioGmo,
  portfolioOfie,
  portfolioThreatLock,
} from "@/assets/photos";

const ventures = [
  {
    num: "01",
    name: "GH Accommodation",
    tag: "PropTech & Housing",
    logo: portfolioGh,
    desc: "Your Gateway To Affordable, Reliable, And Convenient Housing.",
    summary: "GH Accommodation uses location-based algorithms and verified landlord listings to connect students, young professionals, and families with transparent housing options across Ghana.",
    link: "https://techhubafrica.org/gh-accommodation",
    color: "hsl(156 24% 24%)",
  },
  {
    num: "02",
    name: "GMO Marketplace",
    tag: "E-Commerce & Retail",
    logo: portfolioGmo,
    desc: "Ghana Mall – Your One-Stop Shop for Everything!",
    summary: "A unified digital marketplace empowering West African merchants, artisans, and vendors to list, sell, and deliver goods seamlessly across the continent.",
    link: "https://techhubafrica.org/gmo-marketplace",
    color: "hsl(28 92% 44%)",
  },
  {
    num: "03",
    name: "Ofie Agro Ltd",
    tag: "AgriTech & Supply Chain",
    logo: portfolioOfie,
    desc: "Taste of Tradition, Fresh from Ofie.",
    summary: "Digitizing agricultural supply chains in Ghana — linking smallholder farmers directly to urban distributors, reducing post-harvest losses and ensuring fair market pricing.",
    link: "https://techhubafrica.org/ofie-afro-ltd",
    color: "hsl(156 24% 24%)",
  },
  {
    num: "04",
    name: "Threat Lock Agency",
    tag: "Cybersecurity Platform",
    logo: portfolioThreatLock,
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
      image={heroBackdrops.portfolio}
      imageAlt="Founders demoing a product at a Tech Hub Africa showcase"
      stats={[
        { val: "4", label: "Portfolio Companies" },
        { val: "$2M+", label: "Value Created" },
        { val: "2024+", label: "Since Inception" },
        { val: "WA", label: "West Africa Focus" },
      ]}
    />

    <Marquee text="PropTech · AgriTech · E-Commerce · Cybersecurity · High Impact Ventures" />

    <main className="page-entry bg-background overflow-hidden">
      <section className="relative px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-28 lg:py-36 max-w-7xl mx-auto">
        <div className="hidden md:block absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_55%/0.35),transparent_70%)]" />

        <Reveal className="mb-14">
          <div className="flex items-baseline gap-6 mb-6">
            <span className="eyebrow text-accent">01 — Investment Portfolio</span>
            <div className="flex-1 divider-elegant" />
          </div>
          <h2 className="font-display font-extrabold text-foreground leading-[0.9] text-[2.1rem] sm:text-[3rem] md:text-[4.5rem] tracking-tight">
            Companies in our <span className="italic font-light text-accent">investment portfolio.</span>
          </h2>
        </Reveal>

        {/* Modern 4-Card Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {ventures.map((v, i) => (
            <Reveal key={v.name} delay={i * 0.08}>
              <div className="card-lift sheen group relative rounded-3xl border border-foreground/10 bg-card p-6 sm:p-7 flex flex-col justify-between h-full transition-all duration-500 hover:border-accent/40 hover:shadow-xl overflow-hidden">
                {/* Subtle hover gradient */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div>
                  {/* Top Logo Container */}
                  <div className="relative h-44 sm:h-48 w-full rounded-2xl bg-white border border-foreground/8 flex items-center justify-center p-6 overflow-hidden shadow-sm group-hover:scale-[1.02] transition-transform duration-500">
                    <img
                      src={v.logo}
                      alt={`${v.name} logo`}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 right-3 text-[9px] font-black uppercase tracking-[0.25em] px-2.5 py-1 rounded-full border border-foreground/10 bg-background/80 text-foreground/60">
                      {v.num}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="mt-6 mb-4">
                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-accent block mb-2">
                      {v.tag}
                    </span>
                    <h3 className="font-display font-extrabold text-2xl text-foreground leading-tight tracking-tight group-hover:text-accent transition-colors">
                      {v.name}
                    </h3>
                  </div>

                  <p className="text-sm text-foreground/75 leading-relaxed font-semibold mb-6">
                    {v.desc}
                  </p>
                </div>

                {/* Read More / Visit Venture Button */}
                <a
                  href={v.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-magnetic w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-accent text-accent-foreground font-bold text-[10.5px] uppercase tracking-[0.22em] hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-md"
                  style={{ boxShadow: "0 10px 24px -10px hsl(28 92% 44% / 0.6)" }}
                >
                  Read More <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Portfolio;
