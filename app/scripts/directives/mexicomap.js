'use strict';

/**
 * @ngdoc directive
 * @name financiamientoClimaticoApp.directive:mexicoMap
 * @description
 * # mexicoMap
 */
angular.module('financiamientoClimaticoApp')
  .controller('MexicoCtrl', ['$scope', 'Api', function ($scope, Api) {
    this.getInvestmentByState = function(state) {
      return Api.investmentByStateForProjects( main.results, state );
    };
  }])
  .directive('mexicoMap', function () {
    return {
      replace: true,
      template: '<div id="mexicoMapSvg"># de proyectos: {{ main.results.length }}</div>',
      restrict: 'E',
      controller: 'MexicoCtrl',
      controllerAs: 'map',
      link: function postLink(scope, element, attrs) {
        var statename = function(d,i) { return d.objects.geometries}

        var width = 960;
        var height = 500;

        var x = d3.scale.linear()
        .domain([0, width])
        .range([0, width]);

        var y = d3.scale.linear()
        .domain([0, height])
        .range([height, 0]);


        var projection = d3.geo.mercator()
        .scale(1200)
        .center([-102.34034978813841, 24.012062015793]);

        var svg = d3.select(element[0]).append("svg")
        .attr("width", width)
        .attr("height", height);

        var g = svg.append("g");

        d3.json("mx_tj.json", function(error, mx) {
          g.selectAll("path")
            .data(topojson.object(mx, mx.objects.states).geometries)
          .enter().append("path")
            .attr("d", d3.geo.path().projection(projection))
            .style("stroke", "#a9a9a9")
            .attr("class","default")
            .attr("state", function(d,i){ return mx.objects.states.geometries[i].properties.state_name})
            .attr("fill", function(d,i){
              // process data by state here
              // console.log(d.properties.state_name);
              var state = d.properties.state_name;
              map.getInvestmentByState( state );

              return "#ddc"; //territory brown by default
              // return "#800026"; // cool red

            });
        });


      }
    };
  });
