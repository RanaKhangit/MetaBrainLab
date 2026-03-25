"use client";

import { useState, Suspense, type FormEvent, type ChangeEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mail, Briefcase, Users, Newspaper, MapPin, FlaskConical, Handshake, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ScrollReveal } from "@/components/features/scroll-reveal";

/* ────────────────────────────────────────────── */
/*  Shared options                                 */
/* ────────────────────────────────────────────── */

const countryOptions = [
  "United Kingdom",
  "United States",
  "UAE",
  "Saudi Arabia",
  "Pakistan",
  "Germany",
  "France",
  "Japan",
  "China",
  "Singapore",
  "India",
  "Australia",
  "Canada",
  "Other",
];

const investmentFocusOptions = [
  "Deep Tech",
  "Neurotech",
  "AI",
  "Sovereign/Government",
  "Other",
];

const areaOfInterestOptions = [
  "Neural Interfaces",
  "Cognitive AI",
  "Neuroscience",
  "Ethics",
  "Blockchain/Security",
  "Other",
];

const partnershipTypeOptions = [
  "Government",
  "Research Institution",
  "Corporate",
  "Strategic",
  "Other",
];

/* ────────────────────────────────────────────── */
/*  Tab types                                      */
/* ────────────────────────────────────────────── */

type TabKey = "investor" | "scientific" | "partnership";

const tabs: { key: TabKey; label: string }[] = [
  { key: "investor", label: "Investor Enquiry" },
  { key: "scientific", label: "Scientific Collaboration" },
  { key: "partnership", label: "Partnership / Government" },
];

/* ────────────────────────────────────────────── */
/*  Reusable form field components                 */
/* ────────────────────────────────────────────── */

const inputClasses =
  "w-full rounded-lg border border-white/10 bg-surface px-4 py-3 text-pure-light placeholder:text-text-muted focus:border-cognitive-teal focus:outline-none transition";

function TextField({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  value,
  onChange,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-pure-light">
        {label}
        {required && <span className="ml-1 text-cognitive-teal">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className={inputClasses}
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  required = false,
  value,
  onChange,
  autoComplete,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-pure-light">
        {label}
        {required && <span className="ml-1 text-cognitive-teal">*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className={inputClasses}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextareaField({
  label,
  name,
  maxLength,
  value,
  onChange,
}: {
  label: string;
  name: string;
  maxLength?: number;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-pure-light">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        className={`${inputClasses} min-h-[120px] resize-y`}
      />
    </div>
  );
}

function ConsentCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        required
        checked={checked}
        onChange={onChange}
        className="mt-1 h-4 w-4 shrink-0 rounded border-white/10 bg-surface accent-cognitive-teal"
      />
      <span className="text-sm text-soft-grey">
        I consent to MetaBrain Labs processing my data to respond to this enquiry in accordance
        with the{" "}
        <Link href="/privacy" className="text-cognitive-teal hover:text-accent-hover underline">
          Privacy Policy
        </Link>.
      </span>
    </label>
  );
}

function FormError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">
      <p className="text-sm text-red-400">{message}</p>
    </div>
  );
}

/* ────────────────────────────────────────────── */
/*  Individual tab forms                           */
/* ────────────────────────────────────────────── */

function InvestorForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    fullName: "",
    organisation: "",
    role: "",
    country: "",
    email: "",
    investmentFocus: "",
    message: "",
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(field: string) {
    return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enquiryType: "investor",
          name: form.fullName,
          email: form.email,
          organisation: form.organisation,
          role: form.role,
          country: form.country,
          investmentFocus: form.investmentFocus,
          message: form.message,
          privacyConsent: form.consent,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed. Please try again.");
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField label="Full Name" name="inv-name" required value={form.fullName} onChange={update("fullName")} autoComplete="name" />
      <TextField label="Organisation" name="inv-org" required value={form.organisation} onChange={update("organisation")} autoComplete="organization" />
      <TextField label="Role / Title" name="inv-role" required value={form.role} onChange={update("role")} autoComplete="organization-title" />
      <SelectField label="Country" name="inv-country" options={countryOptions} value={form.country} onChange={update("country")} autoComplete="country-name" />
      <TextField label="Email" name="inv-email" type="email" required value={form.email} onChange={update("email")} autoComplete="email" />
      <SelectField label="Investment Focus" name="inv-focus" options={investmentFocusOptions} value={form.investmentFocus} onChange={update("investmentFocus")} />
      <TextareaField label="Message (optional)" name="inv-message" maxLength={1000} value={form.message} onChange={update("message")} />
      <ConsentCheckbox checked={form.consent} onChange={(e) => setForm((prev) => ({ ...prev, consent: e.target.checked }))} />
      <FormError message={error} />
      <button
        type="submit"
        disabled={loading}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-cognitive-teal py-3 font-medium text-sovereign-navy transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cognitive-teal/25 disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {loading ? "Submitting..." : "Submit Enquiry"}
      </button>
    </form>
  );
}

function ScientificForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    institution: "",
    academicField: "",
    currentRole: "",
    areaOfInterest: "",
    statement: "",
    profileLink: "",
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(field: string) {
    return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enquiryType: "scientific",
          name: form.fullName,
          email: form.email,
          institution: form.institution,
          field: form.academicField,
          currentRole: form.currentRole,
          areaOfInterest: form.areaOfInterest,
          statement: form.statement,
          cvLink: form.profileLink || undefined,
          privacyConsent: form.consent,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed. Please try again.");
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField label="Full Name" name="sci-name" required value={form.fullName} onChange={update("fullName")} autoComplete="name" />
      <TextField label="Email" name="sci-email" type="email" required value={form.email} onChange={update("email")} autoComplete="email" />
      <TextField label="Institution" name="sci-inst" required value={form.institution} onChange={update("institution")} autoComplete="organization" />
      <TextField label="Academic Field" name="sci-field" required value={form.academicField} onChange={update("academicField")} />
      <TextField label="Current Role" name="sci-role" required value={form.currentRole} onChange={update("currentRole")} autoComplete="organization-title" />
      <SelectField label="Area of Interest" name="sci-interest" options={areaOfInterestOptions} value={form.areaOfInterest} onChange={update("areaOfInterest")} />
      <TextareaField label="Brief Statement of Interest (optional)" name="sci-statement" maxLength={1500} value={form.statement} onChange={update("statement")} />
      <TextField label="CV / Profile Link (optional)" name="sci-link" type="url" value={form.profileLink} onChange={update("profileLink")} placeholder="https://" autoComplete="url" />
      <ConsentCheckbox checked={form.consent} onChange={(e) => setForm((prev) => ({ ...prev, consent: e.target.checked }))} />
      <FormError message={error} />
      <button
        type="submit"
        disabled={loading}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-cognitive-teal py-3 font-medium text-sovereign-navy transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cognitive-teal/25 disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {loading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}

function PartnershipForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    organisation: "",
    country: "",
    partnershipType: "",
    message: "",
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(field: string) {
    return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enquiryType: "partnership",
          name: form.fullName,
          email: form.email,
          organisation: form.organisation,
          country: form.country,
          partnershipType: form.partnershipType,
          message: form.message,
          privacyConsent: form.consent,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed. Please try again.");
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField label="Full Name" name="part-name" required value={form.fullName} onChange={update("fullName")} autoComplete="name" />
      <TextField label="Email" name="part-email" type="email" required value={form.email} onChange={update("email")} autoComplete="email" />
      <TextField label="Organisation" name="part-org" required value={form.organisation} onChange={update("organisation")} autoComplete="organization" />
      <SelectField label="Country" name="part-country" options={countryOptions} value={form.country} onChange={update("country")} autoComplete="country-name" />
      <SelectField label="Partnership Type" name="part-type" options={partnershipTypeOptions} value={form.partnershipType} onChange={update("partnershipType")} />
      <TextareaField label="Message (optional)" name="part-message" maxLength={1000} value={form.message} onChange={update("message")} />
      <ConsentCheckbox checked={form.consent} onChange={(e) => setForm((prev) => ({ ...prev, consent: e.target.checked }))} />
      <FormError message={error} />
      <button
        type="submit"
        disabled={loading}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-cognitive-teal py-3 font-medium text-sovereign-navy transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cognitive-teal/25 disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {loading ? "Submitting..." : "Submit Enquiry"}
      </button>
    </form>
  );
}

/* ────────────────────────────────────────────── */
/*  Contact details data                           */
/* ────────────────────────────────────────────── */

