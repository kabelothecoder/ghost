import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { TemplateItem, CanvasPresetType } from '../../types';
import { CANVAS_PRESETS } from '../../data/initialTemplates';
import { 
  Search, 
  Sparkles, 
  Plus, 
  ArrowRight, 
  Layers, 
  Star, 
  Check, 
  SlidersHorizontal 
} from 'lucide-react';

export const TemplateLibrary: React.FC = () => {
  const { templates, openTemplateInEditor, createNewDesign, currentUser, openCheckout } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [tierFilter, setTierFilter] = useState<'all' | 'free' | 'pro'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest'>('popular');

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'logo', label: 'Brand Logos' },
    { id: 'flyer', label: 'Flyers' },
    { id: 'poster', label: 'Posters' },
    { id: 'social-square', label: 'Social Media' },
    { id: 'business-card', label: 'Business Cards' },
    { id: 'invitation', label: 'Invitations' },
    { id: 'ad-banner', label: 'Digital Ads' }
  ];

  const filteredTemplates = useMemo(() => {
    return templates.filter(tmpl => {
      const matchesCat = selectedCategory === 'all' || tmpl.category === selectedCategory;
      const matchesTier = tierFilter === 'all' || tmpl.tier === tierFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || tmpl.title.toLowerCase().includes(q) || tmpl.description.toLowerCase().includes(q) || tmpl.categoryLabel.toLowerCase().includes(q);
      return matchesCat && matchesTier && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'popular') return b.downloadsCount - a.downloadsCount;
      return 0;
    });
  }, [templates, selectedCategory, tierFilter, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Welcome & Quick Blank Canvas Strip */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
              South African Graphic Design & Template Platform
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 leading-snug">
              Professional visual designs crafted for local creators, businesses & events.
            </h1>
            <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
              Choose from hundreds of customizable layouts or start from scratch. High-resolution exports in PNG, JPG, and print-ready PDF vector format with South African consumer protections.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => createNewDesign('flyer')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors shadow-sm whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>New Blank Design</span>
            </button>
            {currentUser.tier === 'free' && (
              <button
                onClick={() => openCheckout('template-pack')}
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg border border-neutral-300 transition-colors whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Get 15 Template Pack (R150)</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Format Presets Bar */}
        <div className="mt-6 pt-6 border-t border-neutral-100 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {Object.entries(CANVAS_PRESETS).slice(0, 7).map(([key, val]) => (
            <button
              key={key}
              onClick={() => createNewDesign(key as CanvasPresetType)}
              className="p-2.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-lg text-left transition-colors group"
            >
              <div className="text-xs font-semibold text-neutral-800 group-hover:text-neutral-900 truncate">
                {val.name}
              </div>
              <div className="text-[11px] font-mono text-neutral-500 tabular-nums">
                {val.width}&times;{val.height}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Search, Filter Tabs & Sort Controls */}
      <div className="space-y-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Tier Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates by keyword (e.g. coffee, summit, gala, card)..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 bg-white"
            />
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto text-xs">
            {/* Free vs Pro Segmented Control */}
            <div className="flex items-center p-0.5 bg-neutral-100 rounded-lg border border-neutral-200">
              <button
                onClick={() => setTierFilter('all')}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors ${tierFilter === 'all' ? 'bg-white font-medium text-neutral-900 shadow-sm' : 'text-neutral-600 hover:text-neutral-900'}`}
              >
                All
              </button>
              <button
                onClick={() => setTierFilter('free')}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors ${tierFilter === 'free' ? 'bg-white font-medium text-neutral-900 shadow-sm' : 'text-neutral-600 hover:text-neutral-900'}`}
              >
                Free
              </button>
              <button
                onClick={() => setTierFilter('pro')}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors ${tierFilter === 'pro' ? 'bg-white font-medium text-neutral-900 shadow-sm' : 'text-neutral-600 hover:text-neutral-900'}`}
              >
                Pro
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-neutral-300 text-neutral-700 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Template Grid */}
      {filteredTemplates.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-neutral-200">
          <Layers className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
          <h3 className="font-display font-semibold text-neutral-900 text-sm">No templates found</h3>
          <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or switching categories.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setTierFilter('all');
            }}
            className="mt-4 px-3 py-1.5 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => {
            const isPremium = template.tier === 'premium';
            const userCanAccess = currentUser.tier === 'monthly-premium' || currentUser.tier === 'annual-unlimited' || currentUser.hasTemplatePack || !isPremium;

            return (
              <div
                key={template.id}
                className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                {/* Visual Preview Box */}
                <div
                  style={{ backgroundColor: template.previewColor || '#1E293B' }}
                  className="relative h-64 p-4 flex items-center justify-center overflow-hidden cursor-pointer"
                  onClick={() => openTemplateInEditor(template)}
                >
                  {/* Scaled Mini Canvas Preview */}
                  <div
                    style={{
                      width: `${template.designData.width}px`,
                      height: `${template.designData.height}px`,
                      backgroundColor: template.designData.backgroundColor,
                      transform: `scale(${Math.min(220 / template.designData.height, 220 / template.designData.width)})`,
                      transformOrigin: 'center center',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
                    }}
                    className="relative overflow-hidden pointer-events-none rounded shadow-lg"
                  >
                    {template.designData.layers.map((layer) => {
                      if (layer.type === 'text') {
                        return (
                          <div
                            key={layer.id}
                            style={{
                              position: 'absolute',
                              left: `${layer.x}px`,
                              top: `${layer.y}px`,
                              width: `${layer.width}px`,
                              height: `${layer.height}px`,
                              fontSize: `${(layer as any).fontSize}px`,
                              fontFamily: (layer as any).fontFamily,
                              fontWeight: (layer as any).fontWeight,
                              color: (layer as any).color,
                              textAlign: (layer as any).textAlign,
                              lineHeight: (layer as any).lineHeight,
                              textTransform: (layer as any).textTransform || 'none',
                              whiteSpace: 'pre-wrap'
                            }}
                          >
                            {(layer as any).text}
                          </div>
                        );
                      }
                      if (layer.type === 'shape') {
                        const s = layer as any;
                        if (s.shapeType === 'circle') {
                          return (
                            <div
                              key={layer.id}
                              style={{
                                position: 'absolute',
                                left: `${s.x}px`,
                                top: `${s.y}px`,
                                width: `${s.width}px`,
                                height: `${s.height}px`,
                                backgroundColor: s.fillColor,
                                border: `${s.strokeWidth}px solid ${s.strokeColor}`,
                                borderRadius: '50%'
                              }}
                            />
                          );
                        }
                        return (
                          <div
                            key={layer.id}
                            style={{
                              position: 'absolute',
                              left: `${s.x}px`,
                              top: `${s.y}px`,
                              width: `${s.width}px`,
                              height: `${s.height}px`,
                              backgroundColor: s.fillColor,
                              border: `${s.strokeWidth}px solid ${s.strokeColor}`,
                              borderRadius: `${s.cornerRadius || 0}px`
                            }}
                          />
                        );
                      }
                      if (layer.type === 'image') {
                        return (
                          <img
                            key={layer.id}
                            src={(layer as any).src}
                            alt="preview"
                            style={{
                              position: 'absolute',
                              left: `${layer.x}px`,
                              top: `${layer.y}px`,
                              width: `${layer.width}px`,
                              height: `${layer.height}px`,
                              objectFit: 'cover'
                            }}
                          />
                        );
                      }
                      return null;
                    })}
                  </div>

                  {/* Premium Badge Indicator */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    {isPremium ? (
                      <span className="px-2 py-0.5 text-[11px] font-semibold bg-amber-500 text-neutral-900 rounded font-mono uppercase tracking-wider shadow">
                        PREMIUM
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[11px] font-semibold bg-white/90 text-neutral-800 rounded font-mono uppercase tracking-wider backdrop-blur-sm">
                        FREE
                      </span>
                    )}
                  </div>
                </div>

                {/* Info & Metadata */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata with · separator */}
                    <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
                      <span>{template.categoryLabel}</span>
                      <span aria-hidden="true">&middot;</span>
                      <span className="font-mono tabular-nums">{template.designData.width}&times;{template.designData.height}px</span>
                      <span aria-hidden="true">&middot;</span>
                      <span className="flex items-center gap-0.5 text-neutral-700">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="tabular-nums font-mono">{template.rating}</span>
                      </span>
                    </div>

                    <h3 className="font-display font-semibold text-neutral-900 text-sm leading-snug">
                      {template.title}
                    </h3>
                    <p className="mt-1 text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                      {template.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-neutral-400 font-mono tabular-nums">
                      {template.downloadsCount.toLocaleString()} downloads
                    </span>

                    <button
                      onClick={() => openTemplateInEditor(template)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-900 hover:text-white bg-neutral-100 hover:bg-neutral-900 rounded-lg transition-colors"
                    >
                      <span>Customize</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
