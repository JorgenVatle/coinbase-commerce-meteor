// @ts-ignore
import { HTTP } from 'meteor/http';
// @ts-ignore
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
    public constructor(key: string, secret?: string, version = '2018-03-22', url = 'https://api.commerce.coinbase.com/') {
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
        return this.request('POST', '/charges', charge);
    }

    /**
     * Retrieve a charge.
     *
     * @param id
     */
    public showCharge(id: string): ChargeResource {
        return this.request('GET', `/charges/${id}`);
    }

    /**
     * Validate the given webhook request.
     *
     * @param request
     */
    public validateWebhook(request: FormattedRequest) {
        const signature = request.headers['X-CC-Webhook-Signature'];

        if (!signature) {
            throw this.exception('No webhook signature in request object!');
        }

        if (this.hmac(request.body) !== signature) {
            throw this.exception('Invalid webhook signature!');
        }
    }
}