'use strict';

/**
 * @ngdoc service
 * @name inf6150FrontendApp.BillsServices
 * @description
 * # BillsServices
 * Service in the inf6150FrontendApp.
 */
angular.module('inf6150FrontendApp')
  .service('BillsServices', function ($resource) {
  	return $resource('http://localhost:8081/rest/entity/bills/:id', {}, {
  		create: { method: 'POST' },
  		findAll: { method: 'GET', isArray: true, params: {subEntity: ['accounts;accountId', 'suppliers;supplierId', 'categories;categorieId']} },
  		findOne: { method: 'GET', params: {id: '@id'} },
  		update: { method: 'PUT', params: {id: '@id'} },
  		delete: { method: 'DELETE', params: {id: '@id'} }
  	});
  });
