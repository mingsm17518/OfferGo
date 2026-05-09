// =============================================
// OfferGo Playground - 在线 OJ
// =============================================

// ---------- 题目数据 ----------
// DETAILED_PROBLEMS 已迁移到 problems/ 文件夹，运行时按需加载
const DETAILED_PROBLEMS = [];

// 题目详情缓存
const problemDetailCache = {};

async function fetchProblemDetail(id) {
    if (problemDetailCache[id]) return problemDetailCache[id];

    const result = { description: null, template: null };

    // 加载预构建的题目描述 HTML
    try {
        const htmlResp = await fetch(`assets/js/problem-html/${id}.html`);
        if (htmlResp.ok) {
            result.description = await htmlResp.text();
        }
    } catch (e) { /* ignore */ }

    // 加载模板/参考代码
    try {
        const pyResp = await fetch(`problems/${id}/solution.py`);
        if (pyResp.ok) {
            result.template = await pyResp.text();
        }
    } catch (e) { /* ignore */ }

    problemDetailCache[id] = result;
    return result;
}

// 判断 PROBLEMS_DATA 中的题目是否有详细数据
function metaHasDetail(meta) {
    return meta.testcaseFile || meta.hasSolution;
}

// ---------- 辅助函数 ----------


const FALLBACK_CATEGORY_NAMES = {
    "hash": "哈希表",
    "two-pointers": "双指针",
    "sliding-window": "滑动窗口",
    "subarray": "子串/子数组",
    "stack": "栈",
    "linked-list": "链表",
    "tree": "二叉树",
    "graph": "图论",
    "backtrack": "回溯",
    "binary-search": "二分查找",
    "dp": "动态规划",
    "greedy": "贪心",
    "heap": "堆",
    "matrix": "矩阵",
    "other": "其他",
};

const FALLBACK_DIFFICULTY_NAMES = {
    "easy": "简单",
    "medium": "中等",
    "hard": "困难",
};

function getCategoryName(category) {
    if (typeof window !== 'undefined' && window.CATEGORY_NAMES?.[category]) {
        return window.CATEGORY_NAMES[category];
    }
    return FALLBACK_CATEGORY_NAMES[category] || category;
}

function getDifficultyName(difficulty) {
    if (typeof window !== 'undefined' && window.DIFFICULTY_NAMES?.[difficulty]) {
        return window.DIFFICULTY_NAMES[difficulty];
    }
    return FALLBACK_DIFFICULTY_NAMES[difficulty] || difficulty;
}

function normalizeDifficulty(difficulty) {
    return {
        easy: 'Easy',
        medium: 'Medium',
        hard: 'Hard',
    }[difficulty] || difficulty;
}

function buildFallbackProblem(meta) {
    const platform = meta.platform || '';
    const PLATFORM_PREFIX = { leetcode: 'LC', codeforces: 'CF', nowcoder: 'NC', huawei: 'HW' };
    const prefix = PLATFORM_PREFIX[platform] || '';
    const title = prefix ? `${prefix} ${meta.id} - ${meta.title}` : `${meta.id} - ${meta.title}`;
    const difficultyText = getDifficultyName(meta.difficulty);
    const categoryText = getCategoryName(meta.category);
    const solutionUrl = meta.url;
    const platformLabel = { leetcode: 'LeetCode', codeforces: 'Codeforces', nowcoder: '牛客', huawei: '华为机考' }[platform] || '外部平台';
    const hasDetail = metaHasDetail(meta);
    const blogTip = hasDetail
        ? '<p>正在加载题目详情...</p>'
        : (meta.blogUrl
            ? '<p>这道题已经有博客详解，可以直接查看解法。</p>'
            : `<p>该题暂未接入本地测试用例，可以跳转 ${platformLabel} 练习。</p>`);

    return {
        id: meta.id,
        title,
        difficulty: normalizeDifficulty(meta.difficulty),
        tags: meta.tags || [categoryText],
        description: `
<h3>${meta.id}. ${escapeHtml(meta.title)} <span class="difficulty-tag ${meta.difficulty}">${escapeHtml(difficultyText)}</span></h3>
<p>该题已经加入 OfferGo 题单，但当前页面还没有接入本地测试用例和专用模板。</p>
${blogTip}
<ul>
<li>分类：${escapeHtml(categoryText)}</li>
<li>难度：${escapeHtml(difficultyText)}</li>
<li>来源：${platformLabel}</li>
</ul>`,
        template: `import sys

def solve():
    """
    ${platformLabel} ${meta.id}. ${meta.title}
    """
    data = sys.stdin.read().split()
    pass

solve()
`,
        solutionUrl,
        blogUrl: meta.blogUrl || null,
        isFallback: true,
    };
}

