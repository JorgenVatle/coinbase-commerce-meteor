import { Tinytest } from "meteor/tinytest";
import CoinbaseCommerce from "meteor/jorgenvatle:coinbase-commerce-meteor";

const Commerce = new CoinbaseCommerce();
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

Tinytest.add('Throw exception for invalid webhook', (test) => {
    test.throws(() => {
        Commerce.validateWebhook(TestData.webhooks.invalid);
    }, 'Invalid webhook signature! [CoinbaseCommerce]');
});

Tinytest.add('Validate webhooks with booleans', (test) => {
    test.isTrue(Commerce.isValidWebhook(TestData.webhooks.valid));
    test.isFalse(Commerce.isValidWebhook(TestData.webhooks.invalid));
});

Tinytest.add('Can create invoices', (test) => {
    const invoice = Commerce.createInvoice({
        business_name: 'My Business',
        customer_email: 'john@doe.com',
        customer_name: 'John Doe',
        local_price: {
            currency: 'USD',
            amount: '499.00',
        },
        memo: 'License Renewal (1 year)'
    });

    test.isNotNull(invoice.id, 'Invoice ID');
    test.equal(invoice.memo, 'License Renewal (1 year)');
})