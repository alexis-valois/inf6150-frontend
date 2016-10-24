 
  
  'use strict'; 
 
 
/** 
 * @ngdoc function 
 * @name inf6150FrontendApp.controller:SupplierCtrl 
 * @description 
 * # SupplierCtrl 
 * Controller of the inf6150FrontendApp 
 */ 
 angular.module('inf6150FrontendApp').controller('SupplierCtrl', ['$scope', '$route', 'SuppliersServices', 
   	function ($scope, $route,SuppliersServices) { 
 
        
		
   		$scope.suppliers = SuppliersServices.findAll(); 
 
 
   		$scope.addEmptySupplier = function(){    			
			$scope.suppliers.push({}); 		
			
   		}; 
 

   		$scope.createOrUpdate = function(supplier){ 
		
		
   			if (supplier.id){    				
				SuppliersServices.update({ id: supplier.id }, supplier); 							
   			}else{ 						   
   				SuppliersServices.create(supplier); 				
   			}  			 
   		}; 
 
 
 			
		
		
		$scope.deleteSupplier = function(supplierId) {
	        SuppliersServices.delete({ id: supplierId })
	            .$promise.then(
	                    function(){
	                        $scope.suppliers = SuppliersServices.findAll();
	                    }
	                );
	        
	    };
 }]); 

