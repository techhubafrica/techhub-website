import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  teamDoreen, teamJemima, teamSpeaker1, teamSpeaker2,
  teamMember3, teamMember4, teamMember5,
} from "@/assets/photos";

/* ── Team data ───────────────────────────────────────────────── */
const team = [
  { name: "Team Member",          role: "Operations",         tone: "charcoal" as const, photo: teamSpeaker1, bio: "A dedicated member of the Tech Hub Africa team working to inspire, educate and equip the next generation of African technologists." },
  { name: "Team Member",          role: "Engineering",        tone: "forest"   as const, photo: teamSpeaker2, bio: "A dedicated member of the Tech Hub Africa team working to inspire, educate and equip the next generation of African technologists." },
  { name: "Team Member",          role: "Design",             tone: "amber"    as const, photo: teamMember3,  bio: "A dedicated member of the Tech Hub Africa team working to inspire, educate and equip the next generation of African technologists." },
  { name: "Doreen Awuku-Agyeman", role: "Founder & CEO",     tone: "forest"   as const, photo: teamDoreen,   bio: "Transformational leader and visionary entrepreneur driving innovation at the intersection of technology, business, and social impact. Founder of Tech Hub Africa LLC — empowering Africa's tech ecosystem and fostering a vibrant, inclusive digital future." },
  { name: "Jemima Prempeh",       role: "Co-Founder & COO",  tone: "deep"     as const, photo: teamJemima,   bio: "Visionary leader and innovation driver, spearheading Innovation and marketing communications at Tech Hub Africa, fueling business growth through creative storytelling and cutting-edge strategies." },
  { name: "Team Member",          role: "Research",           tone: "deep"     as const, photo: teamMember4,  bio: "A dedicated member of the Tech Hub Africa team working to inspire, educate and equip the next generation of African technologists." },
  { name: "Team Member",          role: "Community",          tone: "charcoal" as const, photo: teamMember5,  bio: "A dedicated member of the Tech Hub Africa team working to inspire, educate and equip the next generation of African technologists." },
];

const captions = [
  { title: "Builders First",       body: "Engineers, designers and organisers who ship real programs for real communities across the continent." },
  { title: "Mentors & Faculty",    body: "Industry practitioners guiding students through code, product and entrepreneurship at every campus stop." },
  { title: "Operators & Partners", body: "The people behind the logistics, partnerships and storytelling that keep the ecosystem moving." },
];

/* ── Arc geometry ───────────────────────────────────────────── */
const R      = 760;
const SPREAD = 94;
const TILT   = 0.38;
const N      = team.length;
const MID    = Math.floor((N - 1) / 2);

/* ── SVG arc ────────────────────────────────────────────────── */
const SVG_W   = 1200;
const SVG_CX  = SVG_W / 2;
const HALF_R  = (SPREAD / 2) * (Math.PI / 180);
const ARC_X1  = Math.round(SVG_CX + R * Math.sin(-HALF_R));
const ARC_Y1  = Math.round(R * (1 - Math.cos(HALF_R)));
const ARC_X2  = Math.round(SVG_CX + R * Math.sin(HALF_R));
const SVG_H   = ARC_Y1 + 14;

const cardDots = team.map((_, i) => {
  const deg = -SPREAD / 2 + i * (SPREAD / (N - 1));
  const rad = (deg * Math.PI) / 180;
  return { cx: SVG_CX + R * Math.sin(rad), cy: R * (1 - Math.cos(rad)) };
});

/* ── Ambient particles ──────────────────────────────────────── */
const PARTICLES = [
  { x: "7%",  y: "18%", s: 7, d: 0   },
  { x: "93%", y: "22%", s: 5, d: 1.2 },
  { x: "14%", y: "68%", s: 4, d: 0.6 },
  { x: "86%", y: "62%", s: 6, d: 1.8 },
  { x: "50%", y: "8%",  s: 3, d: 0.9 },
  { x: "28%", y: "88%", s: 5, d: 2.2 },
  { x: "72%", y: "82%", s: 4, d: 1.5 },
];

