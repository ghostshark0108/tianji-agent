import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ email: null, credits: 0, plan: null });
  }
  return NextResponse.json({
    email: user.email,
    credits: user.credits,
    plan: user.plan,
  });
}
