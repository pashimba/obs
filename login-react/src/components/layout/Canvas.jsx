import { Stage, Layer, Transformer, Line } from 'react-konva';
import { useRef, useEffect } from 'react';
import { useCanvasStore } from '../../store/useCanvasStore';
import BoxElement from '../elements/BoxElement';
import TextElement from '../elements/TextElement';
import CameraElement from '../elements/CameraElement';

const Canvas = () => {
  const { elements, selectedIds, scale, gridEnabled, gridSize, snapToGrid, updateElement } = useCanvasStore();
  const transformerRef = useRef(null);
  const stageRef = useRef(null);
  const shapeRefs = useRef(new Map());

  useEffect(() => {
    if (transformerRef.current) {
      const nodes = selectedIds.map((id) => shapeRefs.current.get(id)).filter(Boolean);
      transformerRef.current.nodes(nodes);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [selectedIds, elements]);

  const snap = (value) => {
    if (!snapToGrid) return value;
    return Math.round(value / gridSize) * gridSize;
  };

  const handleDragMove = (id, e) => {
    if (snapToGrid) {
      e.target.x(snap(e.target.x()));
      e.target.y(snap(e.target.y()));
    }
  };

  const renderGrid = () => {
    if (!gridEnabled) return null;
    const w = 3000, h = 3000;
    const lines = [];
    for (let i = 0; i <= w / gridSize; i++) {
      lines.push(<Line key={`v${i}`} points={[i * gridSize, 0, i * gridSize, h]} stroke="#1e1e1e" strokeWidth={0.5} listening={false} />);
    }
    for (let i = 0; i <= h / gridSize; i++) {
      lines.push(<Line key={`h${i}`} points={[0, i * gridSize, w, i * gridSize]} stroke="#1e1e1e" strokeWidth={0.5} listening={false} />);
    }
    return lines;
  };

  const stageW = window.innerWidth - 580;
  const stageH = window.innerHeight - 60;

  return (
    <div style={{ flex: 1, background: '#0a0a0a', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Stage
        ref={stageRef}
        width={stageW}
        height={stageH}
        scaleX={scale}
        scaleY={scale}
        onMouseDown={(e) => {
          if (e.target === e.target.getStage()) {
            useCanvasStore.getState().clearSelection();
          }
        }}
        style={{ background: '#111', boxShadow: '0 0 60px rgba(0,0,0,0.8)' }}
      >
        <Layer listening={false}>{renderGrid()}</Layer>
        <Layer>
          {elements
            .sort((a, b) => a.zIndex - b.zIndex)
            .map((el) => {
              const props = {
                key: el.id,
                element: el,
                ref: (node) => {
                  if (node) shapeRefs.current.set(el.id, node);
                  else shapeRefs.current.delete(el.id);
                },
                onDragMove: (e) => handleDragMove(el.id, e),
                onDragEnd: (e) => updateElement(el.id, { position: { x: e.target.x(), y: e.target.y() } }),
                onTransformEnd: (e) => {
                  const node = e.target;
                  const sx = node.scaleX(), sy = node.scaleY();
                  node.scaleX(1); node.scaleY(1);
                  updateElement(el.id, {
                    position: { x: node.x(), y: node.y() },
                    size: { width: Math.max(20, node.width() * sx), height: Math.max(20, node.height() * sy) },
                  });
                },
              };
              switch (el.type) {
                case 'text':   return <TextElement {...props} />;
                case 'camera': return <CameraElement {...props} />;
                default:       return <BoxElement {...props} />;
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

export default Canvas;
