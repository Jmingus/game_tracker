angular.module('app.controllers', [])
.controller('homeCtrl', function($scope, $http) {

	var parser = new X2JS();
	var gameCollection = [];
	$scope.displayList = [];
	$scope.searchParam = '';
	$scope.userGameCollection = [];
	$scope.formmatedGameCollection = [];
	$scope.quickPlayGameList = [];
	$scope.storedUserGameList = [];
	var sort = true;
	$scope.showTable = false;
	$scope.errorMsg = '';
	$scope.playerErrorMsg = '';
	$scope.timeErrorMsg = '';

	//$http.get('/users/'+userId+'/collection')
	$http.get('/users/'+userId+'/collections/')
		.success(function(response) {
			$scope.storedUserGameList = response;
		})
		.error(function(err) {
			console.log(err);
		});

	$scope.nameClick = function() {
		console.log('Name sort clicked');
		if(sort) {
			$scope.displayList.reverse();
			sort = false;
		}
		else {
			$scope.displayList = _.sortBy(gameCollection, function(element) {
				sort = true;
				return element.name;
			});
		}
	};

	$scope.searchSubmit=function(searchParam){
		if(searchParam.length < 2) {
			$scope.errorMsg = "Search requires 2 or more characters";
		}

		$http.get('http://www.boardgamegeek.com/xmlapi/search?search='+searchParam)
			.success(function(response) {
				$scope.showTable = true;
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
						name: gameCollection[i].name.toString() || gameCollection[i].name._text,
						gameId: gameCollection[i]._objectid
					});
				}
				$scope.displayList = $scope.formmatedGameCollection;
				$scope.displayList = _.sortBy($scope.formmatedGameCollection, function(element) {
					return element.name;
				});
			})
			.error(function(err) {
				console.log(err);
			});
		};

	$scope.addItemToCollection = function(gameId) {
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

			//$http.post('/users/'+userId+'/collections',
			$http.post('http://tiny-pizza-server.herokuapp.com/collections/TJJ-hackathon/',
			{
				board_name: $scope.userGameCollection[0].name.toString() || $scope.userGameCollection[0].name._text,
				min_player: $scope.userGameCollection[0].minplayers,
				max_player: $scope.userGameCollection[0].maxplayers,
				playtime: $scope.userGameCollection[0].playingtime,
				published: $scope.userGameCollection[0].yearpublished,
				board_image: $scope.userGameCollection[0].thumbnail
			}
		);
			})
			.error(function(err) {
				console.log(err);
			});
	};

	$scope.quickPlay = function(numOfPlayers, timeAvailable) {
		$scope.quickPlayGameList = [];
		if(angular.isUndefined(numOfPlayers) || numOfPlayers === null) {
			$scope.playerErrorMsg = 'Please enter an amount of players';
			throw 'Number of player is undefined or null';
		}
		if(angular.isUndefined(timeAvailable) || timeAvailable === null) {
			throw 'Time available is undefined or null';
			$scope.timeErrorMsg = 'Please enter a time constraint';
		}

		for(var i=0; i < $scope.storedUserGameList.length; i++) {
			if($scope.storedUserGameList[i].min_player > numOfPlayers || 
				$scope.storedUserGameList[i].max_player < numOfPlayers) {
				console.log('Game'+[i]+' does not meet player requirements');	
			}
			else if($scope.storedUserGameList[i].playtime > timeAvailable) {
				console.log('Game'+[i]+' does not meet time requirements');	
			}
			else {
				console.log('else');
				$scope.quickPlayGameList.push($scope.storedUserGameList[i]);
			}
		}
		console.log($scope.quickPlayGameList);
	};
});
