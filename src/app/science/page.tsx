import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/features/scroll-reveal";
import { PageCTA } from "@/components/shared/page-cta";
import {
  Brain,
  Database,
  Focus,
  Zap,
  Sparkles,
  Activity,
  BookOpen,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "The Science — MetaBrain Labs Research Foundation",
  description:
    "MetaBrain Labs' approach is grounded in established neuroscience. Learn about our research foundation and scientific methodology.",
};

const brainSystems = [
  {
    title: "Prefrontal Cortex",
    description: "Decision-making, planning, executive function.",
    icon: Brain,
  },
  {
    title: "Hippocampal Circuits",
    description: "Memory formation and consolidation.",
    icon: Database,
  },
  {
    title: "Attention Networks",
    description: "Focus, concentration, cognitive control.",
    icon: Focus,
  },
  {
    title: "Motor Systems",
    description: "Skill acquisition and procedural learning.",
    icon: Zap,
  },
];

const establishedScience = [
  {
    title: "Neural Plasticity",
    description:
      "The brain physically changes in response to experience and training. This is the foundation of all cognitive enhancement.",
    icon: Sparkles,
  },
  {
    title: "Neurofeedback Efficacy",
    description:
      "Real-time feedback on brain states can train improved attention and self-regulation. Decades of clinical evidence support this.",
    icon: Activity,
  },
  {
    title: "Memory Enhancement",
    description:
      "Targeted interventions — including spaced repetition, state-dependent learning, and consolidation support — demonstrably improve memory.",
    icon: BookOpen,
  },
  {
    title: "Closed-Loop Systems",
    description:
      "Real-time measurement and feedback accelerates skill acquisition and cognitive adaptation.",
    icon: RefreshCw,
  },
];

const approachItems = [
  "Multi-modal neural signal acquisition for comprehensive cognitive state measurement",
  "Real-time processing for closed-loop operation",
  "Adaptive AI that learns individual cognitive profiles",
  "Targeted interventions timed to optimal brain states",
  "Rigorous measurement of outcomes",
];

const doNotClaimItems = [
  "We do not claim to read thoughts — we measure cognitive states",
  "We do not promise superhuman intelligence — we enhance within biological possibility",
  "We do not bypass ethical review — all research meets institutional standards",
  "We do not overstate results — all claims are backed by validated data",
];

const validationItems = [
  "Pre-registered study designs with published protocols",
  "Adequate statistical power and appropriate controls",
  "Open publication of results regardless of outcome",
  "Independent replication before any performance claim",
  "Peer review through established scientific channels",
];

export default function SciencePage() {
  return (
    <>
      <PageHeader
        title="The Science"
        subtitle="Grounded in established neuroscience. Explicit about boundaries."
        authorityTag="RESEARCH FOUNDATION — NEUROSCIENCE"
      />

      {/* Section 1: Research Foundation */}
      <Section background="primary">
        <ScrollReveal>
          <SectionHeading title="Research Foundation" />

          <div className="mx-auto max-w-3xl space-y-6 mb-16">
            <p className="body-large">
              MetaBrain&apos;s approach is grounded in decades of peer-reviewed
              neuroscience research. We work with what science has validated, and
              we are explicit about the boundaries of current knowledge.
            </p>
            <p className="body-large">
              Our work targets well-understood brain systems:
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {brainSystems.map((system, index) => (
            <ScrollReveal key={system.title} delay={index * 0.1}>
              <div className="h-full rounded-xl border border-white/5 bg-neural-slate p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cognitive-teal/10 mb-4">
                  <system.icon className="h-6 w-6 text-cognitive-teal" />
                </div>
                <h3 className="heading-card mb-3">{system.title}</h3>
                <p className="body-default">{system.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* Section 2: What Science Has Established */}
      <Section background="secondary">
        <ScrollReveal>
          <SectionHeading title="What Science Has Established" />
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {establishedScience.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.1}>
              <div className="h-full rounded-xl border border-white/5 bg-neural-slate p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cognitive-teal/10 mb-4">
                  <item.icon className="h-6 w-6 text-cognitive-teal" />
                </div>
                <h3 className="heading-card mb-3">{item.title}</h3>
                <p className="body-default">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* Section 3: Our Approach */}
      <Section background="primary">
        <ScrollReveal>
          <SectionHeading title="Our Approach" />

          <div className="mx-auto max-w-3xl space-y-6">
            <p className="body-large">
              MetaBrain integrates established approaches into a unified
              platform:
            </p>

            <div className="space-y-3">
              {approachItems.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cognitive-teal" />
                  <span className="body-default text-soft-grey">{item}</span>
                </div>
              ))}
            </div>

            <p className="body-large pt-4">
              We claim what evidence supports. We are explicit about what
              remains experimental.
            </p>
          </div>
        </ScrollReveal>
      </Section>

      {/* Section 4: What We Do Not Claim */}
      <Section background="secondary">
        <ScrollReveal>
          <SectionHeading title="What We Do Not Claim" />

          <div className="mx-auto max-w-3xl space-y-6">
            <p className="body-large">
              Scientific credibility requires clarity about boundaries:
            </p>

            <div className="space-y-3">
              {doNotClaimItems.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cognitive-teal" />
                  <span className="body-default text-soft-grey">{item}</span>
                </div>
              ))}
            </div>

            <p className="body-large pt-4">
              We measure cognitive states, not thoughts. We enhance performance
              within biological possibility. We work within established
              neuroscience.
            </p>
          </div>
        </ScrollReveal>
      </Section>

      {/* Section 5: Validation Approach */}
      <Section background="primary">
        <ScrollReveal>
          <SectionHeading title="Validation Approach" />

          <div className="mx-auto max-w-3xl space-y-6">
            <p className="body-large">
              All MetaBrain research follows rigorous scientific standards:
            </p>

            <div className="space-y-3">
              {validationItems.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cognitive-teal" />
                  <span className="body-default text-soft-grey">{item}</span>
                </div>
              ))}
            </div>

            <p className="body-large pt-4">
              If we cannot validate a claim, we do not make it.
            </p>
          </div>
        </ScrollReveal>
      </Section>

      <PageCTA
        heading="Collaborate With Us"
        description="We welcome enquiries from researchers, scientists, and institutions interested in cognitive enhancement research."
        primaryLabel="Scientific Enquiry"
        primaryHref="/contact?tab=scientific"
        secondaryLabel="View Our Technology"
        secondaryHref="/technology"
      />
    </>
  );
}
