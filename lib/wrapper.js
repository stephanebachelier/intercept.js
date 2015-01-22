(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore'], function (_) {
      return factory(_);
    });
  }
  else if (typeof exports !== 'undefined') {
    module.exports = factory(require('underscore'));
  }
  else {
    factory(root._);
  }
}(this, function(_) {
  'use strict';

  // @include intercept.js

  return Intercept;
}));
