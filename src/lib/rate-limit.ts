const attempts = new Map<string, { count: number; resetAt: number }>();

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of attempts) {
    if (now > record.resetAt) {
      attempts.delete(key);
    }
  }
}, 60_000);

export function checkRateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): boolean {
  const now = Date.now();
  const record = attempts.get(key);

  if (!record || now > record.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return false; // not rate limited
  }

  record.count++;
  return record.count > limit; // true if rate limited
}

export function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}
