'use strict';

/**
 * @ngdoc function
 * @name financiamientoClimaticoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the financiamientoClimaticoApp
 */

angular.module('financiamientoClimaticoApp')
  .controller('MainCtrl', ['$scope', 'Api', 'Utilities', 'Settings','Chart', function ($scope, Api, Utilities, Settings, Chart) {
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
      financer: undefined,
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
             this.filters.financer ||
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

    this.valueCount = function(field) {
      return Utilities.convertHashtoID(Api.countByFieldData(this.results, field));
    };

    this.valueMoney = function(field) {
      return Api.moneyByFieldData(this.results,field);
    };

    this.uniqueProjectsCount = function() {
      console.log(Utilities.PackValues(this.valueMoney('beneficiario')))
      // this funciton will return the unique project name count
      return Api.uniqueFieldData(this.results, 'nombre_proyecto').length;
    };

    // Fetch the data from the api
    

    this.charts = [{
      id:0,
      label:'Estado del Proyecto'
    },{
      id:1,
      label:'Tipo de Financiamiento'
    },{
      id:2,
      label:'Area del Proyecto'
    },{
      id:3,
      label:'Apoyo por Donante'
    },{
      id:4,
      label:'Apoyo por Beneficiario'
    }
    ];

    this.chart_selected = this.charts[0];

    this.chart_action = function() {
      var data_functions = [this.valueCount('status'),this.valueMoney('financiamiento'),this.valueCount('area_proyecto'), Utilities.PackValues(this.valueMoney('donante_fondo')), Utilities.PackValues(this.valueMoney('beneficiario'))];
      this.chartConfig = Chart.chartConfig(this.chart_selected.id, data_functions[this.chart_selected.id]);
    };

    Api.fetchDataset();
    
  }]);


