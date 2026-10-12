import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import torch
from torch import nn

# Generate data
period = 24 * 2
idx = pd.date_range("2026-10-01", periods=period, freq="h")
s = pd.Series(15 + np.random.randn(period), index=idx, name="temperature")
s.index.name = "datetime"
print(s)

# Plot the data
plt.figure(figsize=(15, 10))
plt.title("Вимірювання температури за два дні")
s.plot()
plt.legend()
plt.grid()
plt.xlabel("Дата")
plt.ylabel("Температура, градуси Цельсія")
plt.show()

# Split into train, validation, test
train, val, test = s[:33], s[33:40], s[40:]


# Train the model
def make_xy(a, w=7):
    return torch.tensor(
        np.stack([a[i : i + w] for i in range(len(a) - w)]), dtype=torch.float32
    ), torch.tensor(a[w:], dtype=torch.float32)


X_train, y_train = make_xy(train.values)
mlp = nn.Sequential(nn.Linear(7, 16), nn.ReLU(), nn.Linear(16, 1))
opt = torch.optim.Adam(mlp.parameters())
for _ in range(200):
    opt.zero_grad()
    loss = nn.MSELoss()(mlp(X_train).squeeze(), y_train)
    loss.backward()
    opt.step()

# Predict using MLP
mlp.eval()
with torch.no_grad():
    pred_train = mlp(X_train).squeeze()
    X_test, y_test = make_xy(test.values)
    pred_test = mlp(X_test).squeeze()
    next_temp = mlp(torch.tensor(test.values[-7:], dtype=torch.float32)).item()
print(pred_test, next_temp)

# Plot the predicted value from MLP
plt.figure(figsize=(15, 10))
plt.plot(train.index[7:], y_train.numpy(), label="true")
plt.plot(train.index[7:], pred_train.numpy(), label="pred")
plt.legend()
plt.grid()
plt.show()