function getExtraDetailedProblems() {
    if (typeof window === 'undefined' || !Array.isArray(window.PLAYGROUND_EXTRA_PROBLEMS)) {
        return [];
    }
    return window.PLAYGROUND_EXTRA_PROBLEMS;
}

function getAllDetailedProblems() {
    return [...DETAILED_PROBLEMS, ...getExtraDetailedProblems()];
}

function buildPlaygroundProblems() {
    const allProblems = (typeof window !== 'undefined' && Array.isArray(window.PROBLEMS_DATA) && window.PROBLEMS_DATA.length)
        ? window.PROBLEMS_DATA
        : [];

    const baseProblems = allProblems.map(meta => {
        if (metaHasDetail(meta)) {
            const fallback = buildFallbackProblem(meta);
            fallback.hasDetail = true;
            fallback.testcaseFile = meta.testcaseFile || null;
            return fallback;
        }
        return buildFallbackProblem(meta);
    });
    const extraOnly = getExtraDetailedProblems();
    return [...baseProblems, ...extraOnly];
}

let PROBLEMS = [];

function refreshProblems() {
    PROBLEMS = buildPlaygroundProblems();
    if (typeof window !== 'undefined') {
        window.PROBLEMS = PROBLEMS;
    }
    return PROBLEMS;
}

function getRequestedProblemId() {
    const urlId = new URLSearchParams(window.location.search).get('id');
    const parsedId = parseInt(urlId, 10);
    return Number.isNaN(parsedId) ? null : parsedId;
}

function syncProblemRegistry() {
    const previousProblemId = currentProblem?.id ?? null;
    refreshProblems();

    const select = document.getElementById('problem-select');
    if (!select) return;

    initProblemSelect();

    const requestedProblemId = getRequestedProblemId();
    const targetProblemId = requestedProblemId ?? previousProblemId ?? PROBLEMS[0]?.id ?? null;
    const nextIndex = PROBLEMS.findIndex(problem => problem.id === targetProblemId);

    if (nextIndex !== -1) {
        currentProblem = PROBLEMS[nextIndex];
        select.value = String(nextIndex);
    } else {
        currentProblem = PROBLEMS[0] || null;
        if (currentProblem) {
            select.value = '0';
        }
    }

    if (editor && currentProblem) {
        loadProblem(currentProblem);
    }
}

if (typeof window !== 'undefined') {
    window.syncPlaygroundProblems = syncProblemRegistry;
}

// ---------- 本地缓存 ----------
const STORAGE_KEY = 'z2l_playground_';

function saveCode(problemId, code) {
    try { localStorage.setItem(STORAGE_KEY + problemId, code); } catch (e) { /* quota */ }
}

function loadCode(problemId) {
    try { return localStorage.getItem(STORAGE_KEY + problemId); } catch (e) { return null; }
}

function clearSavedCode(problemId) {
    try { localStorage.removeItem(STORAGE_KEY + problemId); } catch (e) { /* noop */ }
}

// ---------- Python 自动补全 ----------
const PYTHON_KEYWORDS = [
    // 关键字
    'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await',
    'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except',
    'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is',
    'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return',
    'try', 'while', 'with', 'yield',
    // 内置函数
    'abs', 'all', 'any', 'bin', 'bool', 'chr', 'dict', 'dir',
    'divmod', 'enumerate', 'filter', 'float', 'format', 'frozenset',
    'getattr', 'hasattr', 'hash', 'hex', 'id', 'input', 'int',
    'isinstance', 'issubclass', 'iter', 'len', 'list', 'map', 'max',
    'min', 'next', 'object', 'oct', 'open', 'ord', 'pow', 'print',
    'property', 'range', 'repr', 'reversed', 'round', 'set',
    'setattr', 'slice', 'sorted', 'str', 'sum', 'super', 'tuple',
    'type', 'vars', 'zip',
    // 常用方法
    'append', 'extend', 'insert', 'remove', 'pop', 'clear', 'index',
    'count', 'sort', 'reverse', 'copy', 'keys', 'values', 'items',
    'get', 'update', 'add', 'discard', 'union', 'intersection',
    'split', 'join', 'strip', 'replace', 'find', 'startswith', 'endswith',
    'upper', 'lower', 'isdigit', 'isalpha',
];

