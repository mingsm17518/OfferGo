/**
 * EasyAlgo - 题库页面逻辑
 * 支持平台切换、难度/分类筛选、搜索、URL 参数
 */

(function () {
    'use strict';

    var allProblems = window.PROBLEMS_DATA || [];
    var currentPlatform = 'all';
    var currentDifficulty = 'all';
    var currentCategory = 'all';
    var currentSearch = '';

    document.addEventListener('DOMContentLoaded', function () {
        initNavbar();
        initThemeToggle();
        readURLParams();
        initPlatformTabs();
        initFilters();
        initSearch();
        renderTable();
    });

    function initNavbar() {
        var navToggle = document.querySelector('.nav-toggle');
        var navMenu = document.querySelector('.nav-menu');
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function () {
                navMenu.classList.toggle('active');
            });
            document.querySelectorAll('.nav-link').forEach(function (link) {
                link.addEventListener('click', function () {
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    function initThemeToggle() {
        var btn = document.getElementById('theme-toggle');
        if (!btn) return;
        btn.addEventListener('click', function () {
            var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('z2l-theme', next);
        });
    }

    function readURLParams() {
        var params = new URLSearchParams(window.location.search);
        var platform = params.get('platform');
        var category = params.get('category');
        var difficulty = params.get('difficulty');

        if (platform && isValidPlatform(platform)) {
            currentPlatform = platform;
        }
        if (category) {
            currentCategory = category;
        }
        if (difficulty) {
            currentDifficulty = difficulty;
        }

        // Sync UI to URL params
        syncPlatformUI();
        syncFilterUI();
    }

    function isValidPlatform(p) {
        return p === 'all' || p === 'leetcode' || p === 'codeforces' || p === 'nowcoder';
    }

    function syncPlatformUI() {
        document.querySelectorAll('.platform-tab').forEach(function (tab) {
            tab.classList.toggle('active', tab.dataset.platform === currentPlatform);
        });
    }

    function syncFilterUI() {
        document.querySelectorAll('.filter-btn').forEach(function (btn) {
            btn.classList.toggle('active', btn.dataset.filter === currentDifficulty);
        });
        var catSelect = document.getElementById('category-filter');
        if (catSelect) catSelect.value = currentCategory;
    }

    function initPlatformTabs() {
        document.querySelectorAll('.platform-tab').forEach(function (tab) {
            tab.addEventListener('click', function () {
                currentPlatform = tab.dataset.platform;
                document.querySelectorAll('.platform-tab').forEach(function (t) {
                    t.classList.toggle('active', t === tab);
                });
                renderTable();
            });
        });
    }

    function initFilters() {
        document.querySelectorAll('.filter-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                currentDifficulty = btn.dataset.filter;
                renderTable();
            });
        });

        var catSelect = document.getElementById('category-filter');
        if (catSelect) {
            catSelect.addEventListener('change', function () {
                currentCategory = catSelect.value;
                renderTable();
            });
        }
    }

    function initSearch() {
        var input = document.getElementById('problem-search');
        if (!input) return;
        var timer;
        input.addEventListener('input', function () {
            clearTimeout(timer);
            timer = setTimeout(function () {
                currentSearch = input.value.toLowerCase().trim();
                renderTable();
            }, 200);
        });
    }

    function getFilteredProblems() {
        return allProblems.filter(function (p) {
            if (currentPlatform !== 'all' && p.platform !== currentPlatform) return false;
            if (currentDifficulty !== 'all' && p.difficulty !== currentDifficulty) return false;
            if (currentCategory !== 'all' && p.category !== currentCategory) return false;
            if (currentSearch) {
                var text = (p.id + ' ' + p.title).toLowerCase();
                if (text.indexOf(currentSearch) < 0) return false;
            }
            return true;
        });
    }

    function renderTable() {
        var tbody = document.getElementById('problems-tbody');
        if (!tbody) return;

        var filtered = getFilteredProblems();
        var platformNames = window.PLATFORM_NAMES || {};

        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:3rem;color:var(--text-muted);">没有找到匹配的题目</td></tr>';
        } else {
            tbody.innerHTML = filtered.map(function (p) {
                var platformLabel = platformNames[p.platform] || p.platform;
                var practiceLabel = platformLabel + ' ↗';

                return '<tr data-difficulty="' + p.difficulty + '" data-category="' + p.category + '" data-platform="' + p.platform + '">' +
                    '<td class="problem-number">' + escapeHtml(p.id) + '</td>' +
                    '<td class="problem-title"><a href="' + p.url + '" target="_blank" rel="noopener">' + escapeHtml(p.title) + '</a></td>' +
                    '<td><span class="difficulty-badge ' + p.difficulty + '">' + getDifficultyIcon(p.difficulty) + ' ' + (window.DIFFICULTY_NAMES[p.difficulty] || p.difficulty) + '</span></td>' +
                    '<td><span class="category-badge">' + (window.CATEGORY_NAMES[p.category] || p.category) + '</span></td>' +
                    '<td class="practice-links"><a href="' + p.url + '" target="_blank" rel="noopener" class="practice-link">' + practiceLabel + '</a></td>' +
                    '<td class="blog-link">' + (p.blogUrl ? '<a href="' + p.blogUrl + '" target="_blank" rel="noopener" class="practice-link practice-blog">博客详解 ↗</a>' : '') + '</td>' +
                    '</tr>';
            }).join('');
        }

        updateStats(filtered.length);
        updateFooter(filtered.length, allProblems.length);
    }

    function updateStats(count) {
        var el = document.getElementById('problems-stats');
        if (!el) return;
        el.textContent = '显示 ' + count + ' 道题目';
    }

    function updateFooter(visible, total) {
        var el = document.getElementById('problems-footer-text');
        if (!el) return;
        if (visible < total) {
            el.innerHTML = '显示 <strong>' + visible + '</strong> / ' + total + ' 道题目';
        } else {
            el.textContent = '共 ' + total + ' 道题目';
        }
    }

    function getDifficultyIcon(d) {
        var icons = { easy: '🟢', medium: '🟡', hard: '🔴' };
        return icons[d] || '';
    }

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }
})();
