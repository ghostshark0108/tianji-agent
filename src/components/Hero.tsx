"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden animated-gradient">
      {/* Decorative orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4a574]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#d4a574]/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4a574]/2 rounded-full blur-[120px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,165,116,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,165,116,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-[#d4a574]/20 bg-[#d4a574]/5 text-[#d4a574] text-sm"
        >
          <Sparkles size={14} />
          <span>排盘・推演・洞察</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 font-[family-name:var(--font-heading)] leading-[1.1]"
        >
          真正的
          <span className="text-gold-gradient">命理术数</span>
          智能体
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl md:text-2xl text-white/50 mb-4 tracking-widest"
        >
          紫微 · 八字 · 奇门
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base md:text-lg text-white/40 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          250+ 定制化命盘工具，追求每次推理的透明与严谨。
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#d4a574] to-[#b8885a] text-[#0a0a0f] hover:from-[#e8c9a0] hover:to-[#d4a574] px-8 py-6 text-base font-semibold shadow-lg shadow-[#d4a574]/20 transition-all duration-300"
            onClick={() => window.location.href = "/chat"}
          >
            开始对话
            <ArrowRight size={18} />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white/10 text-white/70 hover:bg-white/5 hover:text-white hover:border-white/20 px-8 py-6 text-base transition-all duration-300"
          >
            了解更多
          </Button>
        </motion.div>

        {/* Stats or trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 flex items-center justify-center gap-8 md:gap-16 text-white/30 text-sm"
        >
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white/60">250+</span>
            <span>命盘工具</span>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white/60">3</span>
            <span>术数体系</span>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-white/60">100%</span>
            <span>可追溯推理</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </section>
  );
}
