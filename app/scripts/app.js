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
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
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
      .when('/categories', {
        templateUrl: 'views/categories.html',
        controller: 'CategoriesCtrl',
        controllerAs: 'Categories'
        })
      .when('/suppliers', {
        templateUrl: 'views/supplier.html',
        controller: 'SupplierCtrl',
        controllerAs: 'Supplier'

      })
      .when('/userCreated', {
        templateUrl: 'views/userCreated.html',
      })
      .when('/bills', {
        templateUrl: 'views/bills.html',
        controller: 'BillsCtrl',
        controllerAs: 'Bills'
      })
	    .when('/stats', {
        templateUrl: 'views/stats.html',
        controller: 'StatsCtrl',
        controllerAs: 'Stats'
      })
      .when('/revenues', {
        templateUrl: 'views/revenues.html',
        controller: 'RevenuesCtrl',
        controllerAs: 'Revenues'
      })
      .otherwise({
        redirectTo: '/login'
      });
      $locationProvider.html5Mode(true);
      $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    
  })
  .run(function($rootScope, $http, $location, localStorageService, EnumsService) {
     $rootScope.logout = function() {
      $http.post('http://localhost:8081/user/logout', {})
        .then(function() {         
            $location.path('/');
            $rootScope.loggedOut = true;
        },
        function() {
            $rootScope.error = true;
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
          if (!$rootScope.accountTypes){
            $rootScope.accountTypes = EnumsService.findAll({filterBy: 'enum_key;eq;ACCOUNT_TYPE'});
          }

          if (!$rootScope.revenueFrequencies){
             $rootScope.revenueFrequencies = EnumsService.findAll({filterBy: 'enum_key;eq;REVENUE_FREQUENCY'});
          }

          if (!$rootScope.currencies){
            $rootScope.currencies = EnumsService.findAll({filterBy: 'enum_key;eq;CURRENCY'});
          }         
         
        }
        if ($rootScope.loggedOut){
          $rootScope.loggedOut = false;
        }        
    });
	
  });
