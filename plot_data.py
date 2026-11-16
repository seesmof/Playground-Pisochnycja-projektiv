import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path

CITIES = ["kyiv", "zaporizhzhia", "dnipro"]
data = {c: pd.read_csv(f"data/{c}.csv", parse_dates=["timestamp"]) for c in CITIES}

fig, axes = plt.subplots(5, 1, figsize=(14, 16), sharex=True)

for city, df in data.items():
    axes[0].plot(df.timestamp, df.temperature_c, label=city.capitalize(), alpha=0.8)
axes[0].set_ylabel("Temperature (°C)")
axes[0].legend()
axes[0].grid(True, alpha=0.3)

for city, df in data.items():
    axes[1].plot(df.timestamp, df.humidity_pct, label=city.capitalize(), alpha=0.8)
axes[1].set_ylabel("Humidity (%)")
axes[1].grid(True, alpha=0.3)

for city, df in data.items():
    axes[2].plot(df.timestamp, df.pressure_hpa, label=city.capitalize(), alpha=0.8)
axes[2].set_ylabel("Pressure (hPa)")
axes[2].grid(True, alpha=0.3)

for city, df in data.items():
    axes[3].plot(df.timestamp, df.wind_speed_ms, label=city.capitalize(), alpha=0.8)
axes[3].set_ylabel("Wind Speed (m/s)")
axes[3].grid(True, alpha=0.3)

for city, df in data.items():
    axes[4].plot(df.timestamp, df.precipitation_mm, label=city.capitalize(), alpha=0.8)
axes[4].set_ylabel("Precipitation (mm)")
axes[4].set_xlabel("Date")
axes[4].grid(True, alpha=0.3)

plt.suptitle("Synthetic Hourly Weather Data — 2024", fontsize=14)
plt.tight_layout()
Path("plots").mkdir(exist_ok=True)
plt.savefig("plots/weather_2024.png", dpi=150)
plt.show()
print("Saved: plots/weather_2024.png")
