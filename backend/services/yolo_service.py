from ultralytics import YOLO
from PIL import Image
import io
import cv2
import numpy as np

model = YOLO("model/best.pt")


def detect_clothing(image_bytes):
    # Convert bytes to OpenCV image
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    results = model(img)

    detections = []

    for result in results:
        for box in result.boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            confidence = float(box.conf[0])
            class_id = int(box.cls[0])
            class_name = model.names[class_id]

            detections.append({
                "class": class_name,
                "confidence": confidence,
                "box": [x1, y1, x2, y2]
            })

            # 🔹 Draw bounding box
            cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)

            # 🔹 Add label
            label = f"{class_name} {confidence:.2f}"
            cv2.putText(
                img,
                label,
                (x1, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.5,
                (0, 255, 0),
                2
            )

    # 🔹 Encode modified image back to bytes
    _, buffer = cv2.imencode(".jpg", img)
    boxed_image_bytes = buffer.tobytes()

    return detections, boxed_image_bytes
