import { NextResponse } from "next/server";
import { verifyCode, signToken, setAuthCookie, type UserData } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ error: "请输入邮箱和验证码" }, { status: 400 });
    }

    const valid = await verifyCode(email, code);
    if (!valid) {
      return NextResponse.json({ error: "验证码错误或已过期" }, { status: 401 });
    }

    // 新用户默认0 credits
    const userData: UserData = {
      email,
      credits: 0,
      plan: null,
      expiresAt: null,
    };

    const token = await signToken(userData);
    const cookie = setAuthCookie(token);

    const response = NextResponse.json({ success: true, email, credits: 0 });
    response.cookies.set(cookie.name, cookie.value, cookie.options as Parameters<typeof response.cookies.set>[2]);
    return response;
  } catch (error) {
    console.error("验证失败:", error);
    return NextResponse.json({ error: "验证失败" }, { status: 500 });
  }
}
