import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRICING_PLANS, TEMPLATE_PACK_ITEMS } from '../../data/initialData';
import { 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  Check, 
  HelpCircle,
  CreditCard,
  Building2,
  FileCheck2,
  Package,
  Key
} from 'lucide-react';

export const PricingView: React.FC = () => {
  const { openCheckout, currentUser, setActiveView } = useApp();
  const [showPackDetails, setShowPackDetails] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title & Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Automation Solutions &middot; South African Rand (ZAR) Pricing
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
          Transparent, Local Access Plans
        </h1>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Choose between annual unlimited access, flexible monthly subscriptions, or once-off packs and feature unlocks. All plans include 15% South African VAT and secure payment processing.
        </p>
      </div>

      {/* 4 Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRICING_PLANS.map((plan) => {
          const isCurrentPlan = currentUser.tier === plan.id;

          return (
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
                <div className="text-[11px] text-neutral-400 mt-1">
                  Includes 15% RSA VAT
                </div>

                <p className="mt-4 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                  {plan.tagline}
                </p>

                {/* Features list */}
                <div className="mt-5 space-y-2">
                  <div className="text-[11px] font-semibold text-neutral-900 uppercase tracking-wider">
                    Included Benefits:
                  </div>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Extra info for Template Pack */}
                {plan.id === 'template-pack' && (
                  <div className="mt-3 pt-2">
                    <button
                      onClick={() => setShowPackDetails(!showPackDetails)}
                      className="text-xs font-semibold text-cyan-700 hover:text-cyan-900 underline flex items-center gap-1"
                    >
                      <Package className="w-3.5 h-3.5" />
                      <span>{showPackDetails ? 'Hide' : 'View'} 15 Included Templates &rarr;</span>
                    </button>
                    {showPackDetails && (
                      <div className="mt-2 p-3 bg-neutral-50 rounded-lg border border-neutral-200 text-[11px] space-y-1 max-h-48 overflow-y-auto">
                        <div className="font-semibold text-neutral-800 mb-1">15 Included Templates (Both Editable & Downloadable):</div>
                        {TEMPLATE_PACK_ITEMS.map((item, idx) => (
                          <div key={idx} className="text-neutral-600 truncate flex items-center gap-1.5">
                            <span className="font-mono text-neutral-400">{idx + 1}.</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-neutral-100">
                {isCurrentPlan ? (
                  <div className="w-full py-2.5 text-center text-xs font-semibold text-neutral-700 bg-neutral-100 rounded-xl">
                    Your Active Plan
                  </div>
                ) : (
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
                )}
                <div className="text-[10px] text-neutral-400 text-center mt-2 leading-tight">
                  {plan.termsSummary}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Unlock & Template Pack Spotlight Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-4">
          <div>
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              One-Off Permanent Account Upgrade
            </div>
            <h3 className="font-display text-xl font-bold">
              Feature Unlock &mdash; R100 once-off
            </h3>
            <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
              Permanently unlock high-resolution 300 DPI vector PDF exports, SVG code downloads, custom font uploads, and complete watermark removal. Linked permanently to your customer profile with zero recurring fees.
            </p>
          </div>
          <button
            onClick={() => openCheckout('feature-unlock', 'once-off')}
            className="self-start px-5 py-2.5 text-xs font-semibold text-neutral-900 bg-white hover:bg-neutral-100 rounded-xl transition-colors shadow-sm"
          >
            Unlock Features (R100) &rarr;
          </button>
        </div>

        <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-4">
          <div>
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
              Complete Digital Design Pack
            </div>
            <h3 className="font-display text-xl font-bold">
              15 Templates Pack &mdash; R150 once-off
            </h3>
            <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
              Immediate digital access to 15 versatile design templates covering logos, flyers, posters, invitations, social posts, and banners. All 15 templates are both fully customizable in our browser editor and downloadable immediately.
            </p>
          </div>
          <button
            onClick={() => openCheckout('template-pack', 'once-off')}
            className="self-start px-5 py-2.5 text-xs font-semibold text-neutral-900 bg-white hover:bg-neutral-100 rounded-xl transition-colors shadow-sm"
          >
            Get 15 Templates (R150) &rarr;
          </button>
        </div>
      </div>

      {/* Security & Payment Disclosures Strip */}
      <div className="border border-neutral-200 rounded-2xl p-6 bg-white space-y-6">
        <h4 className="font-display font-bold text-neutral-900 text-base">
          Payment Security, Consumer Rights & POPIA Compliance
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-600 leading-relaxed">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-neutral-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Certified Payment Gateways</span>
            </div>
            <p>
              Automation Solutions processes payments via accredited South African providers (PayFast, Ozow, SnapScan, Capitec Pay). Payment providers process transaction information under their own privacy policies. We never store full card numbers or security CVVs.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-neutral-900">
              <FileCheck2 className="w-4 h-4 text-blue-600" />
              <span>CPA Aligned Refund Policy</span>
            </div>
            <p>
              In accordance with the South African Consumer Protection Act (CPA) and ECTA, we investigate any technical access defects promptly and offer fair remedies, corrections, or approved refunds.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-neutral-900">
              <Building2 className="w-4 h-4 text-purple-600" />
              <span>SARS Tax Invoices</span>
            </div>
            <p>
              Every transaction immediately generates a SARS-compliant electronic Tax Invoice showing net amounts, 15% VAT, and business registration numbers (Reg: 2024/182901/07).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
