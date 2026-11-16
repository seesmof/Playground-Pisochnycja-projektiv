"""
Streamlit дашборд: синтетичні погодні дані + прогноз SARIMA.

Прогноз виконується "на льоту" (on the go) при натисканні кнопки.

Запуск:  uv run streamlit run app.py
"""

import streamlit as st
import pandas as pd
import plotly.graph_objects as go
from statsmodels.tsa.statespace.sarimax import SARIMAX

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
    "wind_speed_ms": "Швидкість вітру (м/с)",
    "precipitation_mm": "Опади (мм)",
}
CITIES = list(CITY_NAMES)
VARIABLES = list(VARIABLE_NAMES)

# Параметри моделі SARIMA
TRAIN_WINDOW = 720  # останні 720 год (30 днів) для навчання
HORIZON = 24  # прогноз на 24 години
ORDER = (1, 1, 0)
SEASONAL_ORDER = (1, 0, 0, 24)

# ----------------------------------------------------------------------
# Бічна панель
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


# ----------------------------------------------------------------------
# Завантаження даних (кешоване)
# ----------------------------------------------------------------------
@st.cache_data(ttl=600)
def load_history(city: str) -> pd.DataFrame:
    df = pd.read_csv(f"data/{city}.csv", parse_dates=["timestamp"])
    return df.set_index("timestamp")


hist = load_history(city)


# ----------------------------------------------------------------------
# Прогноз "на льоту" (SARIMA) при натисканні кнопки
# ----------------------------------------------------------------------
@st.cache_data(ttl=600, show_spinner=False)
def run_sarima(series: pd.Series) -> pd.Series:
    """Навчає SARIMA на останніх TRAIN_WINDOW годинах і прогнозує HORIZON."""
    train = series.astype(float).iloc[-TRAIN_WINDOW:]
    model = SARIMAX(
        train,
        order=ORDER,
        seasonal_order=SEASONAL_ORDER,
        enforce_stationarity=False,
        enforce_invertibility=False,
    )
    fitted = model.fit(disp=False, maxiter=50)
    forecast = fitted.forecast(steps=HORIZON)

    last_ts = train.index[-1]
    future_idx = pd.date_range(
        start=last_ts + pd.Timedelta(hours=1), periods=HORIZON, freq="h"
    )
    return pd.Series(forecast.values, index=future_idx, name="prediction")


forecast_key = f"pred__{city}_{var}"
if st.sidebar.button("🔮 Прогнозувати на 24 год"):
    with st.spinner("Навчання моделі SARIMA…"):
        st.session_state[forecast_key] = run_sarima(hist[var])
    st.success("Прогноз готовий!")

# ----------------------------------------------------------------------
# Побудова графіка: останні 168 год історії + прогноз (якщо є)
# ----------------------------------------------------------------------
lookback = 168  # годин (7 днів)
recent = hist[var].iloc[-lookback:]

fig = go.Figure()

# Історія
fig.add_trace(
    go.Scatter(
        x=recent.index,
        y=recent.values,
        mode="lines",
        name="Історія (останні 7 днів)",
        line=dict(color="#1f77b4", width=1.5),
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
            name="Прогноз (наступні 24 год)",
            line=dict(color="#ff7f0e", width=2, dash="dash"),
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
    legend=dict(orientation="h", yanchor="bottom", y=1.02, xanchor="right", x=1),
)

st.plotly_chart(fig, use_container_width=True)

# ----------------------------------------------------------------------
# Ключові показники
# ----------------------------------------------------------------------
col1, col2, col3 = st.columns(3)
with col1:
    st.metric("Останнє спостереження", f"{recent.iloc[-1]:.1f}")
with col2:
    if forecast_key in st.session_state:
        pred = st.session_state[forecast_key]
        st.metric("Середнє значення прогнозу (24 год)", f"{pred.mean():.1f}")
    else:
        st.metric("Середнє значення прогнозу (24 год)", "—")
with col3:
    if forecast_key in st.session_state:
        pred = st.session_state[forecast_key]
        st.metric("Діапазон прогнозу", f"{pred.min():.1f} – {pred.max():.1f}")
    else:
        st.metric("Діапазон прогнозу", "—")

# ----------------------------------------------------------------------
# Таблиця прогнозу (розгорнути за потреби)
# ----------------------------------------------------------------------
with st.expander("Показати прогноз на 24 год"):
    if forecast_key in st.session_state:
        pred = st.session_state[forecast_key]
        st.dataframe(
            pd.DataFrame(
                {
                    "Час": pred.index.strftime("%Y-%m-%d %H:%M"),
                    "Прогноз": pred.values,
                }
            )
        )
    else:
        st.info("Натисніть «Прогнозувати на 24 год» вище, щоб згенерувати прогноз.")
