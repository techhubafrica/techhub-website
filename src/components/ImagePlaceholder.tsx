import { ImageIcon } from "lucide-react";

interface Props {
  label?: string;
  className?: string;
  tone?: "forest" | "cream" | "amber" | "deep";
  aspect?: string;
}

const toneClasses: Record<NonNullable<Props["tone"]>, string> = {
  forest: "bg-secondary text-secondary-foreground/60",
  deep: "bg-primary text-primary-foreground/50",
  cream: "bg-cream-warm text-primary/40",
  amber: "bg-accent/90 text-accent-foreground/70",
};

/**
 * Styled placeholder used until real imagery is uploaded.
 * Keeps composition intact without generated AI images.
 */
const ImagePlaceholder = ({ label, className = "", tone = "forest", aspect }: Props) => (
  <div
    className={`relative w-full h-full flex flex-col items-center justify-center gap-3 overflow-hidden ${toneClasses[tone]} ${aspect ?? ""} ${className}`}
  >
    <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_20%_10%,_currentColor_1px,_transparent_1px)] [background-size:22px_22px]" />
    <ImageIcon className="w-8 h-8 opacity-60" strokeWidth={1.2} />
    {label && (
      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-center px-4 opacity-70">
        {label}
      </span>
    )}
  </div>
);

export default ImagePlaceholder;
