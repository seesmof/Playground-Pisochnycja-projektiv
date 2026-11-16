"""
Streamlit дашборд: синтетичні погодні дані + прогноз SARIMA (тема Solarized).

Використовує тільки температуру, вологість та тиск.
Прогноз виконується "на льоту" (on the go) при натисканні кнопки.
Можна обрати початкову дату й час — від цієї точки будується прогноз.
Можна обрати горизонт прогнозу (24/48/72/168 годин).

Запуск:  uv run streamlit run app.py
"""

from datetime import timedelta

import streamlit as st
import pandas as pd
import plotly.graph_objects as go
from statsmodels.tsa.statespace.sarimax import SARIMAX

# ----------------------------------------------------------------------
# Палітра Solarized (light)
# ----------------------------------------------------------------------
SOL_BASE3 = "#fdf6e3"   # фон
SOL_BASE2 = "#eee8d5"   # сітка / другорядний фон
SOL_BASE01 = "#586e75"  # основний текст
SOL_BLUE = "#268bd2"    # історія
SOL_ORANGE = "#cb4b16"  # прогноз

# ----------------------------------------------------------------------
# Конфігурація сторінки
# ----------------------------------------------------------------------
st.set_page_config(page_title="Погодний дашборд", layout="wide")
st.title("☀️ Синтетичні погодні дані + Прогноз SARIMA")

# ----------------------------------------------------------------------
# Словники для відображення (українською)
# ----------------------------------------------------------------------
CITY_NAMES = {
    "kyiv": "Київ",
    "zaporizhzhia": "Запоріжжя",
    "dnipro": "Дніпро",
}
VARIABLE_NAMES = {
    "temperature_c": "Температура (°C)",
    "humidity_pct": "Вологість (%)",
    "pressure_hpa": "Тиск (гПа)",
}
CITIES = list(CITY_NAMES)
VARIABLES = list(VARIABLE_NAMES)

# Параметри моделі SARIMA
TRAIN_WINDOW = 720  # останні 720 год (30 днів) для навчання
ORDER = (1, 1, 0)
SEASONAL_ORDER = (1, 0, 0, 24)

# ----------------------------------------------------------------------
# Завантаження даних (кешоване)
# ----------------------------------------------------------------------
@st.cache_data(ttl=600)
def load_history(city: str) -> pd.DataFrame:
    df = pd.read_csv(f"data/{city}.csv", parse_dates=["timestamp"])
    return df.set_index("timestamp")


# ----------------------------------------------------------------------
# Бічна панель: вибір міста, показника, горизонту, дати й часу
# ----------------------------------------------------------------------
city = st.sidebar.selectbox(
    "Місто",
    CITIES,
    format_func=lambda c: CITY_NAMES[c],
)
var = st.sidebar.selectbox(
    "Показник",
    VARIABLES,
    format_func=lambda v: VARIABLE_NAMES[v],
)

horizon = st.sidebar.selectbox(
    "Горизонт прогнозу (годин)",
    options=[24, 48, 72, 168],
    index=0,  # за замовчуванням 24
    format_func=lambda h: f"{h} годин",
)

hist = load_history(city)

# Діапазон доступних дат: щоб вистачило історії для навчання (30 днів)
min_date = (hist.index.min() + pd.Timedelta(days=30)).date()
max_date = hist.index.max().date()

st.sidebar.markdown("### Початкова точка прогнозу")
start_date = st.sidebar.date_input(
    "Дата",
    value=max_date,
    min_value=min_date,
    max_value=max_date,
)
start_time = st.sidebar.time_input(
    "Час",
    value=pd.Timestamp("23:00").time(),
    step=timedelta(hours=1),
)

# Обрана точка відліку
cutoff = pd.Timestamp.combine(start_date, start_time)
st.sidebar.caption(f"Точка відліку: {cutoff:%Y-%m-%d %H:%M}")


# ----------------------------------------------------------------------
# Прогноз "на льоту" (SARIMA) при натисканні кнопки
# ----------------------------------------------------------------------
@st.cache_data(ttl=600, show_spinner=False)
def run_sarima(series: pd.Series, horizon: int) -> pd.Series:
    """Навчає SARIMA на останніх TRAIN_WINDOW годинах і прогнозує horizon годин."""
    train = series.astype(float).iloc[-TRAIN_WINDOW:]
    model = SARIMAX(
        train,
        order=ORDER,
        seasonal_order=SEASONAL_ORDER,
        enforce_stationarity=False,
        enforce_invertibility=False,
    )
    fitted = model.fit(disp=False, maxiter=50)
    forecast = fitted.forecast(steps=horizon)

    last_ts = train.index[-1]
    future_idx = pd.date_range(
        start=last_ts + pd.Timedelta(hours=1), periods=horizon, freq="h"
    )
    return pd.Series(forecast.values, index=future_idx, name="prediction")


# Історія до обраної точки (включно)
observable = hist.loc[:cutoff, var]

forecast_key = f"pred__{city}_{var}_{cutoff:%Y%m%d%H%M}_{horizon}"
if st.sidebar.button("🔮 Прогнозувати"):
    with st.spinner("Навчання моделі SARIMA…"):
        st.session_state[forecast_key] = run_sarima(observable, horizon)
    st.success("Прогноз готовий!")


# ----------------------------------------------------------------------
# Побудова графіка: останні 168 год історії до обраної дати + прогноз
# ----------------------------------------------------------------------
lookback = 168  # годин (7 днів)
recent = observable.iloc[-lookback:]

fig = go.Figure()

# Історія
fig.add_trace(
    go.Scatter(
        x=recent.index,
        y=recent.values,
        mode="lines",
        name="Історія (7 днів дообраної дати)",
        line=dict(color=SOL_BLUE, width=1.5),
    )
)

# Прогноз (якщо вже обчислений)
if forecast_key in st.session_state:
    pred = st.session_state[forecast_key]
    fig.add_trace(
        go.Scatter(
            x=pred.index,
            y=pred.values,
            mode="lines+markers",
            name=f"Прогноз ({horizon} годин)",
            line=dict(color=SOL_ORANGE, width=2, dash="dash"),
            marker=dict(size=5),
        )
    )

fig.update_layout(
    title=f"{CITY_NAMES[city]} — {VARIABLE_NAMES[var]}",
    xaxis_title="Час",
    yaxis_title=VARIABLE_NAMES[var],
    hovermode="x unified",
    height=500,
    template="plotly_white",
    paper_bgcolor=SOL_BASE3,
    plot_bgcolor=SOL_BASE3,
    font=dict(color=SOL_BASE01),
    xaxis=dict(gridcolor=SOL_BASE2, zerolinecolor=SOL_BASE2),
    yaxis=dict(gridcolor=SOL_BASE2, zerolinecolor=SOL_BASE2),
    legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1),
)

st.plotly_chart(fig, use_container_width=True)