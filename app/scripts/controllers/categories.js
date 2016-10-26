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

  		$scope.addEmptyCategorie = function(){
  			$scope.categories.push({});
  		};

  		$scope.createOrUpdate = function(categorie){
  			if (categorie.id){
  				CategoriesService.update({ id: categorie.id }, categorie);
  			}else{
  				CategoriesService.create(categorie);
  			}  			
  		};

	    $scope.deleteCategories = function(categoriesId) {
	        CategoriesService.delete({ id: categoriesId })
	            .$promise.then(
	                    function(){
	                        $scope.categories = CategoriesService.findAll();
	                    }
	                );
	    };
}]);