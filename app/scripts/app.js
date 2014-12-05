'use strict';

/**
 * @ngdoc overview
 * @name financiamientoClimaticoApp
 * @description
 * # financiamientoClimaticoApp
 *
 * Main module of the application.
 */
angular
  .module('financiamientoClimaticoApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'mm.foundation',
    'angularUtils.directives.dirPagination',
    'bootstrapComponents'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
      $locationProvider.html5Mode(true);
  });
