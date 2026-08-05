import Logo from "@/components/Logo";

/**
 * Cinematic route loader — forest stage, orbiting constellation arcs
 * and a drawing amber meridian. Mirrors the hero's connection motif.
 */
const Loader = () => (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center bg-primary overflow-hidden"
    role="status"
    aria-live="polite"
    aria-busy="true"
  >
    {/* ambient glows */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vmin] h-[70vmin] rounded-full bg-accent/20 blur-[90px] animate-pulse-glow" />
      <div className="absolute -bottom-24 -right-16 w-[45vmin] h-[45vmin] rounded-full bg-secondary/60 blur-[80px]" />
    </div>
    <div className="noise-bg" />

    <div className="relative flex flex-col items-center gap-8 sm:gap-10 px-6">
      {/* constellation ring */}
      <div className="relative w-[132px] h-[132px] sm:w-[168px] sm:h-[168px]">
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
          <circle
            cx="100"
            cy="100"
            r="78"
            fill="none"
            stroke="hsl(40 33% 94% / 0.12)"
            strokeWidth="1"
          />
          <g className="loader-spin" style={{ transformOrigin: "100px 100px" }}>
            <circle
              cx="100"
              cy="100"
              r="78"
              fill="none"
              stroke="hsl(28 92% 44%)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="70 420"
            />
            <circle cx="178" cy="100" r="3.5" fill="hsl(28 92% 44%)" />
          </g>
          <g className="loader-spin-slow" style={{ transformOrigin: "100px 100px" }}>
            <circle
              cx="100"
              cy="100"
              r="56"
              fill="none"
              stroke="hsl(40 33% 94% / 0.35)"
              strokeWidth="1"
              strokeDasharray="4 12"
            />
            <circle cx="44" cy="100" r="2.5" fill="hsl(40 33% 94% / 0.7)" />
          </g>
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <Logo size="sm" onDark className="h-9 sm:h-11" />
        </div>
      </div>

      {/* wordmark + progress meridian */}
      <div className="flex flex-col items-center gap-4 w-full max-w-[260px]">
        <span className="eyebrow text-primary-foreground/50 text-center">
          Tech Hub Africa
        </span>
        <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-primary-foreground/10">
          <div className="loader-bar absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.32em] text-primary-foreground/35">
          Loading
        </span>
      </div>
    </div>

    <span className="sr-only">Loading page</span>
  </div>
);

export default Loader;
