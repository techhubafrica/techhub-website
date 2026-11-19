import { Link } from "react-router-dom";
import type { SVGProps } from "react";
import { Linkedin, Youtube, Facebook } from "lucide-react";
import Logo from "@/components/Logo";

const WhatsAppBrandIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" aria-hidden="true" fill="none">
    <path d="M20.5 11.7a8.45 8.45 0 0 1-12.5 7.4L3 20.3l1.25-4.8a8.45 8.45 0 1 1 16.25-3.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M8.1 7.7c.2-.45.42-.46.7-.47h.6c.2 0 .4.08.5.38l.75 1.8c.08.22.05.4-.08.57l-.53.65c-.16.18-.15.34-.03.55.5.86 1.22 1.56 2.1 2.03.2.11.37.12.53-.07l.7-.82c.18-.21.37-.26.6-.16l1.7.8c.24.1.38.17.43.3.06.13.06.75-.2 1.4-.25.63-1.43 1.2-1.96 1.22-.53.02-1.04.24-3.5-.78-2.97-1.22-4.83-4.3-4.98-4.5-.15-.2-1.2-1.6-1.15-3.03.04-1.43.8-2.1 1.07-2.39.28-.3.6-.37.8-.37h.57c.18 0 .4-.01.56.4Z" fill="currentColor" transform="translate(1.1 0.6) scale(.88)" />
  </svg>
);

const socials = [
  { name: "WhatsApp", Icon: WhatsAppBrandIcon, color: "#25D366", href: "https://www.whatsapp.com/channel/0029Vb5t0vZGpLHSbGtLzU2S" },
  { name: "Facebook", Icon: Facebook, color: "#1877F2", href: "https://www.facebook.com/people/Tech-Hub-Africa/61558147625486/" },
  { name: "LinkedIn", Icon: Linkedin, color: "#0A66C2", href: "https://www.linkedin.com/company/tech-hub-africa-llc/" },
  { name: "YouTube", Icon: Youtube, color: "#FF0000", href: "https://www.youtube.com/@TechHubAfricallc" },
];

const columns: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}[] = [
  {
    title: "Who We Are",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Meet The Team", href: "/about#team" },
      { label: "Ecosystems", href: "/services" },
      { label: "Investment Portfolio", href: "/#portfolio" },
      { label: "The Hub Campus", href: "/thehub" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "Events & Meetups", href: "https://events.techhubafrica.org", external: true },
      { label: "Careers & Internships", href: "/careers" },
      { label: "Mentorship Program", href: "/careers#mentorship" },
      { label: "Corporate Social Responsibility", href: "/csr" },
      { label: "Media & TechTalks", href: "/media" },
    ],
  },
  {
    title: "Ecosystem Programs",
    links: [
      { label: "Tech Guru Meetup 2026", href: "https://events.techhubafrica.org", external: true },
      { label: "Tech4All Campus Tour", href: "https://tech4all.techhubafrica.org/", external: true },
      { label: "Hackathon Challenge", href: "https://events.techhubafrica.org", external: true },
      { label: "Tech Hub Academy", href: "https://academy.techhubafrica.org", external: true },
      { label: "Global Metaverse", href: "/metaverse" },
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

      <div id="contact" className="scroll-mt-24">
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
            <a href="tel:+19732167869" className="hover:text-amber-300 transition-colors">
              +1 (973) 216-7869
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
        <div className="inline-flex items-center gap-3 px-3 py-2 rounded-xl border border-white/70 bg-white/95 backdrop-blur-xl shadow-lg shadow-black/15">
          {socials.map(({ Icon, name, color, href }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-sm hover:bg-black/5 transition-colors"
              aria-label={name}
              title={name}
            >
              <Icon className="w-5 h-5" style={{ color }} />
            </a>
          ))}
        </div>
      </div>
    </div>

    <div className="border-t border-white/15">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
        <p>© 2026 Tech Hub Africa LLC — All rights reserved.</p>
        <p>Designed with pride in Africa</p>
      </div>
    </div>
  </footer>
);

export default Footer;
