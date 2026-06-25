"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User, Bot, Calendar, Clock } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"birth" | "chat">("birth");
  const [birthInfo, setBirthInfo] = useState({
    year: "",
    month: "",
    day: "",
    hour: "",
    minute: "",
    gender: "",
  });

  const handleBirthSubmit = async () => {
    if (!birthInfo.year || !birthInfo.month || !birthInfo.day || !birthInfo.gender) {
      return;
    }

    setLoading(true);
    const userMsg = `我的出生信息：${birthInfo.year}年${birthInfo.month}月${birthInfo.day}日 ${birthInfo.hour || "未知"}:${birthInfo.minute || "00"}，性别：${birthInfo.gender}`;
    setMessages([{ role: "user", content: userMsg }]);

    try {
      const res = await fetch("/api/bazi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(birthInfo),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.report || data.error || "排盘失败" },
      ]);
      setStep("chat");
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "网络错误，请重试" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleChatSubmit = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: messages,
          birthInfo,
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || data.error || "分析失败" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "网络错误，请重试" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="/" className="text-[#d4a574] font-bold text-lg">
            天机 Agent
          </a>
          <span className="text-white/40 text-sm">命理推演引擎</span>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.length === 0 && step === "birth" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#d4a574]/10 mb-6">
                <Calendar className="w-8 h-8 text-[#d4a574]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                欢迎来到天机 Agent
              </h2>
              <p className="text-white/50 mb-8">
                请输入你的出生信息，开始命理推演
              </p>

              <div className="max-w-sm mx-auto space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <Input
                    placeholder="年"
                    type="number"
                    value={birthInfo.year}
                    onChange={(e) =>
                      setBirthInfo({ ...birthInfo, year: e.target.value })
                    }
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                  <Input
                    placeholder="月"
                    type="number"
                    value={birthInfo.month}
                    onChange={(e) =>
                      setBirthInfo({ ...birthInfo, month: e.target.value })
                    }
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                  <Input
                    placeholder="日"
                    type="number"
                    value={birthInfo.day}
                    onChange={(e) =>
                      setBirthInfo({ ...birthInfo, day: e.target.value })
                    }
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="时 (0-23，可选)"
                    type="number"
                    value={birthInfo.hour}
                    onChange={(e) =>
                      setBirthInfo({ ...birthInfo, hour: e.target.value })
                    }
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                  <Input
                    placeholder="分 (可选)"
                    type="number"
                    value={birthInfo.minute}
                    onChange={(e) =>
                      setBirthInfo({ ...birthInfo, minute: e.target.value })
                    }
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant={
                      birthInfo.gender === "男" ? "default" : "outline"
                    }
                    className={`flex-1 ${
                      birthInfo.gender === "男"
                        ? "bg-[#d4a574] text-[#0a0a0f]"
                        : "border-white/10 text-white/70 hover:bg-white/5"
                    }`}
                    onClick={() =>
                      setBirthInfo({ ...birthInfo, gender: "男" })
                    }
                  >
                    男
                  </Button>
                  <Button
                    variant={
                      birthInfo.gender === "女" ? "default" : "outline"
                    }
                    className={`flex-1 ${
                      birthInfo.gender === "女"
                        ? "bg-[#d4a574] text-[#0a0a0f]"
                        : "border-white/10 text-white/70 hover:bg-white/5"
                    }`}
                    onClick={() =>
                      setBirthInfo({ ...birthInfo, gender: "女" })
                    }
                  >
                    女
                  </Button>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-[#d4a574] to-[#b8885a] text-[#0a0a0f] hover:from-[#e8c9a0] hover:to-[#d4a574] py-6 text-base font-semibold"
                  onClick={handleBirthSubmit}
                  disabled={loading || !birthInfo.year || !birthInfo.month || !birthInfo.day || !birthInfo.gender}
                >
                  {loading ? "排盘中..." : "开始排盘"}
                </Button>
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#d4a574]/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-[#d4a574]" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-[#d4a574] text-[#0a0a0f]"
                      : "bg-white/5 text-white/90"
                  }`}
                >
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {msg.content}
                  </pre>
                </div>
                {msg.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-white/70" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#d4a574]/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-[#d4a574]" />
              </div>
              <div className="bg-white/5 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-[#d4a574]/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 bg-[#d4a574]/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 bg-[#d4a574]/50 rounded-full animate-bounce" />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Input */}
      {step === "chat" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-white/10 px-4 py-4"
        >
          <div className="max-w-3xl mx-auto flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleChatSubmit()}
              placeholder="输入你的问题..."
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 py-6"
            />
            <Button
              onClick={handleChatSubmit}
              disabled={loading || !input.trim()}
              className="bg-[#d4a574] text-[#0a0a0f] hover:bg-[#e8c9a0] px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
