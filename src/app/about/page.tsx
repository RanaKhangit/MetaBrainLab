import type { Metadata } from "next";
import { User, FlaskConical, Scale, Stethoscope, ShieldCheck, CheckCircle2, Globe, Code, Linkedin, Twitter } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/features/scroll-reveal";
import { PageCTA } from "@/components/shared/page-cta";

export const metadata: Metadata = {
  title: "About MetaBrain Lab — Our Mission and Leadership",
  description:
    "MetaBrain Lab is a UK-headquartered neuroscience and AI company building integrated cognitive enhancement infrastructure.",
};

const governanceBoards = [
  {
    icon: FlaskConical,
    title: "Scientific Advisory Board",
    description:
      "Leading neuroscientists, cognitive psychologists, and AI researchers providing rigorous peer review of all research methodologies and enhancement protocols.",
  },
  {
    icon: Scale,
    title: "Ethics & Neurorights Council",
    description:
      "Bioethicists, human rights experts, and legal scholars ensuring all cognitive enhancement work respects autonomy, consent, and equitable access.",
  },
  {
    icon: Stethoscope,
    title: "Clinical Oversight Committee",
    description:
      "Medical professionals and clinical trial specialists overseeing safety protocols, adverse event monitoring, and regulatory compliance.",
  },
  {
    icon: ShieldCheck,
    title: "Security & Identity Board",
    description:
      "Cybersecurity experts and blockchain architects safeguarding cognitive data sovereignty and ensuring tamper-proof identity infrastructure.",
  },
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mr Asif Hussain Rana",
    jobTitle: "Founder & Chief Executive Officer",
    worksFor: {
      "@type": "Organization",
      name: "MetaBrain Lab",
      url: "https://metabrainlab.com",
    },
    url: "https://pixelettetech.com",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        title="About MetaBrain Lab"
        subtitle="Building the foundational layer for how humans and AI safely co-evolve."
        authorityTag="INSTITUTIONAL PROFILE — LEADERSHIP &amp; GOVERNANCE"
      />

      {/* ── Section 1: Who We Are ── */}
      <Section background="primary">
        <ScrollReveal>
          <SectionHeading title="Who We Are" />

          <div className="mx-auto max-w-3xl space-y-6">
            <p className="body-large">
              MetaBrain Lab is a UK-headquartered neuroscience and AI company
              building integrated infrastructure for cognitive enhancement.
            </p>
            <p className="body-large">
              We are not building a product. We are building infrastructure — the
              foundational layer for how humans and AI will safely co-evolve over
              the coming decades.
            </p>
            <p className="body-large">
              Our platform integrates neuroscience, adaptive AI, and
              blockchain-secured identity to enhance memory, learning, focus, and
              decision-making — with governance and ethics built into the
              architecture from day one.
            </p>
          </div>
        </ScrollReveal>
      </Section>

      {/* ── Section 2: Our Mission ── */}
      <Section background="secondary">
        <ScrollReveal>
          <SectionHeading title="Our Mission" />

          <div className="mx-auto max-w-3xl space-y-6">
            <p className="body-large">
              To build safe, ethical, and effective cognitive enhancement
              infrastructure that enables humans to learn faster, remember
              better, focus deeper, and make clearer decisions.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cognitive-teal" />
                <span className="body-large">Scientifically rigorous, not speculative</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cognitive-teal" />
                <span className="body-large">Ethically governed, not exploitative</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cognitive-teal" />
                <span className="body-large">User-sovereign, not corporately controlled</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cognitive-teal" />
                <span className="body-large">Accessible over time, not exclusive</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* ── Section 3: Leadership ── */}
      <Section background="primary">
        <ScrollReveal>
          <SectionHeading title="Leadership" />

          <div className="rounded-xl border border-white/5 bg-neural-slate p-8 md:p-12">
            <div className="flex flex-col gap-8 md:flex-row md:gap-12">
              <div className="flex-shrink-0">
                <div className="h-56 w-44 overflow-hidden rounded-lg bg-surface">
                  <img
                    src="/ceo-asif-rana.png"
                    alt="Mr Asif Hussain Rana — Founder & CEO of MetaBrain Lab"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Bio content */}
              <div className="flex-1">
                <h3 className="heading-card mb-1">Mr Asif Hussain Rana</h3>
                <p className="mb-4 text-sm font-medium text-cognitive-teal">
                  Founder &amp; Chief Executive Officer
                </p>

                {/* Social Links */}
                <div className="mb-6 flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/rana-khan-asif/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-soft-grey transition-all duration-200 hover:border-cognitive-teal/40 hover:bg-cognitive-teal/10 hover:text-cognitive-teal"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="https://x.com/AsifAshiqRana1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-soft-grey transition-all duration-200 hover:border-cognitive-teal/40 hover:bg-cognitive-teal/10 hover:text-cognitive-teal"
                    aria-label="X (Twitter)"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href="https://pixelettetech.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-soft-grey transition-all duration-200 hover:border-cognitive-teal/40 hover:bg-cognitive-teal/10 hover:text-cognitive-teal"
                    aria-label="Website"
                  >
                    <Globe className="h-4 w-4" />
                  </a>
                </div>

                <p className="body-default mb-6">
                  Asif Hussain Rana is the founder and CEO of MetaBrain Lab. With a
                  background spanning AI systems, enterprise technology, and
                  cognitive science research, he identified the critical gap
                  between accelerating machine intelligence and static human
                  cognition. He founded MetaBrain Lab to build the
                  infrastructure required to close that gap — responsibly,
                  ethically, and at scale.
                </p>

                <div className="mb-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cognitive-teal" />
                    <span className="body-default">Founder &amp; CEO of Pixelette Technologies</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cognitive-teal" />
                    <span className="body-default">Deep expertise in AI systems and enterprise-grade software
                    delivery</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cognitive-teal" />
                    <span className="body-default">Research interest in neuroscience-AI convergence and
                    cognitive enhancement</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cognitive-teal" />
                    <span className="body-default">Committed to governance-first development of human
                    augmentation technologies</span>
                  </div>
                </div>

                <blockquote className="border-l-2 border-cognitive-teal/40 pl-6">
                  <p className="body-default italic text-soft-grey">
                    &ldquo;MetaBrain Lab is not a side project. It is the
                    defining mission of my career. We are not building a company
                    — we are building the infrastructure for humanity&#39;s
                    cognitive future.&rdquo;
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* ── Section 4: Governance ── */}
      <Section background="secondary">
        <ScrollReveal>
          <SectionHeading title="Governance" />

          <p className="body-large mx-auto mb-12 max-w-3xl">
            MetaBrain Lab is assembling institutional-grade governance to ensure
            our work meets the highest standards of scientific rigour and ethical
            responsibility. These oversight bodies are being established as part
            of the Phase I programme; specific board members will be announced as
            appointments are confirmed.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {governanceBoards.map((board, index) => (
            <ScrollReveal key={board.title} delay={index * 0.1}>
              <div className="h-full rounded-xl border border-white/5 bg-neural-slate p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cognitive-teal/10">
                  <board.icon
                    className="h-6 w-6 text-cognitive-teal"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="heading-card mb-3">{board.title}</h3>
                <p className="body-default">{board.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* ── Section 5: Global Operations ── */}
      <Section background="primary">
        <ScrollReveal>
          <SectionHeading title="Global Operations" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="h-full rounded-xl border border-white/5 bg-neural-slate p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cognitive-teal/10">
                <Globe className="h-6 w-6 text-cognitive-teal" strokeWidth={1.5} />
              </div>
              <h3 className="heading-card mb-4">
                UK Headquarters
                <span className="ml-2 text-base font-normal text-soft-grey">
                  (London)
                </span>
              </h3>
              <p className="body-default">
                Corporate leadership, governance, regulatory affairs, clinical
                oversight, and institutional partnerships.
              </p>
            </div>

            <div className="h-full rounded-xl border border-white/5 bg-neural-slate p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cognitive-teal/10">
                <Code className="h-6 w-6 text-cognitive-teal" strokeWidth={1.5} />
              </div>
              <h3 className="heading-card mb-4">
                Pakistan R&amp;D Centre
                <span className="ml-2 text-base font-normal text-soft-grey">
                  (Lahore/Islamabad)
                </span>
              </h3>
              <p className="body-default">
                Core research and development, engineering, AI development, and
                prototype validation — delivered through Pixelette Technologies
                (related party; see below).
              </p>
            </div>
          </div>

          <p className="body-large mt-12 text-center">
            This structure provides governance credibility with execution
            efficiency.
          </p>
        </ScrollReveal>
      </Section>

      {/* ── Section 6: Related-Party Disclosure ── */}
      <Section background="secondary">
        <ScrollReveal>
          <SectionHeading title="Related-Party Disclosure" />

          <div className="mx-auto max-w-3xl space-y-6">
            <p className="body-default">
              MetaBrain Lab Ltd engages Pixelette Technologies Ltd for research
              and development execution services. Pixelette Technologies is a
              related party: both entities share common founding leadership. Mr
              Asif Hussain Rana serves as Founder &amp; CEO of MetaBrain Lab and is
              also the founder of Pixelette Technologies.
            </p>
            <p className="body-default">
              All related-party transactions are conducted at arm&apos;s-length
              terms and subject to independent board review. All intellectual
              property developed under MetaBrain Lab research programmes is
              formally assigned to MetaBrain Lab Ltd. A detailed related-party
              transaction register is maintained and available to investors upon
              request.
            </p>
          </div>
        </ScrollReveal>
      </Section>

      <PageCTA
        heading="Engage With Us"
        description="We welcome institutional partners, investors, and scientific collaborators who share our commitment to responsible cognitive enhancement."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="View Open Positions"
        secondaryHref="/careers"
      />
    </>
  );
}
