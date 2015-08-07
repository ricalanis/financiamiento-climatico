'use strict';

/**
 * @ngdoc service
 * @name financiamientoClimaticoApp.utilities
 * @description
 * # utilities
 * Factory in the financiamientoClimaticoApp.
 */
angular.module('financiamientoClimaticoApp')
  .factory('Utilities', function () {
    return {
      applyFilterToRecord: function(filterValue, recordPropertyValue) {
        return  filterValue === null ||
        angular.equals(recordPropertyValue, filterValue);
      },
      applyStateFilter: function(filterValue, recordPropertyValue) {
        var recordPropertyValue = recordPropertyValue.toLowerCase();
        return  filterValue === null ||
        (filterValue.toLowerCase().indexOf(recordPropertyValue) !== -1);
      },
      convertHashtoID: function(countByHash){
        var valueList = [];
        var responseDict = {};
        var responseList = [];
        var nameList = [];
        var yList = [];
        angular.forEach(countByHash, function (value, key) { 
          var hashPerKey = {}
          hashPerKey["name"] = key
          hashPerKey["y"] = value
          nameList.push(key)
          yList.push(key)
          valueList.push(hashPerKey)
        });
        responseDict["name"] = nameList;
        responseDict["y"] = yList
        responseList= [valueList,responseDict]
        console.log(responseList)
        return responseList;
      },
      PackValues: function(DataInfo) {
      var w = 1850,
          h = 550;

      var data = {name: "root", children:DataInfo}
      console.log(data);
      var nodes = d3.layout.pack()
        .value(function(d) { return d.y; })
        .size([w, h])
        .nodes(data);
      
      nodes.shift();

      console.log(nodes);

      var nodeslength = nodes.length;
      var return_list = []
      for (var i = 0; i < nodeslength; i++) {
          var each_dict = {};
          each_dict["x"] = nodes[i]["x"]
          each_dict["y"] = nodes[i]["y"]
          each_dict["z"] = nodes[i]["r"]
          each_dict["value"] = nodes[i]["value"]
          each_dict["name"] = nodes[i]["name"]
          return_list.push(each_dict)
          //Do something
      }
      console.log(return_list);
      return return_list;
      }
  };
});
