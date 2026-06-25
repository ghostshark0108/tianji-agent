"use client";

import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">
            选择你的套餐
          </h1>
          <p className="text-white/40 text-lg">
            解锁AI深度命理分析，洞察命运密码
          </p>
        </div>
        <Pricing />
      </div>
    </div>
  );
}
