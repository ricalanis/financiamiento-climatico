'use strict';

/**
 * @ngdoc service
 * @name financiamientoClimaticoApp.Chart
 * @description
 * # Chart
 * Factory in the financiamientoClimaticoApp.
 */
angular.module('financiamientoClimaticoApp')
  .factory('Chart', function () {

    return {
      chartConfig: function (id,data_in) {
        var chartoptions = [{ options: {
            chart: {
                type: 'pie'
            },
            colors: ['#B9CED5','#B1C8CF','#A9C1CA','#A1BBC4','#98B5BE','#90AFB9','#88A8B3','#80A2AD','#789CA8','#6F96A2','#67909C','#5F8997','#578391']
        },
        series: [{
        data: data_in[0],
        name: "Proyectos"
        }],
        title: {
          text: 'Número de proyectos por avance'
        },credits: {
      enabled: false
       },

      loading: false
    },{ options: {
            chart: {
                type: 'pie'
            },
            colors: ['#B9CED5','#B1C8CF','#A9C1CA','#A1BBC4','#98B5BE','#90AFB9','#88A8B3','#80A2AD','#789CA8','#6F96A2','#67909C','#5F8997','#578391']
        },
        series: [{
        data: data_in,
        name: "USD"
        }],
        title: {
          text: 'Monto en dólares por tipo de inversión'
        },credits: {
      enabled: false
      },

      loading: false
    },{ options: {
            chart: {
                type: 'bar'
            },
            colors: ['#B9CED5','#B1C8CF','#A9C1CA','#A1BBC4','#98B5BE','#90AFB9','#88A8B3','#80A2AD','#789CA8','#6F96A2','#67909C','#5F8997','#578391']
        },
        series: [{
        data: data_in[0],
        name: "Proyectos"
        }],
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
        },
        xAxis: {
            categories: data_in[1]["name"],
            title: {
                text: null
            }
        },
        yAxis: {
        labels: {
            format: '{value:.0f}'
         },
        },
        title: {
          text: 'Proyectos por área de aplicación'
        },credits: {
        enabled: false
        },

      loading: false
    },{ options: {
            chart: {
                type: 'bubble',
                zoomType: 'xy'
            },
            colors: ['#B9CED5','#B1C8CF','#A9C1CA','#A1BBC4','#98B5BE','#90AFB9','#88A8B3','#80A2AD','#789CA8','#6F96A2','#67909C','#5F8997','#578391']
        ,
        plotOptions: {
            bubble: {
                dataLabels: {
                    enabled: true,
                    style: { textShadow: 'none'},
                    formatter:  function() {
                        return this.point.name;
                    }
                },
                //minSize:'0%',
                minSize:0.0001,
                maxSize:"35%",
                sizeBy: 'width'
            },
        }
        },
        xAxis: {
            max :1850,
            min :0,
            gridLineColor: "#FFFFFF",
            lineWidth: 0,
            minorGridLineWidth: 0,
            lineColor: 'transparent',
            labels: {
              enabled: false
            },
            title: {
              text: null
            },
            minorTickLength: 0,
            tickLength: 0
        },
        yAxis: {
            max : 550,
            min : 0,
            gridLineColor: "#FFFFFF",
            lineWidth: 0,
            minorGridLineWidth: 0,
            lineColor: 'transparent',
            labels: {
              enabled: false
            },
            title: {
              text: null
            },
            minorTickLength: 0,
            tickLength: 0
        },
        series: [{
        data: data_in,
        name: "Monto"
        }],
        title: {
          text: 'Dinero Invertido por Donante'
        },credits: {
              enabled: false
      },

      loading: false
    },{ options: {
            chart: {
                type: 'bubble',
                zoomType: 'xy'
            },
            colors: ['#B9CED5','#B1C8CF','#A9C1CA','#A1BBC4','#98B5BE','#90AFB9','#88A8B3','#80A2AD','#789CA8','#6F96A2','#67909C','#5F8997','#578391']
        ,
        plotOptions: {
            bubble: {
                dataLabels: {
                    enabled: true,
                    style: { textShadow: 'none'},
                    formatter:  function() {
                        return this.point.name;
                    }
                },
                //minSize:'0%',
                minSize:0.0001,
                maxSize:"25%",
                sizeBy: 'width'
            },
        }
        },
        xAxis: {
            max :1850,
            min :0,
            gridLineColor: "#FFFFFF",
            lineWidth: 0,
            minorGridLineWidth: 0,
            lineColor: 'transparent',
            labels: {
              enabled: false
            },
            title: {
              text: null
            },
            minorTickLength: 0,
            tickLength: 0

        },
        yAxis: {
            max : 550,
            min : 0,
            gridLineColor: "#FFFFFF",
            lineWidth: 0,
            minorGridLineWidth: 0,
            lineColor: 'transparent',
            labels: {
              enabled: false
            },
            title: {
              text: null
            },
            minorTickLength: 0,
            tickLength: 0
        },
        series: [{
        data: data_in,
        name: "Monto"
        }],
        title: {
          text: 'Dinero Invertido por Beneficiario'
        },credits: {
       enabled: false
      },

      loading: false
    }
    ];
    return chartoptions[id];
  }
};
});
