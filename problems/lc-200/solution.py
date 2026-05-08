import sys

def numIslands(grid):
    if not grid:
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

def solve():
    data = sys.stdin.read().strip().split()
    if not data:
        return
    try:
        rows = int(data[0])
        cols = int(data[1])
        lines = data[2:2+rows]
        grid = [list(line[:cols]) for line in lines]
    except (ValueError, IndexError):
        lines = [line for line in data if line]
        if not lines:
            return
        grid = [list(line) for line in lines]
    print(numIslands(grid))

if __name__ == "__main__":
    solve()
