import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRICING_PLANS } from '../../data/initialData';
import { TaxInvoiceModal } from './TaxInvoiceModal';
import { 
  User, 
  CreditCard, 
  Receipt, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  Package,
  Key,
  Shield
} from 'lucide-react';

export const AccountPortal: React.FC = () => {
  const { 
    currentUser, 
    setCurrentUser, 
    transactions, 
    invoices, 
    selectedInvoice, 
    setSelectedInvoice, 
    cancelSubscription,
    openCheckout,
    setActiveView,
    updateMarketingConsent
  } = useApp();

  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);

  const plan = PRICING_PLANS.find(p => p.id === currentUser.tier) || PRICING_PLANS[0];
  const userTransactions = transactions.filter(t => t.userId === currentUser.id || t.userEmail === currentUser.email);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="pb-6 border-b border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
            Automation Solutions &middot; Customer Dashboard
          </div>
          <h1 className="font-display text-2xl font-bold text-neutral-900 tracking-tight">
            Purchased Plans, Access Status & Invoices
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Monitor active design privileges, download official SARS Tax Invoices, and manage subscription settings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView('support')}
            className="px-3 py-1.5 text-xs font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            Customer Support
          </button>
        </div>
      </div>

      {/* Access Status & Purchased Plans Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Subscription Tier */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Plan Membership</span>
              {currentUser.subscriptionActive ? (
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold font-mono">
                  ACTIVE
                </span>
              ) : (
                <span className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded text-[10px] font-bold font-mono">
                  EXPIRED
                </span>
              )}
            </div>
            <h3 className="font-display text-xl font-bold text-neutral-900">
              {plan.name}
            </h3>
            <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
              {plan.tagline}
            </p>
            <div className="mt-4 pt-3 border-t border-neutral-100 text-xs space-y-1">
              <div className="flex justify-between text-neutral-600">
                <span>Renewal / Expiry:</span>
                <span className="font-mono font-medium text-neutral-900">{currentUser.subscriptionRenewalDate || 'No renewal date'}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Cadence:</span>
                <span className="capitalize font-medium text-neutral-900">{currentUser.billingCadence}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-neutral-100 flex items-center justify-between">
            <button
              onClick={() => openCheckout('annual-unlimited', 'annual')}
              className="text-xs font-semibold text-neutral-900 underline"
            >
              Switch Plan &rarr;
            </button>
            {currentUser.subscriptionActive && currentUser.tier !== 'free' && (
              <button
                onClick={() => setConfirmCancelOpen(true)}
                className="text-xs text-red-600 hover:text-red-700 font-medium"
              >
                Cancel Subscription
              </button>
            )}
          </div>
        </div>

        {/* Card 2: Feature Unlock Status */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Feature Unlock</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                currentUser.hasFeatureUnlock ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-neutral-100 text-neutral-600'
              }`}>
                {currentUser.hasFeatureUnlock ? 'PERMANENT UNLOCKED' : 'LOCKED'}
              </span>
            </div>
            <h3 className="font-display text-xl font-bold text-neutral-900 flex items-center gap-2">
              <Key className="w-5 h-5 text-amber-500" />
              <span>300 DPI & Vector Export</span>
            </h3>
            <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
              {currentUser.hasFeatureUnlock
                ? 'High-res 300 DPI vector PDF, SVG download, and watermark removal are permanently unlocked on your account.'
                : 'Unlock commercial print-ready 300 DPI vector PDF and SVG exports for a once-off R100.'}
            </p>
          </div>

          <div className="mt-6 pt-3 border-t border-neutral-100">
            {!currentUser.hasFeatureUnlock ? (
              <button
                onClick={() => openCheckout('feature-unlock', 'once-off')}
                className="w-full py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition-colors"
              >
                Unlock Features (R100 once-off)
              </button>
            ) : (
              <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Lifetime Status Active</span>
              </div>
            )}
          </div>
        </div>

        {/* Card 3: 15 Templates Pack Status */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Template Library</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                currentUser.hasTemplatePack ? 'bg-cyan-50 text-cyan-800 border border-cyan-200' : 'bg-neutral-100 text-neutral-600'
              }`}>
                {currentUser.hasTemplatePack ? 'PACK UNLOCKED' : 'STANDARD'}
              </span>
            </div>
            <h3 className="font-display text-xl font-bold text-neutral-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-cyan-600" />
              <span>15 Templates Pack</span>
            </h3>
            <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
              {currentUser.hasTemplatePack
                ? 'Full access to customize and download all 15 curated design templates in our collection.'
                : 'Purchase all 15 curated templates for a once-off fee of R150 with immediate digital access.'}
            </p>
          </div>

          <div className="mt-6 pt-3 border-t border-neutral-100">
            {!currentUser.hasTemplatePack ? (
              <button
                onClick={() => openCheckout('template-pack', 'once-off')}
                className="w-full py-2 bg-neutral-900 text-white rounded-lg text-xs font-semibold hover:bg-neutral-800 transition-colors"
              >
                Buy 15 Templates Pack (R150)
              </button>
            ) : (
              <button
                onClick={() => setActiveView('templates')}
                className="w-full py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-lg text-xs font-semibold transition-colors"
              >
                Explore Your 15 Templates &rarr;
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Subscription Cancellation */}
      {confirmCancelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl border border-neutral-200">
            <div className="flex items-center gap-3 text-amber-600">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-display font-bold text-neutral-900 text-base">
                Cancel Recurring Subscription?
              </h3>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              As disclosed under our <strong>Refund and Cancellation Policy</strong>, cancelling prevents future automatic renewals. Your access privileges will remain active until the end of your currently paid billing period ({currentUser.subscriptionRenewalDate || 'end of period'}).
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setConfirmCancelOpen(false)}
                className="px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                Keep Subscription
              </button>
              <button
                onClick={() => {
                  cancelSubscription();
                  setConfirmCancelOpen(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tax Invoices Section */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div>
          <h3 className="font-display text-lg font-bold text-neutral-900">
            Automation Solutions &middot; Tax Invoices & Purchase Receipts
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Electronic VAT Tax Invoices compliant with Section 20(4) of the Value-Added Tax Act.
          </p>
        </div>

        {invoices.length === 0 ? (
          <div className="text-center py-10 text-neutral-400 bg-neutral-50 rounded-xl border border-dashed border-neutral-200 text-xs">
            No invoices on record.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                  <th className="py-3 px-3">Invoice #</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Payment Gateway & Ref</th>
                  <th className="py-3 px-3 text-right">Amount (ZAR)</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {invoices.map((inv) => (
                  <tr key={inv.invoiceNumber} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-3 px-3 font-mono font-semibold text-neutral-900">
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-3 px-3 text-neutral-600 font-mono">
                      {inv.date}
                    </td>
                    <td className="py-3 px-3 text-neutral-700">
                      <div className="font-medium">{inv.paymentMethod}</div>
                      <div className="text-[11px] font-mono text-neutral-400">{inv.paymentReference}</div>
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold text-neutral-900">
                      R {inv.totalZAR.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                        inv.status === 'PAID' ? 'bg-emerald-50 text-emerald-700' : 'bg-neutral-100 text-neutral-600'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                      >
                        <Receipt className="w-3.5 h-3.5 text-neutral-600" />
                        <span>View Tax Invoice</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <TaxInvoiceModal
        invoice={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
      />
    </div>
  );
};
