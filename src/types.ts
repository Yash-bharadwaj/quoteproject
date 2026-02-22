export interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unit: 'sqft' | 'rft' | 'nos' | 'set' | 'ls';
  rate: number;
  total: number;
}

export interface ClientDetails {
  name: string;
  address: string;
  phone: string;
  projectType: string;
  quoteDate: string;
  quoteNumber: string;
}

export interface QuoteData {
  client: ClientDetails;
  items: QuoteItem[];
  discount: number; // percentage
  showDiscount: boolean;
  gst: number; // percentage
  showGST: boolean;
  advance: number;
  balance: number;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  grandTotal: number;
}
