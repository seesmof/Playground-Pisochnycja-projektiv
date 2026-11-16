"""
Batch SARIMA prediction for all cities × variables.

Uses a training window of the last 720 hours (30 days) to capture
daily seasonality while keeping fitting fast. Forecasts the given horizon.

Run:  uv run python predict_data.py
"""
import numpy as np
import pandas as pd
from pathlib import Path
from statsmodels.tsa.statespace.sarimax import SARIMAX

CITIES = ["kyiv", "zaporizhzhia", "dnipro"]
VARIABLES = [
    "temperature_c",
    "humidity_pct",
    "pressure_hpa",
]

TRAIN_WINDOW = 720  # останні 720 год (30 днів) для навчання
HORIZON = 24  # прогноз на 24 години за замовчиванням
ORDER = (1, 1, 0)
SEASONAL_ORDER = (1, 0, 0, 24)

out_dir = Path("predictions")
out_dir.mkdir(exist_ok=True)

for city in CITIES:
    df = pd.read_csv(f"data/{city}.csv", parse_dates=["timestamp"])
    df = df.set_index("timestamp")

    for var in VARIABLES:
        series = df[var].astype(float).iloc[-TRAIN_WINDOW:]

        model = SARIMAX(
            series,
            order=ORDER,
            seasonal_order=SEASONAL_ORDER,
            enforce_stationarity=False,
            enforce_invertibility=False,
        )
        fitted = model.fit(disp=False, maxiter=50)
        forecast = fitted.forecast(steps=HORIZON)

        last_ts = series.index[-1]
        future_idx = pd.date_range(
            start=last_ts + pd.Timedelta(hours=1), periods=HORIZON, freq="h"
        )
        pred_df = pd.DataFrame({
            "timestamp": future_idx.strftime("%Y-%m-%d %H:%M"),
            "prediction": forecast.values,
        })
        pred_df.to_csv(out_dir / f"{city}_{var}.csv", index=False)

        print(f"{city:15s} {var:18s} last={series.iloc[-1]:8.2f}  "
              f"next{HORIZON}h_mean={forecast.mean():8.2f}")

print(f"\nSaved {len(CITIES) * len(VARIABLES)} forecast files to {out_dir}/")