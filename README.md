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
