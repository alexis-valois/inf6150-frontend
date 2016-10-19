
'use strict';

/**
 * @ngdoc service
 * @name inf6150FrontendApp.SuppliersServices
 * @description
 * # SuppliersServices
 * Service in the inf6150FrontendApp.
 */
angular.module('inf6150FrontendApp')
  .service('SuppliersServices', function ($resource) {
  	return $resource('http://localhost:8081/rest/entity/suppliers/:id', {}, {
        create: { method: 'POST' },
        findAll: { method: 'GET', isArray: true},
        findOne: { method: 'GET', params: {id: '@id'}},
        update: { method: 'PUT', params: {id: '@id'}},
        delete: {method: 'DELETE', params: {id: '@id'}}
      });
      
  });