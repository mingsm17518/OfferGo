// =============================================
// OfferGo Playground - 在线 OJ
// =============================================

// ---------- 链表基础设施（注入到 Python 环境）----------
const LINKED_LIST_SETUP = `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
    def __repr__(self):
        vals = []
        node = self
        while node:
            vals.append(str(node.val))
            node = node.next
        return ' -> '.join(vals)

def _to_linked_list(arr):
    dummy = ListNode()
    curr = dummy
    for v in arr:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next

def _to_array(node):
    result = []
    while node:
        result.append(node.val)
        node = node.next
    return result
`;

// ---------- 二叉树基础设施（注入到 Python 环境）----------
const BINARY_TREE_SETUP = `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
    def __repr__(self):
        return f'TreeNode({self.val})'

def _to_tree(arr):
    if not arr or arr[0] is None:
        return None
    root = TreeNode(arr[0])
    queue = [root]
    i = 1
    while queue and i < len(arr):
        node = queue.pop(0)
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i])
            queue.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            queue.append(node.right)
        i += 1
    return root

def _tree_to_array(root):
    if not root:
        return []
    result = []
    queue = [root]
    while queue:
        node = queue.pop(0)
        if node:
            result.append(node.val)
            queue.append(node.left)
            queue.append(node.right)
        else:
            result.append(None)
    while result and result[-1] is None:
        result.pop()
    return result
`;

