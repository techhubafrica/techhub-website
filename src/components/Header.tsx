import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowUpRight, ExternalLink } from "lucide-react";
import Logo from "@/components/Logo";

const navLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Events", href: "/events" },
  { label: "Careers", href: "/careers" },
  { label: "CSR", href: "/csr" },
  { label: "Media", href: "/media" },
  { label: "Gallery", href: "/gallery" },
  { label: "Tech4All", href: "https://tech4all.techhubafrica.org/", external: true },
  { label: "Academy", href: "https://academy.techhubafrica.org", external: true },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const paint = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 40);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? Math.min(100, (y / h) * 100) : 0;
      if (barRef.current) barRef.current.style.width = `${pct.toFixed(2)}%`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
      <div
        className={`mx-auto w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? "max-w-6xl px-4 pt-3" : "max-w-[1500px] px-6 pt-5"
        }`}
      >
        <div
          className={`pointer-events-auto relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled
              ? "bg-background/90 backdrop-blur-md border border-foreground/10 shadow-md rounded-full px-4 sm:px-6 py-2"
              : "rounded-full px-4 sm:px-6 py-2 border border-foreground/10 bg-background/70 backdrop-blur-md"
          }`}
        >
          {/* top light edge */}
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-60 pointer-events-none" />

          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center shrink-0 group">
              <Logo
                size="sm"
                onDark={false}
                className={`transition-all duration-500 ${
                  scrolled ? "h-9 sm:h-10" : "h-10 sm:h-11"
                } group-hover:scale-[1.03]`}
              />
            </Link>

            <nav
              className={`hidden xl:flex items-center gap-0.5 text-[9.5px] font-bold uppercase tracking-[0.18em] whitespace-nowrap transition-colors duration-500 ${
                scrolled ? "text-foreground/70" : "text-foreground/75"
              }`}
            >
              {navLinks.map((l) =>
                l.external ? (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative inline-flex items-center px-2 py-2 rounded-full transition-all duration-300 hover:text-accent hover:bg-primary/[0.06]`}
                  >
                    {l.label}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                ) : (
                  <Link
                    key={l.href}
                    to={l.href}
                    className={`relative px-2 py-2 rounded-full transition-all duration-300 hover:text-accent hover:bg-primary/[0.06]`}
                  >
                    {l.label}
                  </Link>
                )
              )}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                to="/thehub"
                className="btn-magnetic hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground rounded-full text-[10px] font-bold uppercase tracking-[0.22em] hover:brightness-110 transition-all duration-300"
                style={{ boxShadow: "0 10px 26px -12px hsl(28 92% 44% / 0.7)" }}
              >
                Visit The Hub <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <button
                className={`xl:hidden w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                  "text-foreground/75 hover:bg-primary/[0.06]"
                }`}
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Scroll progress */}
          <div
            ref={barRef}
            className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-accent/50 to-accent rounded-full"
          />
        </div>

        {open && (
          <div className="pointer-events-auto xl:hidden mt-2 bg-background/95 backdrop-blur-md border border-foreground/10 shadow-lg rounded-3xl px-6 py-6 flex flex-col gap-3 animate-fade-up">
            {navLinks.map((l) =>
              l.external ? (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center text-sm font-bold uppercase tracking-[0.2em] text-foreground/80 hover:text-accent transition-colors"
                >
                  {l.label}
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              ) : (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-bold uppercase tracking-[0.2em] text-foreground/80 hover:text-accent transition-colors"
                >
                  {l.label}
                </Link>
              )
            )}
            <Link
              to="/thehub"
              onClick={() => setOpen(false)}
              className="mt-2 text-center py-3 rounded-full bg-accent text-accent-foreground font-bold text-xs uppercase tracking-[0.2em]"
            >
              Visit The Hub
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
