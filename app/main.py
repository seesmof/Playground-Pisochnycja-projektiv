import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

idx = pd.date_range("2026-10-01", periods=100, freq="h")
s = pd.Series(15 + np.random.randn(100), index=idx, name="temperature")
s.index.name = "datetime"
print(s)

plt.figure(figsize=(10, 3))
s.plot()
plt.grid()
plt.xlabel("datetime")
plt.ylabel("temperature")
plt.show()
