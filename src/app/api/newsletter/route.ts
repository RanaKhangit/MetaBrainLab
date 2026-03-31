import { NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit";
import { sendEmail, formatNewsletterConfirmation } from "@/lib/email";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export async function POST(request: Request) {
  const ip = getClientIP(request);

  if (checkRateLimit(`newsletter:${ip}`, 3, 3600)) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const { email } = result.data;

  // Store in Supabase if configured
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    try {
      const { createServerClient } = await import("@/lib/supabase");
      const supabase = createServerClient();

      // Check for duplicate
      const { data: existing } = await supabase
        .from("subscribers")
        .select("id")
        .eq("email", email)
        .single();

      if (existing) {
        return NextResponse.json({ success: true }); // Already subscribed, don't reveal
      }

      const { error } = await supabase
        .from("subscribers")
        .insert({ email, subscribed_at: new Date().toISOString() });

      if (error) {
        console.error("[Newsletter] Supabase insert failed:", error);
      }
    } catch (err) {
      console.error("[Newsletter] Database error:", err);
      // Continue — email confirmation still works without DB
    }
  }

  // Send confirmation email
  try {
    await sendEmail({
      to: email,
      subject: "MetaBrain Lab — Newsletter Subscription Confirmed",
      html: formatNewsletterConfirmation(email),
    });
  } catch (err) {
    console.error("[Newsletter] Confirmation email failed:", err);
    // Don't fail the request — subscription was stored
  }

  return NextResponse.json({ success: true });
}