function pythonHint(cm) {
    const cur = cm.getCursor();
    const token = cm.getTokenAt(cur);
    let start = token.start;
    let end = cur.ch;
    const word = token.string.slice(0, end - start);

    if (!word || word.length < 1) return;

    // 从代码中提取用户定义的标识符
    const code = cm.getValue();
    const userIdents = new Set();
    const identRe = /\b([a-zA-Z_]\w*)\b/g;
    let m;
    while ((m = identRe.exec(code)) !== null) {
        if (m[1] !== word) userIdents.add(m[1]);
    }

    const allWords = [...new Set([...PYTHON_KEYWORDS, ...userIdents])];
    const matches = allWords.filter(w =>
        w.startsWith(word) && w !== word
    ).sort();

    if (!matches.length) return;

    return {
        list: matches.slice(0, 15),
        from: CodeMirror.Pos(cur.line, start),
        to: CodeMirror.Pos(cur.line, end),
    };
}

// ---------- 全局状态 ----------
let pyodide = null;
let editor = null;
let currentProblem = null;
let debugFrames = [];
let debugIndex = -1;
let debugLineWidget = null;
const breakpoints = new Set();
const CPH_CODE_KEY = 'z2l_cph_code';
const CPH_INPUT_KEY = 'z2l_cph_input';

// ---------- 初始化 ----------
document.addEventListener('DOMContentLoaded', () => {
    initEditor();
    syncProblemRegistry();
    initPyodide();
    bindEvents();

    // Restore panel states
    if (localStorage.getItem('z2l_left_collapsed') === 'true') {
        document.body.classList.add('left-collapsed');
    }
});

// Some deploy platforms may delay or reorder non-critical scripts.
// Re-sync once the full page has loaded so late extra batches are still picked up.
window.addEventListener('load', () => {
    syncProblemRegistry();
});

function getEditorTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'eclipse' : 'material-darker';
}

function initEditor() {
    editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
        mode: 'python',
        theme: getEditorTheme(),
        lineNumbers: true,
        indentUnit: 4,
        tabSize: 4,
        indentWithTabs: false,
        lineWrapping: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        hintOptions: { completeSingle: false },
        extraKeys: {
            'Tab': (cm) => cm.replaceSelection('    ', 'end'),
            'Ctrl-Enter': () => runCode(),
            'Cmd-Enter': () => runCode(),
            'Ctrl-Space': (cm) => cm.showHint({ hint: pythonHint }),
        },
    });
    window.editor = editor; // expose for AI assistant

    // Breakpoint click handler
    editor.on('gutterClick', (cm, line, gutter) => {
        if (gutter === 'CodeMirror-linenumbers' || gutter === 'breakpoints') {
            toggleBreakpoint(cm, line);
        }
    });

    // 输入时自动弹出补全
    editor.on('inputRead', (cm, change) => {
        if (change.origin !== '+input') return;
        const ch = change.text[0];
        // 输入字母/下划线且当前 token 长度 >= 2 时触发
        if (/[a-zA-Z_]/.test(ch)) {
            const token = cm.getTokenAt(cm.getCursor());
            if (token.string.length >= 2) {
                cm.showHint({ hint: pythonHint });
            }
        }
    });

    // 自动保存到 localStorage（防抖）
    let saveTimer = null;
    editor.on('change', () => {
        clearTimeout(saveTimer);
        saveTimer = setTimeout(() => {
            if (currentProblem) {
                saveCode(currentProblem.id, editor.getValue());
            }
        }, 500);
    });
}

function initProblemSelect() {
    const select = document.getElementById('problem-select');
    select.innerHTML = '';
    PROBLEMS.forEach((p, i) => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = p.title;
        select.appendChild(opt);
    });
}

