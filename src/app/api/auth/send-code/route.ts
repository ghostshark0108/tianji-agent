import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { generateCode, storeCode } from "@/lib/auth";

const transporter = nodemailer.createTransport({
  host: "smtp.qq.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.QQ_SMTP_USER,
    pass: process.env.QQ_SMTP_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "请输入有效的邮箱地址" }, { status: 400 });
    }

    const code = generateCode();
    await storeCode(email, code);

    await transporter.sendMail({
      from: `"天机 Agent" <${process.env.QQ_SMTP_USER}>`,
      to: email,
      subject: "天机 Agent — 登录验证码",
      html: `
        <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <span style="font-size: 28px; font-weight: bold; color: #d4a574;">天机 Agent</span>
          </div>
          <div style="background: #111118; border-radius: 12px; padding: 30px; text-align: center;">
            <p style="color: #999; margin-bottom: 20px;">你的登录验证码</p>
            <p style="font-size: 36px; font-weight: bold; color: #d4a574; letter-spacing: 8px; margin: 0;">
              ${code}
            </p>
            <p style="color: #666; margin-top: 20px; font-size: 14px;">验证码 5 分钟内有效</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("发送验证码失败:", error);
    return NextResponse.json({ error: "发送失败，请稍后重试" }, { status: 500 });
  }
}
