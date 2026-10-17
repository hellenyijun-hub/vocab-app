#!/usr/bin/env bash
# ============================================================
# vocab-app → GitHub 续跑脚本（授权后执行）
# 前提：本地已完成 git init + 首次提交，仅需推送与部署
# ============================================================

set -e

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_NAME="vocab-app"
GIT_USER="hellenyijun-hub"

cd "$REPO_DIR"

echo "==> 1/4 推送 main 分支（首次会弹出浏览器授权）"
git push -u origin main

echo "==> 2/4 构建"
npm run build
touch dist/.nojekyll

echo "==> 3/4 推送 gh-pages 分支"
git checkout --orphan gh-pages
git rm -rf --cached . -q
git add -f dist/. dist/index.html dist/favicon.svg dist/icons.svg dist/assets
git commit -m "build: 部署构建产物到 GitHub Pages"
git push origin gh-pages

echo "==> 4/4 切回 main"
git checkout main

echo ""
echo "=========================================================="
echo " 推送完成"
echo " 仓库: https://github.com/${GIT_USER}/${REPO_NAME}"
echo " 在线: https://${GIT_USER}.github.io/${REPO_NAME}/"
echo ""
echo " 剩余一步（网页点两下）："
echo " 打开 https://github.com/${GIT_USER}/${REPO_NAME}/settings/pages"
echo " Source 选 gh-pages 分支 + 目录 / (root)，保存"
echo "=========================================================="