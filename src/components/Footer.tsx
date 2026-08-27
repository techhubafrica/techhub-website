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
      { label: "CSR & Sponsorships", href: "/csr" },
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
  <footer className="bg-primary text-primary-foreground pt-20">
    <div className="max-w-7xl mx-auto px-6 mb-12">
      <div className="inline-block mb-2">
        <div
          className="inline-flex items-center justify-center px-6 py-4 rounded-2xl border border-white/30 backdrop-blur-md"
          style={{ background: "rgba(255,255,255,0.18)" }}
        >
          <Link to="/">
            <Logo size="lg" onDark={false} />
          </Link>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 pb-20">
      {columns.map((col) => (
        <div key={col.title}>
          <h4 className="font-display font-bold text-accent uppercase text-[11px] tracking-[0.3em] mb-8">
            {col.title}
          </h4>
          <ul className="space-y-4 text-sm font-medium text-primary-foreground/70">
            {col.links.map((link) => (
              <li key={link.label}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link to={link.href} className="hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div>
        <h4 className="font-display font-bold text-accent uppercase text-[11px] tracking-[0.3em] mb-8">
          Contact
        </h4>
        <ul className="space-y-3 text-sm font-medium text-primary-foreground/70 mb-8">
          <li>+233 550 425 321</li>
          <li>info@techhubafrica.org</li>
          <li className="leading-relaxed">
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
              className="w-9 h-9 border border-primary-foreground/20 flex items-center justify-center rounded-sm text-primary-foreground/70 hover:border-accent hover:text-accent transition-colors"
              aria-label="Social link"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </div>

    <div className="border-t border-primary-foreground/10">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.25em] text-primary-foreground/40">
        <p>© 2026 Tech Hub Africa LLC — All rights reserved.</p>
        <p>Designed with pride in Ghana</p>
      </div>
    </div>
  </footer>
);

export default Footer;
