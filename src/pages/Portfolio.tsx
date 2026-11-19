import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import Marquee from "@/components/Marquee";
import {
  portfolioGmo,
} from "@/assets/photos";

const ventures: { num: string; name: string; tag: string; logo?: string; mark: string; desc: string; summary: string; link?: string }[] = [
  {
    num: "01",
    name: "Ghana Mall",
    tag: "E-Commerce · Ghana",
    logo: portfolioGmo,
    mark: "GHANA MALL",
    desc: "A multi-vendor online marketplace connecting customers with trusted vendors across Ghana.",
    summary: "Shop electronics, fashion, groceries, and home essentials in one secure platform, with local businesses, secure payments, and delivery options at its center.",
    link: "https://ghanamallonline.com/",
  },
  {
    num: "02",
    name: "GESA UMAT",
    tag: "Student Community · Engineering",
    mark: "GESA",
    desc: "A platform for the Ghana Engineering Students Association at the University of Mines and Technology.",
    summary: "Supports academic excellence, professional development, collaboration, engineering innovation, networking, and student-led initiatives.",
    link: "https://gesa-umat.com/",
  },
  {
    num: "03",
    name: "UMaT SRC",
    tag: "Student Leadership",
    mark: "UMaT SRC",
    desc: "The official digital platform for the Student Representative Council of the University of Mines and Technology.",
    summary: "Facilitates communication, governance, and student engagement by providing updates, resources, and support for the student body.",
  },
  {
    num: "04",
    name: "CEANA",
    tag: "Advocacy · Community Development",
    mark: "CEANA",
    desc: "A global advocacy and community development network.",
    summary: "An international organization platform connecting people and organizations through advocacy, education, capacity building, and community development initiatives.",
  },
  {
    num: "05",
    name: "DOSTECH",
    tag: "Digital Skills · Education",
    mark: "DOSTECH",
    desc: "A digital skills and technology education platform.",
    summary: "Delivers practical digital skills training and academic programs to help students and professionals build industry-relevant knowledge and career readiness.",
  },
  {
    num: "06",
    name: "RushPay",
    tag: "Fintech · Payments",
    mark: "RushPay",
    desc: "Seamless digital payments and financial management for individuals and businesses.",
    summary: "Supports instant transfers, mobile money withdrawals, payroll processing, and gift card services through regulated payment infrastructure.",
    link: "https://rushpay.cash/",
  },
  {
    num: "07",
    name: "Purple Moon Luxe Transport",
    tag: "Transport · Mobility",
    mark: "PURPLE MOON",
    desc: "Premium chauffeur and luxury transport services.",
    summary: "Provides high-end, reliable, and comfortable travel for corporate clients, events, and personal trips, with convenience, safety, and elegance in focus.",
  },
  {
    num: "08",
    name: "TechHub Africa Portal",
    tag: "Community · Digital Access",
    mark: "TECH HUB AFRICA",
    desc: "Digital access to Tech Hub Africa programs and community.",
    summary: "A centralized portal connecting users with programs, resources, training, events, and innovation opportunities across the Tech Hub Africa ecosystem.",
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
      body="Explore digital platforms and organizations supported by Tech Hub Africa, spanning commerce, student leadership, learning, fintech, transport, advocacy, and community access."
      ghost="BUILD"
      stats={[
        { val: "8", label: "Portfolio Projects" },
        { val: "Multi-sector", label: "Digital Portfolio" },
      ]}
    />

    <Marquee text="Commerce · Student Leadership · Digital Learning · Fintech · Mobility · Community" />

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

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
          {ventures.map((v, i) => (
            <Reveal key={v.name} delay={i * 0.08}>
              <article className="card-lift art-card sheen group relative rounded-3xl p-5 sm:p-6 flex flex-col justify-between h-full transition-all duration-500 hover:border-accent/40 overflow-hidden">
                {/* Subtle hover gradient */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div>
                  {/* Top Logo Container */}
                  <div className="relative h-36 sm:h-40 w-full rounded-2xl bg-white border border-foreground/8 flex items-center justify-center p-5 overflow-hidden shadow-sm group-hover:scale-[1.02] transition-transform duration-500">
                    {v.logo ? (
                      <img src={v.logo} alt={`${v.name} logo`} loading="lazy" className="max-h-full max-w-full object-contain p-2" />
                    ) : (
                      <span className="font-display text-2xl sm:text-3xl font-black tracking-tight text-primary text-center">{v.mark}</span>
                    )}
                    <span className="absolute top-3 right-3 text-[9px] font-black uppercase tracking-[0.25em] px-2.5 py-1 rounded-full border border-foreground/10 bg-background/80 text-foreground/60">
                      {v.num}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="mt-6 mb-4">
                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-accent block mb-2">
                      {v.tag}
                    </span>
                    <h3 className="font-display font-extrabold text-xl text-foreground leading-tight tracking-tight group-hover:text-accent transition-colors">
                      {v.name}
                    </h3>
                  </div>

                  <p className="text-sm text-foreground/75 leading-relaxed font-semibold mb-3">
                    {v.desc}
                  </p>
                  <p className="text-xs text-foreground/65 leading-relaxed mb-6">{v.summary}</p>
                </div>

                {v.link && <a href={v.link} target="_blank" rel="noopener noreferrer" className="btn-magnetic mt-2 w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-accent text-accent-foreground font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all duration-300">Visit Website <ArrowUpRight className="w-3.5 h-3.5" /></a>}
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
