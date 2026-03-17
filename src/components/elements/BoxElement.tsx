import { Rect } from "react-konva";
import { forwardRef } from "react";

interface Props {
  element: any; // O usa tu tipo BoxElementType
  onDragMove?: (e: any) => void;
  onDragEnd?: (e: any) => void;
  onTransformEnd?: (e: any) => void;
}

const BoxElement = forwardRef<any, Props>((props, ref) => {
  const { element, onDragMove, onDragEnd, onTransformEnd } = props;

  return (
    <Rect
      ref={ref}
      x={element.position.x}
      y={element.position.y}
      width={element.size.width}
      height={element.size.height}
      fill={element.backgroundColor || "#333"}
      draggable
      onDragMove={onDragMove}
      onDragEnd={onDragEnd}
      onTransformEnd={onTransformEnd}
      // Añade aquí el onClick para seleccionar
      onClick={() => {
        /* tu lógica de selección */
      }}
    />
  );
});

BoxElement.displayName = "BoxElement";
export default BoxElement;
