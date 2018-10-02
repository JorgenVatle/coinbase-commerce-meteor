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

## Usage

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