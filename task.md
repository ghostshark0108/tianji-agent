# 任务：搭建命理网站首页

## 项目位置
D:/AI/01_projects/命理网站/ （Next.js 项目已创建，需要在此基础上搭建）

## 第一步：安装依赖
```bash
cd D:/AI/01_projects/命理网站
npx shadcn@latest init -d  # 默认配置，dark theme
npx shadcn@latest add button card accordion badge
npm install framer-motion lucide-react
```

## 设计风格
参考 tianfuagent.com 的暗色高级感：
- 背景色：深黑 #0a0a0f
- 强调色：金色/琥珀色 #d4a574
- 文字：白色为主
- 整体氛围：现代科技 + 古典神秘感

## 页面结构（单页 Landing Page）

### 组件文件结构
src/components/ 下创建：
- Navbar.tsx — 顶部导航
- Hero.tsx — 主视觉区
- PainPoints.tsx — 痛点卡片
- Tagline.tsx — 标语区
- ThreeSystems.tsx — 三大术数体系
- Capabilities.tsx — 六大核心能力
- FAQ.tsx — 常见问题折叠
- Footer.tsx — 底部

### 1. Navbar（顶部导航）
- 左：logo "天机 Agent"
- 中：功能介绍、关于我们
- 右：登录按钮
- sticky，滚动时 backdrop blur

### 2. Hero（主视觉）
- 大标题："真正的命理术数智能体"
- 副标题："紫微 · 八字 · 奇门"
- 描述："排盘・推演・洞察"
- 补充："250+ 定制化命盘工具，追求每次推理的透明与严谨。"
- 两个按钮："开始对话"（金色实心）、"了解更多"（描边）
- 背景：微妙的渐变动画或光晕效果
- 入场动画：fade up

### 3. PainPoints（痛点）
- 标题："这些问题，你可能反复想过"
- 三张卡片横排：
  - 探索可能 — "应该坚持，还是寻找新的旷野?"
  - 关系连结 — "灵魂伴侣，还是命运的试炼?"
  - 趋利避害 — "避开暗礁，还是盲目驶向风暴?"
- hover 时有金色光晕边框

### 4. Tagline（标语）
- "像大师一样思考；像工程师一样输出。"
- 下方说明文字

### 5. ThreeSystems（三大体系）
- 标题："三大术数体系，验证每一步推演"
- 三张卡片：
  - 紫微斗数 — Ziwei Doushu — 星曜排布，宫位推演
  - 子平八字 — Bazi — 阴阳五行，天干地支
  - 奇门遁甲 — Qimen Dunjia — 时空模型，趋吉避凶
- 滚动时 stagger 动画

### 6. Capabilities（核心能力）
- 标题："不止于解读，更在于推理"
- 六张卡片（2行3列）：
  1. 统一 Agent 架构 — 多能力模块协作，复合型决策参考
  2. 可视化推理 — 每步推理完整呈现，可追溯可复查
  3. 纯净知识库 — 古籍原典，严格筛选，忠于命盘
  4. 渐进式推理 — 幻觉抑制，证据积累，非随机生成
  5. 长期记忆 — 历史对话自动关联，完整上下文
  6. 时间线锚定 — 人生经历锚定时间轴，独一无二
- 每张卡片有 icon

### 7. FAQ
- 标题："常见问题"
- 用 shadcn/ui Accordion 组件
- 6个问题：
  1. 如何正确看待命理分析的结果？
  2. 和市面上免费的占卜软件有什么区别？
  3. 不太懂专业术语，能看懂报告吗？
  4. AI 真的能理解「命运」吗？
  5. 隐私信息安全吗？
  6. 什么是紫微斗数和八字命理学？

### 8. Footer
- CTA："准备好探索你的命盘了吗？" + 按钮
- 底部：关于我们、功能介绍、隐私政策、使用条款
- 社交链接占位：微信、小红书、抖音

## 技术要求
- 所有动画用 framer-motion（scroll-triggered stagger）
- 图标用 lucide-react
- 响应式（手机+桌面）
- 中文内容
- 组件拆分，不要一个巨大的 page.tsx

## 验证
完成后运行 `npm run build` 确认编译通过。
