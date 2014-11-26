'use strict';

/**
 * @ngdoc directive
 * @name financiamientoClimaticoApp.directive:mexicoMap
 * @description
 * # mexicoMap
 */
angular.module('financiamientoClimaticoApp')
  .directive('mexicoMap', function () {
    return {
      replace: true,
      template: '<div id="mexicoMapSvg"></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var statename= function(d,i) { return d.objects.geometries}

        var x = d3.scale.linear()
        .domain([0, width])
        .range([0, width]);

        var y = d3.scale.linear()
        .domain([0, height])
        .range([height, 0]);

        var width = 960,
        height = 500;

        var projection = d3.geo.mercator()
        .scale(1200)
        .center([-102.34034978813841, 24.012062015793]);

        var svg = d3.select(element[0]).append("svg")
        .attr("width", width)
        .attr("height", height);

        var g = svg.append("g");

        d3.json("mx_tj.json", function(error, mx) {
          d3.json("http://datamx.io/api/action/datastore_search?resource_id=ba3034a7-b2aa-4584-abdc-574a57cf3a45&q=Mitigaci%C3%B3n", function(error, datamx) {
            g.selectAll("path")
            .data(topojson.object(mx, mx.objects.states).geometries)
            .enter().append("path")
            .attr("d", d3.geo.path().projection(projection))
            .style("stroke", "#333")
            .attr("class","default")
            .attr("state", function(d,i){ return mx.objects.states.geometries[i].properties.state_name})
            .attr("fill", function(d,i){
              for (var key in datamx.result.records){
                if (datamx.result.records[key].region == mx.objects.states.geometries[i].properties.state_name){ return "blue";}
              }
                return "grey"
            });
          });
        });


      }
    };
  });
