import { NextResponse } from "next/server";
import { getBaziChart } from "shunshi-bazi-core";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObj = Record<string, any>;

export async function POST(req: Request) {
  try {
    const { year, month, day, hour, minute, gender } = await req.json();

    if (!year || !month || !day || !gender) {
      return NextResponse.json({ error: "请填写完整的出生信息" }, { status: 400 });
    }

    const h = hour ? parseInt(hour) : 12;
    const m = minute ? parseInt(minute) : 0;
    const g = gender === "男" ? 1 : 0;

    const chart = getBaziChart({
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
      hour: h,
      minute: m,
      gender: g,
    }) as unknown as AnyObj;

    const bazi = chart.八字 as AnyObj;
    const p = bazi.柱位详细 as AnyObj;
    const dayun = (bazi.大运 || []) as AnyObj[];
    const wuxing = bazi.五行分值 as AnyObj;

    // 生成报告
    const report = `【八字排盘结果】

阳历：${bazi.公历}
农历：${bazi.农历}
生肖：${bazi.生肖}
日主：${bazi.日主}
起运：${bazi.起运}

━━━━━━━━━━━━━━━━━━━━
      年柱    月柱    日柱    时柱
天干：  ${p.年柱.天干}      ${p.月柱.天干}      ${p.日柱.天干}      ${p.时柱.天干}
地支：  ${p.年柱.地支}      ${p.月柱.地支}      ${p.日柱.地支}      ${p.时柱.地支}
纳音：${p.年柱.纳音}  ${p.月柱.纳音}  ${p.日柱.纳音}  ${p.时柱.纳音}
━━━━━━━━━━━━━━━━━━━━

【十神关系】
年干 ${p.年柱.天干} → ${p.年柱.主星}
月干 ${p.月柱.天干} → ${p.月柱.主星}
日干 ${p.日柱.天干} → 日主
时干 ${p.时柱.天干} → ${p.时柱.主星}

【五行力量】
金：${wuxing.金?.占比 || "-"}  木：${wuxing.木?.占比 || "-"}  水：${wuxing.水?.占比 || "-"}  火：${wuxing.火?.占比 || "-"}  土：${wuxing.土?.占比 || "-"}

【大运走势】
${dayun.map((d) => `${d.起始年龄}-${d.结束年龄}岁：${d.干支}（${d.主星}）`).join("\n")}

━━━━━━━━━━━━━━━━━━━━

这是你的基础排盘结果。你可以继续问我关于命理的任何问题，比如：
• 这个命盘的性格特点是什么？
• 今年运势如何？
• 适合什么职业？
• 感情方面怎么样？`;

    return NextResponse.json({
      report,
      data: {
        solar: bazi.公历,
        lunar: bazi.农历,
        shengxiao: bazi.生肖,
        rizhu: bazi.日主,
        sizhu: bazi.四柱,
        qiyun: bazi.起运,
        pillars: {
          year: { gan: p.年柱.天干, zhi: p.年柱.地支, nayin: p.年柱.纳音, zhuxing: p.年柱.主星 },
          month: { gan: p.月柱.天干, zhi: p.月柱.地支, nayin: p.月柱.纳音, zhuxing: p.月柱.主星 },
          day: { gan: p.日柱.天干, zhi: p.日柱.地支, nayin: p.日柱.纳音 },
          time: { gan: p.时柱.天干, zhi: p.时柱.地支, nayin: p.时柱.纳音, zhuxing: p.时柱.主星 },
        },
        wuxing,
        dayun: dayun.map((d) => ({
          start_age: d.起始年龄,
          end_age: d.结束年龄,
          ganzhi: d.干支,
          zhuxing: d.主星,
        })),
      },
    });
  } catch (error: unknown) {
    console.error("排盘失败:", error);
    const errorMessage = error instanceof Error ? error.message : "排盘失败";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
