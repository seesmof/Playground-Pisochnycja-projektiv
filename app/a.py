import numpy as np
import matplotlib.pyplot as plt

y = np.linspace(4, 12, 400)
loss = (y - 10) ** 2

plt.figure(figsize=(8, 5))
plt.plot(y, loss)
plt.scatter([6, 6.1, 10], [(6 - 10) ** 2, (6.1 - 10) ** 2, 0])
plt.annotate("y = 6, loss = 16", (6, 16), xytext=(6.3, 19))
plt.annotate("y = 6.1, loss = 15.21", (6.1, 15.21), xytext=(7, 13))
plt.annotate("y = 10, loss = 0", (10, 0), xytext=(10.2, 2))
plt.xlabel("Prediction y")
plt.ylabel("Loss L = (y - 10)²")
plt.title("Loss as a function of the prediction")
plt.grid(True, alpha=0.25)
plt.show()
