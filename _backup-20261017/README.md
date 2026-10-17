# 外校单词小达人（vocab-app）

面向小学高年级 / 初中的 Join In 词汇背记网页应用。纯前端实现，数据保存在浏览器 IndexedDB，无需后端与登录。

## 在线访问

https://hellenyijun-hub.github.io/vocab-app/

## 功能

| 模块 | 说明 |
| --- | --- |
| 首页 Home | 按年级（3–6 年级）展示词汇书、学习进度、错词数 |
| 单元 Units | 查看各单元词汇列表与掌握情况 |
| 闪卡 Flashcards | 翻卡背词 + 语音朗读（TTS） |
| 配对 MatchGame | 单词与释义配对游戏 |
| 连词成句 SentenceBuilder | 用单词拼句子，训练语序 |
| 复习 Review | 集中复习错词本 |

## 技术栈

- React 19 + Vite 8
- react-router-dom 7（HashRouter）
- Tailwind CSS 4
- IndexedDB（本地存储，无后端依赖）

## 本地开发

```bash
npm install
npm run dev      # 开发
npm run build    # 构建，产物在 dist/
npm run preview  # 本地预览构建产物
```

## 部署说明

GitHub Pages 部署在 `/vocab-app/` 子路径下，因此做了两处适配：

1. `vite.config.js` 中设置 `base: './'`，构建产物使用相对路径引用资源
2. `src/App.jsx` 使用 `HashRouter` 而非 `BrowserRouter`，避免子路由刷新时 Pages 返回 404

`gh-pages` 分支存放构建产物（根目录即站点根），`main` 分支存放源码。

## 数据说明

所有学习记录（错词、进度、连续打卡）存于浏览器本地 IndexedDB（库名 `VocabAppDB`），清除浏览器数据或更换设备后不会同步。