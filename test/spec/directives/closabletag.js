'use strict';

describe('Directive: closableTag', function () {

  // load the directive's module
  beforeEach(module('financiamientoClimaticoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<closable-tag></closable-tag>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the closableTag directive');
  }));
});