async function loadProblem(problem) {
    currentProblem = problem;
    window.currentProblem = problem; // expose for AI assistant

    // Update prev/next button states
    const select = document.getElementById('problem-select');
    const prevBtn = document.getElementById('prev-problem-btn');
    const nextBtn = document.getElementById('next-problem-btn');
    if (prevBtn) prevBtn.disabled = select.selectedIndex <= 0;
    if (nextBtn) nextBtn.disabled = select.selectedIndex >= PROBLEMS.length - 1;

    const footer = document.getElementById('problem-footer');
    let btns = '';
    if (problem.solutionUrl) {
        btns += `<a href="${problem.solutionUrl}" target="_blank" rel="noopener" class="solution-btn">查看题目 ↗</a>`;
    }
    if (problem.blogUrl) {
        btns += `<a href="${problem.blogUrl}" target="_blank" rel="noopener" class="solution-btn blog-btn">查看博客 ↗</a>`;
    }
    footer.innerHTML = btns;
    footer.style.display = btns ? '' : 'none';

    // 设置描述：先显示 fallback，有详细数据时异步替换
    document.getElementById('problem-description').innerHTML = problem.description;

    // 优先从缓存恢复代码，否则用 fallback 模板
    const cached = loadCode(problem.id);
    editor.setValue(cached || problem.template);
    clearOutput();

    // 展开 CPH 面板
    document.body.classList.remove('cph-collapsed');

    // 如果题目有详细数据（problems/ 文件夹），异步加载
    if (problem.hasDetail) {
        const detail = await fetchProblemDetail(problem.id);
        if (detail.description) {
            document.getElementById('problem-description').innerHTML = detail.description;
        }
        if (detail.template && !cached) {
            editor.setValue(detail.template);
        }
    }

    // 预填第一组测试数据（如果有评测文件）
    if (problem.testcaseFile) {
        const cases = await loadTestcases(problem);
        if (cases && cases.length > 0) {
            document.getElementById('stdin-area').value = cases[0].stdin;
            document.getElementById('expected-area').value = cases[0].expected;
        }
        document.getElementById('output-area').innerHTML =
            `<div class="output-placeholder">已加载评测数据，点击「运行」测试全部用例（${problem.testcaseFile}）。</div>`;
    }
}

async function initPyodide() {
    const status = document.getElementById('pyodide-status');
    const runBtn = document.getElementById('run-btn');
    try {
        pyodide = await loadPyodide();
        status.textContent = 'Pyodide 就绪';
        status.classList.remove('loading');
        status.classList.add('ready');
        runBtn.disabled = false;
    } catch (e) {
        status.textContent = '加载失败';
        status.classList.remove('loading');
        status.classList.add('error');
        console.error('Pyodide load error:', e);
    }
}

function bindEvents() {
    // Problem select
    document.getElementById('problem-select').addEventListener('change', (e) => {
        loadProblem(PROBLEMS[e.target.value]);
    });

    // Prev/Next problem
    document.getElementById('prev-problem-btn').addEventListener('click', () => {
        const select = document.getElementById('problem-select');
        if (select.selectedIndex > 0) {
            select.selectedIndex--;
            loadProblem(PROBLEMS[select.value]);
        }
    });
    document.getElementById('next-problem-btn').addEventListener('click', () => {
        const select = document.getElementById('problem-select');
        if (select.selectedIndex < PROBLEMS.length - 1) {
            select.selectedIndex++;
            loadProblem(PROBLEMS[select.value]);
        }
    });

    // Main run button (LeetCode test cases)
    document.getElementById('run-btn').addEventListener('click', runCode);

    // Reset
    document.getElementById('reset-btn').addEventListener('click', () => {
        if (currentProblem) {
            editor.setValue(currentProblem.template);
            clearSavedCode(currentProblem.id);
            clearOutput();
        }
    });

    // Left panel collapse
    document.getElementById('left-collapse-btn').addEventListener('click', toggleLeftPanel);
    document.getElementById('left-collapse-handle').addEventListener('click', toggleLeftPanel);

    // CPH panel toggle
    document.getElementById('cph-toggle-btn').addEventListener('click', toggleCPHPanel);
    document.getElementById('cph-collapse-handle').addEventListener('click', toggleCPHPanel);

    // Output panel collapse
    document.getElementById('output-toggle').addEventListener('click', () => {
        document.getElementById('panel-output').classList.toggle('collapsed');
    });

    // CPH run
    document.getElementById('cph-run-btn').addEventListener('click', runCodeCPH);

    // CPH clear input
    document.getElementById('clear-input-btn').addEventListener('click', () => {
        document.getElementById('stdin-area').value = '';
        localStorage.removeItem(CPH_INPUT_KEY);
    });

    // CPH stdin auto-save
    const stdinArea = document.getElementById('stdin-area');
    let inputTimer = null;
    stdinArea.addEventListener('input', () => {
        clearTimeout(inputTimer);
        inputTimer = setTimeout(() => {
            localStorage.setItem(CPH_INPUT_KEY, stdinArea.value);
        }, 500);
    });

    // CPH expected output comparison
    document.getElementById('expected-area').addEventListener('input', compareOutput);

    // Debug
    document.getElementById('debug-btn').addEventListener('click', runDebug);
    document.getElementById('debug-prev').addEventListener('click', () => debugStep(-1));
    document.getElementById('debug-next').addEventListener('click', () => debugStep(1));
    document.getElementById('debug-prev-bp').addEventListener('click', () => debugJumpToBreakpoint(-1));
    document.getElementById('debug-next-bp').addEventListener('click', () => debugJumpToBreakpoint(1));
    document.getElementById('debug-close-btn').addEventListener('click', closeDebugPanel);

    // Arrow key debug stepping
    document.addEventListener('keydown', (e) => {
        const debugPanel = document.getElementById('debug-panel');
        if (!debugPanel || !debugPanel.classList.contains('open')) return;
        if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
        if (e.key === 'ArrowLeft') { e.preventDefault(); debugStep(-1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); debugStep(1); }
    });

    // URL params for CPH
    const params = new URLSearchParams(window.location.search);
    if (params.has('input')) {
        toggleCPHPanel();
        document.getElementById('stdin-area').value = params.get('input');
    }

    // Mobile nav toggle
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }
}

