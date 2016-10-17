'use strict';

describe('Controller: TestctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('inf6150FrontendApp'));

  var TestctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TestctrlCtrl = $controller('TestctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TestctrlCtrl.awesomeThings.length).toBe(3);
  });
});
