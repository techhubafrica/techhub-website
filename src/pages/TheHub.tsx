import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { CheckCircle2, Handshake, Lightbulb, Users } from "lucide-react";
import Marquee from "@/components/Marquee";
import { heroCelebration } from "@/assets/photos";

const vendorHighlights = [
  {
    name: "GhanaMall",
    image: "https://techhubafrica.org/wp-content/uploads/2025/12/5900115068827929871.jpg",
    description: "A trusted online market in Ghana, offering quality products from top vendors at competitive prices, with fast delivery and secure payments.",
  },
  {
    name: "AfroEventix",
    image: "https://techhubafrica.org/wp-content/uploads/2026/10/WhatsApp-Image-2026-10-08-at-20.16.21.jpeg",
    description: "An event discovery, ticketing and management platform connecting African communities, event organizers and cultural experience creators across Africa and the Diaspora.",
  },
  {
    name: "RushPay",
    image: "https://techhubafrica.org/wp-content/uploads/2025/12/5900115068827929869.jpg",
    description: "A modern way to send and receive money between family, friends and customers, with custom payment solutions for Ghanaian businesses.",
  },
  {
    name: "OFie Agro Ltd",
    image: "https://techhubafrica.org/wp-content/uploads/2025/06/Ofie-Agro-Ltd-Products.png",
    description: "Sustainably produced foods made from cassava, plantain and palm fruits, supporting local farmers and communities while sharing Ghanaian flavors globally.",
  },
  {
    name: "GH-Accommodation",
    image: "https://techhubafrica.org/wp-content/uploads/2025/12/LOGO-GH-Accommodation.png",
    description: "An online room and hostel reservation platform connecting people with a suitable place to stay in just a few clicks.",
  },
  {
    name: "Black Love Link",
    image: "https://techhubafrica.org/wp-content/uploads/2026/10/Final-Black-Love-Link-Logo.jpeg",
    description: "A curated, membership-based community for vetted Black professionals and like-minded people seeking meaningful connections.",
  },
  {
    name: "Tech4ALL AI",
    image: "https://techhubafrica.org/wp-content/uploads/2026/10/Logo-for-Tech-For-All.jpeg",
    description: "Technology without borders. An inclusive AI platform helping students, entrepreneurs and communities learn and build with AI.",
  },
  {
    name: "Threat Lock",
    image: "https://techhubafrica.org/wp-content/uploads/2025/12/threatlocked.jpeg",
    description: "Website protection with threat defense, firewall and intrusion prevention, login protection and security tools for WordPress and other platforms.",
  },
  {
    name: "Ladies In Design Network",
    image: "https://techhubafrica.org/wp-content/uploads/2025/12/5900115068827929872.jpg",
    description: "A supportive community where women in design can share expertise, learn from one another and grow their careers.",
  },
  {
    name: "Gumption Excell",
    image: "https://techhubafrica.org/wp-content/uploads/2026/10/WhatsApp-Image-2026-10-09-at-16.00.26.jpeg",
    description: "An educational consulting hub advancing STEM education, modern learning infrastructure and workforce-relevant partnerships between academia and industry.",
  },
];

const TheHub = () => (
  <>
    <Header />
    <PageHero
      tag="Community & Innovation"
      title={<>THE HUB —<br /><span className="italic font-light text-accent">ideas in motion.</span></>}
      body="THE HUB is a dynamic ecosystem that fuels creativity, fosters collaboration and accelerates growth. It brings innovators, entrepreneurs and tech enthusiasts together to share ideas and innovation."
      ghost="HUB"
    />

    <Marquee text="Showcase · Networking · Collaboration · African Innovation" />

    <main className="page-entry bg-background overflow-hidden">
      <section className="relative px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-28 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
          <div className="rounded-3xl bg-primary text-primary-foreground p-8 sm:p-10 flex flex-col justify-between overflow-hidden relative">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,hsl(28_92%_55%/0.6),transparent_55%)]" />
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-accent/15 border border-accent/30 text-accent flex items-center justify-center mb-6"><Lightbulb className="w-6 h-6" /></div>
              <p className="eyebrow text-accent mb-3">What We Offer</p>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-7">A place to share what you’re building.</h2>
              <ul className="space-y-5">
                <li className="flex gap-3 text-sm text-primary-foreground/75 leading-relaxed"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /><span><strong className="text-primary-foreground">Showcase Opportunities:</strong> Platforms to exhibit innovative work, technology products and ecosystems.</span></li>
                <li className="flex gap-3 text-sm text-primary-foreground/75 leading-relaxed"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /><span><strong className="text-primary-foreground">Networking &amp; Collaboration:</strong> Connect with like-minded people, partners and investors.</span></li>
              </ul>
            </div>
            <img src={heroCelebration} alt="Innovators sharing ideas at Tech Hub Africa" loading="lazy" className="relative mt-9 w-full h-52 sm:h-64 object-cover rounded-2xl" />
          </div>

          <div className="rounded-3xl bg-cream p-8 sm:p-10 flex flex-col justify-center">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 text-accent flex items-center justify-center mb-6"><Users className="w-6 h-6" /></div>
            <p className="eyebrow text-accent mb-3">Who Can Participate?</p>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-foreground mb-7">Bring your ideas to the community.</h2>
            <ul className="space-y-4">
              {[
                "Innovators and tech enthusiasts with a passion for creating impact.",
                "Entrepreneurs with a vision for growth.",
                "Anyone driven to turn innovative ideas into reality.",
              ].map((item) => <li key={item} className="flex gap-3 text-sm text-foreground/70 leading-relaxed"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" />{item}</li>)}
            </ul>
            <div className="mt-9 pt-6 border-t border-foreground/10 flex items-start gap-3 text-foreground/60">
              <Handshake className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed">The Hub brings community members and emerging ventures together to learn, collaborate and grow.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream/60 px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="eyebrow text-accent">Our Community</span>
            <h2 className="font-display font-extrabold text-foreground text-4xl sm:text-5xl tracking-tight mt-4">Vendor Highlights</h2>
            <p className="text-foreground/65 leading-relaxed mt-4">Meet a selection of the businesses, platforms and communities showcased through THE HUB.</p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {vendorHighlights.map((vendor, index) => (
              <article key={vendor.name} className="card-lift group rounded-3xl overflow-hidden bg-background border border-foreground/10">
                <div className="h-52 bg-white flex items-center justify-center overflow-hidden">
                  <img src={vendor.image} alt={`${vendor.name} logo`} loading="lazy" className="w-full h-full object-contain p-5 transition-transform duration-500 group-hover:scale-[1.04]" />
                </div>
                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-display font-black text-accent/50 text-xs">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="font-display font-extrabold text-foreground text-xl">{vendor.name}</h3>
                  </div>
                  <p className="text-sm text-foreground/65 leading-relaxed">{vendor.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </main>

    <Footer />
  </>
);

export default TheHub;
