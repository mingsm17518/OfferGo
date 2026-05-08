import json
import random
from collections import deque

def generate_test_case(case_id):
    """生成一个测试用例，返回 (stdin_str, expected_str)"""
    n = random.randint(1, 200)
    max_history = random.randint(1, 99)

    ops = ['visit', 'back', 'forward', 'print']
    weights = [0.4, 0.2, 0.2, 0.2]

    history = deque(['Blank'])
    forward_stack = []
    outputs = []

    commands = []
    for _ in range(n):
        op = random.choices(ops, weights=weights, k=1)[0]

        if op == 'visit':
            url = f"site{random.randint(1, 1000)}.com"
            history.append(url)
            if len(history) > max_history:
                history.popleft()
            forward_stack.clear()
            commands.append(f"visit {url}")

        elif op == 'back':
            if len(history) >= 2:
                forward_stack.append(history.pop())
            commands.append("back")

        elif op == 'forward':
            if forward_stack:
                page = forward_stack.pop()
                history.append(page)
                if len(history) > max_history:
                    history.popleft()
            commands.append("forward")

        elif op == 'print':
            current = history[-1] if history else "Blank"
            outputs.append(current)
            commands.append("print")

    stdin_str = "\n".join([str(n), str(max_history)] + commands)
    expected_str = "\n".join(outputs)
    return stdin_str, expected_str

def main():
    random.seed(42)  # 固定随机种子，确保可重现
    cases = []
    for case_id in range(1, 101):
        stdin_str, expected_str = generate_test_case(case_id)
        cases.append({
            "stdin": stdin_str,
            "expected": expected_str
        })

    with open("testcases.json", "w", encoding="utf-8") as f:
        json.dump({"cases": cases}, f, indent=2, ensure_ascii=False)

    print("已生成 testcases.json 文件，包含100组评测数据。")

if __name__ == "__main__":
    main()
    