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
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
