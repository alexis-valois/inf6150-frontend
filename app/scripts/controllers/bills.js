'use strict';

/**
 * @ngdoc function
 * @name inf6150FrontendApp.controller:BillsCtrl
 * @description
 * # BillsCtrl
 * Controller of the inf6150FrontendApp
 */
angular.module('inf6150FrontendApp')
  .controller('BillsCtrl', ['$scope', 'BillsServices', 'CategoriesService', 'SuppliersServices', 'AccountService',
  	function ($scope, BillsServices, CategoriesService, SuppliersServices, AccountService) {
    	
    	$scope.bills = BillsServices.findAll();

    	$scope.categories = CategoriesService.findAll();

    	$scope.suppliers = SuppliersServices.findAll();

    	$scope.accounts = AccountService.findAll();

    	$scope.addEmptyBill = function(){
  			$scope.bills.push({});
  		};

  		$scope.createOrUpdate = function(bill){
  			if (bill.id){
  				BillsServices.update({ id: bill.id }, bill);
  			}else{
  				BillsServices.create(bill);
  			}  			
  		};

  		$scope.deleteBills = function(billId) {
	        BillsServices.delete({ id: billId })
	            .$promise.then(
	                    function(){
	                        $scope.bills = BillsServices.findAll();
	                    }
	                );
	    };

  }]);
