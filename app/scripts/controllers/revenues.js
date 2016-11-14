'use strict';

/**
 * @ngdoc function
 * @name inf6150FrontendApp.controller:RevenuesCtrl
 * @description
 * # RevenuesCtrl
 * Controller of the inf6150FrontendApp
 */
angular.module('inf6150FrontendApp')
  .controller('RevenuesCtrl', ['$scope', 'RevenuesService', 'AccountService',
  	function ($scope, RevenuesService, AccountService) {
	    
	    $scope.revenues = RevenuesService.findAll({subEntity:'accounts;accountId'});

	    $scope.accounts = AccountService.findAll();

	    $scope.selectedAccount = {};

	    $scope.selectAccount = function(account){
	    	$scope.selectedAccount = JSON.parse(account);
	    };

  		$scope.addEmptyRevenue = function(){
  			$scope.revenues.push({});
  		};

  		$scope.createOrUpdate = function(revenue){
  			revenue.accountId = $scope.selectedAccount.id;
  			if (revenue.id){
  				RevenuesService.update({ id: revenue.id }, revenue)
	  				.$promise.then(
		                    function(){
		                        $scope.revenues = RevenuesService.findAll({subEntity:'accounts;accountId'});
		                    }
		                );
  			}else{
  				RevenuesService.create(revenue)
	  				.$promise.then(
		                    function(){
		                        $scope.revenues = RevenuesService.findAll({subEntity:'accounts;accountId'});
		                    }
		                );
  			}  			
  		};

	    $scope.deleteRevenue = function(revenueId) {
	        RevenuesService.delete({ id: revenueId })
	            .$promise.then(
	                    function(){
	                        $scope.revenues = RevenuesService.findAll({subEntity:'accounts;accountId'});
	                    }
	                );
	    };
  }]);
