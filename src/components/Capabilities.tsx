"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Network,
  Eye,
  BookOpen,
  Layers,
  Brain,
  Clock,
} from "lucide-react";

const capabilities = [
  {
    icon: Network,
    title: "统一 Agent 架构",
    description: "多能力模块协作，构建完整推理链路，而非碎片化回答。",
  },
  {
    icon: Eye,
    title: "可视化推理",
    description: "每步推理可追溯、可审查，告别 AI 黑箱。",
  },
  {
    icon: BookOpen,
    title: "纯净知识库",
    description: "古籍原典，严格筛选，杜绝网络杂音污染知识源。",
  },
  {
    icon: Layers,
    title: "渐进式推理",
    description: "幻觉抑制机制，基于证据逐步积累，确保结论可靠。",
  },
  {
    icon: Brain,
    title: "长期记忆",
    description: "历史对话自动关联，构建持续深入的命理认知图谱。",
  },
  {
    icon: Clock,
    title: "时间线锚定",
    description: "人生经历锚定时间轴，让分析与真实事件精准对应。",
  },
];

export default function Capabilities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="capabilities" className="py-24 md:py-32 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
            不止于解读，更在于推理
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            六大核心能力，重新定义命理分析的深度与精度
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((cap, index) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl border border-white/5 bg-[#111118] p-7 hover:border-[#d4a574]/15 transition-all duration-500 hover:bg-[#13131c]"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#d4a574]/10 flex items-center justify-center shrink-0 group-hover:bg-[#d4a574]/20 transition-colors duration-300">
                  <cap.icon size={20} className="text-[#d4a574]" />
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
