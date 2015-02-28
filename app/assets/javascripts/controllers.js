angular.module('app.controllers', [])
.controller('homeCtrl', function($scope, $http) {

	var parser = new X2JS();
	var gameCollection = [];
	$scope.displayList = [];
	$scope.searchParam = '';
	$scope.checkBox = false;
	$scope.userGameCollection = [];
	$scope.x = 0;

	$scope.searchSubmit=function(searchParam){
		$http.get('http://www.boardgamegeek.com/xmlapi/search?search='+searchParam)
			.success(function(response) {
				 gameCollection = parser.xml_str2json(response);
				 gameCollection = gameCollection.boardgames.boardgame;
				 if(!gameCollection) {
				 	gameCollection = [];
				 }
				 if(!_.isArray(gameCollection)) {
				 	gameCollection = [gameCollection];
				 } 
				 $scope.displayList = gameCollection;
			})
			.error(function(err) {
				console.log(err);
			});
		};

	$scope.addItemToCollection = function(gameId) {
		console.log('add item clicked');
		console.log(gameId);
		$http.get('http://www.boardgamegeek.com/xmlapi/boardgame/'+gameId)
		//$http.get('http://www.boardgamegeek.com/xmlapi/search?search='+gameId+'&exact=1')
			.success(function(response) {
				 $scope.userGameCollection = parser.xml_str2json(response);
				 $scope.userGameCollection = $scope.userGameCollection.boardgames.boardgame;
				 if(!$scope.userGameCollection) {
				 	$scope.userGameCollection = [];
				 }
				 if(!_.isArray($scope.userGameCollection)) {
				 	$scope.userGameCollection = [$scope.userGameCollection];
				 } 
				 console.log($scope.userGameCollection);
				 console.log($scope.userGameCollection[0].name.toString());
			})
			.error(function(err) {
				console.log(err);
			});

		$http.post(
			'/users/:user_id/collections(.:json)',
			{
				board_name: $scope.userGameCollection[0].name._text,
				min_player: $scope.userGameCollection[0].minplayers,
				max_player: $scope.userGameCollection[0].maxplayers,
				playtime: $scope.userGameCollection[0].playingtime,
				published: $scope.userGameCollection[0].yearpublished,
				board_image: $scope.userGameCollection[0].yearpublished
			}
		);
	}

	$scope.$watch('searchParam', function() {
		if($scope.filterBy === '') {
			$scope.displayList = _.filter($scope.gameCollection, function(element) {
			return element.name.toString().indexOf($scope.searchParam) >= 0;  
		});
		}
		else {
			$scope.displayList = _.filter($scope.gameCollection, function(element) {
				return element.name.toString().indexOf($scope.searchParam) >= 0;  
			});
		}
	});
});
