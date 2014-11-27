'use strict';

/**
 * @ngdoc service
 * @name financiamientoClimaticoApp.settings
 * @description
 * # settings
 * Factory in the financiamientoClimaticoApp.
 */
angular.module('financiamientoClimaticoApp')
  .factory('SettingsFactory', ['Api', function (Api) {
    var map = {
      yearsOptions: [2012, 2013, 2014],
      financingOptions: ['financing_option 1', 'financing_option 2', 'financing_option 3'],
      focusOptions: ['scope_option 1', 'scope_option 2', 'scope_option 3'],
    };

    Api.fetchDataset();

    return {
      map: map
    };
  }]);
