import { NextResponse } from "next/server";
import {
  getCurrentUser,
  isAdmin,
  getPendingPayments,
  confirmPayment,
  rejectPayment,
  signToken,
  setAuthCookie,
  PLANS,
} from "@/lib/auth";

// 查看待审核支付
export async function GET() {
  const user = await getCurrentUser();
  if (!user || !isAdmin(user.email)) {
    return NextResponse.json({ error: "无权限" }, { status: 403 });
  }
  return NextResponse.json({ payments: getPendingPayments() });
}

// 审核支付
export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user || !isAdmin(user.email)) {
    return NextResponse.json({ error: "无权限" }, { status: 403 });
  }

  const { id, action, targetEmail } = await req.json();

  if (action === "reject") {
    rejectPayment(id);
    return NextResponse.json({ success: true, message: "已拒绝" });
  }

  if (action === "approve") {
    // 查找对应的待审核记录
    const payments = getPendingPayments();
    const payment = payments.find((p) => p.id === id);
    if (!payment) {
      return NextResponse.json({ error: "记录不存在" }, { status: 404 });
    }

    const planInfo = PLANS[payment.plan];
    if (!planInfo) {
      return NextResponse.json({ error: "套餐不存在" }, { status: 400 });
    }

    // 签发新token给目标用户（通过设置cookie的方式不行，因为是不同用户）
    // 这里我们用一个技巧：返回一个授权链接，用户点击后获得credits
    // 或者直接生成一个兑换码

    confirmPayment(id);

    return NextResponse.json({
      success: true,
      message: `已确认 ${payment.email} 的 ${planInfo.name} 支付`,
      grantToken: await signToken({
        email: payment.email,
        credits: planInfo.credits,
        plan: payment.plan,
        expiresAt: planInfo.duration ? Date.now() + planInfo.duration : null,
      }),
      targetEmail: payment.email,
    });
  }

  // 给当前管理员添加credits（测试用）
  if (action === "grant-self") {
    const { plan } = await req.json();
    const planInfo = PLANS[plan];
    if (!planInfo) return NextResponse.json({ error: "无效套餐" }, { status: 400 });

    const newToken = await signToken({
      email: user.email,
      credits: (user.credits || 0) + planInfo.credits,
      plan,
      expiresAt: planInfo.duration ? Date.now() + planInfo.duration : user.expiresAt,
    });

    const response = NextResponse.json({ success: true, credits: (user.credits || 0) + planInfo.credits });
    const cookie = setAuthCookie(newToken);
    response.cookies.set(cookie.name, cookie.value, cookie.options as Parameters<typeof response.cookies.set>[2]);
    return response;
  }

  return NextResponse.json({ error: "无效操作" }, { status: 400 });
}
