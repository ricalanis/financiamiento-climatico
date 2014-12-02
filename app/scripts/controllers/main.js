'use strict';

/**
 * @ngdoc function
 * @name financiamientoClimaticoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the financiamientoClimaticoApp
 */
angular.module('financiamientoClimaticoApp')
  .controller('MainCtrl', ['$scope', 'Api', 'Utilities', 'Settings', function ($scope, Api, Utilities, Settings) {
    var self = this;

    // Initialize all 'data' variables
    this.options = Api.data.options;
    this.data = Api.data;
    this.states = Api.data.states;

    // Initialize all 'config' variables
    this.defaultColor = Settings.defaultColor();

    this.filters = {
      year: null,
      state: null,
      financing: null,
      focus: null,
      status: null,
      project: null
    };

    this.investmentColors = Settings.rangeColors();

    this.kpis = {
      investment: 0,
    };


    this.addInvestment = function(newAmount) {
      this.kpis.investment += newAmount;
    };

    this.resetInvestment = function() {
      this.kpis.investment = 0;
    };

    self.filterRecords = function(record) {
      return Utilities.applyFilterToRecord(self.filters.year, record.ano_aprobacion) &&
             Utilities.applyFilterToRecord(self.filters.state, record.region) &&
             Utilities.applyFilterToRecord(self.filters.financing, record.financiamiento) &&
             Utilities.applyFilterToRecord(self.filters.focus, record.area_proyecto) &&
             Utilities.applyFilterToRecord(self.filters.status, record.status);
    };

    self.investmentByState = function() {
      Api.investmentByStateForProjects( this.main.results );
    };

    // Fetch the data from the api
    Api.fetchDataset();
  }]);
