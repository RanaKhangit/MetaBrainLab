import { NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit";

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

  // In production: store in Supabase or send to mailing list
  console.log(`[Newsletter] New subscriber: ${result.data.email}`);

  return NextResponse.json({ success: true });
}