const contactMethods = [
  {
    icon: Mail,
    label: "General Enquiries",
    email: "contact@metabrainlabs.com",
  },
  {
    icon: Briefcase,
    label: "Investment Enquiries",
    email: "investors@metabrainlabs.com",
  },
  {
    icon: Users,
    label: "Careers",
    email: "careers@metabrainlabs.com",
  },
  {
    icon: Newspaper,
    label: "Media",
    email: "media@metabrainlabs.com",
  },
];

const locations = [
  {
    title: "United Kingdom (Headquarters)",
    detail: "London, United Kingdom",
  },
  {
    title: "Pakistan (R&D Centre)",
    detail: "Lahore / Islamabad, Pakistan",
  },
];

/* ────────────────────────────────────────────── */
/*  Page component                                 */
/* ────────────────────────────────────────────── */

export default function ContactPage() {
  return (
    <Suspense>
      <ContactPageContent />
    </Suspense>
  );
}

function ContactPageContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") as TabKey | null;
  const [activeTab, setActiveTab] = useState<TabKey>(
    initialTab && ["investor", "scientific", "partnership"].includes(initialTab)
      ? initialTab
      : "investor"
  );
  const [submitted, setSubmitted] = useState(false);

  function handleSuccess() {
    setSubmitted(true);
  }

  function handleReset() {
    setSubmitted(false);
  }

  return (
    <>
      <PageHeader
        title="Institutional Enquiry"
        subtitle="We welcome enquiries from investors, scientific collaborators, and institutional partners."
      />

      {/* ── Section 1: Contact Forms ── */}
      <Section background="primary">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl">
            {/* Tab navigation */}
            <div className="mb-8 flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const TabIcon =
                  tab.key === "investor"
                    ? Briefcase
                    : tab.key === "scientific"
                      ? FlaskConical
                      : Handshake;
                return (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setActiveTab(tab.key);
                      setSubmitted(false);
                    }}
                    className={`inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-medium transition ${
                      activeTab === tab.key
                        ? "bg-cognitive-teal text-sovereign-navy"
                        : "bg-neural-slate text-soft-grey hover:text-pure-light"
                    }`}
                  >
                    <TabIcon className="mr-2 inline h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Form area */}
            <div className="rounded-xl border border-white/5 bg-neural-slate p-8">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cognitive-teal/10">
                    <Mail className="h-8 w-8 text-cognitive-teal" />
                  </div>
                  <h3 className="heading-card mb-2">Thank You</h3>
                  <p className="body-default mb-6">
                    Your enquiry has been submitted. We will review it and respond within
                    five working days.
                  </p>
                  <button
                    onClick={handleReset}
                    className="text-sm text-cognitive-teal transition hover:text-accent-hover"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <>
                  {activeTab === "investor" && <InvestorForm onSuccess={handleSuccess} />}
                  {activeTab === "scientific" && <ScientificForm onSuccess={handleSuccess} />}
                  {activeTab === "partnership" && <PartnershipForm onSuccess={handleSuccess} />}
                </>
              )}
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* ── Section 2: Direct Contact ── */}
      <Section background="secondary">
        <ScrollReveal>
          <SectionHeading title="Direct Contact" />
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {contactMethods.map((method, index) => (
            <ScrollReveal key={method.label} delay={index * 0.1}>
              <div className="h-full rounded-xl border border-white/5 bg-neural-slate p-6">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-cognitive-teal/10">
                  <method.icon className="h-6 w-6 text-cognitive-teal" strokeWidth={1.5} />
                </div>
                <p className="mb-1 text-sm font-medium text-pure-light">{method.label}</p>
                <a
                  href={`mailto:${method.email}`}
                  className="text-sm text-cognitive-teal transition hover:text-accent-hover"
                >
                  {method.email}
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* ── Section 3: Locations ── */}
      <Section background="primary">
        <ScrollReveal>
          <SectionHeading title="Locations" />
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {locations.map((location, index) => (
            <ScrollReveal key={location.title} delay={index * 0.1}>
              <div className="h-full rounded-xl border border-white/5 bg-neural-slate p-8">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-cognitive-teal/10">
                  <MapPin className="h-6 w-6 text-cognitive-teal" strokeWidth={1.5} />
                </div>
                <h3 className="heading-card mb-2">{location.title}</h3>
                <p className="body-default">{location.detail}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className="mt-8 text-center text-xs italic text-text-muted">
          Full addresses available upon request for scheduled meetings.
        </p>
      </Section>
    </>
  );
}
