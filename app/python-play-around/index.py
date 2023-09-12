fib = [0] * 45


def solve(n: int, k: int) -> str:
    if (n == 0):
        return 'a'
    if (n == 1):
        return 'b'
    if (k <= fib[n-2]):
        return solve(n-2, k)
    return solve(n-1, k-fib[n-2])


def main():
    n, k, tests = 0, 0, 0
    fib[0] = 1
    fib[1] = 1
    for i in range(2, 45):
        fib[i] = fib[i-1] + fib[i-2]
    tests = int(input())
    while tests - 1:
        n, k = map(int, input().split())
        print(solve(n, k))


if __name__ == '__main__':
    main()
