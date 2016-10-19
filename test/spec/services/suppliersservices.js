'use strict';

describe('Service: SuppliersServices', function () {

  // load the service's module
  beforeEach(module('inf6150FrontendApp'));

  // instantiate service
  var SuppliersServices;
  beforeEach(inject(function (_SuppliersServices_) {
    SuppliersServices = _SuppliersServices_;
  }));

  it('should do something', function () {
    expect(!!SuppliersServices).toBe(true);
  });

});
