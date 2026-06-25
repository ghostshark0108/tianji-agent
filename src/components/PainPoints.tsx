"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Compass, Heart, Shield } from "lucide-react";

const painPoints = [
  {
    icon: Compass,
    title: "探索可能",
    description: "应该坚持，还是寻找新的旷野?",
  },
  {
    icon: Heart,
    title: "关系连结",
    description: "灵魂伴侣，还是命运的试炼?",
  },
  {
    icon: Shield,
    title: "趋利避害",
    description: "避开暗礁，还是盲目驶向风暴?",
  },
];

export default function PainPoints() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
            这些问题，你可能反复想过
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {painPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="card-glow group relative rounded-2xl border border-white/5 bg-[#111118] p-8 hover:border-[#d4a574]/20 transition-all duration-500 hover:bg-[#13131c]"
            >
              <div className="w-12 h-12 rounded-xl bg-[#d4a574]/10 flex items-center justify-center mb-6 group-hover:bg-[#d4a574]/20 transition-colors duration-300">
                <point.icon size={24} className="text-[#d4a574]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-[family-name:var(--font-heading)]">
                {point.title}
              </h3>
              <p className="text-white/50 leading-relaxed">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
