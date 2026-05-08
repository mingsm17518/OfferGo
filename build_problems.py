#!/usr/bin/env python3
"""
OfferGo 题库构建脚本
扫描 problems/ 目录，生成 assets/js/problems-data.js 和 assets/js/testcases/*.json

用法：python3 build_problems.py
"""

import os
import json
import re
import shutil

PROBLEMS_DIR = 'problems'
OUTPUT_JS = 'assets/js/problems-data.js'
TESTCASES_DIR = 'assets/js/testcases'


def parse_frontmatter(content):
    """解析 Markdown 文件的 YAML frontmatter，返回 (metadata_dict, body_str)"""
    m = re.match(r'^---\s*\n(.*?)\n---\s*\n?(.*)', content, re.DOTALL)
    if not m:
        return {}, content
    raw = m.group(1)
    body = m.group(2)
    meta = {}
    for line in raw.split('\n'):
        line = line.strip()
        if not line or ':' not in line:
            continue
        key, _, val = line.partition(':')
        key = key.strip()
        val = val.strip()
        if val.startswith('[') and val.endswith(']'):
            val = [v.strip().strip('"\'') for v in val[1:-1].split(',')]
        else:
            val = val.strip('"\'')
        meta[key] = val
    return meta, body


def scan_problems():
    """扫描 problems/ 目录，返回按 id 排序的问题列表"""
    problems = []
    if not os.path.isdir(PROBLEMS_DIR):
        print(f'Error: {PROBLEMS_DIR}/ directory not found')
        return problems

    for name in sorted(os.listdir(PROBLEMS_DIR)):
        prob_dir = os.path.join(PROBLEMS_DIR, name)
        if not os.path.isdir(prob_dir):
            continue
        md_path = os.path.join(prob_dir, 'problem.md')
        if not os.path.exists(md_path):
            print(f'  Warning: {name}/ has no problem.md, skipping')
            continue

        with open(md_path, 'r', encoding='utf-8') as f:
            content = f.read()
        meta, _ = parse_frontmatter(content)

        has_testcases = os.path.exists(os.path.join(prob_dir, 'testcases.json'))
        has_solution = os.path.exists(os.path.join(prob_dir, 'solution.py'))

        entry = {
            'id': name,
            'title': meta.get('title', name),
            'difficulty': meta.get('difficulty', 'medium'),
            'category': meta.get('category', 'other'),
            'platform': meta.get('platform', 'other'),
            'url': meta.get('url', ''),
        }
        if has_testcases:
            entry['hasTestcases'] = True
        if has_solution:
            entry['hasSolution'] = True
        if 'tags' in meta:
            entry['tags'] = meta['tags']

        problems.append(entry)

    return problems


def copy_testcases():
    """复制 problems/*/testcases.json 到 assets/js/testcases/{id}.json"""
    os.makedirs(TESTCASES_DIR, exist_ok=True)
    copied = 0
    for name in sorted(os.listdir(PROBLEMS_DIR)):
        src = os.path.join(PROBLEMS_DIR, name, 'testcases.json')
        if os.path.exists(src):
            dst = os.path.join(TESTCASES_DIR, f'{name}.json')
            shutil.copy2(src, dst)
            copied += 1
    return copied


def js(obj):
    """Convert a Python value to a JS literal string."""
    return json.dumps(obj, ensure_ascii=False)


def generate_problems_js(problems):
    """生成 assets/js/problems-data.js"""
    entries = []
    for p in problems:
        fields = [
            f'    id: {js(p["id"])}',
            f'    title: {js(p["title"])}',
            f'    difficulty: {js(p["difficulty"])}',
            f'    category: {js(p["category"])}',
            f'    platform: {js(p["platform"])}',
            f'    url: {js(p["url"])}',
        ]
        if p.get('hasTestcases'):
            fields.append(f'    testcaseFile: {js(p["id"])}')
        if p.get('hasSolution'):
            fields.append('    hasSolution: true')
        if p.get('tags'):
            tags_js = ', '.join(js(t) for t in p['tags'])
            fields.append(f'    tags: [{tags_js}]')
        entries.append('  {\n' + ',\n'.join(fields) + '\n  }')

    entries_str = ',\n'.join(entries)
    content = (
        '/**\n'
        ' * OfferGo 多平台题库数据（自动生成，请勿手动编辑）\n'
        ' * 由 build_problems.py 从 problems/ 目录生成\n'
        ' */\n'
        '\n'
        'const PROBLEMS_DATA = [\n'
        f'{entries_str}\n'
        '];\n'
        '\n'
        '// 平台映射\n'
        'const PLATFORM_NAMES = {\n'
        '    "leetcode": "LeetCode",\n'
        '    "codeforces": "Codeforces",\n'
        '    "nowcoder": "牛客",\n'
        '    "huawei": "华为机考"\n'
        '};\n'
        '\n'
        '// 分类映射\n'
        'const CATEGORY_NAMES = {\n'
        '    "hash": "哈希表",\n'
        '    "two-pointers": "双指针",\n'
        '    "sliding-window": "滑动窗口",\n'
        '    "subarray": "子串/子数组",\n'
        '    "stack": "栈",\n'
        '    "linked-list": "链表",\n'
        '    "tree": "二叉树",\n'
        '    "graph": "图论",\n'
        '    "backtrack": "回溯",\n'
        '    "binary-search": "二分查找",\n'
        '    "dp": "动态规划",\n'
        '    "greedy": "贪心",\n'
        '    "heap": "堆",\n'
        '    "matrix": "矩阵",\n'
        '    "other": "技巧",\n'
        '    "huawei": "华为机考"\n'
        '};\n'
        '\n'
        '// 难度映射\n'
        'const DIFFICULTY_NAMES = {\n'
        '    "easy": "简单",\n'
        '    "medium": "中等",\n'
        '    "hard": "困难"\n'
        '};\n'
        '\n'
        '// 导出\n'
        'if (typeof window !== "undefined") {\n'
        '    window.PROBLEMS_DATA = PROBLEMS_DATA;\n'
        '    window.CATEGORY_NAMES = CATEGORY_NAMES;\n'
        '    window.DIFFICULTY_NAMES = DIFFICULTY_NAMES;\n'
        '    window.PLATFORM_NAMES = PLATFORM_NAMES;\n'
        '}\n'
    )

    with open(OUTPUT_JS, 'w', encoding='utf-8') as f:
        f.write(content)


def main():
    print('Scanning problems/ directory...')
    problems = scan_problems()
    if not problems:
        print('No problems found.')
        return

    print(f'Found {len(problems)} problems')
    with_testcases = sum(1 for p in problems if p.get('hasTestcases'))
    with_solution = sum(1 for p in problems if p.get('hasSolution'))
    print(f'  With testcases: {with_testcases}')
    print(f'  With solution:  {with_solution}')

    print(f'\nCopying testcases to {TESTCASES_DIR}/...')
    copied = copy_testcases()
    print(f'  Copied {copied} files')

    print(f'\nGenerating {OUTPUT_JS}...')
    generate_problems_js(problems)
    print('Done!')


if __name__ == '__main__':
    main()
