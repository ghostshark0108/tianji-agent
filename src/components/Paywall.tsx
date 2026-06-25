"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lock, Sparkles, Check } from "lucide-react";

interface PaywallProps {
  onUnlock?: () => void;
}

export default function Paywall({ onUnlock }: PaywallProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      {/* 模糊遮罩 */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/80 to-[#0a0a0f] backdrop-blur-sm z-10" />
        <div className="h-32" />
      </div>

      {/* 付费卡片 */}
      <div className="relative z-20 -mt-16 max-w-md mx-auto">
        <div className="bg-[#111118] border border-[#d4a574]/20 rounded-2xl p-8 shadow-2xl shadow-[#d4a574]/5">
          {/* 图标 */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#d4a574]/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-[#d4a574]" />
            </div>
          </div>

          {/* 标题 */}
          <h3 className="text-xl font-bold text-white text-center mb-2">
            解锁完整分析
          </h3>
          <p className="text-white/50 text-center text-sm mb-6">
            升级为付费用户，获取深度命理解读
          </p>

          {/* 功能列表 */}
          <div className="space-y-3 mb-8">
            {[
              "完整的八字命盘分析",
              "大运流年详细解读",
              "性格与事业深度分析",
              "感情婚姻专项分析",
              "AI 对话无限提问",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <Check className="w-4 h-4 text-[#d4a574] flex-shrink-0" />
                <span className="text-white/70 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {/* 价格 */}
          <div className="text-center mb-6">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl font-bold text-white">¥9.9</span>
              <span className="text-white/50 text-sm">/次</span>
            </div>
            <p className="text-white/40 text-xs mt-1">限时优惠，原价 ¥29.9</p>
          </div>

          {/* 按钮 */}
          <Button
            className="w-full bg-gradient-to-r from-[#d4a574] to-[#b8885a] text-[#0a0a0f] hover:from-[#e8c9a0] hover:to-[#d4a574] py-6 text-base font-semibold shadow-lg shadow-[#d4a574]/20"
            onClick={onUnlock}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            立即解锁
          </Button>

          <p className="text-white/30 text-xs text-center mt-4">
            支持微信支付 · 7天无理由退款
          </p>
        </div>
      </div>
    </motion.div>
  );
}
