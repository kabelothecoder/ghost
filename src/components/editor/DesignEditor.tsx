import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DesignLayer, DesignProject } from '../../types';
import { CanvasToolbar } from './CanvasToolbar';
import { CanvasView } from './CanvasView';
import { LayerProperties } from './LayerProperties';
import { ExportModal } from './ExportModal';

export const DesignEditor: React.FC = () => {
  const { activeDesign, setActiveDesign } = useApp();
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(0.85);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const [history, setHistory] = useState<DesignProject[]>([activeDesign]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  const pushHistory = (updated: DesignProject) => {
    const trimmed = history.slice(0, historyIndex + 1);
    setHistory([...trimmed, updated]);
    setHistoryIndex(trimmed.length);
    setActiveDesign(updated);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIdx = historyIndex - 1;
      setHistoryIndex(newIdx);
      setActiveDesign(history[newIdx]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIdx = historyIndex + 1;
      setHistoryIndex(newIdx);
      setActiveDesign(history[newIdx]);
    }
  };

  const handleUpdateLayer = (updatedLayer: DesignLayer) => {
    const nextLayers = activeDesign.layers.map(l => l.id === updatedLayer.id ? updatedLayer : l);
    const updated = {
      ...activeDesign,
      layers: nextLayers,
      updatedAt: new Date().toISOString()
    };
    setActiveDesign(updated);
  };

  const handleDeleteLayer = (layerId: string) => {
    const nextLayers = activeDesign.layers.filter(l => l.id !== layerId);
    const updated = {
      ...activeDesign,
      layers: nextLayers,
      updatedAt: new Date().toISOString()
    };
    pushHistory(updated);
    if (selectedLayerId === layerId) setSelectedLayerId(null);
  };

  const handleDuplicateLayer = (layerId: string) => {
    const target = activeDesign.layers.find(l => l.id === layerId);
    if (!target) return;
    const duplicated: DesignLayer = {
      ...target,
      id: `${target.type}-${Date.now()}`,
      name: `${target.name} (Copy)`,
      x: target.x + 20,
      y: target.y + 20
    };
    const nextLayers = [...activeDesign.layers, duplicated];
    const updated = {
      ...activeDesign,
      layers: nextLayers,
      updatedAt: new Date().toISOString()
    };
    pushHistory(updated);
    setSelectedLayerId(duplicated.id);
  };

  const handleMoveLayerOrder = (layerId: string, direction: 'up' | 'down' | 'top' | 'bottom') => {
    const idx = activeDesign.layers.findIndex(l => l.id === layerId);
    if (idx === -1) return;

    const layers = [...activeDesign.layers];
    const [layer] = layers.splice(idx, 1);

    if (direction === 'up') {
      layers.splice(Math.min(layers.length, idx + 1), 0, layer);
    } else if (direction === 'down') {
      layers.splice(Math.max(0, idx - 1), 0, layer);
    } else if (direction === 'top') {
      layers.push(layer);
    } else if (direction === 'bottom') {
      layers.unshift(layer);
    }

    const updated = {
      ...activeDesign,
      layers,
      updatedAt: new Date().toISOString()
    };
    pushHistory(updated);
  };

  const selectedLayer = activeDesign.layers.find(l => l.id === selectedLayerId) || null;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-neutral-100 overflow-hidden">
      <CanvasToolbar
        zoom={zoom}
        setZoom={setZoom}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onOpenExport={() => setIsExportOpen(true)}
      />

      <div className="flex flex-1 overflow-hidden relative">
        <CanvasView
          width={activeDesign.width}
          height={activeDesign.height}
          backgroundColor={activeDesign.backgroundColor}
          layers={activeDesign.layers}
          selectedLayerId={selectedLayerId}
          onSelectLayer={setSelectedLayerId}
          onUpdateLayer={handleUpdateLayer}
          zoom={zoom}
        />

        <LayerProperties
          selectedLayer={selectedLayer}
          onUpdateLayer={handleUpdateLayer}
          onDeleteLayer={handleDeleteLayer}
          onDuplicateLayer={handleDuplicateLayer}
          onMoveLayerOrder={handleMoveLayerOrder}
          allLayers={activeDesign.layers}
          onSelectLayer={setSelectedLayerId}
        />
      </div>

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        design={activeDesign}
      />
    </div>
  );
};
