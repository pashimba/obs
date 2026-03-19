import { Stage, Layer, Transformer, Line } from "react-konva";
import { useRef, useEffect } from "react";
import { useCanvasStore } from "../store/useCanvasStore";
import BoxElement from "../elements/BoxElement";
import TextElement from "../elements/TextElement";
import CameraElement from "../elements/CameraElement";

const Canvas = () => {
  const {
    elements,
    selectedIds,
    scale,
    gridEnabled,
    gridSize,
    snapToGrid,
    updateElement,
  } = useCanvasStore();

  const transformerRef = useRef<any>(null);
  const stageRef = useRef<any>(null);
  const shapeRefs = useRef<Map<string, any>>(new Map());

  // Sincronizar Transformer con los nodos seleccionados
  useEffect(() => {
    if (transformerRef.current) {
      const selectedNodes = selectedIds
        .map((id) => shapeRefs.current.get(id))
        .filter(Boolean);

      transformerRef.current.nodes(selectedNodes);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [selectedIds, elements]); // Se dispara al cambiar selección o elementos

  const snapToGridPosition = (value: number) => {
    if (!snapToGrid) return value;
    return Math.round(value / gridSize) * gridSize;
  };

  const handleDragMove = (id: string, e: any) => {
    if (snapToGrid) {
      const node = e.target;
      node.x(snapToGridPosition(node.x()));
      node.y(snapToGridPosition(node.y()));
    }
  };

  const renderGrid = () => {
    if (!gridEnabled || !stageRef.current) return null;
    const width = 2000; // Un área grande para el grid
    const height = 2000;
    const lines = [];

    for (let i = 0; i <= width / gridSize; i++) {
      lines.push(
        <Line
          key={`v-${i}`}
          points={[i * gridSize, 0, i * gridSize, height]}
          stroke="#2a2a2a"
          strokeWidth={0.5}
          listening={false}
        />,
      );
    }
    for (let i = 0; i <= height / gridSize; i++) {
      lines.push(
        <Line
          key={`h-${i}`}
          points={[0, i * gridSize, width, i * gridSize]}
          stroke="#2a2a2a"
          strokeWidth={0.5}
          listening={false}
        />,
      );
    }
    return lines;
  };

  return (
    <div style={styles.canvasContainer}>
      <Stage
        ref={stageRef}
        width={window.innerWidth - 300} // Ajusta según tu sidebar
        height={window.innerHeight - 100}
        scaleX={scale}
        scaleY={scale}
        onMouseDown={(e) => {
          if (e.target === e.target.getStage()) {
            useCanvasStore.getState().clearSelection();
          }
        }}
        style={styles.stage}
      >
        <Layer listening={false}>{renderGrid()}</Layer>

        <Layer>
          {elements
            .sort((a, b) => a.zIndex - b.zIndex)
            .map((el) => {
              const transformableProps = {
                key: el.id,
                element: el,
                ref: (node: any) => {
                  if (node) shapeRefs.current.set(el.id, node);
                  else shapeRefs.current.delete(el.id);
                },
                onDragMove: (e: any) => handleDragMove(el.id, e),
                onDragEnd: (e: any) => {
                  updateElement(el.id, {
                    position: { x: e.target.x(), y: e.target.y() },
                  });
                },
                onTransformEnd: (e: any) => {
                  const node = e.target;
                  const scaleX = node.scaleX();
                  const scaleY = node.scaleY();
                  node.scaleX(1);
                  node.scaleY(1);
                  updateElement(el.id, {
                    position: { x: node.x(), y: node.y() },
                    size: {
                      width: Math.max(20, node.width() * scaleX),
                      height: Math.max(20, node.height() * scaleY),
                    },
                  });
                },
              };

              switch (el.type) {
                case "text":
                  return <TextElement {...transformableProps} />;
                case "camera":
                  return <CameraElement {...transformableProps} />;
                default:
                  return <BoxElement {...transformableProps} />;
              }
            })}

          <Transformer
            ref={transformerRef}
            rotateEnabled={true}
            anchorFill="#8b5cf6"
            anchorStroke="#fff"
            borderStroke="#8b5cf6"
          />
        </Layer>
      </Stage>
    </div>
  );
};

const styles = {
  canvasContainer: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  stage: {
    backgroundColor: "#0f0f0f",
    boxShadow: "0 0 40px rgba(0,0,0,0.5)",
  },
};

export default Canvas;
