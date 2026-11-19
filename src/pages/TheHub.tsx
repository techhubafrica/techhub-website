import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, Handshake, Lightbulb, Users } from "lucide-react";

const vendorHighlights = [
  {
    name: "GhanaMall",
    image: "/thehub-vendors/ghana-mall.jpg",
    description: "A trusted online market in Ghana, offering quality products from top vendors at competitive prices, with fast delivery, secure payments and customer satisfaction.",
  },
  {
    name: "AfroEventTix",
    image: "/thehub-vendors/afroeventix.jpg",
    description: "A next-generation event discovery, ticketing and management platform for African communities, event organizers and cultural experience creators across Africa and the Diaspora.",
  },
  {
    name: "RushPay",
    image: "/thehub-vendors/rushpay.jpg",
    description: "A modern way to send and receive money between family, friends and customers, with custom payment solutions for Ghanaian businesses.",
  },
  {
    name: "OFie Agro Ltd",
    image: "/thehub-vendors/ofie-agro.jpg",
    description: "Sustainably produced cassava, plantain and palm-fruit foods, supporting local farmers and communities while sharing authentic Ghanaian flavors around the world.",
  },
  {
    name: "GH-Accommodation",
    image: "/thehub-vendors/gh-accommodation.jpg",
    description: "An online room and hostel reservation platform connecting people with a suitable place to stay in just a few clicks.",
  },
  {
    name: "Black Love Link",
    image: "/thehub-vendors/black-love-link.jpg",
    description: "A curated membership community for vetted Black professionals and like-minded people seeking meaningful connections beyond superficial swipe culture.",
  },
  {
    name: "Tech4ALL AI",
    image: "/thehub-vendors/tech4all-ai.jpg",
    description: "Technology without borders. An inclusive platform making artificial intelligence accessible and useful for students, entrepreneurs and communities worldwide.",
  },
  {
    name: "Threat Lock",
    image: "/thehub-vendors/threat-lock.jpg",
    description: "Website security with real-time threat defense, firewall and intrusion prevention, login protection and tools for WordPress or other platforms.",
  },
  {
    name: "Ladies In Design Network",
    image: "/thehub-vendors/ladies-in-design.jpg",
    description: "A supportive community where women in design can share expertise, learn from one another and grow their careers.",
  },
  {
    name: "Gumption Excell",
    image: "/thehub-vendors/gumption-excell.jpg",
    description: "An educational consulting hub advancing STEM, modern education infrastructure, software platforms and partnerships that connect academia with industry.",
  },
  {
    name: "Tech Hub — Metaverse",
    image: "/thehub-vendors/techhub-metaverse.jpg",
    description: "A practical program in building, hosting and managing immersive virtual environments, events and audience experiences.",
  },
];

const TheHub = () => (
  <>
    <Header />
    <section className="px-5 pt-24 sm:px-6 sm:pt-28 lg:px-10">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-foreground/10 bg-cream shadow-xl">
        <img src="/thehub-vendors/the-hub.jpg" alt="THE HUB — Explore. Discover. Be inspired. Dare to dream, innovate and shape the future of Africa’s tech today." fetchPriority="high" decoding="async" className="aspect-[2/1] w-full object-contain" />
      </div>
    </section>

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
            <p className="relative mt-9 border-l-2 border-accent pl-5 text-sm leading-relaxed text-primary-foreground/70">THE HUB is a dynamic ecosystem that fuels creativity, fosters collaboration, and accelerates growth. It brings innovators, entrepreneurs, and tech enthusiasts together in a supportive environment to showcase ideas and innovation.</p>
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
            <p className="text-foreground/65 leading-relaxed mt-4">Meet the businesses, platforms and communities showcased through THE HUB.</p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {vendorHighlights.map((vendor, index) => (
              <article key={vendor.name} className="card-lift group h-full rounded-3xl overflow-hidden bg-background border border-foreground/10">
                <div className="h-52 bg-white flex items-center justify-center overflow-hidden border-b border-foreground/5">
                  <img src={vendor.image} alt={`${vendor.name}`} loading="lazy" decoding="async" className="w-full h-full object-contain p-5 transition-transform duration-500 group-hover:scale-[1.04]" />
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
