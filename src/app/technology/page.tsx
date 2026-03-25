import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/features/scroll-reveal";
import { PageCTA } from "@/components/shared/page-cta";
import {
  Radio,
  Cpu,
  Brain,
  Rocket,
  Shield,
  BookOpen,
  Focus,
  Target,
  Lightbulb,
} from "lucide-react";

export const metadata: Metadata = {
  title: "The MetaBrain Platform — Cognitive Enhancement Infrastructure",
  description:
    "Five integrated technology layers for cognitive enhancement: neural acquisition, signal processing, adaptive AI, learning acceleration, and sovereign identity.",
};

const technologyLayers = [
  {
    number: "01",
    title: "Neural Signal Acquisition",
    description:
      "Designed for high-fidelity capture of cognitive signals through multi-modal sensor arrays (EEG, fNIRS, physiological markers), targeting research-grade accuracy outside laboratory settings.",
    icon: Radio,
  },
  {
    number: "02",
    title: "Cognitive Signal Processing",
    description:
      "Signal processing pipeline designed to transform raw neural data into structured cognitive events — artifact removal, feature extraction, and cognitive state classification within closed-loop latency requirements.",
    icon: Cpu,
  },
  {
    number: "03",
    title: "MetaBrain Cognitive Engine",
    description:
      "A hybrid neuro-symbolic AI architecture designed to learn individual cognitive patterns over time, combining neural network pattern recognition with symbolic reasoning for explainable, auditable enhancement.",
    icon: Brain,
  },
  {
    number: "04",
    title: "Learning Acceleration Engine",
    description:
      "Designed to transform enhanced cognitive states into measurable performance improvements — targeting memory encoding, learning acceleration, focus optimisation, and decision-making clarity.",
    icon: Rocket,
  },
  {
    number: "05",
    title: "Blockchain Neural Identity (BNID)",
    description:
      "Decentralised cognitive identity architecture designed to ensure absolute user ownership of all cognitive data through zero-knowledge proofs and post-quantum cryptographic security.",
    icon: Shield,
  },
];

const enhancementDomains = [
  {
    title: "Memory",
    description:
      "Targeting stronger encoding, faster recall, and deeper retention through AI-optimised consolidation support.",
    icon: Brain,
  },
  {
    title: "Learning",
    description:
      "Targeting accelerated skill acquisition and compressed timelines for languages, technical skills, and professional development.",
    icon: BookOpen,
  },
  {
    title: "Focus",
    description:
      "Targeting extended attention and reduced distraction through real-time neurofeedback for cognitive control.",
    icon: Focus,
  },
  {
    title: "Decision-Making",
    description:
      "Targeting clarity under complexity through cognitive load management and bias reduction.",
    icon: Target,
  },
  {
    title: "Resilience",
    description:
      "Targeting stress optimisation, emotional regulation, and sustained performance under pressure.",
    icon: Shield,
  },
  {
    title: "Creativity",
    description:
      "Targeting enhanced pattern recognition, novel connections, and expanded cognitive flexibility.",
    icon: Lightbulb,
  },
];

const cycleSteps = ["Measure", "Process", "Analyse", "Enhance", "Measure"];

export default function TechnologyPage() {
  return (
    <>
      <PageHeader
        title="The Platform"
        subtitle="Five integrated technology layers for cognitive enhancement."
        authorityTag="PLATFORM ARCHITECTURE — COGNITIVE SYSTEMS"
      />

      {/* Section 1: Architecture Overview */}
      <Section background="primary">
        <ScrollReveal>
          <SectionHeading title="Platform Architecture" />

          <div className="mx-auto max-w-3xl space-y-6">
            <p className="body-large">
              MetaBrain is being designed as a full-stack cognitive enhancement
              platform integrating hardware, software, AI, and identity in a
              closed-loop architecture.
            </p>
            <p className="body-large">
              The platform is designed to measure cognitive state, process that
              information in real-time, deliver targeted interventions, and
              measure the effect — continuously optimising enhancement for each
              individual user. The architecture described here represents the
              company&apos;s design intent; specific capabilities will be
              validated through the Phase I research programme.
            </p>
          </div>
        </ScrollReveal>
      </Section>

      {/* Section 2: Five Technology Layers */}
      <Section background="secondary">
        <ScrollReveal>
          <SectionHeading title="Five Technology Layers" />
        </ScrollReveal>

        <div className="mx-auto max-w-3xl">
          {technologyLayers.map((layer, index) => (
            <div key={layer.number}>
              <ScrollReveal delay={index * 0.1}>
                <div className="flex gap-6 rounded-xl border border-white/5 bg-neural-slate p-6">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cognitive-teal/10">
                      <layer.icon className="h-6 w-6 text-cognitive-teal" />
                    </div>
                  </div>
                  <div>
                    <span className="font-mono text-xs text-cognitive-teal">
                      {layer.number}
                    </span>
                    <h3 className="heading-card mb-2">{layer.title}</h3>
                    <p className="body-default">{layer.description}</p>
                  </div>
                </div>
              </ScrollReveal>

              {index < technologyLayers.length - 1 && (
                <div className="flex justify-start pl-12">
                  <div className="h-10 w-0.5 bg-cognitive-teal/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Section 3: Enhancement Domains */}
      <Section background="primary">
        <ScrollReveal>
          <SectionHeading title="Enhancement Domains" />
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {enhancementDomains.map((domain, index) => (
            <ScrollReveal key={domain.title} delay={index * 0.1}>
              <div className="h-full rounded-xl border border-white/5 bg-neural-slate p-6 transition hover:-translate-y-1 hover:border-cognitive-teal/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cognitive-teal/10 mb-4">
                  <domain.icon className="h-6 w-6 text-cognitive-teal" />
                </div>
                <h3 className="heading-card mb-3">{domain.title}</h3>
                <p className="body-default">{domain.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* Section 4: Closed-Loop Enhancement */}
      <Section background="secondary">
        <ScrollReveal>
          <SectionHeading title="Closed-Loop Enhancement" />

          <div className="mx-auto max-w-3xl space-y-10">
            <p className="body-large">
              The MetaBrain platform is designed to operate as a continuous
              closed loop:
            </p>

            {/* Cycle Diagram — horizontal on desktop, vertical on mobile */}
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-0">
              {cycleSteps.map((step, index) => (
                <div
                  key={`${step}-${index}`}
                  className="flex items-center gap-3 sm:flex-row"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-cognitive-teal text-sm font-semibold text-sovereign-navy">
                    {step}
                  </div>

                  {index < cycleSteps.length - 1 && (
                    <>
                      {/* Arrow — vertical on mobile, horizontal on desktop */}
                      <svg
                        className="h-6 w-6 text-cognitive-teal/60 sm:hidden"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 5v14m0 0l-4-4m4 4l4-4"
                        />
                      </svg>
                      <svg
                        className="hidden h-6 w-6 text-cognitive-teal/60 sm:block"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14m0 0l-4-4m4 4l-4 4"
                        />
                      </svg>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <p className="body-large">
                The system is designed so that real-time neural state detection
                triggers precisely timed interventions. The effect is measured
                immediately, and the model adapts. Each session is intended to
                improve the cognitive profile. Each interaction makes the
                platform more accurate.
              </p>
              <p className="body-large">
                This is not intended as static software — it is infrastructure
                designed to evolve with every user interaction.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      <PageCTA
        heading="Explore Further"
        description="Discover the scientific foundation behind our platform architecture, or connect with our team to discuss collaboration."
        primaryLabel="View the Science"
        primaryHref="/science"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
