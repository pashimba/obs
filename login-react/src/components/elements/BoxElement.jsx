import { Rect } from 'react-konva';
import { forwardRef } from 'react';
import { useCanvasStore } from '../../store/useCanvasStore';

const BoxElement = forwardRef(({ element, onDragMove, onDragEnd, onTransformEnd }, ref) => {
  const selectElement = useCanvasStore((s) => s.selectElement);
  return (
    <Rect
      ref={ref}
      x={element.position.x}
      y={element.position.y}
      width={element.size.width}
      height={element.size.height}
      fill={element.backgroundColor || '#4a2c6d'}
      stroke={element.borderColor || '#8b5cf6'}
      strokeWidth={element.borderWidth || 2}
      cornerRadius={element.borderRadius || 8}
      draggable
      onClick={() => selectElement(element.id)}
      onDragMove={onDragMove}
      onDragEnd={onDragEnd}
      onTransformEnd={onTransformEnd}
    />
  );
});

BoxElement.displayName = 'BoxElement';
export default BoxElement;
