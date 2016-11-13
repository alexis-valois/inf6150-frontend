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
  	return $resource('scripts/bills.json', {}, {
  		create: { methode: 'POST', isArray: true },
  		findAll: { methode: 'GET', isArray: true },
  		update: { methode: 'PUT', isArray: true, params: {id: '@id'} },
  		delete: { method: 'DELETE', params: {id: '@id'} }
  	});
  });
