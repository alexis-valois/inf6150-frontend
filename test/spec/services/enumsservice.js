'use strict';

describe('Service: EnumsService', function () {

  // load the service's module
  beforeEach(module('inf6150FrontendApp'));

  // instantiate service
  var EnumsService;
  beforeEach(inject(function (_EnumsService_) {
    EnumsService = _EnumsService_;
  }));

  it('should do something', function () {
    expect(!!EnumsService).toBe(true);
  });

});
