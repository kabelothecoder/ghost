import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_DETAILS } from '../../data/initialData';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Database, 
  UserCheck, 
  CheckCircle2 
} from 'lucide-react';

export const PrivacyPolicyPOPIA: React.FC = () => {
  const { currentUser, submitPrivacyRequest } = useApp();

  const [dsrType, setDsrType] = useState<'access' | 'correction' | 'deletion' | 'objection'>('access');
  const [dsrName, setDsrName] = useState(currentUser.name);
  const [dsrEmail, setDsrEmail] = useState(currentUser.email);
  const [dsrIdRef, setDsrIdRef] = useState('');
  const [dsrDescription, setDsrDescription] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleSubmitDsr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dsrName || !dsrEmail || !dsrDescription) return;

    const ticket = submitPrivacyRequest({
      requestType: dsrType,
      dataSubjectName: dsrName,
      dataSubjectEmail: dsrEmail,
      identificationReference: dsrIdRef || 'ZA-USER-VERIFIED',
      description: dsrDescription
    });

    setSubmittedTicket(ticket);
    setDsrDescription('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-neutral-800 text-sm leading-relaxed">
      <div className="border-b border-neutral-200 pb-6 space-y-2">
        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          POPIA & PAIA Statutory Compliance
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-neutral-900">
          Privacy Policy & Data Protection Notice
        </h1>
        <p className="text-xs text-neutral-500">
          Protection of Personal Information Act (Act 4 of 2013) &middot; Republic of South Africa
        </p>
      </div>

      <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <span className="font-semibold text-neutral-900 block mb-1">Responsible Party (POPIA Section 1):</span>
          <div className="text-neutral-700">{COMPANY_DETAILS.name} (trading as {COMPANY_DETAILS.tradingAs})</div>
          <div className="text-neutral-500 mt-1">{COMPANY_DETAILS.physicalAddress}</div>
          <div className="text-neutral-500">Company Reg: {COMPANY_DETAILS.registrationNumber} &middot; VAT: {COMPANY_DETAILS.vatNumber}</div>
        </div>

        <div>
          <span className="font-semibold text-neutral-900 block mb-1">Registered Information Officer:</span>
          <div className="text-neutral-700">{COMPANY_DETAILS.informationOfficer}</div>
          <div className="text-neutral-500 mt-1">Deputy Information Officer: {COMPANY_DETAILS.deputyInformationOfficer}</div>
          <div className="text-neutral-700 font-mono mt-1">Enquiries: {COMPANY_DETAILS.privacyEmail}</div>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-neutral-900">
          1. Personal Information We Collect
        </h2>
        <p>
          Automation Solutions processes only personal information that is adequate, relevant, and not excessive for the provision of our browser-based graphic creative platform:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-700">
          <li><strong>Identity & Contact Details:</strong> Full name, verified email address, telephone contact (where provided for Capitec Pay or billing support).</li>
          <li><strong>Account Credentials:</strong> Salted and securely hashed account passwords and profile preferences.</li>
          <li><strong>Payment & Billing History:</strong> Payment transaction references, date of transaction, settlement status, and SARS Tax Invoices. <em>(Note: Raw bank card numbers and CVV codes are never collected or stored).</em></li>
          <li><strong>Customer Design Assets & Uploads:</strong> Visual projects, custom logos, imported photographs, typography choices, and canvas layers stored by you.</li>
          <li><strong>Technical Diagnostics:</strong> Browser type, viewport dimensions, operating system, and secure session tokens necessary to maintain workspace state.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-neutral-900">
          2. Lawful Basis & Purpose of Processing
        </h2>
        <p>
          In terms of Section 11 of POPIA, personal information is processed on the basis of contractual necessity, legitimate operational interest, and statutory obligation:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-700">
          <li>To provision, authenticate, and administer customer workspace accounts.</li>
          <li>To verify transaction confirmations from accredited payment gateways and activate paid features.</li>
          <li>To host, sync, and render customer designs and facilitate high-resolution file exports.</li>
          <li>To respond to customer support tickets, refund requests, and complaints.</li>
          <li>To prevent payment fraud, unauthorized account access, and service disruption.</li>
          <li>To dispatch essential transactional emails (payment receipts, security alerts, and Tax Invoices).</li>
          <li>To send marketing communications strictly where explicit opt-in consent has been granted.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-neutral-900">
          3. Payment Privacy & Certified Processors
        </h2>
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs text-emerald-950">
          <div className="flex items-center gap-2 font-semibold">
            <Lock className="w-4 h-4 text-emerald-700" />
            <span>Zero Raw Card Number or Security Code Storage</span>
          </div>
          <p className="leading-relaxed">
            All credit card and Instant EFT transactions are processed exclusively through certified third-party payment gateways (including PayFast by DPO Group, Ozow, SnapScan, and Capitec Pay). These providers process financial transactions under their own independent PCI-DSS Level 1 compliance and privacy policies.
          </p>
          <p className="leading-relaxed">
            Automation Solutions receives only anonymized cryptographic payment tokens and verification status signals. We never view, transmit, or store full credit card numbers or CVV security codes.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-neutral-900">
          4. Security Safeguards & Integrity (POPIA Section 19)
        </h2>
        <p>
          We employ robust technical and organizational security controls to protect personal information against loss, damage, and unauthorized destruction:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-white border border-neutral-200 rounded-xl space-y-1">
            <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-neutral-700" />
              <span>HTTPS & TLS Encryption</span>
            </div>
            <p className="text-neutral-600">
              All browser communications and data transfers are encrypted in transit using 256-bit Transport Layer Security (TLS 1.3).
            </p>
          </div>

          <div className="p-4 bg-white border border-neutral-200 rounded-xl space-y-1">
            <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-neutral-700" />
              <span>Password Hashing</span>
            </div>
            <p className="text-neutral-600">
              User credentials are salted and irreversibly hashed using industry-standard Argon2/bcrypt routines.
            </p>
          </div>

          <div className="p-4 bg-white border border-neutral-200 rounded-xl space-y-1">
            <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-neutral-700" />
              <span>Least Privilege Staff Access</span>
            </div>
            <p className="text-neutral-600">
              Access to customer records is restricted strictly to authorized support and technical staff on a need-to-know basis.
            </p>
          </div>

          <div className="p-4 bg-white border border-neutral-200 rounded-xl space-y-1">
            <div className="font-semibold text-neutral-900 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-neutral-700" />
              <span>Backups & Isolation</span>
            </div>
            <p className="text-neutral-600">
              Customer creative assets are stored in isolated encrypted buckets with automated daily snapshots and disaster recovery procedures.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-neutral-900">
          5. Cookies, Third-Party Providers & Cross-Border Transfers
        </h2>
        <p>
          <strong>Cookies:</strong> We use strictly essential session cookies to remember your authenticated state, active design canvas, and UI preferences. We do not deploy third-party advertising tracking cookies.
        </p>
        <p>
          <strong>Service Providers:</strong> We engage reputable infrastructure providers (cloud hosting in the AWS Africa Cape Town region, Google Cloud infrastructure, and South African payment gateways).
        </p>
        <p>
          <strong>Cross-Border Transfers (POPIA Section 72):</strong> Where data is processed or mirrored across international cloud regions, transfers occur only to jurisdictions with privacy laws that provide substantially similar protections to POPIA, or under binding operator agreements incorporating equivalent safeguards.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-neutral-900">
          6. Marketing Consent & No-Sale Commitment
        </h2>
        <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl text-xs space-y-1.5">
          <p className="font-semibold text-neutral-900">
            We never sell, rent, or trade your personal information to third parties.
          </p>
          <p className="text-neutral-600">
            Marketing emails are sent only to users who have provided explicit consent. Every promotional communication includes a 1-click unsubscribe link, and you can update your marketing preference at any time in your Account Settings.
          </p>
        </div>
      </section>

      <section className="space-y-4 pt-4 border-t border-neutral-200">
        <div>
          <h2 className="font-display text-lg font-bold text-neutral-900">
            7. Data Subject Rights & Formal Request Portal (POPIA Sections 23 & 24)
          </h2>
          <p className="text-xs text-neutral-600 mt-1">
            As a registered user, you hold statutory rights to request confirmation of personal information held, request access to your records, object to processing, or request correction or deletion of eligible personal information.
          </p>
        </div>

        {submittedTicket ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs space-y-2">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>POPIA Data Request Submitted Successfully</span>
            </div>
            <p>
              Your formal request has been recorded under reference <strong className="font-mono">{submittedTicket}</strong> and routed to our Information Officer. Pursuant to POPIA regulations, our office will respond within 21 business days.
            </p>
            <button
              onClick={() => setSubmittedTicket(null)}
              className="mt-2 text-xs font-semibold text-emerald-900 underline"
            >
              Submit another inquiry &rarr;
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitDsr} className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-4 text-xs shadow-sm">
            <div className="font-semibold text-neutral-900 text-sm">
              Submit a Data Subject Request (DSR)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-700 uppercase mb-1">
                  Request Type
                </label>
                <select
                  value={dsrType}
                  onChange={(e) => setDsrType(e.target.value as any)}
                  className="w-full p-2 border border-neutral-300 rounded-lg text-xs bg-white"
                >
                  <option value="access">Access Personal Records (Section 23)</option>
                  <option value="correction">Correction of Inaccurate Data (Section 24)</option>
                  <option value="deletion">Destruction / Deletion of Data (Section 24)</option>
                  <option value="objection">Objection to Processing (Section 11(3))</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-700 uppercase mb-1">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  required
                  value={dsrName}
                  onChange={(e) => setDsrName(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-700 uppercase mb-1">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  required
                  value={dsrEmail}
                  onChange={(e) => setDsrEmail(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-700 uppercase mb-1">
                  SA ID / Passport Reference (Verification)
                </label>
                <input
                  type="text"
                  value={dsrIdRef}
                  onChange={(e) => setDsrIdRef(e.target.value)}
                  placeholder="e.g. ZA-ID-XXXXXX (Optional)"
                  className="w-full p-2 border border-neutral-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-700 uppercase mb-1">
                Details & Specific Information Requested
              </label>
              <textarea
                required
                rows={3}
                value={dsrDescription}
                onChange={(e) => setDsrDescription(e.target.value)}
                placeholder="Specify the exact records you wish to inspect, correct, or request deletion of..."
                className="w-full p-2.5 border border-neutral-300 rounded-lg text-xs"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-neutral-400">
                Information Officer response within 21 business days
              </span>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors shadow-sm"
              >
                Submit POPIA Request
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};
