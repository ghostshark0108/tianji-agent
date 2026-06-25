import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";

const execAsync = promisify(exec);

export async function POST(req: Request) {
  try {
    const { year, month, day, hour, minute, gender } = await req.json();

    if (!year || !month || !day || !gender) {
      return NextResponse.json({ error: "请填写完整的出生信息" }, { status: 400 });
    }

    const h = hour || "12";
    const m = minute || "0";
    const g = gender === "男" ? "1" : "0";

    // 使用文件方式执行Python脚本（使用Hermes venv的Python）
    const scriptPath = path.join(process.cwd(), "scripts", "bazi_calc.py");
    const pythonPath = "C:/Users/K1/AppData/Local/hermes/hermes-agent/venv/Scripts/python.exe";
    const { stdout, stderr } = await execAsync(
      `"${pythonPath}" "${scriptPath}" ${year} ${month} ${day} ${h} ${m} ${g}`,
      { timeout: 15000 }
    );

    if (stderr) {
      console.error("排盘错误:", stderr);
    }

    const baziData = JSON.parse(stdout.trim());

    // 生成报告
    const report = generateReport(baziData);

    return NextResponse.json({ report, data: baziData });
  } catch (error: unknown) {
    console.error("排盘失败:", error);
    const errorMessage = error instanceof Error ? error.message : "排盘失败";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

function generateReport(data: Record<string, unknown>) {
  const pillars = data.pillars as Record<string, { gan: string; zhi: string; nayin: string }>;
  const shishen = data.shishen as Record<string, string>;
  const dayun = data.dayun as Array<{ start_age: number; end_age: number; ganzhi: string }>;

  return `【八字排盘结果】

阳历：${data.solar}
农历：${data.lunar}
生肖：${data.shengxiao}

━━━━━━━━━━━━━━━━━━━━
      年柱    月柱    日柱    时柱
天干：  ${pillars.year.gan}      ${pillars.month.gan}      ${pillars.day.gan}      ${pillars.time.gan}
地支：  ${pillars.year.zhi}      ${pillars.month.zhi}      ${pillars.day.zhi}      ${pillars.time.zhi}
纳音：${pillars.year.nayin}  ${pillars.month.nayin}  ${pillars.day.nayin}  ${pillars.time.nayin}
━━━━━━━━━━━━━━━━━━━━

【十神关系】
年干 ${pillars.year.gan} → ${shishen.year_gan}
月干 ${pillars.month.gan} → ${shishen.month_gan}
日干 ${pillars.day.gan} → 日主
时干 ${pillars.time.gan} → ${shishen.time_gan}

【大运走势】
${dayun.map((d) => `${d.start_age}-${d.end_age}岁：${d.ganzhi}`).join("\n")}

━━━━━━━━━━━━━━━━━━━━

这是你的基础排盘结果。你可以继续问我关于命理的任何问题，比如：
• 这个命盘的性格特点是什么？
• 今年运势如何？
• 适合什么职业？
• 感情方面怎么样？`;
}
