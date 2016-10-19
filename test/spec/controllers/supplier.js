'use strict';

describe('Controller: SupplierCtrl', function () {

  // load the controller's module
  beforeEach(module('inf6150FrontendApp'));

  var SupplierCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SupplierCtrl = $controller('SupplierCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SupplierCtrl.awesomeThings.length).toBe(3);
  });
  
});
