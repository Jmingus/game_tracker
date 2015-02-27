angular.module('app.controllers', [])
.controller('homeCtrl', function($scope, $http) {

	var parser = new X2JS();
	var gameCollection = [];
	$scope.displayList = [];
	$scope.searchParam = '';
	$scope.n = 1;

	$scope.searchSubmit=function(searchParam){
		console.log("click");
		$http.get('http://www.boardgamegeek.com/xmlapi/search?search='+searchParam+'&exact=1')
		//$http.get('http://www.boardgamegeek.com/xmlapi/search?search='+searchParam)
			.success(function(response) {
				console.log(parser.xml_str2json(response));
				//for (var i=0; i<response.length; i++)
				// gameCollection = [];
				// gameCollection = response.xml_str2json;
				// $scope.displayList = gameCollection;
			})
			.error(function(err) {
				console.log(err);
			});
		};
});
