'use strict';

describe('Controller: RevenuesCtrl', function () {

  // load the controller's module
  beforeEach(module('inf6150FrontendApp'));

  var RevenuesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RevenuesCtrl = $controller('RevenuesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RevenuesCtrl.awesomeThings.length).toBe(3);
  });
});
