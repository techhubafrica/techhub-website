import { Linkedin, Instagram, Twitter, Youtube, Facebook } from "lucide-react";
import Logo from "@/components/Logo";

const columns = [
  {
    title: "Who We Are",
    links: ["About Us", "Team", "Services", "FAQs", "Testimonials"],
  },
  {
    title: "Quick Links",
    links: ["Tech Hub Academy", "Threat Lock", "Gallery", "Privacy Policy", "Terms & Conditions"],
  },
  {
    title: "Programs",
    links: ["Upcoming Events", "Sponsorships", "Career Services", "The Hub", "Speaking Engagements"],
  },
];

const Footer = () => (
  <footer className="bg-primary text-primary-foreground pt-20">
    <div className="max-w-7xl mx-auto px-6 mb-12">
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 inline-block backdrop-blur-md">
        <Logo size="lg" dark={true} />
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
              <li key={link}>
                <a href="#" className="hover:text-accent transition-colors">
                  {link}
                </a>
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
