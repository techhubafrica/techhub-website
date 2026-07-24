import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Programs", href: "#programs" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Events", href: "#events" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(100, (y / h) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-primary/10"
          : "bg-background/60 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 sm:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center h-full py-1">
          <Logo size="md" className="h-full py-1" />
        </Link>

        <nav className="hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.25em] text-primary/75">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative hover:text-accent transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-accent after:transition-all hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#hub"
            className="btn-magnetic hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-full text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-primary transition-colors duration-300"
          >
            Visit The Hub <ArrowUpRight className="w-3.5 h-3.5" />
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

      {/* Scroll progress */}
      <div className="absolute bottom-0 left-0 h-px bg-accent transition-[width] duration-150" style={{ width: `${progress}%` }} />

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
            Visit The Hub
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
