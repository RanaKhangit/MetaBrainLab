import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signAdminJWT, verifyAdminJWT } from "@/lib/auth";

function generateInvestorCode(tier: string): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `MBL-${tier}-${code}`;
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isValid = await verifyAdminJWT(token);
  if (!isValid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // In production: fetch from Supabase
  // For now: return empty array
  try {
    const { createServerClient } = await import("@/lib/supabase");
    const supabase = createServerClient();
    const { data: codes } = await supabase
      .from("investor_codes")
      .select("*")
      .order("created_at", { ascending: false });

    return NextResponse.json({ codes: codes || [] });
  } catch {
    return NextResponse.json({ codes: [] });
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  // Handle login
  if (body.action === "login") {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword || body.password !== adminPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = await signAdminJWT();
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 28800, // 8 hours
      path: "/",
    });
    return response;
  }

  // Handle code generation
  if (body.action === "generate") {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token || !(await verifyAdminJWT(token))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const code = generateInvestorCode(body.tier || "A");
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (body.expiryDays || 30));

    try {
      const { createServerClient } = await import("@/lib/supabase");
      const supabase = createServerClient();

      const { error } = await supabase.from("investor_codes").insert({
        code,
        tier: body.tier || "A",
        investor_name: body.investorName,
        investor_email: body.investorEmail,
        investor_organisation: body.investorOrganisation || null,
        expires_at: expiresAt.toISOString(),
        max_uses: body.maxUses || 1,
      });

      if (error) throw error;

      return NextResponse.json({ success: true, code });
    } catch (err) {
      console.error("Failed to generate code:", err);
      return NextResponse.json(
        { error: "Failed to generate code. Check database configuration." },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
