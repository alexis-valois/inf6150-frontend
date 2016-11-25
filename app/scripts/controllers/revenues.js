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
	    
	    RevenuesService.findAll({subEntity:'accounts;accountId'}).$promise.then(function(data){
	    	if (data && data[0]){
	    		$scope.revenues = data;
	    		$scope.selectedFrequency = data[0].frequency;
	    	}	    	
	    });

	    AccountService.findAll().$promise.then(function(data){
	    	$scope.selectedAccount = data[0].id;
	    	$scope.accounts = data;
	    	$scope.selectedCurrency = data[0].initAmount.currency;
	    });    

	    $scope.selectFrequency = function(frequency){
	        $scope.selectedFrequency = frequency;
	    };

	    $scope.selectCurrency = function(currency){
	        $scope.selectedCurrency = currency;
	    };

	    $scope.selectAccount = function(accountId){
	    	$scope.selectedAccount = accountId;
	    };

  		$scope.addEmptyRevenue = function(){
  			if (!$scope.revenues){
  				$scope.revenues = [];
  			}
  			$scope.revenues.push({});
  		};

  		$scope.createOrUpdate = function(revenue){
  			revenue.accountId = $scope.selectedAccount;
  			revenue.amount.currency = $scope.selectedCurrency;
  			revenue.frequency = $scope.selectedFrequency; 
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
