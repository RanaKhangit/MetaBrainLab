import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { ScrollReveal } from "@/components/features/scroll-reveal";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "MetaBrain Lab Terms of Use. Conditions governing your use of our website and services.",
};

const lastUpdated = "20 February 2026";

const sections = [
  {
    title: "1. Introduction",
    content: `These Terms of Use ("Terms") govern your access to and use of the MetaBrain Lab website at metabrainlab.com ("the Site"), operated by MetaBrain Lab Ltd ("MetaBrain Lab", "we", "us", or "our"), a company registered in the United Kingdom. By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, you should not use the Site.`,
  },
  {
    title: "2. Use of the Site",
    content: `You may use the Site for lawful purposes only. You agree not to:

• Use the Site in any way that violates applicable laws or regulations.
• Attempt to gain unauthorised access to any part of the Site, its servers, or any connected systems.
• Use automated tools to scrape, crawl, or extract data from the Site without our prior written consent.
• Interfere with or disrupt the integrity or performance of the Site.`,
  },
  {
    title: "3. Intellectual Property",
    content: `All content on the Site — including text, graphics, logos, images, software, and design — is the property of MetaBrain Lab Ltd or its licensors and is protected by UK and international copyright, trademark, and intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content on the Site without our prior written permission.`,
  },
  {
    title: "4. Investor Portal Access",
    content: `Access to the Investor Portal is restricted to authorised individuals who have been provided with valid access codes. By accessing the Investor Portal, you agree to:

• Maintain the confidentiality of any materials, documents, or information accessed.
• Not share, distribute, or disclose any investor materials to third parties without prior written consent.
• Comply with any additional terms, including non-disclosure agreements, presented at the time of access.

MetaBrain Lab reserves the right to revoke access at any time without notice.`,
  },
  {
    title: "5. Disclaimer",
    content: `The information on the Site is provided for general informational purposes only. MetaBrain Lab is a pre-revenue research and development company. Nothing on the Site constitutes:

• Medical advice or a recommendation for any treatment.
• A guaranteed investment return or financial advice.
• A binding commitment to deliver any specific product, service, or result.

We make reasonable efforts to ensure the accuracy of information on the Site but make no warranties or representations, express or implied, as to its completeness, accuracy, or reliability.`,
  },
  {
    title: "6. Limitation of Liability",
    content: `To the fullest extent permitted by law, MetaBrain Lab shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to your use of the Site. Our total liability to you for any claim arising from or related to the Site shall not exceed the amount you paid to access the Site (if any). Nothing in these Terms excludes or limits liability for death, personal injury caused by negligence, fraud, or any other liability that cannot be excluded by law.`,
  },
  {
    title: "7. Third-Party Links",
    content: `The Site may contain links to external websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of third-party sites. Accessing linked sites is at your own risk.`,
  },
  {
    title: "8. Changes to These Terms",
    content: `We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated "Last updated" date. Your continued use of the Site following any changes constitutes acceptance of the revised Terms.`,
  },
  {
    title: "9. Governing Law",
    content: `These Terms are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from or related to these Terms or your use of the Site shall be subject to the exclusive jurisdiction of the courts of England and Wales.`,
  },
  {
    title: "10. Contact",
    content: `For any questions about these Terms of Use, contact us at:

MetaBrain Lab Ltd
Email: contact@metabrainlab.com
United Kingdom`,
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms of Use" subtitle={`Last updated: ${lastUpdated}`} />

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
