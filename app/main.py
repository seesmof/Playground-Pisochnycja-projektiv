import os

import cv2
from ultralytics import YOLO

model = YOLO("yolov8n.pt")


# taken from https://github.com/pranayrishi/YOLO-ObjectDetection/blob/main/main.py
def detect_objects(frame):
    results = model(frame)
    detected_objects = list()

    for r in results:
        for box in r.boxes:
            class_id = int(box.cls[0])
            confidence = box.conf[0].item()

            if confidence > 0.5:
                label = model.names[class_id]
                detected_objects.append(label)

                x1, y1, x2, y2 = map(int, box.xyxy[0])
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(
                    frame,
                    label,
                    (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.6,
                    (0, 255, 0),
                )
    return frame, detected_objects


current_dir = os.path.dirname(os.path.abspath(__file__))
video_file_name = "parking-lot.mp4"
video_file_path = os.path.join(current_dir, "..", "data", video_file_name)
# video = cv2.VideoCapture(video_file_path)
video = cv2.VideoCapture(0)

# taken from https://www.geeksforgeeks.org/python/python-play-a-video-using-opencv/
while True:
    ret, frame = video.read()
    if not ret:
        break

    frame, detected_objects = detect_objects(frame)
    cv2.imshow("Video", frame)
    if cv2.waitKey(25) & 0xFF == ord("q"):
        break

video.release()
cv2.destroyAllWindows()
