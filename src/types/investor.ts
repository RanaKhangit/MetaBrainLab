export interface InvestorCode {
  id: string;
  code: string;
  tier: "A" | "B" | "C";
  investor_name: string;
  investor_email: string;
  investor_organisation: string | null;
  created_at: string;
  expires_at: string;
  max_uses: number;
  current_uses: number;
  is_active: boolean;
  created_by: string;
}

export interface AccessLog {
  id: string;
  code_id: string | null;
  code_entered: string;
  success: boolean;
  tier: string | null;
  ip_address: string | null;
  user_agent: string | null;
  accessed_at: string;
  documents_viewed: string[];
}