// ---------- 题目数据 ----------
const DETAILED_PROBLEMS = [
    {
        id: 'hw-browser',
        title: '华为机考 - 浏览器地址栏',
        difficulty: 'Medium',
        tags: ['华为机考', '栈', '模拟'],
        description: `
<h3>浏览器地址栏 <span class="difficulty-tag medium">Medium</span> <span style="font-size:0.75rem;color:var(--text-muted);">华为 2026.4.15 研发岗笔试</span></h3>
<p>小明正在开发浏览器地址栏功能，支持四种操作：<code>visit</code>（访问网页）、<code>back</code>（返回上一页）、<code>forward</code>（前进到下一页）、<code>print</code>（输出当前地址）。</p>

<h4>初始状态</h4>
<ul>
<li>当前页面为 <code>Blank</code>，历史记录中只有 1 个 <code>Blank</code> 页面</li>
<li>最多保存 <code>max_history</code> 个历史记录</li>
<li>每次访问新页面时清空前进记录</li>
</ul>

<h4>操作说明</h4>
<ul>
<li><strong>visit url</strong>：当前页面更新为该网页，加入历史记录；若超过 max_history 则删除最早记录；清空前进记录</li>
<li><strong>back</strong>：若历史记录至少有两个页面，切换到上一页，原当前页面加入前进记录；否则不做操作</li>
<li><strong>forward</strong>：若前进记录不为空，切换到下一页，该页面加入历史记录；否则不做操作</li>
<li><strong>print</strong>：输出当前页面地址，若为 Blank 则输出 Blank</li>
</ul>

<h4>输入描述</h4>
<p>第一行：整数 n（操作数 1 ≤ n ≤ 200）<br>
第二行：整数 max_history（0 < max_history < 100）<br>
接下来 n 行：操作命令</p>

<h4>输出描述</h4>
<p>每次 print 操作输出当前地址，若无访问过任何页面则输出 Blank</p>

<h4>样例1</h4>
<pre>输入：
7
10
visit a.com
visit b.com
back
visit c.com
print
forward
print

输出：
c.com
c.com</pre>
<p>back 后前进记录为 b.com；后续 visit 清空前进记录，因此 forward 无操作。</p>

<h4>样例2</h4>
<pre>输入：
7
3
visit a.com
visit b.com
visit c.com
visit d.com
back
forward
print

输出：
d.com</pre>

<h4>样例3</h4>
<pre>输入：
9
3
visit a.com
visit b.com
visit c.com
visit d.com
visit e.com
back
back
back
print

输出：
c.com</pre>
<p>容量为 3，历史记录为 c.com、d.com、e.com，三次 back 后当前页面为 c.com。</p>

<h4>样例4</h4>
<pre>输入：
4
10
back
print
forward
print

输出：
Blank
Blank</pre>

<h4>样例5</h4>
<pre>输入：
4
10
visit abc.com
visit abc.com
back
print

输出：
abc.com</pre>
<p>访问两次相同页面，历史记录为 Blank、abc.com、abc.com，back 后当前页面为 abc.com。</p>`,
        template: `n = int(input())
max_c = int(input())

from collections import deque
d = deque(["Blank"])
sta = []

for _ in range(n):
    s = input().split()

    # visit
    if s[0] == 'visit':
        d.append(s[1])
        if len(d) > max_c:
            d.popleft()
        sta.clear()

    # back
    if s[0] == 'back':
        pass

    # forward
    if s[0] == 'forward':
        pass

    # print
    if s[0] == 'print':
        print(d[-1])
`,
        isACM: true,
        testStdin: '7\n10\nvisit a.com\nvisit b.com\nback\nvisit c.com\nprint\nforward\nprint',
        testExpected: 'c.com\nc.com',
    },
];

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
    const solutionUrl = platform === 'leetcode'
        ? meta.url.replace(/\/$/, '') + '/solutions/'
        : meta.url;
    const platformLabel = { leetcode: 'LeetCode', codeforces: 'Codeforces', nowcoder: '牛客', huawei: '华为机考' }[platform] || '外部平台';
    const blogTip = meta.blogUrl
        ? '<p>这道题已经有博客详解，可以直接查看解法。</p>'
        : `<p>该题暂未接入本地测试用例，可以跳转 ${platformLabel} 练习。</p>`;

    return {
        id: meta.id,
        title,
        difficulty: normalizeDifficulty(meta.difficulty),
        tags: [categoryText],
        description: `
<h3>${meta.id}. ${escapeHtml(meta.title)} <span class="difficulty-tag ${meta.difficulty}">${escapeHtml(difficultyText)}</span></h3>
<p>该题已经加入 OfferGo 题单，但当前页面还没有接入本地测试用例和专用模板。</p>
${blogTip}
<ul>
<li>分类：${escapeHtml(categoryText)}</li>
<li>难度：${escapeHtml(difficultyText)}</li>
<li>来源：${platformLabel}</li>
</ul>`,
        template: `def solve(*args):
    """
    ${platformLabel} ${meta.id}. ${meta.title}
    当前题目暂未接入本地测试用例。
    """
    pass
`,
        functionName: 'solve',
        testCases: [],
        compareFunc: 'equal',
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
    const detailedById = new Map(getAllDetailedProblems().map(problem => [problem.id, problem]));
    const allProblems = (typeof window !== 'undefined' && Array.isArray(window.PROBLEMS_DATA) && window.PROBLEMS_DATA.length)
        ? window.PROBLEMS_DATA
        : DETAILED_PROBLEMS.map(problem => ({
            id: problem.id,
            title: problem.title.replace(/^LC\s+\d+\s*-\s*/, ''),
            difficulty: (problem.difficulty || '').toLowerCase(),
            category: '',
            url: problem.solutionUrl ? problem.solutionUrl.replace(/\/solutions\/$/, '/') : '',
            blogUrl: problem.blogUrl || null,
        }));

    const baseProblems = allProblems.map(meta => detailedById.get(meta.id) || buildFallbackProblem(meta));
    const baseIds = new Set(allProblems.map(p => p.id));
    const extraOnly = getExtraDetailedProblems().filter(p => !baseIds.has(p.id));
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

function loadProblem(problem) {
    currentProblem = problem;
    window.currentProblem = problem; // expose for AI assistant
    document.getElementById('problem-description').innerHTML = problem.description;
    const footer = document.getElementById('problem-footer');
    if (problem.solutionUrl) {
        const lcUrl = problem.solutionUrl.replace(/solutions\/$/, '');
        let btns = `<a href="${problem.solutionUrl}" target="_blank" rel="noopener" class="solution-btn">查看题解 ↗</a>`
            + `<a href="${lcUrl}" target="_blank" rel="noopener" class="solution-btn leetcode-btn">LeetCode 提交 ↗</a>`;
        if (problem.blogUrl) {
            btns += `<a href="${problem.blogUrl}" target="_blank" rel="noopener" class="solution-btn blog-btn">查看博客 ↗</a>`;
        }
        footer.innerHTML = btns;
        footer.style.display = '';
    } else {
        footer.innerHTML = '';
        footer.style.display = 'none';
    }
    // 优先从缓存恢复代码
    const cached = loadCode(problem.id);
    editor.setValue(cached || problem.template);
    clearOutput();

    // ACM 题目：自动展开 CPH 面板并预填数据
    if (problem.isACM) {
        document.body.classList.remove('cph-collapsed');
        if (problem.testStdin) {
            document.getElementById('stdin-area').value = problem.testStdin;
        }
        if (problem.testExpected) {
            document.getElementById('expected-area').value = problem.testExpected;
        }
        document.getElementById('output-area').innerHTML =
            '<div class="output-placeholder">该题为 ACM 模式（stdin/stdout），请使用右侧 CPH 评测面板运行代码。</div>';
        document.getElementById('result-summary').textContent = 'ACM 模式 - 请使用 CPH 面板运行';
        document.getElementById('result-summary').className = 'result-summary';
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
    const testCases = Array.isArray(problem.testCases) ? problem.testCases : [];

    if (!testCases.length) {
        summary.textContent = '当前题目暂未接入本地测试';
        summary.className = 'result-summary';
        outputArea.innerHTML = `
<div class="output-placeholder">
    该题已支持按题号跳转，但当前页面还没有配置本地测试用例。<br>
    请使用下方按钮前往 LeetCode 提交，或查看博客详解。
</div>`;
        runBtn.disabled = false;
        runBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2l10 6-10 6V2z"/></svg> 运行代码`;
        return;
    }

    let passed = 0;
    const total = testCases.length;
    const totalStart = performance.now();

    for (let i = 0; i < total; i++) {
        const tc = testCases[i];
        const result = await runTestCase(userCode, problem, tc, i + 1);
        outputArea.appendChild(result.element);
        if (result.passed) passed++;
    }

    const totalTime = (performance.now() - totalStart).toFixed(1);

    // 更新总结
    if (passed === total) {
        summary.textContent = `${passed}/${total} 全部通过  ${totalTime} ms`;
        summary.className = 'result-summary all-pass';
    } else {
        summary.textContent = `${passed}/${total} 通过  ${totalTime} ms`;
        summary.className = 'result-summary has-fail';
    }

    runBtn.disabled = false;
    runBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2l10 6-10 6V2z"/></svg> 运行代码`;
}

async function runTestCase(userCode, problem, testCase, index) {
    const div = document.createElement('div');

    try {
        // 构建 Python 代码：setup + 用户函数 + 调用
        const argsStr = testCase.input.map((arg, i) => {
            const repr = pythonRepr(arg);
            const wrapper = problem.argWrappers?.[i];
            return wrapper ? `${wrapper}(${repr})` : repr;
        }).join(', ');
        const callExpr = `${problem.functionName}(${argsStr})`;
        const resultExpr = problem.returnWrapper
            ? `${problem.returnWrapper}(${callExpr})`
            : callExpr;
        const fullCode = `
${problem.setup || ''}
${userCode}

__result__ = ${resultExpr}
`;
        const t0 = performance.now();
        await pyodide.runPythonAsync(fullCode);
        const elapsed = (performance.now() - t0).toFixed(1);
        const actual = pyodide.globals.get('__result__');
        const actualJS = toJS(actual);

        const pass = compareResults(actualJS, testCase.expected, problem.compareFunc);

        div.className = `test-case ${pass ? 'pass' : 'fail'}`;
        div.innerHTML = `
<div class="test-header">
    <span class="test-icon">${pass ? '&#10004;' : '&#10008;'}</span>
    <span class="test-label">测试用例 ${index}</span>
    <span class="test-time">${elapsed} ms</span>
    <span class="test-status ${pass ? 'pass' : 'fail'}">${pass ? '通过' : '失败'}</span>
</div>
<div class="test-detail">
    <div class="test-row"><span class="test-key">输入：</span><code>${formatInput(problem, testCase.input)}</code></div>
    <div class="test-row"><span class="test-key">预期：</span><code>${JSON.stringify(testCase.expected)}</code></div>
    <div class="test-row"><span class="test-key">实际：</span><code>${JSON.stringify(actualJS)}</code></div>
</div>`;

        return { element: div, passed: pass };
    } catch (err) {
        div.className = 'test-case error';
        div.innerHTML = `
<div class="test-header">
    <span class="test-icon">&#10008;</span>
    <span class="test-label">测试用例 ${index}</span>
    <span class="test-status fail">错误</span>
</div>
<div class="test-detail">
    <div class="test-row"><span class="test-key">输入：</span><code>${formatInput(problem, testCase.input)}</code></div>
    <div class="test-row error-msg"><span class="test-key">错误：</span><code>${escapeHtml(extractError(err))}</code></div>
</div>`;
        return { element: div, passed: false };
    }
}

// ---------- 工具函数 ----------
function pythonRepr(val) {
    if (val === null || val === undefined) return 'None';
    if (typeof val === 'boolean') return val ? 'True' : 'False';
    if (typeof val === 'number') return String(val);
    if (typeof val === 'string') return JSON.stringify(val);
    if (Array.isArray(val)) return '[' + val.map(pythonRepr).join(', ') + ']';
    return JSON.stringify(val);
}

function toJS(pyVal) {
    if (pyVal === undefined || pyVal === null) return null;
    if (typeof pyVal === 'number' || typeof pyVal === 'string' || typeof pyVal === 'boolean') return pyVal;
    if (pyVal.toJs) {
        const jsVal = pyVal.toJs({ dict_converter: Object.fromEntries });
        if (jsVal instanceof Map) return Array.from(jsVal.values());
        return jsVal;
    }
    return pyVal;
}

function compareResults(actual, expected, mode) {
    if (mode === 'sorted') {
        if (!Array.isArray(actual) || !Array.isArray(expected)) return false;
        return JSON.stringify([...actual].sort()) === JSON.stringify([...expected].sort());
    }
    if (mode === 'sorted_nested') {
        if (!Array.isArray(actual) || !Array.isArray(expected)) return false;
        const normalize = arr => arr
            .map(x => Array.isArray(x) ? [...x].sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b))) : x)
            .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
        return JSON.stringify(normalize(actual)) === JSON.stringify(normalize(expected));
    }
    // 'equal' default
    return JSON.stringify(actual) === JSON.stringify(expected);
}

function formatInput(problem, inputs) {
    // 获取函数的参数名（从 template 解析）
    const match = problem.template.match(/def\s+\w+\(([^)]*)\)/);
    if (match) {
        const params = match[1].split(',').map(s => s.trim());
        return inputs.map((v, i) => `${params[i] || 'arg' + i} = ${JSON.stringify(v)}`).join(', ');
    }
    return inputs.map(v => JSON.stringify(v)).join(', ');
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
