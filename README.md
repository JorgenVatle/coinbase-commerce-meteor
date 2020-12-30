# Coinbase Commerce Meteor
A wrapper package for enabling synchronous usage of Coinbase Commerce's REST API.

This package was written up primarily due to scoping issues with the official package
([coinbase-commerce-node](https://www.npmjs.com/package/coinbase-commerce-node)) when used in combination with 
`Meteor.wrapAsync` 

## Installation
```bash
meteor add jorgenvatle:coinbase-commerce-meteor
```

## Setup

#### Import library:
```js
import CoinbaseCommerce from 'meteor/jorgenvatle:coinbase-commerce-meteor';

const Commerce = new CoinbaseCommerce('your-api-key', 'your-webhook-shared-secret');
```
If you add a `coinbase` object to your project's `settings.json`, you can skip the above constructor arguments.

**settings.json**
```json
{
  "coinbase": {
    "key": "Your API key",
    "secret": "Your shared secret"
  }
}
```

**your-script.js**
```js
const Commerce = new CoinbaseCommerce();
```

## Charges

#### [Create charge](https://commerce.coinbase.com/docs/api/#create-a-charge)
```js
const charge = Commerce.createCharge({
    name: 'The Sovereign Individual',
    description: 'Mastering the Transition to the Information Age',
    pricing_type: 'fixed_price',
    local_price: {
        amount: '100.00',
        currency: 'USD'
    },
});
```
#### [Show a charge](https://commerce.coinbase.com/docs/api/#show-a-charge)
```js
const charge = Commerce.showCharge('charge-id-goes-here');
```

## Invoices

#### Create invoice
```js
const invoice = Commerce.createIncoice({
    business_name: 'My Business',
    customer_email: 'john@doe.com',
    customer_name: 'John Doe',
    local_price: {
        currency: 'USD',
        amount: '499.00',
    },
    memo: 'License Renewal (1 year)'
})
```

## Webhooks
It's important that you validate webhooks to ensure the authenticity of the webhook data.
Without validation, an attacker may be able to spoof webhooks in turn allowing them to fulfill orders that aren't
paid for yet.

#### [Validate webhook](https://commerce.coinbase.com/docs/api/#securing-webhooks)
The webhook validator throws a `Meteor.Error` for webhooks that don't pass the validation.
```js
Commerce.validateWebhook(req);
```
Validating with Picker:
```js
Picker.route('/listeners/coinbase', (params, req, res) => {
    Commerce.validateWebhook(req);
    
    // Handle the webhook
});
```
If you'd rather not have exceptions thrown for invalid/unauthorized webhooks, use the boolean equivalent:
```js
if (Commerce.isValidWebhook(req)) {
    // Webhook is valid!
}
```

## Contributing
To start the development environment, you need to copy `settings.example.json` to `settings.json` and add in keys to
your Coinbase Commerce application.

When adding new features, please include tests for them.

#### Build & Test
Running the following command will start up both the TypeScript watcher as well as the test environment.
```bash
npm start
```

## License
This repository is licensed under the ISC license.

Copyright (c) 2018, Jørgen Vatle.