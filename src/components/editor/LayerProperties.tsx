import React from 'react';
import { DesignLayer, TextLayer, ShapeLayer, ImageLayer } from '../../types';
import { 
  Trash2, 
  Copy, 
  Lock, 
  Unlock, 
  ArrowUp, 
  ArrowDown, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Bold, 
  Italic,
  Layers,
  Sliders,
  Type
} from 'lucide-react';

interface LayerPropertiesProps {
  selectedLayer: DesignLayer | null;
  onUpdateLayer: (layer: DesignLayer) => void;
  onDeleteLayer: (layerId: string) => void;
  onDuplicateLayer: (layerId: string) => void;
  onMoveLayerOrder: (layerId: string, direction: 'up' | 'down' | 'top' | 'bottom') => void;
  allLayers: DesignLayer[];
  onSelectLayer: (layerId: string) => void;
}

const FONT_OPTIONS = [
  { label: 'Plus Jakarta Sans (Display)', value: 'Plus Jakarta Sans' },
  { label: 'DM Sans (Clean Body)', value: 'DM Sans' },
  { label: 'Playfair Display (Luxury Serif)', value: 'Playfair Display' },
  { label: 'JetBrains Mono (Technical / Code)', value: 'JetBrains Mono' },
  { label: 'Georgia (Classic Editorial)', value: 'Georgia' },
  { label: 'Arial (Standard Sans)', value: 'Arial' },
  { label: 'Impact (Heavy Poster)', value: 'Impact' },
];

