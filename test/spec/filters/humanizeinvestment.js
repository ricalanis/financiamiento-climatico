'use strict';

describe('Filter: humanizeInvestment', function () {

  // load the filter's module
  beforeEach(module('financiamientoClimaticoApp'));

  // initialize a new instance of the filter before each test
  var humanizeInvestment;
  beforeEach(inject(function ($filter) {
    humanizeInvestment = $filter('humanizeInvestment');
  }));

  it('should return the input prefixed with "humanizeInvestment filter:"', function () {
    var text = 'angularjs';
    expect(humanizeInvestment(text)).toBe('humanizeInvestment filter: ' + text);
  });

});
