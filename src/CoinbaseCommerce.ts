import { HTTP } from 'meteor/http';

export default class CoinbaseCommerce {

    /**
     * Commerce API Key.
     *
     * @private
     */
    private apiKey: string;

    /**
     * Commerce API Version
     *
     * @link https://commerce.coinbase.com/docs/api/#introduction
     */
    protected apiVersion;

    /**
     * Commerce API URL.
     *
     * @protected
     * @type {string}
     */
    protected apiUrl: string = 'https://api.commerce.coinbase.com/';

    /**
     * Coinbase Commerce constructor.
     *
     * @param apiKey
     * @param apiVersion
     */
    public constructor(apiKey, apiVersion = '2018-03-22') {
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
    protected buildUrl(path) {
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
    protected request(method, path, data, options) {
        return HTTP.call(method, path, Object.assign({
            headers: {
                'X-CC-Api-Key': this.apiKey,
                'X-CC-Version': this.apiVersion,
            },
            url: this.buildUrl(path),
            data,
        }, options)).data;
    }

}