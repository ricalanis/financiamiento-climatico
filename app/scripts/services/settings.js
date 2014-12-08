'use strict';

/**
 * @ngdoc service
 * @name financiamientoClimaticoApp.settings
 * @description
 * # settings
 * Factory in the financiamientoClimaticoApp.
 */
angular.module('financiamientoClimaticoApp')
  .factory('Settings', function () {

    var veryLargeNumber = Math.pow(2,53);
    // investment limits

    var defaultColor = '#FFFFCC';

    // Range Colors
    var rangeOneColor = '#C2E699';
    var rangeTwoColor = '#78C679';
    var rangeThreeColor = '#31A354';
    var rangeFourColor = '#006837';

    // Limits for ranges
    // >=1 <100,000,
    // >= 100,000 < 1 millon,
    // >= 1 millon < 10 millones,
    // >= 10 millones
    var firstLimit = Math.pow(10,5);
    var secondLimit = Math.pow(10,6);
    var thirdLimit = Math.pow(10,7);
    var fourthLimit = veryLargeNumber;

    // Ranges
    var ranges = [
      { initial: 1, limit: firstLimit, color: rangeOneColor },
      { initial: firstLimit, limit: secondLimit, color: rangeTwoColor },
      { initial: secondLimit, limit: thirdLimit, color: rangeThreeColor },
      { initial: thirdLimit, limit: fourthLimit, color: rangeFourColor }
    ];

    // Public API here
    return {
      defaultColor: function () {
        return defaultColor;
      },
      rangeColors: function() {
        return [rangeOneColor, rangeTwoColor, rangeThreeColor, rangeFourColor];
      },
      getColorFromInvestment: function (investment) {
        for (var i=0; i < ranges.length; i++) {
          if(investment === 0) return this.defaultColor();
          if((investment >= ranges[i].initial) && (investment < ranges[i].limit)) return ranges[i].color;
        }
      },
    };
  });
