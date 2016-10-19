'use strict';

/**
 * @ngdoc overview
 * @name inf6150FrontendApp
 * @description
 * # inf6150FrontendApp
 *
 * Main module of the application.
 */
angular
  .module('inf6150FrontendApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule',
    'UserServices'
  ])
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('EB');
  }])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'UserCtrl',
        controllerAs: 'register'
      })
      .when('/activate/:token/:username', {
        templateUrl: 'views/activate.html',
        controller: 'UseractivateCtrl',
        controllerAs: 'userActivate'
      })
      .when('/accounts', {
        templateUrl: 'views/accounts.html',
        controller: 'AccountsCtrl',
        controllerAs: 'Accounts'
      })
      .when('/suppliers', {
        templateUrl: 'views/supplier.html',
        controller: 'SupplierCtrl',
        controllerAs: 'Supplier'
      })
      .otherwise({
        redirectTo: '/login'
      });
      
      $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    
  })
  .run(function($rootScope, $http, $location, localStorageService) {
     $rootScope.logout = function() {
      console.log('logout test');
      $http.post('http://localhost:8081/user/logout', {})
        .success(function() {         
            $location.path('/');
            $rootScope.loggedOut = true;
        })
        .error(function() {
            $rootScope.error = true;
            console.log('logout error');
        });
        localStorageService.set('user', null);
        localStorageService.set('authenticated', false);
        $http.defaults.headers.common.sessionToken = null;
        $rootScope.authenticated = false;
    };

    $rootScope.$on('$routeChangeSuccess', function () {
        $rootScope.authenticated = localStorageService.get('authenticated');
        $rootScope.user = localStorageService.get('user');
        $rootScope.error = false;
        if ($rootScope.user !== null){
          $http.defaults.headers.common.sessionToken = localStorageService.get('user').sessionToken;
        }
        if ($rootScope.loggedOut){
          $rootScope.loggedOut = false;
        }        
    });
  });
