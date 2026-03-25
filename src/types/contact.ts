export type EnquiryType = "investor" | "scientific" | "partnership";

export interface InvestorEnquiry {
  enquiryType: "investor";
  name: string;
  organisation: string;
  role: string;
  country: string;
  email: string;
  investmentFocus?: string;
  message?: string;
  privacyConsent: true;
}

export interface ScientificEnquiry {
  enquiryType: "scientific";
  name: string;
  institution: string;
  field: string;
  currentRole: string;
  email: string;
  areaOfInterest?: string;
  statement?: string;
  cvLink?: string;
  privacyConsent: true;
}

export interface PartnershipEnquiry {
  enquiryType: "partnership";
  name: string;
  organisation: string;
  country: string;
  email: string;
  partnershipType:
    | "Government"
    | "Research Institution"
    | "Corporate"
    | "Strategic"
    | "Other";
  message?: string;
  privacyConsent: true;
}

export type ContactEnquiry =
  | InvestorEnquiry
  | ScientificEnquiry
  | PartnershipEnquiry;
