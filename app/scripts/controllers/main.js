'use strict';

/**
 * @ngdoc function
 * @name financiamientoClimaticoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the financiamientoClimaticoApp
 */

angular.module('financiamientoClimaticoApp')
  .controller('MainCtrl', ['$scope', 'Api', 'Utilities', 'Settings', 'Chart', '$timeout', function ($scope, Api, Utilities, Settings, Chart, $timeout) {
    var self = this;

    Api.fetchDataset()
    .success(function(data, status, headers, config){

      // set records and it's options
      Api.data.records = data.result.records;
      Api.data.options.years = Api.uniqueFieldData(Api.data.records, 'ano_aprobacion');
      Api.data.options.financer = Api.uniqueFieldData(Api.data.records, 'donante_fondo');
      Api.data.options.financing = Api.uniqueFieldData(Api.data.records, 'financiamiento');
      Api.data.options.focus = Api.uniqueFieldData(Api.data.records, 'area_proyecto');
      Api.data.options.status = Api.uniqueFieldData(Api.data.records, 'status');

      // Initialize all 'data' variables
      self.options = Api.data.options;
      self.data = Api.data;
      self.states = Api.data.states;


      // Initialize all 'config' variables
      self.defaultColor = Settings.defaultColor();
      self.isOpen = [];

      self.filters = {
        year: undefined,
        state: undefined,
        financer: undefined,
        financing: undefined,
        focus: undefined,
        status: undefined,
        project: undefined
      };

      self.investmentColors = Settings.rangeColors();

      self.kpis = {
        investment: 0,
      };


      self.filtersAvailable = function(){
        return self.filters.year ||
               self.filters.state ||
               self.filters.financer ||
               self.filters.financing ||
               self.filters.focus ||
               self.filters.status;
      };

      self.addInvestment = function(newAmount) {
        self.kpis.investment += newAmount;
      };

      self.resetInvestment = function() {
        self.kpis.investment = 0;
      };

      self.valueCount = function(field) {
        return Utilities.convertHashtoID(Api.countByFieldData(self.results, field));
      };

      self.valueMoney = function(field) {
        return Api.moneyByFieldData(self.results,field);
      };

      self.uniqueProjectsCount = function() {
        console.log(Utilities.PackValues(self.valueMoney('beneficiario')))
        // this funciton will return the unique project name count
        return Api.uniqueFieldData(self.results, 'nombre_proyecto').length;
      };

      // Fetch the data from the api


      self.charts = [{
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

      self.chart_selected = self.charts[0];

      self.chart_action = function() {
        var data_functions = [ self.valueCount('status'), self.valueMoney('financiamiento'), self.valueCount('area_proyecto'), Utilities.PackValues(self.valueMoney('donante_fondo')), Utilities.PackValues(self.valueMoney('beneficiario'))];
        self.chartConfig = Chart.chartConfig(self.chart_selected.id, data_functions[self.chart_selected.id]);
      };

      // load on beginning hack
      // this should be refactored and removed
      $timeout(function(){
        self.chart_action();
      }, 300);

      // make chart action reload itself on data changes
      $scope.$watch(function(){ return self.results; }, function(newValue, oldValue){
        if (newValue === oldValue) return ;
        self.chart_action();
      }, true);
    });

  }]);
