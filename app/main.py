import pandas as pd
import numpy as np

idx = pd.date_range("2026-10-01", periods=100, freq="h")
s = pd.Series(15 + np.random.randn(100), index=idx, name="temperature")
s.index.name = "datetime"
print(s)
