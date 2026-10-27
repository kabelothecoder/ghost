import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DesignProject, TextLayer, ShapeLayer, ImageLayer } from '../../types';
import { jsPDF } from 'jspdf';
import { Download, X, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  design: DesignProject;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, design }) => {
  const { currentUser, openCheckout } = useApp();
  const [format, setFormat] = useState<'png' | 'jpg' | 'pdf' | 'svg'>('png');
  const [resolution, setResolution] = useState<'72' | '150' | '300'>('72');
  const [includeWatermark, setIncludeWatermark] = useState(currentUser.tier === 'free');
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const hasPaidAccess = currentUser.tier === 'monthly-premium' || currentUser.tier === 'annual-unlimited' || currentUser.hasFeatureUnlock;

  const renderDesignToCanvas = async (scaleMultiplier: number): Promise<HTMLCanvasElement> => {
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(design.width * scaleMultiplier);
    canvas.height = Math.round(design.height * scaleMultiplier);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not create canvas context');

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 1. Draw Background
    ctx.fillStyle = design.backgroundColor || '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw each layer
    for (const layer of design.layers) {
      ctx.save();
      ctx.globalAlpha = layer.opacity ?? 1;

      const lx = layer.x * scaleMultiplier;
      const ly = layer.y * scaleMultiplier;
      const lw = layer.width * scaleMultiplier;
      const lh = layer.height * scaleMultiplier;

      if (layer.rotation) {
        ctx.translate(lx + lw / 2, ly + lh / 2);
        ctx.rotate((layer.rotation * Math.PI) / 180);
        ctx.translate(-(lx + lw / 2), -(ly + lh / 2));
      }

      if (layer.type === 'shape') {
        const shape = layer as ShapeLayer;
        ctx.fillStyle = shape.fillColor || 'transparent';
        ctx.strokeStyle = shape.strokeColor || 'transparent';
        ctx.lineWidth = (shape.strokeWidth || 0) * scaleMultiplier;

        if (shape.shapeType === 'circle') {
          ctx.beginPath();
          ctx.ellipse(lx + lw / 2, ly + lh / 2, Math.max(1, lw / 2), Math.max(1, lh / 2), 0, 0, Math.PI * 2);
          if (shape.fillColor) ctx.fill();
          if (shape.strokeWidth > 0) ctx.stroke();
        } else if (shape.shapeType === 'triangle') {
          ctx.beginPath();
          ctx.moveTo(lx + lw / 2, ly);
          ctx.lineTo(lx + lw, ly + lh);
          ctx.lineTo(lx, ly + lh);
          ctx.closePath();
          if (shape.fillColor) ctx.fill();
          if (shape.strokeWidth > 0) ctx.stroke();
        } else if (shape.shapeType === 'line') {
          ctx.beginPath();
          ctx.moveTo(lx, ly + lh / 2);
          ctx.lineTo(lx + lw, ly + lh / 2);
          ctx.lineWidth = Math.max(2, shape.strokeWidth * scaleMultiplier);
          ctx.stroke();
        } else {
          const cr = (shape.cornerRadius || 0) * scaleMultiplier;
          if (cr > 0 && ctx.roundRect) {
            ctx.beginPath();
            ctx.roundRect(lx, ly, lw, lh, cr);
            if (shape.fillColor) ctx.fill();
            if (shape.strokeWidth > 0) ctx.stroke();
          } else {
            if (shape.fillColor) ctx.fillRect(lx, ly, lw, lh);
            if (shape.strokeWidth > 0) ctx.strokeRect(lx, ly, lw, lh);
          }
        }
      } else if (layer.type === 'text') {
        const textLayer = layer as TextLayer;
        const fontSizePx = textLayer.fontSize * scaleMultiplier;
        const fontStyle = textLayer.fontStyle === 'italic' ? 'italic' : 'normal';
        const fontWeight = textLayer.fontWeight || 'normal';
        ctx.font = `${fontStyle} ${fontWeight} ${fontSizePx}px "${textLayer.fontFamily}", sans-serif`;
        ctx.fillStyle = textLayer.color || '#000000';
        ctx.textBaseline = 'top';

        let renderedText = textLayer.text;
        if (textLayer.textTransform === 'uppercase') renderedText = renderedText.toUpperCase();
        if (textLayer.textTransform === 'lowercase') renderedText = renderedText.toLowerCase();

        const lines = renderedText.split('\n');
        const lineHeightPx = fontSizePx * (textLayer.lineHeight || 1.3);

        lines.forEach((line, index) => {
          let textX = lx;
          if (textLayer.textAlign === 'center') {
            textX = lx + lw / 2 - ctx.measureText(line).width / 2;
          } else if (textLayer.textAlign === 'right') {
            textX = lx + lw - ctx.measureText(line).width;
          }
          ctx.fillText(line, textX, ly + index * lineHeightPx);
        });
      } else if (layer.type === 'image') {
        const imgLayer = layer as ImageLayer;
        try {
          const img = await new Promise<HTMLImageElement>((resolve, reject) => {
            const i = new Image();
            i.crossOrigin = 'anonymous';
            i.onload = () => resolve(i);
            i.onerror = () => reject(new Error('Failed to load image for export'));
            i.src = imgLayer.src;
          });
          ctx.drawImage(img, lx, ly, lw, lh);
        } catch (e) {
          console.warn('Image render warning', e);
        }
      }

      ctx.restore();
    }

    if (includeWatermark && !hasPaidAccess) {
      ctx.save();
      ctx.font = `bold ${Math.round(18 * scaleMultiplier)}px "Plus Jakarta Sans", sans-serif`;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.textAlign = 'right';
      ctx.fillText('Made with Automation Solutions · Free Edition', canvas.width - 24 * scaleMultiplier, canvas.height - 24 * scaleMultiplier);
      ctx.restore();
    }

    return canvas;
  };

  const handleExport = async () => {
    if ((format === 'pdf' || format === 'svg' || resolution === '300') && !hasPaidAccess) {
      openCheckout('feature-unlock');
      return;
    }

    setIsExporting(true);
    setDownloadSuccess(false);

    try {
      const scale = resolution === '300' ? 3 : resolution === '150' ? 2 : 1;
      const sanitizedName = design.title.toLowerCase().replace(/[^a-z0-9]/g, '_');

      if (format === 'svg') {
        let svgElements = '';
        design.layers.forEach(l => {
          if (l.type === 'shape') {
            const s = l as ShapeLayer;
            if (s.shapeType === 'circle') {
              svgElements += `<ellipse cx="${s.x + s.width / 2}" cy="${s.y + s.height / 2}" rx="${s.width / 2}" ry="${s.height / 2}" fill="${s.fillColor}" stroke="${s.strokeColor}" stroke-width="${s.strokeWidth}" opacity="${s.opacity ?? 1}" />`;
            } else {
              svgElements += `<rect x="${s.x}" y="${s.y}" width="${s.width}" height="${s.height}" rx="${s.cornerRadius || 0}" fill="${s.fillColor}" stroke="${s.strokeColor}" stroke-width="${s.strokeWidth}" opacity="${s.opacity ?? 1}" />`;
            }
          } else if (l.type === 'text') {
            const t = l as TextLayer;
            svgElements += `<text x="${t.x}" y="${t.y + t.fontSize}" font-family="${t.fontFamily}" font-size="${t.fontSize}" font-weight="${t.fontWeight}" fill="${t.color}" opacity="${t.opacity ?? 1}">${t.text}</text>`;
          }
        });

        const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${design.width}" height="${design.height}" viewBox="0 0 ${design.width} ${design.height}">
  <rect width="100%" height="100%" fill="${design.backgroundColor || '#FFFFFF'}" />
  ${svgElements}
</svg>`;

        const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${sanitizedName}.svg`;
        link.click();
        URL.revokeObjectURL(url);
      } else if (format === 'pdf') {
        const canvas = await renderDesignToCanvas(scale);
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const isLandscape = design.width > design.height;

        const doc = new jsPDF({
          orientation: isLandscape ? 'landscape' : 'portrait',
          unit: 'px',
          format: [design.width, design.height]
        });

        doc.addImage(imgData, 'JPEG', 0, 0, design.width, design.height);
        doc.save(`${sanitizedName}.pdf`);
      } else {
        const canvas = await renderDesignToCanvas(scale);
        const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(mimeType, format === 'jpg' ? 0.92 : undefined);

        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${sanitizedName}.${format}`;
        link.click();
      }

      setDownloadSuccess(true);
      setTimeout(() => {
        setIsExporting(false);
      }, 800);
    } catch (err) {
      console.error(err);
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl max-w-lg w-full overflow-hidden shadow-2xl border border-neutral-200">
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div>
            <h3 className="font-display font-bold text-neutral-900 text-base">Export Design</h3>
            <p className="text-xs text-neutral-500 truncate max-w-xs">{design.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
              Export Format
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['png', 'jpg', 'pdf', 'svg'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setFormat(fmt)}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    format === fmt
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                      : 'border-neutral-200 hover:border-neutral-400 text-neutral-700'
                  }`}
                >
                  <div className="font-display font-bold uppercase text-sm">{fmt}</div>
                  <div className="text-[10px] opacity-80 mt-0.5">
                    {fmt === 'png' ? 'Raster HQ' : fmt === 'jpg' ? 'Compressed' : fmt === 'pdf' ? 'Print Vector' : 'Vector Code'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                Resolution & Print Quality
              </label>
              {!hasPaidAccess && (
                <span className="text-[11px] text-amber-700 font-medium">300 DPI requires Feature Unlock / Premium</span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setResolution('72')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  resolution === '72' ? 'border-neutral-900 bg-neutral-50 text-neutral-900' : 'border-neutral-200 text-neutral-600'
                }`}
              >
                <div className="font-medium text-xs">72 DPI</div>
                <div className="text-[10px] text-neutral-500">Web / Social ({design.width}x{design.height})</div>
              </button>

              <button
                onClick={() => setResolution('150')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  resolution === '150' ? 'border-neutral-900 bg-neutral-50 text-neutral-900' : 'border-neutral-200 text-neutral-600'
                }`}
              >
                <div className="font-medium text-xs">150 DPI</div>
                <div className="text-[10px] text-neutral-500">Medium Digital ({design.width * 2}x{design.height * 2})</div>
              </button>

              <button
                onClick={() => setResolution('300')}
                className={`p-2.5 rounded-lg border text-left transition-all relative ${
                  resolution === '300' ? 'border-neutral-900 bg-neutral-50 text-neutral-900' : 'border-neutral-200 text-neutral-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-xs">300 DPI</span>
                  {!hasPaidAccess && <Sparkles className="w-3 h-3 text-amber-500" />}
                </div>
                <div className="text-[10px] text-neutral-500">Commercial Print ({design.width * 3}x{design.height * 3})</div>
              </button>
            </div>
          </div>

          {!hasPaidAccess && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Free Starter Tier Active</p>
                <p className="mt-0.5 text-amber-800 leading-relaxed">
                  Export includes a discreet &ldquo;Automation Solutions&rdquo; bottom watermark. High-res 300 DPI and print-ready PDF/SVG vector exports require Monthly Premium (R399/mo), Annual Unlimited (R3,799/yr), or permanent Feature Unlock (R100).
                </p>
                <button
                  onClick={() => {
                    onClose();
                    openCheckout('feature-unlock');
                  }}
                  className="mt-2 text-xs font-semibold text-amber-900 underline hover:text-black"
                >
                  Unlock 300 DPI & Vector Export for R100 once-off &rarr;
                </button>
              </div>
            </div>
          )}

          {downloadSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-xs text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Export downloaded successfully to your device!</span>
            </div>
          )}
        </div>

        <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors shadow-sm disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Generating...' : `Download ${format.toUpperCase()}`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
