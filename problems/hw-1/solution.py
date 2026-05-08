n = int(input())
max_c = int(input())

from collections import deque
d = deque(["Blank"])
sta = []

for _ in range(n):
    s = input().split()
    
    if s[0] == 'visit':
        d.append(s[1])
        if len(d) > max_c:
            d.popleft()
        sta.clear()
        
    if s[0] == 'back':
        if len(d) >= 2:
            sta.append(d.pop())
    if s[0] == 'forward':
        if sta:
            d.append(sta.pop())
    if s[0] == 'print':
        print(d[-1])