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

    var query = function(query, recordPropertyValue) {
      return _.contains(query, recorPropertyValue);
    };

    self.filterRecords = function(record) {
      return applyFilterToRecord(self.filters.year, record.ano_aprobacion) &&
             applyFilterToRecord(self.filters.financing, record.financiamiento) &&
             applyFilterToRecord(self.filters.focus, record.area_proyecto) &&
             applyFilterToRecord(self.filters.project, record.nombre_proyecto);
    };

    // Fetch the data from the api
    Api.fetchDataset();
  }]);
