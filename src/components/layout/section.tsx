import { cn } from "@/lib/utils";
import { Container } from "./container";

interface SectionProps {
  children: React.ReactNode;
  background?: "primary" | "secondary" | "elevated";
  padding?: "sm" | "default" | "lg";
  className?: string;
  id?: string;
}

const bgMap = {
  primary: "bg-sovereign-navy",
  secondary: "bg-deep-cognition",
  elevated: "bg-neural-slate",
};

const paddingMap = {
  sm: "py-20",
  default: "py-section",
  lg: "py-40",
};

export function Section({
  children,
  background = "primary",
  padding = "default",
  className,
  id,
}: SectionProps) {
  return (
    <section id={id} className={cn(paddingMap[padding], bgMap[background], className)}>
      <Container>{children}</Container>
    </section>
  );
}
