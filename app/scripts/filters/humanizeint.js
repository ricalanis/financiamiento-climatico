'use strict';

/**
 * @ngdoc filter
 * @name financiamientoClimaticoApp.filter:humanizeInvestment
 * @function
 * @description
 * # humanizeInvestment
 * Filter in the financiamientoClimaticoApp.
 */
angular.module('financiamientoClimaticoApp')
  .filter('humanizeInt', function () {
    return function (input) {
      return Humanize.formatNumber( input );
    };
  });
