"""
Batch SARIMA prediction for all cities × variables.

Uses a training window of the last 720 hours (30 days) to capture
daily seasonality while keeping fitting fast.

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
    "wind_speed_ms",
    "precipitation_mm",
]

# Training window: last 720 hours (30 days) — enough for daily seasonality (s=24)
TRAIN_WINDOW = 720
HORIZON = 24

# SARIMA order: (p,d,q) x (P,D,Q,s)
# Non-seasonal (1,1,0): first difference + 1 AR term
# Seasonal   (1,0,0,24): 1 seasonal AR term with period 24 hours
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
            start=last_ts + pd.Timedelta(hours=1),
            periods=HORIZON,
            freq="h",
        )
        pred_df = pd.DataFrame({
            "timestamp": future_idx.strftime("%Y-%m-%d %H:%M"),
            "prediction": forecast.values,
        })
        pred_df.to_csv(out_dir / f"{city}_{var}.csv", index=False)

        print(f"{city:15s} {var:18s} last={series.iloc[-1]:8.2f}  "
              f"next24_mean={forecast.mean():8.2f}")

print(f"\nSaved {len(CITIES) * len(VARIABLES)} forecast files to {out_dir}/")