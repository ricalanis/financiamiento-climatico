'use strict';

/**
 * @ngdoc function
 * @name financiamientoClimaticoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the financiamientoClimaticoApp
 */
angular.module('financiamientoClimaticoApp')
  .controller('MainCtrl', ['$scope', 'Api', function ($scope, Api) {
    var self = this;

    // Initialize all variables
    this.options = Api.data.options;
    this.data = Api.data;

    this.filters = {
      year: null,
      financing: null,
      focus: null,
      project: null
    };

    var applyFilterToRecord = function(filterValue, recordPropertyValue) {
      return  filterValue === null ||
              angular.equals(recordPropertyValue, filterValue);
    };

    self.filterRecords = function(record) {
      return applyFilterToRecord(self.filters.year, record.ano_aprobacion) &&
             applyFilterToRecord(self.filters.financing, record.financiamiento) &&
             applyFilterToRecord(self.filters.focus, record.area_proyecto);
    };

    // Fetch the data from the api
    Api.fetchDataset();
  }]);
