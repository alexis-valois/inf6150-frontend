'use strict';

/**
 * @ngdoc service
 * @name inf6150FrontendApp.EnumsService
 * @description
 * # EnumsService
 * Service in the inf6150FrontendApp.
 */
angular.module('inf6150FrontendApp')
  .service('EnumsService', function ($resource) {
    return $resource('http://localhost:8081/rest/entity/enums/:id', {}, {
        findAll: { method: 'GET', isArray: true},
        findById: { method: 'GET', params: {id: '@id'}}
      });
  });
