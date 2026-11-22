import { Link } from "react-router-dom";
import type { SVGProps } from "react";
import { Linkedin, Youtube, Facebook } from "lucide-react";
import Logo from "@/components/Logo";

const WhatsAppBrandIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.051 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.437-9.884 9.893-9.884 2.64.001 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.44 9.884-9.89 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.893c-.001 2.096.547 4.142 1.588 5.946L.057 24l6.304-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.478-8.413" />
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
      { label: "Investment Portfolio", href: "/portfolio" },
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

    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 sm:gap-12 pb-20">
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

      <div id="contact" className="scroll-mt-24 min-w-0 sm:col-span-2 md:col-span-1">
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
        <div className="inline-flex w-fit max-w-full flex-wrap items-center gap-2 px-3 py-2 rounded-xl border border-white/70 bg-white/95 backdrop-blur-xl shadow-lg shadow-black/15">
          {socials.map(({ Icon, name, color, href }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 shrink-0 flex items-center justify-center rounded-sm hover:bg-black/5 transition-colors"
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
