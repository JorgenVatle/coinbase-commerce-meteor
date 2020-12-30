export type Payments = Array<any>

export type PricingType = 'no_price' | 'fixed_price'

export type Timestamp = string;

export type Timeline = Array<TimelineEntry>

export type CryptoCurrency = 'BTC' | 'ETH' | 'ETC' | 'BCH' | 'LTC'

export type FiatCurrency = 'USD' | 'EUR' | 'GBP'

export interface TimelineEntry {
    time: Timestamp,
    status: 'NEW' | 'PENDING' | 'CONFIRMED' | 'UNRESOLVED' | 'RESOLVED',
    context?: 'UNDERPAID',
}

export interface Pricing {
    local: Money,
    bitcoin: Money,
    ethereum: Money,
    litecoin: Money,
    bitcoincash: Money,
    ethereum_classic: Money,
}

export interface Addresses {
    bitcoin: string,
    ethereum: string,
    litecoin: string,
    bitcoincash: string,
    ethereum_classic: string,
}

export interface Money {
    amount: string,
    currency: CryptoCurrency | FiatCurrency,
}

export interface CheckoutResource {
    id: string,
}

export interface ChargeResource {
    id: string,
    resource: 'charge',
    code: string,
    name: string,
    description: string,
    logo_url: string,
    hosted_url: string,
    created_at: Timestamp,
    expires_at: Timestamp,
    confirmed_at: Timestamp,
    checkout: CheckoutResource,
    timeline: Timeline,
    metadata: any,
    pricing_type: PricingType,
    pricing: Pricing,
    addresses: Addresses,
}

export interface CreateACharge {
    name: string,
    description: string,
    pricing_type: PricingType,
    local_price?: Money;
    metadata?: any,
    redirect_url?: string,
}

export interface CreateAnInvoice {
    business_name: string;
    customer_email: string;
    customer_name?: string;
    local_price?: Money;
    memo: string;
}

export interface InvoiceResource extends CreateAnInvoice {
    id: string;
    short_code: string;
    status: 'OPEN' | 'VOID' | 'PAID';
    created_at: string;
    updated_at: string;
}