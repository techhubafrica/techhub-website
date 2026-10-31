import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { advisoryBoard } from "@/data/board";
import {
  teamDoreen, teamJemima, teamElisha, teamKingsley,
} from "@/assets/photos";

const team = [
  {
    displayOrder: "01",
    name: "Doreen Awuku-Agyeman",
    role: "Founder & CEO",
    tone: "forest" as const,
    photo: teamDoreen,
    bio: [
      "Doreen Awuku-Agyeman is a transformational leader and visionary entrepreneur, driving innovation and growth at the intersection of technology, business, and social impact. As the Founder and CEO of Tech Hub Africa LLC, she spearheads the company's mission to empower Africa's tech ecosystem and foster a vibrant, inclusive digital future.",
      "A seasoned executive with over 20 years of experience in the telecom and technology sectors, Doreen has held leadership roles at Verizon and Cox Communications. Her achievements include launching the world's first 5G services, developing innovative marketing strategies, and driving business growth through strategic partnerships and investments.",
      "Doreen serves on the Advisory Boards of the Harvard Business Review and the American National Advertisers Association (ANA). She is also the Regional Administrator for the International Central Gospel Church, North America Region, and holds leadership roles in Women in Technology, Cable, and Media (WITC), and the Holy Child School Past Students Association (HOPSA USA-Canada), where she serves as President.",
      "A passionate advocate for diversity, equity, and inclusion, Doreen has received recognition for her commitment to empowering underrepresented groups in tech. She has been featured in various industry publications and has spoken at conferences on topics such as innovation, leadership, and social impact.",
      "Doreen holds an MBA and dual master's degrees from the University of Maryland, a Stanford Advanced Project Management Certification from Stanford University, and a Bachelor of Science in Computer Networking.",
      "Under her leadership, Tech Hub Africa LLC is poised to revolutionize the African tech landscape, driving economic growth, social progress, and innovation."
    ]
  },
  {
    displayOrder: "02",
    name: "Jemima Prempeh",
    role: "Co-Founder & COO",
    tone: "deep" as const,
    photo: teamJemima,
    bio: [
      "Visionary leader and innovation driver, Jemima Prempeh spearheads Innovation and marketing communications at Tech Hub Africa, fueling business growth through creative storytelling and cutting-edge strategies.",
      "With over two decades of experience across Healthcare, Marketing, Brand development, Digital innovation, and Leadership.",
      "Jemima's achievements include:",
      "• Successfully launching and scaling multiple startups, generating millions in revenue",
      "• Leading diverse teams in healthcare, development, and business negotiations",
      "• Leveraging expertise in finance, HR, data-driven marketing, and content creation",
      "A recognized industry thought leader.",
      "At Tech Hub Africa, Jemima amplifies the company's mission through inclusive innovation, customer-centric solutions, and her distinctive strengths:",
      "• Collaborative leadership",
      "• Creative genius",
      "• Unparalleled customer centricity",
      "• Marketing prowess"
    ]
  },
  {
    displayOrder: "03",
    name: "Elisha Kweku Arko",
    role: "Director of Information Technology",
    tone: "charcoal" as const,
    photo: teamElisha,
    bio: [
      "Elisha Arko, Director of IT at Tech Hub Africa LLC, is a seasoned technology expert with a passion for driving innovation and growth. With over 15 years of experience in IT leadership, Elisha has a proven track record of developing and implementing cutting-edge solutions that enhance business performance.",
      "His expertise spans IT strategy, cloud computing, cybersecurity, and data analytics. At Tech Hub Africa, Elisha leads the IT team in supporting the organization's mission to empower innovators and foster talent in Africa's tech ecosystem."
    ]
  },
  {
    displayOrder: "04",
    name: "Kingsley Aduhene",
    role: "Web Master & Web Technology Specialist",
    tone: "charcoal" as const,
    photo: teamKingsley,
    bio: [
      "Kingsley Aduhene, Web master at Tech Hub Africa LLC, is a versatile technology professional and software developer responsible for overseeing the organization's web technology ecosystem. With extensive expertise in web development, systems administration, and digital infrastructure, he ensures the seamless operation, security, and continuous improvement of Tech Hub Africa's online platforms.",
      "His responsibilities encompass full-stack software development, website and application management, server and hosting administration, database systems, cybersecurity, API integrations, and technical support. Kingsley manages over 50 domains and web platforms, develops new digital solutions, implements system enhancements, and ensures the reliability and performance of the organization's digital services.",
      "At Tech Hub Africa, Kingsley plays a central role in transforming innovative ideas into functional digital solutions, supporting organizational operations, and advancing the company's mission to empower professionals, businesses, and communities through technology."
    ]
  }
];

