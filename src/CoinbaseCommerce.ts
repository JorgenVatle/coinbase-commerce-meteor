import { fetch, Headers } from 'meteor/fetch';
import { Meteor } from 'meteor/meteor';

import {
    ChargeResource,
    CheckoutResource,
    CreateACharge,
    CreateAnInvoice,
    InvoiceResource,
} from './CoinbaseCommerceInterfaces';

type FormattedRequest = {
    headers: any,
    body: any,
}

export default class CoinbaseCommerce {

    /**
     * Commerce API settings.
     */
    private api: {
        key: string,
        secret?: string,
        version: string,
        url: string,
    };

    /**
     * Coinbase Commerce constructor.
     *
     * @param key
     * @param secret
     * @param version
     * @param url
     */
    public constructor(
        key: string = Meteor.settings.coinbase.key,
        secret: string = Meteor.settings.coinbase.secret,
        version: string = Meteor.settings.coinbase.version || '2018-03-22',
        url: string = Meteor.settings.coinbase.url || 'https://api.commerce.coinbase.com/'
    ) {
        this.api = { key, version, url, secret };
    }

    /**
     * Builds a path to the API.
     *
     * @param path
     */
    protected buildUrl(path: string): string {
        return this.api.url + path.replace(/^\/+/, '');
    }

    /**
     * Hash HMAC of the given value.
     *
     * @param value
     * @param secret
     */
    protected hmac(value: any, secret = this.api.secret): string {
        if (!Meteor.isServer) {
            throw new Meteor.Error('server_only', 'This method can only run on the server')
        }
        const Crypto = require('crypto');
        return Crypto.createHmac('sha256', secret).update(value).digest('hex');
    }

    /**
     * Throws a new Meteor.Error
     *
     * @param message
     */
    protected exception(message: string) {
        return new Meteor.Error('CoinbaseCommerce', message);
    }

    /**
     * Send a request to the API.
     *
     * @param method
     * @param path
     * @param data
     * @returns {object}
     */
    protected request<TResponse>(method: string, path: string, data?: unknown): TResponse {
        const responseData = fetch(this.buildUrl(path), {
            method,
            headers: new Headers({
                'Content-Type': 'application/json',
                'User-Agent': 'Meteor/v2 (coinbase-commerce-meteor@1.3.1)',
                'X-CC-Api-Key': this.api.key,
                'X-CC-Version': this.api.version,
            }),
            body: JSON.stringify(data),
        }).then((response) => response.json());
        
        // @ts-expect-error Meteor is missing type definitions for v3
        if (!Meteor.isFibersEnabled) {
            // @ts-expect-error Yields a promise and not the generic type
            return responseData;
        }
        
        // @ts-expect-error Meteor is missing type definitions for Fibers' Promise.await() method
        return Promise.await(responseData);
    }

    /**
     * Create a charge.
     *
     * @param charge
     */
    public createCharge(charge: CreateACharge): ChargeResource {
        return this.request<ChargeResource>('POST', '/charges', charge);
    }

    /**
     * Create a checkout.
     *
     * @param invoice
     */
    public createInvoice(invoice: CreateAnInvoice): InvoiceResource {
        return this.request<InvoiceResource>('POST', '/invoices', invoice);
    }

    /**
     * Retrieve a charge.
     *
     * @param id
     */
    public showCharge(id: string): ChargeResource {
        return this.request<ChargeResource>('GET', `/charges/${id}`);
    }

    /**
     * Validate the given webhook request.
     *
     * @param request
     */
    public validateWebhook(request: FormattedRequest) {
        const signature = request.headers['x-cc-webhook-signature'];
        const body = typeof request.body === 'string'
            ? request.body
            : JSON.stringify(request.body);

        if (!signature) {
            throw this.exception('No webhook signature in request object!');
        }

        if (!body) {
            throw this.exception('Missing request body for webhook validation!')
        }

        if (this.hmac(body) !== signature) {
            throw this.exception('Invalid webhook signature!');
        }
    }

    /**
     * Checks if the given request is a valid Commerce webhook.
     *
     * @param request
     */
    public isValidWebhook(request: FormattedRequest): boolean {
        try {
            return this.validateWebhook(request) === undefined;
        } catch (error) {
            return false;
        }
    }
}