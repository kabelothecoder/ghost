import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Sparkles, User, Settings } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { activeView, setActiveView, currentUser, setCurrentUser, openCheckout } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element brand wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setActiveView('home')} 
              className="text-left font-display text-lg sm:text-xl font-bold tracking-tight text-neutral-900 whitespace-nowrap shrink-0 hover:text-neutral-700 transition-colors"
            >
              Automation Solutions
            </button>
            <span className="hidden sm:inline-block text-xs font-mono text-neutral-400">ZA</span>
          </div>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
            <button
              onClick={() => setActiveView('home')}
              className={`hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeView === 'home' ? 'border-neutral-900 text-neutral-900 font-semibold' : 'border-transparent'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveView('templates')}
              className={`hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeView === 'templates' ? 'border-neutral-900 text-neutral-900 font-semibold' : 'border-transparent'
              }`}
            >
              Templates
            </button>
            <button
              onClick={() => setActiveView('editor')}
              className={`hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeView === 'editor' ? 'border-neutral-900 text-neutral-900 font-semibold' : 'border-transparent'
              }`}
            >
              Design Studio
            </button>
            <button
              onClick={() => setActiveView('my-designs')}
              className={`hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeView === 'my-designs' ? 'border-neutral-900 text-neutral-900 font-semibold' : 'border-transparent'
              }`}
            >
              My Designs
            </button>
            <button
              onClick={() => setActiveView('pricing')}
              className={`hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeView === 'pricing' ? 'border-neutral-900 text-neutral-900 font-semibold' : 'border-transparent'
              }`}
            >
              Plans & Pricing
            </button>
            <button
              onClick={() => setActiveView('support')}
              className={`hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeView === 'support' ? 'border-neutral-900 text-neutral-900 font-semibold' : 'border-transparent'
              }`}
            >
              Support & Complaints
            </button>
            <button
              onClick={() => setActiveView('privacy')}
              className={`hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeView === 'privacy' || activeView === 'terms' || activeView === 'refunds' ? 'border-neutral-900 text-neutral-900 font-semibold' : 'border-transparent'
              }`}
            >
              POPIA & Legal
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCurrentUser(prev => ({ ...prev, role: prev.role === 'admin' ? 'user' : 'admin' }))}
              title={`Switch role (Currently ${currentUser.role})`}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded border border-neutral-200 text-neutral-600 hover:bg-neutral-100 transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{currentUser.role === 'admin' ? 'Admin Mode' : 'Customer'}</span>
            </button>

            {currentUser.role === 'admin' && (
              <button
                onClick={() => setActiveView('admin')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  activeView === 'admin' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                }`}
              >
                Admin Console
              </button>
            )}

            {currentUser.tier === 'free' ? (
              <button
                onClick={() => openCheckout('annual-unlimited', 'annual')}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors whitespace-nowrap shrink-0 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Get Unlimited (R3,799)</span>
              </button>
            ) : (
              <button
                onClick={() => setActiveView('account')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                  activeView === 'account' 
                    ? 'bg-neutral-900 text-white border-neutral-900' 
                    : 'bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                <User className="w-3.5 h-3.5 text-neutral-600" />
                <span>Dashboard & Billing</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile secondary navigation strip */}
        <div className="flex md:hidden items-center justify-between py-2 border-t border-neutral-100 overflow-x-auto gap-4 text-xs font-medium text-neutral-600 scrollbar-none">
          <button onClick={() => setActiveView('home')} className={activeView === 'home' ? 'text-neutral-900 font-bold' : ''}>Home</button>
          <button onClick={() => setActiveView('templates')} className={activeView === 'templates' ? 'text-neutral-900 font-bold' : ''}>Templates</button>
          <button onClick={() => setActiveView('editor')} className={activeView === 'editor' ? 'text-neutral-900 font-bold' : ''}>Editor</button>
          <button onClick={() => setActiveView('my-designs')} className={activeView === 'my-designs' ? 'text-neutral-900 font-bold' : ''}>My Designs</button>
          <button onClick={() => setActiveView('pricing')} className={activeView === 'pricing' ? 'text-neutral-900 font-bold' : ''}>Pricing</button>
          <button onClick={() => setActiveView('account')} className={activeView === 'account' ? 'text-neutral-900 font-bold' : ''}>Dashboard</button>
          <button onClick={() => setActiveView('support')} className={activeView === 'support' ? 'text-neutral-900 font-bold' : ''}>Support</button>
          <button onClick={() => setActiveView('privacy')} className={activeView === 'privacy' ? 'text-neutral-900 font-bold' : ''}>POPIA</button>
          {currentUser.role === 'admin' && (
            <button onClick={() => setActiveView('admin')} className={activeView === 'admin' ? 'text-neutral-900 font-bold' : ''}>Admin</button>
          )}
        </div>
      </div>
    </header>
  );
};
