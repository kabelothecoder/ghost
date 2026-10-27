import React, { useRef, useState, useEffect } from 'react';
import { DesignLayer, TextLayer, ShapeLayer, ImageLayer } from '../../types';

interface CanvasViewProps {
  width: number;
  height: number;
  backgroundColor: string;
  layers: DesignLayer[];
  selectedLayerId: string | null;
  onSelectLayer: (layerId: string | null) => void;
  onUpdateLayer: (updatedLayer: DesignLayer) => void;
  zoom: number;
}

export const CanvasView: React.FC<CanvasViewProps> = ({
  width,
  height,
  backgroundColor,
  layers,
  selectedLayerId,
  onSelectLayer,
  onUpdateLayer,
  zoom
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    layerId: string | null;
    startX: number;
    startY: number;
    initialLayerX: number;
    initialLayerY: number;
  }>({
    isDragging: false,
    layerId: null,
    startX: 0,
    startY: 0,
    initialLayerX: 0,
    initialLayerY: 0
  });

  const [resizeState, setResizeState] = useState<{
    isResizing: boolean;
    handle: 'se' | 'sw' | 'ne' | 'nw' | null;
    startX: number;
    startY: number;
    initialW: number;
    initialH: number;
    initialX: number;
    initialY: number;
  }>({
    isResizing: false,
    handle: null,
    startX: 0,
    startY: 0,
    initialW: 0,
    initialH: 0,
    initialX: 0,
    initialY: 0
  });

  const selectedLayer = layers.find(l => l.id === selectedLayerId);

  // Mouse move handler for dragging and resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragState.isDragging && dragState.layerId) {
        const dx = (e.clientX - dragState.startX) / zoom;
        const dy = (e.clientY - dragState.startY) / zoom;
        const layer = layers.find(l => l.id === dragState.layerId);
        if (layer && !layer.isLocked) {
          onUpdateLayer({
            ...layer,
            x: Math.round(dragState.initialLayerX + dx),
            y: Math.round(dragState.initialLayerY + dy)
          });
        }
      } else if (resizeState.isResizing && selectedLayer && !selectedLayer.isLocked) {
        const dx = (e.clientX - resizeState.startX) / zoom;
        const dy = (e.clientY - resizeState.startY) / zoom;
        let newW = resizeState.initialW;
        let newH = resizeState.initialH;
        let newX = resizeState.initialX;
        let newY = resizeState.initialY;

        if (resizeState.handle === 'se') {
          newW = Math.max(20, Math.round(resizeState.initialW + dx));
          newH = Math.max(20, Math.round(resizeState.initialH + dy));
        } else if (resizeState.handle === 'sw') {
          const proposedW = Math.max(20, Math.round(resizeState.initialW - dx));
          newX = resizeState.initialX + (resizeState.initialW - proposedW);
          newW = proposedW;
          newH = Math.max(20, Math.round(resizeState.initialH + dy));
        } else if (resizeState.handle === 'ne') {
          newW = Math.max(20, Math.round(resizeState.initialW + dx));
          const proposedH = Math.max(20, Math.round(resizeState.initialH - dy));
          newY = resizeState.initialY + (resizeState.initialH - proposedH);
          newH = proposedH;
        } else if (resizeState.handle === 'nw') {
          const proposedW = Math.max(20, Math.round(resizeState.initialW - dx));
          const proposedH = Math.max(20, Math.round(resizeState.initialH - dy));
          newX = resizeState.initialX + (resizeState.initialW - proposedW);
          newY = resizeState.initialY + (resizeState.initialH - proposedH);
          newW = proposedW;
          newH = proposedH;
        }

        onUpdateLayer({
          ...selectedLayer,
          x: newX,
          y: newY,
          width: newW,
          height: newH
        });
      }
    };

    const handleMouseUp = () => {
      if (dragState.isDragging) {
        setDragState(prev => ({ ...prev, isDragging: false, layerId: null }));
      }
      if (resizeState.isResizing) {
        setResizeState(prev => ({ ...prev, isResizing: false, handle: null }));
      }
    };

    if (dragState.isDragging || resizeState.isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState, resizeState, zoom, layers, selectedLayer, onUpdateLayer]);

  const handleStartDrag = (e: React.MouseEvent, layer: DesignLayer) => {
    e.stopPropagation();
    onSelectLayer(layer.id);
    if (layer.isLocked) return;

    setDragState({
      isDragging: true,
      layerId: layer.id,
      startX: e.clientX,
      startY: e.clientY,
      initialLayerX: layer.x,
      initialLayerY: layer.y
    });
  };

  const handleStartResize = (e: React.MouseEvent, handle: 'se' | 'sw' | 'ne' | 'nw') => {
    e.stopPropagation();
    if (!selectedLayer || selectedLayer.isLocked) return;

    setResizeState({
      isResizing: true,
      handle,
      startX: e.clientX,
      startY: e.clientY,
      initialW: selectedLayer.width,
      initialH: selectedLayer.height,
      initialX: selectedLayer.x,
      initialY: selectedLayer.y
    });
  };

  const renderShapeContent = (layer: ShapeLayer) => {
    const { shapeType, fillColor, strokeColor, strokeWidth, cornerRadius = 0, width: w, height: h } = layer;

    if (shapeType === 'circle') {
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} className="overflow-visible pointer-events-none">
          <ellipse
            cx={w / 2}
            cy={h / 2}
            rx={Math.max(1, (w - strokeWidth) / 2)}
            ry={Math.max(1, (h - strokeWidth) / 2)}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
        </svg>
      );
    }

    if (shapeType === 'triangle') {
      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} className="overflow-visible pointer-events-none">
          <polygon
            points={`${w / 2},${strokeWidth} ${w - strokeWidth},${h - strokeWidth} ${strokeWidth},${h - strokeWidth}`}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
        </svg>
      );
    }

    if (shapeType === 'star') {
      const cx = w / 2;
      const cy = h / 2;
      const outerR = Math.min(w, h) / 2 - strokeWidth;
      const innerR = outerR * 0.45;
      const points: string[] = [];
      for (let i = 0; i < 10; i++) {
        const r = i % 2 === 0 ? outerR : innerR;
        const angle = (i * Math.PI) / 5 - Math.PI / 2;
        points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
      }

      return (
        <svg width="100%" height="100%" viewBox={`0 0 ${w} ${h}`} className="overflow-visible pointer-events-none">
          <polygon
            points={points.join(' ')}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
        </svg>
      );
    }

    if (shapeType === 'line') {
      return (
        <div
          style={{
            width: '100%',
            height: `${Math.max(2, strokeWidth)}px`,
            backgroundColor: fillColor || strokeColor
          }}
          className="pointer-events-none"
        />
      );
    }

    // Default: rectangle
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: fillColor,
          borderColor: strokeColor,
          borderWidth: `${strokeWidth}px`,
          borderStyle: strokeWidth > 0 ? 'solid' : 'none',
          borderRadius: `${cornerRadius}px`
        }}
        className="pointer-events-none"
      />
    );
  };

  return (
    <div
      ref={containerRef}
      onClick={() => onSelectLayer(null)}
      className="flex-1 bg-neutral-200 overflow-auto flex items-center justify-center p-8 select-none min-h-[500px]"
    >
      {/* Scaled Artboard Wrapper */}
      <div
        id="design-canvas-artboard"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor,
          transform: `scale(${zoom})`,
          transformOrigin: 'center center',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          position: 'relative'
        }}
        className="relative transition-transform duration-75 overflow-hidden"
      >
        {/* Layers in stack order */}
        {layers.map((layer) => {
          const isSelected = layer.id === selectedLayerId;

          return (
            <div
              key={layer.id}
              onClick={(e) => handleStartDrag(e, layer)}
              onMouseDown={(e) => handleStartDrag(e, layer)}
              style={{
                position: 'absolute',
                left: `${layer.x}px`,
                top: `${layer.y}px`,
                width: `${layer.width}px`,
                height: `${layer.height}px`,
                transform: `rotate(${layer.rotation || 0}deg)`,
                opacity: layer.opacity ?? 1,
                cursor: layer.isLocked ? 'default' : 'move',
                zIndex: isSelected ? 20 : 10
              }}
              className="group"
            >
              {/* Layer Content */}
              {layer.type === 'text' && (
                <div
                  style={{
                    fontFamily: (layer as TextLayer).fontFamily,
                    fontSize: `${(layer as TextLayer).fontSize}px`,
                    fontWeight: (layer as TextLayer).fontWeight,
                    fontStyle: (layer as TextLayer).fontStyle,
                    textAlign: (layer as TextLayer).textAlign,
                    color: (layer as TextLayer).color,
                    letterSpacing: `${(layer as TextLayer).letterSpacing}px`,
                    lineHeight: (layer as TextLayer).lineHeight,
                    textTransform: (layer as TextLayer).textTransform || 'none',
                    width: '100%',
                    height: '100%',
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap'
                  }}
                  className="pointer-events-none"
                >
                  {(layer as TextLayer).text}
                </div>
              )}

              {layer.type === 'shape' && renderShapeContent(layer as ShapeLayer)}

              {layer.type === 'image' && (
                <img
                  src={(layer as ImageLayer).src}
                  alt={(layer as ImageLayer).alt || 'Uploaded layer'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: (layer as ImageLayer).objectFit || 'cover'
                  }}
                  className="pointer-events-none rounded select-none"
                  draggable={false}
                />
              )}

              {/* Selection Bounding Box & Resize Handles */}
              {isSelected && (
                <div className="absolute inset-0 border-2 border-cyan-500 pointer-events-none">
                  {!layer.isLocked && (
                    <>
                      {/* NW handle */}
                      <div
                        onMouseDown={(e) => handleStartResize(e, 'nw')}
                        className="pointer-events-auto absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-cyan-500 rounded-sm cursor-nwse-resize hover:scale-125 transition-transform"
                      />
                      {/* NE handle */}
                      <div
                        onMouseDown={(e) => handleStartResize(e, 'ne')}
                        className="pointer-events-auto absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-cyan-500 rounded-sm cursor-nesw-resize hover:scale-125 transition-transform"
                      />
                      {/* SW handle */}
                      <div
                        onMouseDown={(e) => handleStartResize(e, 'sw')}
                        className="pointer-events-auto absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-cyan-500 rounded-sm cursor-nesw-resize hover:scale-125 transition-transform"
                      />
                      {/* SE handle */}
                      <div
                        onMouseDown={(e) => handleStartResize(e, 'se')}
                        className="pointer-events-auto absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-cyan-500 rounded-sm cursor-nwse-resize hover:scale-125 transition-transform"
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
