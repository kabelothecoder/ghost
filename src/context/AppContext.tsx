import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  DesignProject, 
  DesignLayer, 
  TemplateItem, 
  UserProfile, 
  TransactionRecord, 
  TaxInvoice, 
  SupportTicket, 
  PrivacyRequestRecord,
  CanvasPresetType,
  SouthAfricanPaymentMethod,
  SubscriptionTier,
  PlanId
} from '../types';
import { INITIAL_TEMPLATES, CANVAS_PRESETS } from '../data/initialTemplates';
import { 
  INITIAL_USER, 
  INITIAL_TRANSACTIONS, 
  INITIAL_INVOICES, 
  INITIAL_SUPPORT_TICKETS, 
  INITIAL_PRIVACY_REQUESTS,
  COMPANY_DETAILS,
  PRICING_PLANS
} from '../data/initialData';

export type AppView = 
  | 'home'
  | 'templates' 
  | 'editor' 
  | 'my-designs' 
  | 'pricing' 
  | 'account' 
  | 'support' 
  | 'terms' 
  | 'privacy' 
  | 'refunds' 
  | 'admin';

interface CheckoutState {
  isOpen: boolean;
  planId: PlanId;
  billingCadence: 'monthly' | 'annual' | 'once-off';
  templateId?: string;
  templateTitle?: string;
}

interface AppContextType {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  currentUser: UserProfile;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  allUsers: UserProfile[];
  updateUserTier: (userId: string, tier: SubscriptionTier) => void;
  toggleUserSuspension: (userId: string, reason?: string) => void;
  
  // Designs & Editor
  activeDesign: DesignProject;
  setActiveDesign: React.Dispatch<React.SetStateAction<DesignProject>>;
  userDesigns: DesignProject[];
  saveCurrentDesign: () => void;
  createNewDesign: (category?: CanvasPresetType) => void;
  openTemplateInEditor: (template: TemplateItem) => void;
  duplicateDesign: (designId: string) => void;
  renameDesign: (designId: string, newTitle: string) => void;
  deleteDesign: (designId: string) => void;
  loadDesign: (designId: string) => void;
  
  // Templates
  templates: TemplateItem[];
  addTemplate: (template: TemplateItem) => void;
  deleteTemplate: (templateId: string) => void;
  toggleTemplateTier: (templateId: string) => void;

  // Transactions & Invoices
  transactions: TransactionRecord[];
  invoices: TaxInvoice[];
  selectedInvoice: TaxInvoice | null;
  setSelectedInvoice: (invoice: TaxInvoice | null) => void;
  processPaymentSuccess: (
    planId: PlanId, 
    billingCadence: 'monthly' | 'annual' | 'once-off', 
    method: SouthAfricanPaymentMethod,
    amountZAR: number,
    templateTitle?: string
  ) => { transaction: TransactionRecord; invoice: TaxInvoice };
  processRefund: (transactionId: string, reason: string) => void;
  resolveAccessProblem: (transactionId: string) => void;

  // Checkout modal
  checkoutState: CheckoutState;
  openCheckout: (planId: PlanId, billingCadence?: 'monthly' | 'annual' | 'once-off', templateId?: string, templateTitle?: string) => void;
  closeCheckout: () => void;

