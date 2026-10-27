export type CanvasPresetType = 
  | 'logo' 
  | 'social-square' 
  | 'social-story' 
  | 'flyer' 
  | 'poster' 
  | 'business-card' 
  | 'invitation' 
  | 'ad-banner';

export interface CanvasDimensions {
  width: number;
  height: number;
  name: string;
  category: CanvasPresetType;
  description: string;
}

export type LayerType = 'text' | 'shape' | 'image';
export type ShapeType = 'rectangle' | 'circle' | 'triangle' | 'star' | 'badge' | 'line';

export interface BaseLayer {
  id: string;
  type: LayerType;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  isLocked?: boolean;
}

export interface TextLayer extends BaseLayer {
  type: 'text';
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: 'normal' | 'bold' | '300' | '500' | '600' | '700' | '800';
  fontStyle: 'normal' | 'italic';
  textAlign: 'left' | 'center' | 'right';
  color: string;
  letterSpacing: number;
  lineHeight: number;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
}

export interface ShapeLayer extends BaseLayer {
  type: 'shape';
  shapeType: ShapeType;
  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  cornerRadius?: number;
}

export interface ImageLayer extends BaseLayer {
  type: 'image';
  src: string;
  alt?: string;
  objectFit?: 'contain' | 'cover' | 'fill';
  filter?: string;
}

export type DesignLayer = TextLayer | ShapeLayer | ImageLayer;

export interface DesignProject {
  id: string;
  title: string;
  category: CanvasPresetType;
  width: number;
  height: number;
  backgroundColor: string;
  backgroundImage?: string;
  layers: DesignLayer[];
  createdAt: string;
  updatedAt: string;
  thumbnailUrl?: string;
}

export type TemplateCategory = 
  | 'all'
  | 'logo' 
  | 'flyer' 
  | 'poster' 
  | 'social-square' 
  | 'business-card' 
  | 'invitation' 
  | 'ad-banner';

export interface TemplateItem {
  id: string;
  title: string;
  category: CanvasPresetType;
  categoryLabel: string;
  tier: 'free' | 'premium';
  description: string;
  downloadsCount: number;
  rating: number;
  previewColor: string;
  isCustomizable: boolean;
  isDownloadable: boolean;
  designData: Omit<DesignProject, 'id' | 'createdAt' | 'updatedAt'>;
}

export type SubscriptionTier = 'free' | 'monthly-premium' | 'annual-unlimited';
export type PlanId = 'annual-unlimited' | 'monthly-premium' | 'template-pack' | 'feature-unlock';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  tier: SubscriptionTier;
  billingCadence: 'monthly' | 'annual' | 'none';
  subscriptionActive: boolean;
  subscriptionRenewalDate?: string;
  hasFeatureUnlock: boolean;
  hasTemplatePack: boolean;
  purchasedPackCount: number;
  designsCount: number;
  status: 'active' | 'suspended';
  suspensionReason?: string;
  marketingConsent: boolean;
  createdAt: string;
}

export interface PlanPricing {
  id: PlanId;
  name: string;
  tagline: string;
  priceZAR: number;
  originalPriceZAR?: number;
  cadenceLabel: string;
  billingType: 'annual' | 'monthly' | 'once-off';
  badge?: string;
  features: string[];
  termsSummary: string;
}

export type SouthAfricanPaymentMethod = 
  | 'payfast-card' 
  | 'ozow-instant-eft' 
  | 'snapscan' 
  | 'zapper' 
  | 'capitec-pay';

export interface TransactionRecord {
  id: string;
  reference: string;
  userId: string;
  userName: string;
  userEmail: string;
  amountZAR: number;
  vatAmountZAR: number;
  netAmountZAR: number;
  planId: PlanId;
  planName: string;
  billingCadence: 'monthly' | 'annual' | 'once-off';
  paymentMethod: SouthAfricanPaymentMethod;
  paymentMethodLabel: string;
  status: 'completed' | 'refunded' | 'failed';
  date: string;
  gatewayTransactionId: string;
  invoiceNumber: string;
  refundReason?: string;
}

export interface TaxInvoice {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  status: 'PAID' | 'REFUNDED' | 'CANCELLED';
  seller: {
    name: string;
    tradingAs: string;
    registrationNumber: string;
    vatNumber: string;
    physicalAddress: string;
    email: string;
    phone: string;
  };
  customer: {
    name: string;
    email: string;
    address: string;
  };
  items: {
    description: string;
    quantity: number;
    unitPriceZAR: number;
    amountZAR: number;
  }[];
  subtotalZAR: number;
  vatRatePercent: number;
  vatAmountZAR: number;
  totalZAR: number;
  paymentReference: string;
  paymentMethod: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  name: string;
  email: string;
  category: 'access_issue' | 'refund_request' | 'billing_inquiry' | 'template_question' | 'privacy_popia' | 'general';
  orderNumber?: string;
  subject: string;
  message: string;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  createdAt: string;
}

export interface PrivacyRequestRecord {
  id: string;
  requestNumber: string;
  requestType: 'access' | 'correction' | 'deletion' | 'objection';
  dataSubjectName: string;
  dataSubjectEmail: string;
  identificationReference: string;
  description: string;
  status: 'pending' | 'in_progress' | 'fulfilled' | 'rejected';
  submittedAt: string;
  resolvedAt?: string;
}
