'use strict';

/**
 * @ngdoc function
 * @name inf6150FrontendApp.controller:AccountsCtrl
 * @description
 * # AccountsCtrl
 * Controller of the inf6150FrontendApp
 */
angular.module('inf6150FrontendApp')
  .controller('AccountsCtrl', ['$scope', 'AccountService',
  	function ($scope, AccountService) {

  		AccountService.findAll().$promise.then(function(data){
            $scope.selectedAccountType = data[0].type;
            $scope.selectedCurrency = data[0].initAmount.currency;
            $scope.accounts = data;
          }    
      );

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
