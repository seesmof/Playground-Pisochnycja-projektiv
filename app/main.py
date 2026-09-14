import numpy as np
import matplotlib.pyplot as plt


def f(x):
    return x**2


def df(x):
    return 2 * x


x = 8.0
learning_rate = 0.1

history = [x]

for _ in range(20):
    x = x - learning_rate * df(x)
    history.append(x)

xs = np.linspace(-10, 10, 400)
plt.plot(xs, f(xs), label="f(x) = x^2")

history = np.array(history)
plt.scatter(history, f(history), color="tab:red", zorder=3)

plt.plot(history, f(history), "--", color="tab:blue", alpha=0.7)

plt.xlabel("x")
plt.ylabel("f(x)")
plt.legend()
plt.grid()
plt.show()
