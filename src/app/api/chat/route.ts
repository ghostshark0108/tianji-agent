import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, history, birthInfo } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "请输入问题" }, { status: 400 });
    }

    // 构建上下文
    const context = history
      .map((msg: { role: string; content: string }) => `${msg.role === "user" ? "用户" : "天机"}：${msg.content}`)
      .join("\n");

    const systemPrompt = `你是「天机 Agent」，一个专业的命理分析 AI。你精通八字命理、紫微斗数、奇门遁甲。

用户已经完成了八字排盘，以下是用户的命盘信息：
${birthInfo ? `出生：${birthInfo.year}年${birthInfo.month}月${birthInfo.day}日 ${birthInfo.hour || "未知"}时，${birthInfo.gender}` : ""}

你的任务是：
1. 用通俗易懂的语言解释命理概念
2. 给出具体、有深度的分析
3. 提供实用的建议
4. 保持专业但亲切的语气

注意：
- 不要过度解读或给出绝对的结论
- 命理是参考工具，不是命运的确定性预测
- 鼓励用户主动思考和决策`;

    // 这里可以接入你的 AI API（比如 MiMo）
    // 暂时返回一个模拟回复
    const reply = `收到你的问题："${message}"

基于你的命盘，我来分析一下...

[这里是 AI 分析的内容]

如果你有更多问题，随时可以问我。`;

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error("对话失败:", error);
    const errorMessage = error instanceof Error ? error.message : "对话失败";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
