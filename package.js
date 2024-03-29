Package.describe({
  name: 'jorgenvatle:coinbase-commerce-meteor',
  version: '1.3.3',
  summary: 'A wrapper for Coinbase Commerce\'s REST API',
  git: 'https://github.com/JorgenVatle/coinbase-commerce-meteor.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom(['2.5', '2.15']);
  api.use('zodern:types@1.0.11');
  api.use('typescript');
  api.use('ecmascript');
  api.mainModule('src/CoinbaseCommerce.ts', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('jorgenvatle:coinbase-commerce-meteor');
  api.addAssets('tests/data/index.json', 'server');
  api.mainModule('tests/coinbase-commerce.test.js');
});
