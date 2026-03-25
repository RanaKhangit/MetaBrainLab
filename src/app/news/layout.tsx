import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Updates",
  description:
    "Latest news, announcements, and developments from MetaBrain Labs.",
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
