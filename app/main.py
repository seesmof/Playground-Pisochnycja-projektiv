"""CLI: assess hardcoded dummy generated data with MAE."""

import numpy as np

# Hardcoded dummy ground truth and generated (predicted) values.
y_true = np.array([3.0, 5.2, 7.1, 2.0, 8.5, 4.4, 6.0, 1.5, 9.2, 3.8])
y_pred = np.array([3.3, 4.9, 7.6, 2.4, 8.0, 4.8, 5.5, 2.1, 8.7, 4.2])

errors = np.abs(y_true - y_pred)
mae = float(np.mean(errors))
rmse = float(np.sqrt(np.mean((y_true - y_pred) ** 2)))
max_err = float(np.max(errors))

print("y_true :", y_true)
print("y_pred :", y_pred)
print("errors :", errors)
print(f"MAE    : {mae:.4f}")
print(f"RMSE   : {rmse:.4f}")
print(f"MaxErr : {max_err:.4f}")

if mae <= 1.0:
    print("OK: MAE within threshold 1.0")
else:
    print("FAIL: MAE exceeds threshold 1.0")
