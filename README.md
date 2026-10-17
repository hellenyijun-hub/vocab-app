# 初一英语熟词僻义 · 背诵训练

面向初一学生的英语熟词僻义互动背诵网页。数据来自《初一英语熟词僻义背诵表》，共 **46 个高频词、92 条释义**，每词均含「原义」与「僻义」两组对比。

## 在线访问

https://hellenyijun-hub.github.io/vocab-app/

## 功能

| 模块 | 说明 |
| --- | --- |
| 首页 | 学习进度、掌握数、错词数、测验正确率四项统计 + 四个功能入口 |
| 闪卡背词 | 3D 翻卡，正面单词 + 音标，背面**原义与僻义上下对比**并附例句；支持朗读 |
| 僻义测验 | 每组 10 题四选一，**70% 概率专考僻义**；答错立即显示正确释义与例句 |
| 完整词表 | 全部 92 条释义，支持按单词 / 释义 / 例句全文搜索，可筛选僻义、原义、已掌握 |

### 设计要点

- **原义与僻义强制对照**：僻义用琥珀色高亮，与原义的蓝色形成视觉区分，直击这份表的核心价值
- **错词自动归集**：测验答错自动进错词本，答对后自动移出
- **进度本地存储**：基于 `localStorage`，无需后端与登录

## 技术栈

- React 19 + Vite 8
- Tailwind CSS 4
- 浏览器原生 `SpeechSynthesis` 朗读英文
- localStorage 持久化学习进度

## 快捷键（闪卡页）

- `空格` — 翻面
- `←` / `→` — 上一个 / 下一个

## 本地开发

```bash
npm install
npm run dev      # 开发
npm run build    # 构建，产物在 dist/
npm run preview  # 本地预览构建产物
```

## 部署说明

GitHub Pages 部署在 `/vocab-app/` 子路径，做了 `base: './'` 适配，保证资源用相对路径引用。

分支约定：`main` 存源码，`gh-pages` 存构建产物（根目录即站点根）。重新部署执行 `bash deploy-push.sh`。

## 数据说明

`src/data/words.js` 为唯一数据源，结构为：

```js
{
  id: 1,
  word: 'absent',
  phonetic: '/ˈæbsənt/',
  meanings: [
    { type: '原义', meaning: 'adj. 缺席的', example: 'He was absent from school...' },
    { type: '僻义', meaning: 'adj. 心不在焉的', example: 'She had an absent look...' }
  ]
}
```

增删单词只需改这一个文件，界面与测验题库会自动同步。

## 旧版本

原「外校单词小达人」（Join In 词汇）项目备份在 `_backup-20261017/`，当前已不再使用。