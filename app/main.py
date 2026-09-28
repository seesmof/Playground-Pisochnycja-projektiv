import cv2
import numpy as np
import streamlit as st
from PIL import Image

st.set_page_config(page_title="Object detection", layout="centered")
st.title("Object detection")
st.caption("Haar cascade face detection — no model download needed.")


@st.cache_resource
def load_detector():
    path = cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
    return cv2.CascadeClassifier(path)


detector = load_detector()

upload_tab, camera_tab = st.tabs(["Upload", "Camera"], on_change="rerun")

src = None
if upload_tab.open:
    with upload_tab:
        file = st.file_uploader("Upload an image", type=["jpg", "jpeg", "png"])
        if file is not None:
            src = file
elif camera_tab.open:
    with camera_tab:
        picture = st.camera_input("Take a picture")
        if picture is not None:
            src = picture

if src is None:
    st.info("Upload an image or take a picture.")
    st.stop()

img = np.array(Image.open(src).convert("RGB"))
gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)

faces = detector.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)

for x, y, w, h in faces:
    cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)

st.metric("Faces detected", str(len(faces)))
st.image(img, caption="Detection result")
