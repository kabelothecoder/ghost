import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { CanvasPresetType, ShapeType, TextLayer, ShapeLayer, ImageLayer } from '../../types';
import { CANVAS_PRESETS } from '../../data/initialTemplates';
import { 
  Type, 
  Square, 
  Circle, 
  Triangle, 
  Star, 
  Minus, 
  Image as ImageIcon, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Undo, 
  Redo, 
  Save, 
  Download,
  Palette,
  Maximize2,
  Lock
} from 'lucide-react';

interface CanvasToolbarProps {
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onOpenExport: () => void;
}

export const CanvasToolbar: React.FC<CanvasToolbarProps> = ({
  zoom,
  setZoom,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onOpenExport
}) => {
  const { activeDesign, setActiveDesign, saveCurrentDesign, currentUser, openCheckout } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePresetChange = (newCategory: CanvasPresetType) => {
    const preset = CANVAS_PRESETS[newCategory];
    if (!preset) return;
    setActiveDesign(prev => ({
      ...prev,
      category: newCategory,
      width: preset.width,
      height: preset.height
    }));
  };

  const handleAddText = (styleType: 'heading' | 'subheading' | 'body') => {
    const id = 'txt-' + Date.now();
    let text = 'Heading Text';
    let fontSize = 36;
    let fontWeight: TextLayer['fontWeight'] = '700';

    if (styleType === 'subheading') {
      text = 'Subheading Text';
      fontSize = 22;
      fontWeight = '600';
    } else if (styleType === 'body') {
      text = 'Add descriptive body paragraph text here.';
      fontSize = 15;
      fontWeight = 'normal';
    }

    const newLayer: TextLayer = {
      id,
      type: 'text',
      name: styleType === 'heading' ? 'Heading' : styleType === 'subheading' ? 'Subheading' : 'Body Text',
      text,
      fontFamily: styleType === 'heading' ? 'Plus Jakarta Sans' : 'DM Sans',
      fontSize,
      fontWeight,
      fontStyle: 'normal',
      textAlign: 'center',
      color: '#0F172A',
      letterSpacing: 0,
      lineHeight: 1.3,
      x: Math.max(20, Math.floor((activeDesign.width - 400) / 2)),
      y: Math.max(20, Math.floor((activeDesign.height - 60) / 2)),
      width: 400,
      height: 60,
      rotation: 0,
      opacity: 1
    };

    setActiveDesign(prev => ({
      ...prev,
      layers: [...prev.layers, newLayer]
    }));
  };

  const handleAddShape = (shapeType: ShapeType) => {
    const id = 'shp-' + Date.now();
    const size = shapeType === 'line' ? 200 : 160;
    const height = shapeType === 'line' ? 4 : 160;

    const newLayer: ShapeLayer = {
      id,
      type: 'shape',
      name: shapeType.charAt(0).toUpperCase() + shapeType.slice(1),
      shapeType,
      fillColor: shapeType === 'line' ? '#0F766E' : '#E2E8F0',
      strokeColor: '#0F766E',
      strokeWidth: shapeType === 'line' ? 2 : 0,
      cornerRadius: shapeType === 'rectangle' ? 8 : 0,
      x: Math.max(20, Math.floor((activeDesign.width - size) / 2)),
      y: Math.max(20, Math.floor((activeDesign.height - height) / 2)),
      width: size,
      height: height,
      rotation: 0,
      opacity: 1
    };

    setActiveDesign(prev => ({
      ...prev,
      layers: [...prev.layers, newLayer]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        // Calculate fitting dimensions within canvas
        let w = img.width;
        let h = img.height;
        const maxDim = Math.min(activeDesign.width * 0.7, 400);

        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }

        const newLayer: ImageLayer = {
          id: 'img-' + Date.now(),
          type: 'image',
          name: file.name.substring(0, 18),
          src,
          alt: file.name,
          objectFit: 'cover',
          x: Math.max(10, Math.floor((activeDesign.width - w) / 2)),
          y: Math.max(10, Math.floor((activeDesign.height - h) / 2)),
          width: w,
          height: h,
          rotation: 0,
          opacity: 1
        };

        setActiveDesign(prev => ({
          ...prev,
          layers: [...prev.layers, newLayer]
        }));
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
    // Reset file input
    e.target.value = '';
  };

  return (
    <div className="bg-white border-b border-neutral-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-sm">
      {/* Group 1: Canvas Preset & Name */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={activeDesign.title}
          onChange={(e) => setActiveDesign(prev => ({ ...prev, title: e.target.value }))}
          className="font-medium text-neutral-900 px-2 py-1 border border-neutral-300 rounded hover:border-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 w-52 text-xs sm:text-sm truncate"
          title="Rename design"
        />

        <select
          value={activeDesign.category}
          onChange={(e) => handlePresetChange(e.target.value as CanvasPresetType)}
          className="bg-neutral-50 border border-neutral-300 text-neutral-700 text-xs rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-neutral-900"
        >
          {Object.entries(CANVAS_PRESETS).map(([key, val]) => (
            <option key={key} value={key}>
              {val.name} ({val.width}x{val.height})
            </option>
          ))}
        </select>

        <span className="text-xs font-mono text-neutral-400 tabular-nums hidden sm:inline">
          {activeDesign.width} &times; {activeDesign.height}px
        </span>
      </div>

      {/* Group 2: Insert Tools */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {/* Text dropdown / buttons */}
        <div className="flex items-center rounded-md border border-neutral-200 p-0.5 bg-neutral-50">
          <button
            onClick={() => handleAddText('heading')}
            title="Add Heading"
            className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-neutral-700 hover:bg-white hover:text-neutral-900 rounded transition-colors"
          >
            <Type className="w-3.5 h-3.5" />
            <span>Heading</span>
          </button>
          <button
            onClick={() => handleAddText('body')}
            title="Add Paragraph text"
            className="px-2 py-1 text-xs text-neutral-600 hover:bg-white hover:text-neutral-900 rounded transition-colors"
          >
            Body
          </button>
        </div>

        {/* Shape inserters */}
        <div className="flex items-center rounded-md border border-neutral-200 p-0.5 bg-neutral-50">
          <button
            onClick={() => handleAddShape('rectangle')}
            title="Add Rectangle"
            className="p-1.5 text-neutral-600 hover:bg-white hover:text-neutral-900 rounded transition-colors"
          >
            <Square className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleAddShape('circle')}
            title="Add Circle"
            className="p-1.5 text-neutral-600 hover:bg-white hover:text-neutral-900 rounded transition-colors"
          >
            <Circle className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleAddShape('triangle')}
            title="Add Triangle"
            className="p-1.5 text-neutral-600 hover:bg-white hover:text-neutral-900 rounded transition-colors"
          >
            <Triangle className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleAddShape('star')}
            title="Add Star Badge"
            className="p-1.5 text-neutral-600 hover:bg-white hover:text-neutral-900 rounded transition-colors"
          >
            <Star className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleAddShape('line')}
            title="Add Divider Line"
            className="p-1.5 text-neutral-600 hover:bg-white hover:text-neutral-900 rounded transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Upload Customer Image / Logo */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          accept="image/*" 
          className="hidden" 
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          title="Upload logo or photo"
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded border border-neutral-200 transition-colors"
        >
          <ImageIcon className="w-3.5 h-3.5 text-neutral-600" />
          <span>Upload Image</span>
        </button>

        {/* Background Color Picker */}
        <div className="flex items-center gap-1.5 pl-1">
          <Palette className="w-3.5 h-3.5 text-neutral-400" />
          <input
            type="color"
            value={activeDesign.backgroundColor}
            onChange={(e) => setActiveDesign(prev => ({ ...prev, backgroundColor: e.target.value }))}
            title="Canvas Background Color"
            className="w-6 h-6 rounded border border-neutral-300 cursor-pointer p-0"
          />
        </div>
      </div>

      {/* Group 3: Zoom, History, Save & Export */}
      <div className="flex items-center gap-2">
        <div className="flex items-center rounded-md border border-neutral-200 p-0.5 bg-neutral-50 text-xs">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
            className="p-1.5 text-neutral-600 hover:bg-white disabled:opacity-30 rounded transition-colors"
          >
            <Undo className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
            className="p-1.5 text-neutral-600 hover:bg-white disabled:opacity-30 rounded transition-colors"
          >
            <Redo className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Zoom */}
        <div className="flex items-center rounded-md border border-neutral-200 p-0.5 bg-neutral-50 text-xs">
          <button
            onClick={() => setZoom(z => Math.max(0.3, Number((z - 0.1).toFixed(1))))}
            className="p-1 text-neutral-600 hover:bg-white rounded"
            title="Zoom Out"
          >
            <ZoomOut className="w-3 h-3" />
          </button>
          <span className="px-1.5 font-mono text-[11px] text-neutral-600 min-w-9 text-center tabular-nums">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom(z => Math.min(2.5, Number((z + 0.1).toFixed(1))))}
            className="p-1 text-neutral-600 hover:bg-white rounded"
            title="Zoom In"
          >
            <ZoomIn className="w-3 h-3" />
          </button>
        </div>

        {/* Save */}
        <button
          onClick={saveCurrentDesign}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded border border-neutral-300 transition-colors"
          title="Save to My Designs"
        >
          <Save className="w-3.5 h-3.5 text-neutral-600" />
          <span>Save</span>
        </button>

        {/* Export Button */}
        <button
          onClick={onOpenExport}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded transition-colors shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
};
