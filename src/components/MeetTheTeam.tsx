import { ArrowUpRight } from "lucide-react";
import ImagePlaceholder from "@/components/ImagePlaceholder";

const team = [
  { name: "Leadership", role: "Founder & Directors", tone: "deep" as const },
  { name: "Programs", role: "Campus Tours & Events", tone: "forest" as const },
  { name: "Engineering", role: "Software & Web", tone: "charcoal" as const },
  { name: "Community", role: "Members & Mentors", tone: "amber" as const },
  { name: "Design", role: "Brand & Product", tone: "forest" as const },
  { name: "Research", role: "Insights & Magazine", tone: "deep" as const },
  { name: "Operations", role: "Partnerships", tone: "charcoal" as const },
];

/* Curvature per card index — creates the fanned, cylindrical arc */
const curve = [
  { rotate: 26, x: 0, y: 46, scale: 0.86, blur: true },
  { rotate: 17, x: 0, y: 22, scale: 0.93, blur: false },
  { rotate: 8, x: 0, y: 8, scale: 0.98, blur: false },
  { rotate: 0, x: 0, y: 0, scale: 1, blur: false },
  { rotate: -8, x: 0, y: 8, scale: 0.98, blur: false },
  { rotate: -17, x: 0, y: 22, scale: 0.93, blur: false },
  { rotate: -26, x: 0, y: 46, scale: 0.86, blur: true },
];

const captions = [
  {
    title: "Builders First",
    body: "Engineers, designers and organisers who ship real programs for real communities across the continent.",
  },
  {
    title: "Mentors & Faculty",
    body: "Industry practitioners guiding students through code, product and entrepreneurship at every campus stop.",
  },
  {
    title: "Operators & Partners",
    body: "The people behind the logistics, partnerships and storytelling that keep the ecosystem moving.",
  },
];

const MeetTheTeam = () => (
  <section id="team" className="relative py-28 md:py-36 overflow-hidden bg-background">
    {/* ambient lighting */}
    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-3xl opacity-30 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_55%/0.28),transparent_70%)]" />
    <div className="absolute bottom-0 left-0 w-[600px] h-[500px] rounded-full blur-3xl opacity-25 pointer-events-none bg-[radial-gradient(circle,hsl(151_57%_35%/0.25),transparent_70%)]" />

    <div className="relative max-w-7xl mx-auto px-6">
      <div className="flex items-baseline gap-6 mb-8">
        <span className="eyebrow text-accent">09 — The People</span>
        <div className="flex-1 divider-elegant" />
      </div>

      <div className="max-w-3xl mx-auto text-center mb-14">
        <h2 className="font-display font-extrabold text-primary leading-[0.9] text-[3rem] md:text-[5rem] tracking-tight">
          Meet the <span className="italic font-light text-accent">team.</span>
        </h2>
        <p className="mt-6 text-primary/60 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
          The builders, mentors and operators powering Tech Hub Africa —
          across engineering, education and community.
        </p>
        <a
          href="#hub"
          className="btn-magnetic mt-8 inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground rounded-full text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
        >
          Join the team <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>

    {/* Fanned, curved gallery */}
    <div className="relative">
      <div
        className="flex justify-center items-end gap-3 md:gap-4 px-4 md:px-6 overflow-x-auto md:overflow-visible no-scrollbar"
        style={{ perspective: "1600px" }}
      >
        {team.map((m, i) => {
          const c = curve[i] ?? curve[3];
          return (
            <div
              key={m.name}
              className="group shrink-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:!translate-y-0 hover:!scale-105"
              style={{
                transform: `translateY(${c.y}px) rotateY(${c.rotate}deg) scale(${c.scale})`,
                transformStyle: "preserve-3d",
                zIndex: 10 - Math.abs(3 - i),
              }}
            >
              <div
                className={`relative w-[132px] sm:w-[160px] md:w-[186px] aspect-[3/4] rounded-[1.4rem] overflow-hidden shadow-[0_30px_60px_-25px_hsl(155_61%_15%/0.45)] ${
                  c.blur ? "opacity-60" : ""
                }`}
              >
                <ImagePlaceholder tone={m.tone} showReflection={!c.blur} />
                {/* bottom scrim + name */}
                <div className="absolute inset-x-0 bottom-0 z-[4] p-4 bg-gradient-to-t from-primary/85 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
                    {m.role}
                  </p>
                  <p className="font-display text-sm font-extrabold text-primary-foreground mt-1">
                    {m.name}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* soft floor reflection */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
    </div>

    {/* Caption columns */}
    <div className="relative max-w-6xl mx-auto px-6 mt-16 md:mt-20">
      <div className="divider-elegant mb-10" />
      <div className="grid md:grid-cols-3 gap-10 md:gap-14">
        {captions.map((c, i) => (
          <div key={c.title} className={i > 0 ? "md:pl-10 md:border-l md:border-primary/10" : ""}>
            <h3 className="font-display text-lg font-extrabold text-primary mb-3">{c.title}</h3>
            <p className="text-sm text-primary/60 leading-relaxed">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MeetTheTeam;