  // Support & POPIA
  supportTickets: SupportTicket[];
  submitSupportTicket: (ticket: Omit<SupportTicket, 'id' | 'ticketNumber' | 'status' | 'createdAt'>) => string;
  updateTicketStatus: (ticketId: string, status: SupportTicket['status']) => void;
  privacyRequests: PrivacyRequestRecord[];
  submitPrivacyRequest: (req: Omit<PrivacyRequestRecord, 'id' | 'requestNumber' | 'status' | 'submittedAt' | 'resolvedAt'>) => string;
  updatePrivacyRequestStatus: (id: string, status: PrivacyRequestRecord['status']) => void;
  updateMarketingConsent: (consent: boolean) => void;
  cancelSubscription: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const createDefaultDesign = (): DesignProject => {
  const preset = CANVAS_PRESETS['social-square'];
  return {
    id: 'design-' + Date.now(),
    title: 'Untitled Creative Project',
    category: 'social-square',
    width: preset.width,
    height: preset.height,
    backgroundColor: '#FFFFFF',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    layers: [
      {
        id: 'layer-heading',
        type: 'text',
        name: 'Heading Layer',
        text: 'YOUR IDEAS. YOUR DESIGNS.',
        fontFamily: 'Plus Jakarta Sans',
        fontSize: 34,
        fontWeight: '800',
        fontStyle: 'normal',
        textAlign: 'center',
        color: '#0F172A',
        letterSpacing: 2,
        lineHeight: 1.2,
        x: 100,
        y: 280,
        width: 600,
        height: 60,
        rotation: 0,
        opacity: 1
      },
      {
        id: 'layer-sub',
        type: 'text',
        name: 'Subtitle Layer',
        text: 'Created with Automation Solutions',
        fontFamily: 'DM Sans',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        textAlign: 'center',
        color: '#64748B',
        letterSpacing: 0,
        lineHeight: 1.5,
        x: 100,
        y: 360,
        width: 600,
        height: 40,
        rotation: 0,
        opacity: 1
      },
      {
        id: 'layer-accent',
        type: 'shape',
        name: 'Accent Button',
        shapeType: 'rectangle',
        x: 320,
        y: 430,
        width: 160,
        height: 44,
        rotation: 0,
        opacity: 1,
        fillColor: '#0F172A',
        strokeColor: '#0F172A',
        strokeWidth: 0,
        cornerRadius: 8
      },
      {
        id: 'layer-btn-text',
        type: 'text',
        name: 'Button Label',
        text: 'DISCOVER MORE',
        fontFamily: 'Plus Jakarta Sans',
        fontSize: 12,
        fontWeight: '700',
        fontStyle: 'normal',
        textAlign: 'center',
        color: '#FFFFFF',
        letterSpacing: 1.5,
        lineHeight: 1,
        x: 320,
        y: 445,
        width: 160,
        height: 20,
        rotation: 0,
        opacity: 1
      }
    ]
  };
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<AppView>('home');
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('automationsolutions_v2_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [allUsers, setAllUsers] = useState<UserProfile[]>([INITIAL_USER]);

  const [activeDesign, setActiveDesign] = useState<DesignProject>(createDefaultDesign);

  const [userDesigns, setUserDesigns] = useState<DesignProject[]>(() => {
    const saved = localStorage.getItem('automationsolutions_v2_designs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const [templates, setTemplates] = useState<TemplateItem[]>(INITIAL_TEMPLATES);
  const [transactions, setTransactions] = useState<TransactionRecord[]>(INITIAL_TRANSACTIONS);
  const [invoices, setInvoices] = useState<TaxInvoice[]>(INITIAL_INVOICES);
  const [selectedInvoice, setSelectedInvoice] = useState<TaxInvoice | null>(null);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(INITIAL_SUPPORT_TICKETS);
  const [privacyRequests, setPrivacyRequests] = useState<PrivacyRequestRecord[]>(INITIAL_PRIVACY_REQUESTS);

  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    isOpen: false,
    planId: 'annual-unlimited',
    billingCadence: 'annual'
  });

  useEffect(() => {
    localStorage.setItem('automationsolutions_v2_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('automationsolutions_v2_designs', JSON.stringify(userDesigns));
  }, [userDesigns]);

  const saveCurrentDesign = () => {
    const now = new Date().toISOString();
    const updated = { ...activeDesign, updatedAt: now };
    setActiveDesign(updated);

    setUserDesigns(prev => {
      const idx = prev.findIndex(d => d.id === updated.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = updated;
        return copy;
      } else {
        return [updated, ...prev];
      }
    });

    setCurrentUser(prev => ({
      ...prev,
      designsCount: Math.max(prev.designsCount, userDesigns.length + 1)
    }));
  };

  const createNewDesign = (category: CanvasPresetType = 'social-square') => {
    const preset = CANVAS_PRESETS[category] || CANVAS_PRESETS['social-square'];
    const newDesign: DesignProject = {
      id: 'design-' + Date.now(),
      title: `Untitled ${preset.name}`,
      category,
      width: preset.width,
      height: preset.height,
      backgroundColor: '#FFFFFF',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      layers: []
    };
    setActiveDesign(newDesign);
    setActiveView('editor');
  };

  const openTemplateInEditor = (template: TemplateItem) => {
    const newDesign: DesignProject = {
      ...template.designData,
      id: 'design-' + Date.now(),
      title: `${template.title} (Custom)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setActiveDesign(newDesign);
    setActiveView('editor');
  };

  const duplicateDesign = (designId: string) => {
    const target = userDesigns.find(d => d.id === designId) || (activeDesign.id === designId ? activeDesign : null);
    if (!target) return;
    const duplicated: DesignProject = {
      ...target,
      id: 'design-' + Date.now(),
      title: `${target.title} (Duplicate)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setUserDesigns(prev => [duplicated, ...prev]);
  };

  const renameDesign = (designId: string, newTitle: string) => {
    if (activeDesign.id === designId) {
      setActiveDesign(prev => ({ ...prev, title: newTitle }));
    }
    setUserDesigns(prev => prev.map(d => d.id === designId ? { ...d, title: newTitle, updatedAt: new Date().toISOString() } : d));
  };

  const deleteDesign = (designId: string) => {
    setUserDesigns(prev => prev.filter(d => d.id !== designId));
  };

  const loadDesign = (designId: string) => {
    const found = userDesigns.find(d => d.id === designId);
    if (found) {
      setActiveDesign(found);
      setActiveView('editor');
    }
  };

  const addTemplate = (template: TemplateItem) => {
    setTemplates(prev => [template, ...prev]);
  };

  const deleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
  };

  const toggleTemplateTier = (templateId: string) => {
    setTemplates(prev => prev.map(t => {
      if (t.id === templateId) {
        return { ...t, tier: t.tier === 'free' ? 'premium' : 'free' };
      }
      return t;
    }));
  };

  const openCheckout = (planId: PlanId, billingCadence: 'monthly' | 'annual' | 'once-off' = 'annual', templateId?: string, templateTitle?: string) => {
    setCheckoutState({
      isOpen: true,
      planId,
      billingCadence,
      templateId,
      templateTitle
    });
  };

  const closeCheckout = () => {
    setCheckoutState(prev => ({ ...prev, isOpen: false }));
  };

  const processPaymentSuccess = (
    planId: PlanId,
    billingCadence: 'monthly' | 'annual' | 'once-off',
    method: SouthAfricanPaymentMethod,
    amountZAR: number,
    templateTitle?: string
  ) => {
    const methodLabels: Record<SouthAfricanPaymentMethod, string> = {
      'payfast-card': 'PayFast 3D-Secure Card',
      'ozow-instant-eft': 'Ozow Instant EFT',
      'snapscan': 'SnapScan QR',
      'zapper': 'Zapper QR',
      'capitec-pay': 'Capitec Pay'
    };

    const targetPlan = PRICING_PLANS.find(p => p.id === planId);
    const planName = targetPlan ? targetPlan.name : 'Automation Solutions Plan';

    const vatAmountZAR = Number((amountZAR * (15 / 115)).toFixed(2));
    const netAmountZAR = Number((amountZAR - vatAmountZAR).toFixed(2));
    const invoiceNum = `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowIso = new Date().toISOString();
    const dateShort = nowIso.split('T')[0];

    const newTxn: TransactionRecord = {
      id: 'txn-za-' + Date.now(),
      reference: `AUTO-${Math.floor(100000 + Math.random() * 900000)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      amountZAR,
      vatAmountZAR,
      netAmountZAR,
      planId,
      planName,
      billingCadence,
      paymentMethod: method,
      paymentMethodLabel: methodLabels[method],
      status: 'completed',
      date: nowIso,
      gatewayTransactionId: `GATEWAY_${Math.floor(10000000 + Math.random() * 90000000)}`,
      invoiceNumber: invoiceNum
    };

    const newInvoice: TaxInvoice = {
      invoiceNumber: invoiceNum,
      date: dateShort,
      dueDate: dateShort,
      status: 'PAID',
      seller: COMPANY_DETAILS,
      customer: {
        name: currentUser.name,
        email: currentUser.email,
        address: 'Johannesburg, Gauteng, South Africa'
      },
      items: [
        {
          description: `Automation Solutions - ${planName} (${billingCadence === 'annual' ? '12 Months Unlimited' : billingCadence === 'monthly' ? 'Monthly Access' : 'Once-Off Unlock'})`,
          quantity: 1,
          unitPriceZAR: netAmountZAR,
          amountZAR: netAmountZAR
        }
      ],
      subtotalZAR: netAmountZAR,
      vatRatePercent: 15,
      vatAmountZAR,
      totalZAR: amountZAR,
      paymentReference: newTxn.reference,
      paymentMethod: methodLabels[method]
    };

    setTransactions(prev => [newTxn, ...prev]);
    setInvoices(prev => [newInvoice, ...prev]);

    // Activate permissions based on plan
    if (planId === 'annual-unlimited') {
      const expDate = new Date();
      expDate.setFullYear(expDate.getFullYear() + 1);

      setCurrentUser(prev => ({
        ...prev,
        tier: 'annual-unlimited',
        billingCadence: 'annual',
        subscriptionActive: true,
        subscriptionRenewalDate: expDate.toISOString().split('T')[0],
        hasFeatureUnlock: true,
        hasTemplatePack: true
      }));
    } else if (planId === 'monthly-premium') {
      const expDate = new Date();
      expDate.setMonth(expDate.getMonth() + 1);

      setCurrentUser(prev => ({
        ...prev,
        tier: 'monthly-premium',
        billingCadence: 'monthly',
        subscriptionActive: true,
        subscriptionRenewalDate: expDate.toISOString().split('T')[0],
        hasFeatureUnlock: true
      }));
    } else if (planId === 'template-pack') {
      setCurrentUser(prev => ({
        ...prev,
        hasTemplatePack: true,
        purchasedPackCount: prev.purchasedPackCount + 1
      }));
    } else if (planId === 'feature-unlock') {
      setCurrentUser(prev => ({
        ...prev,
        hasFeatureUnlock: true
      }));
    }

    return { transaction: newTxn, invoice: newInvoice };
  };

  const processRefund = (transactionId: string, reason: string) => {
    setTransactions(prev => prev.map(t => {
      if (t.id === transactionId) {
        return {
          ...t,
          status: 'refunded',
          refundReason: reason
        };
      }
      return t;
    }));

    const txn = transactions.find(t => t.id === transactionId);
    if (txn) {
      setInvoices(prev => prev.map(inv => {
        if (inv.invoiceNumber === txn.invoiceNumber) {
          return { ...inv, status: 'REFUNDED' };
        }
        return inv;
      }));
    }
  };

  const resolveAccessProblem = (transactionId: string) => {
    const txn = transactions.find(t => t.id === transactionId);
    if (!txn) return;
    
    if (txn.planId === 'annual-unlimited' || txn.planId === 'monthly-premium') {
      setCurrentUser(prev => ({
        ...prev,
        tier: txn.planId as SubscriptionTier,
        subscriptionActive: true,
        hasFeatureUnlock: true
      }));
    } else if (txn.planId === 'feature-unlock') {
      setCurrentUser(prev => ({ ...prev, hasFeatureUnlock: true }));
    } else if (txn.planId === 'template-pack') {
      setCurrentUser(prev => ({ ...prev, hasTemplatePack: true }));
    }
  };

  const cancelSubscription = () => {
    setCurrentUser(prev => ({
      ...prev,
      subscriptionActive: false,
      billingCadence: 'none'
    }));
  };

  const updateUserTier = (userId: string, tier: SubscriptionTier) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, tier } : u));
    if (currentUser.id === userId) {
      setCurrentUser(prev => ({ ...prev, tier }));
    }
  };

