'use strict';

/**
 * @ngdoc directive
 * @name financiamientoClimaticoApp.directive:closableTag
 * @description
 * # closableTag
 */
angular.module('bootstrapComponents', [])
  .directive('closableTag', function () {
    return {
      template: '<span ng-show="value" class="tag label label-info"><span>{{ value }}</span>&nbsp;<span class="close-tag" ng-click="remove(value)">&#x2716;</span></span>',
      restrict: 'E',
      scope: {
        value: '='
      },
      controller: ['$scope', function($scope){
        $scope.remove = function ( value ){
          console.log('removing value');
          this.value = null;
        }
      }],
      link: function postLink(scope, element, attrs) {
        console.log( scope.backgroundColor );
      }
    };
  });
