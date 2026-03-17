import { Text } from "react-konva";
import { forwardRef } from "react";

const TextElement = forwardRef<any, any>(
  ({ element, onDragMove, onDragEnd, onTransformEnd }, ref) => {
    return (
      <Text
        ref={ref}
        x={element.position.x}
        y={element.position.y}
        text={element.text || "Doble clic para editar"}
        fontSize={element.fontSize || 20}
        fill={element.color || "white"}
        draggable
        onDragMove={onDragMove}
        onDragEnd={onDragEnd}
        onTransformEnd={onTransformEnd}
      />
    );
  },
);

TextElement.displayName = "TextElement";
export default TextElement;
