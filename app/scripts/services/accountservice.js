'use strict';

/**
 * @ngdoc service
 * @name inf6150FrontendApp.AccountService
 * @description
 * # AccountService
 * Service in the inf6150FrontendApp.
 */
angular.module('inf6150FrontendApp')
  .service('AccountService', function ($resource) {
  	return $resource('http://localhost:8081/rest/entity/accounts/:id', {}, {
        create: { method: 'POST' },
        findAll: { method: 'GET', isArray: true},
        findOne: { method: 'GET', params: {id: '@id'}},
        update: { method: 'PUT', params: {id: '@id'}},
        delete: {method: 'DELETE', params: {id: '@id'}}
      });
      
  });
