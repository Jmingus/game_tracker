angular.module('app.controllers', [])
.controller('homeCtrl', function($scope, $http) {

	var parser = new X2JS();
	var gameCollection = [];
	$scope.displayList = [];
	$scope.searchParam = '';
	$scope.checkBox = false;
	$scope.userGameCollection = [];

	$scope.searchSubmit=function(searchParam){
		console.log("click");
		//$http.get('http://www.boardgamegeek.com/xmlapi/search?search='+searchParam+'&exact=1')
		$http.get('http://www.boardgamegeek.com/xmlapi/search?search='+searchParam)
			.success(function(response) {
				console.log(parser.xml_str2json(response));
				 gameCollection = parser.xml_str2json(response);
				 gameCollection = gameCollection.boardgames.boardgame;
				 if(!gameCollection) {
				 	gameCollection = [];
				 }
				 if(!_.isArray(gameCollection)) {
				 	gameCollection = [gameCollection];
				 } 
				 console.log(gameCollection);
				 $scope.displayList = gameCollection;
			})
			.error(function(err) {
				console.log(err);
			});
		};

	$scope.addGameClick = function() {
		$scope.userGameCollection.push()
	}

});
