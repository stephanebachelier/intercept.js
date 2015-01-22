(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['underscore'], factory);
  }
  else if (typeof exports !== 'undefined') {
    module.exports = factory();
  }
  else {
    factory();
  }
}(this, function () {
  'use strict';

  // @include intercept.js

  return Intercept;
}));
