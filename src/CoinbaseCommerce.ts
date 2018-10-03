import { HTTP } from 'meteor/http';

export default class CoinbaseCommerce {

    /**
     * Commerce API settings.
     */
    private api: {
        key: string,
        version: string,
        url: string,
    };

    /**
     * Coinbase Commerce constructor.
     *
     * @param key
     * @param version
     * @param url
     */
    public constructor(key, version = '2018-03-22', url = 'https://api.commerce.coinbase.com/') {
        this.api = { key, version, url };
    }

    /**
     * Builds a path to the API.
     *
     * @param path
     */
    protected buildUrl(path): string {
        return this.api.url + path.replace(/^\/+/, '');
    }

    /**
     * Send a request to the API.
     *
     * @param method
     * @param path
     * @param data
     * @returns {object}
     */
    protected request(method, path, data): any {
        return HTTP.call(method, path, {
            headers: {
                'X-CC-Api-Key': this.api.key,
                'X-CC-Version': this.api.version,
            },
            url: this.buildUrl(path),
            data,
        }).data;
    }

}