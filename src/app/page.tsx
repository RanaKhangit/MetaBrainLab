import type { Metadata } from "next";
import Link from "next/link";
import { Brain, Cpu, Shield } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/features/scroll-reveal";
import { HeroAnimation } from "@/components/features/hero-animation";
import { MouseGlow } from "@/components/features/mouse-glow";

export const metadata: Metadata = {
  title: "MetaBrain Labs — Engineering the Future of Human Intelligence",
  description:
    "MetaBrain Labs is building integrated cognitive enhancement infrastructure. Learn faster. Remember better. Focus deeper. Decide clearer.",
};

const pillars = [
  {
    icon: Brain,
    layerTag: "LAYER 01 — SIGNAL ACQUISITION",
    title: "Neuroscience Foundation",
    description:
      "Grounded in peer-reviewed cognitive science, targeting well-understood brain systems for memory, learning, and attention.",
  },
  {
    icon: Cpu,
    layerTag: "LAYER 02 — ADAPTIVE INTELLIGENCE",
    title: "Adaptive AI Engine",
    description:
      "Closed-loop artificial intelligence that learns individual cognitive patterns and optimises enhancement in real-time.",
  },
  {
    icon: Shield,
    layerTag: "LAYER 03 — SOVEREIGN IDENTITY",
    title: "Sovereign Identity",
    description:
      "Blockchain-anchored cognitive identity ensuring absolute user ownership of all cognitive data.",
  },
];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MetaBrain Labs",
    url: "https://metabrainlabs.com",
    logo: "https://metabrainlabs.com/logos/og-image.svg",
    description:
      "MetaBrain Labs is building integrated cognitive enhancement infrastructure. Learn faster. Remember better. Focus deeper. Decide clearer.",
    founder: {
      "@type": "Person",
      name: "Mr Asif Hussain Rana",
      jobTitle: "Founder & Chief Executive Officer",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@metabrainlabs.com",
      contactType: "general",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "GB",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Section 1: Hero ── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-sovereign-navy">
        <HeroAnimation />
        <MouseGlow />

        <Container className="relative z-10 text-center">
          <h1 className="heading-hero mb-6">
            Engineering the Future of Human Intelligence
          </h1>

          <p className="body-large mx-auto mb-10 max-w-2xl">
            Building integrated infrastructure for safe, ethical cognitive
            enhancement — systems that measurably improve human memory,
            learning, focus, and decision-making.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#what-we-do"
              className="inline-flex items-center justify-center rounded-lg bg-cognitive-teal px-8 py-3 text-sm font-medium text-sovereign-navy transition hover:bg-accent-hover"
            >
              Learn More
            </a>
            <Link
              href="/investor-access"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-8 py-3 text-sm font-medium text-pure-light transition hover:border-cognitive-teal/50 hover:text-cognitive-teal"
            >
              Investor Access
            </Link>
          </div>

          <p className="mt-10 text-[13px] font-medium text-soft-grey/70">
            Founder &amp; CEO: Mr Asif Hussain Rana &nbsp;|&nbsp; Phase I —
            Cognitive Performance Research Programme &nbsp;|&nbsp; UK
            Headquarters &nbsp;|&nbsp; Pakistan R&amp;D Hub
          </p>
        </Container>
      </section>

      {/* ── Section 2: The Intelligence Gap ── */}
      <Section background="secondary">
        <ScrollReveal>
          <SectionHeading title="The Intelligence Gap" />

          <div className="mx-auto max-w-3xl space-y-6">
            <p className="body-large">
              Artificial intelligence is advancing at an unprecedented rate.
              Within the next decade, AI systems will exceed human performance in
              nearly every measurable cognitive domain.
            </p>
            <p className="body-large">
              This creates a fundamental asymmetry: machines are getting smarter
              while human biological cognition remains static.
            </p>
            <p className="body-large">
              MetaBrain Labs exists to close this gap.
            </p>
            <p className="body-large">
              Four forces are converging: AI capability explosion, neuroscience
              maturity, hardware readiness, and institutional demand. The
              organisations that establish cognitive enhancement infrastructure
              in the next decade will define how humanity evolves for the next
              century.
            </p>
          </div>
        </ScrollReveal>
      </Section>

      {/* ── Section 3: What We Are Building ── */}
      <Section background="primary" id="what-we-do">
        <ScrollReveal>
          <SectionHeading title="The Infrastructure Architecture" />

          <div className="mx-auto mb-16 max-w-3xl space-y-6">
            <p className="body-large">
              We are building integrated infrastructure for cognitive
              enhancement — systems that measurably improve human memory,
              learning, focus, and decision-making.
            </p>
            <p className="body-large">
              The neuroscience is established. The AI capability exists. What
              has been missing is a serious, governance-first organisation
              committed to building this responsibly.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <ScrollReveal key={pillar.title} delay={index * 0.15}>
              <div className="h-full rounded-xl border border-white/5 gradient-card p-8 transition hover:-translate-y-1 hover:border-cognitive-teal/30">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cognitive-teal/10">
                  <pillar.icon
                    className="h-6 w-6 text-cognitive-teal"
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-metadata text-cognitive-teal mb-2 block">{pillar.layerTag}</span>
                <h3 className="heading-card mb-3">{pillar.title}</h3>
                <p className="body-default">{pillar.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* ── Section 4: Trust & Validation Strip ── */}
      <Section background="secondary" padding="sm">
        <ScrollReveal>
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
              <div>
                <p className="text-metadata text-cognitive-teal mb-2">GOVERNANCE</p>
                <p className="heading-card">4</p>
                <p className="body-secondary mt-1">Oversight boards being assembled</p>
              </div>
              <div>
                <p className="text-metadata text-cognitive-teal mb-2">ARCHITECTURE</p>
                <p className="heading-card">5</p>
                <p className="body-secondary mt-1">Designed technology layers</p>
              </div>
              <div>
                <p className="text-metadata text-cognitive-teal mb-2">OPERATIONS</p>
                <p className="heading-card">2</p>
                <p className="body-secondary mt-1">Operational centres (UK + Pakistan)</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* ── Section 5: Institutional Engagement ── */}
      <section className="relative overflow-hidden bg-neural-slate py-20">
        <div className="absolute inset-0 gradient-glow" aria-hidden="true" />
        <Container className="relative z-10">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="heading-section mb-6">Institutional Engagement</h2>
              <p className="body-large mx-auto mb-10 max-w-2xl">
                We engage with investors, scientific collaborators, and
                institutional partners who share our commitment to advancing
                human potential responsibly.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact?tab=investor"
                  className="inline-flex items-center justify-center rounded-lg bg-cognitive-teal px-8 py-3 text-sm font-medium text-sovereign-navy transition hover:bg-accent-hover"
                >
                  Investor Enquiries
                </Link>
                <Link
                  href="/contact?tab=scientific"
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 px-8 py-3 text-sm font-medium text-pure-light transition hover:border-cognitive-teal/50 hover:text-cognitive-teal"
                >
                  Scientific Collaboration
                </Link>
                <Link
                  href="/contact?tab=partnership"
                  className="inline-flex items-center justify-center rounded-lg border border-white/20 px-8 py-3 text-sm font-medium text-pure-light transition hover:border-cognitive-teal/50 hover:text-cognitive-teal"
                >
                  Institutional Partners
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
