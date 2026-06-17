// Edge-safe admin auth helpers (Web Crypto only — usable from both
// middleware (edge runtime) and route handlers (node runtime)).
// Stateless signed-cookie session: token = "<exp>.<hmac(secret, exp)>".

export const COOKIE_NAME = "admin_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function base64url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let str = "";
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );
  return base64url(sig);
}

function nowSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

// Constant-time string comparison.
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken(): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  const exp = String(nowSeconds() + SESSION_TTL_SECONDS);
  const sig = await hmac(exp, secret);
  return `${exp}.${sig}`;
}

export async function verifySessionToken(
  token: string | undefined | null,
): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || !token) return false; // fail closed
  const dot = token.indexOf(".");
  if (dot < 1) return false;
  const exp = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expNum = Number(exp);
  if (!Number.isFinite(expNum) || expNum < nowSeconds()) return false;
  const expected = await hmac(exp, secret);
  return safeEqual(sig, expected);
}

// Verify a submitted password against ADMIN_PASSWORD (constant-time).
export function verifyPassword(input: unknown): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof input !== "string") return false;
  return safeEqual(input, expected);
}
