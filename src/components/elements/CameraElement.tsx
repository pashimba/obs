import { Rect, Text, Group, Image } from "react-konva";
import { forwardRef, useEffect, useState, useRef } from "react";
import { useCanvasStore } from "../store/useCanvasStore";

// Definimos exactamente qué props aceptará este componente
interface CameraProps {
  element: any;
  onDragMove?: (e: any) => void;
  onDragEnd?: (e: any) => void;
  onTransformEnd?: (e: any) => void;
}

// Usamos forwardRef para que el Transformer del padre pueda "engancharse"
const CameraElement = forwardRef<any, CameraProps>((props, ref) => {
  const { element, onDragMove, onDragEnd, onTransformEnd } = props;
  const select = useCanvasStore((s) => s.selectElement);
  const [video] = useState(() => document.createElement("video"));

  useEffect(() => {
    if (element.isActive) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => console.error("Error webcam:", err));
    }
    return () => {
      const stream = video.srcObject as MediaStream;
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [element.isActive, video]);

  return (
    <Group
      ref={ref} // CRITICAL: Esto es lo que permite que el Transformer funcione
      x={element.position.x}
      y={element.position.y}
      draggable
      onClick={() => select(element.id)}
      onDragMove={onDragMove}
      onDragEnd={onDragEnd}
      onTransformEnd={onTransformEnd}
    >
      <Rect
        width={element.size.width}
        height={element.size.height}
        fill="#000"
        stroke={element.isActive ? "#8b5cf6" : "#444"}
        strokeWidth={2}
        cornerRadius={8}
      />
      <Text
        text={element.isActive ? "CAM ON" : "CAM OFF"}
        fill="white"
        padding={10}
      />
    </Group>
  );
});

CameraElement.displayName = "CameraElement";
export default CameraElement;
