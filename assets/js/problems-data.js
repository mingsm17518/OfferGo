/**
 * OfferGo 多平台题库数据
 * 每道题包含: id, title, difficulty, category, platform, url
 */

const PROBLEMS_DATA = [
    // ============ Codeforces ============
    { id: "cf-1A", title: "Theatre Square", difficulty: "easy", category: "other", platform: "codeforces", url: "https://codeforces.com/problemset/problem/1/A" },
    { id: "cf-71A", title: "Way Too Long Words", difficulty: "easy", category: "other", platform: "codeforces", url: "https://codeforces.com/problemset/problem/71/A" },
    { id: "cf-158B", title: "Taxi", difficulty: "easy", category: "greedy", platform: "codeforces", url: "https://codeforces.com/problemset/problem/158/B" },
    { id: "cf-509B", title: "Painting Pebbles", difficulty: "medium", category: "greedy", platform: "codeforces", url: "https://codeforces.com/problemset/problem/509/B" },
    { id: "cf-1204B", title: "Mislove Has Lost an Array", difficulty: "medium", category: "dp", platform: "codeforces", url: "https://codeforces.com/problemset/problem/1204/B" },

    // ============ 牛客示例 ============
    { id: "nc-1", title: "两数之和", difficulty: "easy", category: "hash", platform: "nowcoder", url: "https://www.nowcoder.com/practice/20ef0972485e41019e39543e8cdab3f9" },
    { id: "nc-2", title: "反转链表", difficulty: "easy", category: "linked-list", platform: "nowcoder", url: "https://www.nowcoder.com/practice/75e878df47f24fdc9dc3e400ec6058ca" },
    { id: "nc-3", title: "链表中环的入口结点", difficulty: "medium", category: "linked-list", platform: "nowcoder", url: "https://www.nowcoder.com/practice/253d2c59ec3e4bc68da16891f7a7f8cd" },
    { id: "nc-4", title: "二分查找", difficulty: "easy", category: "binary-search", platform: "nowcoder", url: "https://www.nowcoder.com/practice/7bc4a1c7c371425d9faa9d1b511fe193" },

    // ============ 华为机考 ============
    { id: "hw-1", title: "字符串最后一个单词的长度", difficulty: "easy", category: "huawei", platform: "huawei", url: "https://www.nowcoder.com/practice/8c949ea5f36f422594b306a2300315da" },
    { id: "hw-2", title: "计算某字符出现次数", difficulty: "easy", category: "huawei", platform: "huawei", url: "https://www.nowcoder.com/practice/a35ce98431874e3a820dbe4b2d0508b1" },
    { id: "hw-3", title: "明明的随机数", difficulty: "easy", category: "huawei", platform: "huawei", url: "https://www.nowcoder.com/practice/3245215fffb84b7b8124548ed7eecba9" },
    { id: "hw-4", title: "字符串分隔", difficulty: "easy", category: "huawei", platform: "huawei", url: "https://www.nowcoder.com/practice/d9162298cb5a437aad722fccccaae8a7" },
    { id: "hw-5", title: "进制转换", difficulty: "easy", category: "huawei", platform: "huawei", url: "https://www.nowcoder.com/practice/8f3df50d2b9043208c59044d3725a044" },
    { id: "hw-6", title: "质数因子", difficulty: "medium", category: "huawei", platform: "huawei", url: "https://www.nowcoder.com/practice/196534628ca6490ebce2e336e47ac08a" },
    { id: "hw-7", title: "取近似值", difficulty: "easy", category: "huawei", platform: "huawei", url: "https://www.nowcoder.com/practice/0ce5a7c17128421a916a5e4fca5b3e6d" },
    { id: "hw-8", title: "合并表记录", difficulty: "easy", category: "huawei", platform: "huawei", url: "https://www.nowcoder.com/practice/de044e89123f4a7482bd2b214a685201" },
    { id: "hw-9", title: "提取不重复的整数", difficulty: "easy", category: "huawei", platform: "huawei", url: "https://www.nowcoder.com/practice/253d2c59ec3e4bc68da16891f7a7f8cd" },
    { id: "hw-10", title: "字符统计", difficulty: "medium", category: "huawei", platform: "huawei", url: "https://www.nowcoder.com/practice/539054d4d3d2461585eaech9a3a0a9e0" },
    { id: "hw-browser", title: "浏览器地址栏", difficulty: "medium", category: "huawei", platform: "huawei", url: "https://www.nowcoder.com/practice/浏览器地址栏" },
];

// 平台映射
const PLATFORM_NAMES = {
    "leetcode": "LeetCode",
    "codeforces": "Codeforces",
    "nowcoder": "牛客",
    "huawei": "华为机考"
};

// 分类映射
const CATEGORY_NAMES = {
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
    "other": "技巧",
    "huawei": "华为机考"
};

// 难度映射
const DIFFICULTY_NAMES = {
    "easy": "简单",
    "medium": "中等",
    "hard": "困难"
};

// 导出
if (typeof window !== 'undefined') {
    window.PROBLEMS_DATA = PROBLEMS_DATA;
    window.CATEGORY_NAMES = CATEGORY_NAMES;
    window.DIFFICULTY_NAMES = DIFFICULTY_NAMES;
    window.PLATFORM_NAMES = PLATFORM_NAMES;
}
