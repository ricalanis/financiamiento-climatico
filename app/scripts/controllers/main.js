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
    this.isOpen = [];

    this.filters = {
      year: undefined,
      state: undefined,
      financing: undefined,
      focus: undefined,
      status: undefined,
      project: undefined
    };

    this.investmentColors = Settings.rangeColors();

    this.kpis = {
      investment: 0,
    };


    this.filtersAvailable = function(){
      return this.filters.year ||
             this.filters.state ||
             this.filters.financing ||
             this.filters.focus ||
             this.filters.status;
    };

    this.addInvestment = function(newAmount) {
      this.kpis.investment += newAmount;
    };

    this.resetInvestment = function() {
      this.kpis.investment = 0;
    };

    // self.investmentByState = function() {
    //   Api.investmentByStateForProjects( this.results );
    // };

    self.uniqueProjectsCount = function() {
      // this funciton will return the unique project name count
      return Api.uniqueFieldData(this.results, 'nombre_proyecto').length;
    };

    // Fetch the data from the api
    Api.fetchDataset();
  }]);
