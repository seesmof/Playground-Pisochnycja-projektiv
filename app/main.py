import cv2
import numpy as np
import streamlit as st
from PIL import Image

st.set_page_config(page_title="Виювлювач зображень", page_icon=":camera:")


@st.cache_resource
def load_detector():
    return cv2.CascadeClassifier(
        cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
    )


st.title("Пошук облич на зображенні")
file = st.file_uploader("Підвантажте зображення", type=["jpg", "jpeg", "png"])
if file is None:
    st.stop()

img = np.array(Image.open(file).convert("RGB"))
faces = load_detector().detectMultiScale(cv2.cvtColor(img, cv2.COLOR_RGB2GRAY), 1.1, 5)

for x, y, w, h in faces:
    cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)

st.metric("Виявлено облич", str(len(faces)))
st.image(img, caption="Результати виявлення")
