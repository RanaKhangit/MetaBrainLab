"use client";

import { useEffect, useState } from "react";
import { FileText, Download, Lock, Calendar } from "lucide-react";
import { Container } from "@/components/layout/container";
import type { InvestorDocument } from "@/lib/documents";

interface SessionData {
  authenticated: boolean;
  tier: "A" | "B" | "C";
  investorName: string;
}

const tierLabels: Record<string, string> = {
  A: "Standard Investor",
  B: "Trusted Investor",
  C: "Inner Circle",
};

export default function InvestorPortalPage() {
  const [session, setSession] = useState<SessionData | null>(null);
  const [documents, setDocuments] = useState<InvestorDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      try {
        const res = await fetch("/api/investor/session");
        if (!res.ok) {
          window.location.href = "/investor-access";
          return;
        }
        const data = await res.json();
        setSession(data);

        // Load documents based on tier
        const { getDocumentsForTier } = await import("@/lib/documents");
        setDocuments(getDocumentsForTier(data.tier));
      } catch {
        window.location.href = "/investor-access";
      } finally {
        setLoading(false);
      }
    }
    loadSession();
  }, []);

  const [downloadError, setDownloadError] = useState<string | null>(null);

  async function handleDownload(docId: string) {
    setDownloadError(null);
    try {
      const res = await fetch(`/api/investor/document?id=${docId}`);
      if (!res.ok) {
        const data = await res.json();
        setDownloadError(data.error || "Unable to access document.");
        return;
      }
      const data = await res.json();

      // Verify the file exists before opening a new tab
      const fileCheck = await fetch(data.url, { method: "HEAD" });
      if (!fileCheck.ok) {
        setDownloadError(
          "This document has not been uploaded yet. Please contact investors@metabrainlab.com for access."
        );
        return;
      }

      window.open(data.url, "_blank");
    } catch {
      setDownloadError("Unable to download document. Please try again.");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-sovereign-navy flex items-center justify-center pt-[72px]">
        <div className="text-soft-grey">Loading portal...</div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-sovereign-navy pt-[72px]">
      <Container>
        <div className="py-16">
          {/* Header */}
          <div className="mb-12">
            <h1 className="heading-section mb-2">Investor Portal</h1>
            <p className="body-large">
              Welcome, {session.investorName}. Access level:{" "}
              <span className="text-cognitive-teal">
                Tier {session.tier} — {tierLabels[session.tier]}
              </span>
            </p>
          </div>

          {/* Confidentiality Notice */}
          <div className="mb-12 rounded-xl border border-cognitive-teal/20 bg-cognitive-teal/5 p-6">
            <p className="text-sm text-soft-grey">
              <strong className="text-pure-light">Confidential.</strong> The
              materials in this portal are confidential and intended solely for
              the named recipient. Do not distribute, copy, or share without
              written authorisation from MetaBrain Lab.
            </p>
          </div>

          {/* Document Grid */}
          <h2 className="heading-card mb-6">Available Documents</h2>

          {downloadError && (
            <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
              <p className="text-sm text-red-400">{downloadError}</p>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="rounded-xl border border-white/5 bg-neural-slate p-6 transition-all hover:border-cognitive-teal/30"
              >
                <div className="flex items-start justify-between mb-4">
                  <FileText className="text-cognitive-teal" size={24} />
                  <span className="rounded-full bg-surface px-3 py-1 text-xs text-soft-grey">
                    {doc.format}
                  </span>
                </div>
                <h3 className="font-serif text-lg text-pure-light mb-2">
                  {doc.title}
                </h3>
                <p className="text-sm text-soft-grey mb-4">{doc.description}</p>
                {doc.available ? (
                  <button
                    onClick={() => handleDownload(doc.id)}
                    className="inline-flex items-center gap-2 rounded-lg bg-cognitive-teal px-4 py-2 text-sm font-medium text-sovereign-navy transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cognitive-teal/25"
                  >
                    <Download size={16} />
                    Download
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-text-muted">
                    <Calendar size={16} />
                    Coming Soon
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Additional Materials */}
          {session.tier !== "C" && (
            <div className="mt-16">
              <h2 className="heading-card mb-4">Additional Materials</h2>
              <div className="rounded-xl border border-white/5 bg-neural-slate p-6">
                <p className="body-default mb-4">
                  The following materials are available under NDA. To request
                  access, please contact us.
                </p>
                <div className="space-y-2 text-sm text-soft-grey">
                  <div className="flex items-center gap-2">
                    <Lock size={14} className="text-text-muted" />
                    Full Investment Prospectus
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock size={14} className="text-text-muted" />
                    Technical Architecture Document
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock size={14} className="text-text-muted" />
                    Detailed Financial Model
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock size={14} className="text-text-muted" />
                    IP Portfolio Summary
                  </div>
                </div>
                <a
                  href="mailto:investors@metabrainlab.com"
                  className="mt-4 inline-block text-sm text-cognitive-teal hover:text-accent-hover transition-colors"
                >
                  Contact investors@metabrainlab.com
                </a>
              </div>
            </div>
          )}

          {/* Schedule Meeting */}
          <div className="mt-16 text-center">
            <h2 className="heading-card mb-4">Schedule a Discussion</h2>
            <p className="body-default mb-6">
              If you would like to discuss the investment opportunity directly,
              please request a meeting.
            </p>
            <a
              href="mailto:investors@metabrainlab.com?subject=Meeting%20Request"
              className="inline-flex items-center gap-2 rounded-lg bg-cognitive-teal px-6 py-3 text-sm font-medium text-sovereign-navy transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cognitive-teal/25"
            >
              Request Meeting
            </a>
          </div>

          {/* FCA Disclaimer */}
          <div className="mt-16 rounded-xl border border-white/5 bg-surface p-6">
            <p className="text-xs leading-relaxed text-text-muted">
              <strong className="text-soft-grey">Important Notice:</strong> This
              document has not been approved by an authorised person within the
              meaning of the Financial Services and Markets Act 2000 (FSMA).
              This communication is exempt from the general restriction in
              section 21 FSMA on the grounds that it is made only to and
              directed at persons who are investment professionals falling
              within article 19(5) of the Financial Services and Markets Act
              2000 (Financial Promotion) Order 2005, or high net worth
              companies and unincorporated associations falling within article
              49(2)(a) to (d) of the Order. MetaBrain Lab Ltd is a
              pre-revenue, early-stage company. Investment carries substantial
              risk, including the risk of total loss of capital. Prospective
              investors should seek independent financial, legal, and tax
              advice.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
