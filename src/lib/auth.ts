import { SignJWT, jwtVerify } from "jose";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export interface InvestorSession {
  tier: "A" | "B" | "C";
  investorName: string;
  investorEmail: string;
  codeId: string;
}

export async function signJWT(
  payload: InvestorSession,
  expiresIn: string = "2h"
) {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(getSecret());
}

export async function verifyJWT(
  token: string
): Promise<InvestorSession | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as InvestorSession;
  } catch {
    return null;
  }
}

export async function signAdminJWT(expiresIn: string = "8h") {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(getSecret());
}

export async function verifyAdminJWT(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return (payload as Record<string, unknown>).role === "admin";
  } catch {
    return false;
  }
}
