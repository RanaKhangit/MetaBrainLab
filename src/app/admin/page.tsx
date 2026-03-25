"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { Plus, Key, Activity, LogOut } from "lucide-react";

interface InvestorCode {
  id: string;
  code: string;
  tier: string;
  investor_name: string;
  investor_email: string;
  investor_organisation: string | null;
  expires_at: string;
  max_uses: number;
  current_uses: number;
  is_active: boolean;
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"codes" | "logs" | "generate">(
    "codes"
  );
  const [codes, setCodes] = useState<InvestorCode[]>([]);
  const [loading, setLoading] = useState(false);

  // Generate form state
  const [newCode, setNewCode] = useState({
    tier: "A",
    investorName: "",
    investorEmail: "",
    investorOrganisation: "",
    maxUses: 1,
    expiryDays: 30,
  });

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/admin/codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", password }),
      });
      if (res.ok) {
        setAuthenticated(true);
        loadCodes();
      } else {
        setError("Invalid password.");
      }
    } catch {
      setError("Login failed.");
    }
  }

  async function loadCodes() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/codes");
      if (res.ok) {
        const data = await res.json();
        setCodes(data.codes || []);
      }
    } catch {
      console.error("Failed to load codes");
    } finally {
      setLoading(false);
    }
  }

  async function generateCode(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate", ...newCode }),
      });
      if (res.ok) {
        const data = await res.json();
        alert(`Code generated: ${data.code}`);
        setNewCode({
          tier: "A",
          investorName: "",
          investorEmail: "",
          investorOrganisation: "",
          maxUses: 1,
          expiryDays: 30,
        });
        loadCodes();
      }
    } catch {
      alert("Failed to generate code.");
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-sovereign-navy flex items-center justify-center pt-[72px]">
        <div className="w-full max-w-sm bg-neural-slate rounded-xl border border-white/5 p-8">
          <h1 className="heading-card text-center mb-6">Admin Access</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-pure-light placeholder:text-text-muted focus:border-cognitive-teal focus:outline-none"
            />
            {error && (
              <p className="text-sm text-red-400 mt-2">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-cognitive-teal text-sovereign-navy font-medium py-3 rounded-lg mt-4"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sovereign-navy pt-[72px]">
      <Container>
        <div className="py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="heading-section">Admin Dashboard</h1>
            <button
              onClick={() => {
                setAuthenticated(false);
                setPassword("");
              }}
              className="flex items-center gap-2 text-sm text-soft-grey hover:text-pure-light transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            {[
              { id: "codes" as const, label: "Active Codes", icon: Key },
              { id: "generate" as const, label: "Generate Code", icon: Plus },
              { id: "logs" as const, label: "Access Logs", icon: Activity },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === "codes") loadCodes();
                }}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-cognitive-teal text-sovereign-navy"
                    : "bg-neural-slate text-soft-grey hover:text-pure-light"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Codes Tab */}
          {activeTab === "codes" && (
            <div className="rounded-xl border border-white/5 bg-neural-slate overflow-hidden">
              {loading ? (
                <p className="p-8 text-soft-grey">Loading codes...</p>
              ) : codes.length === 0 ? (
                <p className="p-8 text-soft-grey">
                  No investor codes found. Generate one to get started.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left p-4 text-text-muted font-medium">
                          Code
                        </th>
                        <th className="text-left p-4 text-text-muted font-medium">
                          Tier
                        </th>
                        <th className="text-left p-4 text-text-muted font-medium">
                          Investor
                        </th>
                        <th className="text-left p-4 text-text-muted font-medium">
                          Uses
                        </th>
                        <th className="text-left p-4 text-text-muted font-medium">
                          Expires
                        </th>
                        <th className="text-left p-4 text-text-muted font-medium">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {codes.map((code) => (
                        <tr
                          key={code.id}
                          className="border-b border-white/5 last:border-0"
                        >
                          <td className="p-4 font-mono text-cognitive-teal">
                            {code.code}
                          </td>
                          <td className="p-4 text-pure-light">
                            Tier {code.tier}
                          </td>
                          <td className="p-4 text-soft-grey">
                            {code.investor_name}
                          </td>
                          <td className="p-4 text-soft-grey">
                            {code.current_uses}/{code.max_uses}
                          </td>
                          <td className="p-4 text-soft-grey">
                            {new Date(code.expires_at).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            <span
                              className={`rounded-full px-2 py-1 text-xs ${
                                code.is_active
                                  ? "bg-cognitive-teal/10 text-cognitive-teal"
                                  : "bg-red-500/10 text-red-400"
                              }`}
                            >
                              {code.is_active ? "Active" : "Revoked"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Generate Tab */}
          {activeTab === "generate" && (
            <div className="max-w-lg rounded-xl border border-white/5 bg-neural-slate p-8">
              <h2 className="heading-card mb-6">Generate Investor Code</h2>
              <form onSubmit={generateCode} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-pure-light mb-2">
                    Tier
                  </label>
                  <select
                    value={newCode.tier}
                    onChange={(e) =>
                      setNewCode({ ...newCode, tier: e.target.value })
                    }
                    className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-pure-light focus:border-cognitive-teal focus:outline-none"
                  >
                    <option value="A">
                      Tier A — Standard Investor
                    </option>
                    <option value="B">
                      Tier B — Trusted Investor
                    </option>
                    <option value="C">
                      Tier C — Inner Circle (NDA-signed)
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-pure-light mb-2">
                    Investor Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newCode.investorName}
                    onChange={(e) =>
                      setNewCode({ ...newCode, investorName: e.target.value })
                    }
                    className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-pure-light placeholder:text-text-muted focus:border-cognitive-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-pure-light mb-2">
                    Investor Email
                  </label>
                  <input
                    type="email"
                    required
                    value={newCode.investorEmail}
                    onChange={(e) =>
                      setNewCode({ ...newCode, investorEmail: e.target.value })
                    }
                    className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-pure-light placeholder:text-text-muted focus:border-cognitive-teal focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-pure-light mb-2">
                    Organisation
                  </label>
                  <input
                    type="text"
                    value={newCode.investorOrganisation}
                    onChange={(e) =>
                      setNewCode({
                        ...newCode,
                        investorOrganisation: e.target.value,
                      })
                    }
                    className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-pure-light placeholder:text-text-muted focus:border-cognitive-teal focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-pure-light mb-2">
                      Max Uses
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={newCode.maxUses}
                      onChange={(e) =>
                        setNewCode({
                          ...newCode,
                          maxUses: parseInt(e.target.value),
                        })
                      }
                      className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-pure-light focus:border-cognitive-teal focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-pure-light mb-2">
                      Expiry (days)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={newCode.expiryDays}
                      onChange={(e) =>
                        setNewCode({
                          ...newCode,
                          expiryDays: parseInt(e.target.value),
                        })
                      }
                      className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-pure-light focus:border-cognitive-teal focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-cognitive-teal text-sovereign-navy font-medium py-3 rounded-lg mt-4 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cognitive-teal/25 transition-all"
                >
                  Generate Code
                </button>
              </form>
            </div>
          )}

          {/* Logs Tab */}
          {activeTab === "logs" && (
            <div className="rounded-xl border border-white/5 bg-neural-slate p-8">
              <p className="text-soft-grey">
                Access logs will appear here once the database is connected.
                Configure your Supabase environment variables to enable logging.
              </p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
