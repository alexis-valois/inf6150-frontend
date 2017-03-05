'use strict';

/**
 * @ngdoc function
 * @name inf6150FrontendApp.controller:StatsCtrl
 * @description
 * # StatsCtrl
 * Controller of the inf6150FrontendApp
 */
 
function parseDateToString(date, estAffichee){
	if(!estAffichee){
		return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	}else{
		var jourD = '' + date.getDate();
		var moisD = '' + (date.getMonth() + 1);
		if (moisD.length < 2) { moisD = '0' + moisD; }
		if (jourD.length < 2) { jourD = '0' + jourD; }

		return date.getFullYear() + '-' + moisD + '-' + jourD;
	}
} 
 //Suppliers service permet obtenir les fourniseur
 //
angular.module('inf6150FrontendApp')
  .controller('StatsCtrl', ['$scope', '$route', 'AccountService' , 'RevenuesService', 'BillsServices',
  function ($scope, $route, AccountService, RevenuesService, BillsServices) {
    
		var self = this;
		
		//Fonction qui permet le rapport
		$scope.affEntreDeuxMois = function(){	
		
			var sincronisation = false;
			$scope.depenseTrouver = true;
			$scope.revenueTrouver = true;
			$scope.valeurTrouver = true;
		
			var anneFin = $scope.dateFin.getFullYear();
			var moisFin = $scope.dateFin.getMonth() + 1;
			var anneDeb = $scope.dateDebut.getFullYear();
			var moisDeb = $scope.dateDebut.getMonth() + 1;
			
			var dateAnneePasser = new Date($scope.dateDebut);
			var differenceMois = ((anneFin - anneDeb)*12) - (moisDeb) + (moisFin) + 1;
			
			if(differenceMois <= 0){
				$scope.depenseTrouver = false;
				$scope.revenueTrouver = false;
				$scope.valeurTrouver = false;
			}
			
			var nomMois = ["jan", "fev", "mars", "avril", "mai", "juin", "juil", "aout", "sep", "oct", "nov", "dec"];
				
			var dataRes = [];
			var dataRev = [];
			var tabVide = [];
			var axeX = [];
				
				
			for(var i = 0; i<differenceMois; i++){
				dataRes.push(0); //Facture
				axeX.push(0);
				tabVide.push(0);
				dataRev.push(0); //Revenue
			}
			
			//Par mois
			for(var i=0; i<differenceMois; i++){
				axeX[i] = nomMois[dateAnneePasser.getMonth()] + ' '+ dateAnneePasser.getFullYear();
				dateAnneePasser.setMonth(dateAnneePasser.getMonth() + 1);
			}
			
			var filterBy = [];
			filterBy.push('bill_date;bt;' + parseDateToString($scope.dateDebut,false) + ',' +  parseDateToString($scope.dateFin,false));
			
			if($scope.idChoisie !== -1){
				filterBy.push('accountId;eq;'+$scope.idChoisie);
			}
			
			BillsServices.findAll({filterBy:filterBy, sortBy:'bill_date'}, function(data){

				if(data.length <= 0 && !$scope.revenueTrouver){
					$scope.valeurTrouver = false;
				}
				
				if(data.length <= 0){
					$scope.depenseTrouver = false;
					return;
				}
				
				var parCategorie = {};
				var parFourniseur = {};
				
				//Somme des valeur pour chaque mois en ordre.
				for(i=0; i<data.length; i++){
					var dateTmp = new Date(data[i].billDate);
					
					var anneDebTmp = dateTmp.getFullYear();
					var moisDebTmp = dateTmp.getMonth() + 1;
					
					var posTmp = ((anneDebTmp - anneDeb)*12) - (moisDeb) + (moisDebTmp);
					var montantTmp = data[i].amount.amount;
					
					if(parCategorie[data[i].categories[0].name] === null){
						parCategorie[data[i].categories[0].name] = { 
								montantTotal : 0,
								montantParMois : tabVide.slice()
						};	
					}
					parCategorie[data[i].categories[0].name].montantTotal += montantTmp;
					parCategorie[data[i].categories[0].name].montantParMois[posTmp] += montantTmp;

					if(parFourniseur[data[i].suppliers[0].supplierName] === null){
						parFourniseur[data[i].suppliers[0].supplierName] = {
							montantTotal : 0
						};
					}
					parFourniseur[data[i].suppliers[0].supplierName].montantTotal += montantTmp;
					
					dataRes[posTmp] -= montantTmp;
					
				}
				
				self.creerGraph(axeX, parCategorie);
				self.creerTab(data);
				self.creerPieGraph(parCategorie, "Categorie");
				self.creerPieGraph(parFourniseur, "Fourniseur");
				
				if(sincronisation || !$scope.revenueTrouver){
					sincronisation = false;
					self.creerGraphRevenuVsDepense(dataRev, dataRes, axeX);
				}else{
					sincronisation = true;
				}
				
			});

			var fliterByRevenur = [];
			fliterByRevenur.push('rev_starting;lt;' + parseDateToString($scope.dateFin,false));
			if($scope.idChoisie !== -1){
				fliterByRevenur.push('accountId;eq;'+$scope.idChoisie);
			}
			
			
			RevenuesService.findAll({filterBy:fliterByRevenur}, function(dataDeRevenue){
	
				if(dataDeRevenue.length <= 0 && !$scope.depenseTrouver){
					$scope.valeurTrouver = false;
				}
				
				if(dataDeRevenue.length <= 0){
					$scope.revenueTrouver = false;
					return;
				}
				var vraiDonneDecode = self.donneVraiRevenue(dataDeRevenue);
				if(vraiDonneDecode === null){
					$scope.revenueTrouver = false;
					return;
				}
				
				for(var i=0; i< vraiDonneDecode.length; i++){
					var dateTmp = new Date(vraiDonneDecode[i].date);
					
					var anneDebTmp = dateTmp.getFullYear();
					var moisDebTmp = dateTmp.getMonth() + 1;
					
					var posTmp = ((anneDebTmp - anneDeb)*12) - (moisDeb) + (moisDebTmp);
					
					dataRev[posTmp] += vraiDonneDecode[i].montant;
				}
				
				if(sincronisation || !$scope.depenseTrouver){
					sincronisation = false;
					self.creerGraphRevenuVsDepense(dataRev, dataRes, axeX);
				}else{
					sincronisation = true;
				}
				
			});
		};
		
		self.creerGraphRevenuVsDepense = function (revenu, depense, axeX){
			
			var profit = [];
			
			for(var i = 0; i < revenu.length; i++){
				profit.push(revenu[i] + depense[i]);
			}
			
			$('#graphRevenuVsDepense').highcharts({
				chart: {
					type: 'column'
				},
				title: {
					text: 'Revenues VS Dépenses'
				},
				xAxis: {
					categories: axeX
				},
				credits:{
					enabled:false
				},
				plotOptions: {
					column: {
						stacking: 'normal'
					}
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
				series: [{
					name : "Dépenses",
					data : depense,
					stack : 'versu'
				},
				{
					name : "Revenues",
					data : revenu,
					stack : 'versu'
				},
				{
					name : "Profits",
					data : profit,
					stack : 'profit'
				}]
			});
		};
		
		self.creerPieGraph = function(dataPie, name){
			var donneAff = [];
			
			for(var nom in dataPie){
				var valeur = dataPie[nom].montantTotal;
				donneAff.push({
					name : nom,
					y : valeur
				});
			}
			
			$('#graphPie' + name).highcharts({
				chart: {
					type: 'pie'
				},
				title: {
					text: 'Dépense par ' + name
				},
				credits:{
					enabled:false
				},
				series: [{
					name : "Dépenses",
					colorByPoint: true,
					data : donneAff
				}]
			});
		};
		
		self.creerGraph = function(axeX, data){
			var donneAff = [];
			for(var nom in data){
				var valeur = data[nom].montantParMois;
				donneAff.push({
					name : nom,
					data : valeur
				});
			}
			
			$('#graph1').highcharts({
				chart: {
					type: 'column'
				},
				title: {
					text: 'Dépenses effectuée par mois'
				},
				xAxis: {
					categories: axeX
				},
				plotOptions: {
					column: {
						stacking: 'normal'
					}
				},
				tooltip: {
					pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
					shared: true,
					backgroundColor: '#FFFFFF'
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
				series: donneAff
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
						"data" : "billDate", 
						"title" : "Date de la facture",
						"render": function (data) {
							var dateTmp = new Date(data);
							return parseDateToString(dateTmp,true);
						}
					},
					{
						"data" : "categories[0].name",
						"title" : "Catégorie"
					},
					{
						"data" : "suppliers[0].supplierName",
						"title" : "Fourniseur"
					},
					{
						"data" : "amount.amount", 
						"title" : "Montant"
					}
				],
				destroy: true
			});	
		};
		
		self.donneVraiRevenue = function(data){
			var vraiDonner = [];
			//Transformer les data en valeur reel
			for(var i = 0; i<data.length; i++){
				var dateDepart = new Date(data[i].revStarting);
										
				if(data[i].frequency !== "ONCE"){
					
					//ajuste la date au bon moment
					while(dateDepart<$scope.dateDebut){
						if(self.addFrequenceDate(dateDepart, data[i].frequency)){
							return;
						}
					}
					
					while(dateDepart < $scope.dateFin){
						vraiDonner.push({
							date : new Date(dateDepart),
							montant : data[i].amount.amount
						});
						
						if(self.addFrequenceDate(dateDepart, data[i].frequency)){
							return;
						}
							
					}
				}else{
					vraiDonner.push({
							date : new Date(data[i].revStarting),
							montant : data[i].amount.amount
					});
				}		
			}
				
			return vraiDonner;
			
		};
		
		self.addFrequenceDate = function(dateAdd, frequence){
			var valeurRetour = false;
			switch(frequence){
				case "WEEKLY":
					dateAdd.setDate(dateAdd.getDate() + 7);
					break;
				case "MONTHLY":
					dateAdd.setMonth(dateAdd.getMonth() + 1);
					break;
				case "DAILY":
					dateAdd.setDate(dateAdd.getDate() + 1);
					break;
				case "BI_WEEKLY":
					dateAdd.setDate(dateAdd.getDate() + 14);
					break;
				default:
					valeurRetour = true;
			}
			return valeurRetour;
		};
		
		AccountService.findAll({}, function(data){
			if(data.length > 0 ){
				$scope.CompteTrouver = true;
				//Annee passer (-11 mois)
				var dateAnneePasser = new Date();
				dateAnneePasser.setFullYear(dateAnneePasser.getFullYear()-1);
				dateAnneePasser.setDate(1);		
				dateAnneePasser.setMonth(dateAnneePasser.getMonth() + 1);
			
				$scope.listeAccount = data;
				$scope.dateDebut = dateAnneePasser;
				$scope.dateFin = new Date();
				$scope.listeAccount.unshift({
					accountName : "Tous",
					id : -1
				});
				
				$scope.changerDeCompte(data[0]);
			}else{
				$scope.CompteTrouver = false;
			}
			
			
		});
		
		$scope.changerDeCompte = function(compte){
			self.account = compte;
			$scope.idChoisie = compte.id;
			$scope.affEntreDeuxMois();
		};

  }]);
