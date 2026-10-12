import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

period = 24 * 2
idx = pd.date_range("2026-10-01", periods=period, freq="h")
s = pd.Series(15 + np.random.randn(period), index=idx, name="temperature")
s.index.name = "datetime"
print(s)

plt.figure(figsize=(15, 10))
plt.title("Вимірювання температури за два дні")
s.plot()
plt.grid()
plt.xlabel("Дата")
plt.ylabel("Температура, градуси Цельсія")
plt.show()
