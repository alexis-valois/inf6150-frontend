'use strict';

/**
 * @ngdoc service
 * @name inf6150FrontendApp.Categories
 * @description
 * # Categories
 * Service in the inf6150FrontendApp.
 */

angular.module('inf6150FrontendApp')
  .service('CategoriesService', function ($resource) {
  	return $resource('app/scripts/categories.json', {}, {
        //create: { method: 'POST' },
        findAll: { method: 'GET', isArray: true},
        //findOne: { method: 'GET', params: {id: '@id'}},
        //update: { method: 'PUT', params: {id: '@id'}},
        //delete: {method: 'DELETE', params: {id: '@id'}}
      });
      
  });
