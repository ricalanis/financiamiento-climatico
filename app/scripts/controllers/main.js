'use strict';

/**
 * @ngdoc function
 * @name financiamientoClimaticoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the financiamientoClimaticoApp
 */
angular.module('financiamientoClimaticoApp')
  .controller('MainCtrl', ['settingsFactory', function (settingsFactory) {

    console.log(settingsFactory);

    this.years = settingsFactory.map.yearsOptions;
    this.financing = settingsFactory.map.financingOptions;
    this.focus = settingsFactory.map.focusOptions;

    this.filters = {
      year: null,
      financing: null,
      focus: null
    }
  }]);
