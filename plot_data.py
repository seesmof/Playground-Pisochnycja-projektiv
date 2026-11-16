import pandas as pd
import matplotlib.pyplot as plt
from pathlib import Path

CITIES = ["kyiv", "zaporizhzhia", "dnipro"]
VARIABLES = [
    "temperature_c",
    "humidity_pct",
    "pressure_hpa",
]
data = {c: pd.read_csv(f"data/{c}.csv", parse_dates=["timestamp"]) for c in CITIES}

fig, axes = plt.subplots(3, 1, figsize=(14, 12), sharex=True)

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
axes[2].set_xlabel("Date")
axes[2].grid(True, alpha=0.3)

plt.suptitle("Synthetic Hourly Weather Data — 2024", fontsize=14)
plt.tight_layout()
Path("plots").mkdir(exist_ok=True)
plt.savefig("plots/weather_2024.png", dpi=150)
print("Saved: plots/weather_2024.png")