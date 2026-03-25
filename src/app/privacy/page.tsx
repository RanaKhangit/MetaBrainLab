import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { ScrollReveal } from "@/components/features/scroll-reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "MetaBrain Labs Privacy Policy. How we collect, use, and protect your personal data.",
};

const lastUpdated = "20 February 2026";

const sections = [
  {
    title: "1. Who We Are",
    content: `MetaBrain Labs Ltd ("MetaBrain Labs", "we", "us", or "our") is a UK-headquartered neuroscience and AI company. We are committed to protecting and respecting your privacy in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. For data protection enquiries, contact us at contact@metabrainlabs.com.`,
  },
  {
    title: "2. Data We Collect",
    content: `When you interact with our website, we may collect the following personal data:

• Contact form submissions: full name, email address, organisation, role/title, country, and any information you include in your message.
• Newsletter subscriptions: email address only.
• Investor access: access codes and session metadata required for authentication.

We do not use cookies for tracking or analytics. We do not collect any biometric, health, or cognitive data through this website.`,
  },
  {
    title: "3. How We Use Your Data",
    content: `We process your personal data for the following purposes:

• To respond to your enquiries (legal basis: legitimate interest).
• To send newsletter updates to subscribers (legal basis: consent).
• To manage investor portal access (legal basis: contractual necessity).

We do not sell, rent, or share your personal data with third parties for marketing purposes.`,
  },
  {
    title: "4. Data Storage and Security",
    content: `Your data is processed and stored securely using industry-standard encryption. We use technical and organisational measures to protect your data against unauthorised access, alteration, or destruction. Access to personal data is restricted to authorised personnel only.`,
  },
  {
    title: "5. Data Retention",
    content: `We retain personal data only for as long as necessary to fulfil the purposes for which it was collected:

• Contact form submissions: up to 24 months, or until you request deletion.
• Newsletter subscriptions: until you unsubscribe.
• Investor session data: for the duration of the authenticated session.`,
  },
  {
    title: "6. Your Rights",
    content: `Under UK GDPR, you have the following rights:

• Right of access: request a copy of the personal data we hold about you.
• Right to rectification: request correction of inaccurate data.
• Right to erasure: request deletion of your personal data.
• Right to restrict processing: request that we limit how we use your data.
• Right to data portability: request your data in a structured, machine-readable format.
• Right to object: object to processing based on legitimate interests.
• Right to withdraw consent: where processing is based on consent, you may withdraw it at any time.

To exercise any of these rights, contact us at contact@metabrainlabs.com. We will respond within 30 days.`,
  },
  {
    title: "7. Third-Party Services",
    content: `This website does not use third-party analytics, advertising, or tracking services. We do not embed social media tracking pixels. External services are limited to those required for core functionality (hosting, email delivery) and are subject to their own privacy policies.`,
  },
  {
    title: "8. International Transfers",
    content: `Where data is processed outside the UK, we ensure appropriate safeguards are in place in accordance with UK GDPR requirements, including standard contractual clauses or adequacy decisions.`,
  },
  {
    title: "9. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date. We encourage you to review this policy periodically.`,
  },
  {
    title: "10. Contact",
    content: `For any questions about this Privacy Policy or your personal data, contact us at:

MetaBrain Labs Ltd
Email: contact@metabrainlabs.com
United Kingdom`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" subtitle={`Last updated: ${lastUpdated}`} />

      <Section background="primary">
        <div className="mx-auto max-w-3xl space-y-12">
          {sections.map((section, index) => (
            <ScrollReveal key={section.title} delay={index * 0.05}>
              <div>
                <h2 className="heading-card mb-4">{section.title}</h2>
                <div className="body-default whitespace-pre-line">{section.content}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>
    </>
  );
}
