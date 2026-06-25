"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "如何正确看待命理分析的结果？",
    answer:
      "命理分析是一种参考工具，而非绝对的预言。它帮助你了解自身的性格特质、潜在优势与可能的挑战，但最终的人生选择始终掌握在你手中。我们建议将分析结果作为自我认知的辅助，而非决策的唯一依据。",
  },
  {
    question: "和市面上免费的占卜软件有什么区别？",
    answer:
      "市面免费软件大多基于简单模板匹配，缺乏深度推理。天机 Agent 采用统一 Agent 架构，结合三大术数体系进行交叉验证，每一步推理都可追溯、可审查。我们追求的不是快速输出，而是严谨与透明。",
  },
  {
    question: "不太懂专业术语，能看懂报告吗？",
    answer:
      "完全可以。我们的报告会用通俗易懂的语言解读专业概念，同时保留完整的专业分析供进阶用户参考。无论你是命理初学者还是资深爱好者，都能找到适合自己的阅读深度。",
  },
  {
    question: "AI 真的能理解「命运」吗？",
    answer:
      "AI 不会「理解」命运，但它能高效地处理复杂的命盘数据、执行严格的推理规则、并以一致的标准输出分析。天机 Agent 的价值在于：将大师级的推理过程工程化、标准化，让每一次分析都经得起检验。",
  },
  {
    question: "隐私信息安全吗？",
    answer:
      "我们采用端到端加密保护你的个人信息和对话记录。你的出生数据仅用于命盘排布，不会被用于其他目的或分享给第三方。你可以随时删除自己的数据。",
  },
  {
    question: "什么是紫微斗数和八字命理学？",
    answer:
      "紫微斗数以出生时间排列星曜，通过十二宫位解读人生各方面；八字命理学（子平术）以出生年月日时的天干地支为基础，分析五行生克关系。两者都是传承千年的中华命理体系，各有侧重，互为补充。",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 md:py-32 relative" ref={ref}>
      <div className="max-w-3xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)] mb-4">
            常见问题
          </h2>
          <p className="text-white/40 text-lg">
            关于天机 Agent，你想知道的都在这里
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-white/5"
              >
                <AccordionTrigger className="text-left text-base font-medium text-white/80 hover:text-white hover:no-underline py-5 transition-colors [&[data-slot=accordion-trigger]]:justify-between">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/40 leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
