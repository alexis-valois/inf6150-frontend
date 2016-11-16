'use strict';

/**
 * @ngdoc function
 * @name inf6150FrontendApp.controller:AccountsCtrl
 * @description
 * # AccountsCtrl
 * Controller of the inf6150FrontendApp
 */
angular.module('inf6150FrontendApp')
  .controller('AccountsCtrl', ['$rootScope','$scope', 'AccountService', 'EnumsService',
  	function ($rootScope, $scope, AccountService, EnumsService) {

  		$scope.accounts = AccountService.findAll();

      $scope.selectedAccountType = {};

      $scope.selectedCurrency = {};

      $scope.selectAccountType = function(type){
        $scope.selectedAccountType = type;
      };

      $scope.selectCurrency = function(currency){
        $scope.selectedCurrency = currency;
      };

  		$scope.addEmptyAccount = function(){
  			$scope.accounts.push({});
  		};

  		$scope.createOrUpdate = function(account){
  			account.type = $scope.selectedAccountType;
        account.initAmount.currency = $scope.selectedCurrency;
        if (account.id){
  				AccountService.update({ id: account.id }, account);
  			}else{
  				AccountService.create(account);
  			}  			
  		};

	    $scope.deleteAccount = function(accountId) {
	        AccountService.delete({ id: accountId })
	            .$promise.then(
	                    function(){
	                        $scope.accounts = AccountService.findAll();
	                    }
	                );
	        
	    };
}]);