  const toggleUserSuspension = (userId: string, reason: string = 'Administrative review under terms of service') => {
    setAllUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'active' ? 'suspended' : 'active';
        return {
          ...u,
          status: nextStatus,
          suspensionReason: nextStatus === 'suspended' ? reason : undefined
        };
      }
      return u;
    }));

    if (currentUser.id === userId) {
      setCurrentUser(prev => {
        const nextStatus = prev.status === 'active' ? 'suspended' : 'active';
        return {
          ...prev,
          status: nextStatus,
          suspensionReason: nextStatus === 'suspended' ? reason : undefined
        };
      });
    }
  };

  const submitSupportTicket = (ticket: Omit<SupportTicket, 'id' | 'ticketNumber' | 'status' | 'createdAt'>) => {
    const ticketNumber = `SUP-AUTO-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: SupportTicket = {
      ...ticket,
      id: 'tkt-' + Date.now(),
      ticketNumber,
      status: 'open',
      createdAt: new Date().toISOString()
    };
    setSupportTickets(prev => [newTicket, ...prev]);
    return ticketNumber;
  };

  const updateTicketStatus = (ticketId: string, status: SupportTicket['status']) => {
    setSupportTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status } : t));
  };

  const submitPrivacyRequest = (req: Omit<PrivacyRequestRecord, 'id' | 'requestNumber' | 'status' | 'submittedAt' | 'resolvedAt'>) => {
    const requestNumber = `POPIA-AUTO-${Math.floor(100 + Math.random() * 900)}`;
    const newReq: PrivacyRequestRecord = {
      ...req,
      id: 'dsr-' + Date.now(),
      requestNumber,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    setPrivacyRequests(prev => [newReq, ...prev]);
    return requestNumber;
  };

  const updatePrivacyRequestStatus = (id: string, status: PrivacyRequestRecord['status']) => {
    setPrivacyRequests(prev => prev.map(r => r.id === id ? {
      ...r,
      status,
      resolvedAt: status === 'fulfilled' || status === 'rejected' ? new Date().toISOString() : r.resolvedAt
    } : r));
  };

  const updateMarketingConsent = (consent: boolean) => {
    setCurrentUser(prev => ({ ...prev, marketingConsent: consent }));
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        currentUser,
        setCurrentUser,
        allUsers,
        updateUserTier,
        toggleUserSuspension,
        activeDesign,
        setActiveDesign,
        userDesigns,
        saveCurrentDesign,
        createNewDesign,
        openTemplateInEditor,
        duplicateDesign,
        renameDesign,
        deleteDesign,
        loadDesign,
        templates,
        addTemplate,
        deleteTemplate,
        toggleTemplateTier,
        transactions,
        invoices,
        selectedInvoice,
        setSelectedInvoice,
        processPaymentSuccess,
        processRefund,
        resolveAccessProblem,
        checkoutState,
        openCheckout,
        closeCheckout,
        supportTickets,
        submitSupportTicket,
        updateTicketStatus,
        privacyRequests,
        submitPrivacyRequest,
        updatePrivacyRequestStatus,
        updateMarketingConsent,
        cancelSubscription
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
