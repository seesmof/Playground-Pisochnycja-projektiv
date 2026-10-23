# DataSense Chat - multimodal AI assistant (course project)

Built for "Інженерія прикладних інтелектуальних застосунків": combines
**noise detection**, **text**, **images**, and **time series** into one Streamlit chat app.
All models are implemented by hand (TF-IDF+NB, OpenCV features, rolling z-score/CUSUM,
spectral features) - no LLM API.

## Run

```bash
cd app
uv sync
uv run python generate_sample_data.py   # optional demo files
uv run streamlit run streamlit_app.py
```

## Modules

- `modules/noise.py` - audio/sensor noise features, denoising, acoustic anomaly
- `modules/text.py` - intent routing + failure-mode classification
- `modules/image.py` - defect scoring + saliency heatmap
- `modules/timeseries.py` - anomaly detection, CUSUM, forecast
- `modules/fusion.py` - weighted multimodal fusion + severity

## Demo flow

1. Upload `sample_data/sensor.csv` -> anomalies + forecast
2. Upload `sample_data/defect.png` -> defect score + heatmap
3. Upload `sample_data/machine.wav` -> audio features + anomaly
4. Upload `sample_data/maintenance.log` -> failure-mode classification
5. Click "Run fusion" -> combined alert + explanation

Toggle "Teach me mode" to see the math behind each step.