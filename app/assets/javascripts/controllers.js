angular.module('app.controllers', [])
.controller('homeCtrl', function($scope, $http) {

	var gameCollection = [];
	$scope.searchParam = '';
	$scope.searchSubmit=function(searchParam){
		console.log("click");
		// $http.get('http://www.boardgamegeek.com/xmlapi/search?search='+searchParam+'&exact=1')
		$http.get('http://www.boardgamegeek.com/xmlapi/search?search='+searchParam)
			.success(function(response) {
				console.log(response);
				console.log(typeof response);
				for (var i=0; i<response.length; i++)
				gameCollection = [];
				gameCollection = response;
				// $scope.changeArray = _.sortBy($scope.stateList, function(element) {
				// 	return element.title.toLowerCase();
				// });
			})
			.error(function(err) {
				console.log(err);
			});
		};
});
