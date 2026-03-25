import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ScrollReveal } from "@/components/features/scroll-reveal";

interface PageCTAProps {
  heading: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function PageCTA({
  heading,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: PageCTAProps) {
  return (
    <section className="relative overflow-hidden bg-neural-slate py-20">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(45, 212, 191, 0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <Container className="relative z-10">
        <ScrollReveal>
          <div className="text-center">
            <h2 className="heading-section mb-6">{heading}</h2>
            <p className="body-large mx-auto mb-10 max-w-2xl">{description}</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={primaryHref}
                className="inline-flex items-center justify-center rounded-lg bg-cognitive-teal px-8 py-3 text-sm font-medium text-sovereign-navy transition hover:bg-accent-hover"
              >
                {primaryLabel}
              </Link>
              {secondaryLabel && secondaryHref && (
                <Link
                  href={secondaryHref}
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 px-8 py-3 text-sm font-medium text-pure-light transition hover:border-cognitive-teal/50 hover:text-cognitive-teal"
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
