import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { signToken, setAuthCookie, getCurrentUser, type UserData } from "@/lib/auth";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "tianji-agent-default-secret-change-me"
);

// 用户领取credits（通过管理员发放的grant token）
export async function POST(req: Request) {
  try {
    const { grantToken } = await req.json();
    if (!grantToken) {
      return NextResponse.json({ error: "缺少兑换码" }, { status: 400 });
    }

    // 验证grant token
    let payload;
    try {
      const result = await jwtVerify(grantToken, JWT_SECRET);
      payload = result.payload;
    } catch {
      return NextResponse.json({ error: "兑换码无效或已过期" }, { status: 400 });
    }

    const grantEmail = payload.email as string;
    const grantCredits = (payload.credits as number) || 0;
    const grantPlan = (payload.plan as string) || null;
    const grantExpires = (payload.expiresAt as number) || null;

    // 获取当前登录用户
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "请先登录" }, { status: 401 });
    }

    // 邮箱必须匹配
    if (currentUser.email.toLowerCase() !== grantEmail.toLowerCase()) {
      return NextResponse.json({ error: "兑换码与当前账号不匹配" }, { status: 403 });
    }

    // 合并credits
    const newUserData: UserData = {
      email: currentUser.email,
      credits: (currentUser.credits || 0) + grantCredits,
      plan: grantPlan || currentUser.plan,
      expiresAt: grantExpires || currentUser.expiresAt,
    };

    const newToken = await signToken(newUserData);
    const cookie = setAuthCookie(newToken);

    const response = NextResponse.json({
      success: true,
      credits: newUserData.credits,
      plan: newUserData.plan,
    });
    response.cookies.set(cookie.name, cookie.value, cookie.options as Parameters<typeof response.cookies.set>[2]);
    return response;
  } catch (error) {
    console.error("兑换失败:", error);
    return NextResponse.json({ error: "兑换失败" }, { status: 500 });
  }
}
