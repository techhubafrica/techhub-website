import { ImageIcon } from "lucide-react";

interface Props {
  label?: string;
  className?: string;
  tone?: "forest" | "cream" | "amber" | "deep" | "charcoal";
  aspect?: string;
  showReflection?: boolean;
}

const toneClasses: Record<NonNullable<Props["tone"]>, string> = {
  forest: "bg-secondary text-secondary-foreground/60",
  deep: "bg-primary text-primary-foreground/50",
  cream: "bg-cream-warm text-primary/50",
  amber: "bg-accent/90 text-accent-foreground/70",
  charcoal: "bg-primary text-primary-foreground/50",
};

/**
 * Cinematic media frame — luxury presentation container designed
 * to host future photography with cross-fades and slow zoom.
 */
const ImagePlaceholder = ({
  label,
  className = "",
  tone = "forest",
  aspect,
  showReflection = true,
}: Props) => (
  <div
    className={`media-frame relative w-full h-full flex flex-col items-center justify-center gap-3 ${toneClasses[tone]} ${aspect ?? ""} ${className}`}
  >
    {/* Radial glow */}
    <div className="absolute -inset-24 opacity-40 pointer-events-none" aria-hidden>
      <div className="glow-amber" />
    </div>

    {/* Ambient dot pattern */}
    <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_20%_10%,_currentColor_1px,_transparent_1px)] [background-size:22px_22px] pointer-events-none" />

    {/* Corner brackets */}
    <div className="absolute top-4 left-4 w-6 h-6 border-l border-t border-white/25 z-[2]" />
    <div className="absolute top-4 right-4 w-6 h-6 border-r border-t border-white/25 z-[2]" />
    <div className="absolute bottom-4 left-4 w-6 h-6 border-l border-b border-white/25 z-[2]" />
    <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-white/25 z-[2]" />

    {/* Reflection sweep */}
    {showReflection && <div className="media-reflection" />}

    <div className="relative z-[3] flex flex-col items-center gap-3">
      <div className="w-14 h-14 rounded-full glass flex items-center justify-center">
        <ImageIcon className="w-6 h-6 opacity-80" strokeWidth={1.2} />
      </div>
      {label && (
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-center px-4 opacity-80 max-w-[260px]">
          {label}
        </span>
      )}
    </div>
  </div>
);

export default ImagePlaceholder;
