"""
SARIMA prediction for the synthetic hourly weather data.

For every city and every weather variable we fit a seasonal ARIMA model
with daily seasonality (period = 24 hours) and forecast the next 24 hours.
Results are written to predictions/<city>_<variable>.csv.

Run:  uv run python predict_data.py
"""
import numpy as np
import pandas as pd
from pathlib import Path
from statsmodels.tsa.statespace.sarimax import SARIMAX

# ----------------------------------------------------------------------
# Configuration
# ----------------------------------------------------------------------
CITIES = ["kyiv", "zaporizhzhia", "dnipro"]
VARIABLES = [
    "temperature_c",
    "humidity_pct",
    "pressure_hpa",
    "wind_speed_ms",
    "precipitation_mm",
]
HORIZON = 24  # hours to forecast into the future (next day)

# Use light SARIMA orders that still model the 24-hour cycle.
# Non-seasonal (p,d,q) = (1,1,0): first difference (d=1) handles the trend,
# then one AR term (p=1) models short-term autocorrelation.
# Seasonal (P,D,Q,s) = (1,0,0,24): one seasonal AR term with period 24 hours
#   (today's value depends on yesterday's value at the same hour),
#   which captures the daily weather rhythm with a single parameter.
ORDER = (1, 1, 0)
SEASONAL_ORDER = (1, 0, 0, 24)

out_dir = Path("predictions")
out_dir.mkdir(exist_ok=True)

# ----------------------------------------------------------------------
# Fit + forecast
# ----------------------------------------------------------------------
for city in CITIES:
    # Load one city's data, indexed by timestamp
    df = pd.read_csv(f"data/{city}.csv", parse_dates=["timestamp"])
    df = df.set_index("timestamp")

    for var in VARIABLES:
        series = df[var].astype(float)

        # Fit SARIMA
        model = SARIMAX(
            series,
            order=ORDER,
            seasonal_order=SEASONAL_ORDER,
            enforce_stationarity=False,
            enforce_invertibility=False,
        )
        fitted = model.fit(disp=False, maxiter=50)

        # Forecast next HORIZON hours
        forecast = fitted.forecast(steps=HORIZON)

        # Build a future timestamp index and save
        last_ts = series.index[-1]
        future_idx = pd.date_range(
            start=last_ts + pd.Timedelta(hours=1), periods=HORIZON, freq="h"
        )
        pred = pd.DataFrame(
            {"timestamp": future_idx.strftime("%Y-%m-%d %H:%M"), "prediction": forecast.values}
        )
        pred.to_csv(out_dir / f"{city}_{var}.csv", index=False)

        print(f"{city:15s} {var:18s} last={series.iloc[-1]:8.2f}  "
              f"next24_mean={forecast.mean():8.2f}")

print(f"\nSaved {len(CITIES) * len(VARIABLES)} forecast files to {out_dir}/")