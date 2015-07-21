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
      },
      convertHashtoID: function(countByHash){
        var valueList = [];
        Object.keys(countByHash).forEach(function (key) { 
          var hashPerKey = {}
          hashPerKey["name"] = key
          hashPerKey["y"] = countByHash[key]
          valueList.push(hashPerKey)
        })
        return valueList
      }
  };
});
