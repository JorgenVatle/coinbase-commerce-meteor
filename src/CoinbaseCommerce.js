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
     * Coinbase Commerce constructor.
     *
     * @param apiKey
     */
    constructor(apiKey) {
        this.apiKey = apiKey;
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
     * @param method
     * @param path
     * @param data
     * @param options
     * @returns {object}
     */
    request(method, path, data, options) {
        return HTTP.call(method, path, Object.assign({
            url: this.apiUrl +
            data,
        }, options)).data;
    }

}