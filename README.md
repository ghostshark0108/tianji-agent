# 天机 Agent — AI命理分析平台

一个基于AI的命理分析网站，支持八字排盘、AI对话分析。

## 功能

- ✅ 八字排盘（自动计算四柱、十神、大运）
- ✅ AI对话分析（流式输出，打字机效果）
- ✅ 暗色主题UI（参考tianfuagent.com风格）
- ✅ 付费墙（免费排盘，深度分析付费）
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
│           └── route.ts  # AI对话API（流式输出）
├── components/
│   ├── Hero.tsx          # 首页Hero区域
│   ├── Navbar.tsx        # 导航栏
│   ├── Paywall.tsx       # 付费墙组件
│   └── ui/               # shadcn/ui组件
└── scripts/
    └── bazi_calc.py      # 八字排盘脚本
```

## 部署

### Vercel 部署

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量：
   - `OPENAI_API_KEY` - AI API密钥
   - `OPENAI_BASE_URL` - AI API地址
4. 自动部署

### 环境变量

```env
OPENAI_API_KEY=your_api_key
OPENAI_BASE_URL=http://127.0.0.1:15721/v1
```

## 修改指南

### 添加新页面

在 `src/app/` 下创建新文件夹和 `page.tsx`。

### 修改排盘逻辑

编辑 `scripts/bazi_calc.py`。

### 修改AI分析

编辑 `src/app/api/chat/route.ts` 中的 system prompt。

### 修改UI风格

编辑各组件文件中的 Tailwind 类名。

## 付费功能

付费墙组件在 `src/components/Paywall.tsx`，需要接入支付：
1. 微信支付 / 支付宝
2. 用户认证系统
3. 付费状态管理

## 后续优化

- [ ] 接入RAG知识库（提升AI分析准确性）
- [ ] 用户认证系统
- [ ] 支付集成
- [ ] 更多命理体系（紫微斗数、奇门遁甲）
- [ ] 分享功能
- [ ] 移动端优化
