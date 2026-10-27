import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, CreditCard } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <footer className="bg-neutral-900 text-neutral-400 text-sm border-t border-neutral-800 no-print">
      {/* Trust & Payment Security Strip */}
      <div className="border-b border-neutral-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-6 text-neutral-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>POPIA & PAIA Compliant (Act 4 of 2013)</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-400" />
              <span>256-Bit TLS Encryption &middot; Zero Raw Card Storage</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-400" />
              <span>Consumer Protection Act (CPA No. 68 of 2008)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-neutral-400 font-mono text-[11px]">
            <span>Supported Gateways:</span>
            <span className="text-white font-medium">PayFast &middot; Ozow Instant EFT &middot; SnapScan &middot; Zapper &middot; Capitec Pay</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="font-display text-lg font-bold text-white tracking-tight">Automation Solutions</div>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              Your Ideas. Your Designs. One Platform. Empowering entrepreneurs, creators, agencies, and businesses across South Africa with professional graphic design tools, high-resolution downloads, and compliant local payment options.
            </p>
            <div className="mt-4 text-[11px] font-mono text-neutral-500 space-y-1">
              <div>Reg No: 2024/182901/07</div>
              <div>SARS VAT No: 4980293841</div>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-neutral-200 uppercase tracking-wider mb-3">Product & Editor</div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveView('home')} className="hover:text-white transition-colors">
                  Home Platform
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('templates')} className="hover:text-white transition-colors">
                  15+ Curated Templates
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('editor')} className="hover:text-white transition-colors">
                  Browser Graphic Studio
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('my-designs')} className="hover:text-white transition-colors">
                  Saved Customer Projects
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('pricing')} className="hover:text-white transition-colors">
                  Pricing Plans (in ZAR)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('account')} className="hover:text-white transition-colors">
                  Billing & SARS Tax Invoices
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold text-neutral-200 uppercase tracking-wider mb-3">Legal & POPIA Governance</div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveView('privacy')} className="hover:text-white transition-colors">
                  Privacy Policy & POPIA Notice
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('terms')} className="hover:text-white transition-colors">
                  Terms and Conditions (SA Law)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('refunds')} className="hover:text-white transition-colors">
                  Refund & Cancellation Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('privacy')} className="hover:text-white transition-colors">
                  POPIA Section 23/24 DSR Request Form
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold text-neutral-200 uppercase tracking-wider mb-3">Responsible Party & Support</div>
            <div className="text-xs text-neutral-400 space-y-2 leading-relaxed">
              <div>
                <strong className="text-neutral-200">Information Officer:</strong><br />
                Mr. Sipho Ndlovu<br />
                <span className="text-neutral-300">privacy@automationsolutions.co.za</span>
              </div>
              <div>
                <strong className="text-neutral-200">Registered Office:</strong><br />
                142 Jan Smuts Avenue, Rosebank<br />
                Johannesburg, 2196, South Africa
              </div>
              <div>
                <button 
                  onClick={() => setActiveView('support')}
                  className="mt-1 inline-block text-cyan-400 hover:text-cyan-300 font-medium underline"
                >
                  Customer Support & Complaints Procedure &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="mt-10 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            &copy; 2026 Automation Solutions (Pty) Ltd. All rights reserved. Governed by the laws of the Republic of South Africa.
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-neutral-400">Payment processor tokens only &middot; No card details held</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