export const LayerProperties: React.FC<LayerPropertiesProps> = ({
  selectedLayer,
  onUpdateLayer,
  onDeleteLayer,
  onDuplicateLayer,
  onMoveLayerOrder,
  allLayers,
  onSelectLayer
}) => {
  if (!selectedLayer) {
    return (
      <div className="w-72 bg-white border-l border-neutral-200 p-4 flex flex-col h-full text-xs overflow-y-auto">
        <div className="font-display font-semibold text-neutral-900 text-sm mb-2 flex items-center gap-2">
          <Layers className="w-4 h-4 text-neutral-500" />
          <span>Canvas Layers ({allLayers.length})</span>
        </div>
        <p className="text-neutral-500 mb-4 leading-relaxed">
          Click an element on the canvas or choose a layer below to adjust its properties.
        </p>

        <div className="space-y-1.5 flex-1 overflow-y-auto">
          {allLayers.length === 0 ? (
            <div className="text-center py-8 text-neutral-400 bg-neutral-50 rounded border border-dashed border-neutral-200">
              Canvas is empty.<br />Use toolbar above to add text, shapes or images.
            </div>
          ) : (
            [...allLayers].reverse().map((layer, idx) => (
              <button
                key={layer.id}
                onClick={() => onSelectLayer(layer.id)}
                className="w-full text-left px-3 py-2 rounded border border-neutral-200 hover:bg-neutral-50 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-[10px] font-mono text-neutral-400">#{allLayers.length - idx}</span>
                  <span className="font-medium text-neutral-700 truncate">{layer.name}</span>
                </div>
                <span className="text-[10px] uppercase text-neutral-400 font-mono">{layer.type}</span>
              </button>
            ))
          )}
        </div>
      </div>
    );
  }

  const isText = selectedLayer.type === 'text';
  const isShape = selectedLayer.type === 'shape';
  const isImage = selectedLayer.type === 'image';

  return (
    <div className="w-80 bg-white border-l border-neutral-200 flex flex-col h-full text-xs overflow-y-auto">
      {/* Header & Quick Actions */}
      <div className="p-3 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
        <div className="flex items-center gap-1.5 truncate">
          <Sliders className="w-3.5 h-3.5 text-neutral-600" />
          <input
            type="text"
            value={selectedLayer.name}
            onChange={(e) => onUpdateLayer({ ...selectedLayer, name: e.target.value })}
            className="font-semibold text-neutral-800 bg-transparent border-b border-dashed border-neutral-300 focus:outline-none focus:border-neutral-900 truncate max-w-[130px]"
          />
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onUpdateLayer({ ...selectedLayer, isLocked: !selectedLayer.isLocked })}
            className={`p-1.5 rounded transition-colors ${selectedLayer.isLocked ? 'bg-amber-100 text-amber-800' : 'text-neutral-500 hover:bg-neutral-200'}`}
            title={selectedLayer.isLocked ? 'Unlock layer' : 'Lock layer'}
          >
            {selectedLayer.isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => onDuplicateLayer(selectedLayer.id)}
            className="p-1.5 text-neutral-500 hover:bg-neutral-200 rounded transition-colors"
            title="Duplicate Layer"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDeleteLayer(selectedLayer.id)}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Delete Layer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {/* TEXT SPECIFIC CONTROLS */}
        {isText && (
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-neutral-700 uppercase mb-1">Text Content</label>
              <textarea
                value={(selectedLayer as TextLayer).text}
                onChange={(e) => onUpdateLayer({ ...selectedLayer, text: e.target.value } as TextLayer)}
                rows={3}
                className="w-full p-2 border border-neutral-300 rounded text-xs focus:ring-1 focus:ring-neutral-900 focus:outline-none font-sans"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-700 uppercase mb-1">Typography</label>
              <select
                value={(selectedLayer as TextLayer).fontFamily}
                onChange={(e) => onUpdateLayer({ ...selectedLayer, fontFamily: e.target.value } as TextLayer)}
                className="w-full p-2 border border-neutral-300 rounded text-xs bg-white focus:outline-none mb-2"
              >
                {FONT_OPTIONS.map(f => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-neutral-500">Size (px)</span>
                  <input
                    type="number"
                    min={8}
                    max={160}
                    value={(selectedLayer as TextLayer).fontSize}
                    onChange={(e) => onUpdateLayer({ ...selectedLayer, fontSize: Math.max(8, Number(e.target.value)) } as TextLayer)}
                    className="w-full p-1.5 border border-neutral-300 rounded text-xs"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-500">Color</span>
                  <div className="flex items-center gap-1.5 border border-neutral-300 rounded p-1">
                    <input
                      type="color"
                      value={(selectedLayer as TextLayer).color}
                      onChange={(e) => onUpdateLayer({ ...selectedLayer, color: e.target.value } as TextLayer)}
                      className="w-6 h-6 rounded cursor-pointer p-0 border-0"
                    />
                    <span className="font-mono text-[11px] uppercase">{(selectedLayer as TextLayer).color}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Weight, Italic, Align */}
            <div className="flex items-center justify-between gap-1 pt-1 border-t border-neutral-100">
              <div className="flex items-center gap-1 border border-neutral-200 rounded p-0.5 bg-neutral-50">
                <button
                  onClick={() => onUpdateLayer({
                    ...selectedLayer,
                    fontWeight: (selectedLayer as TextLayer).fontWeight === 'bold' || (selectedLayer as TextLayer).fontWeight === '700' ? 'normal' : '700'
                  } as TextLayer)}
                  className={`p-1.5 rounded ${(selectedLayer as TextLayer).fontWeight === '700' || (selectedLayer as TextLayer).fontWeight === 'bold' ? 'bg-neutral-900 text-white' : 'text-neutral-600'}`}
                  title="Bold"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onUpdateLayer({
                    ...selectedLayer,
                    fontStyle: (selectedLayer as TextLayer).fontStyle === 'italic' ? 'normal' : 'italic'
                  } as TextLayer)}
                  className={`p-1.5 rounded ${(selectedLayer as TextLayer).fontStyle === 'italic' ? 'bg-neutral-900 text-white' : 'text-neutral-600'}`}
                  title="Italic"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1 border border-neutral-200 rounded p-0.5 bg-neutral-50">
                <button
                  onClick={() => onUpdateLayer({ ...selectedLayer, textAlign: 'left' } as TextLayer)}
                  className={`p-1.5 rounded ${(selectedLayer as TextLayer).textAlign === 'left' ? 'bg-neutral-900 text-white' : 'text-neutral-600'}`}
                  title="Align Left"
                >
                  <AlignLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onUpdateLayer({ ...selectedLayer, textAlign: 'center' } as TextLayer)}
                  className={`p-1.5 rounded ${(selectedLayer as TextLayer).textAlign === 'center' ? 'bg-neutral-900 text-white' : 'text-neutral-600'}`}
                  title="Align Center"
                >
                  <AlignCenter className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onUpdateLayer({ ...selectedLayer, textAlign: 'right' } as TextLayer)}
                  className={`p-1.5 rounded ${(selectedLayer as TextLayer).textAlign === 'right' ? 'bg-neutral-900 text-white' : 'text-neutral-600'}`}
                  title="Align Right"
                >
                  <AlignRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Letter spacing & Line Height */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <span className="text-[10px] text-neutral-500">Spacing (px)</span>
                <input
                  type="number"
                  min={-2}
                  max={20}
                  step={0.5}
                  value={(selectedLayer as TextLayer).letterSpacing}
                  onChange={(e) => onUpdateLayer({ ...selectedLayer, letterSpacing: Number(e.target.value) } as TextLayer)}
                  className="w-full p-1.5 border border-neutral-300 rounded text-xs"
                />
              </div>
              <div>
                <span className="text-[10px] text-neutral-500">Case Transform</span>
                <select
                  value={(selectedLayer as TextLayer).textTransform || 'none'}
                  onChange={(e) => onUpdateLayer({ ...selectedLayer, textTransform: e.target.value as any } as TextLayer)}
                  className="w-full p-1.5 border border-neutral-300 rounded text-xs bg-white"
                >
                  <option value="none">Normal</option>
                  <option value="uppercase">UPPERCASE</option>
                  <option value="lowercase">lowercase</option>
                  <option value="capitalize">Capitalize</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* SHAPE SPECIFIC CONTROLS */}
        {isShape && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-neutral-500">Fill Color</span>
                <div className="flex items-center gap-1.5 border border-neutral-300 rounded p-1">
                  <input
                    type="color"
                    value={(selectedLayer as ShapeLayer).fillColor}
                    onChange={(e) => onUpdateLayer({ ...selectedLayer, fillColor: e.target.value } as ShapeLayer)}
                    className="w-6 h-6 rounded cursor-pointer p-0 border-0"
                  />
                  <span className="font-mono text-[10px]">{(selectedLayer as ShapeLayer).fillColor}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-neutral-500">Stroke Color</span>
                <div className="flex items-center gap-1.5 border border-neutral-300 rounded p-1">
                  <input
                    type="color"
                    value={(selectedLayer as ShapeLayer).strokeColor}
                    onChange={(e) => onUpdateLayer({ ...selectedLayer, strokeColor: e.target.value } as ShapeLayer)}
                    className="w-6 h-6 rounded cursor-pointer p-0 border-0"
                  />
                  <span className="font-mono text-[10px]">{(selectedLayer as ShapeLayer).strokeColor}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-neutral-500">Border Width (px)</span>
                <input
                  type="number"
                  min={0}
                  max={24}
                  value={(selectedLayer as ShapeLayer).strokeWidth}
                  onChange={(e) => onUpdateLayer({ ...selectedLayer, strokeWidth: Number(e.target.value) } as ShapeLayer)}
                  className="w-full p-1.5 border border-neutral-300 rounded text-xs"
                />
              </div>

              {(selectedLayer as ShapeLayer).shapeType === 'rectangle' && (
                <div>
                  <span className="text-[10px] text-neutral-500">Corner Radius</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={(selectedLayer as ShapeLayer).cornerRadius || 0}
                    onChange={(e) => onUpdateLayer({ ...selectedLayer, cornerRadius: Number(e.target.value) } as ShapeLayer)}
                    className="w-full p-1.5 border border-neutral-300 rounded text-xs"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* IMAGE SPECIFIC CONTROLS */}
        {isImage && (
          <div className="space-y-3">
            <div>
              <span className="text-[10px] text-neutral-500">Image Fit</span>
              <select
                value={(selectedLayer as ImageLayer).objectFit || 'cover'}
                onChange={(e) => onUpdateLayer({ ...selectedLayer, objectFit: e.target.value as any } as ImageLayer)}
                className="w-full p-1.5 border border-neutral-300 rounded text-xs bg-white mt-1"
              >
                <option value="cover">Cover (Fill & Crop)</option>
                <option value="contain">Contain (Fit entirely)</option>
                <option value="fill">Fill (Stretch)</option>
              </select>
            </div>
          </div>
        )}

        {/* COMMON PROPERTIES: Geometry, Opacity & Layer Arrange */}
        <div className="pt-3 border-t border-neutral-200 space-y-3">
          <label className="block text-[11px] font-semibold text-neutral-700 uppercase">Dimensions & Position</label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-neutral-500 font-mono">X: {selectedLayer.x}px</span>
              <input
                type="number"
                value={selectedLayer.x}
                onChange={(e) => onUpdateLayer({ ...selectedLayer, x: Number(e.target.value) })}
                className="w-full p-1 border border-neutral-300 rounded text-xs"
              />
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 font-mono">Y: {selectedLayer.y}px</span>
              <input
                type="number"
                value={selectedLayer.y}
                onChange={(e) => onUpdateLayer({ ...selectedLayer, y: Number(e.target.value) })}
                className="w-full p-1 border border-neutral-300 rounded text-xs"
              />
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 font-mono">Width: {selectedLayer.width}px</span>
              <input
                type="number"
                min={10}
                value={selectedLayer.width}
                onChange={(e) => onUpdateLayer({ ...selectedLayer, width: Math.max(10, Number(e.target.value)) })}
                className="w-full p-1 border border-neutral-300 rounded text-xs"
              />
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 font-mono">Height: {selectedLayer.height}px</span>
              <input
                type="number"
                min={10}
                value={selectedLayer.height}
                onChange={(e) => onUpdateLayer({ ...selectedLayer, height: Math.max(10, Number(e.target.value)) })}
                className="w-full p-1 border border-neutral-300 rounded text-xs"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[10px] text-neutral-500 mb-1">
              <span>Opacity</span>
              <span className="tabular-nums font-mono">{Math.round((selectedLayer.opacity ?? 1) * 100)}%</span>
            </div>
            <input
              type="range"
              min={0.05}
              max={1}
              step={0.05}
              value={selectedLayer.opacity ?? 1}
              onChange={(e) => onUpdateLayer({ ...selectedLayer, opacity: Number(e.target.value) })}
              className="w-full accent-neutral-900 cursor-pointer"
            />
          </div>

          {/* Layer Ordering */}
          <div className="pt-2">
            <span className="text-[10px] text-neutral-500 uppercase block mb-1 font-semibold">Layer Arrangement</span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => onMoveLayerOrder(selectedLayer.id, 'up')}
                className="flex items-center justify-center gap-1 p-1.5 border border-neutral-200 rounded hover:bg-neutral-50 text-neutral-700"
              >
                <ArrowUp className="w-3 h-3" />
                <span>Forward</span>
              </button>
              <button
                onClick={() => onMoveLayerOrder(selectedLayer.id, 'down')}
                className="flex items-center justify-center gap-1 p-1.5 border border-neutral-200 rounded hover:bg-neutral-50 text-neutral-700"
              >
                <ArrowDown className="w-3 h-3" />
                <span>Backward</span>
              </button>
              <button
                onClick={() => onMoveLayerOrder(selectedLayer.id, 'top')}
                className="p-1 border border-neutral-200 rounded hover:bg-neutral-50 text-neutral-600 text-[11px]"
              >
                Bring to Front
              </button>
              <button
                onClick={() => onMoveLayerOrder(selectedLayer.id, 'bottom')}
                className="p-1 border border-neutral-200 rounded hover:bg-neutral-50 text-neutral-600 text-[11px]"
              >
                Send to Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
