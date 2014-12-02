'use strict';

/**
 * @ngdoc directive
 * @name financiamientoClimaticoApp.directive:mexicoMap
 * @description
 * # mexicoMap
 */
angular.module('financiamientoClimaticoApp')
  .controller('MexicoCtrl', ['$scope', 'Api', 'Settings', function ($scope, Api, Settings) {
    this.getInvestmentStateColor = function(state) {
      if (angular.isUndefined($scope.main.results)){
        return Settings.defaultColor();
      }
      var investment = Api.investmentByStateForProjects( $scope.main.results, state );
      var color = Settings.getColorFromInvestment( investment );

      // console.log(state + ' ' + investment + ' ' + color);

      $scope.main.addInvestment( investment );
      // console.log($scope.main.kpis.investment);
      return Settings.getColorFromInvestment( investment );
    };
  }])
  .directive('mexicoMap', function () {
    return {
      replace: true,
      template: '<div id="mexicoMapSvg"></div>',
      restrict: 'E',
      controller: 'MexicoCtrl',
      controllerAs: 'map',
      link: function postLink(scope, element, attrs) {
        var mxTopoJson = undefined;
        var statename = function(d,i) { return d.objects.geometries}

        var width = 960;
        var height = 420;

        var x = d3.scale.linear()
        .domain([0, width])
        .range([0, width]);

        var y = d3.scale.linear()
        .domain([0, height])
        .range([height, 0]);


        var projection = d3.geo.mercator()
        .scale(1200)
        .center([-95.34034978813841, 22.012062015793]);

        var svg = d3.select(element[0]).append("svg")
        .attr("width", width)
        .attr("height", height);

        var g = svg.append("g");

        var drawMap = function(mx) {
          scope.main.resetInvestment();

          if (angular.isUndefined(mx)) return ;
          g.selectAll("path")
            .data(topojson.object(mx, mx.objects.states).geometries)
          .enter().append("path")
            .attr("d", d3.geo.path().projection(projection))
            .style("stroke", "#a9a9a9")
            .attr("class","default")
            .attr("state", function(d,i){ return mx.objects.states.geometries[i].properties.state_name})
            .attr("fill", function(d,i){
              // process data by state here
              var state = d.properties.state_name;
              var stateColor = scope.map.getInvestmentStateColor( state );
              return stateColor;
            });
        }

        d3.json("mx_tj.json", function(error, mx) {
          mxTopoJson = mx;
          drawMap(mxTopoJson);
        });

        scope.$watch('main.results', function(newValue, oldValue){
          if (angular.equals(newValue, oldValue)) return ;
          console.log('calling draw map');
          g.selectAll("path").remove();
          drawMap(mxTopoJson);
          console.log('finished drawing map');
        }, true);


      }
    };
  });
