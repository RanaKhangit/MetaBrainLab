import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-section-inner",
        align === "center" && "text-center",
        className
      )}
    >
      <h2 className="heading-section mb-4">{title}</h2>
      <div
        className={cn(
          "mt-3 h-0.5 w-12 rounded-full bg-white/10",
          align === "center" && "mx-auto"
        )}
      />
      {subtitle && (
        <p className={cn("body-large mt-4 max-w-2xl", align === "center" && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