// ---------- 代码执行 ----------
// ---------- 评测数据缓存 ----------
const testcaseCache = {};

async function loadTestcases(problem) {
    if (!problem.testcaseFile) return null;
    if (testcaseCache[problem.testcaseFile]) return testcaseCache[problem.testcaseFile];
    try {
        const resp = await fetch('assets/js/testcases/' + problem.testcaseFile + '.json');
        if (!resp.ok) return null;
        const data = await resp.json();
        testcaseCache[problem.testcaseFile] = data.cases || [];
        return testcaseCache[problem.testcaseFile];
    } catch (e) {
        console.error('Failed to load testcases:', e);
        return null;
    }
}

async function runCode() {
    if (!pyodide) return;

    const runBtn = document.getElementById('run-btn');
    runBtn.disabled = true;
    runBtn.textContent = '运行中...';

    const outputArea = document.getElementById('output-area');
    const summary = document.getElementById('result-summary');
    outputArea.innerHTML = '';

    const userCode = editor.getValue();
    const problem = currentProblem;
    const cases = await loadTestcases(problem);

    if (!cases || !cases.length) {
        summary.textContent = '暂无评测数据';
        summary.className = 'result-summary';
        outputArea.innerHTML = '<div class="output-placeholder">该题暂未配置评测数据，请使用右侧 CPH 面板手动测试。</div>';
        runBtn.disabled = false;
        runBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2l10 6-10 6V2z"/></svg> 运行';
        return;
    }

    let passed = 0;
    const total = cases.length;
    const totalStart = performance.now();

    for (let i = 0; i < total; i++) {
        const tc = cases[i];
        const div = document.createElement('div');
        const t0 = performance.now();

        try {
            const result = await executePythonStdin(userCode, tc.stdin);
            const elapsed = (performance.now() - t0).toFixed(1);
            const actual = (result.stdout || '').trimEnd();
            const expected = (tc.expected || '').trimEnd();
            const pass = actual === expected;

            if (pass) passed++;
            div.className = `test-case ${pass ? 'pass' : 'fail'}`;
            div.innerHTML = `
<div class="test-header">
    <span class="test-icon">${pass ? '&#10004;' : '&#10008;'}</span>
    <span class="test-label">测试 #${i + 1}</span>
    <span class="test-time">${elapsed} ms</span>
    <span class="test-status ${pass ? 'pass' : 'fail'}">${pass ? '通过' : '失败'}</span>
</div>
${pass ? '' : `<div class="test-detail">
    <div class="test-row"><span class="test-key">输入：</span><pre>${escapeHtml(tc.stdin)}</pre></div>
    <div class="test-row"><span class="test-key">预期：</span><code>${escapeHtml(expected)}</code></div>
    <div class="test-row"><span class="test-key">实际：</span><code>${escapeHtml(actual)}</code></div>
</div>`}`;
        } catch (err) {
            div.className = 'test-case error';
            div.innerHTML = `
<div class="test-header">
    <span class="test-icon">&#10008;</span>
    <span class="test-label">测试 #${i + 1}</span>
    <span class="test-status fail">错误</span>
</div>
<div class="test-detail">
    <div class="test-row error-msg"><span class="test-key">错误：</span><code>${escapeHtml(String(err))}</code></div>
</div>`;
        }
        outputArea.appendChild(div);
    }

    const totalTime = (performance.now() - totalStart).toFixed(1);
    if (passed === total) {
        summary.textContent = `${passed}/${total} 全部通过  ${totalTime} ms`;
        summary.className = 'result-summary all-pass';
    } else {
        summary.textContent = `${passed}/${total} 通过  ${totalTime} ms`;
        summary.className = 'result-summary has-fail';
    }

    runBtn.disabled = false;
    runBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2l10 6-10 6V2z"/></svg> 运行';
}

