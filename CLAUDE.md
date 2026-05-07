# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EasyAlgo is a personal algorithm learning platform and knowledge base. Built on Jekyll, deployed to GitHub Pages, written primarily in Chinese. Features an online playground with in-browser Python execution, ACM-style IDE, and an AI coding assistant. Originally forked from Zero2Leetcode.

## Commands

```bash
# Local dev server (no Jekyll required for basic dev)
python3 -m http.server 8080
# Playground: http://localhost:8080/playground.html
# ACM IDE:    http://localhost:8080/acm-playground.html

# Production build (requires Jekyll)
bundle exec jekyll build

# Run a single Python solution
python3 03_leetcode_practice/hash/lc_001_two_sum.py

# Python tooling (optional, from requirements.txt)
black <file.py>
flake8 <file.py>
mypy <file.py>
pytest <file.py>          # for solution files that include test cases
```

## Architecture

### Three Interactive Pages

- **`index.html`** — Landing page with learning roadmap. Loads `app.js` for navigation and theme toggling.
- **`playground.html`** — Browser-based OJ with 98 LeetCode Hot 100 problems. Loads Pyodide (Python-in-browser via WebAssembly) and CodeMirror 5 editor. Core logic in `playground.js`, AI assistant in `ai-assistant.js`.
- **`acm-playground.html`** — ACM-style IDE simulating real interview environments with stdin/stdout. Standalone logic in `acm-playground.js` + `acm-bridge.js`.

### JavaScript Data Flow

`problems-data.js` defines `PROBLEMS_DATA` — a single array of all problem metadata (id, title, difficulty, category, URLs). This is the source of truth; the playground reads it to render the problem list. Problem solution code is split across `playground-extra/batch-{1..8}.js` for load performance.

`ai-assistant.js` uses an OpenAI-compatible API (default: OpenRouter free tier). It auto-injects the current problem description + user code as context. Config is persisted in localStorage under `z2l_ai_config`.

### Key Runtime Dependencies (loaded via CDN)

- **Pyodide** — Python runtime in WebAssembly. All code execution happens client-side.
- **CodeMirror 5** — Code editor with syntax highlighting.
- **Marked.js** — Markdown rendering for AI responses.

### Content Structure

Content directories follow a numbered learning path:
- `notes/` — Personal study notes and algorithm templates
- `00_python_basics/` — Python fundamentals (variables, control flow, functions, collections)
- `01_data_structures/` — Arrays, linked lists, trees, heaps, etc.
- `02_algorithms/` — Sorting, binary search, DP, greedy, etc.
- `03_leetcode_practice/` — Solutions organized by topic subdirectory (hash, two_pointers, dp, etc.)
- `04_real_interviews/` — Company-specific questions (alibaba, huawei, bytedance, etc.)
- `05_interview/` — General interview prep (fundamentals, coding, assessment)

## Conventions

- Solution files follow the naming pattern `lc_XXX_name.py` (e.g., `lc_001_two_sum.py`).
- All user-facing content and comments are in Chinese.
- `playground.js` injects helper classes (`ListNode`, `TreeNode`) into the Pyodide environment so linked list and tree problems work seamlessly.
- The ACM playground provides 7 input templates (single int, array, matrix, multi-case, graph, string, list) that pre-fill both code and stdin.
- CSS is split per page: `style.css` (global), `playground.css`, `acm-playground.css`. Theme support (light/dark) uses CSS custom properties. Primary color is blue (`--primary-hue: 217`).
- `_config.yml` sets `baseurl` — internal links must respect this prefix. Set to empty string for local dev, or your repo name for GitHub Pages.
- Jekyll excludes `*.py` and `__pycache__` from the build output.
- Navigation is defined in `_data/nav.yml`. To add a new section, add a module entry and create the corresponding content directory.
- New articles use `layout: default` with frontmatter (`title`, `description`, `eyebrow`).
