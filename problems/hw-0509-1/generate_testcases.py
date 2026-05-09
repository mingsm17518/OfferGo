"""生成 hw-p4907（商品购买查询）的测试用例"""
import json
import random


def gen_case(a_users, b_users):
    stdin_parts = [str(len(a_users))]
    stdin_parts.extend(str(u) for u in a_users)
    stdin_parts.append(str(len(b_users)))
    stdin_parts.extend(str(u) for u in b_users)
    expected = str(len(set(a_users) & set(b_users)))
    return {"stdin": "\n".join(stdin_parts), "expected": expected}


random.seed(42)
cases = []

# 样例 1
cases.append(gen_case([0, 3, 5], [1, 4, 5, 99999999]))

# 样例 2
cases.append(gen_case([0, 3], [0, 20000004, 3, 99999999]))

# 边界：两个空清单
cases.append(gen_case([], []))
# 边界：A 空，B 非空
cases.append(gen_case([], [11111111, 22222222]))
# 边界：B 空
cases.append(gen_case([11111111], []))
# 边界：完全相同
cases.append(gen_case([11111111, 22222222, 33333333], [11111111, 22222222, 33333333]))
# 边界：完全无交集
cases.append(gen_case([11111111, 22222222], [33333333, 44444444]))
# 边界：重复用户去重
cases.append(gen_case([11111111, 11111111, 22222222], [11111111, 11111111]))
# 边界：0 和 99999999
cases.append(gen_case([0, 99999999], [0, 99999999]))
# 边界：大量重复无交集
cases.append(gen_case([12345678] * 100, [87654321] * 100))

# 随机生成填满到 100 条
while len(cases) < 100:
    n = random.randint(1, 200)
    m = random.randint(1, 200)
    overlap_ratio = random.choice([0.0, 0.1, 0.3, 0.5, 0.8, 1.0])
    pool = random.sample(range(10**8), n + m)
    a_pool = pool[:n]
    b_pool = pool[n:]
    if overlap_ratio > 0:
        overlap_count = max(1, int(min(n, m) * overlap_ratio))
        overlap = random.sample(a_pool, min(overlap_count, len(a_pool)))
        replace_count = min(len(overlap), len(b_pool))
        b_pool[:replace_count] = overlap[:replace_count]
    cases.append(gen_case(a_pool, b_pool))

with open("testcases.json", "w") as f:
    json.dump({"cases": cases}, f, indent=2)

print(f"Generated {len(cases)} test cases")
