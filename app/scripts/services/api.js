'use strict';

/**
 * @ngdoc service
 * @name financiamientoClimaticoApp.api
 * @description
 * # api
 * Factory in the financiamientoClimaticoApp.
 */
angular.module('financiamientoClimaticoApp')
  .factory('Api', ['$http', function ($http) {

    var uniqueFieldData = function(records, fieldName){
      return _.uniq( _.pluck(records, fieldName) );
    };

    return {
      // data getters
      data: {
        records: undefined,
        options: {
          years: undefined,
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
          'Michoacán de Ocampo',
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
          'Veracruz de Ignacio de la Llave',
          'Nuevo León',
          'Coahuila de Zaragoza',
          'Tamaulipas',
          'Yucatán',
          'Campeche',
          'Quintana Roo'
        ]
      },
      investmentByStateForProjects: function( records, state ){
        var allProjectsByState = _.where( records, { region: state } );
        var allProjectInvestmentByState = _.pluck( allProjectsByState, 'cantidad' );
        var investmentByState = _.reduce( allProjectInvestmentByState, function(memo, num){ return memo + parseInt( num ); }, 0);

        return investmentByState;
      },
      fetchDataset: function() {
        var self = this;

        if ( angular.isUndefined(self.data.records) ) {
          $http.get(this.url()).
          success(function(data, status, headers, config){
            // set records and it's options
            self.data.records = data.result.records;
            self.data.options.years = uniqueFieldData(self.data.records, 'ano_aprobacion');
            self.data.options.financing = uniqueFieldData(self.data.records, 'financiamiento');
            self.data.options.focus = uniqueFieldData(self.data.records, 'area_proyecto');
            self.data.options.status = uniqueFieldData(self.data.records, 'status');
          });
        }
      },
      url: function () {
        return 'datastore_search.json';
        // return 'http://datamx.io/api/action/datastore_search_sql?sql=SELECT%20*%20from%20%22ba3034a7-b2aa-4584-abdc-574a57cf3a45%22';
      }
    };
  }]);