/* ═══════════════════════════════════════════════════════════════
   EXPANDED CARD MODAL
═══════════════════════════════════════════════════════════════ */
const TeamModal = ({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  const member = team[index];

  /* Keyboard navigation */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowLeft")   onPrev();
      if (e.key === "ArrowRight")  onNext();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, onPrev, onNext]);

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-primary/85"
        style={{ backdropFilter: "blur(10px)", animation: "fade-in 0.3s ease forwards" }}
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        className="relative z-10 w-full max-w-2xl bg-background rounded-3xl overflow-hidden
          flex flex-col md:flex-row
          shadow-[0_48px_120px_-20px_hsl(155_61%_5%/0.9),0_0_0_1px_hsl(155_61%_15%/0.12)]"
        style={{ animation: "scale-in-modal 0.4s cubic-bezier(0.16,1,0.3,1) forwards" }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Left: Portrait ─────────────────────────────────── */}
        <div className="relative md:w-[240px] shrink-0 aspect-[3/4] md:aspect-auto">
          <img
            src={member.photo}
            alt={`${member.name}, ${member.role} at Tech Hub Africa`}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Bottom gradient + name */}
          <div className="absolute inset-x-0 bottom-0 p-5
            bg-gradient-to-t from-primary via-primary/80 to-transparent">
            <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-accent mb-1">
              {member.role}
            </p>
            <p className="font-display font-extrabold text-primary-foreground text-xl leading-tight">
              {member.name}
            </p>
          </div>

          {/* Number badge */}
          <div className="absolute top-4 left-4">
            <span className="text-[8px] font-black tracking-[0.2em] text-accent
              bg-primary/75 px-2 py-1 rounded-full border border-accent/30">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ── Right: Details ─────────────────────────────────── */}
        <div className="flex-1 p-7 md:p-10 flex flex-col relative">

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full
              border border-primary/15 flex items-center justify-center
              text-primary/50 hover:text-primary hover:bg-primary/8
              hover:border-primary/30 transition-all duration-200"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Counter */}
          <p className="text-[9px] font-black uppercase tracking-[0.35em] text-accent/50 mb-6">
            {String(index + 1).padStart(2, "0")} &nbsp;/&nbsp; {String(N).padStart(2, "0")}
          </p>

          {/* Role eyebrow */}
          <p className="eyebrow text-accent mb-2">{member.role}</p>

          {/* Name */}
          <h3 className="font-display font-extrabold text-primary leading-[0.95]
            text-3xl md:text-[2.6rem] tracking-tight mb-5">
            {member.name}
          </h3>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-primary/10" />
            <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
            <div className="h-px w-8 bg-primary/10" />
          </div>

          {/* Bio */}
          <p className="text-primary/55 text-sm leading-relaxed flex-1">
            {member.bio}
          </p>

          {/* Navigation */}
          <div className="flex items-center gap-3 mt-8">
            <button
              onClick={onPrev}
              disabled={index === 0}
              className="w-11 h-11 rounded-full border border-primary/20 flex items-center justify-center
                text-primary/60 hover:bg-primary hover:text-primary-foreground hover:border-primary
                disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-300"
              aria-label="Previous member"
            >
              <ChevronLeft className="w-4.5 h-4.5" />
            </button>

            {/* Dot pagination */}
            <div className="flex items-center gap-1.5 flex-1 justify-center">
              {team.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const diff = i - index;
                    if (diff < 0) for (let j = 0; j < -diff; j++) onPrev();
                    else          for (let j = 0; j <  diff; j++) onNext();
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-5 h-2 bg-accent"
                      : "w-2 h-2 bg-primary/20 hover:bg-primary/40"
                  }`}
                  aria-label={`View ${team[i].name}`}
                />
              ))}
            </div>

            <button
              onClick={onNext}
              disabled={index === N - 1}
              className="w-11 h-11 rounded-full border border-primary/20 flex items-center justify-center
                text-primary/60 hover:bg-primary hover:text-primary-foreground hover:border-primary
                disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-300"
              aria-label="Next member"
            >
              <ChevronRight className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Keyboard hint */}
          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-primary/25 mt-3 text-center">
            ← → Arrow keys to navigate · Esc to close
          </p>
        </div>

      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
const MeetTheTeam = () => {
  const [hovered,  setHovered]  = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [mouse,    setMouse]    = useState({ x: 50, y: 50 });
  const sectionRef              = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const h = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - r.left) / r.width)  * 100,
        y: ((e.clientY - r.top)  / r.height) * 100,
      });
    };
    el.addEventListener("mousemove", h, { passive: true });
    return () => el.removeEventListener("mousemove", h);
  }, []);

  const handlePrev = () => setSelected((s) => (s !== null && s > 0     ? s - 1 : s));
  const handleNext = () => setSelected((s) => (s !== null && s < N - 1 ? s + 1 : s));

  return (
    <>
      {/* ── Modal ─────────────────────────────────────────────── */}
      {selected !== null && (
        <TeamModal
          index={selected}
          onClose={() => setSelected(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}

      {/* ── Section ───────────────────────────────────────────── */}
      <section
        ref={sectionRef}
        id="team"
        className="relative py-24 md:py-32 overflow-hidden bg-background"
      >
        {/* Mouse spotlight */}
        <div
          className="absolute inset-0 pointer-events-none transition-[background] duration-300 z-0"
          style={{ background: `radial-gradient(680px circle at ${mouse.x}% ${mouse.y}%, hsl(28 92% 50% / 0.07), transparent 65%)` }}
        />

        {/* Ghost text */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none overflow-hidden z-0">
          <span className="font-display font-black uppercase text-primary select-none"
            style={{ fontSize: "30vw", opacity: 0.022, letterSpacing: "-0.04em", lineHeight: 1 }}>
            TEAM
          </span>
        </div>

        {/* Top glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-3xl opacity-20 pointer-events-none z-0 bg-[radial-gradient(circle,hsl(28_92%_55%/0.25),transparent_70%)]" />

        {/* Particles */}
        {PARTICLES.map((p, i) => (
          <div key={i} className="absolute rounded-full bg-accent pointer-events-none animate-float z-0"
            style={{ left: p.x, top: p.y, width: p.s, height: p.s, opacity: 0.5, animationDelay: `${p.d}s`, animationDuration: `${5 + p.d}s` }} />
        ))}

        {/* ── Heading ─────────────────────────────────────────── */}
        <div className="relative max-w-3xl mx-auto px-6 text-center z-10">
          <span className="eyebrow text-accent tracking-[0.4em]">— Our People</span>
          <h2 className="font-display font-extrabold text-primary leading-[0.93] text-[2.75rem] md:text-[4.25rem] tracking-tight mt-3">
            Meet the <span className="italic font-light text-accent">team.</span>
          </h2>
          <p className="mt-5 text-primary/55 text-sm md:text-base leading-relaxed max-w-md mx-auto">
            The builders, mentors and operators powering Tech Hub Africa —
            across engineering, education and community.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-accent/50" />
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-accent/50" />
          </div>
        </div>

        {/* ── Arc gallery ─────────────────────────────────────── */}
        <div className="relative mt-14 md:mt-20 z-10" style={{ height: 510 }}>

          {/* SVG arc guide */}
          <div className="absolute inset-x-0 top-0 flex justify-center pointer-events-none z-0">
            <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} style={{ width: SVG_W, height: SVG_H, overflow: "visible" }} fill="none">
              <path d={`M ${ARC_X1} ${ARC_Y1} A ${R} ${R} 0 0 0 ${ARC_X2} ${ARC_Y1}`} stroke="hsl(28,92%,50%)" strokeWidth="10" strokeLinecap="round" opacity="0.07" />
              <path d={`M ${ARC_X1} ${ARC_Y1} A ${R} ${R} 0 0 0 ${ARC_X2} ${ARC_Y1}`} stroke="hsl(28,92%,44%)" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="7 5" opacity="0.38"
                style={{ strokeDashoffset: 4800, animation: "draw-arc 2.6s cubic-bezier(0.16,1,0.3,1) 0.4s forwards" }} />
              {cardDots.map(({ cx, cy }, i) => {
                const isCenter = i === MID;
                return (
                  <g key={i}>
                    {isCenter && (
                      <circle cx={cx} cy={cy} r="14" fill="hsl(28,92%,50%)" opacity="0.15">
                        <animate attributeName="r"       values="10;20;10" dur="2.8s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.2;0;0.2" dur="2.8s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle cx={cx} cy={cy} r={isCenter ? 4.5 : 2.8} fill="hsl(28,92%,44%)" opacity={isCenter ? 1 : 0.6} />
                    <circle cx={cx} cy={cy} r={isCenter ? 1.8 : 1.1} fill="white" opacity="0.8" />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Cards */}
          <div className="absolute inset-x-0 top-0 flex justify-center">
            <div style={{ position: "relative", width: 0, height: 0 }}>
              {team.map((m, i) => {
                const deg       = -SPREAD / 2 + i * (SPREAD / (N - 1));
                const rad       = (deg * Math.PI) / 180;
                const x         = R * Math.sin(rad);
                const y         = R * (1 - Math.cos(rad));
                const tilt      = deg * TILT;
                const isCenter  = i === MID;
                const isHovered = hovered === i;
                const isSelected = selected === i;
                const isDimmed  = hovered !== null && !isHovered;
                const z         = isHovered || isSelected ? 50 : (N - Math.abs(MID - i));

                return (
                  <div
                    key={m.name}
                    className="absolute"
                    style={{
                      left: 0, top: 0, zIndex: z,
                      transform: `translate(calc(-50% + ${x}px), ${y}px) rotate(${tilt}deg)`,
                      transition: "transform 0.55s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
                      opacity: isDimmed ? 0.45 : 1,
                    }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setSelected(i)}
                  >
                    {/* Centre pulsing ring */}
                    {isCenter && (
                      <div className="absolute pointer-events-none" style={{ inset: -10, borderRadius: "1.8rem" }}>
                        <div className="w-full h-full border-2 border-accent/40 animate-pulse-glow" style={{ borderRadius: "inherit" }} />
                      </div>
                    )}

                    {/* Hover corona */}
                    <div className="absolute pointer-events-none" style={{
                      inset: -20, borderRadius: "2.2rem",
                      background: "radial-gradient(circle at 50% 60%, hsl(28 92% 44% / 0.3), transparent 68%)",
                      filter: "blur(14px)",
                      opacity: isHovered ? 1 : 0,
                      transition: "opacity 0.4s ease",
                    }} />

                    {/* Card */}
                    <div
                      className="relative overflow-hidden cursor-pointer"
                      style={{
                        width: "clamp(88px, 11vw, 158px)",
                        aspectRatio: "3 / 4.2",
                        borderRadius: "1.5rem",
                        transform: isHovered ? "scale(1.1)" : "scale(1)",
                        transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease, filter 0.45s ease",
                        boxShadow: isHovered
                          ? "0 36px 90px -16px hsl(155 61% 8% / 0.7), 0 0 0 2px hsl(28 92% 44% / 0.7)"
                          : isCenter
                          ? "0 24px 60px -18px hsl(155 61% 15% / 0.5), 0 0 0 1.5px hsl(28 92% 44% / 0.4)"
                          : "0 18px 48px -16px hsl(155 61% 15% / 0.38)",
                        filter: isHovered ? "drop-shadow(0 0 22px hsl(28 92% 44% / 0.45))" : "none",
                      }}
                    >
                      <img
                        src={m.photo}
                        alt={`${m.name}, ${m.role} at Tech Hub Africa`}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />

                      {/* "Click to view" hint on hover */}
                      <div className="absolute inset-0 z-[6] flex items-center justify-center pointer-events-none"
                        style={{ opacity: isHovered ? 1 : 0, transition: "opacity 0.3s ease" }}>
                        <span className="text-[7px] font-black uppercase tracking-[0.25em] text-white/90
                          bg-black/40 px-2.5 py-1 rounded-full border border-white/20">
                          View
                        </span>
                      </div>

                      {/* Top shimmer on hover */}
                      <div className="absolute inset-x-0 top-0 h-px pointer-events-none"
                        style={{ background: "linear-gradient(90deg, transparent, hsl(28 92% 60% / 0.8), transparent)", opacity: isHovered ? 1 : 0, transition: "opacity 0.3s ease" }} />

                      {/* Number badge */}
                      <div className="absolute top-2.5 left-2.5 z-[5]">
                        <span className="font-black text-accent leading-none"
                          style={{ fontSize: "8px", letterSpacing: "0.2em", background: "hsl(155 61% 8% / 0.75)", padding: "2px 6px", borderRadius: "99px", border: "1px solid hsl(28 92% 44% / 0.4)" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Name + role */}
                      <div className="absolute inset-x-0 bottom-0 z-[4] px-2.5 py-2.5 bg-gradient-to-t from-primary via-primary/85 to-transparent">
                        <p className="font-bold uppercase text-accent leading-none mb-0.5"
                          style={{ fontSize: "clamp(6px, 0.8vw, 8px)", letterSpacing: "0.25em" }}>
                          {m.role}
                        </p>
                        <p className="font-display font-extrabold text-primary-foreground leading-none"
                          style={{ fontSize: "clamp(9px, 1vw, 11px)" }}>
                          {m.name}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-28 bg-gradient-to-r from-background to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-28 bg-gradient-to-l from-background to-transparent z-20" />
        </div>

        {/* ── Captions ────────────────────────────────────────── */}
        <div className="relative max-w-4xl mx-auto px-6 mt-6 md:mt-10 z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
            {captions.map((c) => (
              <div key={c.title}>
                <h3 className="font-display text-sm font-extrabold text-primary tracking-tight mb-2">{c.title}</h3>
                <p className="text-[11px] md:text-xs text-primary/50 leading-relaxed max-w-[240px] mx-auto">{c.body}</p>
              </div>
            ))}
          </div>
        </div>

      </section>
    </>
  );
};

export default MeetTheTeam;
