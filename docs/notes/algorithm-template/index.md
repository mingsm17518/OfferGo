---
layout: default
title: 算法模板总结
description: 常见算法题型的解题模板和套路
eyebrow: 学习笔记 / 算法模板
---

# 算法模板总结

刷题过程中整理的常见算法模板，遇到同类型题目可以直接套用。

## 二分查找

```python
def binary_search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

**关键点**：注意 `left <= right` 还是 `left < right`，取决于区间定义（闭区间还是左闭右开）。

## 滑动窗口

```python
def sliding_window(s):
    left = 0
    window = {}
    for right in range(len(s)):
        # 扩大窗口
        window[s[right]] = window.get(s[right], 0) + 1
        # 缩小窗口（满足条件时）
        while need_shrink(window):
            window[s[left]] -= 1
            if window[s[left]] == 0:
                del window[s[left]]
            left += 1
```

**适用场景**：子串/子数组问题，求最长/最短满足条件的连续区间。

## 回溯

```python
def backtrack(path, choices):
    if 满足结束条件:
        result.append(path[:])
        return
    for choice in choices:
        做选择
        backtrack(path, choices)
        撤销选择
```

**适用场景**：排列、组合、子集、分割问题。

## BFS 模板

```python
from collections import deque

def bfs(start):
    queue = deque([start])
    visited = {start}
    while queue:
        node = queue.popleft()
        for neighbor in get_neighbors(node):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
```

**适用场景**：层序遍历、最短路径、岛屿类问题。

---

> 这篇笔记会持续更新，遇到新的模板会补充进来。
