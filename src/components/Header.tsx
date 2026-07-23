import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Programs", href: "#programs" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Events", href: "#events" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-primary/10"
          : "bg-background/60 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-sm">
            <span className="text-accent font-display font-extrabold text-lg tracking-tight">TH</span>
          </div>
          <span className="font-display font-extrabold text-lg tracking-tight uppercase text-primary hidden sm:inline">
            Tech Hub Africa
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10 text-sm font-medium uppercase tracking-widest text-primary/80">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-accent transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#hub"
            className="hidden sm:inline-flex items-center px-6 py-3 bg-accent text-accent-foreground rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors duration-300"
          >
            Visit THE HUB
          </a>
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center text-primary"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-primary/10 px-6 py-6 flex flex-col gap-4">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium uppercase tracking-widest text-primary/80"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#hub"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center px-6 py-3 bg-accent text-accent-foreground rounded-full text-xs font-bold uppercase tracking-widest"
          >
            Visit THE HUB
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
