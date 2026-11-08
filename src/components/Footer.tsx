import { Link } from "react-router-dom";
import type { SVGProps } from "react";
import { Linkedin, Youtube, Facebook } from "lucide-react";
import Logo from "@/components/Logo";

const InstagramBrandIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" aria-hidden="true" fill="none">
    <defs>
      <linearGradient id="instagram-gradient" x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFDC80" />
        <stop offset="0.5" stopColor="#F77737" />
        <stop offset="1" stopColor="#C13584" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="url(#instagram-gradient)" strokeWidth="2.25" />
    <circle cx="12" cy="12" r="4.25" stroke="url(#instagram-gradient)" strokeWidth="2.25" />
    <circle cx="17.5" cy="6.5" r="1.35" fill="url(#instagram-gradient)" />
  </svg>
);

const XIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26L22.75 21.75h-6.38l-5-6.535-5.71 6.535H2.35l7.73-8.835L1.75 2.25h6.54l4.52 5.98 5.434-6.645zm-1.16 17.22h1.833L7.49 4.43H5.52l11.564 15.04z" />
  </svg>
);

const socials = [
  { name: "LinkedIn", Icon: Linkedin, color: "#0A66C2" },
  { name: "Instagram", Icon: InstagramBrandIcon },
  { name: "X", Icon: XIcon, color: "#000000" },
  { name: "Facebook", Icon: Facebook, color: "#1877F2" },
  { name: "YouTube", Icon: Youtube, color: "#FF0000" },
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
          {socials.map(({ Icon, name, color }) => (
            <a
              key={name}
              href="#"
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
