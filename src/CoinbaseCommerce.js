import { HTTP } from 'meteor/http';

export default class CoinbaseCommerce {

    /**
     * Commerce API URL.
     *
     * @protected
     * @type {string}
     */
    apiUrl = 'https://api.commerce.coinbase.com/';

    /**
     * Commerce API Key.
     *
     * @private
     */
    apiKey;

    /**
     * Commerce API Version
     *
     * @link https://commerce.coinbase.com/docs/api/#introduction
     */
    apiVersion;

    /**
     * Coinbase Commerce constructor.
     *
     * @param apiKey
     * @param apiVersion
     */
    constructor(apiKey, apiVersion = '2018-03-22') {
        this.apiKey = apiKey;
        this.apiVersion = apiVersion;
    }

    /**
     * Builds a path to the API.
     *
     * @protected
     * @param path
     * @returns {string}
     */
    buildUrl(path) {
        return this.apiUrl + path.replace(/^\/+/, '');
    }

    /**
     * Send a request to the API.
     *
     * @protected
     * @param method
     * @param path
     * @param data
     * @param options
     * @returns {object}
     */
    request(method, path, data, options) {
        return HTTP.call(method, path, Object.assign({
            url: this.buildUrl(path),
            data,
        }, options)).data;
    }

}