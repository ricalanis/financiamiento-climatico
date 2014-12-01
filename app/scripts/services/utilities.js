'use strict';

/**
 * @ngdoc service
 * @name financiamientoClimaticoApp.utilities
 * @description
 * # utilities
 * Factory in the financiamientoClimaticoApp.
 */
angular.module('financiamientoClimaticoApp')
  .factory('Utilities', function () {
    return {
      applyFilterToRecord: function(filterValue, recordPropertyValue) {
        return  filterValue === null ||
        angular.equals(recordPropertyValue, filterValue);
      },
      applyStateFilter: function(filterValue, recordPropertyValue) {
        var recordPropertyValue = recordPropertyValue.toLowerCase();
        return  filterValue === null ||
        (filterValue.toLowerCase().indexOf(recordPropertyValue) !== -1);
      }
    };
  });
