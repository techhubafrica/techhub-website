import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Marquee from "@/components/Marquee";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const videos = [
  { id: "UC3LwmrrLCs", title: "Virtual Space Walkthrough 1" },
  { id: "hb8fZEO-wIY", title: "Virtual Space Walkthrough 2" },
];

const Metaverse = () => (
  <>
    <Header />
    <PageHero
      tag="Global Metaverse"
      title={<>Explore our<br /><span className="italic font-light text-accent">virtual space.</span></>}
      body="The Global Metaverse is a standalone service: a virtual space where visitors can explore Tech Hub Africa’s wider service offering."
      ghost="VIRTUAL"
    />
    <Marquee text="Explore · Connect · Discover Tech Hub Africa in the Metaverse" />

    <main className="page-entry bg-background overflow-hidden">
      <section className="px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-28 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="eyebrow text-accent">A Standalone Service</span>
            <h2 className="font-display font-extrabold text-foreground text-3xl sm:text-4xl md:text-5xl tracking-tight mt-4">Step inside the space.</h2>
          </div>
          <p className="text-sm text-foreground/60 leading-relaxed max-w-md">These walkthroughs show the virtual environment and how visitors can explore Tech Hub Africa’s services within it.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {videos.map((video) => (
            <article key={video.id} className="rounded-3xl overflow-hidden border border-foreground/10 bg-card shadow-lg">
              <div className="aspect-video bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={video.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="flex items-center justify-between gap-4 p-5">
                <h3 className="font-display font-bold text-foreground">{video.title}</h3>
                <a href={`https://youtu.be/${video.id}`} target="_blank" rel="noopener noreferrer" className="shrink-0 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-accent hover:text-foreground transition-colors">
                  Watch on YouTube <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-cream px-5 sm:px-6 lg:px-10 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="eyebrow text-accent">Interested in this service?</span>
            <h2 className="font-display font-extrabold text-foreground text-2xl sm:text-3xl tracking-tight mt-3">Talk with us about the Metaverse.</h2>
          </div>
          <Link to="/services#metaverse" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground px-7 py-4 text-xs font-bold uppercase tracking-widest hover:brightness-110 transition">
            Request This Service <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Metaverse;
