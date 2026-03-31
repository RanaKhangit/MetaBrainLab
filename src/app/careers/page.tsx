import type { Metadata } from "next";
import {
  Heart,
  FlaskConical,
  Globe,
  Telescope,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/features/scroll-reveal";
import { PageCTA } from "@/components/shared/page-cta";

export const metadata: Metadata = {
  title: "Research Positions — MetaBrain Lab",
  description:
    "Join MetaBrain Lab. We are building a founding research team to develop cognitive enhancement infrastructure.",
};

const valuePropositions = [
  {
    icon: Heart,
    title: "Meaningful Work",
    description:
      "Work on one of the most important challenges of our time \u2014 enhancing human capability in the age of AI.",
  },
  {
    icon: FlaskConical,
    title: "Scientific Rigour",
    description:
      "We do things properly. Pre-registered studies. Peer review. No shortcuts.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description:
      "UK headquarters, Pakistan R&D, global ambition. Build technology that matters.",
  },
  {
    icon: Telescope,
    title: "Long-Term Orientation",
    description:
      "Building for decades, not quarters. Research timelines, not product sprints.",
  },
];

const positionCategories = [
  {
    category: "Neuroscience & Research",
    positions: [
      "Computational Neuroscientist",
      "Cognitive Scientist",
      "Research Scientist (Memory & Learning)",
    ],
  },
  {
    category: "AI & Engineering",
    positions: [
      "Machine Learning Engineer",
      "AI Research Scientist",
      "Software Engineer (Platform)",
      "Hardware Engineer (Neural Interfaces)",
    ],
  },
  {
    category: "Clinical & Regulatory",
    positions: [
      "Clinical Research Manager",
      "Regulatory Affairs Specialist",
    ],
  },
  {
    category: "Operations",
    positions: ["Chief of Staff", "Operations Manager"],
  },
];

const applicationItems = [
  "Your CV",
  "A brief note explaining why MetaBrain Lab interests you",
  "Any relevant publications, projects, or portfolio materials",
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        title="Research Positions"
        subtitle="We are building a founding research team to develop cognitive enhancement infrastructure."
        authorityTag="RESEARCH POSITIONS — JOIN THE MISSION"
      />

      {/* -- Section 1: Why MetaBrain Lab -- */}
      <Section background="primary">
        <ScrollReveal>
          <SectionHeading title="Why MetaBrain Lab" />

          <div className="mx-auto max-w-3xl space-y-6 mb-16">
            <p className="body-large">
              MetaBrain Lab is building foundational infrastructure for
              cognitive enhancement &mdash; integrated systems designed to
              measurably improve human memory, learning, focus, and
              decision-making.
            </p>
            <p className="body-large">
              We are recruiting a founding research team for a multi-decade
              programme. Positions offer equity participation, competitive
              compensation, and the opportunity to shape a new field from its
              earliest stage. We value rigour, intellectual honesty, and the
              patience to build responsibly.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {valuePropositions.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.1}>
              <div className="h-full rounded-xl border border-white/5 bg-neural-slate p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cognitive-teal/10">
                  <item.icon className="h-6 w-6 text-cognitive-teal" strokeWidth={1.5} />
                </div>
                <h3 className="heading-card mb-3">{item.title}</h3>
                <p className="body-default">{item.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* -- Section 2: Open Positions -- */}
      <Section background="secondary">
        <ScrollReveal>
          <SectionHeading title="Open Positions" />

          <p className="body-large mx-auto mb-12 max-w-3xl">
            We are actively recruiting across multiple functions. Current
            priority areas:
          </p>
        </ScrollReveal>

        <div className="mx-auto max-w-3xl space-y-12">
          {positionCategories.map((group, index) => (
            <ScrollReveal key={group.category} delay={index * 0.1}>
              <div>
                <h3 className="heading-card text-cognitive-teal mb-4">
                  {group.category}
                </h3>
                <div className="space-y-3">
                  {group.positions.map((position) => (
                    <div key={position} className="flex items-start gap-3">
                      <Briefcase className="mt-1 h-5 w-5 shrink-0 text-cognitive-teal" />
                      <span className="body-default text-soft-grey">{position}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}

          <ScrollReveal delay={positionCategories.length * 0.1}>
            <div>
              <h3 className="heading-card text-cognitive-teal mb-4">
                Scientific Leadership
              </h3>
              <p className="body-default italic text-soft-grey">
                We are in discussions for a Founding Chief Scientific Officer.
                Exceptional candidates should contact us directly.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </Section>

      {/* -- Section 3: How to Apply -- */}
      <Section background="primary">
        <ScrollReveal>
          <SectionHeading title="How to Apply" />

          <div className="mx-auto max-w-3xl space-y-6">
            <p className="body-large">
              To apply for any position, please send:
            </p>

            <div className="space-y-3">
              {applicationItems.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cognitive-teal" />
                  <span className="body-default text-soft-grey">{item}</span>
                </div>
              ))}
            </div>

            <p className="body-large pt-4">
              Email:{" "}
              <a
                href="mailto:careers@metabrainlab.com"
                className="text-cognitive-teal hover:text-accent-hover transition"
              >
                careers@metabrainlab.com
              </a>
            </p>

            <p className="body-large">
              We review every application. If there is a potential fit, we will
              be in touch.
            </p>
          </div>
        </ScrollReveal>
      </Section>

      <PageCTA
        heading="Apply Now"
        description="Send your CV, a brief note explaining your interest, and any relevant publications or portfolio materials."
        primaryLabel="Email careers@metabrainlab.com"
        primaryHref="mailto:careers@metabrainlab.com"
        secondaryLabel="General Enquiry"
        secondaryHref="/contact"
      />
    </>
  );
}
