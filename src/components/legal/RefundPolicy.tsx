import React from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_DETAILS } from '../../data/initialData';
import { Scale, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

export const RefundPolicy: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-neutral-800 text-sm leading-relaxed">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6 space-y-2">
        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Consumer Protection & Fair Remedy Policy
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-neutral-900">
          Refund and Cancellation Policy
        </h1>
        <p className="text-xs text-neutral-500">
          Aligned with the South African Consumer Protection Act (CPA No. 68 of 2008) and ECTA (Act No. 25 of 2002)
        </p>
      </div>

      {/* Summary Box */}
      <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-2 text-xs">
        <div className="flex items-center gap-2 font-semibold text-neutral-900">
          <Scale className="w-4 h-4 text-emerald-600" />
          <span>Commitment to Fair Assessment & Consumer Rights</span>
        </div>
        <p className="text-neutral-600 leading-relaxed">
          At Automation Solutions, we do not impose arbitrary &ldquo;no refunds under any circumstances&rdquo; blanket rules. We assess all customer claims transparently according to South African statutory consumer rights, the nature of digital goods delivered, and verified technical circumstances.
        </p>
      </div>

      {/* Section 1 */}
      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-neutral-900">
          1. Digital Products and Downloads
        </h2>
        <p>
          Because Automation Solutions delivers digital access, customizable downloadable templates, and browser-based rendering software, customers are encouraged to review the product descriptions, included template layers, and supported export resolutions before completing a purchase.
        </p>
        <p>
          If a customer experiences a verified technical issue (such as browser rendering failures, server-side PDF generation corruption, or gateway activation delays) that prevents access to a purchased product or template, our technical team will immediately investigate and work to restore access or provide an appropriate remedy.
        </p>
        <p>
          Refund requests must be submitted through our official support channel with the relevant order or invoice number (e.g. <code>INV-2026-XXXX</code>) and a description of the defect encountered. Approved refunds will be processed directly through the original payment method (PayFast, Ozow Instant EFT, SnapScan, or Capitec Pay) where technically feasible.
        </p>
      </section>

      {/* Section 2 */}
      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-neutral-900">
          2. Subscription Cancellation & Billing Periods
        </h2>
        <p>
          Customers may cancel their recurring subscription at any time without fees or notice periods directly through their account portal or by contacting customer support.
        </p>
        <p>
          Cancellation immediately prevents all future automated subscription renewals. In line with the recurring digital service model, cancellation does not automatically trigger a retrospective refund for a monthly or annual billing period that has already commenced, and your Pro privileges remain fully active until the conclusion of that billing cycle.
        </p>
      </section>

      {/* Section 3 */}
      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-neutral-900">
          3. Incorrect Charges and Duplicate Payments
        </h2>
        <p>
          In the event of verified duplicate charges resulting from network connection drops, gateway timeouts, unauthorized transactions, or billing calculation discrepancies:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-600">
          <li>The matter will be investigated promptly by our South African billing team.</li>
          <li>Verified duplicate or erroneous amounts will be corrected and credited back to the customer&apos;s originating payment instrument within 3 to 7 business banking days.</li>
        </ul>
      </section>

      {/* Section 4 */}
      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-neutral-900">
          4. South African Consumer Rights & Statutory Protections
        </h2>
        <p>
          Nothing in this policy excludes, limits, or modifies any consumer rights that cannot lawfully be excluded under applicable South African legislation, including:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-600">
          <li><strong>The Consumer Protection Act 68 of 2008 (CPA):</strong> Ensuring goods and digital services are of good quality, in working order, and reasonably fit for their intended purpose.</li>
          <li><strong>The Electronic Communications and Transactions Act 25 of 2002 (ECTA):</strong> Protecting consumers engaged in electronic commercial transactions.</li>
        </ul>
        <p>
          Refund eligibility is assessed fairly in every instance according to statutory requirements and the specific facts of the transaction.
        </p>
      </section>

      {/* Section 5 */}
      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-neutral-900">
          5. How to Submit a Refund or Access Ticket
        </h2>
        <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200 space-y-4">
          <p className="text-xs text-neutral-700">
            To submit a request for an access remedy, billing inquiry, or refund evaluation, please visit our customer support portal:
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('support')}
              className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors"
            >
              Open Support & Refund Request Ticket &rarr;
            </button>
            <span className="text-xs text-neutral-500 font-mono">
              Direct email: {COMPANY_DETAILS.email}
            </span>
          </div>

          <div className="text-[11px] text-neutral-400">
            Please include your Tax Invoice number, registered account email, and a concise explanation of the issue. We review all refund submissions within 24 business hours.
          </div>
        </div>
      </section>
    </div>
  );
};
