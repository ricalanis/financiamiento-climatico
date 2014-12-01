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
    this.states = Api.data.states;

    this.filters = {
      year: null,
      state: null,
      financing: null,
      focus: null,
      project: null
    };

    var applyFilterToRecord = function(filterValue, recordPropertyValue) {
      return  filterValue === null ||
              angular.equals(recordPropertyValue, filterValue);
    };

    var applyStateFilter = function(filterValue, recordPropertyValue) {
      var recordPropertyValue = recordPropertyValue.toLowerCase();
      return  filterValue === null ||
              (filterValue.toLowerCase().indexOf(recordPropertyValue) !== -1);
    };

    self.filterRecords = function(record) {
      return applyFilterToRecord(self.filters.year, record.ano_aprobacion) &&
             applyStateFilter(self.filters.state, record.region) &&
             applyFilterToRecord(self.filters.financing, record.financiamiento) &&
             applyFilterToRecord(self.filters.focus, record.area_proyecto);
    };

    self.investmentByState = function() {
      Api.investmentByStateForProjects( this.main.results );
    };

    // Fetch the data from the api
    Api.fetchDataset();
  }]);
