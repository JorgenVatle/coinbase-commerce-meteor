import { Tinytest } from "meteor/tinytest";
import CoinbaseCommerce from "meteor/jorgenvatle:coinbase-commerce-meteor";

const config = Meteor.settings.coinbase;
const Commerce = new CoinbaseCommerce(config.key, config.secret);
const TestData = JSON.parse(Assets.getText('tests/data/index.json'));

Tinytest.add('Create new charge', (test) => {
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

Tinytest.add('Create and fetch charge', (test) => {
    const name = 'Create and fetch charge';

    const charge = Commerce.createCharge({
        name,
        description: 'Mastering the Transition to the Information Age',
        pricing_type: 'fixed_price',
        local_price: {
            amount: '100.00',
            currency: 'USD'
        },
    });

    test.isNotNull(charge.id, 'New charge ID');
    test.equal(charge.name, Commerce.showCharge(charge.id).name, 'Created charge name matches fetched charge');
});

Tinytest.add('Validate valid webhook', (test) => {
    test.isUndefined(Commerce.validateWebhook(TestData.webhooks.valid));
});