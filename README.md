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

const Commerce = new CoinbaseCommerce('your-api-key');
```

## Charges

#### [Create charge](https://commerce.coinbase.com/docs/api/#create-a-charge)
```js
const charge = Commerce.charges.create({
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
const charge = Commerce.charges.show('charge-id-goes-here');
```

## Webhooks

#### [Validate webhook](https://commerce.coinbase.com/docs/api/#webhooks)
```js
/**
* Throws a new Meteor.Error exception if the given request is invalid. 
*/
Commerce.webhooks.validate(req);
```

With Picker:
```js
Picker.route('/listeners/coinbase', (params, req, res) => {
    Commerce.webhooks.validate(req);
    
    // Handle the webhook
});
```

## License
This repository is licensed under the ISC license.

Copyright (c) 2018, Jørgen Vatle.