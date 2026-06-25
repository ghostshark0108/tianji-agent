import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, history, birthInfo } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "请输入问题" }, { status: 400 });
    }

    // 构建消息历史
    const messages = [
      {
        role: "system",
        content: `你是「天机」，一个专业的命理分析AI。精通八字命理、紫微斗数、奇门遁甲。

用户已完成八字排盘，命盘信息：
${birthInfo ? `出生：${birthInfo.year}年${birthInfo.month}月${birthInfo.day}日 ${birthInfo.hour || "未知"}时，${birthInfo.gender}` : "未提供"}

任务：
1. 用通俗易懂的语言解释命理概念
2. 给出具体、有深度的分析
3. 提供实用的建议
4. 保持专业但亲切的语气

注意：
- 不要过度解读或给出绝对结论
- 命理是参考工具，不是命运确定性预测
- 鼓励用户主动思考和决策
- 回复详细有深度，不要敷衍
- 用中文回复`
      },
      ...history.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    // 调用CC Switch代理（流式输出）
    const response = await fetch("http://127.0.0.1:15721/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer ***",
      },
      body: JSON.stringify({
        model: "mimo-v2.5-pro",
        messages,
        temperature: 0.7,
        max_tokens: 4096,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API错误:", errorText);
      throw new Error(`AI API调用失败: ${response.status}`);
    }

    // 流式返回
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }
        const decoder = new TextDecoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith("data: ")) continue;
              const data = trimmed.slice(6);
              if (data === "[DONE]") {
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                continue;
              }
              try {
                const json = JSON.parse(data);
                const content = json.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
                  );
                }
              } catch {
                // skip malformed JSON
              }
            }
          }
        } catch (err) {
          console.error("流式读取错误:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error: unknown) {
    console.error("对话失败:", error);
    const errorMessage = error instanceof Error ? error.message : "对话失败";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
