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
    }

    return {
      // data getters
      data: {
        records: undefined,
        options: {
          years: undefined,
          financing: undefined,
          focus: undefined
        }
      },

      fetchDataset: function() {
        var self = this;

        // console.log(self);
        if ( angular.isUndefined(self.data.records) ) {
          // console.log('records url' + this.url());
          $http.get(this.url()).
          success(function(data, status, headers, config){
            // set records and it's options
            self.data.records = data.result.records;
            self.data.options.years = uniqueFieldData(self.data.records, 'ano_aprobacion');
            self.data.options.financing = uniqueFieldData(self.data.records, 'financiamiento');
            self.data.options.focus = uniqueFieldData(self.data.records, 'area_proyecto');
            // console.log( self.data );
          });
        }
      },
      url: function () {
        return "http://datamx.io/api/action/datastore_search_sql?sql=SELECT%20*%20from%20%22ba3034a7-b2aa-4584-abdc-574a57cf3a45%22";
      }
    };
  }]);
