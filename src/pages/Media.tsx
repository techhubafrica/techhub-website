import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Mic, ArrowRight, CheckCircle2, X } from "lucide-react";
import { heroAudience, heroCelebration, heroPanel, heroKeynote, networking } from "@/assets/photos";


const articles = [
  { id: 1, num: "01", title: "AI Infrastructure Trends Across West Africa", category: "TechNews Tuesday", date: "July 2026", excerpt: "How African cloud providers and developer communities are deploying low-latency LLMs locally — breaking the dependency on foreign infrastructure." },
  { id: 2, num: "02", title: "5 Steps to Securing Web Apps Against DDoS", category: "TechTip Thursday", date: "July 2026", excerpt: "Practical hardening steps for React and Node deployments — tested against real-world attack patterns captured by Threat Lock's monitoring data." },
  { id: 3, num: "03", title: "Campus Tour Reaches 25 University Hubs", category: "TechNews Tuesday", date: "June 2026", excerpt: "Highlights and student project showcases from Tech Hub Africa's nationwide digital literacy campaign — 5,000+ students trained in 2026 alone." },
];

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
      />

      <main className="bg-background">
        {/* ══ SPEAKER CTA (dark strip) ══ */}
        <section className="relative bg-primary overflow-hidden px-6 py-14">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")" }} />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[9px] font-black uppercase tracking-[0.35em] text-accent mb-2 block">Call for Speakers</span>
              <h3 className="font-display font-extrabold text-primary-foreground text-3xl md:text-4xl tracking-tight leading-[0.92]">
                Speak at our next<br /><span className="italic font-light text-accent">TechTalk.</span>
              </h3>
            </div>
            <button
              onClick={() => { setModalOpen(true); setSubmitted(false); }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.25em] rounded-full hover:bg-primary-foreground hover:text-primary transition-all shrink-0"
              style={{ boxShadow: "0 14px 40px -12px hsl(28 92% 44% / 0.6)" }}
            >
              Sign Up to Speak <Mic className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* ══ ARTICLE GRID ══ */}
        <section className="px-6 py-24 md:py-32 max-w-7xl mx-auto">
          {/* Filters */}
          <div className="flex items-center gap-8 mb-14 border-b border-primary/8 pb-0">
            {(["all", "TechNews Tuesday", "TechTip Thursday"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`pb-4 text-xs font-black uppercase tracking-[0.22em] border-b-2 -mb-px transition-all duration-300 ${filter === f ? "border-accent text-accent" : "border-transparent text-primary/40 hover:text-primary/70"}`}
              >
                {f === "all" ? "All Articles" : f}
              </button>
            ))}
          </div>

          <div className="space-y-5">
            {filtered.map((a) => (
              <article key={a.id} className="group relative rounded-2xl border border-primary/8 bg-secondary/30 hover:border-primary/20 transition-all duration-400 overflow-hidden grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-1 flex items-center justify-center px-6 py-6 md:py-10 border-b md:border-b-0 md:border-r border-primary/8">
                  <span className="font-display font-black text-3xl leading-none text-primary/8 select-none">{a.num}</span>
                </div>
                <div className="md:col-span-8 p-6 md:p-8">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-[9px] font-black uppercase tracking-widest text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">{a.category}</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-primary/40">• {a.date}</span>
                  </div>
                  <h3 className="font-display font-extrabold text-primary text-xl md:text-2xl tracking-tight mb-3">{a.title}</h3>
                  <p className="text-primary/55 text-sm leading-relaxed">{a.excerpt}</p>
                </div>
                <div className="md:col-span-3 flex items-center justify-center p-6 md:p-8 border-t md:border-t-0 md:border-l border-primary/8">
                  <a href="#" className="w-full py-3 px-5 rounded-full border border-primary/12 text-primary/70 font-bold text-[10px] uppercase tracking-[0.2em] hover:border-accent hover:text-accent transition-all text-center">
                    Read Article
                  </a>
                </div>
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </article>
            ))}
          </div>
        </section>

        {/* ══ PHOTO GALLERY ══ */}
        <section className="px-6 pb-28 max-w-7xl mx-auto">
          <div className="flex items-baseline gap-6 mb-10">
            <span className="text-[9px] font-black uppercase tracking-[0.35em] text-accent">From the Archive</span>
            <div className="flex-1 h-px bg-primary/10" />
          </div>
          <h2 className="font-display font-extrabold text-primary text-[2.5rem] md:text-[3.5rem] leading-[0.92] tracking-tight mb-10">
            Moments from the <span className="italic font-light text-accent">ecosystem.</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: heroCelebration, alt: "Tech Hub Africa team cutting the anniversary cake", span: "md:col-span-2 md:row-span-2" },
              { src: networking, alt: "Founders networking at the Tech Guru Meetup", span: "" },
              { src: heroPanel, alt: "Panel discussion audience at the Tech Guru Meetup", span: "" },
              { src: heroKeynote, alt: "Keynote speaker addressing the Tech Guru Meetup", span: "" },
              { src: heroAudience, alt: "Full conference hall at the Tech Guru Meetup in Accra", span: "" },
            ].map((img) => (
              <figure
                key={img.alt}
                className={`group relative overflow-hidden rounded-2xl border border-primary/8 ${img.span}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full min-h-[180px] object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </figure>
            ))}
          </div>
        </section>
      </main>


      {/* Speaker Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary/85" style={{ backdropFilter: "blur(12px)" }} onClick={() => setModalOpen(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl" style={{ animation: "scale-in-modal 0.4s cubic-bezier(0.16,1,0.3,1) forwards" }}>
            <div className="bg-primary px-8 pt-8 pb-6 border-b border-primary-foreground/10 relative">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
              <button onClick={() => setModalOpen(false)} className="absolute top-5 right-5 w-8 h-8 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/50 hover:text-primary-foreground transition-all"><X className="w-3.5 h-3.5" /></button>
              <p className="text-[9px] font-black uppercase tracking-[0.35em] text-accent mb-2">Speaker Registration</p>
              <h3 className="font-display font-extrabold text-primary-foreground text-2xl leading-tight">Speak at TechTalks 2026</h3>
            </div>
            <div className="bg-background px-8 py-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-4 text-accent"><CheckCircle2 className="w-7 h-7" /></div>
                  <h4 className="font-display font-extrabold text-xl text-primary">Proposal Submitted!</h4>
                  <p className="mt-2 text-sm text-primary/55">Our media team will review your topic and follow up with available TechTalk dates.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {["Full Name", "Email Address", "Proposed Talk Title"].map((label) => (
                    <div key={label}>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-primary/60 mb-1.5">{label}</label>
                      <input required type={label.includes("Email") ? "email" : "text"} className="w-full px-4 py-3 rounded-xl border border-primary/12 bg-secondary/60 text-sm text-primary focus:outline-none focus:border-accent/60 transition-colors" />
                    </div>
                  ))}
                  <button type="submit" className="w-full py-4 rounded-full bg-accent text-accent-foreground font-bold text-[11px] uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-all">Submit Proposal</button>
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
