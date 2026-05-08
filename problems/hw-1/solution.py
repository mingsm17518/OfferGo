n = int(input())
max_c = int(input())

from collections import deque
d = deque(["Blank"])
sta = []

for _ in range(n):
    s = input().split()

    # visit
    if s[0] == 'visit':
        d.append(s[1])
        if len(d) > max_c:
            d.popleft()
        sta.clear()

    # back
    if s[0] == 'back':
        pass

    # forward
    if s[0] == 'forward':
        pass

    # print
    if s[0] == 'print':
        print(d[-1])
