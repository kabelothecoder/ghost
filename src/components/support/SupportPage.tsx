import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_DETAILS } from '../../data/initialData';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';

export const SupportPage: React.FC = () => {
  const { currentUser, submitSupportTicket } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [category, setCategory] = useState<'access_issue' | 'refund_request' | 'billing_inquiry' | 'template_question' | 'privacy_popia' | 'general'>('access_issue');
  const [orderNumber, setOrderNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submittedTicketNumber, setSubmittedTicketNumber] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) return;

    const tktNum = submitSupportTicket({
      name,
      email,
      category,
      orderNumber: orderNumber.trim() || undefined,
      subject,
      message
    });

    setSubmittedTicketNumber(tktNum);
    setSubject('');
    setMessage('');
    setOrderNumber('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-neutral-200 pb-6 space-y-2">
        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          South African Help Center & Dispute Resolution
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-neutral-900">
          Customer Support & Complaints Procedure
        </h1>
        <p className="text-xs text-neutral-500">
          Our Johannesburg-based support desk operates Monday to Friday, 08:30 &ndash; 17:00 SAST.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 shadow-sm text-xs">
            <h3 className="font-display font-bold text-neutral-900 text-sm">
              Direct Contact Details
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-neutral-400">Support Desk</div>
                  <div className="font-medium text-neutral-900 font-mono mt-0.5">{COMPANY_DETAILS.email}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-neutral-400">Telephone Line</div>
                  <div className="font-medium text-neutral-900 font-mono mt-0.5">{COMPANY_DETAILS.phone}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-neutral-400">Physical Studio & Offices</div>
                  <div className="text-neutral-800 mt-0.5">{COMPANY_DETAILS.physicalAddress}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-neutral-400">Response SLA</div>
                  <div className="text-neutral-800 font-medium mt-0.5">Within 24 business hours guaranteed</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 space-y-3 text-xs leading-relaxed text-neutral-700">
            <h4 className="font-display font-bold text-neutral-900 text-sm">
              Statutory Complaints Escalation
            </h4>
            <p>
              In accordance with the <strong>Consumer Protection Act No. 68 of 2008</strong>, if your inquiry or refund request is not satisfactorily resolved within 5 business days, you may request formal escalation to our Head of Governance at <strong>{COMPANY_DETAILS.privacyEmail}</strong>.
            </p>
            <p className="text-[11px] text-neutral-500">
              Responsible Information Officer: {COMPANY_DETAILS.informationOfficer}
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          {submittedTicketNumber ? (
            <div className="bg-white border border-neutral-200 rounded-2xl p-8 text-center space-y-4 shadow-sm">
              <div className="inline-flex p-3 bg-emerald-100 rounded-full text-emerald-700">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-neutral-900 text-xl">
                Ticket Logged: {submittedTicketNumber}
              </h3>
              <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
                Thank you for contacting Automation Solutions. A confirmation has been dispatched to <strong>{email}</strong>. Our Johannesburg team is actively investigating your request and will respond within 24 business hours.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setSubmittedTicketNumber(null)}
                  className="px-5 py-2 text-xs font-semibold text-neutral-900 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                >
                  Submit Another Ticket
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm text-xs">
              <div className="border-b border-neutral-100 pb-4">
                <h3 className="font-display font-bold text-neutral-900 text-base">
                  Submit a Support or Refund Request
                </h3>
                <p className="text-neutral-500 mt-0.5">
                  Provide your transaction or order reference to expedite technical access restoration.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 uppercase mb-1">
                    Inquiry Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs bg-white"
                  >
                    <option value="access_issue">Access Activation Issue (Cannot access Pro feature)</option>
                    <option value="refund_request">Refund Request (Order Investigation)</option>
                    <option value="billing_inquiry">Billing & SARS Tax Invoice Query</option>
                    <option value="template_question">Template Licensing or Export Question</option>
                    <option value="privacy_popia">POPIA & Privacy Enquiry</option>
                    <option value="general">General Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 uppercase mb-1">
                    Order / Invoice Number {category === 'refund_request' && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="e.g. INV-2026-0418"
                    className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-700 uppercase mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Summary of the issue or inquiry"
                  className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-700 uppercase mb-1">
                  Detailed Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe the issue in detail (browser version, error message, or refund grounds)..."
                  className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-neutral-400">
                  Protected under CPA No. 68 of 2008
                </span>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition-colors shadow-sm"
                >
                  Send Support Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
