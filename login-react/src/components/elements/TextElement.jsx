import { Text } from 'react-konva';
import { forwardRef } from 'react';
import { useCanvasStore } from '../../store/useCanvasStore';

const TextElement = forwardRef(({ element, onDragMove, onDragEnd, onTransformEnd }, ref) => {
  const selectElement = useCanvasStore((s) => s.selectElement);
  return (
    <Text
      ref={ref}
      x={element.position.x}
      y={element.position.y}
      text={element.content || 'Doble clic para editar'}
      fontSize={element.fontSize || 20}
      fill={element.color || 'white'}
      fontFamily={element.fontFamily || 'Inter, sans-serif'}
      draggable
      onClick={() => selectElement(element.id)}
      onDragMove={onDragMove}
      onDragEnd={onDragEnd}
      onTransformEnd={onTransformEnd}
    />
  );
});

TextElement.displayName = 'TextElement';
export default TextElement;
