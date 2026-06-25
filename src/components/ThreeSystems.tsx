"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Columns3, Grid3X3 } from "lucide-react";

const systems = [
  {
    icon: Star,
    name: "紫微斗数",
    english: "Ziwei Doushu",
    description:
      "以星曜组合推演人生格局，十二宫位精细解读命运蓝图，被誉为「天下第一神数」。",
  },
  {
    icon: Columns3,
    name: "子平八字",
    english: "Bazi / Four Pillars",
    description:
      "以出生年月日时四柱干支为核心，分析五行生克与十神关系，洞察性格与运势走向。",
  },
  {
    icon: Grid3X3,
    name: "奇门遁甲",
    english: "Qimen Dunjia",
    description:
      "古代帝王之学，以天盘、地盘、人盘、神盘四层结构推演时空能量，辅助决策与预测。",
  },
];

export default function ThreeSystems() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
            三大术数体系，验证每一步推演
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            融汇古今，三大命理体系交叉验证，让推理更加严谨可靠
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {systems.map((system, index) => (
            <motion.div
              key={system.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="card-glow group relative rounded-2xl border border-white/5 bg-[#111118] p-8 hover:border-[#d4a574]/20 transition-all duration-500"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4a574]/20 to-[#d4a574]/5 flex items-center justify-center mb-6 group-hover:from-[#d4a574]/30 group-hover:to-[#d4a574]/10 transition-all duration-300">
                <system.icon size={28} className="text-[#d4a574]" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-1 font-[family-name:var(--font-heading)]">
                {system.name}
              </h3>
              <p className="text-sm text-[#d4a574]/60 mb-4 font-mono">
                {system.english}
              </p>

              {/* Description */}
              <p className="text-white/50 leading-relaxed">
                {system.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
