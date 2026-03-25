"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";

export default function InvestorAccessPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!code.trim()) {
      setError("Please enter your access code.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/investor/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim().toUpperCase() }),
      });

      const data = await res.json();

      if (res.ok && data.valid) {
        window.location.href = "/investor-access/portal";
      } else {
        setError(data.error || "Invalid code. Please check and try again.");
      }
    } catch {
      setError(
        "Service temporarily unavailable. Please contact investors@metabrainlabs.com"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-sovereign-navy px-4 pt-[72px]">
      <div className="relative w-full max-w-md">
        {/* Subtle radial glow behind the card */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(45, 212, 191, 0.08) 0%, transparent 70%)",
          }}
        />
        {/* Access card */}
        <div className="rounded-xl border border-white/10 bg-neural-slate p-8">
          <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-cognitive-teal" />
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-surface">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-cognitive-teal">
              <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          <h1 className="heading-section mb-2 text-center">Investor Access</h1>

          <p className="body-default mb-8 text-center">
            This portal provides access to detailed investment materials for
            MetaBrain Labs.
          </p>
          <p className="body-default mb-8 text-center">
            Access is restricted to qualified investors who have received an
            access code.
          </p>

          <form onSubmit={handleSubmit}>
            <label
              htmlFor="access-code"
              className="mb-2 block text-sm font-medium text-pure-light"
            >
              Enter Access Code
            </label>
            <input
              id="access-code"
              type="text"
              required
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setError("");
              }}
              placeholder="MBL-X-XXXX"
              className="w-full rounded-lg border border-white/10 bg-surface px-4 py-3 text-center font-mono text-lg tracking-widest text-pure-light placeholder:text-text-muted focus:border-cognitive-teal focus:outline-none transition uppercase"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-cognitive-teal py-3 font-medium text-sovereign-navy transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cognitive-teal/25 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Access Portal"
              )}
            </button>

            {error && (
              <div className="mt-3 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">
                <p className="text-center text-sm text-red-400">{error}</p>
              </div>
            )}
          </form>
        </div>

        {/* Below card note */}
        <p className="mt-8 text-center text-sm text-soft-grey">
          If you are an investor and have not received a code, please contact us
          at{" "}
          <a
            href="mailto:investors@metabrainlabs.com"
            className="text-cognitive-teal transition hover:text-accent-hover"
          >
            investors@metabrainlabs.com
          </a>
        </p>

        <p className="mt-6 text-center text-[11px] leading-relaxed text-text-muted max-w-md">
          This communication has not been approved by an authorised person
          within the meaning of the Financial Services and Markets Act 2000.
          Materials within this portal are directed only at investment
          professionals and high net worth individuals. Investment in
          early-stage companies carries substantial risk, including total loss
          of capital.
        </p>
      </div>
    </div>
  );
}
