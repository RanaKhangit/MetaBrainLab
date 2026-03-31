import type { Metadata } from "next";
import {
  Shield,
  Brain,
  Lock,
  Eye,
  Users,
  FlaskConical,
  Scale,
  Stethoscope,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/features/scroll-reveal";
import { PageCTA } from "@/components/shared/page-cta";

export const metadata: Metadata = {
  title: "Ethics & Governance \u2014 MetaBrain Lab Principles",
  description:
    "At MetaBrain Lab, ethics is not compliance. It is architecture. Learn about our governance framework and neurorights commitments.",
};

const corePrinciples = [
  {
    icon: Shield,
    title: "Cognitive Autonomy",
    description:
      "Users control their own enhancement. No external entity can override user agency. Enhancement is always opt-in, never coerced.",
  },
  {
    icon: Brain,
    title: "Mental Integrity",
    description:
      "We protect the sanctity of the mind. No coercion, manipulation, or involuntary cognitive modification. Ever.",
  },
  {
    icon: Lock,
    title: "Neural Privacy",
    description:
      "Cognitive data is owned absolutely by the individual. We do not access, store, or share cognitive data without cryptographic user consent.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "We are explicit about capabilities, limitations, and uncertainties. We do not overstate. We do not mislead.",
  },
  {
    icon: Users,
    title: "Independent Oversight",
    description:
      "Governance bodies being assembled with genuine authority \u2014 designed to have real power to challenge, pause, or stop.",
  },
];

const clearBoundaries = [
  "We do not read, record, or store raw thought content",
  "We do not enable cognitive coercion or manipulation",
  "We do not share cognitive data without cryptographic consent",
  "We do not deploy technology without appropriate validation",
  "We do not work with applications involving coercion or lethal autonomy",
  "We do not make claims we cannot substantiate",
];

const governanceBodies = [
  {
    icon: FlaskConical,
    title: "Scientific Advisory Board",
    description:
      "Being assembled to include leaders in neuroscience, AI, and cognitive systems. Will hold authority to review and approve research methodology, validate claims, and challenge assumptions.",
  },
  {
    icon: Scale,
    title: "Ethics & Neurorights Council",
    description:
      "Being assembled as an independent body to oversee cognitive autonomy, mental integrity, and human rights. Will hold authority to halt research or deployment that violates principles.",
  },
  {
    icon: Stethoscope,
    title: "Clinical Oversight Committee",
    description:
      "Being assembled to oversee safety, ethics, and scientific rigour in all human-facing work. Will provide IRB-grade review of all research protocols.",
  },
  {
    icon: ShieldCheck,
    title: "Security & Identity Board",
    description:
      "Being assembled to oversee blockchain architecture, cryptography, and data governance. Will ensure the BNID system delivers on sovereignty commitments.",
  },
];

const neurorights = [
  "The right to cognitive liberty \u2014 freedom of thought and mental self-determination",
  "The right to mental privacy \u2014 protection from unauthorised access to neural data",
  "The right to mental integrity \u2014 protection from harmful manipulation of brain activity",
  "The right to psychological continuity \u2014 preservation of personal identity and sense of self",
];

const regulatoryItems = [
  "Engaging regulators early, not after the fact",
  "Designing for compliance from the architecture level",
  "Exceeding minimum requirements wherever possible",
  "Publishing methodology openly for scrutiny",
  "Contributing to the development of new regulatory frameworks for cognitive enhancement",
];

export default function EthicsPage() {
  return (
    <>
      <PageHeader
        title="Ethics & Governance"
        subtitle="Ethics is not compliance. It is architecture."
        authorityTag="GOVERNANCE FRAMEWORK — NEURORIGHTS PROTOCOL"
      />

      {/* -- Section 1: Core Principles -- */}
      <Section background="primary">
        <ScrollReveal>
          <SectionHeading title="Core Principles" />

          <div className="mx-auto max-w-3xl space-y-6 mb-16">
            <p className="body-large">
              At MetaBrain Lab, ethics is not a department or a compliance
              function. It is an architectural principle &mdash; built into the
              technical design of everything we create.
            </p>
            <p className="body-large">
              We believe cognitive enhancement technology must be developed with
              the same rigour applied to its science.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {corePrinciples.map((principle, index) => (
            <ScrollReveal key={principle.title} delay={index * 0.1}>
              <div className="h-full rounded-xl border border-white/5 bg-neural-slate p-6 transition hover:-translate-y-1 hover:border-cognitive-teal/30">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cognitive-teal/10">
                  <principle.icon
                    className="h-6 w-6 text-cognitive-teal"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="heading-card mb-3">{principle.title}</h3>
                <p className="body-default">{principle.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* -- Section 2: Clear Boundaries -- */}
      <Section background="secondary">
        <ScrollReveal>
          <SectionHeading title="Clear Boundaries" />

          <div className="mx-auto max-w-3xl space-y-6">
            <p className="body-large">
              Clarity about what we will not do builds trust:
            </p>

            <div className="space-y-3">
              {clearBoundaries.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cognitive-teal" />
                  <span className="body-default text-soft-grey">{item}</span>
                </div>
              ))}
            </div>

            <p className="body-large pt-4">
              These are not policies. They are principles.
            </p>
          </div>
        </ScrollReveal>
      </Section>

      {/* -- Section 3: Governance Framework -- */}
      <Section background="primary">
        <ScrollReveal>
          <SectionHeading title="Governance Framework" />

          <p className="body-large mx-auto mb-12 max-w-3xl">
            MetaBrain Lab is establishing institutional-grade governance with
            four independent oversight bodies. These boards are being assembled
            as part of the Phase I programme; appointments will be announced as
            they are confirmed.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {governanceBodies.map((body, index) => (
            <ScrollReveal key={body.title} delay={index * 0.1}>
              <div className="h-full rounded-xl border border-white/5 bg-neural-slate p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cognitive-teal/10">
                  <body.icon className="h-6 w-6 text-cognitive-teal" strokeWidth={1.5} />
                </div>
                <h3 className="heading-card mb-3">{body.title}</h3>
                <p className="body-default">{body.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* -- Section 4: Neurorights Commitment -- */}
      <Section background="secondary">
        <ScrollReveal>
          <SectionHeading title="Neurorights Commitment" />

          <div className="mx-auto max-w-3xl space-y-6">
            <p className="body-large">
              We support the emerging global framework for neurorights &mdash;
              fundamental protections for the human mind in the age of
              neurotechnology:
            </p>

            <div className="space-y-3">
              {neurorights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cognitive-teal" />
                  <span className="body-default text-soft-grey">{item}</span>
                </div>
              ))}
            </div>

            <p className="body-large pt-4">
              MetaBrain Lab is committed to building technology that protects
              these rights, not technology that threatens them.
            </p>
          </div>
        </ScrollReveal>
      </Section>

      {/* -- Section 5: Regulatory Approach -- */}
      <Section background="primary">
        <ScrollReveal>
          <SectionHeading title="Regulatory Approach" />

          <div className="mx-auto max-w-3xl space-y-6">
            <p className="body-large">
              We work with regulators, not around them.
            </p>

            <div className="space-y-3">
              {regulatoryItems.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cognitive-teal" />
                  <span className="body-default text-soft-grey">{item}</span>
                </div>
              ))}
            </div>

            <p className="body-large pt-4">
              We believe responsible development and commercial success are not
              in conflict. They are aligned.
            </p>
          </div>
        </ScrollReveal>
      </Section>

      <PageCTA
        heading="Learn About Our Science"
        description="Understand the peer-reviewed research foundation that underpins our governance-first approach."
        primaryLabel="View the Science"
        primaryHref="/science"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
