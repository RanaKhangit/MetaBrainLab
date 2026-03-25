export interface InvestorDocument {
  id: string;
  title: string;
  description: string;
  format: string;
  requiredTier: "A" | "B" | "C";
  storagePath: string;
  available: boolean;
}

export const DOCUMENT_REGISTRY: Record<string, InvestorDocument> = {
  "executive-summary": {
    id: "executive-summary",
    title: "Executive Summary",
    description:
      "Company overview, market opportunity, platform architecture, governance framework, and investment thesis.",
    format: "PDF",
    requiredTier: "A",
    storagePath: "investor-docs/executive-summary.pdf",
    available: true,
  },
  "pitch-deck": {
    id: "pitch-deck",
    title: "Investor Pitch Deck",
    description:
      "Presentation covering the problem, solution, platform architecture, market opportunity, team, and investment thesis.",
    format: "PDF",
    requiredTier: "B",
    storagePath: "investor-docs/pitch-deck.pdf",
    available: true,
  },
  "technology-overview": {
    id: "technology-overview",
    title: "Technology Overview",
    description:
      "Technical overview of the MetaBrain platform architecture, five technology layers, and research foundation.",
    format: "PDF",
    requiredTier: "B",
    storagePath: "investor-docs/technology-overview.pdf",
    available: true,
  },
  "financial-summary": {
    id: "financial-summary",
    title: "Financial Summary",
    description:
      "Phase I capital requirements, use of funds breakdown, milestone schedule, financial governance, and risk factors.",
    format: "PDF",
    requiredTier: "B",
    storagePath: "investor-docs/financial-summary.pdf",
    available: true,
  },
  "market-analysis": {
    id: "market-analysis",
    title: "Market Analysis",
    description: "Market landscape, competitive positioning, and demand sectors.",
    format: "PDF",
    requiredTier: "B",
    storagePath: "investor-docs/market-analysis.pdf",
    available: false,
  },
};

const TIER_HIERARCHY: Record<string, number> = { A: 1, B: 2, C: 3 };

export function getDocumentsForTier(tier: "A" | "B" | "C"): InvestorDocument[] {
  const userLevel = TIER_HIERARCHY[tier];
  return Object.values(DOCUMENT_REGISTRY).filter(
    (doc) => TIER_HIERARCHY[doc.requiredTier] <= userLevel
  );
}
