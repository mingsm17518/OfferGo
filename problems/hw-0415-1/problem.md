---
title: "浏览器地址栏"
difficulty: medium
category: stack
platform: huawei
url: https://www.nowcoder.com/practice/浏览器地址栏
tags: [华为机考, 栈, 模拟]
---

### 浏览器地址栏

小明正在开发浏览器地址栏功能，支持四种操作：`visit`（访问网页）、`back`（返回上一页）、`forward`（前进到下一页）、`print`（输出当前地址）。

#### 初始状态

- 当前页面为 `Blank`，历史记录中只有 1 个 `Blank` 页面
- 最多保存 `max_history` 个历史记录
- 每次访问新页面时清空前进记录

#### 操作说明

- **visit url**：当前页面更新为该网页，加入历史记录；若超过 max_history 则删除最早记录；清空前进记录
- **back**：若历史记录至少有两个页面，切换到上一页，原当前页面加入前进记录；否则不做操作
- **forward**：若前进记录不为空，切换到下一页，该页面加入历史记录；否则不做操作
- **print**：输出当前页面地址，若为 Blank 则输出 Blank

#### 输入描述

第一行：整数 n（操作数 1 ≤ n ≤ 200）
第二行：整数 max_history（0 < max_history < 100）
接下来 n 行：操作命令

#### 输出描述

每次 print 操作输出当前地址，若无访问过任何页面则输出 Blank

#### 样例 1

**输入:**

```
7
10
visit a.com
visit b.com
back
visit c.com
print
forward
print
```

**输出:**

```
c.com
c.com
```

back 后前进记录为 b.com；后续 visit 清空前进记录，因此 forward 无操作。

#### 样例 2

**输入:**

```
7
3
visit a.com
visit b.com
visit c.com
visit d.com
back
forward
print
```

**输出:**

```
d.com
```

#### 样例 3

**输入:**

```
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
```

**输出:**

```
c.com
```

容量为 3，历史记录为 c.com、d.com、e.com，三次 back 后当前页面为 c.com。

#### 样例 4

**输入:**

```
4
10
back
print
forward
print
```

**输出:**

```
Blank
Blank
```

#### 样例 5

**输入:**

```
4
10
visit abc.com
visit abc.com
back
print
```

**输出:**

```
abc.com
```

访问两次相同页面，历史记录为 Blank、abc.com、abc.com，back 后当前页面为 abc.com。
