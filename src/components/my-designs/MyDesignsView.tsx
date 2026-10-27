import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DesignProject } from '../../types';
import { 
  Plus, 
  FolderOpen, 
  Copy, 
  Trash2, 
  Edit3, 
  Download, 
  Sparkles, 
  AlertCircle,
  Clock,
  Layers
} from 'lucide-react';

export const MyDesignsView: React.FC = () => {
  const { 
    userDesigns, 
    loadDesign, 
    duplicateDesign, 
    renameDesign, 
    deleteDesign, 
    createNewDesign,
    currentUser,
    openCheckout
  } = useApp();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');

  const isFreeTier = currentUser.tier === 'free';
  const hasReachedLimit = isFreeTier && userDesigns.length >= 3;

  const handleStartRename = (design: DesignProject) => {
    setEditingId(design.id);
    setEditTitle(design.title);
  };

  const handleSaveRename = (designId: string) => {
    if (editTitle.trim()) {
      renameDesign(designId, editTitle.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
            Customer Design Workspace
          </div>
          <h1 className="font-display text-2xl font-bold text-neutral-900 tracking-tight">
            My Saved Creative Projects
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Manage, duplicate, rename, and export your stored designs securely.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (hasReachedLimit) {
                openCheckout('monthly-premium', 'monthly');
              } else {
                createNewDesign('social-square');
              }
            }}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Project</span>
          </button>
        </div>
      </div>

      {/* Storage & Limit Banner */}
      {isFreeTier && (
        <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-neutral-600 shrink-0" />
            <div>
              <span className="font-semibold text-neutral-900">
                Storage: {userDesigns.length} of 3 Free Projects Used
              </span>
              <p className="text-neutral-500 mt-0.5">
                Free starters can save up to 3 projects. Upgrade to Monthly Premium (R399/mo) or Annual Unlimited (R3,799/yr) for unlimited design storage and full template access.
              </p>
            </div>
          </div>

          <button
            onClick={() => openCheckout('monthly-premium', 'monthly')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Get Unlimited Access (R399/mo)</span>
          </button>
        </div>
      )}

      {/* Designs Grid */}
      {userDesigns.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-neutral-200">
          <FolderOpen className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
          <h3 className="font-display font-semibold text-neutral-900 text-sm">No saved projects yet</h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
            Pick a template from our library or start a fresh design to save your first project.
          </p>
          <button
            onClick={() => createNewDesign('flyer')}
            className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Start First Design
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userDesigns.map((design) => (
            <div
              key={design.id}
              className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
            >
              {/* Preview Container */}
              <div
                style={{ backgroundColor: design.backgroundColor || '#F8FAFC' }}
                onClick={() => loadDesign(design.id)}
                className="h-56 p-4 flex items-center justify-center relative cursor-pointer overflow-hidden border-b border-neutral-100"
              >
                <div
                  style={{
                    width: `${design.width}px`,
                    height: `${design.height}px`,
                    backgroundColor: design.backgroundColor,
                    transform: `scale(${Math.min(180 / design.height, 220 / design.width)})`,
                    transformOrigin: 'center center'
                  }}
                  className="relative overflow-hidden pointer-events-none rounded shadow"
                >
                  {design.layers.map((l) => {
                    if (l.type === 'text') {
                      return (
                        <div
                          key={l.id}
                          style={{
                            position: 'absolute',
                            left: `${l.x}px`,
                            top: `${l.y}px`,
                            width: `${l.width}px`,
                            height: `${l.height}px`,
                            fontSize: `${(l as any).fontSize}px`,
                            fontFamily: (l as any).fontFamily,
                            fontWeight: (l as any).fontWeight,
                            color: (l as any).color,
                            textAlign: (l as any).textAlign
                          }}
                        >
                          {(l as any).text}
                        </div>
                      );
                    }
                    if (l.type === 'shape') {
                      const s = l as any;
                      return (
                        <div
                          key={l.id}
                          style={{
                            position: 'absolute',
                            left: `${s.x}px`,
                            top: `${s.y}px`,
                            width: `${s.width}px`,
                            height: `${s.height}px`,
                            backgroundColor: s.fillColor,
                            borderRadius: s.shapeType === 'circle' ? '50%' : `${s.cornerRadius || 0}px`
                          }}
                        />
                      );
                    }
                    if (l.type === 'image') {
                      return (
                        <img
                          key={l.id}
                          src={(l as any).src}
                          alt="preview"
                          style={{
                            position: 'absolute',
                            left: `${l.x}px`,
                            top: `${l.y}px`,
                            width: `${l.width}px`,
                            height: `${l.height}px`,
                            objectFit: 'cover'
                          }}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              </div>

              {/* Card Meta & Actions */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono mb-1">
                    <span className="uppercase">{design.category}</span>
                    <span className="tabular-nums">{design.width}&times;{design.height}px</span>
                  </div>

                  {editingId === design.id ? (
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSaveRename(design.id)}
                        className="text-xs font-semibold p-1 border border-neutral-300 rounded flex-1 focus:outline-none focus:ring-1 focus:ring-neutral-900"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSaveRename(design.id)}
                        className="px-2 py-1 bg-neutral-900 text-white rounded text-xs font-medium"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between group/title">
                      <h3
                        onClick={() => loadDesign(design.id)}
                        className="font-display font-semibold text-neutral-900 text-sm hover:text-neutral-600 cursor-pointer truncate"
                      >
                        {design.title}
                      </h3>
                      <button
                        onClick={() => handleStartRename(design)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-neutral-400 hover:text-neutral-700 transition-opacity"
                        title="Rename"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 mt-2">
                    <Clock className="w-3 h-3" />
                    <span>Updated {new Date(design.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between gap-1">
                  <button
                    onClick={() => loadDesign(design.id)}
                    className="px-3 py-1.5 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                  >
                    Open in Editor
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => duplicateDesign(design.id)}
                      className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteDesign(design.id)}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
