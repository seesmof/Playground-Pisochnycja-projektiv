import os

import cv2
from ultralytics import YOLO

model = YOLO("yolov8n.pt")

current_dir = os.path.dirname(os.path.abspath(__file__))
video_file_name = "parking-lot.mp4"
video_file_path = os.path.join(current_dir, "..", "data", video_file_name)
video = cv2.VideoCapture(video_file_path)

# taken from https://www.geeksforgeeks.org/python/python-play-a-video-using-opencv/
while True:
    ret, frame = video.read()

    if not ret:
        break

    cv2.imshow("Video", frame)

    if cv2.waitKey(25) & 0xFF == ord("q"):
        break

video.release()
cv2.destroyAllWindows()
