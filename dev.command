#!/bin/bash
cd "$(dirname "$0")"

echo ">>> 构建题库数据..."
python3 build_problems.py

echo ""
echo ">>> 启动 Jekyll 开发服务器..."
bundle exec jekyll serve --watch
