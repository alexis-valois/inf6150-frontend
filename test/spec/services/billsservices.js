'use strict';

describe('Service: BillsServices', function () {

  // load the service's module
  beforeEach(module('inf6150FrontendApp'));

  // instantiate service
  var BillsServices;
  beforeEach(inject(function (_BillsServices_) {
    BillsServices = _BillsServices_;
  }));

  it('should do something', function () {
    expect(!!BillsServices).toBe(true);
  });

});
