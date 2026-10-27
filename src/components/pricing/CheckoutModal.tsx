import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRICING_PLANS, TEMPLATE_PACK_ITEMS } from '../../data/initialData';
import { SouthAfricanPaymentMethod } from '../../types';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  CreditCard, 
  Building2, 
  QrCode, 
  Smartphone,
  ExternalLink,
  Receipt,
  Package,
  Key
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { 
    checkoutState, 
    closeCheckout, 
    currentUser, 
    processPaymentSuccess, 
    setActiveView,
    setSelectedInvoice
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<SouthAfricanPaymentMethod>('payfast-card');
  const [selectedBank, setSelectedBank] = useState<string>('Standard Bank');
  const [capitecPhone, setCapitecPhone] = useState<string>('082 123 4567');
  const [agreeTerms, setAgreeTerms] = useState<boolean>(true);
  
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'gateway_auth' | 'success'>('form');
  const [authOtp, setAuthOtp] = useState<string>('748291');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [lastReceipt, setLastReceipt] = useState<any>(null);

  if (!checkoutState.isOpen) return null;

  const plan = PRICING_PLANS.find(p => p.id === checkoutState.planId) || PRICING_PLANS[0];
  const priceZAR = plan.priceZAR;
  const isRecurring = plan.billingType === 'monthly' || plan.billingType === 'annual';

  const vatZAR = Number((priceZAR * (15 / 115)).toFixed(2));
  const netZAR = Number((priceZAR - vatZAR).toFixed(2));

  const handleProceedToGateway = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep('gateway_auth');
    }, 600);
  };

  const handleAuthorizePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const result = processPaymentSuccess(
        checkoutState.planId,
        plan.billingType,
        paymentMethod,
        priceZAR,
        checkoutState.templateTitle
      );
      setLastReceipt(result);
      setIsProcessing(false);
      setCheckoutStep('success');
    }, 1000);
  };

  const handleDone = () => {
    closeCheckout();
    setCheckoutStep('form');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-neutral-200 my-8">
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <h3 className="font-display font-bold text-neutral-900 text-base">
              Automation Solutions &mdash; Secure Checkout
            </h3>
          </div>
          <button
            onClick={closeCheckout}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: ORDER DETAILS & PAYMENT SELECTION */}
        {checkoutStep === 'form' && (
          <div className="p-6 space-y-6">
            {/* Order Summary Box */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Selected Plan</span>
                  <div className="font-display font-bold text-neutral-900 text-base mt-0.5">
                    {plan.name}
                  </div>
                  <div className="text-xs text-neutral-600 mt-0.5">
                    {plan.tagline}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-neutral-500 font-mono">Total Due (ZAR)</div>
                  {plan.originalPriceZAR && (
                    <div className="text-xs text-neutral-400 line-through font-mono">
                      R {plan.originalPriceZAR.toFixed(2)}
                    </div>
                  )}
                  <div className="font-display font-bold text-xl text-neutral-900 font-mono tabular-nums">
                    R {priceZAR.toFixed(2)}
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono">{plan.cadenceLabel}</span>
                  {plan.originalPriceZAR && (
                    <div className="text-[10px] font-bold text-emerald-700 font-mono">
                      Save R {(plan.originalPriceZAR - priceZAR).toFixed(2)}
                    </div>
                  )}
                </div>
              </div>

              {/* Special disclosure for 15 Templates Pack */}
              {plan.id === 'template-pack' && (
                <div className="mt-3 pt-3 border-t border-neutral-200 text-xs text-neutral-700 space-y-1">
                  <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-cyan-700" />
                    <span>Includes 15 Curated Design Templates (Editable & Downloadable):</span>
                  </div>
                  <div className="text-[11px] text-neutral-500 max-h-24 overflow-y-auto pl-2 border-l border-neutral-200 space-y-0.5">
                    {TEMPLATE_PACK_ITEMS.map((t, idx) => (
                      <div key={idx}>{idx + 1}. {t}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* Special disclosure for Feature Unlock */}
              {plan.id === 'feature-unlock' && (
                <div className="mt-3 pt-3 border-t border-neutral-200 text-xs text-neutral-700 space-y-1">
                  <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-amber-700" />
                    <span>Permanent Features Unlocked on Your Account:</span>
                  </div>
                  <div className="text-[11px] text-neutral-600 pl-2 border-l border-neutral-200">
                    &bull; 300 DPI Vector PDF export &bull; SVG code download &bull; Watermark removal &bull; Logo cloud upload &bull; Lifetime access (does not expire).
                  </div>
                </div>
              )}

              {/* SARS 15% VAT Breakdown */}
              <div className="mt-3 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500 font-mono">
                <span>Subtotal (Net): R {netZAR.toFixed(2)}</span>
                <span>RSA VAT (15%): R {vatZAR.toFixed(2)}</span>
              </div>
            </div>

            {/* Recurring Billing Disclosure */}
            {isRecurring ? (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 leading-relaxed">
                <span className="font-semibold block mb-0.5">Recurring Billing Disclosure:</span>
                This subscription automatically renews at <strong className="font-mono">R {priceZAR.toFixed(2)}</strong> {plan.cadenceLabel} until cancelled. You can easily cancel at any time in your customer dashboard or via support without penalty. Access remains active until the end of the paid billing period.
              </div>
            ) : (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 leading-relaxed">
                <span className="font-semibold block mb-0.5">Once-Off Payment:</span>
                This is a single charge of <strong className="font-mono">R {priceZAR.toFixed(2)}</strong>. There are no recurring fees or automatic renewals.
              </div>
            )}

            {/* South African Payment Method */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                Select South African Payment Option
              </label>

              <div className="space-y-2">
                <label className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'payfast-card' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:bg-neutral-50'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'payfast-card'}
                      onChange={() => setPaymentMethod('payfast-card')}
                      className="accent-neutral-900"
                    />
                    <div>
                      <div className="text-xs font-semibold text-neutral-900 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-neutral-700" />
                        <span>PayFast 3D Secure (Visa & Mastercard)</span>
                      </div>
                      <p className="text-[11px] text-neutral-500">Secure card tokenization &middot; Instant access activation</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">Card</span>
                </label>

                <label className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'ozow-instant-eft' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:bg-neutral-50'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'ozow-instant-eft'}
                      onChange={() => setPaymentMethod('ozow-instant-eft')}
                      className="accent-neutral-900"
                    />
                    <div>
                      <div className="text-xs font-semibold text-neutral-900 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-emerald-700" />
                        <span>Ozow Instant EFT (All Major SA Banks)</span>
                      </div>
                      <p className="text-[11px] text-neutral-500">Standard Bank, FNB, ABSA, Nedbank, Capitec, Investec</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">Instant EFT</span>
                </label>

                <label className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'capitec-pay' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:bg-neutral-50'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'capitec-pay'}
                      onChange={() => setPaymentMethod('capitec-pay')}
                      className="accent-neutral-900"
                    />
                    <div>
                      <div className="text-xs font-semibold text-neutral-900 flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-sky-700" />
                        <span>Capitec Pay</span>
                      </div>
                      <p className="text-[11px] text-neutral-500">Approve directly in your Capitec Banking App</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">Capitec</span>
                </label>

                <label className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'snapscan' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200 hover:bg-neutral-50'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'snapscan'}
                      onChange={() => setPaymentMethod('snapscan')}
                      className="accent-neutral-900"
                    />
                    <div>
                      <div className="text-xs font-semibold text-neutral-900 flex items-center gap-2">
                        <QrCode className="w-4 h-4 text-blue-600" />
                        <span>SnapScan Mobile QR</span>
                      </div>
                      <p className="text-[11px] text-neutral-500">Scan QR on screen or tap to pay on mobile</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">QR Code</span>
                </label>
              </div>
            </div>

            {/* Zero Raw Card Storage Notice */}
            <div className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-1.5 text-xs text-neutral-600">
              <div className="flex items-center gap-2 text-neutral-900 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Card Storage Guarantee</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Automation Solutions never stores your raw bank card numbers or card security codes (CVVs). Transactions are tokenized and processed securely through accredited PCI-DSS payment gateways.
              </p>
            </div>

            {/* Agreement & Policies */}
            <div className="flex items-start gap-2 text-xs text-neutral-600">
              <input
                type="checkbox"
                id="agree_terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 accent-neutral-900"
              />
              <label htmlFor="agree_terms" className="leading-relaxed">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={() => {
                    closeCheckout();
                    setActiveView('terms');
                  }}
                  className="text-neutral-900 underline font-medium hover:text-black"
                >
                  Terms and Conditions
                </button>
                {' '}and acknowledge the{' '}
                <button
                  type="button"
                  onClick={() => {
                    closeCheckout();
                    setActiveView('refunds');
                  }}
                  className="text-neutral-900 underline font-medium hover:text-black"
                >
                  Refund & Cancellation Policy
                </button>
                {' '}(aligned with the South African Consumer Protection Act).
              </label>
            </div>

            <div className="pt-2">
              <button
                onClick={handleProceedToGateway}
                disabled={!agreeTerms || isProcessing}
                className="w-full py-3 px-4 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>{isProcessing ? 'Connecting to Gateway...' : `Proceed to Gateway · R ${priceZAR.toFixed(2)}`}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: GATEWAY AUTHORIZATION */}
        {checkoutStep === 'gateway_auth' && (
          <div className="p-6 space-y-6">
            <div className="text-center py-2">
              <div className="inline-flex p-3 bg-neutral-100 rounded-full mb-3">
                <Lock className="w-6 h-6 text-neutral-800" />
              </div>
              <h4 className="font-display font-bold text-neutral-900 text-lg">
                Secure 3D-Secure / Bank Authorization
              </h4>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                {paymentMethod === 'payfast-card' && 'PayFast 3D Secure One-Time PIN verification. Enter the 6-digit code dispatched to your registered phone.'}
                {paymentMethod === 'ozow-instant-eft' && 'Ozow Instant EFT secure direct bank authentication.'}
                {paymentMethod === 'capitec-pay' && 'Capitec Pay instant in-app authorization.'}
                {paymentMethod === 'snapscan' && 'SnapScan QR payment verification.'}
              </p>
            </div>

            {paymentMethod === 'payfast-card' && (
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-3 text-xs">
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <span className="text-neutral-500">Merchant</span>
                  <span className="font-semibold text-neutral-900">Automation Solutions (Pty) Ltd</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <span className="text-neutral-500">Card ending in</span>
                  <span className="font-mono font-medium">•••• 4242</span>
                </div>
                <div className="flex justify-between border-b border-neutral-200 pb-2">
                  <span className="text-neutral-500">Amount</span>
                  <span className="font-mono font-bold text-neutral-900">R {priceZAR.toFixed(2)} ZAR</span>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 uppercase mb-1">
                    Enter SMS One-Time PIN (OTP)
                  </label>
                  <input
                    type="text"
                    value={authOtp}
                    onChange={(e) => setAuthOtp(e.target.value)}
                    className="w-full p-2 border border-neutral-300 rounded text-sm font-mono tracking-widest text-center focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'ozow-instant-eft' && (
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Select Bank</span>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="p-1 border border-neutral-300 rounded text-xs bg-white"
                  >
                    <option>Standard Bank</option>
                    <option>First National Bank (FNB)</option>
                    <option>ABSA</option>
                    <option>Nedbank</option>
                    <option>Capitec Bank</option>
                    <option>Investec</option>
                  </select>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-[11px] text-emerald-800 leading-relaxed">
                  Ozow creates an automated encrypted session with your {selectedBank} online profile. No login credentials are ever seen or stored by Automation Solutions.
                </div>
              </div>
            )}

            {paymentMethod === 'capitec-pay' && (
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 uppercase mb-1">
                    Capitec Registered Mobile Number
                  </label>
                  <input
                    type="text"
                    value={capitecPhone}
                    onChange={(e) => setCapitecPhone(e.target.value)}
                    className="w-full p-2 border border-neutral-300 rounded text-xs font-mono"
                  />
                </div>
                <p className="text-[11px] text-neutral-500">
                  A push notification request will appear in your Capitec Banking App. Tap approve to confirm the R {priceZAR.toFixed(2)} transfer.
                </p>
              </div>
            )}

            {paymentMethod === 'snapscan' && (
              <div className="text-center p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-3">
                <div className="w-36 h-36 bg-white border border-neutral-300 rounded-lg mx-auto flex items-center justify-center p-2 shadow-sm">
                  <QrCode className="w-28 h-28 text-neutral-900" />
                </div>
                <p className="text-xs text-neutral-600">
                  Open SnapScan or Zapper app on your phone and scan the QR code to authorize R {priceZAR.toFixed(2)}.
                </p>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setCheckoutStep('form')}
                className="w-1/3 py-2.5 px-3 border border-neutral-300 rounded-xl text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleAuthorizePayment}
                disabled={isProcessing}
                className="w-2/3 py-2.5 px-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{isProcessing ? 'Verifying with Bank...' : 'Authorize & Activate Access'}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS & ACTIVATION */}
        {checkoutStep === 'success' && lastReceipt && (
          <div className="p-6 text-center space-y-5">
            <div className="inline-flex p-3 bg-emerald-100 rounded-full text-emerald-700 mb-1">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="font-display font-bold text-neutral-900 text-xl">
                Payment Verified & Access Activated!
              </h4>
              <p className="text-xs text-neutral-600 mt-1 max-w-md mx-auto leading-relaxed">
                Thank you! Your transaction has been confirmed by the gateway. Your <strong>Automation Solutions</strong> features and digital access are now active on your customer dashboard.
              </p>
            </div>

            {/* Receipt Summary */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Transaction Ref</span>
                <span className="font-mono font-semibold text-neutral-900">{lastReceipt.transaction.reference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Tax Invoice Number</span>
                <span className="font-mono font-semibold text-neutral-900">{lastReceipt.invoice.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Plan Purchased</span>
                <span className="text-neutral-800 font-semibold">{lastReceipt.transaction.planName}</span>
              </div>
              <div className="flex justify-between border-t border-neutral-200 pt-2 font-semibold">
                <span>Total Paid (Incl. 15% VAT)</span>
                <span className="font-mono text-neutral-900">R {lastReceipt.transaction.amountZAR.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-3 bg-neutral-100 rounded-lg text-[11px] text-neutral-600 text-left">
              An official South African Tax Invoice and confirmation email have been sent to <strong>{currentUser.email}</strong>.
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedInvoice(lastReceipt.invoice);
                  handleDone();
                }}
                className="px-4 py-2 text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 rounded-lg border border-neutral-300 transition-colors flex items-center gap-1.5"
              >
                <Receipt className="w-3.5 h-3.5" />
                <span>View Tax Invoice</span>
              </button>
              <button
                onClick={() => {
                  handleDone();
                  setActiveView('editor');
                }}
                className="px-5 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors"
              >
                Start Designing Now &rarr;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
