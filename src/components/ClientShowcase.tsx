import { useState } from "react";
import { ExternalLink, Globe, Sparkles, CheckCircle2, ShieldCheck, Code2 } from "lucide-react";
import { clientWebsites, ClientWebsite } from "@/data/clientWebsites";

interface ClientShowcaseProps {
  limit?: number;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const ClientShowcase = ({
  limit,
  title = "Built by Tech Hub Africa",
  subtitle = "Explore live production websites, e-commerce platforms, and custom software delivered for businesses across Africa and the diaspora.",
  className = "",
}: ClientShowcaseProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(clientWebsites.map((c) => c.category)))];

  const filtered = clientWebsites
    .filter((site) => activeCategory === "All" || site.category === activeCategory)
    .slice(0, limit || clientWebsites.length);

  return (
    <section className={`relative py-16 sm:py-20 md:py-28 lg:py-36 px-5 sm:px-6 lg:px-10 bg-secondary text-primary-foreground overflow-hidden ${className}`}>
      {/* Glow accents */}
      <div className="hidden md:block absolute -top-24 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_55%/0.4),transparent_70%)]" />
      <div className="hidden md:block absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 pointer-events-none bg-[radial-gradient(circle,hsl(155_61%_35%/0.4),transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-12 sm:mb-16">
          <div>
            <span className="eyebrow text-accent">Proven Production Work</span>
            <h2 className="font-display font-extrabold text-3.5xl sm:text-5xl md:text-6xl tracking-tight leading-[0.92] mt-4">
              {title}
            </h2>
          </div>
          <p className="text-primary-foreground/70 max-w-md text-sm md:text-base leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="rail items-center gap-3 mb-10 pb-2 -mx-1 px-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-accent text-accent-foreground shadow-lg"
                  : "bg-primary-foreground/10 text-primary-foreground/60 hover:bg-primary-foreground/20 hover:text-primary-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Client Website Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((site) => (
            <div
              key={site.id}
              className="card-lift sheen group relative rounded-3xl border border-primary-foreground/15 bg-primary/75 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:border-accent/50 hover:bg-primary/95"
            >
              {/* Top ambient highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div>
                {/* Browser-style address top bar */}
                <div className="flex items-center justify-between gap-3 px-3 py-2 rounded-t-xl bg-background/60 border border-primary-foreground/15 text-[10.5px] font-mono text-primary-foreground/70">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="truncate text-accent font-bold">{site.displayUrl}</span>
                  <Globe className="w-3.5 h-3.5 text-accent shrink-0" />
                </div>

                {/* Screenshot preview frame */}
                {site.image && (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-b-xl border-x border-b border-primary-foreground/15 mb-6 group/img">
                    <img
                      src={site.image}
                      alt={`Screenshot of ${site.name} built by Tech Hub Africa`}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />
                  </div>
                )}

                {/* Category & Name */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[9px] font-black uppercase tracking-[0.28em] px-2.5 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent">
                    {site.category}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-2xl tracking-tight text-primary-foreground group-hover:text-accent transition-colors mb-3">
                  {site.name}
                </h3>

                <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
                  {site.description}
                </p>
              </div>

              <div>
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-primary-foreground/10">
                  {site.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-primary-foreground/8 text-primary-foreground/60 border border-primary-foreground/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* External Link Button */}
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-magnetic w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-accent text-accent-foreground font-bold text-[10.5px] uppercase tracking-[0.22em] hover:brightness-110 transition-all duration-300"
                  style={{ boxShadow: "0 10px 24px -10px hsl(28 92% 44% / 0.6)" }}
                >
                  Visit Live Website <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Feature summary highlights */}
        <div className="mt-16 pt-12 border-t border-primary-foreground/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <Code2 className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="font-display font-bold text-lg text-primary-foreground">Custom Design</p>
            <p className="text-xs text-primary-foreground/60 mt-1">Tailored UI/UX, zero generic templates</p>
          </div>
          <div>
            <Sparkles className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="font-display font-bold text-lg text-primary-foreground">Lightning Speed</p>
            <p className="text-xs text-primary-foreground/60 mt-1">Vite + React high performance</p>
          </div>
          <div>
            <ShieldCheck className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="font-display font-bold text-lg text-primary-foreground">Enterprise Security</p>
            <p className="text-xs text-primary-foreground/60 mt-1">Threat Lock WAF & DDoS shield</p>
          </div>
          <div>
            <CheckCircle2 className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="font-display font-bold text-lg text-primary-foreground">SEO & Growth</p>
            <p className="text-xs text-primary-foreground/60 mt-1">Search engine optimized & mobile-first</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientShowcase;
