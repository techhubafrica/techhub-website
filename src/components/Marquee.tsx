interface MarqueeProps {
  /** Single phrase, repeated across the rail. */
  text: string;
  /** Surface tone — brand mint by default. */
  tone?: "primary" | "secondary";
}

/**
 * Edge-masked ticker rail used between sections.
 * Shared so every page keeps an identical rhythm and mobile behaviour.
 */
const Marquee = ({ text, tone = "primary" }: MarqueeProps) => (
  <div
    className={`relative overflow-hidden py-3 sm:py-4 ${
      tone === "primary" ? "bg-primary" : "bg-secondary"
    } text-primary-foreground`}
    aria-hidden="true"
  >
    <div className="animate-marquee whitespace-nowrap flex w-max">
      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          className="text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.24em] sm:tracking-[0.32em] mx-6 sm:mx-10 text-primary-foreground/55"
        >
          {text} <span className="text-accent">✦</span>
        </span>
      ))}
    </div>
  </div>
);

export default Marquee;
