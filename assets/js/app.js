/**
 * OfferGo - 前端交互逻辑
 */

document.addEventListener('DOMContentLoaded', function () {
    initNavbar();
    initThemeToggle();
});

/**
 * 导航栏逻辑
 */
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

    var lastScroll = 0;
    window.addEventListener('scroll', function () {
        var navbar = document.querySelector('.navbar');
        if (!navbar) return;
        var currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.backdropFilter = '';
        }
        lastScroll = currentScroll;
    });
}

/**
 * 主题切换
 */
function initThemeToggle() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;

    function currentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'dark';
    }

    btn.addEventListener('click', function () {
        var next = currentTheme() === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('z2l-theme', next);
    });

    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
        if (!localStorage.getItem('z2l-theme')) {
            var theme = e.matches ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', theme);
        }
    });
}

/**
 * 平滑滚动到锚点
 */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#' || href === '#') return;

        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/**
 * 滚动动画
 */
function initScrollAnimations() {
    var observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    var selectors = '.roadmap-item, .module-card, .entry-card, .feature-card, ' +
                    '.ai-feature-card, .company-tag';

    document.querySelectorAll(selectors).forEach(function (el) {
        var parent = el.parentElement;
        var siblings = Array.from(parent.children);
        var siblingIndex = siblings.indexOf(el);
        el.style.setProperty('--anim-index', Math.min(siblingIndex, 8));
        observer.observe(el);
    });
}

window.addEventListener('load', initScrollAnimations);
