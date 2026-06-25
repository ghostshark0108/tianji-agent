"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Check, Loader2, Crown, Zap, Star } from "lucide-react";

const plans = [
  {
    id: "single",
    name: "单次分析",
    price: "9.9",
    unit: "次",
    icon: Zap,
    features: ["1次深度AI分析", "完整八字排盘", "详细命理解读"],
    popular: false,
  },
  {
    id: "monthly",
    name: "月度会员",
    price: "29.9",
    unit: "月",
    icon: Star,
    features: ["不限次数AI分析", "完整八字排盘", "详细命理解读", "优先响应"],
    popular: true,
  },
  {
    id: "yearly",
    name: "年度会员",
    price: "259",
    unit: "年",
    icon: Crown,
    features: ["不限次数AI分析", "完整八字排盘", "详细命理解读", "优先响应", "专属客服", "省¥99.8"],
    popular: false,
  },
];

export default function Pricing({ onSelect }: { onSelect?: (plan: string) => void }) {
  const { email, openLogin } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [txHint, setTxHint] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSelect = (planId: string) => {
    if (!email) {
      openLogin();
      return;
    }
    setSelectedPlan(planId);
    setSubmitted(false);
    setTxHint("");
    setError("");
    onSelect?.(planId);
  };

  const handleSubmit = async () => {
    if (!selectedPlan || !txHint.trim()) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/payment/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: selectedPlan, txHint: txHint.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "提交失败");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("网络错误");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* 套餐选择 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isSelected = selectedPlan === plan.id;
          return (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.02 }}
              className={`relative rounded-2xl border p-6 cursor-pointer transition-all duration-300 ${
                isSelected
                  ? "border-[#d4a574] bg-[#d4a574]/10"
                  : "border-white/10 bg-[#111118] hover:border-white/20"
              } ${plan.popular ? "ring-1 ring-[#d4a574]/50" : ""}`}
              onClick={() => handleSelect(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#d4a574] text-[#0a0a0f] text-xs font-bold rounded-full">
                  最受欢迎
                </div>
              )}
              <div className="flex items-center gap-3 mb-4">
                <Icon className="w-5 h-5 text-[#d4a574]" />
                <span className="font-semibold text-white">{plan.name}</span>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">¥{plan.price}</span>
                <span className="text-white/40 text-sm">/{plan.unit}</span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                    <Check className="w-4 h-4 text-[#d4a574] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* 支付区域 */}
      <AnimatePresence>
        {selectedPlan && !submitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-md mx-auto rounded-2xl border border-white/10 bg-[#111118] p-8 text-center"
          >
            <h3 className="text-lg font-bold text-white mb-2">
              支付 ¥{plans.find((p) => p.id === selectedPlan)?.price}
            </h3>
            <p className="text-sm text-white/40 mb-6">
              扫码付款后，输入交易单号后4位
            </p>

            {/* 收款码 */}
            <div className="flex gap-4 justify-center mb-6">
              <div className="text-center">
                <img
                  src="/payment/wechat.jpg"
                  alt="微信收款码"
                  className="w-44 h-44 rounded-xl object-cover border border-white/10"
                />
                <p className="text-xs text-white/40 mt-2">微信支付</p>
              </div>
              <div className="text-center">
                <img
                  src="/payment/alipay.jpg"
                  alt="支付宝收款码"
                  className="w-44 h-44 rounded-xl object-cover border border-white/10"
                />
                <p className="text-xs text-white/40 mt-2">支付宝</p>
              </div>
            </div>

            <div className="space-y-3">
              <Input
                placeholder="交易单号后4位"
                value={txHint}
                onChange={(e) => setTxHint(e.target.value.replace(/\D/g, "").slice(0, 4))}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 text-center text-lg tracking-widest"
                maxLength={4}
              />
              <Button
                onClick={handleSubmit}
                disabled={txHint.length !== 4 || submitting}
                className="w-full bg-gradient-to-r from-[#d4a574] to-[#b8885a] text-[#0a0a0f] hover:from-[#e8c9a0] hover:to-[#d4a574] py-5 font-semibold"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "提交支付凭证"}
              </Button>
            </div>

            {error && (
              <p className="text-red-400 text-sm mt-3">{error}</p>
            )}

            <p className="text-xs text-white/20 mt-4">
              提交后请等待审核，通常几分钟内完成
            </p>
          </motion.div>
        )}

        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto rounded-2xl border border-[#d4a574]/30 bg-[#d4a574]/5 p-8 text-center"
          >
            <Check className="w-12 h-12 text-[#d4a574] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">已提交</h3>
            <p className="text-sm text-white/50">
              管理员审核后，你会收到通知。通常几分钟内完成。
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
