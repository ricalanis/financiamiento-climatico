'use strict';

/**
 * @ngdoc service
 * @name financiamientoClimaticoApp.api
 * @description
 * # api
 * Factory in the financiamientoClimaticoApp.
 */
angular.module('financiamientoClimaticoApp')
  .factory('Api', ['$http', '$filter', function ($http, $filter) {

    return {
      // data getters
      data: {
        records: undefined,
        options: {
          years: undefined,
          financer: undefined,
          financing: undefined,
          focus: undefined,
          status: undefined
        },
        states: [
          'Distrito Federal',
          'Guerrero',
          'México',
          'Morelos',
          'Sinaloa',
          'Baja California',
          'Sonora',
          'Baja California Sur',
          'Zacatecas',
          'Durango',
          'Chihuahua',
          'Colima',
          'Nayarit',
          'Michoacán',
          'Jalisco',
          'Chiapas',
          'Tabasco',
          'Oaxaca',
          'Guanajuato',
          'Aguascalientes',
          'Querétaro',
          'San Luis Potosí',
          'Tlaxcala',
          'Puebla',
          'Hidalgo',
          'Veracruz',
          'Nuevo León',
          'Coahuila',
          'Tamaulipas',
          'Yucatán',
          'Campeche',
          'Quintana Roo'
        ]
      },
      investmentByStateForProjects: function( records, state ){
        // var allProjectsByState = _.where( records, { region: state } );

        var stateMappings = {
          'Baja California': 'Baja California Norte'
        };

        state = angular.isDefined(stateMappings[state]) ? stateMappings[state] : state;

        // Filter the projects further to see if it contains the state multiple or single region
        var allProjectsByState = $filter('filter')(records, {'region': state});

        // Get total investment from project
        var numberOfProjects = allProjectsByState.length;
        var totalInvestmentForState = 0;

        for(var idx=0; idx < numberOfProjects; idx++) {
          var regions = allProjectsByState[idx].region.split(',');
          var numberOfRegions = regions.length;
          var investment = parseInt(allProjectsByState[idx].cantidad);
          if (numberOfRegions > 1) {
            // this means that there are multiple regions so we must distribute equally
            totalInvestmentForState += investment / numberOfRegions;
          } else {
            // there is only one region so we must add the total inversion here
            totalInvestmentForState += investment;
          }
        }

        return totalInvestmentForState;
      },
      uniqueFieldData: function(records, fieldName){
        return _.uniq( _.pluck(records, fieldName) );
      },
      countByFieldData: function(records, fieldName){
        return _.countBy(_.pluck(records, fieldName));
      },
      moneyByFieldData: function(records, fieldName){
        var groups = _(records).groupBy(fieldName);
        var out = _(groups).map(function(g, key) {
          return { name: key, 
                   y: _(g).reduce(function(m,x) { 
                    return m + parseInt(x.cantidad); }, 0) };
        });
        return out;
      },
      fetchDataset: function() {
        var self = this;

        if ( angular.isUndefined(self.data.records) ) {
          $http.get(this.url()).
          success(function(data, status, headers, config){
            // set records and it's options
            self.data.records = data.result.records;
            self.data.options.years = self.uniqueFieldData(self.data.records, 'ano_aprobacion');
            self.data.options.financer = self.uniqueFieldData(self.data.records, 'donante_fondo');
            self.data.options.financing = self.uniqueFieldData(self.data.records, 'financiamiento');
            self.data.options.focus = self.uniqueFieldData(self.data.records, 'area_proyecto');
            self.data.options.status = self.uniqueFieldData(self.data.records, 'status');
          });
        }
      },
      url: function () {
        // return 'datastore_search_v2.json';
        // return 'http://datamx.io/api/action/datastore_search_sql?sql=SELECT%20*%20from%20%2239774bca-713e-46c5-bbbb-dfda9cc94be3%22';
        return 'datastore_search_v3.json?nocache=' + (new Date()).getTime();
        // return 'http://datamx.io/api/action/datastore_search_sql?sql=SELECT%20*%20from%20%22f5a2c4ba-7552-49c3-8105-914124c70e2d%22';
      }
    };
  }]);
