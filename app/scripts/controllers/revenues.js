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

  		$scope.addEmptyRevenue = function(){
  			$scope.revenues.push({});
  		};

  		$scope.createOrUpdate = function(revenue){
  			revenue.accountId = revenue.accounts[0].accountId;
  			console.log(revenue.accountId);
  			if (revenue.id){
  				RevenuesService.update({ id: revenue.id }, revenue);
  			}else{
  				RevenuesService.create(revenue);
  			}  			
  		};

	    $scope.deleteRevenue = function(revenueId) {
	        RevenuesService.delete({ id: revenueId })
	            .$promise.then(
	                    function(){
	                        $scope.revenues = RevenuesService.findAll();
	                    }
	                );
	    };
  }]);
