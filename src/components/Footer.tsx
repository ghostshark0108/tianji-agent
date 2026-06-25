"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const footerLinks = [
  { label: "关于我们", href: "#about" },
  { label: "功能介绍", href: "#capabilities" },
  { label: "隐私政策", href: "#" },
  { label: "使用条款", href: "#" },
];

const socialLinks = [
  { label: "微信", href: "#" },
  { label: "小红书", href: "#" },
  { label: "抖音", href: "#" },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      {/* CTA Section */}
      <section className="py-24 md:py-32 relative" ref={ref}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mb-6">
              准备好探索你的命盘了吗？
            </h2>
            <p className="text-white/40 text-lg mb-10 max-w-xl mx-auto">
              开始与天机 Agent 对话，让古老的命理智慧为你照亮前路。
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#d4a574] to-[#b8885a] text-[#0a0a0f] hover:from-[#e8c9a0] hover:to-[#d4a574] px-10 py-6 text-base font-semibold shadow-lg shadow-[#d4a574]/20 transition-all duration-300"
            >
              立即开始
              <ArrowRight size={18} />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d4a574] to-[#b8885a] flex items-center justify-center text-[#0a0a0f] font-bold text-sm">
                  天
                </div>
                <span className="text-lg font-semibold font-[family-name:var(--font-heading)]">
                  天机 <span className="text-[#d4a574]">Agent</span>
                </span>
              </div>
              <p className="text-sm text-white/30 leading-relaxed max-w-xs">
                真正的命理术数智能体，融合千年智慧与现代 AI 推理引擎。
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-sm font-semibold text-white/60 mb-4 uppercase tracking-wider">
                导航
              </h4>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/30 hover:text-white/60 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-sm font-semibold text-white/60 mb-4 uppercase tracking-wider">
                关注我们
              </h4>
              <ul className="space-y-3">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/30 hover:text-white/60 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/20">
              © 2026 天机 Agent. All rights reserved.
            </p>
            <p className="text-xs text-white/20">
              命理分析仅供参考，不构成任何决策建议
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
