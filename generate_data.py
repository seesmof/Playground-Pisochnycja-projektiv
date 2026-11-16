import numpy as np
import pandas as pd
from pathlib import Path

# ------------------------------------------------------------------
# Reproducibility: fixed seed makes every generated dataset identical.
# Change it to get a DIFFERENT synthetic dataset.
# ------------------------------------------------------------------
np.random.seed(42)


def ar1(n, sigma, phi):
    # ------------------------------------------------------------------
    # AR(1) process: e[i] = phi * e[i-1] + noise
    # Produces slowly decaying values with light temporal autocorrelation.
    #   sigma -> amplitude of the Gaussian noise added to the signal
    #   phi   -> autocorrelation coefficient (0..1); phi close to 1 means
    #           strong, slow drifting correlation
    # ------------------------------------------------------------------
    e = np.zeros(n)
    for i in range(1, n):
        e[i] = phi * e[i - 1] + np.sqrt(1 - phi**2) * np.random.normal(0, sigma)
    return e


# ------------------------------------------------------------------
# Three Ukrainian cities. Each gets its own realistic base offset:
#   temp_offset  -> warmer/colder baseline compared to Kyiv
#   humidity_base -> typical starting relative humidity
# ------------------------------------------------------------------
CITIES = {
    "kyiv": {"temp_offset": 0.0, "humidity_base": 75},
    "zaporizhzhia": {"temp_offset": 1.5, "humidity_base": 68},
    "dnipro": {"temp_offset": 1.0, "humidity_base": 70},
}

# ------------------------------------------------------------------
# Build hourly timestamps from Jan 1, 2024 to Dec 31, 2024, 23:00
# (2024 is a leap year -> 366 days * 24 hours = 8784 rows
#  and the full required coverage of the year)
# ------------------------------------------------------------------
timestamps = pd.date_range("2024-01-01", "2024-12-31 23:00", freq="h")
n = len(timestamps)
doy = timestamps.day_of_year.values  # day of the year, 1..366
hour = timestamps.hour.values  # hour of day, 0..23

Path("data").mkdir(exist_ok=True)

for city, params in CITIES.items():
    # ------------------------------------------------------------------
    # Annual seasonality (cosine): minimum near Jan 15 (-5 C),
    # maximum near Jul 15 (+24 C) -> a smooth yearly temperature wave
    # ------------------------------------------------------------------
    annual = 9.5 - 14.5 * np.cos(2 * np.pi * (doy - 15) / 366)

    # ------------------------------------------------------------------
    # Daily seasonality (sine): minimum ~04:00, maximum ~15:00,
    # amplitude of +/-5 C. Sine peaks at mid-day.
    # ------------------------------------------------------------------
    diurnal = 5 * np.sin(2 * np.pi * (hour - 9) / 24)

    # Temperature = annual trend + daily cycle + city offset + AR(1) noise
    temp = annual + diurnal + params["temp_offset"] + ar1(n, 2.0, 0.9)

    # Humidity inversely correlates with temperature:
    # colder -> higher humidity. Add AR(1) noise, clamp to 0..100, round to int
    humidity = np.clip(
        params["humidity_base"] - 1.5 * (temp - annual) + ar1(n, 8, 0.8), 0, 100
    )

    # Pressure: slow random drift around 1013 hPa (mean-reverting AR(1))
    pressure = 1013 + ar1(n, 4.0, 0.998)

    # Wind speed: mean around 3 m/s, occasional rare gusts, clip to 0..15 m/s
    wind = np.abs(np.random.normal(3, 2.5, n))
    gust = np.random.rand(n) < 0.05
    wind[gust] += np.random.exponential(3, gust.sum())
    wind = np.clip(wind, 0, 15)

    # Precipitation: mostly zero, with ~12% of hours getting light rain (exponential dist)
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
