"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Tagline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative" ref={ref}>
      {/* Decorative line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-24 bg-gradient-to-b from-transparent via-[#d4a574]/30 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] leading-tight mb-8">
            <span className="text-gold-gradient">像大师一样思考</span>
            <br />
            <span className="text-white/90">像工程师一样输出</span>
          </h2>
          <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed">
            将千年命理智慧与现代 AI 推理引擎深度融合，每一步推演都有据可查，每一次解读都严谨透明。
          </p>
        </motion.div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-px h-24 bg-gradient-to-b from-transparent via-[#d4a574]/30 to-transparent" />
    </section>
  );
}
