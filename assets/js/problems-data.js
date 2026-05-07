/**
 * OfferGo 多平台题库数据
 * 每道题包含: id, title, difficulty, category, platform, url
 */

const PROBLEMS_DATA = [
    // ============ LeetCode ============
    // 哈希表
    { id: "lc-1", title: "两数之和", difficulty: "easy", category: "hash", platform: "leetcode", url: "https://leetcode.cn/problems/two-sum/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19718436" },
    { id: "lc-49", title: "字母异位词分组", difficulty: "medium", category: "hash", platform: "leetcode", url: "https://leetcode.cn/problems/group-anagrams/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19766917" },
    { id: "lc-128", title: "最长连续序列", difficulty: "medium", category: "hash", platform: "leetcode", url: "https://leetcode.cn/problems/longest-consecutive-sequence/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19766918" },

    // 双指针
    { id: "lc-283", title: "移动零", difficulty: "easy", category: "two-pointers", platform: "leetcode", url: "https://leetcode.cn/problems/move-zeroes/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19736398" },
    { id: "lc-11", title: "盛最多水的容器", difficulty: "medium", category: "two-pointers", platform: "leetcode", url: "https://leetcode.cn/problems/container-with-most-water/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19766919" },
    { id: "lc-15", title: "三数之和", difficulty: "medium", category: "two-pointers", platform: "leetcode", url: "https://leetcode.cn/problems/3sum/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19766921" },
    { id: "lc-42", title: "接雨水", difficulty: "hard", category: "two-pointers", platform: "leetcode", url: "https://leetcode.cn/problems/trapping-rain-water/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772917.html" },

    // 滑动窗口
    { id: "lc-3", title: "无重复字符的最长子串", difficulty: "medium", category: "sliding-window", platform: "leetcode", url: "https://leetcode.cn/problems/longest-substring-without-repeating-characters/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19766922" },
    { id: "lc-438", title: "找到字符串中所有字母异位词", difficulty: "medium", category: "sliding-window", platform: "leetcode", url: "https://leetcode.cn/problems/find-all-anagrams-in-a-string/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19766923" },
    { id: "lc-76", title: "最小覆盖子串", difficulty: "hard", category: "sliding-window", platform: "leetcode", url: "https://leetcode.cn/problems/minimum-window-substring/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772918.html" },

    // 子串/子数组
    { id: "lc-560", title: "和为 K 的子数组", difficulty: "medium", category: "subarray", platform: "leetcode", url: "https://leetcode.cn/problems/subarray-sum-equals-k/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19766928" },
    { id: "lc-239", title: "滑动窗口最大值", difficulty: "hard", category: "subarray", platform: "leetcode", url: "https://leetcode.cn/problems/sliding-window-maximum/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772919.html" },
    { id: "lc-53", title: "最大子数组和", difficulty: "medium", category: "subarray", platform: "leetcode", url: "https://leetcode.cn/problems/maximum-subarray/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19766929" },
    { id: "lc-56", title: "合并区间", difficulty: "medium", category: "subarray", platform: "leetcode", url: "https://leetcode.cn/problems/merge-intervals/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19766930" },

    // 栈
    { id: "lc-20", title: "有效的括号", difficulty: "easy", category: "stack", platform: "leetcode", url: "https://leetcode.cn/problems/valid-parentheses/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19722592" },
    { id: "lc-155", title: "最小栈", difficulty: "medium", category: "stack", platform: "leetcode", url: "https://leetcode.cn/problems/min-stack/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19766931" },
    { id: "lc-394", title: "字符串解码", difficulty: "medium", category: "stack", platform: "leetcode", url: "https://leetcode.cn/problems/decode-string/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19766933" },
    { id: "lc-739", title: "每日温度", difficulty: "medium", category: "stack", platform: "leetcode", url: "https://leetcode.cn/problems/daily-temperatures/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19766932" },
    { id: "lc-84", title: "柱状图中最大的矩形", difficulty: "hard", category: "stack", platform: "leetcode", url: "https://leetcode.cn/problems/largest-rectangle-in-histogram/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772920.html" },

    // 链表
    { id: "lc-160", title: "相交链表", difficulty: "easy", category: "linked-list", platform: "leetcode", url: "https://leetcode.cn/problems/intersection-of-two-linked-lists/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19754972" },
    { id: "lc-206", title: "反转链表", difficulty: "easy", category: "linked-list", platform: "leetcode", url: "https://leetcode.cn/problems/reverse-linked-list/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19722217" },
    { id: "lc-234", title: "回文链表", difficulty: "easy", category: "linked-list", platform: "leetcode", url: "https://leetcode.cn/problems/palindrome-linked-list/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19741527" },
    { id: "lc-141", title: "环形链表", difficulty: "easy", category: "linked-list", platform: "leetcode", url: "https://leetcode.cn/problems/linked-list-cycle/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19755041" },
    { id: "lc-142", title: "环形链表 II", difficulty: "medium", category: "linked-list", platform: "leetcode", url: "https://leetcode.cn/problems/linked-list-cycle-ii/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19766937" },
    { id: "lc-21", title: "合并两个有序链表", difficulty: "easy", category: "linked-list", platform: "leetcode", url: "https://leetcode.cn/problems/merge-two-sorted-lists/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19741176" },
    { id: "lc-2", title: "两数相加", difficulty: "medium", category: "linked-list", platform: "leetcode", url: "https://leetcode.cn/problems/add-two-numbers/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19766938" },
    { id: "lc-19", title: "删除链表的倒数第 N 个结点", difficulty: "medium", category: "linked-list", platform: "leetcode", url: "https://leetcode.cn/problems/remove-nth-node-from-end-of-list/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19766939" },
    { id: "lc-24", title: "两两交换链表中的节点", difficulty: "medium", category: "linked-list", platform: "leetcode", url: "https://leetcode.cn/problems/swap-nodes-in-pairs/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19766940" },
    { id: "lc-25", title: "K 个一组翻转链表", difficulty: "hard", category: "linked-list", platform: "leetcode", url: "https://leetcode.cn/problems/reverse-nodes-in-k-group/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772921.html" },
    { id: "lc-138", title: "随机链表的复制", difficulty: "medium", category: "linked-list", platform: "leetcode", url: "https://leetcode.cn/problems/copy-list-with-random-pointer/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19766941" },
    { id: "lc-148", title: "排序链表", difficulty: "medium", category: "linked-list", platform: "leetcode", url: "https://leetcode.cn/problems/sort-list/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19766942" },
    { id: "lc-23", title: "合并 K 个升序链表", difficulty: "hard", category: "linked-list", platform: "leetcode", url: "https://leetcode.cn/problems/merge-k-sorted-lists/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772922.html" },
    { id: "lc-146", title: "LRU 缓存", difficulty: "medium", category: "linked-list", platform: "leetcode", url: "https://leetcode.cn/problems/lru-cache/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19769206" },

    // 二叉树
    { id: "lc-94", title: "二叉树的中序遍历", difficulty: "easy", category: "tree", platform: "leetcode", url: "https://leetcode.cn/problems/binary-tree-inorder-traversal/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19741295" },
    { id: "lc-104", title: "二叉树的最大深度", difficulty: "easy", category: "tree", platform: "leetcode", url: "https://leetcode.cn/problems/maximum-depth-of-binary-tree/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19741351" },
    { id: "lc-226", title: "翻转二叉树", difficulty: "easy", category: "tree", platform: "leetcode", url: "https://leetcode.cn/problems/invert-binary-tree/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19766910" },
    { id: "lc-101", title: "对称二叉树", difficulty: "easy", category: "tree", platform: "leetcode", url: "https://leetcode.cn/problems/symmetric-tree/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19766911" },
    { id: "lc-543", title: "二叉树的直径", difficulty: "easy", category: "tree", platform: "leetcode", url: "https://leetcode.cn/problems/diameter-of-binary-tree/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19766912" },
    { id: "lc-102", title: "二叉树的层序遍历", difficulty: "medium", category: "tree", platform: "leetcode", url: "https://leetcode.cn/problems/binary-tree-level-order-traversal/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772923.html" },
    { id: "lc-108", title: "将有序数组转换为二叉搜索树", difficulty: "easy", category: "tree", platform: "leetcode", url: "https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19766901" },
    { id: "lc-98", title: "验证二叉搜索树", difficulty: "medium", category: "tree", platform: "leetcode", url: "https://leetcode.cn/problems/validate-binary-search-tree/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772924.html" },
    { id: "lc-230", title: "二叉搜索树中第K小的元素", difficulty: "medium", category: "tree", platform: "leetcode", url: "https://leetcode.cn/problems/kth-smallest-element-in-a-bst/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772925.html" },
    { id: "lc-199", title: "二叉树的右视图", difficulty: "medium", category: "tree", platform: "leetcode", url: "https://leetcode.cn/problems/binary-tree-right-side-view/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772926.html" },
    { id: "lc-114", title: "二叉树展开为链表", difficulty: "medium", category: "tree", platform: "leetcode", url: "https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772927.html" },
    { id: "lc-105", title: "从前序与中序遍历序列构造二叉树", difficulty: "medium", category: "tree", platform: "leetcode", url: "https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772928.html" },
    { id: "lc-437", title: "路径总和 III", difficulty: "medium", category: "tree", platform: "leetcode", url: "https://leetcode.cn/problems/path-sum-iii/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772929.html" },
    { id: "lc-236", title: "二叉树的最近公共祖先", difficulty: "medium", category: "tree", platform: "leetcode", url: "https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772930.html" },
    { id: "lc-124", title: "二叉树中的最大路径和", difficulty: "hard", category: "tree", platform: "leetcode", url: "https://leetcode.cn/problems/binary-tree-maximum-path-sum/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772931.html" },

    // 图论
    { id: "lc-200", title: "岛屿数量", difficulty: "medium", category: "graph", platform: "leetcode", url: "https://leetcode.cn/problems/number-of-islands/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772932.html" },
    { id: "lc-994", title: "腐烂的橘子", difficulty: "medium", category: "graph", platform: "leetcode", url: "https://leetcode.cn/problems/rotting-oranges/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772933.html" },
    { id: "lc-207", title: "课程表", difficulty: "medium", category: "graph", platform: "leetcode", url: "https://leetcode.cn/problems/course-schedule/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772934.html" },
    { id: "lc-208", title: "实现 Trie (前缀树)", difficulty: "medium", category: "graph", platform: "leetcode", url: "https://leetcode.cn/problems/implement-trie-prefix-tree/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772935.html" },

    // 回溯
    { id: "lc-46", title: "全排列", difficulty: "medium", category: "backtrack", platform: "leetcode", url: "https://leetcode.cn/problems/permutations/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772936.html" },
    { id: "lc-78", title: "子集", difficulty: "medium", category: "backtrack", platform: "leetcode", url: "https://leetcode.cn/problems/subsets/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772937.html" },
    { id: "lc-17", title: "电话号码的字母组合", difficulty: "medium", category: "backtrack", platform: "leetcode", url: "https://leetcode.cn/problems/letter-combinations-of-a-phone-number/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772973.html" },
    { id: "lc-39", title: "组合总和", difficulty: "medium", category: "backtrack", platform: "leetcode", url: "https://leetcode.cn/problems/combination-sum/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772974.html" },
    { id: "lc-22", title: "括号生成", difficulty: "medium", category: "backtrack", platform: "leetcode", url: "https://leetcode.cn/problems/generate-parentheses/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772975.html" },
    { id: "lc-79", title: "单词搜索", difficulty: "medium", category: "backtrack", platform: "leetcode", url: "https://leetcode.cn/problems/word-search/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772976.html" },
    { id: "lc-131", title: "分割回文串", difficulty: "medium", category: "backtrack", platform: "leetcode", url: "https://leetcode.cn/problems/palindrome-partitioning/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772977.html" },
    { id: "lc-51", title: "N 皇后", difficulty: "hard", category: "backtrack", platform: "leetcode", url: "https://leetcode.cn/problems/n-queens/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772978.html" },

    // 二分查找
    { id: "lc-35", title: "搜索插入位置", difficulty: "easy", category: "binary-search", platform: "leetcode", url: "https://leetcode.cn/problems/search-insert-position/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19740616" },
    { id: "lc-74", title: "搜索二维矩阵", difficulty: "medium", category: "binary-search", platform: "leetcode", url: "https://leetcode.cn/problems/search-a-2d-matrix/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772979.html" },
    { id: "lc-34", title: "在排序数组中查找元素的第一个和最后一个位置", difficulty: "medium", category: "binary-search", platform: "leetcode", url: "https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772980.html" },
    { id: "lc-33", title: "搜索旋转排序数组", difficulty: "medium", category: "binary-search", platform: "leetcode", url: "https://leetcode.cn/problems/search-in-rotated-sorted-array/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772981.html" },
    { id: "lc-153", title: "寻找旋转排序数组中的最小值", difficulty: "medium", category: "binary-search", platform: "leetcode", url: "https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19772982.html" },
    { id: "lc-4", title: "寻找两个正序数组的中位数", difficulty: "hard", category: "binary-search", platform: "leetcode", url: "https://leetcode.cn/problems/median-of-two-sorted-arrays/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778823.html" },

    // 动态规划
    { id: "lc-70", title: "爬楼梯", difficulty: "easy", category: "dp", platform: "leetcode", url: "https://leetcode.cn/problems/climbing-stairs/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19718527" },
    { id: "lc-118", title: "杨辉三角", difficulty: "easy", category: "dp", platform: "leetcode", url: "https://leetcode.cn/problems/pascals-triangle/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19727095" },
    { id: "lc-198", title: "打家劫舍", difficulty: "medium", category: "dp", platform: "leetcode", url: "https://leetcode.cn/problems/house-robber/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778824.html" },
    { id: "lc-279", title: "完全平方数", difficulty: "medium", category: "dp", platform: "leetcode", url: "https://leetcode.cn/problems/perfect-squares/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778825.html" },
    { id: "lc-322", title: "零钱兑换", difficulty: "medium", category: "dp", platform: "leetcode", url: "https://leetcode.cn/problems/coin-change/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778826.html" },
    { id: "lc-139", title: "单词拆分", difficulty: "medium", category: "dp", platform: "leetcode", url: "https://leetcode.cn/problems/word-break/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778827.html" },
    { id: "lc-300", title: "最长递增子序列", difficulty: "medium", category: "dp", platform: "leetcode", url: "https://leetcode.cn/problems/longest-increasing-subsequence/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778828.html" },
    { id: "lc-152", title: "乘积最大子数组", difficulty: "medium", category: "dp", platform: "leetcode", url: "https://leetcode.cn/problems/maximum-product-subarray/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778829.html" },
    { id: "lc-416", title: "分割等和子集", difficulty: "medium", category: "dp", platform: "leetcode", url: "https://leetcode.cn/problems/partition-equal-subset-sum/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778830.html" },
    { id: "lc-32", title: "最长有效括号", difficulty: "hard", category: "dp", platform: "leetcode", url: "https://leetcode.cn/problems/longest-valid-parentheses/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778831.html" },
    { id: "lc-62", title: "不同路径", difficulty: "medium", category: "dp", platform: "leetcode", url: "https://leetcode.cn/problems/unique-paths/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778832.html" },
    { id: "lc-64", title: "最小路径和", difficulty: "medium", category: "dp", platform: "leetcode", url: "https://leetcode.cn/problems/minimum-path-sum/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778833.html" },
    { id: "lc-5", title: "最长回文子串", difficulty: "medium", category: "dp", platform: "leetcode", url: "https://leetcode.cn/problems/longest-palindromic-substring/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778834.html" },
    { id: "lc-1143", title: "最长公共子序列", difficulty: "medium", category: "dp", platform: "leetcode", url: "https://leetcode.cn/problems/longest-common-subsequence/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778835.html" },
    { id: "lc-72", title: "编辑距离", difficulty: "medium", category: "dp", platform: "leetcode", url: "https://leetcode.cn/problems/edit-distance/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778836.html" },

    // 贪心
    { id: "lc-121", title: "买卖股票的最佳时机", difficulty: "easy", category: "greedy", platform: "leetcode", url: "https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19727110" },
    { id: "lc-55", title: "跳跃游戏", difficulty: "medium", category: "greedy", platform: "leetcode", url: "https://leetcode.cn/problems/jump-game/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778837.html" },
    { id: "lc-45", title: "跳跃游戏 II", difficulty: "medium", category: "greedy", platform: "leetcode", url: "https://leetcode.cn/problems/jump-game-ii/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778838.html" },
    { id: "lc-763", title: "划分字母区间", difficulty: "medium", category: "greedy", platform: "leetcode", url: "https://leetcode.cn/problems/partition-labels/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778839.html" },

    // 堆
    { id: "lc-215", title: "数组中的第K个最大元素", difficulty: "medium", category: "heap", platform: "leetcode", url: "https://leetcode.cn/problems/kth-largest-element-in-an-array/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778840.html" },
    { id: "lc-347", title: "前 K 个高频元素", difficulty: "medium", category: "heap", platform: "leetcode", url: "https://leetcode.cn/problems/top-k-frequent-elements/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778841.html" },
    { id: "lc-295", title: "数据流的中位数", difficulty: "hard", category: "heap", platform: "leetcode", url: "https://leetcode.cn/problems/find-median-from-data-stream/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778842.html" },

    // 矩阵
    { id: "lc-73", title: "矩阵置零", difficulty: "medium", category: "matrix", platform: "leetcode", url: "https://leetcode.cn/problems/set-matrix-zeroes/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778843.html" },
    { id: "lc-54", title: "螺旋矩阵", difficulty: "medium", category: "matrix", platform: "leetcode", url: "https://leetcode.cn/problems/spiral-matrix/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778846.html" },
    { id: "lc-48", title: "旋转图像", difficulty: "medium", category: "matrix", platform: "leetcode", url: "https://leetcode.cn/problems/rotate-image/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778847.html" },
    { id: "lc-240", title: "搜索二维矩阵 II", difficulty: "medium", category: "matrix", platform: "leetcode", url: "https://leetcode.cn/problems/search-a-2d-matrix-ii/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778848.html" },

    // 其他技巧
    { id: "lc-136", title: "只出现一次的数字", difficulty: "easy", category: "other", platform: "leetcode", url: "https://leetcode.cn/problems/single-number/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19731715" },
    { id: "lc-169", title: "多数元素", difficulty: "easy", category: "other", platform: "leetcode", url: "https://leetcode.cn/problems/majority-element/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19736326" },
    { id: "lc-75", title: "颜色分类", difficulty: "medium", category: "other", platform: "leetcode", url: "https://leetcode.cn/problems/sort-colors/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778849.html" },
    { id: "lc-31", title: "下一个排列", difficulty: "medium", category: "other", platform: "leetcode", url: "https://leetcode.cn/problems/next-permutation/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778850.html" },
    { id: "lc-287", title: "寻找重复数", difficulty: "medium", category: "other", platform: "leetcode", url: "https://leetcode.cn/problems/find-the-duplicate-number/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778852.html" },
    { id: "lc-41", title: "缺失的第一个正数", difficulty: "hard", category: "other", platform: "leetcode", url: "https://leetcode.cn/problems/first-missing-positive/", blogUrl: "https://www.cnblogs.com/ranxi169/p/19778854.html" },

    // ============ Codeforces 示例 ============
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
];

// 平台映射
const PLATFORM_NAMES = {
    "leetcode": "LeetCode",
    "codeforces": "Codeforces",
    "nowcoder": "牛客"
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
if (typeof window !== 'undefined') {
    window.PROBLEMS_DATA = PROBLEMS_DATA;
    window.CATEGORY_NAMES = CATEGORY_NAMES;
    window.DIFFICULTY_NAMES = DIFFICULTY_NAMES;
    window.PLATFORM_NAMES = PLATFORM_NAMES;
}
