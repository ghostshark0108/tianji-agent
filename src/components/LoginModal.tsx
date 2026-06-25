"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { X, Mail, Shield, Loader2 } from "lucide-react";

export default function LoginModal() {
  const { showLogin, closeLogin, login } = useAuth();
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const startCooldown = () => {
    setCooldown(60);
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendCode = async () => {
    if (!email || sending) return;
    setError("");
    setSending(true);

    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "发送失败");
        return;
      }

      setStep("code");
      startCooldown();
    } catch {
      setError("网络错误，请重试");
    } finally {
      setSending(false);
    }
  };

  const handleVerify = async () => {
    if (!code || verifying) return;
    setError("");
    setVerifying(true);

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "验证失败");
        return;
      }

      login(email);
      // 重置状态
      setStep("email");
      setEmail("");
      setCode("");
    } catch {
      setError("网络错误，请重试");
    } finally {
      setVerifying(false);
    }
  };

  const handleClose = () => {
    closeLogin();
    setStep("email");
    setEmail("");
    setCode("");
    setError("");
  };

  return (
    <AnimatePresence>
      {showLogin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* 背景遮罩 */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* 弹窗 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#111118] p-8 shadow-2xl"
          >
            {/* 关闭按钮 */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* 标题 */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#d4a574]/10 mb-4">
                {step === "email" ? (
                  <Mail className="w-6 h-6 text-[#d4a574]" />
                ) : (
                  <Shield className="w-6 h-6 text-[#d4a574]" />
                )}
              </div>
              <h2 className="text-xl font-bold text-white">
                {step === "email" ? "登录天机" : "输入验证码"}
              </h2>
              <p className="text-sm text-white/40 mt-2">
                {step === "email"
                  ? "使用邮箱验证码登录，无需注册"
                  : `验证码已发送至 ${email}`}
              </p>
            </div>

            {/* 表单 */}
            {step === "email" ? (
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendCode()}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 py-5"
                  autoFocus
                />
                <Button
                  onClick={handleSendCode}
                  disabled={!email || sending}
                  className="w-full bg-gradient-to-r from-[#d4a574] to-[#b8885a] text-[#0a0a0f] hover:from-[#e8c9a0] hover:to-[#d4a574] py-5 font-semibold"
                >
                  {sending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "发送验证码"
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="6位验证码"
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 py-5 text-center text-2xl tracking-[0.5em]"
                  maxLength={6}
                  autoFocus
                />
                <Button
                  onClick={handleVerify}
                  disabled={code.length !== 6 || verifying}
                  className="w-full bg-gradient-to-r from-[#d4a574] to-[#b8885a] text-[#0a0a0f] hover:from-[#e8c9a0] hover:to-[#d4a574] py-5 font-semibold"
                >
                  {verifying ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "验证登录"
                  )}
                </Button>
                <div className="flex items-center justify-between text-sm">
                  <button
                    onClick={() => {
                      setStep("email");
                      setCode("");
                      setError("");
                    }}
                    className="text-white/40 hover:text-white/70 transition-colors"
                  >
                    换个邮箱
                  </button>
                  <button
                    onClick={handleSendCode}
                    disabled={cooldown > 0}
                    className="text-[#d4a574] hover:text-[#e8c9a0] transition-colors disabled:text-white/20 disabled:cursor-not-allowed"
                  >
                    {cooldown > 0 ? `${cooldown}秒后重发` : "重新发送"}
                  </button>
                </div>
              </div>
            )}

            {/* 错误提示 */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm text-center mt-4"
              >
                {error}
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