function extractError(err) {
    const msg = String(err.message || err);
    // 提取最后一行 Python 错误信息
    const lines = msg.split('\n').filter(l => l.trim());
    return lines[lines.length - 1] || msg;
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function clearOutput() {
    document.getElementById('output-area').innerHTML =
        '<div class="output-placeholder">点击「运行代码」查看测试结果</div>';
    document.getElementById('result-summary').textContent = '';
    document.getElementById('result-summary').className = 'result-summary';
}

// =============================================
// Panel Toggles
// =============================================

function toggleLeftPanel() {
    document.body.classList.toggle('left-collapsed');
    localStorage.setItem('z2l_left_collapsed', document.body.classList.contains('left-collapsed'));
    setTimeout(() => editor.refresh(), 300);
}

function toggleCPHPanel() {
    document.body.classList.toggle('cph-collapsed');
    setTimeout(() => {
        editor.refresh();
        // Restore CPH stdin
        if (!document.body.classList.contains('cph-collapsed')) {
            const savedInput = localStorage.getItem(CPH_INPUT_KEY);
            if (savedInput && !document.getElementById('stdin-area').value) {
                document.getElementById('stdin-area').value = savedInput;
            }
        }
    }, 300);
}

// =============================================
// CPH Execution
// =============================================

function clearCPHOutput() {
    const stdout = document.getElementById('stdout-area');
    stdout.textContent = '点击「运行」执行代码';
    stdout.className = 'io-output placeholder-text';
    const runStatus = document.getElementById('run-status');
    runStatus.textContent = '';
    runStatus.className = 'run-status';
    const diffResult = document.getElementById('diff-result');
    diffResult.textContent = '';
    diffResult.className = 'diff-result';
}

async function runCodeCPH() {
    if (!pyodide) return;

    const cphRunBtn = document.getElementById('cph-run-btn');
    const stdoutArea = document.getElementById('stdout-area');
    const runStatus = document.getElementById('run-status');

    cphRunBtn.textContent = '运行中...';
    cphRunBtn.disabled = true;
    runStatus.textContent = '运行中...';
    runStatus.className = 'run-status';
    stdoutArea.textContent = '';
    stdoutArea.classList.remove('has-error', 'placeholder-text');

    const userCode = editor.getValue();
    const stdinText = document.getElementById('stdin-area').value;

    const t0 = performance.now();

    try {
        const result = await executePythonStdin(userCode, stdinText);
        const elapsed = (performance.now() - t0).toFixed(1);

        if (result.error) {
            const parts = [result.stdout, result.error].filter(Boolean);
            stdoutArea.textContent = parts.join('\n');
            stdoutArea.classList.add('has-error');
            runStatus.textContent = '错误';
            runStatus.className = 'run-status error';
        } else {
            stdoutArea.textContent = result.stdout || '(无输出)';
            if (!result.stdout) stdoutArea.classList.add('placeholder-text');
            runStatus.textContent = `${elapsed} ms`;
            runStatus.className = 'run-status accepted';
        }

        compareOutput();
    } catch (e) {
        stdoutArea.textContent = String(e);
        stdoutArea.classList.add('has-error');
        runStatus.textContent = '异常';
        runStatus.className = 'run-status error';
    }

    cphRunBtn.textContent = '运行';
    cphRunBtn.disabled = false;
}

async function executePythonStdin(code, stdinText) {
    const stdinLines = stdinText.split('\n');
    let stdinIndex = 0;

    pyodide.setStdin({
        stdin: () => {
            if (stdinIndex < stdinLines.length) {
                return stdinLines[stdinIndex++];
            }
            return undefined;
        }
    });

    try { await pyodide.loadPackagesFromImports(code); } catch (_) {}

    const captureCode = `
import sys, io
__stdout_capture = io.StringIO()
__stderr_capture = io.StringIO()
sys.stdout = __stdout_capture
sys.stderr = __stderr_capture
`;

    const restoreCode = `
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
__out = __stdout_capture.getvalue()
__err = __stderr_capture.getvalue()
`;

    try {
        await pyodide.runPythonAsync(captureCode);
        try {
            await pyodide.runPythonAsync(code);
        } catch (e) {
            await pyodide.runPythonAsync(restoreCode);
            const stdout = pyodide.globals.get('__out') || '';
            return { stdout, error: extractPythonErrorACM(e) };
        }
        await pyodide.runPythonAsync(restoreCode);
        const stdout = pyodide.globals.get('__out') || '';
        const stderr = pyodide.globals.get('__err') || '';
        return { stdout, warning: stderr || null, error: null };
    } catch (e) {
        try { await pyodide.runPythonAsync(`import sys; sys.stdout = sys.__stdout__; sys.stderr = sys.__stderr__`); } catch (_) {}
        return { stdout: '', error: extractPythonErrorACM(e) };
    }
}

function extractPythonErrorACM(err) {
    const msg = String(err.message || err);
    const idx = msg.indexOf('Traceback');
    if (idx >= 0) return msg.slice(idx);
    const lines = msg.split('\n').filter(l => l.trim());
    return lines.slice(-3).join('\n') || msg;
}

function compareOutput() {
    const expected = document.getElementById('expected-area').value.trim();
    const diffResult = document.getElementById('diff-result');
    const actual = document.getElementById('stdout-area').textContent.trim();

    if (!expected) {
        diffResult.textContent = '';
        diffResult.className = 'diff-result';
        return;
    }

    if (actual === expected) {
        diffResult.textContent = 'ACCEPTED';
        diffResult.className = 'diff-result accepted';
    } else {
        diffResult.textContent = 'WRONG ANSWER';
        diffResult.className = 'diff-result wrong';
    }
}

// =============================================
// ACM Debug
// =============================================

function toggleBreakpoint(cm, line) {
    const info = cm.lineInfo(line);
    if (info.gutterMarkers && info.gutterMarkers.breakpoints) {
        cm.setGutterMarker(line, 'breakpoints', null);
        breakpoints.delete(line);
    } else {
        const marker = document.createElement('div');
        marker.className = 'breakpoint-marker';
        marker.textContent = '●';
        cm.setGutterMarker(line, 'breakpoints', marker);
        breakpoints.add(line);
    }
}

async function runDebug() {
    if (!pyodide) return;

    const debugBtn = document.getElementById('debug-btn');
    const debugPanel = document.getElementById('debug-panel');
    const stdoutArea = document.getElementById('stdout-area');
    const runStatus = document.getElementById('run-status');

    debugBtn.disabled = true;
    runStatus.textContent = '调试中...';
    runStatus.className = 'run-status';

    const userCode = editor.getValue();
    const stdinText = document.getElementById('stdin-area').value;

    const stdinLines = stdinText.split('\n');
    let stdinIndex = 0;
    pyodide.setStdin({
        stdin: () => {
            if (stdinIndex < stdinLines.length) {
                return stdinLines[stdinIndex++];
            }
            return undefined;
        }
    });

    try { await pyodide.loadPackagesFromImports(userCode); } catch (_) {}

    const traceSetupLines = buildTraceSetup().split('\n').length;
    const traceCode = buildTraceSetup() + '\n' + userCode + '\n' + buildTraceEnd();

    stdoutArea.textContent = '';
    stdoutArea.classList.remove('has-error', 'placeholder-text');

    try {
        await pyodide.runPythonAsync(traceCode);
        const framesProxy = pyodide.globals.get('__trace_frames');
        const stdoutVal = pyodide.globals.get('__out') || '';

        debugFrames = [];
        if (framesProxy && framesProxy.length) {
            for (let i = 0; i < framesProxy.length; i++) {
                const f = framesProxy.get(i);
                const localsProxy = f.get('locals');
                const locals = {};
                const keys = localsProxy.toJs();
                if (keys instanceof Map) {
                    keys.forEach((v, k) => { locals[k] = String(v); });
                } else if (typeof keys === 'object') {
                    Object.entries(keys).forEach(([k, v]) => { locals[k] = String(v); });
                }
                debugFrames.push({
                    line: f.get('line') - traceSetupLines - 1,
                    locals
                });
                f.destroy();
            }
            framesProxy.destroy();
        }

        stdoutArea.textContent = stdoutVal || '(无输出)';

        const totalLines = userCode.split('\n').length;
        debugFrames = debugFrames.filter(f => f.line >= 0 && f.line < totalLines);

        if (debugFrames.length > 0) {
            debugPanel.classList.add('open');
            debugIndex = 0;
            renderDebugFrame();
            runStatus.textContent = `${debugFrames.length} 步`;
            runStatus.className = 'run-status accepted';
        } else {
            runStatus.textContent = '无步骤';
            runStatus.className = 'run-status error';
        }

        compareOutput();
    } catch (e) {
        stdoutArea.textContent = extractPythonErrorACM(e);
        stdoutArea.classList.add('has-error');
        runStatus.textContent = '调试错误';
        runStatus.className = 'run-status error';
    }

    try {
        await pyodide.runPythonAsync(`import sys; sys.stdout = sys.__stdout__; sys.stderr = sys.__stderr__`);
    } catch (_) {}

    debugBtn.disabled = false;
}

function buildTraceSetup() {
    return `import sys, io, copy
__stdout_capture = io.StringIO()
__stderr_capture = io.StringIO()
sys.stdout = __stdout_capture
sys.stderr = __stderr_capture
__trace_frames = []
def __tracer(frame, event, arg):
    if event == 'line' and frame.f_code.co_filename == '<exec>':
        safe_locals = {}
        for k, v in frame.f_locals.items():
            if k.startswith('_'):
                continue
            try:
                r = repr(v)
                if len(r) > 200:
                    r = r[:200] + '...'
                safe_locals[k] = r
            except:
                safe_locals[k] = '<unprintable>'
        __trace_frames.append({'line': frame.f_lineno, 'locals': safe_locals})
    return __tracer
sys.settrace(__tracer)
`;
}

function buildTraceEnd() {
    return `
sys.settrace(None)
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
__out = __stdout_capture.getvalue()
__err = __stderr_capture.getvalue()
`;
}

function renderDebugFrame() {
    if (debugIndex < 0 || debugIndex >= debugFrames.length) return;

    const frame = debugFrames[debugIndex];
    const prevFrame = debugIndex > 0 ? debugFrames[debugIndex - 1] : null;

    document.getElementById('debug-info').textContent =
        `Step ${debugIndex + 1}/${debugFrames.length}`;

    // Highlight current line
    if (debugLineWidget !== null) {
        editor.removeLineClass(debugLineWidget, 'background', 'debug-current-line');
    }
    debugLineWidget = frame.line;
    editor.addLineClass(frame.line, 'background', 'debug-current-line');
    editor.scrollIntoView({ line: frame.line, ch: 0 }, 100);

    // Render variables
    const varsEl = document.getElementById('debug-vars');
    const entries = Object.entries(frame.locals);
    if (entries.length === 0) {
        varsEl.innerHTML = '<div style="color:var(--text-muted);font-size:0.8rem;">当前行无变量</div>';
        return;
    }

    varsEl.innerHTML = entries.map(([name, value]) => {
        const prevValue = prevFrame ? prevFrame.locals[name] : undefined;
        const changed = prevValue !== undefined && prevValue !== value;
        const valueClass = changed ? 'debug-var-value changed' : 'debug-var-value';
        return `<div class="debug-var">
            <span class="debug-var-name">${escapeHtml(name)}</span>
            <span class="debug-var-value">= ${escapeHtml(value)}</span>
        </div>`;
    }).join('');
}

function debugStep(delta) {
    const newIndex = debugIndex + delta;
    if (newIndex < 0 || newIndex >= debugFrames.length) return;
    debugIndex = newIndex;
    renderDebugFrame();
}

function debugJumpToBreakpoint(direction) {
    if (breakpoints.size === 0) return;
    const start = debugIndex + direction;
    const end = direction > 0 ? debugFrames.length : -1;
    for (let i = start; i !== end; i += direction) {
        if (breakpoints.has(debugFrames[i].line)) {
            debugIndex = i;
            renderDebugFrame();
            return;
        }
    }
}

function closeDebugPanel() {
    const debugPanel = document.getElementById('debug-panel');
    if (debugPanel) debugPanel.classList.remove('open');
    if (debugLineWidget !== null) {
        editor.removeLineClass(debugLineWidget, 'background', 'debug-current-line');
        debugLineWidget = null;
    }
    debugFrames = [];
    debugIndex = -1;
}
