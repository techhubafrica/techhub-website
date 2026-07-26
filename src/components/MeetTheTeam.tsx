import { ArrowRight } from "lucide-react";
import ImagePlaceholder from "@/components/ImagePlaceholder";

const team = [
  { name: "Kwame A.", role: "Operations", tone: "forest" as const, rotate: 34, y: 34 },
  { name: "Ama D.", role: "Programs Lead", tone: "deep" as const, rotate: 24, y: 14 },
  { name: "Yaw M.", role: "Engineering", tone: "charcoal" as const, rotate: 14, y: 4 },
  { name: "Efua B.", role: "Founder", tone: "forest" as const, rotate: 0, y: 0 },
  { name: "Nana K.", role: "Design", tone: "amber" as const, rotate: -14, y: 4 },
  { name: "Kojo T.", role: "Research", tone: "deep" as const, rotate: -24, y: 14 },
  { name: "Abena S.", role: "Community", tone: "charcoal" as const, rotate: -34, y: 34 },
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
  <section id="team" className="relative py-24 md:py-32 overflow-hidden bg-background">
    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-3xl opacity-25 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_55%/0.25),transparent_70%)]" />

    {/* Heading block */}
    <div className="relative max-w-3xl mx-auto px-6 text-center">
      <h2 className="font-display font-extrabold text-primary leading-[0.95] text-[2.75rem] md:text-[4.25rem] tracking-tight">
        Meet the <span className="italic font-light text-accent">team.</span>
      </h2>
      <p className="mt-5 text-primary/55 text-sm md:text-base leading-relaxed max-w-md mx-auto">
        The builders, mentors and operators powering Tech Hub Africa —
        across engineering, education and community.
      </p>
      <a
        href="#hub"
        className="btn-magnetic mt-7 inline-flex items-center gap-3 pl-6 pr-2 py-2 bg-primary text-primary-foreground rounded-full text-xs font-semibold tracking-wide hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
      >
        Join the team
        <span className="w-7 h-7 rounded-full bg-primary-foreground/15 flex items-center justify-center">
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </a>
    </div>

    {/* Concave fanned gallery — edges bleed off-canvas */}
    <div className="relative mt-14 md:mt-16">
      <div
        className="flex justify-center items-start gap-2 sm:gap-3 md:gap-4 -mx-6"
        style={{ perspective: "1400px" }}
      >
        {team.map((m, i) => (
          <div
            key={m.name}
            className="group shrink-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:z-20"
            style={{
              transform: `translateY(${m.y}px) rotateY(${m.rotate}deg)`,
              transformStyle: "preserve-3d",
              zIndex: 10 - Math.abs(3 - i),
            }}
          >
            <div className="relative w-[96px] sm:w-[140px] md:w-[178px] lg:w-[196px] aspect-[3/4.2] rounded-[1.5rem] overflow-hidden shadow-[0_36px_70px_-30px_hsl(155_61%_15%/0.5)]">
              <ImagePlaceholder tone={m.tone} showReflection={false} />
              <div className="absolute inset-x-0 bottom-0 z-[4] p-4 bg-gradient-to-t from-primary/85 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-accent">{m.role}</p>
                <p className="font-display text-sm font-extrabold text-primary-foreground mt-1">{m.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* edge fades so the outer cards dissolve into the page */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent" />
    </div>

    {/* Caption columns — sit under the arc, like the reference */}
    <div className="relative max-w-4xl mx-auto px-6 -mt-6 md:-mt-10 z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
        {captions.map((c) => (
          <div key={c.title}>
            <h3 className="font-display text-sm font-extrabold text-primary tracking-tight mb-2">
              {c.title}
            </h3>
            <p className="text-[11px] md:text-xs text-primary/50 leading-relaxed max-w-[240px] mx-auto">
              {c.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MeetTheTeam;
