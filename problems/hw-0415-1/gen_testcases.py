import json
import random

def simulate(ops, max_history):
    """根据操作序列模拟浏览器，返回所有 print 的输出列表"""
    history = ["Blank"]          # 历史记录列表，索引 0 为最旧，末尾为当前
    forward = []                 # 前进栈（存储的是 URL，后进先出）
    outputs = []

    for op in ops:
        if op[0] == "visit":
            url = op[1]
            # 访问新页面：清空前进栈，加入历史
            forward.clear()
            history.append(url)
            if len(history) > max_history:
                history.pop(0)   # 删除最早记录
        elif op[0] == "back":
            if len(history) >= 2:
                # 当前页面移到前进栈
                forward.append(history.pop())
        elif op[0] == "forward":
            if forward:
                # 前进栈顶页面回到历史
                page = forward.pop()
                history.append(page)
                if len(history) > max_history:
                    history.pop(0)
        elif op[0] == "print":
            outputs.append(history[-1])
    return outputs

def generate_test_cases(num_cases=100, seed=42):
    random.seed(seed)
    cases = []
    for _ in range(num_cases):
        n = random.randint(1, 200)
        max_history = random.randint(1, 99)

        ops = []
        # 操作类型及概率
        choices = ["visit", "back", "forward", "print"]
        weights = [0.4, 0.2, 0.2, 0.2]

        for _ in range(n):
            typ = random.choices(choices, weights=weights)[0]
            if typ == "visit":
                url = f"site{random.randint(1, 1000)}.com"
                ops.append(("visit", url))
            else:
                ops.append((typ,))

        outputs = simulate(ops, max_history)

        # 构建输入字符串
        stdin_lines = [str(n), str(max_history)]
        for op in ops:
            if op[0] == "visit":
                stdin_lines.append(f"visit {op[1]}")
            else:
                stdin_lines.append(op[0])
        stdin_str = "\n".join(stdin_lines)

        # 构建输出字符串
        expected_str = "\n".join(outputs)

        cases.append({"stdin": stdin_str, "expected": expected_str})

    return {"cases": cases}

if __name__ == "__main__":
    data = generate_test_cases(100)
    with open("testcases.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print("已生成 testcases.json，包含 100 组经过验证的评测数据。")