/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomePage } from './components/home/HomePage';
import { TemplateLibrary } from './components/templates/TemplateLibrary';
import { DesignEditor } from './components/editor/DesignEditor';
import { MyDesignsView } from './components/my-designs/MyDesignsView';
import { PricingView } from './components/pricing/PricingView';
import { AccountPortal } from './components/account/AccountPortal';
import { SupportPage } from './components/support/SupportPage';
import { TermsAndConditions } from './components/legal/TermsAndConditions';
import { RefundPolicy } from './components/legal/RefundPolicy';
import { PrivacyPolicyPOPIA } from './components/legal/PrivacyPolicyPOPIA';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CheckoutModal } from './components/pricing/CheckoutModal';

const MainContent: React.FC = () => {
  const { activeView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 font-sans">
      <Navigation />

      <main className="flex-1 flex flex-col">
        {activeView === 'home' && <HomePage />}
        {activeView === 'templates' && <TemplateLibrary />}
        {activeView === 'editor' && <DesignEditor />}
        {activeView === 'my-designs' && <MyDesignsView />}
        {activeView === 'pricing' && <PricingView />}
        {activeView === 'account' && <AccountPortal />}
        {activeView === 'support' && <SupportPage />}
        {activeView === 'terms' && <TermsAndConditions />}
        {activeView === 'refunds' && <RefundPolicy />}
        {activeView === 'privacy' && <PrivacyPolicyPOPIA />}
        {activeView === 'admin' && <AdminDashboard />}
      </main>

      {/* Show footer on all non-editor views to preserve full-bleed canvas space */}
      {activeView !== 'editor' && <Footer />}

      {/* Global Checkout Modal */}
      <CheckoutModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
