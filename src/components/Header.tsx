import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Instagram, Menu, X, Flame } from "lucide-react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Our Impact", to: "/ourmission" },
    { label: "Give Hope", to: "/donate" },
  ];

  const isActive = (to: string) => location.pathname === to || location.pathname.startsWith(to + "/");

  const transparentMode = isHome && !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        transparentMode
          ? "bg-transparent"
          : "bg-olive-950/95 backdrop-blur-sm border-b border-olive-800/50"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-serif flex items-center gap-2 text-cream">
          <Flame className="w-7 h-7 text-cream-dark" />
          Ember Foundation
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm tracking-wide px-4 py-2 transition-colors duration-300 ${
                isActive(link.to)
                  ? "text-cream font-medium"
                  : "text-cream/70 hover:text-cream"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="ml-4">
            <Instagram className="w-5 h-5 text-cream/70 hover:text-cream transition-colors" />
          </a>
        </nav>

        <button
          className="lg:hidden w-10 h-10 flex items-center justify-center text-cream"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-olive-950 border-t border-olive-800/50 px-6 py-6 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`text-lg py-2 ${
                isActive(link.to) ? "text-cream font-medium" : "text-cream/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="py-2">
            <Instagram className="w-5 h-5 text-cream/70" />
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
