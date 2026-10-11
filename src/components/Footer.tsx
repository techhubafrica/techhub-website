import { Link } from "react-router-dom";
import { Linkedin, Instagram, Twitter, Youtube, Facebook } from "lucide-react";
import Logo from "@/components/Logo";

const columns: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}[] = [
  {
    title: "Who We Are",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Meet The Team", href: "/about#team" },
      { label: "Services", href: "/services" },
      { label: "Investment Portfolio", href: "/#portfolio" },
      { label: "The Hub Campus", href: "/thehub" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "Events & Meetups", href: "/events" },
      { label: "Careers & Internships", href: "/careers" },
      { label: "Mentorship Program", href: "/careers#mentorship" },
      { label: "Corporate Partnerships", href: "/csr" },
      { label: "Media & TechTalks", href: "/media" },
    ],
  },
  {
    title: "Ecosystem Programs",
    links: [
      { label: "Tech Guru Meetup 2026", href: "/events" },
      { label: "Tech4All Campus Tour", href: "https://tech4all.techhubafrica.org/", external: true },
      { label: "Hackathon Challenge", href: "/events" },
      { label: "Tech Hub Academy", href: "https://academy.techhubafrica.org", external: true },
      { label: "Global Metaverse", href: "/services#metaverse" },
      { label: "Threat Lock Auditing", href: "/services" },
      { label: "Speaking Engagements", href: "/media" },
    ],
  },
];

const Footer = () => (
  <footer className="relative bg-[#028043] text-white pt-20 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 mb-12">
      <div className="inline-block mb-2">
        <div
          className="inline-flex items-center justify-center px-7 py-4.5 rounded-2xl border border-white/70 bg-white/85 backdrop-blur-xl shadow-lg shadow-black/15 transition-all duration-300 hover:bg-white/95 hover:shadow-xl hover:border-white/90"
        >
          <Link to="/" aria-label="Tech Hub Africa home" className="inline-block transition-transform duration-300 hover:scale-[1.02]">
            <Logo size="lg" onDark={false} />
          </Link>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 pb-20">
      {columns.map((col) => (
        <div key={col.title}>
          <h4 className="font-display font-bold text-amber-300 uppercase text-[11px] tracking-[0.3em] mb-8">
            {col.title}
          </h4>
          <ul className="space-y-4 text-sm font-medium text-white/80">
            {col.links.map((link) => (
              <li key={link.label}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-300 transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link to={link.href} className="hover:text-amber-300 transition-colors">
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div>
        <h4 className="font-display font-bold text-amber-300 uppercase text-[11px] tracking-[0.3em] mb-8">
          Contact
        </h4>
        <ul className="space-y-3 text-sm font-medium text-white/80 mb-8">
          <li>
            <a href="tel:+233550425321" className="hover:text-amber-300 transition-colors">
              +233 550 425 321
            </a>
          </li>
          <li>
            <a href="mailto:hr@techhubafrica.org" className="hover:text-amber-300 transition-colors">
              hr@techhubafrica.org
            </a>
          </li>
          <li className="leading-relaxed text-white/70">
            48 IPS Road — East Legon
            <br />
            Accra, Ghana
          </li>
        </ul>
        <div className="flex gap-3">
          {[Linkedin, Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="w-9 h-9 border border-white/20 flex items-center justify-center rounded-sm text-white/80 hover:border-amber-300 hover:text-amber-300 hover:bg-white/10 transition-colors"
              aria-label="Social link"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </div>

    <div className="border-t border-white/15">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
        <p>© 2026 Tech Hub Africa LLC — All rights reserved.</p>
        <p>Designed with pride in Ghana</p>
      </div>
    </div>
  </footer>
);

export default Footer;
