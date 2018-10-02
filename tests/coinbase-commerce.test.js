import { Tinytest } from "meteor/tinytest";

import { name as packageName } from "meteor/jorgenvatle:coinbase-commerce-meteor";

Tinytest.add('coinbase-commerce-meteor - example', function (test) {
  test.equal(packageName, "coinbase-commerce-meteor");
});
