# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OfferGo is a personal algorithm interview prep platform focused on real company interview questions. Built on Jekyll, deployed to GitHub Pages, written primarily in Chinese. Features an online playground with in-browser Python execution (ACM stdin/stdout mode only) and an AI coding assistant. Originally forked from Zero2Leetcode.

## Commands

```bash
# Local dev server (no Jekyll required for basic dev)
python3 -m http.server 8080
# Playground: http://localhost:8080/playground.html

# Rebuild problem data after adding/editing problems
python3 build_problems.py

# Production build (requires Jekyll)
bundle exec jekyll build
```

## Architecture

### Two Interactive Pages

- **`index.html`** — Landing page with learning roadmap. Loads `app.js` for navigation and theme toggling.
- **`playground.html`** — Browser-based OJ. All problems use ACM stdin/stdout mode. Loads Pyodide (Python-in-browser via WebAssembly) and CodeMirror 5 editor. Core logic in `playground.js`, AI assistant in `ai-assistant.js`.

### JavaScript Data Flow

Problem data comes from two sources:

1. **`problems/` directory** — Each problem has a folder with `problem.md` (YAML frontmatter + Markdown description), optional `testcases.json`, and optional `solution.py`. This is the source of truth.
2. **`build_problems.py`** — Scans `problems/` and generates `assets/js/problems-data.js` (metadata array), copies test cases to `assets/js/testcases/`, and pre-builds HTML descriptions to `assets/js/problem-html/`.

At runtime, `playground.js` loads `problems-data.js` for the sidebar list. When a problem is selected, `fetchProblemDetail(id)` fetches pre-built HTML from `assets/js/problem-html/{id}.html` and `solution.py` (used as editor template) on demand. Problems without these files get auto-generated fallback via `buildFallbackProblem()`.

### Test Case System

All problems use ACM mode (stdin/stdout). Test cases live in `problems/{id}/testcases.json` and are copied to `assets/js/testcases/{id}.json` by the build script:

```json
{
  "cases": [
    { "stdin": "4 5\n11110\n...", "expected": "1" }
  ]
}
```

At runtime, `loadTestcases()` fetches the JSON and `runAllTests()` (the main `runCode()` function) runs all cases through `executePythonStdin()`, showing pass/fail results.

### Key Runtime Dependencies (loaded via CDN)

- **Pyodide** — Python runtime in WebAssembly. All code execution happens client-side.
- **CodeMirror 5** — Code editor with syntax highlighting. Theme synced to page theme: `material-darker` (dark) / `eclipse` (light).
- **Marked.js** — Markdown rendering for AI responses.

### Content Structure

Content is consolidated under `docs/`:
- `docs/00_python_basics/` — Python fundamentals
- `docs/01_data_structures/` — Arrays, linked lists, trees, heaps, etc.
- `docs/02_algorithms/` — Sorting, binary search, DP, greedy, etc.
- `docs/03_leetcode_practice/` — Solutions organized by topic subdirectory
- `docs/04_real_interviews/` — Company-specific questions (阿里, 华为, 字节, etc.)
- `docs/05_interview/` — Interview prep (手撕代码, 八股文, 综合测评)

Python solutions live in `problems/{id}/solution.py` (used as editor template). Additional practice solutions are in `solutions/`.

## Conventions

- All user-facing content and comments are in Chinese.
- Problem IDs follow platform prefixes: `lc-` (LeetCode), `cf-` (Codeforces), `nc-` (牛客), `hw-` (华为机考).
- `_config.yml` sets `baseurl: "/OfferGo"` — internal links must respect this prefix. Set to empty string for local dev.
- Jekyll excludes `*.py` and `__pycache__` from the build output.
- Navigation is defined in `_data/nav.yml`. To add a new section, add a module entry with `docs/` prefixed slug and create the corresponding content directory under `docs/`.
- New articles use `layout: default` with frontmatter (`title`, `description`, `eyebrow`). Article permalinks use `/docs/` prefix.
- CSS is split per page: `style.css` (global), `playground.css`. Theme support (light/dark) uses CSS custom properties. Primary color is blue (`--primary-hue: 217`).

## Adding a New Problem

1. Create `problems/{id}/` folder
2. Add `problem.md` with YAML frontmatter (title, difficulty, category, platform, url, tags) and Markdown description
3. Optionally add `testcases.json` with `{ "cases": [{ "stdin": "...", "expected": "..." }] }`
4. Optionally add `solution.py` (reference solution, also used as editor template)
5. Run `python3 build_problems.py`
6. Refresh the playground page
