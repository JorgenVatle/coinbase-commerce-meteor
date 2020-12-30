Package.describe({
  name: 'jorgenvatle:coinbase-commerce-meteor',
  version: '1.2.0',
  summary: 'A wrapper for Coinbase Commerce\'s REST API',
  git: 'https://github.com/JorgenVatle/coinbase-commerce-meteor.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');
  api.use('ecmascript');
  api.addAssets('dist/CoinbaseCommerce.d.ts', 'server');
  api.addAssets('dist/CoinbaseCommerceInterfaces.d.ts', 'server');
  api.mainModule('dist/CoinbaseCommerce.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('jorgenvatle:coinbase-commerce-meteor');
  api.addAssets('tests/data/index.json', 'server');
  api.mainModule('tests/coinbase-commerce.test.js');
});
