import React from 'react';
import { TaxInvoice } from '../../types';
import { COMPANY_DETAILS } from '../../data/initialData';
import { X, Printer, Download, CheckCircle2, Building2 } from 'lucide-react';

interface TaxInvoiceModalProps {
  invoice: TaxInvoice | null;
  onClose: () => void;
}

export const TaxInvoiceModal: React.FC<TaxInvoiceModalProps> = ({ invoice, onClose }) => {
  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-neutral-200 my-8">
        {/* Modal Controls (Hidden in Print) */}
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50 no-print">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-neutral-600" />
            <span className="font-semibold text-neutral-900 text-sm">Official Tax Invoice</span>
            <span className="font-mono text-xs text-neutral-500">#{invoice.invoiceNumber}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Tax Invoice Document */}
        <div id="tax-invoice-printable" className="p-8 sm:p-10 space-y-8 bg-white text-neutral-800 text-xs">
          {/* Header Strip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
            <div>
              <div className="font-display text-2xl font-bold tracking-tight text-neutral-900">
                {invoice.seller.tradingAs}
              </div>
              <div className="text-[11px] text-neutral-500 mt-1">
                {invoice.seller.name}
              </div>
              <div className="text-[11px] font-mono text-neutral-500 space-y-0.5 mt-1">
                <div>Company Reg: {invoice.seller.registrationNumber}</div>
                <div>SARS VAT Reg No: {invoice.seller.vatNumber}</div>
                <div>{invoice.seller.physicalAddress}</div>
                <div>Email: {invoice.seller.email} &middot; Tel: {invoice.seller.phone}</div>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block px-3 py-1 bg-neutral-900 text-white font-display font-bold text-base tracking-wider rounded uppercase">
                TAX INVOICE
              </span>
              <div className="mt-2 text-xs font-mono space-y-0.5">
                <div><strong>Invoice #:</strong> {invoice.invoiceNumber}</div>
                <div><strong>Date Issued:</strong> {invoice.date}</div>
                <div><strong>Payment Ref:</strong> {invoice.paymentReference}</div>
                <div>
                  <strong>Status:</strong>{' '}
                  <span className="text-emerald-700 font-bold">{invoice.status}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer / Recipient Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-neutral-50 p-4 rounded-xl border border-neutral-200">
            <div>
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                Billed To (Customer):
              </div>
              <div className="font-semibold text-neutral-900 text-sm">{invoice.customer.name}</div>
              <div className="text-neutral-600 font-mono text-[11px] mt-0.5">{invoice.customer.email}</div>
              <div className="text-neutral-500 text-[11px] mt-0.5">{invoice.customer.address}</div>
            </div>

            <div className="sm:text-right">
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                Settlement Details:
              </div>
              <div className="text-neutral-700 font-medium">Gateway: {invoice.paymentMethod}</div>
              <div className="text-neutral-500 text-[11px] mt-0.5">Currency: South African Rand (ZAR)</div>
              <div className="text-emerald-700 font-semibold text-[11px] mt-1 flex items-center sm:justify-end gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Server Confirmation</span>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-neutral-300 text-[11px] font-bold text-neutral-600 uppercase">
                  <th className="py-2.5">Description</th>
                  <th className="py-2.5 text-center w-16">Qty</th>
                  <th className="py-2.5 text-right w-28">Net Unit (ZAR)</th>
                  <th className="py-2.5 text-right w-28">Amount (ZAR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {invoice.items.map((item, idx) => (
                  <tr key={idx} className="text-xs">
                    <td className="py-3 font-medium text-neutral-800">{item.description}</td>
                    <td className="py-3 text-center font-mono tabular-nums">{item.quantity}</td>
                    <td className="py-3 text-right font-mono tabular-nums">R {item.unitPriceZAR.toFixed(2)}</td>
                    <td className="py-3 text-right font-mono tabular-nums font-semibold">R {item.amountZAR.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Breakdown (15% SARS VAT) */}
          <div className="border-t-2 border-neutral-300 pt-4 flex flex-col items-end">
            <div className="w-full sm:w-72 space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal (Net):</span>
                <span>R {invoice.subtotalZAR.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>South African VAT (15%):</span>
                <span>R {invoice.vatAmountZAR.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-900 border-t border-neutral-300 pt-2">
                <span>Total Due / Paid:</span>
                <span className="text-base">R {invoice.totalZAR.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Compliance & Legal Notice */}
          <div className="pt-6 border-t border-neutral-200 text-[10px] text-neutral-400 space-y-1 leading-relaxed">
            <p>
              This is a valid Tax Invoice issued pursuant to Section 20(4) of the South African Value-Added Tax Act, No. 89 of 1991.
            </p>
            <p>
              Queries regarding this document should be directed to {COMPANY_DETAILS.email} with reference {invoice.invoiceNumber}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
