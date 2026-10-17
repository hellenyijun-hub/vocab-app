#!/usr/bin/env bash
# ============================================================
# 熟词僻义乐园 —— GitHub Pages 部署
#
# 单文件应用，无构建步骤：index.html 即全部内容。
# 用法：
#   bash deploy-push.sh
# 注意：本机代理不可用时必须绕过，否则 git 会超时
#   env -u http_proxy -u https_proxy -u HTTP_PROXY -u HTTPS_PROXY bash deploy-push.sh
# ============================================================

set -e

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_NAME="vocab-app"
GIT_USER="hellenyijun-hub"

# 代理健康检查：不可用时自动绕过
if ! curl -sI --max-time 8 --noproxy '*' https://github.com -o /dev/null 2>/dev/null; then
  echo "!! 检测到代理不可用，本次 git 操作将绕过代理"
  unset http_proxy https_proxy HTTP_PROXY HTTPS_PROXY
fi

cd "$REPO_DIR"

echo "==> 1/4 推送 main 分支（源码）"
git add -A
git commit -m "docs: 更新说明" 2>/dev/null || echo "  (无改动，跳过提交)"
git push origin main

echo "==> 2/4 准备 gh-pages 分支（站点文件）"
# 单文件应用无需构建；.nojekyll 防止 Jekyll 处理下划线开头的资源
touch .nojekyll

git checkout --orphan gh-pages-new 2>/dev/null || git checkout --orphan gh-pages
git read-tree --empty
# 用 hash-object -w 写入对象库，再挂到分支根目录
for f in index.html .nojekyll; do
  [ -f "$f" ] && git update-index --add --cacheinfo 100644,$(git hash-object -w "$f"),"$f"
done

echo "==> 3/4 提交并推送"
git commit -m "build: 部署熟词僻义乐园单文件应用"
git push origin "$(git branch --show-current)":gh-pages --force

echo "==> 4/4 清理临时分支"
git checkout -f main
git branch -D gh-pages-new 2>/dev/null || true

echo ""
echo "=========================================================="
echo " 部署完成"
echo " 仓库: https://github.com/${GIT_USER}/${REPO_NAME}"
echo " 在线: https://${GIT_USER}.github.io/${REPO_NAME}/"
echo "=========================================================="