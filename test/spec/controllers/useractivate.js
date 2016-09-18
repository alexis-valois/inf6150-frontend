'use strict';

describe('Controller: UseractivateCtrl', function () {

  // load the controller's module
  beforeEach(module('inf6150FrontendApp'));

  var UseractivateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UseractivateCtrl = $controller('UseractivateCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UseractivateCtrl.awesomeThings.length).toBe(3);
  });
});
