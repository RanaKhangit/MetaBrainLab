import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investor Access",
  description:
    "Secure portal for MetaBrain Lab investors and prospective investment partners.",
  robots: { index: false, follow: false },
};

export default function InvestorAccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
