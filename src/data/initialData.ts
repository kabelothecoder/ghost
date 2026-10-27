import { PlanPricing, PrivacyRequestRecord, SupportTicket, TaxInvoice, TransactionRecord, UserProfile } from '../types';

export const COMPANY_DETAILS = {
  name: 'Automation Solutions (Pty) Ltd',
  tradingAs: 'Automation Solutions',
  registrationNumber: '2024/182901/07',
  vatNumber: '4980293841',
  physicalAddress: '142 Jan Smuts Avenue, Rosebank, Johannesburg, 2196, South Africa',
  postalAddress: 'PO Box 41208, Craighall, Johannesburg, 2024, South Africa',
  email: 'support@automationsolutions.co.za',
  privacyEmail: 'privacy@automationsolutions.co.za',
  phone: '+27 (0) 11 880 4390',
  informationOfficer: 'Mr. Sipho Ndlovu (Head of Governance & Data Privacy)',
  deputyInformationOfficer: 'Ms. Lerato Molefe (Legal Counsel)'
};

export const PRICING_PLANS: PlanPricing[] = [
  {
    id: 'annual-unlimited',
    name: 'Annual Unlimited Access',
    tagline: 'Full unlimited design creation for 12 months without monthly commitments.',
    priceZAR: 3799,
    originalPriceZAR: 4800,
    cadenceLabel: '/ year',
    billingType: 'annual',
    badge: 'Save R1,001 · Discounted from R4,800',
    features: [
      'Unlimited design creation for 12 full months (subject to fair-use rules)',
      'Complete access to full template library (15+ curated South African categories)',
      'Create and edit designs online directly in the browser',
      'Customize colours, text, fonts, layouts, and images',
      'Save unlimited designs to your personal dashboard',
      'Download completed designs in supported formats (PNG, JPG, PDF, SVG)',
      'Access all premium design resources included in the plan',
      'Special discount: R3,799/yr (reduced from standard R4,800/yr)',
      'No monthly payment required — single annual payment',
      'Automatically expires after 12 months unless renewed'
    ],
    termsSummary: 'Paid annually at R3,799 (discounted from R4,800, Save R1,001). Automatically expires after 12 months unless you choose to renew. No surprise monthly deductions.'
  },
  {
    id: 'monthly-premium',
    name: 'Monthly Premium Access',
    tagline: 'Flexible month-to-month access with premium design tools and easy cancellation.',
    priceZAR: 399,
    cadenceLabel: '/ month',
    billingType: 'monthly',
    badge: 'Flexible Monthly',
    features: [
      'Access to the premium browser design editor',
      'Access to included templates and graphic design resources',
      'Create, customize, save, and download designs',
      'Access premium editing features and shape tools',
      'High-resolution multi-format digital export',
      'Monthly billing with a clear, 1-click cancellation option',
      'Access remains active until the end of the paid billing period after cancellation'
    ],
    termsSummary: 'Recurring monthly billing. Cancel anytime in your account settings; access remains active until the end of your billing cycle.'
  },
  {
    id: 'template-pack',
    name: '15 Templates Pack',
    tagline: 'Immediate once-off digital access to 15 professional design templates.',
    priceZAR: 150,
    cadenceLabel: 'once-off',
    billingType: 'once-off',
    badge: 'Pay Once, Keep Forever',
    features: [
      'Purchase 15 versatile design templates (Logos, Flyers, Posters, Social, Cards, Invitations, Ads)',
      'Templates are BOTH fully editable online and downloadable immediately',
      'Immediate digital access granted after verified payment',
      'All 15 templates clearly previewed before checkout',
      'Customize text, brand colors, fonts, and customer logo uploads',
      'No recurring monthly fees or expiry'
    ],
    termsSummary: 'One-off payment of R150. Digital access to 15 templates is permanently credited to your Automation Solutions account.'
  },
  {
    id: 'feature-unlock',
    name: 'Feature Unlock',
    tagline: 'Permanent account upgrade to unlock high-resolution print & vector export.',
    priceZAR: 100,
    cadenceLabel: 'once-off',
    billingType: 'once-off',
    badge: 'Permanent Account Upgrade',
    features: [
      '300 DPI Commercial Print-Ready PDF export',
      'Scalable Vector Graphics (SVG) code export',
      'Watermark removal on all exported designs',
      'Customer Logo & Asset Cloud Storage (up to 50MB)',
      'Custom Font Upload & Luxury Typography Suite',
      'Permanent lifetime unlock tied to your account (does not expire)',
      'Zero surprise charges — explicit confirmation required'
    ],
    termsSummary: 'One-time R100 charge. Unlocked features are permanently linked to your customer profile for lifetime use.'
  }
];

export const TEMPLATE_PACK_ITEMS = [
  'Cape Roastery Minimalist Emblem (Logo)',
  'Mzansi Summer Craft Fair Flyer (Flyer)',
  'Gauteng Tech & AI Innovation Summit Poster (Poster)',
  'Safari Wilderness Eco-Lodge Social Post (Social)',
  'Executive Legal & Advisory Business Card (Card)',
  'Vineyard Gala Dinner & Wine Tasting Invitation (Invitation)',
  'Cyber Monday High-Conversion Promo Banner (Ad)',
  'Johannesburg Artisan Bakery Menu Flyer (Flyer)',
  'Durban Surf & Beach Festival Poster (Poster)',
  'Cape Town Modern Architecture Showcase (Social)',
  'Boutique Fitness & Yoga Studio Card (Card)',
  'Golden Wedding Anniversary Gala Invitation (Invitation)',
  'Pretoria Jacaranda Spring Festival Flyer (Flyer)',
  'Fintech Venture Capital Pitch Banner (Ad)',
  'African Botanical Wellness Brand Emblem (Logo)'
];

export const INITIAL_USER: UserProfile = {
  id: 'usr-current',
  name: 'Kabelo Mzwakhe',
  email: 'kabelomzwakhe@gmail.com',
  role: 'user',
  tier: 'free',
  billingCadence: 'none',
  subscriptionActive: false,
  hasFeatureUnlock: false,
  hasTemplatePack: false,
  purchasedPackCount: 0,
  designsCount: 0,
  status: 'active',
  marketingConsent: false,
  createdAt: '2026-10-27'
};

export const INITIAL_TRANSACTIONS: TransactionRecord[] = [];

export const INITIAL_INVOICES: TaxInvoice[] = [];

export const INITIAL_SUPPORT_TICKETS: SupportTicket[] = [];

export const INITIAL_PRIVACY_REQUESTS: PrivacyRequestRecord[] = [];
