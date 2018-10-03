type Payments = Array<any>

type PricingType = 'no_price' | 'fixed_price'

type Timestamp = string;

type Timeline = Array<TimelineEntry>

type CryptoCurrency = 'BTC' | 'ETH' | 'ETC' | 'BCH' | 'LTC'

type FiatCurrency = 'USD' | 'EUR' | 'GBP'

interface TimelineEntry {
    time: Timestamp,
    status: 'NEW' | 'PENDING' | 'CONFIRMED' | 'UNRESOLVED' | 'RESOLVED',
    context?: 'UNDERPAID',
}

interface Pricing {
    local: Money,
    bitcoin: Money,
    ethereum: Money,
    litecoin: Money,
    bitcoin_cash: Money,
    ethereum_classic: Money,
}

interface Addresses {
    bitcoin: string,
    ethereum: string,
    litecoin: string,
    bitcoin_cash: string,
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