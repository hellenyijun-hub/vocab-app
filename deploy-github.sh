#!/usr/bin/env bash
# ============================================================
# vocab-app → GitHub 部署脚本
#
# 用途：由于 WorkBuddy 的 GitHub 连接器以 GitHub App 身份接入，
#      无 Contents 写权限（403 Resource not accessible by integration），
#      改用本地 Git + Git Credential Manager 浏览器授权推送。
#
# 前置：已手动创建空仓库 hellenyijun-hub/vocab-app（public）
# 运行：bash deploy-github.sh
# ============================================================

set -e

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_NAME="vocab-app"
GIT_USER="hellenyijun-hub"
BRANCH="main"
GH_PAGES="gh-pages"

cd "$REPO_DIR"

echo "==> 1/6 清理旧 git 状态"
rm -rf .git

echo "==> 2/6 初始化仓库"
git init -b "$BRANCH"
git config user.name "yijun"
git config user.email "hellenyijun@gmail.com"
git remote add origin "https://github.com/${GIT_USER}/${REPO_NAME}.git"

echo "==> 3/6 暂存源码（.gitignore 已排除 node_modules 与 dist）"
git add -A
git status --short
git commit -m "feat: 外校单词小达人 - 初始化提交

React 19 + Vite 8 + Tailwind 4 + IndexedDB 背单词应用
- 6 个页面：首页/单元/闪卡/配对/连词成句/复习
- GitHub Pages 适配：base './' 相对路径 + HashRouter"

echo "==> 4/6 推送 main 分支（首次会弹出浏览器授权）"
git push -u origin "$BRANCH"

echo "==> 5/6 构建并推送 gh-pages 分支"
npm run build

touch dist/.nojekyll
git checkout --orphan "$GH_PAGES"
git rm -rf --cached . -q
git add -f dist/. dist/index.html dist/favicon.svg dist/icons.svg dist/assets
git commit -m "build: 部署构建产物到 GitHub Pages"
git push origin "$GH_PAGES"

echo "==> 6/6 切回 main 分支"
git checkout "$BRANCH"

echo ""
echo "=========================================================="
echo " 推送完成"
echo ""
echo " 仓库:   https://github.com/${GIT_USER}/${REPO_NAME}"
echo " 在线:   https://${GIT_USER}.github.io/${REPO_NAME}/"
echo ""
echo " 剩余一步（需你在网页点两下）："
echo " 1. 打开 https://github.com/${GIT_USER}/${REPO_NAME}/settings/pages"
 echo " 2. Source 选 gh-pages 分支、目录选 / (root)，保存"
echo ""
echo "=========================================================="