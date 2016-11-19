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
    	
    	BillsServices.findAll().$promise.then(function(data){
        $scope.bills = data;
      });    

    	CategoriesService.findAll().$promise.then(function(data){
        $scope.selectedCategorie = data[0].id;
        $scope.categories = data;
      });    

    	SuppliersServices.findAll().$promise.then(function(data){
        $scope.selectedSupplier = data[0].id;
        $scope.suppliers = data;
      });    

    	AccountService.findAll().$promise.then(function(data){
        $scope.selectedAccount = data[0].id;
        $scope.accounts = data;
        $scope.selectedCurrency = data[0].initAmount.currency;
      });    

      $scope.selectAccount = function(accountId){
        $scope.selectedAccount = accountId;
      };

      $scope.selectCategorie = function(categorieId){
        $scope.selectedCategorie = categorieId;
      };

      $scope.selectSupplier = function(supplierId){
        $scope.selectedSupplier = supplierId;
      };

      $scope.selectCurrency = function(currency){
          $scope.selectedCurrency = currency;
      };

    	$scope.addEmptyBill = function(){
  			$scope.bills.push({});
  		};

  		$scope.createOrUpdate = function(bill){
        bill.accountId = $scope.selectedAccount;
        bill.categorieId = $scope.selectedCategorie;
        bill.supplierId = $scope.selectedSupplier;
        bill.amount.currency = $scope.selectedCurrency;
        
  			if (bill.id){
  				BillsServices.update({ id: bill.id }, bill)
              .$promise.then(
                        function(){
                            $scope.bills = BillsServices.findAll();
                        }
                    );
  			}else{
  				BillsServices.create(bill)
              .$promise.then(
                        function(){
                            $scope.bills = BillsServices.findAll();
                        }
                    );
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
