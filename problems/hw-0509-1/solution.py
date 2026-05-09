import sys

def solve():
    data = sys.stdin.buffer.read().split()
    idx = 0
    n = int(data[idx]); idx += 1
    a = set()
    for _ in range(n):
        a.add(int(data[idx])); idx += 1
    m = int(data[idx]); idx += 1
    b = set()
    for _ in range(m):
        b.add(int(data[idx])); idx += 1
    print(len(a & b))

solve()
