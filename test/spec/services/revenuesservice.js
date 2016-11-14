'use strict';

describe('Service: RevenuesService', function () {

  // load the service's module
  beforeEach(module('inf6150FrontendApp'));

  // instantiate service
  var RevenuesService;
  beforeEach(inject(function (_RevenuesService_) {
    RevenuesService = _RevenuesService_;
  }));

  it('should do something', function () {
    expect(!!RevenuesService).toBe(true);
  });

});
