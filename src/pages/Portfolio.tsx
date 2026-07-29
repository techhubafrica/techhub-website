import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Building2, ShoppingBag, Wheat, ShieldCheck, ArrowUpRight } from "lucide-react";

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

    <main className="bg-background">
      <section className="px-6 py-24 md:py-32 max-w-7xl mx-auto space-y-6">
        {ventures.map((v) => (
          <div key={v.num} className="group relative rounded-3xl border border-primary/8 bg-secondary/30 hover:border-primary/20 transition-all duration-500 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* Number & icon */}
            <div className="lg:col-span-2 flex items-start gap-5 lg:flex-col lg:items-start lg:gap-6 p-8 pb-0 lg:pb-8 border-b lg:border-b-0 lg:border-r border-primary/8">
              <span className="font-display font-black text-5xl leading-none select-none" style={{ color: v.color, opacity: 0.28 }}>{v.num}</span>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${v.color}14`, border: `1px solid ${v.color}28` }}>
                <v.icon className="w-6 h-6" style={{ color: v.color }} />
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-7 p-8 lg:p-10">
              <span className="text-[9px] font-black uppercase tracking-[0.28em] px-2.5 py-1 rounded-full border mb-4 inline-block" style={{ color: v.color, background: `${v.color}12`, borderColor: `${v.color}28` }}>{v.tag}</span>
              <h3 className="font-display font-extrabold text-primary text-2xl md:text-3xl tracking-tight mb-2">{v.name}</h3>
              <p className="font-semibold text-sm mb-4" style={{ color: v.color }}>{v.desc}</p>
              <p className="text-primary/60 text-sm leading-relaxed">{v.summary}</p>
            </div>

            {/* CTA */}
            <div className="lg:col-span-3 flex items-center justify-center p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-primary/8">
              <a href={v.link} target="_blank" rel="noreferrer"
                className="group/btn w-full flex flex-col items-center gap-3 py-6 px-6 rounded-2xl border border-primary/10 hover:border-accent/40 hover:bg-accent/5 transition-all duration-400 text-center"
              >
                <div className="w-10 h-10 rounded-full border border-accent/25 flex items-center justify-center text-accent group-hover/btn:bg-accent group-hover/btn:text-accent-foreground group-hover/btn:border-accent transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.25em] text-primary/50 group-hover/btn:text-accent transition-colors">Visit<br />Venture</span>
              </a>
            </div>

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </section>
    </main>
    <Footer />
  </>
);

export default Portfolio;
