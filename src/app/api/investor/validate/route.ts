import { NextResponse } from "next/server";
import { signJWT } from "@/lib/auth";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit";

// Demo codes that work without a database
const DEMO_CODES: Record<
  string,
  { tier: "A" | "B" | "C"; name: string; email: string }
> = {
  "MBL-A-DEMO": { tier: "A", name: "Demo Investor (Tier A)", email: "demo-a@metabrainlab.com" },
  "MBL-B-DEMO": { tier: "B", name: "Demo Investor (Tier B)", email: "demo-b@metabrainlab.com" },
  "MBL-C-DEMO": { tier: "C", name: "Demo Investor (Tier C)", email: "demo-c@metabrainlab.com" },
  "304378":     { tier: "B", name: "Investor", email: "investor@metabrainlab.com" },
};

export async function POST(request: Request) {
  const ip = getClientIP(request);

  // Rate limit: 5 attempts per IP per hour
  if (checkRateLimit(`investor-validate:${ip}`, 5, 3600)) {
    return NextResponse.json(
      { valid: false, error: "Too many attempts. Please try again later." },
      { status: 429 }
    );
  }

  let code: string;
  try {
    const body = await request.json();
    code = (body.code || "").trim().toUpperCase();
  } catch {
    return NextResponse.json(
      { valid: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  if (!code) {
    return NextResponse.json(
      { valid: false, error: "Please enter an access code." },
      { status: 400 }
    );
  }

  // Check demo codes first (works without database)
  const demoRecord = DEMO_CODES[code];
  if (demoRecord) {
    const token = await signJWT({
      tier: demoRecord.tier,
      investorName: demoRecord.name,
      investorEmail: demoRecord.email,
      codeId: "demo",
    });

    const response = NextResponse.json({ valid: true, tier: demoRecord.tier });
    response.cookies.set("investor_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7200,
      path: "/",
    });
    return response;
  }

  // Try database lookup if Supabase is configured
  try {
    const { createServerClient } = await import("@/lib/supabase");
    const supabase = createServerClient();

    const { data: record, error } = await supabase
      .from("investor_codes")
      .select("*")
      .eq("code", code)
      .single();

    if (error || !record) {
      return NextResponse.json(
        { valid: false, error: "Invalid code. Please check and try again." },
        { status: 401 }
      );
    }

    if (!record.is_active) {
      return NextResponse.json(
        { valid: false, error: "This code has been deactivated." },
        { status: 401 }
      );
    }

    if (new Date() > new Date(record.expires_at)) {
      return NextResponse.json(
        { valid: false, error: "This code has expired." },
        { status: 401 }
      );
    }

    if (record.current_uses >= record.max_uses) {
      return NextResponse.json(
        { valid: false, error: "This code has reached its usage limit." },
        { status: 401 }
      );
    }

    await supabase
      .from("investor_codes")
      .update({ current_uses: record.current_uses + 1 })
      .eq("id", record.id);

    const token = await signJWT({
      tier: record.tier,
      investorName: record.investor_name,
      investorEmail: record.investor_email,
      codeId: record.id,
    });

    const response = NextResponse.json({ valid: true, tier: record.tier });
    response.cookies.set("investor_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7200,
      path: "/",
    });
    return response;
  } catch {
    // Database not configured — only demo codes work
    return NextResponse.json(
      { valid: false, error: "Invalid code. Please check and try again." },
      { status: 401 }
    );
  }
}
