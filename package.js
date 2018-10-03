Package.describe({
  name: 'jorgenvatle:coinbase-commerce-meteor',
  version: '1.0.0',
  summary: 'A wrapper for Coinbase Commerce\'s REST API',
  git: 'https://github.com/JorgenVatle/coinbase-commerce-meteor.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');
  api.use('ecmascript');
  api.mainModule('dist/CoinbaseCommerce.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('jorgenvatle:coinbase-commerce-meteor');
  api.addFiles('tests/data/index.json');
  api.mainModule('tests/coinbase-commerce.test.js');
});
