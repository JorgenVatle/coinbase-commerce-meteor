import { Tinytest } from "meteor/tinytest";

import CoinbaseCommerce from "meteor/jorgenvatle:coinbase-commerce-meteor";
const config = Meteor.settings.coinbase;
const Commerce = new CoinbaseCommerce(config.key, config.secret);


Tinytest.add('Can create new charges', function (test) {
    const name = 'The Sovereign Individual';

    const charge = Commerce.createCharge({
      name,
      description: 'Mastering the Transition to the Information Age',
      pricing_type: 'fixed_price',
      local_price: {
          amount: '100.00',
          currency: 'USD'
      },
    });

    test.equal(charge.name, name);
});
