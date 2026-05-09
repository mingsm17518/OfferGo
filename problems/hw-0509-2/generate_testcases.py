"""生成 hw-device-monitor（设备运行监控）的测试用例"""
import json
import random
from collections import deque


def solve(n, d, a):
    """滑动窗口 + 双单调队列求最长连续子数组（max - min <= d）"""
    max_dq = deque()
    min_dq = deque()
    best_l = 0
    best_len = 1
    left = 0
    for right in range(n):
        while max_dq and a[max_dq[-1]] <= a[right]:
            max_dq.pop()
        max_dq.append(right)
        while min_dq and a[min_dq[-1]] >= a[right]:
            min_dq.pop()
        min_dq.append(right)
        while a[max_dq[0]] - a[min_dq[0]] > d:
            left += 1
            if max_dq[0] < left:
                max_dq.popleft()
            if min_dq[0] < left:
                min_dq.popleft()
        cur_len = right - left + 1
        if cur_len > best_len:
            best_len = cur_len
            best_l = left
    return f"{best_l + 1} {best_l + best_len}"


def gen_case(n, d, a):
    stdin = f"{n} {d}\n{' '.join(map(str, a))}"
    expected = solve(n, d, a)
    return {"stdin": stdin, "expected": expected}


random.seed(42)
cases = []

# 样例 1
cases.append(gen_case(9, 3, [1, 4, 2, 5, 7, 4, 3, 8, 1]))

# 样例 2
cases.append(gen_case(12, 5, [5, 7, 9, 6, 8, 10, 12, 15, 13, 14, 16, 18]))

# 样例 3
cases.append(gen_case(8, 5, [5, 7, 3, 8, 6, 4, 9, 2]))

# n=1
cases.append(gen_case(1, 0, [42]))

# d=0，所有值相同
cases.append(gen_case(5, 0, [3, 3, 3, 3, 3]))

# d=0，有不同值
cases.append(gen_case(5, 0, [1, 2, 2, 2, 3]))

# d 很大，整个数组都满足
cases.append(gen_case(6, 10000, [1, 2, 3, 4, 5, 6]))

# 严格递增，d=1
cases.append(gen_case(10, 1, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))

# 所有值相同，d 任意
cases.append(gen_case(100000, 5, [7] * 100000))

# 随机中等规模（含 1 个补齐用例）
for _ in range(81):
    n = random.randint(50, 500)
    d = random.randint(0, 100)
    a = [random.randint(1, 100) for _ in range(n)]
    cases.append(gen_case(n, d, a))

# 随机较大规模
for _ in range(10):
    n = random.randint(10000, 100000)
    d = random.randint(0, 1000)
    a = [random.randint(1, 10000) for _ in range(n)]
    cases.append(gen_case(n, d, a))

with open("testcases.json", "w") as f:
    json.dump({"cases": cases}, f, indent=2)

print(f"Generated {len(cases)} test cases")
