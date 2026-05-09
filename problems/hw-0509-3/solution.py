import sys

def solve():
    data = sys.stdin.read().split()
    idx = 0
    A, B, C, D = int(data[idx]), int(data[idx+1]), int(data[idx+2]), int(data[idx+3])
    idx += 4
    N = int(data[idx])
    idx += 1

    tasks = sorted([A, B, C, D])
    machines = []
    max_ram = 0
    for i in range(N):
        x = int(data[idx + i])
        machines.append(x)
        max_ram = max(max_ram, x)

    # dp[i] = (min_count, prev_task_index) for filling exactly i RAM
    # Use a large sentinel for unreachable states
    INF = float('inf')
    dp_count = [INF] * (max_ram + 1)
    dp_count[0] = 0

    # For reconstructing the path, store the last task chosen
    dp_choice = [-1] * (max_ram + 1)

    for ram in range(1, max_ram + 1):
        best_count = INF
        best_choice = -1
        for ti in range(4):
            t = tasks[ti]
            if t <= ram and dp_count[ram - t] + 1 < best_count:
                best_count = dp_count[ram - t] + 1
                best_choice = ti
        dp_count[ram] = best_count
        dp_choice[ram] = best_choice

    # For tie-breaking: when counts are equal, we need dictionary-order smallest
    # Rebuild with tie-breaking: reconstruct and compare
    # Better approach: dp on (count, sequence) - but that's expensive
    # Instead, do a second pass: for equal counts, prefer smaller task (since tasks sorted)
    # The greedy choice of smallest task index already handles this for the sorted tasks

    # Actually we need to be more careful. When dp_count values are equal,
    # we need the one whose full reconstructed sequence is lexicographically smallest.
    # Since tasks are sorted ascending, preferring smaller task index in reconstruction
    # gives us the lex-smallest sequence when read in reverse (which becomes ascending order).

    # Let me reconsider: we want the ascending sorted sequence to be lex-smallest.
    # If we always pick the smallest task when counts tie, the reconstruction gives us
    # tasks in non-decreasing order, and that sequence is lex-smallest.
    # This is correct because: for two sequences with same count, comparing element by element
    # from smallest to largest, we want each element to be as small as possible.

    for x in machines:
        # Reconstruct
        parts = []
        remaining = x
        while remaining > 0:
            ti = dp_choice[remaining]
            parts.append(tasks[ti])
            remaining -= tasks[ti]
        parts.sort()
        print('+'.join(map(str, parts)))

solve()
