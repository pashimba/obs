import { Rect, Text, Group } from 'react-konva';
import { forwardRef, useEffect, useState } from 'react';
import { useCanvasStore } from '../../store/useCanvasStore';

const CameraElement = forwardRef(({ element, onDragMove, onDragEnd, onTransformEnd }, ref) => {
  const selectElement = useCanvasStore((s) => s.selectElement);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (element.isActive) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(() => setActive(true))
        .catch(() => setActive(false));
    }
  }, [element.isActive]);

  return (
    <Group
      ref={ref}
      x={element.position.x}
      y={element.position.y}
      draggable
      onClick={() => selectElement(element.id)}
      onDragMove={onDragMove}
      onDragEnd={onDragEnd}
      onTransformEnd={onTransformEnd}
    >
      <Rect
        width={element.size.width}
        height={element.size.height}
        fill="#000"
        stroke={active ? '#8b5cf6' : '#444'}
        strokeWidth={2}
        cornerRadius={8}
      />
      <Text
        text={active ? '🎥 CAM ON' : '📷 CAM OFF'}
        fill="white"
        fontSize={14}
        padding={10}
      />
    </Group>
  );
});

CameraElement.displayName = 'CameraElement';
export default CameraElement;