const captions = [
  { title: "Executive Leadership", body: "Visionary entrepreneurs and industry veterans guiding Tech Hub Africa's mission across the continent." },
  { title: "Strategic Vision",     body: "Leveraging two decades of telecom, healthcare, and enterprise IT leadership to build Pan-African tech infrastructure." },
  { title: "Community Impact",   body: "Fostering inclusive digital growth, talent development, and university ecosystems." },
];

/* ── Arc geometry ───────────────────────────────────────────── */
const R      = 760;
const SPREAD = 54;
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
  const bioRef = useRef<HTMLDivElement>(null);

  /* Reset bio scroll to top when index changes */
  useEffect(() => {
    if (bioRef.current) {
      bioRef.current.scrollTop = 0;
    }
  }, [index]);

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

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-hidden">

      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary/85"
        style={{ backdropFilter: "blur(10px)", animation: "fade-in 0.25s ease forwards" }}
        onClick={onClose}
      />

      {/* Dialog Container */}
      <div
        className="relative z-10 w-full max-w-2xl bg-background rounded-3xl overflow-hidden
          flex flex-col md:flex-row my-auto max-h-[85vh]
          shadow-[0_48px_120px_-20px_hsl(var(--foreground)/0.45),0_0_0_1px_hsl(var(--foreground)/0.15)]"
        style={{ animation: "scale-in-modal 0.35s cubic-bezier(0.16,1,0.3,1) forwards" }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Left: Compact Portrait ─────────────────────────── */}
        <div className="relative h-[140px] sm:h-[170px] md:h-auto md:w-[220px] shrink-0 bg-primary overflow-hidden">
          <img
            src={member.photo}
            alt={`${member.name}, ${member.role} at Tech Hub Africa`}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />

          {/* Bottom gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent md:hidden">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-accent mb-0.5">
              {member.role}
            </p>
            <p className="font-display font-extrabold text-primary-foreground text-base leading-tight">
              {member.name}
            </p>
          </div>

          {/* Number badge */}
          <div className="absolute top-3 left-3">
            <span className="text-[9px] font-black tracking-[0.2em] text-accent
              bg-primary/80 px-2.5 py-1 rounded-full border border-accent/30 backdrop-blur-sm">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ── Right: Immediate Content ────────────────────────── */}
        <div className="flex-1 p-5 sm:p-7 md:p-8 flex flex-col justify-between overflow-hidden relative">

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full
              border border-foreground/15 flex items-center justify-center bg-background/80
              text-foreground/70 hover:text-foreground hover:bg-primary/10
              hover:border-foreground/30 transition-all duration-200 z-10"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div>
            {/* Header info */}
            <div className="hidden md:block mb-4">
              <span className="eyebrow text-accent">{member.role}</span>
              <h3 className="font-display font-extrabold text-foreground leading-[0.95]
                text-2xl sm:text-3xl md:text-3.5xl tracking-tight mt-1">
                {member.name}
              </h3>
            </div>

            {/* Mobile Title */}
            <div className="md:hidden mb-3 pr-8">
              <span className="text-[10px] font-black uppercase tracking-widest text-accent">{member.role}</span>
              <h3 className="font-display font-extrabold text-foreground text-xl tracking-tight">
                {member.name}
              </h3>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-primary/10" />
              <div className="w-1.5 h-1.5 rounded-full bg-accent/50" />
              <div className="h-px w-6 bg-primary/10" />
            </div>

            {/* Bio Scroll Container */}
            <div
              ref={bioRef}
              className="space-y-3 text-foreground/80 text-xs sm:text-sm leading-relaxed
                max-h-[200px] sm:max-h-[260px] md:max-h-[300px] overflow-y-auto pr-2 custom-scrollbar"
            >
              {Array.isArray(member.bio) ? (
                member.bio.map((p, idx) => (
                  <p key={idx} className="font-medium text-foreground/85">
                    {p}
                  </p>
                ))
              ) : (
                <p className="font-medium text-foreground/85">{member.bio}</p>
              )}
            </div>
          </div>

          {/* Controls Footer */}
          <div className="pt-4 mt-4 border-t border-foreground/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={onPrev}
                disabled={index === 0}
                className="w-9 h-9 rounded-full border border-foreground/20 flex items-center justify-center
                  text-foreground/70 hover:bg-primary hover:text-primary-foreground hover:border-foreground
                  disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
                aria-label="Previous member"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={onNext}
                disabled={index === N - 1}
                className="w-9 h-9 rounded-full border border-foreground/20 flex items-center justify-center
                  text-foreground/70 hover:bg-primary hover:text-primary-foreground hover:border-foreground
                  disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
                aria-label="Next member"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center gap-1.5">
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
                      ? "w-4 h-1.5 bg-accent"
                      : "w-1.5 h-1.5 bg-primary/20 hover:bg-primary/40"
                  }`}
                  aria-label={`View ${team[i].name}`}
                />
              ))}
            </div>

            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-accent">
              {member.displayOrder} / {String(N).padStart(2, "0")}
            </span>
          </div>

        </div>

      </div>
    </div>,
    document.body
  );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
const MeetTheTeam = () => {
  const [hovered,  setHovered]  = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const sectionRef              = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    )
      return;

    let x = 50, y = 50, frame = 0;
    const paint = () => {
      frame = 0;
      el.style.setProperty("--sx", `${x.toFixed(1)}%`);
      el.style.setProperty("--sy", `${y.toFixed(1)}%`);
    };
    const h = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      x = ((e.clientX - r.left) / r.width) * 100;
      y = ((e.clientY - r.top) / r.height) * 100;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    el.addEventListener("mousemove", h, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      el.removeEventListener("mousemove", h);
    };
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
        className="relative py-14 sm:py-20 md:py-24 lg:py-32 overflow-hidden bg-background"
      >
        {/* Mouse spotlight */}
        <div
          className="absolute inset-0 pointer-events-none transition-[background] duration-300 z-0"
          style={{ background: "radial-gradient(680px circle at var(--sx, 50%) var(--sy, 50%), hsl(28 92% 50% / 0.07), transparent 65%)" }}
        />

        {/* Ghost text */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none overflow-hidden z-0">
          <span className="font-display font-black uppercase text-foreground select-none"
            style={{ fontSize: "30vw", opacity: 0.022, letterSpacing: "-0.04em", lineHeight: 1 }}>
            TEAM
          </span>
        </div>

        {/* Top glow */}
        <div className="hidden md:block absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-3xl opacity-20 pointer-events-none z-0 bg-[radial-gradient(circle,hsl(28_92%_55%/0.25),transparent_70%)]" />

        {/* Particles */}
        {PARTICLES.map((p, i) => (
          <div key={i} className="absolute rounded-full bg-accent pointer-events-none animate-float z-0"
            style={{ left: p.x, top: p.y, width: p.s, height: p.s, opacity: 0.5, animationDelay: `${p.d}s`, animationDuration: `${5 + p.d}s` }} />
        ))}

        {/* ── Heading ─────────────────────────────────────────── */}
        <div className="relative max-w-3xl mx-auto px-5 sm:px-6 lg:px-10 text-center z-10">
          <span className="eyebrow text-accent tracking-[0.4em]">— Our People</span>
          <h2 className="font-display font-extrabold text-foreground leading-[0.93] text-[2.75rem] md:text-[4.25rem] tracking-tight mt-3">
            Meet the <span className="italic font-light text-accent">team.</span>
          </h2>
          <p className="mt-5 text-foreground/55 text-sm md:text-base leading-relaxed max-w-md mx-auto">
            The leadership and advisers powering Tech Hub Africa —
            across enterprise engineering, business and innovation.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-accent/50" />
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-accent/50" />
          </div>
        </div>

        {/* ── Leadership Showcase ───────────────── */}
        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 mt-12 md:mt-16 z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {team.map((m, i) => {
              const isHovered = hovered === i;
              return (
                <div
                  key={m.name}
                  className="card-lift sheen group relative rounded-3xl border border-foreground/10 bg-card overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-2xl hover:border-accent/50 transition-all duration-500 cursor-pointer"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setSelected(i)}
                >
                  {/* Top Ambient Glow */}
                  <div
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />

                  {/* Portrait Container */}
                  <div className="relative aspect-[3/3.6] w-full overflow-hidden bg-muted">
                    <img
                      src={m.photo}
                      alt={`${m.name}, ${m.role} at Tech Hub Africa`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Number Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[10px] font-black tracking-[0.25em] text-accent bg-primary/80 px-3 py-1 rounded-full border border-accent/30 backdrop-blur-md">
                        {m.displayOrder}
                      </span>
                    </div>

                    {/* Hover Prompt */}
                    <div
                      className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none transition-opacity duration-300"
                      style={{ opacity: isHovered ? 1 : 0 }}
                    >
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-accent-foreground bg-accent px-4 py-2 rounded-full shadow-xl">
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Content Footer */}
                  <div className="p-6 bg-card flex-1 flex flex-col justify-between border-t border-foreground/5">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-normal text-accent block mb-1 leading-relaxed">
                        {m.role}
                      </span>
                      <h3 className="font-display font-extrabold text-foreground text-xl sm:text-2xl tracking-tight group-hover:text-accent transition-colors">
                        {m.name}
                      </h3>
                    </div>

                    <div className="mt-6 pt-4 border-t border-foreground/10 flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground/70 group-hover:text-accent transition-colors">
                        Executive Profile
                      </span>
                      <div className="w-8 h-8 rounded-full border border-foreground/15 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all duration-300">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Captions ────────────────────────────────────────── */}
        <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-10 mt-6 md:mt-10 z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
            {captions.map((c) => (
              <div key={c.title}>
                <h3 className="font-display text-sm font-extrabold text-foreground tracking-tight mb-2">{c.title}</h3>
                <p className="text-[11px] md:text-xs text-foreground/50 leading-relaxed max-w-[240px] mx-auto">{c.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto px-5 sm:px-6 lg:px-10 mt-16 z-10">
          <div className="border-t border-border pt-10">
            <h3 className="font-display font-bold text-2xl sm:text-3xl">Directors &amp; leadership</h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <article className="border-l-2 border-accent pl-5">
                <h4 className="font-display font-bold text-xl">Charles Hassan</h4>
                <p className="mt-2 text-sm font-medium text-accent">Director &amp; Head of Events and Sponsorships</p>
                <p className="mt-3 text-sm text-muted-foreground">A skilled events professional with a talent for bringing people together.</p>
              </article>
              <article className="border-l-2 border-primary pl-5">
                <h4 className="font-display font-bold text-xl">Judith Jackson</h4>
                <p className="mt-2 text-sm font-medium text-accent">Head of Technology &amp; Career Services</p>
                <p className="mt-3 text-sm text-muted-foreground">A resolute career coach and tech enthusiast focused on empowering professionals.</p>
              </article>
            </div>
          </div>
          <div className="mt-14 border-t border-border pt-10">
            <span className="eyebrow text-accent">Governance &amp; Guidance</span>
            <h3 className="mt-3 font-display font-bold text-2xl sm:text-3xl">Members of the Advisory Board</h3>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {advisoryBoard.map((member) => (
                <article key={member.name} className="art-card rounded-lg overflow-hidden">
                  <img src={member.photo} alt={member.name} loading="lazy" className="aspect-square w-full object-cover object-top" />
                  <div className="p-6">
                    <h4 className="font-display text-xl font-bold">{member.name}</h4>
                    <p className="mt-2 text-sm font-medium text-accent">{member.role}</p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MeetTheTeam;
