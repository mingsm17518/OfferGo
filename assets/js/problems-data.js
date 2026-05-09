/**
 * OfferGo 多平台题库数据（自动生成，请勿手动编辑）
 * 由 build_problems.py 从 problems/ 目录生成
 */

const PROBLEMS_DATA = [
  {
    id: "hw-0415-1",
    title: "浏览器地址栏",
    difficulty: "medium",
    category: "stack",
    platform: "huawei",
    url: "https://www.nowcoder.com/practice/浏览器地址栏",
    testcaseFile: "hw-0415-1",
    hasSolution: true,
    tags: ["华为机考", "栈", "模拟"]
  },
  {
    id: "hw-0509-1",
    title: "商品购买查询",
    difficulty: "medium",
    category: "other",
    platform: "huawei",
    url: "https://www.nowcoder.com/practice/p4907",
    testcaseFile: "hw-0509-1",
    hasSolution: true,
    tags: ["华为机考", "位运算", "集合"]
  },
  {
    id: "hw-0509-2",
    title: "设备运行监控",
    difficulty: "medium",
    category: "sliding-window",
    platform: "huawei",
    url: "",
    testcaseFile: "hw-0509-2",
    hasSolution: true,
    tags: ["滑动窗口", "单调队列", "华为机考"]
  },
  {
    id: "hw-0509-3",
    title: "虚拟机任务调度问题",
    difficulty: "hard",
    category: "dp",
    platform: "huawei",
    url: "https://www.nowcoder.com/practice/p4909",
    testcaseFile: "hw-0509-3",
    hasSolution: true,
    tags: ["华为机考", "动态规划", "完全背包", "路径记录"]
  },
  {
    id: "lc-200",
    title: "岛屿数量",
    difficulty: "medium",
    category: "graph",
    platform: "leetcode",
    url: "https://leetcode.cn/problems/number-of-islands/",
    testcaseFile: "lc-200",
    hasSolution: true,
    tags: ["图论", "DFS", "BFS"]
  }
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
    "other": "技巧"
};

// 难度映射
const DIFFICULTY_NAMES = {
    "easy": "简单",
    "medium": "中等",
    "hard": "困难"
};

// 导出
if (typeof window !== "undefined") {
    window.PROBLEMS_DATA = PROBLEMS_DATA;
    window.CATEGORY_NAMES = CATEGORY_NAMES;
    window.DIFFICULTY_NAMES = DIFFICULTY_NAMES;
    window.PLATFORM_NAMES = PLATFORM_NAMES;
}
