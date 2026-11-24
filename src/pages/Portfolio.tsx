import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const investments = [
  {
    name: "GH Accommodation",
    tag: "Accommodation · Ghana",
    logo: "/thehub-vendors/gh-accommodation.jpg",
    desc: "An online room and hostel reservation platform connecting people with suitable places to stay.",
    link: "https://accom.ltd",
  },
  {
    name: "GhanaMall",
    tag: "E-Commerce · Ghana",
    logo: "/thehub-vendors/ghana-mall.jpg",
    desc: "An online marketplace connecting customers with trusted vendors across Ghana.",
    link: "https://ghanamallonline.com/",
  },
  {
    name: "Ofie Agro",
    tag: "Agriculture · Ghana",
    logo: "/thehub-vendors/ofie-agro.jpg",
    desc: "A Ghanaian agro-food business producing local foods and supporting farmers and communities.",
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
      tag="Investment Portfolio"
      title={<>Businesses we<br /><span className="italic font-light text-accent">invest in.</span></>}
      body="Meet the three businesses in Tech Hub Africa's investment portfolio."
      ghost="BUILD"
      stats={[
        { val: "3", label: "Portfolio Companies" },
        { val: "Ghana", label: "Home Market" },
      ]}
    />

    <main className="page-entry bg-background overflow-hidden">
      <section className="relative px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-28 lg:py-36 max-w-7xl mx-auto">
        <div className="hidden md:block absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_55%/0.35),transparent_70%)]" />

        <Reveal className="mb-14">
          <div className="flex items-baseline gap-6 mb-6">
            <span className="eyebrow text-accent">01 — Investment Portfolio</span>
            <div className="flex-1 divider-elegant" />
          </div>
          <h2 className="font-display font-extrabold text-foreground leading-[0.9] text-[2.1rem] sm:text-[3rem] md:text-[4.5rem] tracking-tight">
            Companies and <span className="italic font-light text-accent">platforms.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {investments.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.08}>
              <article className="card-lift art-card sheen group relative rounded-3xl p-5 sm:p-6 flex flex-col justify-between h-full transition-all duration-500 hover:border-accent/40 overflow-hidden">
                <div>
                  <div className="relative h-36 sm:h-40 w-full rounded-2xl bg-white border border-foreground/8 flex items-center justify-center p-5 overflow-hidden shadow-sm">
                    <img src={item.logo} alt={`${item.name} logo`} loading="lazy" decoding="async" className="max-h-full max-w-full object-contain p-2" />
                  </div>
                  <div className="mt-6 mb-4">
                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-accent block mb-2">{item.tag}</span>
                    <h3 className="font-display font-extrabold text-xl text-foreground leading-tight tracking-tight">{item.name}</h3>
                  </div>
                  <p className="text-sm text-foreground/75 leading-relaxed font-semibold mb-3">{item.desc}</p>
                </div>
                {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn-magnetic mt-2 w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-accent text-accent-foreground font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all duration-300">Visit Website <ArrowUpRight className="w-3.5 h-3.5" /></a>}
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Portfolio;
