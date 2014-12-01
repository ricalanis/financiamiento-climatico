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

    var defaultColor = '#DDC';

    // Range Colors
    var rangeOneColor = defaultColor;
    var rangeTwoColor = '#42A5F5';
    var rangeThreeColor = '#FFA726';
    var rangeFourColor = '#EF5350';

    // Limits for ranges
    // >=0 <100,000,
    // >= 100,000 < 1 millon,
    // >= 1 millon < 10 millones,
    // >= 10 millones
    var firstLimit = Math.pow(10,5);
    var secondLimit = Math.pow(10,6);
    var thirdLimit = Math.pow(10,7);
    var fourthLimit = veryLargeNumber;

    // Ranges
    var ranges = [
      { initial: 0, limit: firstLimit, color: rangeOneColor },
      { initial: firstLimit, limit: secondLimit, color: rangeTwoColor },
      { initial: secondLimit, limit: thirdLimit, color: rangeThreeColor },
      { initial: thirdLimit, limit: fourthLimit, color: rangeFourColor }
    ];

    // Public API here
    return {
      defaultColor: function () {
        return defaultColor;
      },
      getColorFromInvestment: function (investment) {
        for (var i=0; i < ranges.length; i++) {
          if(investment === 0) return "white";
          if((investment >= ranges[i].initial) && (investment < ranges[i].limit)) return ranges[i].color;
        }
      },
    };
  });
