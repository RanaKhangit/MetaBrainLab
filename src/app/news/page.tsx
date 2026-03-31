"use client";

import { useState, type FormEvent } from "react";
import { Calendar, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/features/scroll-reveal";

const newsItems = [
  {
    date: "February 2026",
    title: "Investor Documentation Published",
    summary:
      "MetaBrain Lab has published its v1.0 investor document suite, including Executive Summary, Investor Pitch Deck, Technology Overview, and Financial Summary. Documents are available through the investor portal to qualified investors.",
  },
  {
    date: "February 2026",
    title: "Governance Framework Announced",
    summary:
      "MetaBrain Lab has announced its four-body governance framework: Scientific Advisory Board, Ethics & Neurorights Council, Clinical Oversight Committee, and Security & Identity Board. Board appointments are in progress and will be announced as they are confirmed.",
  },
  {
    date: "February 2026",
    title: "MetaBrain Lab Launches New Website",
    summary:
      "We are pleased to announce the launch of our new website, providing comprehensive information about our mission, technology, and approach to cognitive enhancement.",
  },
  {
    date: "February 2026",
    title: "Chief Scientific Officer Search Initiated",
    summary:
      "MetaBrain Lab has begun the search for a Founding Chief Scientific Officer to lead the Phase I research programme. The role requires senior neuroscience leadership experience and published research credentials.",
  },
];

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Subscription failed. Please try again.");
      setSubmitted(true);
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg text-center">
      <SectionHeading title="Stay Updated" align="center" />

      <p className="body-default mb-8">
        Stay informed about MetaBrain Lab developments. Subscribe to our
        newsletter for occasional updates on our progress.
      </p>

      {submitted ? (
        <div className="rounded-lg border border-cognitive-teal/20 bg-cognitive-teal/10 px-6 py-4">
          <p className="text-sm font-medium text-cognitive-teal">
            Thank you for subscribing. We will be in touch.
          </p>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              autoComplete="email"
              className="flex-1 rounded-lg border border-white/10 bg-surface px-4 py-3 text-pure-light placeholder:text-text-muted focus:border-cognitive-teal focus:outline-none transition"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-lg bg-cognitive-teal px-6 py-3 font-medium text-sovereign-navy hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cognitive-teal/25 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {error && (
            <div className="mt-3 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
        </>
      )}

      <p className="mt-4 text-xs text-text-muted">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
}

export default function NewsPage() {
  return (
    <>
      <PageHeader
        title="News & Updates"
        subtitle="Latest developments from MetaBrain Lab."
      />

      {/* ── Section 1: News Items ── */}
      <Section background="primary">
        <SectionHeading title="Latest News" />

        <div className="grid grid-cols-1 gap-8">
          {newsItems.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.1}>
              <article className="h-full rounded-xl border border-white/5 bg-neural-slate p-8 transition hover:border-cognitive-teal/30">
                <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-text-muted">
                  <Calendar className="h-4 w-4 text-cognitive-teal" />
                  {item.date}
                </div>
                <h3 className="heading-card mb-3">{item.title}</h3>
                <p className="body-default">{item.summary}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <p className="body-secondary mt-8 text-center">
          Additional announcements will be published as developments are confirmed.
        </p>
      </Section>

      {/* ── Section 2: Newsletter Signup ── */}
      <Section background="secondary">
        <ScrollReveal>
          <NewsletterForm />
        </ScrollReveal>
      </Section>
    </>
  );
}
