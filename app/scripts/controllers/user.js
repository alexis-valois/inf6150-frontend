'use strict';

/**
 * @ngdoc function
 * @name inf6150FrontendApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the inf6150FrontendApp
 */
angular.module('inf6150FrontendApp')
.controller('UserCtrl', ['$rootScope','$scope', '$http', '$location', 'localStorageService', 'UserFactory', '$window',
  function($rootScope, $scope, $http, $location, localStorageService, UserFactory, $window) {
    $scope.login = function() {
        var headers = $scope.user ? {
          username : $scope.user.username,
          password : $scope.user.password,
        } : {};
        $http.post('http://localhost:8081/user/login', {} ,{headers: headers})
        .success(function(data) {
            console.log('login successful, sessionToken = ' + data.sessionToken);
			localStorageService.set('nomUtilisateur', null);
            localStorageService.set('authenticated', true);
            localStorageService.set('user', data);
            $http.defaults.headers.common.sessionToken = localStorageService.get('user').sessionToken;
            $rootScope.authenticated = true;
            $location.path('/');
        })
        .error(function(data) {
            console.log('login error');
			console.log(data);
			if(data.exists){
				$scope.error = true;
				 localStorageService.set('authenticated', false);
				 localStorageService.set('user', null);
                 $rootScope.authenticated = false;
				 localStorageService.set('nomUtilisateur', null);
			}else{
				//Rediriger
				 localStorageService.set('nomUtilisateur', $scope.user.username);
				 $window.location.href = '/#/register';
			}
			
            
           
        });
    };
	
    // callback for ng-click 'createNewUser':
    $scope.createNewUser = function () {
        UserFactory.create($scope.user)
        .$promise.then(
          function(){
            $location.path('/userCreated');
          }
        );          
    };

	if(localStorageService.get('nomUtilisateur') != null){
			$scope.user = {};
			$scope.user.username = localStorageService.get('nomUtilisateur');
	}
	
	
    $scope.cancel = function () {
	    $location.path('/');
	};

}]);