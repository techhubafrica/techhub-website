import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { heroBackdrops } from "@/assets/ktu";
import { Mic, ArrowUpRight, CheckCircle2, X } from "lucide-react";
import { heroAudience, heroCelebration, heroPanel, heroKeynote, networking } from "@/assets/photos";
import { ktuGallery } from "@/assets/ktu";
import { useReveal } from "@/hooks/use-reveal";
import Marquee from "@/components/Marquee";

const articles = [
  { id: 1, num: "01", title: "AI Infrastructure Trends Across West Africa", category: "TechNews Tuesday", date: "July 2026", excerpt: "How African cloud providers and developer communities are deploying low-latency LLMs locally — breaking the dependency on foreign infrastructure." },
  { id: 2, num: "02", title: "5 Steps to Securing Web Apps Against DDoS", category: "TechTip Thursday", date: "July 2026", excerpt: "Practical hardening steps for React and Node deployments — tested against real-world attack patterns captured by Threat Lock's monitoring data." },
  { id: 3, num: "03", title: "Campus Tour Reaches 25 University Hubs", category: "TechNews Tuesday", date: "June 2026", excerpt: "Highlights and student project showcases from Tech Hub Africa's nationwide digital literacy campaign — 5,000+ students trained in 2026 alone." },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

const Media = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [filter, setFilter] = useState<"all" | "TechNews Tuesday" | "TechTip Thursday">("all");

  const filtered = filter === "all" ? articles : articles.filter((a) => a.category === filter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setSubmitted(true);
    setTimeout(() => { setModalOpen(false); setSubmitted(false); }, 2500);
  };

  return (
    <>
      <Header />
      <PageHero
        tag="Stories & Insights"
        title={<>Insights, innovation,<br />and <span className="italic font-light text-accent">TechTalks.</span></>}
        body="Your weekly destination for TechNews Tuesday, TechTip Thursday, media highlights, and speaking engagements from the African tech ecosystem."
        ghost="MEDIA"
        image={heroBackdrops.media}
        imageAlt="Speaker presenting at a Tech Hub Africa TechTalk"
      />

      <Marquee text="TechNews Tuesday · TechTip Thursday · Ecosystem Highlights · TechTalks" />

      <main className="page-entry bg-background overflow-hidden">
        {/* ══ SPEAKER CTA ══ */}
        <section className="relative bg-primary text-primary-foreground overflow-hidden px-5 sm:px-6 lg:px-10 py-16">
          <div className="noise-bg" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-accent mb-2 block">Call for Speakers</span>
              <h3 className="font-display font-extrabold text-primary-foreground text-3xl md:text-4xl tracking-tight leading-[0.92]">
                Speak at our next<br /><span className="italic font-light text-accent">TechTalk.</span>
              </h3>
            </div>
            <button
              onClick={() => { setModalOpen(true); setSubmitted(false); }}
              className="btn-magnetic inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.25em] rounded-full hover:bg-primary-foreground hover:text-primary transition-all duration-250 shrink-0"
              style={{ boxShadow: "0 14px 40px -12px hsl(28 92% 44% / 0.6)" }}>
              Sign Up to Speak <Mic className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ══ ARTICLE GRID ══ */}
        <section className="relative px-5 sm:px-6 lg:px-10 py-16 sm:py-12 sm:py-16 md:py-20 lg:py-28 lg:py-36 max-w-7xl mx-auto">
          <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none bg-[radial-gradient(circle,hsl(28_92%_55%/0.35),transparent_70%)]" />

          <Reveal className="mb-10">
            <div className="flex items-baseline gap-6 mb-6">
              <span className="eyebrow text-accent">01 — Publications</span>
              <div className="flex-1 divider-elegant" />
            </div>
            <h2 className="font-display font-extrabold text-primary leading-[0.9] text-[2.1rem] sm:text-[3rem] md:text-[4.5rem] tracking-tight">
              Ecosystem <span className="italic font-light text-accent">Stories & Insights.</span>
            </h2>
          </Reveal>

          {/* Filters */}
          <div className="rail items-center gap-6 sm:gap-8 mb-10 sm:mb-12 border-b border-primary/10 -mx-1 px-1">
            {(["all", "TechNews Tuesday", "TechTip Thursday"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`pb-4 text-xs font-black uppercase tracking-[0.22em] border-b-2 -mb-px transition-all duration-250 ${
                  filter === f ? "border-accent text-accent" : "border-transparent text-primary/40 hover:text-primary/70"
                }`}>
                {f === "all" ? "All Articles" : f}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {filtered.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.08}>
                <article className="card-lift sheen group relative rounded-3xl border border-primary/10 bg-background hover:border-primary/25 transition-all duration-500 overflow-hidden grid grid-cols-1 md:grid-cols-12">
                  <div className="hidden md:col-span-1 md:flex items-center justify-center px-6 lg:px-10 py-10 border-r border-primary/10">
                    <span className="font-display font-black text-3xl leading-none text-primary/20 select-none">{a.num}</span>
                  </div>
                  <div className="md:col-span-8 p-6 md:p-8">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-[9px] font-black uppercase tracking-widest text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">{a.category}</span>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-primary/40">• {a.date}</span>
                    </div>
                    <h3 className="font-display font-extrabold text-primary text-xl md:text-2xl tracking-tight mb-3 group-hover:text-accent transition-colors">{a.title}</h3>
                    <p className="text-primary/65 text-sm leading-relaxed">{a.excerpt}</p>
                  </div>
                  <div className="md:col-span-3 flex items-center justify-center p-6 md:p-8 border-t md:border-t-0 md:border-l border-primary/10">
                    <a href="#"
                      className="btn-magnetic w-full py-3.5 px-5 rounded-full border border-primary/12 text-primary/70 font-bold text-[10px] uppercase tracking-[0.2em] hover:border-accent hover:text-accent transition-all duration-250 text-center flex items-center justify-center gap-2">
                      Read Article <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ PHOTO GALLERY ══ */}
        <section className="relative px-5 sm:px-6 lg:px-10 pb-36 max-w-7xl mx-auto cv-auto">
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 pointer-events-none bg-[radial-gradient(circle,hsl(155_61%_35%),transparent_70%)]" />

          <Reveal className="mb-12">
            <div className="flex items-baseline gap-6 mb-6">
              <span className="eyebrow text-accent">02 — From the Archive</span>
              <div className="flex-1 divider-elegant" />
            </div>
            <h2 className="font-display font-extrabold text-primary text-[2.5rem] md:text-[3.5rem] leading-[0.92] tracking-tight">
              Moments from the <span className="italic font-light text-accent">ecosystem.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { src: heroCelebration, alt: "Tech Hub Africa team cutting the anniversary cake", span: "md:col-span-2 md:row-span-2" },
              { src: networking, alt: "Founders networking at the Tech Guru Meetup", span: "" },
              { src: heroPanel, alt: "Panel discussion at the Tech Guru Meetup", span: "" },
              { src: heroKeynote, alt: "Keynote speaker addressing the Tech Guru Meetup", span: "" },
              { src: heroAudience, alt: "Full conference hall at the Tech Guru Meetup in Accra", span: "" },
              { src: ktuGallery[6], alt: "Students in a tablet training session at KTU", span: "md:col-span-2" },
              { src: ktuGallery[20], alt: "Computer lab session during the KTU campus tour", span: "" },
              { src: ktuGallery[33], alt: "Mentor guiding students at the KTU campus tour", span: "" },
            ].map((img, i) => (
              <Reveal key={img.alt} delay={i * 0.06} className={img.span}>
                <figure className="card-lift sheen group relative overflow-hidden rounded-3xl border border-primary/10 w-full h-full min-h-[220px]">
                  <img src={img.src} alt={img.alt} loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </figure>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link to="/gallery" className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent">
              Open the KTU 2026 archive
              <span className="text-primary-foreground/60 group-hover:text-primary-foreground">88 photos</span>
            </Link>
          </div>
        </section>
      </main>

      {/* Speaker Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/88" style={{ backdropFilter: "blur(12px)" }} onClick={() => setModalOpen(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
            style={{ animation: "scale-in-modal 0.35s cubic-bezier(0.16,1,0.3,1) forwards" }}>
            <div className="bg-primary px-8 pt-8 pb-6 border-b border-primary-foreground/10 relative text-primary-foreground">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              <button onClick={() => setModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/50 hover:text-primary-foreground hover:border-primary-foreground/50 transition-all duration-200">
                <X className="w-3.5 h-3.5" />
              </button>
              <p className="text-[9px] font-black uppercase tracking-[0.35em] text-accent mb-2">Speaker Registration</p>
              <h3 className="font-display font-extrabold text-primary-foreground text-2xl leading-tight">Speak at TechTalks 2026</h3>
            </div>
            <div className="bg-background px-8 py-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-4 text-accent">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-display font-extrabold text-xl text-primary">Proposal Submitted!</h4>
                  <p className="mt-2 text-sm text-primary/55">Our media team will review your topic and follow up with available TechTalk dates.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {["Full Name", "Email Address", "Proposed Talk Title"].map((label) => (
                    <div key={label}>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-primary/60 mb-1.5">{label}</label>
                      <input required type={label.includes("Email") ? "email" : "text"}
                        className="w-full px-4 py-3 rounded-xl border border-primary/12 bg-secondary/60 text-sm text-primary focus:outline-none focus:border-accent/60 transition-colors duration-200" />
                    </div>
                  ))}
                  <button type="submit"
                    className="btn-magnetic w-full py-4 rounded-full bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-all duration-250">
                    Submit Proposal
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Media;
