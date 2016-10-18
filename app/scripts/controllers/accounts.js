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

  		$scope.accounts = AccountService.findAll();

  		$scope.addEmptyAccount = function(){
  			$scope.accounts.push({});
  		};

  		$scope.createOrUpdate = function(account){
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
