import React from 'react';
import { useApp } from '../../context/AppContext';
import { PRICING_PLANS } from '../../data/initialData';
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Palette, 
  ShieldCheck, 
  Check, 
  Download, 
  Smartphone,
  CheckCircle2,
  Lock,
  Star
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setActiveView, createNewDesign, openCheckout, currentUser } = useApp();

  return (
    <div className="space-y-20 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 bg-gradient-to-b from-white via-neutral-50/50 to-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Editorial Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-full text-xs font-semibold text-neutral-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Automation Solutions &middot; Digital Creative Platform</span>
            </div>

            {/* Prompt Required Headline */}
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.1] text-balance">
              Your Ideas. Your Designs. One Platform.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Create striking graphic designs, customize professional templates, and produce high-resolution marketing assets for businesses, social media, branding, events, and personal projects.
            </p>

            {/* Prominent CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  createNewDesign('flyer');
                  setActiveView('editor');
                }}
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>Start Designing</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setActiveView('templates')}
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-neutral-800 bg-white hover:bg-neutral-50 rounded-xl border border-neutral-300 transition-colors shadow-sm"
              >
                Browse 15+ Templates
              </button>
            </div>

            {/* Quick Trust Markers */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-500 font-medium">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" /> No software download required
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" /> Print-ready 300 DPI vector PDF
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" /> PayFast & Ozow Instant EFT in ZAR
              </span>
            </div>
          </div>

          {/* Interactive Feature Showcase Teaser */}
          <div className="mt-14 max-w-5xl mx-auto bg-neutral-900 rounded-2xl p-4 sm:p-6 shadow-2xl border border-neutral-800 text-white">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                <span className="ml-2 text-xs font-mono text-neutral-400">Automation Solutions &mdash; Creative Studio Viewport</span>
              </div>
              <button
                onClick={() => setActiveView('editor')}
                className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>Open Fullscreen Editor</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Interactive Canvas Studio */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="space-y-4 md:col-span-1 text-xs text-neutral-300">
                <h3 className="font-display text-lg font-bold text-white">
                  Intuitive Browser Workspace
                </h3>
                <p className="leading-relaxed">
                  Tailor fonts, shapes, brand colors, and customer logo uploads with zero latency. Seamlessly toggle between print formats and social dimensions.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Logo & Brand Kit Creation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Flyers, Posters & A4 Menus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Instagram & LinkedIn Feed Graphics</span>
                  </div>
                </div>
              </div>

              {/* Graphic Artboard Showcase */}
              <div className="md:col-span-2 bg-neutral-800/80 rounded-xl p-6 border border-neutral-700/60 flex items-center justify-center">
                <div className="w-full max-w-md bg-neutral-950 p-6 rounded-lg border border-neutral-800 shadow-xl space-y-4 text-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                    Automation Solutions &middot; Interactive Canvas Studio
                  </span>
                  <h4 className="font-display text-2xl font-bold text-white">
                    MZANSI CREATIVE SUMMIT 2026
                  </h4>
                  <p className="text-xs text-neutral-400">
                    Saturday 14 November &middot; Johannesburg Convention Centre
                  </p>
                  <div className="pt-2 flex justify-center gap-2">
                    <span className="px-3 py-1 bg-cyan-950 text-cyan-400 border border-cyan-800 text-[11px] rounded font-medium">
                      Vector Shapes
                    </span>
                    <span className="px-3 py-1 bg-purple-950 text-purple-400 border border-purple-800 text-[11px] rounded font-medium">
                      Custom Typography
                    </span>
                    <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 text-[11px] rounded font-medium">
                      Instant Download
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES (3 PILLARS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            All-In-One Graphic Studio
          </div>
          <h2 className="font-display text-3xl font-bold text-neutral-900">
            Engineered for African Innovators & Businesses
          </h2>
          <p className="text-sm text-neutral-600">
            From quick promotional flyers to full corporate identity kits, Automation Solutions delivers the tools you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-neutral-900 text-lg">
              15+ Rich Curated Templates
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Logos, flyers, posters, invitations, social posts, business cards, and digital ad banners tailored for local commerce, restaurants, markets, and conferences.
            </p>
            <button
              onClick={() => setActiveView('templates')}
              className="text-xs font-semibold text-neutral-900 underline pt-2 block"
            >
              Browse Template Catalog &rarr;
            </button>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 mb-4">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-neutral-900 text-lg">
              Full Browser Design Freedom
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Upload customer logos and photos, customize typography, apply shapes and badges, fine-tune spacing and opacities, and maintain multiple saved projects.
            </p>
            <button
              onClick={() => setActiveView('editor')}
              className="text-xs font-semibold text-neutral-900 underline pt-2 block"
            >
              Launch Design Studio &rarr;
            </button>
          </div>

          <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 mb-4">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-neutral-900 text-lg">
              Multi-Format Digital Downloads
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Export designs in standard PNG, compressed JPG, or 300 DPI vector PDF format. Commercial license included with paid plans.
            </p>
            <button
              onClick={() => setActiveView('pricing')}
              className="text-xs font-semibold text-neutral-900 underline pt-2 block"
            >
              Compare Plans & Pricing &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* CLEAR PRICING SECTION (All 4 Plans) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            South African Rand (ZAR) Pricing & Plans
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900">
            Straightforward, Transparent Access Plans
          </h2>
          <p className="text-sm text-neutral-600">
            All prices include 15% South African VAT. Billed securely via certified payment providers.
          </p>
        </div>

        {/* 4 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl p-6 border flex flex-col justify-between transition-all relative ${
                plan.id === 'annual-unlimited'
                  ? 'border-neutral-900 shadow-lg ring-1 ring-neutral-900'
                  : 'border-neutral-200 shadow-sm hover:shadow-md'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-neutral-900 text-white text-[10px] font-semibold uppercase tracking-wider rounded-full shadow whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  {plan.name}
                </div>
                <div className="mt-3">
                  {plan.originalPriceZAR && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold line-through text-neutral-400 font-mono">
                        R {plan.originalPriceZAR.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Save R {(plan.originalPriceZAR - plan.priceZAR).toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-display font-bold text-neutral-900 font-mono tabular-nums">
                      R {plan.priceZAR.toLocaleString()}
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">{plan.cadenceLabel}</span>
                  </div>
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">
                  Includes 15% RSA VAT
                </div>

                <p className="mt-4 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                  {plan.tagline}
                </p>

                <div className="mt-5 space-y-2">
                  <div className="text-[11px] font-semibold text-neutral-900 uppercase tracking-wider">
                    Included:
                  </div>
                  {plan.features.slice(0, 5).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                  {plan.features.length > 5 && (
                    <div className="text-[11px] text-neutral-500 font-medium pl-5">
                      + {plan.features.length - 5} more benefits
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100">
                <button
                  onClick={() => openCheckout(plan.id, plan.billingType === 'annual' ? 'annual' : 'monthly')}
                  className={`w-full py-2.5 text-center text-xs font-semibold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5 ${
                    plan.id === 'annual-unlimited'
                      ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                      : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border border-neutral-300'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Choose {plan.name}</span>
                </button>
                <div className="text-[10px] text-neutral-400 text-center mt-2 leading-tight">
                  {plan.termsSummary}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPLIANCE & SECURITY FOOTER CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-900 text-neutral-300 rounded-2xl p-8 sm:p-10 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-neutral-800 pb-6">
            <div>
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                South African Regulatory Governance
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                Protection of Personal Information Act (POPIA) & CPA Compliant
              </h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-2xl leading-relaxed">
                Automation Solutions complies fully with South African law. We never store raw bank card numbers or card security codes (CVVs). All payments are verified securely via PayFast, Ozow Instant EFT, SnapScan, and Capitec Pay.
              </p>
            </div>

            <button
              onClick={() => setActiveView('support')}
              className="px-5 py-2.5 bg-white text-neutral-900 text-xs font-semibold rounded-xl hover:bg-neutral-100 transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              Contact Support Desk &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-neutral-400">
            <div>
              <strong className="text-white block mb-1">Information Officer Contact:</strong>
              Mr. Sipho Ndlovu &middot; privacy@automationsolutions.co.za
            </div>
            <div>
              <strong className="text-white block mb-1">Company Registration & VAT:</strong>
              Reg: 2024/182901/07 &middot; SARS VAT: 4980293841
            </div>
            <div>
              <strong className="text-white block mb-1">Johannesburg Studio:</strong>
              142 Jan Smuts Avenue, Rosebank, 2196
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
