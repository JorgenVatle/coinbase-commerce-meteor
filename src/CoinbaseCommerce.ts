import { HTTP } from 'meteor/http';
import { Meteor } from 'meteor/meteor';

import * as Crypto from 'crypto';
import { ChargeResource, CreateACharge } from "./CoinbaseCommerceInterfaces";

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
    protected request(method: string, path: string, data?: any): any {
        return HTTP.call(method, this.buildUrl(path), {
            data,
            headers: {
                'X-CC-Api-Key': this.api.key,
                'X-CC-Version': this.api.version,
            },
        }).data;
    }

    /**
     * Create a charge.
     *
     * @param charge
     */
    public createCharge(charge: CreateACharge): ChargeResource {
        return this.request('POST', '/charges', charge).data;
    }

    /**
     * Retrieve a charge.
     *
     * @param id
     */
    public showCharge(id: string): ChargeResource {
        return this.request('GET', `/charges/${id}`).data;
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