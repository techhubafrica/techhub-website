import { Flame, Instagram, Twitter } from "lucide-react";

const Footer = () => (
  <footer className="bg-olive-900 text-cream/80 py-12 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <span className="text-lg font-serif text-cream">Ember Foundation</span>
      <Flame className="w-8 h-8 text-cream-dark" />
      <div className="flex gap-6">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <Instagram className="w-5 h-5 hover:text-cream transition-colors cursor-pointer" />
        </a>
        <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
          <Twitter className="w-5 h-5 hover:text-cream transition-colors cursor-pointer" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
