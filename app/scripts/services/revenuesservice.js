'use strict';

/**
 * @ngdoc service
 * @name inf6150FrontendApp.RevenuesService
 * @description
 * # RevenuesService
 * Service in the inf6150FrontendApp.
 */

function parseResponseDates(data) {
  var revenues = JSON.parse(data);
  for (var i = 0; i < revenues.length; i++){
    var revenue = revenues[i];
    revenue.revStarting = new Date(revenue.revStarting);
    revenue.revEnding = new Date(revenue.revEnding);
  }
  return revenues;
}

angular.module('inf6150FrontendApp')
  .service('RevenuesService', function ($resource) {
    return $resource('http://localhost:8081/rest/entity/revenues/:id', {}, {
        create: { method: 'POST' },
        findAll: 
        { 
        	method: 'GET', 
        	isArray: true,           
        	transformResponse: {response: parseResponseDates}
        },
        findOne: { method: 'GET', params: {id: '@id'}},
        update: { method: 'PUT', params: {id: '@id'}},
        delete: {method: 'DELETE', params: {id: '@id'}}
      });
  });
