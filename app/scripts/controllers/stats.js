'use strict';

/**
 * @ngdoc function
 * @name inf6150FrontendApp.controller:StatsCtrl
 * @description
 * # StatsCtrl
 * Controller of the inf6150FrontendApp
 */
 
 //Permet de faire des modulo négatif et positif (javascript ne retourne pas le bon resultat avec un negatif)
 function mod(n, m) {
        return ((n % m) + m) % m;
}
 
function mockResult (id){
	var res = [
				{
					"id": 1,
					"amount": 12.64,
					"date_creation": "2015-12-26"
				},
				{
					"id": 2,
					"amount": 1212.99,
					"date_creation": "2015-12-26"
				},
				{
					"id": 2,
					"amount": 400.99,
					"date_creation": "2016-01-26"
				},
				{
					"id": 2,
					"amount": 150.00,
					"date_creation": "2016-02-26"
				},
				{
					"id": 2,
					"amount": 2500.00,
					"date_creation": "2016-03-26"
				},
				{
					"id": 2,
					"amount": 111.99,
					"date_creation": "2016-05-26"
				},
				{
					"id": 2,
					"amount": 333.99,
					"date_creation": "2016-06-26"
				},
				{
					"id": 2,
					"amount": 999.99,
					"date_creation": "2016-07-26"
				},
				{
					"id": 2,
					"amount": 1001.99,
					"date_creation": "2016-08-26"
				},
				{
					"id": 2,
					"amount": 275.99,
					"date_creation": "2016-09-26"
				},
				{
					"id": 2,
					"amount": 666.99,
					"date_creation": "2016-10-26"
				},
				{
					"id": 2,
					"amount": 566.99,
					"date_creation": "2016-11-26"
				} 
			];
			
	var res2 = [
				{
					"id": 1,
					"amount": 1222.64,
					"date_creation": "2016-4-26"
				},
				{
					"id": 2,
					"amount": 112.99,
					"date_creation": "2015-12-26"
				},
				{
					"id": 2,
					"amount": 400.99,
					"date_creation": "2016-01-26"
				},
				{
					"id": 2,
					"amount": 120.00,
					"date_creation": "2016-02-26"
				},
				{
					"id": 2,
					"amount": 200.00,
					"date_creation": "2016-03-26"
				},
				{
					"id": 2,
					"amount": 7771.99,
					"date_creation": "2016-05-26"
				},
				{
					"id": 2,
					"amount": 20.99,
					"date_creation": "2016-06-26"
				},
				{
					"id": 2,
					"amount": 999.99,
					"date_creation": "2016-07-26"
				},
				{
					"id": 2,
					"amount": 1001.99,
					"date_creation": "2016-08-26"
				},
				{
					"id": 2,
					"amount": 275.99,
					"date_creation": "2016-09-26"
				},
				{
					"id": 2,
					"amount": 366.99,
					"date_creation": "2016-10-26"
				},
				{
					"id": 2,
					"amount": 566.99,
					"date_creation": "2016-11-26"
				} 
			];
			
	if(id === -1){
		return res.concat(res2);
	}else if(id === 9){
		return res;
	}
	
	return res2;
}
 
 
 //Suppliers service permet obtenir les fourniseur
 //
angular.module('inf6150FrontendApp')
  .controller('StatsCtrl', ['$scope', '$route', 'SuppliersServices', 'CategoriesService', 'AccountService' , 
  function ($scope, $route,SuppliersServices, CategoriesService, AccountService) {
    
		var self = this;
		
		//Fonction qui permet de créer un graphique
		$scope.aff12DernierMois = function(account){
			//var date = new Date();			
			var dateAnneePasser = new Date();
			var axeX = [];
			var data = [0,0,0,0,0,0,0,0,0,0,0,0];
			dateAnneePasser.setFullYear(dateAnneePasser.getFullYear()-1);
			dateAnneePasser.setMonth(dateAnneePasser.getMonth() + 1);
			var premierMois = dateAnneePasser.getMonth();
			
			var nomMois = ["jan", "fev", "mars", "avril", "mai", "juin", "juil", "aout", "sep", "oct", "nov", "dec"];
			
			//Pour l'affichage
			$scope.idChoisie = account.id;
			
		    //Retourne une liste de billsqui contient entre date aujourhui moins 1 ans
			//http://localhost:8081/rest/entity/stats/{account}?sortBy=created&filterBy=created;bt;date,dateAnneePasser
			
			//Un mock objet de ce que ceci retournerais
			var result = mockResult($scope.idChoisie);
		
			
			//Liste de nom des 12 dernier mois
			dateAnneePasser.setDate(1);//S'assure de ne pas etre dans le cas du 31 octobre + 1 mois.
			for(var i=0; i<12; i++){
				axeX[i] = nomMois[dateAnneePasser.getMonth()] + ' '+ dateAnneePasser.getFullYear();
				dateAnneePasser.setMonth(dateAnneePasser.getMonth() + 1);
			}
			
			//Somme des valeur pour chaque mois en ordre.
			for(i=0; i<result.length; i++){
				var dateTmp = new Date(result[i].date_creation);
				var posTmp = mod((dateTmp.getMonth() - premierMois),12);
				data[posTmp] = Number((data[posTmp] + result[i].amount).toFixed(2));
			}
			
			
			self.creerGraph(axeX, data);
			self.creerTab(result);
			
		};
		
		self.creerGraph = function(axeX, data){
			$('#graph1').highcharts({
				chart: {
					type: 'column'
				},
				title: {
					text: 'Les 12 dernier mois'
				},
				xAxis: {
					categories: axeX
				},
				yAxis: {
					title: {
						text: 'Montant'
					},
					labels: {
						formatter: function() {
							return this.value;
						}
					}
				},
				credits:{
					enabled:false
				},
				series: [{
					data: data,
					name: "Montants totals depensés"
				}]
			});
		};
		
		self.creerTab = function(data){
			if(self.table){
				self.table.destroy();
			}
			
			
			self.table = $('#tab1').DataTable( {
				"data" : data,
				"columns" : [
					{
						"data" : "date_creation", 
						"title" : "Date de la facture"
					},
					{
						"data" : "amount", 
						"title" : "Montant"
					}
				]
			});	
		};
		
		AccountService.findAll({}, function(data){
			$scope.listeAccount = data;
			$scope.listeAccount.unshift({
				accountName : "Tous",
				id : -1
			});
			$scope.aff12DernierMois(data[0]);
		});

  }]);
