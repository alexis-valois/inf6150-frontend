'use strict';

/**
 * @ngdoc function
 * @name inf6150FrontendApp.controller:CategoriesCtrl
 * @description
 * # CategoriesCtrl
 * Controller of the inf6150FrontendApp
 */

angular.module('inf6150FrontendApp')
  .controller('CategoriesCtrl', ['$scope', 'CategoriesService', 
  	function ($scope, CategoriesService) {

  		$scope.categories = CategoriesService.findAll();

  		/*$scope.addEmptyAccount = function(){
  			$scope.categories.push({});
  		};

  		$scope.createOrUpdate = function(categorie){
  			if (categorie.id){
  				CategoriesService.update({ id: categories.id }, categorie);
  			}else{
  				CategoriesService.create(categorie);
  			}  			
  		};

	    $scope.deleteCategories = function(categoriesId) {
	        AccountService.delete({ id: categoriesId })
	            .$promise.then(
	                    function(){
	                        $scope.categories = CategoriesService.findAll();
	                    }
	                );
	    };*/
}]);