'use strict';

/**
 * @ngdoc function
 * @name inf6150FrontendApp.controller:UseractivateCtrl
 * @description
 * # UseractivateCtrl
 * Controller of the inf6150FrontendApp
 */
angular.module('inf6150FrontendApp')
  .controller('UseractivateCtrl', function ($scope, $routeParams, $http) {
    var token = $routeParams.token;
    var username = $routeParams.username;
    $http.get('http://localhost:8081/user/activate?activationToken=' + token + '&username=' + username)
    	.success(function(){
    		$scope.error = false;
    	})
    	.error(function(){
    		$scope.error = true;
    	});
  });
