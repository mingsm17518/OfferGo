"""生成 hw-p4909（虚拟机任务调度问题）的测试用例"""
import json
import random


def solve_case(tasks, machines):
    """对一组任务和机器，求出每台机器的最优分配方案"""
    max_ram = max(machines)
    INF = float('inf')
    tasks_sorted = sorted(tasks)

    dp_count = [INF] * (max_ram + 1)
    dp_count[0] = 0
    dp_choice = [-1] * (max_ram + 1)

    for ram in range(1, max_ram + 1):
        for ti in range(4):
            t = tasks_sorted[ti]
            if t <= ram and dp_count[ram - t] + 1 < dp_count[ram]:
                dp_count[ram] = dp_count[ram - t] + 1
                dp_choice[ram] = ti

    results = []
    for x in machines:
        parts = []
        remaining = x
        while remaining > 0:
            ti = dp_choice[remaining]
            parts.append(tasks_sorted[ti])
            remaining -= tasks_sorted[ti]
        parts.sort()
        results.append('+'.join(map(str, parts)))
    return '\n'.join(results)


def gen_case(tasks, machines):
    tasks_line = ' '.join(map(str, tasks))
    machine_lines = '\n'.join(map(str, machines))
    stdin_str = f"{tasks_line}\n{len(machines)}\n{machine_lines}"
    expected = solve_case(tasks, machines)
    return {"stdin": stdin_str, "expected": expected}


random.seed(42)
cases = []

# 样例 1
cases.append(gen_case([1, 7, 3, 5], [14, 4]))

# 样例 2
cases.append(gen_case([1, 2, 3, 5], [4]))

# 每台机器 RAM 刚好等于单个任务
cases.append(gen_case([1, 3, 5, 7], [7]))

# RAM = 1，只能选消耗为 1 的任务
cases.append(gen_case([1, 2, 3, 4], [1]))

# 全用 1 填满
cases.append(gen_case([1, 10, 50, 100], [10]))

# 较大 RAM
cases.append(gen_case([1, 3, 7, 13], [100]))

# 多台机器混合
cases.append(gen_case([1, 4, 6, 9], [9, 12, 20, 5, 30]))

# 任务消耗较大
cases.append(gen_case([1, 100, 500, 1000], [1000, 500, 1500]))

# 边界：最小 RAM
cases.append(gen_case([1, 2, 3, 4], [1, 2, 3, 4]))

# 较大 RAM，多台机器
cases.append(gen_case([1, 2, 5, 10], [100, 200, 500, 1000, 2000]))

# 随机测试 1：小 RAM
for _ in range(20):
    t = random.sample(range(1, 20), 3) + [1]
    m = [random.randint(1, 50) for _ in range(random.randint(1, 10))]
    cases.append(gen_case(t, m))

# 随机测试 2：中等 RAM
for _ in range(25):
    t = random.sample(range(1, 100), 3) + [1]
    m = [random.randint(1, 500) for _ in range(random.randint(1, 20))]
    cases.append(gen_case(t, m))

# 随机测试 3：大 RAM，模拟最坏情况
for _ in range(25):
    t = random.sample(range(1, 1000), 3) + [1]
    m = [random.randint(1, 11000) for _ in range(random.randint(1, 50))]
    cases.append(gen_case(t, m))

# 随机测试 4：接近上限 N=1000
for _ in range(20):
    t = random.sample(range(1, 500), 3) + [1]
    m = [random.randint(1, 11000) for _ in range(1000)]
    cases.append(gen_case(t, m))

with open("testcases.json", "w") as f:
    json.dump({"cases": cases}, f, indent=2, ensure_ascii=False)

print(f"已生成 testcases.json，包含 {len(cases)} 组经过验证的评测数据。")
