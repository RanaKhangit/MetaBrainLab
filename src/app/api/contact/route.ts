import { NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit";

const baseFields = {
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  privacyConsent: z.literal(true, {
    error: "You must accept the privacy policy",
  }),
};

const investorSchema = z.object({
  ...baseFields,
  enquiryType: z.literal("investor"),
  organisation: z.string().min(2),
  role: z.string().min(1),
  country: z.string().min(1),
  investmentFocus: z.string().optional(),
  message: z.string().max(1000).optional(),
});

const scientificSchema = z.object({
  ...baseFields,
  enquiryType: z.literal("scientific"),
  institution: z.string().min(1),
  field: z.string().min(1),
  currentRole: z.string().min(1),
  areaOfInterest: z.string().optional(),
  statement: z.string().max(1500).optional(),
  cvLink: z.string().url().optional().or(z.literal("")),
});

const partnershipSchema = z.object({
  ...baseFields,
  enquiryType: z.literal("partnership"),
  organisation: z.string().min(1),
  country: z.string().min(1),
  partnershipType: z.enum([
    "Government",
    "Research Institution",
    "Corporate",
    "Strategic",
    "Other",
  ]),
  message: z.string().max(1000).optional(),
});

const formSchemas = {
  investor: investorSchema,
  scientific: scientificSchema,
  partnership: partnershipSchema,
};

export async function POST(request: Request) {
  const ip = getClientIP(request);

  // Rate limit: 3 submissions per IP per hour
  if (checkRateLimit(`contact:${ip}`, 3, 3600)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const enquiryType = body.enquiryType as keyof typeof formSchemas;
  const schema = formSchemas[enquiryType];

  if (!schema) {
    return NextResponse.json(
      { error: "Invalid enquiry type." },
      { status: 400 }
    );
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed.", details: result.error.flatten() },
      { status: 400 }
    );
  }

  // In production: send email via SendGrid
  // For now: log the submission
  console.log(`[Contact Form] ${enquiryType} enquiry from ${result.data.name}`);

  // TODO: Wire up SendGrid
  // await sendEmail({
  //   to: enquiryType === 'investor' ? process.env.INVESTOR_EMAIL_TO : process.env.CONTACT_EMAIL_TO,
  //   from: 'noreply@metabrainlabs.com',
  //   subject: `[MetaBrain Labs] New ${enquiryType} enquiry from ${result.data.name}`,
  //   html: formatEnquiryEmail(result.data),
  // });

  return NextResponse.json({ success: true });
}
