import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/auth";
import { DOCUMENT_REGISTRY } from "@/lib/documents";

const TIER_HIERARCHY: Record<string, number> = { A: 1, B: 2, C: 3 };

export async function GET(request: Request) {
  // Verify JWT from cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("investor_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const session = await verifyJWT(token);
  if (!session) {
    return NextResponse.json({ error: "Session expired" }, { status: 401 });
  }

  // Get document ID
  const { searchParams } = new URL(request.url);
  const docId = searchParams.get("id");

  if (!docId) {
    return NextResponse.json(
      { error: "Document ID required" },
      { status: 400 }
    );
  }

  const doc = DOCUMENT_REGISTRY[docId];
  if (!doc) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  if (!doc.available) {
    return NextResponse.json(
      { error: "Document not yet available" },
      { status: 404 }
    );
  }

  // Check tier access
  if (TIER_HIERARCHY[doc.requiredTier] > TIER_HIERARCHY[session.tier]) {
    return NextResponse.json(
      { error: "Insufficient access level" },
      { status: 403 }
    );
  }

  // For MVP: return the document path from public directory
  // For production: generate signed URL from Supabase Storage / S3
  const documentUrl = `/documents/${doc.id}.pdf`;

  return NextResponse.json({ url: documentUrl, document: doc });
}
