import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Flame } from "lucide-react";
import impactHeroBg from "@/assets/impact-hero-bg.jpg";
import ourStoryBg from "@/assets/our-story-bg.jpg";

const goals = [
  {
    num: "01",
    title: "Education Access",
    desc: "We believe education is the foundation of opportunity. From building classrooms in rural villages to providing scholarships for displaced students, we're removing barriers to learning. Our programs support over 15,000 students annually with school supplies, teacher training, and digital literacy initiatives. By investing in education today, we're creating community leaders, healthcare workers, and innovators for tomorrow.",
  },
  {
    num: "02",
    title: "Healthcare Equity",
    desc: "Quality healthcare shouldn't depend on where you're born. Our mobile clinics bring essential medical services to remote communities, while our maternal health programs have reduced infant mortality by 40% in partner regions. We train local healthcare workers, establish wellness centers, and provide life-saving medications. From preventive care to emergency response, we're building healthcare systems that serve everyone with dignity and compassion.",
  },
  {
    num: "03",
    title: "Economic Empowerment",
    desc: "Sustainable change requires economic independence. Our microfinance programs and vocational training centers have helped 8,000+ families start small businesses and gain stable income. We support women entrepreneurs, teach marketable skills, and create fair-wage employment opportunities. By fostering local economies rather than creating dependency, we're helping communities build self-sufficient, prosperous futures.",
  },
];

const DecorativeCircles = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 500 500"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="250" cy="250" r="240" stroke="currentColor" strokeWidth="2" opacity="0.15" />
    <circle cx="250" cy="250" r="180" stroke="currentColor" strokeWidth="2" opacity="0.12" />
    <circle cx="250" cy="250" r="120" stroke="currentColor" strokeWidth="2" opacity="0.1" />
    <circle cx="250" cy="250" r="60" stroke="currentColor" strokeWidth="2" opacity="0.08" />
  </svg>
);

const OurMission = () => (
  <>
    <Header />
    <main>
      {/* Hero — tall, full-viewport with decorative circles */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src={impactHeroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-olive-950/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-olive-950/30 via-transparent to-olive-950/40" />

        {/* Decorative concentric circles */}
        <DecorativeCircles className="absolute top-1/2 right-0 translate-x-1/4 -translate-y-1/2 w-[600px] h-[600px] text-olive-400 pointer-events-none" />
        <DecorativeCircles className="absolute bottom-0 left-1/4 translate-y-1/4 w-[400px] h-[400px] text-olive-500 pointer-events-none" />

        <h1 className="relative z-10 font-serif text-7xl md:text-8xl lg:text-9xl text-cream tracking-tight">
          Our Mission
        </h1>
      </section>

      {/* Our Goals */}
      <section className="relative py-20 px-6 bg-tan/30 overflow-hidden">
        {/* Decorative circle bleeding into goals */}
        <DecorativeCircles className="absolute -top-40 -right-40 w-[500px] h-[500px] text-olive-600 pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-5xl md:text-6xl text-olive-900 mb-16">Our goals</h2>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
            {goals.map((g) => (
              <div key={g.num}>
                <span className="text-sm font-serif text-olive-500 block mb-3">{g.num}</span>
                <h3 className="font-serif text-xl text-olive-900 mb-4">{g.title}</h3>
                <p className="text-sm text-olive-600 leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It All Started — 50/50 split */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
        {/* Left: full-bleed image with overlaid heading */}
        <div className="relative min-h-[400px] lg:min-h-full">
          <img
            src={ourStoryBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-olive-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-olive-950/70 via-transparent to-transparent" />
          <h2 className="absolute bottom-8 left-8 right-8 font-serif text-4xl md:text-5xl lg:text-6xl text-cream z-10">
            How it all started
          </h2>
        </div>

        {/* Right: khaki panel with icon + text */}
        <div className="bg-tan/30 flex flex-col justify-center px-10 lg:px-16 py-16">
          <Flame className="w-12 h-12 text-olive-600 mb-6" />
          <p className="text-sm md:text-base text-olive-700 leading-relaxed max-w-lg">
            Ember Foundation began in 2018 when founder Maya Rodriguez witnessed firsthand the devastating
            impact of limited resources in rural Guatemala. What started as a single classroom project has
            grown into a global movement spanning three continents. We work hand-in-hand with local
            communities, ensuring every initiative is culturally sensitive, sustainable, and community-led.
            Our approach isn't about imposing solutions—it's about amplifying the incredible resilience
            and vision of the people we serve.
          </p>
        </div>
      </section>

      {/* Dark spacer before footer */}
      <section className="h-40 bg-olive-950" />
    </main>
    <Footer />
  </>
);

export default OurMission;
