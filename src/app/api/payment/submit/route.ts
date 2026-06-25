import { NextResponse } from "next/server";
import { getCurrentUser, addPendingPayment, PLANS } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "请先登录" }, { status: 401 });
    }

    const { plan, txHint } = await req.json();

    if (!plan || !PLANS[plan]) {
      return NextResponse.json({ error: "无效的套餐" }, { status: 400 });
    }

    if (!txHint || txHint.length < 4) {
      return NextResponse.json({ error: "请输入交易单号后4位" }, { status: 400 });
    }

    const planInfo = PLANS[plan];
    addPendingPayment(user.email, plan, planInfo.price, txHint);

    return NextResponse.json({
      success: true,
      message: "已提交，管理员审核后即可使用",
    });
  } catch (error) {
    console.error("提交支付失败:", error);
    return NextResponse.json({ error: "提交失败" }, { status: 500 });
  }
}
