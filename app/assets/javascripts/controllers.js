angular.module('app.controllers', [])
.controller('homeCtrl', function($scope, $http) {

	var parser = new X2JS();
	var gameCollection = [];
	$scope.displayList = [];
	$scope.searchParam = '';
	$scope.checkBox = false;
	$scope.userGameCollection = [];
	$scope.formmatedGameCollection = [];
	$scope.x = 0;
	var sort = true;
	$scope.showTable = false;
	$scope.errorMsg = '';

	$scope.nameClick = function() {
		console.log('Name sort clicked');
		if(sort) {
			$scope.displayList.reverse();
			sort = false;
		}
		else {
			$scope.displayList = _.sortBy(gameCollection, function(element) {
				sort = true;
				return element.toString().toLowerCase() || element._.text.toLowerCase();
			});
		}
	};

	// $scope.yearClick = function() {
	// 	console.log('Year sort clicked');
	// 	if
	// }

	$scope.searchSubmit=function(searchParam){
		if(searchParam.length < 2) {
			$scope.errorMsg = "Search requires 2 or more characters";
		}

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
				$scope.formmatedGameCollection = [];
				for(var i=0; i<gameCollection.length; i++) {
					$scope.formmatedGameCollection.push({
						yearpublished: gameCollection[i].yearpublished,
						name: gameCollection[i].name.toString() || gameCollection[i].name._text
					});
				}
				console.log($scope.formmatedGameCollection);
				$scope.displayList = $scope.formmatedGameCollection;
			})
			.error(function(err) {
				console.log(err);
			});
		};

	$scope.addItemToCollection = function(gameId) {
		console.log('add item clicked');
		$http.get('http://www.boardgamegeek.com/xmlapi/boardgame/'+gameId)
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

			$http.post('/users/current_user/collections()',
			{
				board_name: $scope.userGameCollection[0].name.toString(),
				min_player: $scope.userGameCollection[0].minplayers,
				max_player: $scope.userGameCollection[0].maxplayers,
				playtime: $scope.userGameCollection[0].playingtime,
				published: $scope.userGameCollection[0].yearpublished,
				board_image: $scope.userGameCollection[0].yearpublished
			}
		);
			})
			.error(function(err) {
				console.log(err);
			});
	};

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
