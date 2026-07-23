import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import communityGathering from "@/assets/community-gathering.jpg";
import ourStoryBg from "@/assets/our-story-bg.jpg";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
      <div className="relative overflow-hidden">
        <img src={communityGathering} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-olive-950/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-800/30 via-olive-900/40 to-olive-950/60" />
      </div>
      <div className="relative overflow-hidden hidden md:block">
        <img src={ourStoryBg} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-olive-950/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-bl from-olive-900/50 to-olive-950/70" />
      </div>
    </div>

    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
        <h1 className="font-serif text-7xl md:text-[9rem] leading-[0.85] text-cream/90 tracking-tight">Every</h1>
        <h1 className="font-serif text-7xl md:text-[9rem] leading-[0.85] text-cream/90 tracking-tight md:text-right">Spark</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
        <p className="text-cream/60 text-sm md:text-base leading-relaxed max-w-sm">
          Building brighter futures through education, healthcare access, and community empowerment in underserved regions worldwide.
        </p>
        <div className="md:flex md:justify-end">
          <Link to="/donate" className="inline-block border border-cream/50 text-cream/90 hover:bg-cream/10 px-10 py-3.5 text-sm tracking-widest uppercase transition-all duration-300 rounded-full">
            Donate
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const MarqueeSection = () => {
  const text = "Preserving nature, empowering change.";
  return (
    <section className="w-full bg-olive-950 border-y border-olive-800/30 overflow-hidden py-4">
      <div className="animate-marquee whitespace-nowrap flex">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="text-sm md:text-base tracking-widest text-cream/50 mx-10 uppercase">{text}</span>
        ))}
      </div>
    </section>
  );
};

const OurStorySection = () => (
  <section className="relative min-h-[600px] md:min-h-[700px] flex items-end overflow-hidden">
    <img src={ourStoryBg} alt="Community center with students" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-olive-950/50 mix-blend-multiply" />
    <div className="absolute inset-0 bg-gradient-to-t from-olive-950/90 via-olive-950/40 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-r from-olive-950/70 to-transparent" />

    <div className="absolute right-0 top-1/2 -translate-y-1/2 text-olive-800/20 pointer-events-none hidden lg:block">
      <svg width="400" height="400" viewBox="0 0 400 400" fill="currentColor" className="opacity-30">
        <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fontSize="320" fontFamily="DM Serif Display, serif">E</text>
      </svg>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-16 pt-32">
      <h2 className="font-serif text-5xl md:text-7xl text-cream mb-8">Our Story</h2>
      <p className="text-cream/70 text-base md:text-lg leading-relaxed max-w-lg">
        Ember Foundation is dedicated to protecting and empowering the world's most vulnerable communities.
        Through advocacy, education, and hands-on projects, our foundation addresses
        critical issues like healthcare access, economic inequality, and educational barriers. We aim to
        create lasting positive change for families and communities worldwide by fostering collaboration and raising awareness.
      </p>
    </div>
  </section>
);

const CTASection = () => (
  <section className="bg-cream-dark">
    <div className="border-b border-olive-800/15 px-6 py-4">
      <p className="max-w-7xl mx-auto text-sm text-olive-700 tracking-wide text-center">Make an impact, show your support</p>
    </div>
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 text-center">
      <Heart className="w-10 h-10 text-olive-700 mb-8 mx-auto" />
      <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-olive-900 leading-tight max-w-3xl mx-auto mb-12">
        100% of your donations go directly to aiding and preserving communities in need.
      </h2>
      <Link to="/donate" className="inline-block border-2 border-olive-900 text-olive-900 hover:bg-olive-900 hover:text-cream px-10 py-3.5 text-sm tracking-widest uppercase transition-all duration-300 rounded-full">
        Donate
      </Link>
    </div>
  </section>
);

const Index = () => (
  <>
    <Header />
    <main>
      <HeroSection />
      <MarqueeSection />
      <OurStorySection />
      <CTASection />
    </main>
    <Footer />
  </>
);

export default Index;
