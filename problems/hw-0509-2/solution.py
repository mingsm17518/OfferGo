from collections import deque

n, d = map(int, input().split())
a = list(map(int, input().split()))

max_dq = deque()  # 单调递减，维护窗口最大值
min_dq = deque()  # 单调递增，维护窗口最小值

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

    # 收缩左边界，直到 max - min <= d
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

print(f"{best_l + 1} {best_l + best_len}")
