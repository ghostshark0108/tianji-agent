# 命理网站

> AI 命理分析平台，参考 tianfuagent.com 风格

## 为什么做

商业化项目。用 AI + 命理知识做付费分析服务，目标是在 7 月前能开始接单赚钱。

## 做得怎么样

**已完成：**
- ✅ 技术选型：Next.js 16 + shadcn/ui + Tailwind 4 + Framer Motion
- ✅ 视觉方向：暗色高级感，金色点缀，参考 tianfuagent.com
- ✅ 首页骨架（8个组件：Hero, Navbar, PainPoints, Tagline, ThreeSystems, Capabilities, FAQ, Footer）
- ✅ Chat页面（生日输入 → 八字排盘 → AI对话）
- ✅ 八字排盘API（lunar-python，四柱、十神、大运）
- ✅ AI对话API（流式输出，打字机效果，接入CC Switch MiMo）
- ✅ 付费墙组件（Paywall.tsx）

**待完成：**
- ⬜ 接入支付（微信/支付宝）
- ⬜ 用户认证系统
- ⬜ RAG知识库（提升AI分析准确性）
- ⬜ 部署上线（Vercel）
- ⬜ 更多命理体系（紫微斗数、奇门遁甲）

## 最后更新

2026-06-25

## 迭代次数

v2

## 文件位置

- 项目代码：`D:\AI\01_projects\命理网站\`
- 八字排盘脚本：`scripts/bazi_calc.py`
- AI对话API：`src/app/api/chat/route.ts`
- 付费墙组件：`src/components/Paywall.tsx`
