angular.module('app.controllers', [])
.controller('homeCtrl', function($scope, $http) {

	var gameCollection = [];

	$http.get('http://www.boardgamegeek.com/xmlapi/search?search=$scope.gameSearcg&exact=1')
		.success(function(response) {

			gameCollection = [];
			gameCollection = response.results;
			// $scope.changeArray = _.sortBy($scope.stateList, function(element) {
			// 	return element.title.toLowerCase();
			// });
		})
		.error(function(err) {
			console.log(err);
		});
});