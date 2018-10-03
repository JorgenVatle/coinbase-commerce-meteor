export interface Money {
    amount: string,
    currency: 'USD', // Todo: extend
}

export interface CreateACharge {
    name: string,
    description: string,
    pricing_type: 'no_price' | 'fixed_price',
    local_price?: Money;
    metadata?: any,
    redirect_url?: string,
}