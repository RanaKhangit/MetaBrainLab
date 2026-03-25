import { Container } from "./container";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  authorityTag?: string;
}

export function PageHeader({ title, subtitle, authorityTag }: PageHeaderProps) {
  return (
    <section className="relative bg-sovereign-navy pt-40 pb-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          {authorityTag && (
            <p className="text-metadata text-cognitive-teal mb-4">{authorityTag}</p>
          )}
          <h1 className="heading-hero mb-6">{title}</h1>
          {subtitle && <p className="body-large mt-6">{subtitle}</p>}
        </div>
      </Container>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, rgba(45, 212, 191, 0.06) 0%, transparent 70%)",
        }}
      />
    </section>
  );
}
