import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { Redis } from "@upstash/redis";

const JWT_SECRET=new TextEncoder().encode(
  process.env.JWT_SECRET || "tianji-agent-default-secret-change-me"
);

const COOKIE_NAME = "tianji_token";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@tianji.app";

console.log("[Redis] URL:", process.env.UPSTASH_REDIS_REST_URL ? "SET" : "MISSING"); console.log("[Redis] TOKEN:", process.env.UPSTASH_REDIS_REST_TOKEN ? "SET" : "MISSING");
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

export interface UserData {
  email: string;
  credits: number;
  plan: string | null;
  expiresAt: number | null;
}

const pendingPayments = new Map<string, {
  email: string;
  plan: string;
  amount: number;
  txHint: string;
  createdAt: number;
}>();

export function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function storeCode(email: string, code: string): Promise<void> {
  const key = `verify:${email.toLowerCase()}`;
  console.log("[storeCode]", key, code);
  try { const r = await redis.set(key, code, { ex: 300 }); console.log("[storeCode] set result:", r); } catch(e) { console.error("[storeCode] ERROR:", e); throw e; }
}

export async function verifyCode(email: string, code: string): Promise<boolean> {
  const key = `verify:${email.toLowerCase()}`;
  console.log("[verifyCode]", key, "input:", code);
  let stored; try { stored = await redis.get<string>(key); console.log("[verifyCode] get result:", JSON.stringify(stored)); } catch(e) { console.error("[verifyCode] GET ERROR:", e); stored = null; }
  console.log("[verifyCode] stored:", stored);
  if (!stored) return false;
  if (stored !== code) return false;
  await redis.del(key);
  return true;
}

export async function signToken(data: UserData): Promise<string> {
  return new SignJWT({
    email: data.email,
    credits: data.credits,
    plan: data.plan,
    expiresAt: data.expiresAt,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<UserData | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      email: payload.email as string,
      credits: (payload.credits as number) || 0,
      plan: (payload.plan as string) || null,
      expiresAt: (payload.expiresAt as number) || null,
    };
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<UserData | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function setAuthCookie(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    options: {
      httpOnly: true,
      secure: true,
      sameSite: "lax" as const,
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    },
  };
}

export function isAdmin(email: string): boolean {
  return email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

export function addPendingPayment(email: string, plan: string, amount: number, txHint: string) {
  const key = `${email}-${Date.now()}`;
  pendingPayments.set(key, { email, plan, amount, txHint, createdAt: Date.now() });
  return key;
}

export function getPendingPayments() {
  return Array.from(pendingPayments.entries()).map(([key, val]) => ({ id: key, ...val }));
}

export function confirmPayment(id: string) {
  return pendingPayments.delete(id);
}

export function rejectPayment(id: string) {
  return pendingPayments.delete(id);
}

export { COOKIE_NAME, ADMIN_EMAIL };

export const PLANS: Record<string, { name: string; price: number; credits: number; duration: number | null }> = {
  single: { name: "单次深度分析", price: 9.9, credits: 1, duration: null },
  monthly: { name: "月度会员", price: 29.9, credits: 999, duration: 30 * 24 * 60 * 60 * 1000 },
  yearly: { name: "年度会员", price: 259, credits: 9999, duration: 365 * 24 * 60 * 60 * 1000 },
};
