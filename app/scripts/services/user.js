'use strict';

/**
 * @ngdoc service
 * @name inf6150FrontendApp.user
 * @description
 * # user
 * Factory in the inf6150FrontendApp.
 */

var UserServices = angular.module('UserServices', ['ngResource']);

UserServices.factory('UserFactory', function ($resource) {
    return $resource('http://localhost:8081/user/register', {}, {
        create: { method: 'PUT' }
    });
  });
