import React from 'react';
import { useApp } from '../../context/AppContext';
import { COMPANY_DETAILS } from '../../data/initialData';

export const TermsAndConditions: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-neutral-800 text-sm leading-relaxed">
      <div className="border-b border-neutral-200 pb-6 space-y-2">
        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Legal Agreement & Terms of Service
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-neutral-900">
          Terms and Conditions
        </h1>
        <p className="text-xs text-neutral-500">
          Last updated: October 2026 &middot; Governed under the Laws of the Republic of South Africa
        </p>
      </div>

      <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl text-xs flex flex-wrap items-center justify-between gap-3">
        <span className="font-medium text-neutral-700">Need specific policy details?</span>
        <div className="flex items-center gap-3">
          <button onClick={() => setActiveView('refunds')} className="text-neutral-900 underline font-semibold hover:text-black">
            Refund & Cancellation Policy &rarr;
          </button>
          <button onClick={() => setActiveView('privacy')} className="text-neutral-900 underline font-semibold hover:text-black">
            Privacy Policy & POPIA &rarr;
          </button>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-neutral-900">
          1. Identification of the Service Provider
        </h2>
        <p>
          These Terms and Conditions constitute a legally binding agreement between you (&ldquo;Customer&rdquo;, &ldquo;User&rdquo;, or &ldquo;You&rdquo;) and <strong>{COMPANY_DETAILS.name}</strong> (trading as <strong>{COMPANY_DETAILS.tradingAs}</strong>), a private company duly incorporated in South Africa with Registration Number <strong>{COMPANY_DETAILS.registrationNumber}</strong>, SARS VAT Registration Number <strong>{COMPANY_DETAILS.vatNumber}</strong>, having its principal place of business at <strong>{COMPANY_DETAILS.physicalAddress}</strong>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-neutral-900">
          2. Account Registration & Account Security
        </h2>
        <p>
          To access design saving, high-resolution rendering, and commercial licensing features, you must register an account with a verified email address. You agree to provide accurate, current, and complete information during registration.
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-neutral-600 text-xs">
          <li>You are responsible for safeguarding your login credentials.</li>
          <li>You must notify us immediately at <strong>{COMPANY_DETAILS.email}</strong> of any unauthorized account access or security breach.</li>
          <li>Accounts are non-transferable and may not be shared outside your immediate organization or household.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-neutral-900">
          3. Pricing, Payments, South African Taxes & Access Activation
        </h2>
        <p>
          All subscription and template pass fees are quoted in <strong>South African Rand (ZAR)</strong> and include statutory South African Value-Added Tax (VAT) of 15% where applicable pursuant to the Value-Added Tax Act 89 of 1991.
        </p>
        <p>
          Payments are handled via reputable third-party payment gateways (including PayFast, Ozow Instant EFT, SnapScan, and Capitec Pay). You understand that payment processors operate under their own PCI-DSS compliant terms. Automation Solutions does not store or process raw bank card numbers or CVV codes.
        </p>
        <p>
          Paid features (including 300 DPI vector PDF exports and Pro template library access) are activated automatically immediately upon server-side confirmation of settlement from the payment gateway.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-neutral-900">
          4. Subscription Renewal and Cancellation
        </h2>
        <p>
          Subscriptions renew automatically at the end of each billing cycle (monthly or annually) unless cancelled by the user prior to the renewal date. Customers may cancel their recurring subscription at any time without fee or penalty via their account portal or by contacting customer support.
        </p>
        <p>
          Cancellation prevents future recurring billing charges. Access to Pro features continues through the remainder of the currently paid billing period.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-neutral-900">
          5. Intellectual Property & Template Licensing
        </h2>
        <div className="space-y-2 text-xs text-neutral-700">
          <p>
            <strong>Ownership of Original User Designs:</strong> You retain full copyright and intellectual property ownership of any original graphics, logos, images, and text content that you create or upload to the platform.
          </p>
          <p>
            <strong>Template Licensing:</strong> Templates created by Automation Solutions are licensed, not sold. Pro and Template Pass subscribers receive a non-exclusive, worldwide, perpetual commercial license to incorporate templates into customized marketing materials, flyers, posters, client projects, and social creatives.
          </p>
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-900">
            <strong>Strict Reselling Restriction:</strong> You are strictly prohibited from reselling, sublicensing, sharing, or redistributing Automation Solutions templates as standalone stock assets, templates, digital downloads, or design kits in competition with this platform.
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-neutral-900">
          6. Prohibited Content & Acceptable Use
        </h2>
        <p>
          You agree not to use the browser design editor to generate, publish, or export:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-neutral-600 text-xs">
          <li>Content that infringes any third-party trademark, patent, copyright, or moral rights.</li>
          <li>Fraudulent representations, fake identity documents, counterfeit brand packaging, or deceptive financial schemes.</li>
          <li>Defamatory, hate speech, incitement to violence, or sexually explicit material.</li>
          <li>Malicious software payloads, automated scraping bots, or denial-of-service probes.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-neutral-900">
          7. Service Availability & Maintenance
        </h2>
        <p>
          We endeavor to maintain 99.9% platform availability. Scheduled maintenance will be announced with reasonable prior notice where practical. Automation Solutions does not guarantee that the service will be completely error-free or uninterrupted, though verified technical defects will be resolved diligently.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-neutral-900">
          8. Account Suspension for Fraud or Serious Abuse (Fair Process)
        </h2>
        <p>
          In the event of suspected payment fraud, unauthorized card usage, intellectual property piracy, or serious breach of these Terms, Automation Solutions reserves the right to suspend or restrict account access.
        </p>
        <p className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-700">
          <strong>Fair Process Commitment:</strong> We do not execute arbitrary permanent bans. In all suspension cases, the affected customer will be notified in writing at their registered email address with the specific grounds for suspension and provided with a reasonable opportunity (minimum 5 business days) to submit an explanation or appeal before permanent termination.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-neutral-900">
          9. Limitation of Liability
        </h2>
        <p>
          To the maximum extent permitted under South African law, Automation Solutions shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use or inability to use the platform. Our aggregate liability for verified claims shall be limited to the total fees paid by you in the 12 months preceding the event.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-neutral-900">
          10. Applicable South African Law & Consumer Rights
        </h2>
        <p>
          These Terms are governed by and construed in accordance with the laws of the <strong>Republic of South Africa</strong>. Nothing in these Terms limits or excludes any mandatory consumer rights under the <strong>Consumer Protection Act No. 68 of 2008 (CPA)</strong> or the <strong>Electronic Communications and Transactions Act No. 25 of 2002 (ECTA)</strong> that cannot lawfully be waived.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-lg font-bold text-neutral-900">
          11. Customer Support & Complaints Procedure
        </h2>
        <p>
          We are dedicated to resolving customer concerns swiftly and courteously. If you have an inquiry, dispute, or complaint:
        </p>
        <ol className="list-decimal pl-5 space-y-1.5 text-xs text-neutral-700">
          <li>Submit a ticket through our official <button onClick={() => setActiveView('support')} className="text-neutral-900 underline font-semibold">Support Center</button> quoting your account email and relevant order or invoice number.</li>
          <li>Our support team will acknowledge your ticket within 24 business hours.</li>
          <li>If an issue cannot be resolved through standard channels, it will be escalated to our Governance Team for formal review in accordance with CPA guidelines.</li>
        </ol>
      </section>
    </div>
  );
};
