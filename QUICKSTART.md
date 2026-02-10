# 🚀 快速启动指南

## 5 分钟快速体验

### 1️⃣ 安装依赖

```bash
npm install
```

### 2️⃣ 启动开发服务器

```bash
npm run dev
```

### 3️⃣ 打开浏览器

访问 http://localhost:3000

### 4️⃣ 开启移动设备模式

在 Chrome DevTools 中按 `Ctrl+Shift+M` (Windows) 或 `Cmd+Shift+M` (Mac)

---

## 📱 功能测试清单

### 基础功能
- [ ] 上下滑动切换视频
- [ ] 视频自动播放/暂停
- [ ] 点击屏幕暂停/播放
- [ ] 双击屏幕点赞（红心动画）

### 交互功能
- [ ] 点击右侧点赞按钮（弹跳动画）
- [ ] 点击评论按钮（打开抽屉）
- [ ] 点击分享按钮
- [ ] 点击关注按钮

### 评论功能
- [ ] 打开评论抽屉
- [ ] 滚动评论列表
- [ ] 点赞评论
- [ ] 发表评论

### 性能测试
- [ ] 快速滑动多个视频
- [ ] 观察内存占用
- [ ] 检查滚动流畅度
- [ ] 测试无限滚动加载

---

## 🎯 最佳体验设备

### 推荐设备
- iPhone 12/13/14/15 Pro
- Samsung Galaxy S21/S22/S23
- Google Pixel 6/7/8

### 推荐浏览器
- Chrome 120+
- Safari 17+
- Edge 120+

---

## 🔧 常见问题

### Q: 视频无法播放？
**A**: 检查网络连接，视频来自 Google Cloud Storage，需要稳定的网络。

### Q: 滚动不流畅？
**A**: 
1. 关闭其他标签页释放内存
2. 检查 CPU 占用率
3. 尝试刷新页面

### Q: 双击点赞没反应？
**A**: 确保点击的是视频区域，不是右侧工具栏。

### Q: 评论抽屉无法打开？
**A**: 点击右侧评论图标（不是双击）。

---

## 🎨 自定义配置

### 修改视频数据

编辑 `src/lib/mockData.ts`:

```typescript
export const mockVideos: Video[] = [
  {
    id: "1",
    videoUrl: "你的视频地址",
    coverUrl: "你的封面图",
    // ... 其他配置
  },
];
```

### 修改主题颜色

编辑 `src/app/globals.css`:

```css
html,
body {
  background: #000; /* 修改背景色 */
  color: #fff;      /* 修改文字颜色 */
}
```

### 修改预加载策略

编辑 `src/components/VideoFeed.tsx`:

```typescript
const threshold = 3; // 修改预加载阈值
```

---

## 📊 性能监控

### 使用 Chrome DevTools

1. 打开 DevTools (F12)
2. 切换到 Performance 标签
3. 点击录制按钮
4. 滑动几个视频
5. 停止录制查看性能报告

### 关键指标

- **FPS**: 应保持在 58-60
- **内存**: 应低于 200MB
- **CPU**: 应低于 20%

---

## 🚀 部署到生产环境

### Vercel 部署（推荐）

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel
```

### 其他平台

- **Netlify**: `npm run build` → 上传 `.next` 文件夹
- **Railway**: 连接 GitHub 仓库自动部署
- **Docker**: 使用 Next.js 官方 Docker 镜像

---

## 📚 下一步学习

1. 阅读 [README.md](./README.md) 了解项目架构
2. 查看 [PERFORMANCE.md](./PERFORMANCE.md) 学习性能优化
3. 参考 [OPTIMIZATION_SUMMARY.md](./OPTIMIZATION_SUMMARY.md) 了解最新优化
4. 查看 [CHANGELOG.md](./CHANGELOG.md) 追踪版本更新

---

## 💡 开发技巧

### 热重载
修改代码后自动刷新，无需手动重启服务器。

### TypeScript 类型检查
```bash
npm run type-check
```

### 代码格式化
```bash
npm run lint
```

### 构建生产版本
```bash
npm run build
npm start
```

---

## 🎉 开始探索吧！

现在你已经准备好体验这个高仿抖音 Web App 了！

如有问题，请查看文档或提交 Issue。

**祝你使用愉快！** 🚀
