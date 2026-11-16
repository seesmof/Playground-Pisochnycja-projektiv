import numpy as np
import pandas as pd
from pathlib import Path

np.random.seed(42)


def ar1(n, sigma, phi):
    e = np.zeros(n)
    for i in range(1, n):
        e[i] = phi * e[i - 1] + np.sqrt(1 - phi**2) * np.random.normal(0, sigma)
    return e


CITIES = {
    "kyiv": {"temp_offset": 0.0, "humidity_base": 75},
    "zaporizhzhia": {"temp_offset": 1.5, "humidity_base": 68},
    "dnipro": {"temp_offset": 1.0, "humidity_base": 70},
}

timestamps = pd.date_range("2024-01-01", "2024-12-31 23:00", freq="h")
n = len(timestamps)
doy = timestamps.dayofyear.values
hour = timestamps.hour.values

Path("data").mkdir(exist_ok=True)

for city, params in CITIES.items():
    annual = 9.5 - 14.5 * np.cos(2 * np.pi * (doy - 15) / 366)
    diurnal = 5 * np.sin(2 * np.pi * (hour - 9) / 24)
    temp = annual + diurnal + params["temp_offset"] + ar1(n, 2.0, 0.9)

    humidity = np.clip(
        params["humidity_base"] - 1.5 * (temp - annual) + ar1(n, 8, 0.8), 0, 100
    )
    pressure = 1013 + ar1(n, 4.0, 0.998)

    wind = np.abs(np.random.normal(3, 2.5, n))
    gust = np.random.rand(n) < 0.05
    wind[gust] += np.random.exponential(3, gust.sum())
    wind = np.clip(wind, 0, 15)

    precip = np.where(np.random.rand(n) < 0.12, np.random.exponential(1.2, n), 0)

    df = pd.DataFrame(
        {
            "timestamp": timestamps.strftime("%Y-%m-%d %H:%M"),
            "temperature_c": np.round(temp, 1),
            "humidity_pct": np.round(humidity).astype(int),
            "pressure_hpa": np.round(pressure, 1),
            "wind_speed_ms": np.round(wind, 1),
            "precipitation_mm": np.round(np.clip(precip, 0, 5), 1),
        }
    )
    df.to_csv(f"data/{city}.csv", index=False)

print("Generated: data/kyiv.csv, data/zaporizhzhia.csv, data/dnipro.csv")
