'use strict';

/**
 * @ngdoc function
 * @name financiamientoClimaticoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the financiamientoClimaticoApp
 */
angular.module('financiamientoClimaticoApp')
  .controller('MainCtrl', ['SettingsFactory', function (SettingsFactory) {

    console.log(SettingsFactory);

    this.years = SettingsFactory.map.yearsOptions;
    this.financing = SettingsFactory.map.financingOptions;
    this.focus = SettingsFactory.map.focusOptions;

    this.filters = {
      year: null,
      financing: null,
      focus: null
    }
  }]);
