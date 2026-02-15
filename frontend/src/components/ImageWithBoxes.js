import React from "react";
import { Stage, Layer, Rect, Image as KonvaImage, Text } from "react-konva";
import useImage from "use-image";

function ImageWithBoxes({ imageBase64, detections }) {
  const [image] = useImage(`data:image/jpeg;base64,${imageBase64}`);

  if (!image) return null;

  const displayWidth = 500; // fixed display width
  const scale = displayWidth / image.width;
  const displayHeight = image.height * scale;

  return (
    <Stage width={displayWidth} height={displayHeight}>
      <Layer>
        <KonvaImage
          image={image}
          width={displayWidth}
          height={displayHeight}
        />

        {detections.map((det, index) => {
          const { x1, y1, x2, y2 } = det.box;

          return (
            <React.Fragment key={index}>
              <Rect
                x={x1 * scale}
                y={y1 * scale}
                width={(x2 - x1) * scale}
                height={(y2 - y1) * scale}
                stroke="red"
                strokeWidth={2}
              />
              <Text
                x={x1 * scale}
                y={(y1 - 20) * scale}
                text={`${det.class} (${(det.confidence * 100).toFixed(1)}%)`}
                fill="red"
              />
            </React.Fragment>
          );
        })}
      </Layer>
    </Stage>
  );
}

export default ImageWithBoxes;
