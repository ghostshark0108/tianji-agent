# 天机 Agent — AI命理分析平台

一个基于AI的命理分析网站，支持八字排盘、AI对话分析。

## 功能

- ✅ 八字排盘（自动计算四柱、十神、大运）
- ✅ AI对话分析（接入MiMo模型）
- ✅ 暗色主题UI（参考tianfuagent.com风格）
- ⏳ 付费墙（免费排盘，深度分析付费）
- ⏳ 部署上线

## 技术栈

- Next.js 16
- React 19
- Tailwind CSS 4
- shadcn/ui
- Framer Motion
- lunar-python（八字排盘）

## 本地运行

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## 项目结构

```
src/
├── app/
│   ├── page.tsx          # 首页（落地页）
│   ├── chat/
│   │   └── page.tsx      # 对话页面
│   └── api/
│       ├── bazi/
│       │   └── route.ts  # 八字排盘API
│       └── chat/
│           └── route.ts  # AI对话API
├── components/
│   ├── Hero.tsx          # 首页Hero区域
│   ├── Navbar.tsx        # 导航栏
│   ├── PainPoints.tsx    # 痛点展示
│   ├── Tagline.tsx       # 标语
│   ├── ThreeSystems.tsx  # 三大术数体系
│   ├── Capabilities.tsx  # 核心能力
│   ├── FAQ.tsx           # 常见问题
│   ├── Footer.tsx        # 页脚
│   └── ui/               # shadcn/ui组件
└── scripts/
    └── bazi_calc.py      # 八字排盘脚本
```

## 部署

推荐使用 Vercel：

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 自动部署

## 修改指南

### 添加新页面

在 `src/app/` 下创建新文件夹和 `page.tsx`。

### 修改排盘逻辑

编辑 `scripts/bazi_calc.py`。

### 修改AI分析

编辑 `src/app/api/chat/route.ts` 中的 system prompt。

### 修改UI风格

编辑 `tailwind.config.ts` 和各组件文件。
