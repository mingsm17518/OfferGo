import json
import random
from typing import List

# ---------- 正确解法（用于计算期望输出） ----------
def num_islands(grid: List[List[str]]) -> int:
    if not grid or not grid[0]:
        return 0
    rows, cols = len(grid), len(grid[0])
    count = 0
    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

    def dfs(r, c):
        grid[r][c] = '0'
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == '1':
                dfs(nr, nc)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    return count

# ---------- 生成随机网格 ----------
def random_grid(rows, cols, density=0.3):
    """生成一个随机网格，density 为 '1' 的比例"""
    return [
        ['1' if random.random() < density else '0' for _ in range(cols)]
        for _ in range(rows)
    ]

# ---------- 生成评测样例 ----------
def generate_testcases(num_cases=100, min_size=5, max_size=10, density=0.3):
    cases = []
    for _ in range(num_cases):
        rows = random.randint(min_size, max_size)
        cols = random.randint(min_size, max_size)
        grid = random_grid(rows, cols, density)
        # 深拷贝一份用于计算期望值（避免污染原始网格）
        grid_copy = [row[:] for row in grid]
        expected = num_islands(grid_copy)
        
        # 构造输入字符串（常见格式：第一行 rows cols，之后每行是网格字符串）
        stdin_lines = [f"{rows} {cols}"]
        for row in grid:
            stdin_lines.append(''.join(row))
        stdin = "\n".join(stdin_lines)
        
        cases.append({
            "stdin": stdin,
            "expected": str(expected)
        })
    return {"cases": cases}

if __name__ == "__main__":
    random.seed(42)  # 固定随机种子，保证可复现
    n = 1000
    testcases = generate_testcases(num_cases = n)
    with open("testcases.json", "w", encoding="utf-8") as f:
        json.dump(testcases, f, indent=2)
    print(f"已生成 testcases.json，包含{n}个测试用例。")