angular.module('app.controllers', [])
.controller('appCtrl', function($scope, $http) {

	var parser = new X2JS();
	var gameCollection = [];
	var sort = true;
	$scope.displayList = [];
	$scope.searchParam = '';
	$scope.userGameCollection = [];
	$scope.formmatedGameCollection = [];
	$scope.quickPlayGameList = [];
	$scope.storedUserGameList = [];
	$scope.showTable = false;
	$scope.errorMsg = '';
	$scope.playerErrorMsg = '';
	$scope.timeErrorMsg = '';
	$scope.currentTab ='description';
	$scope.primaryName = 'test';

	function getStoredUserCollection() {
		$http.get('/users/'+userId+'/collections/')
			.success(function(response) {
				$scope.storedUserGameList = response;
				console.log($scope.storedUserGameList);
			})
			.error(function(err) {
				console.log(err);
			});
	};

	getStoredUserCollection();

	$scope.tabClick = function(whichTab) {
		console.log(whichTab+' Tag clicked');
		$scope.currentTab = whichTab;
	}

	$scope.changeGameName = function(name, desc, min, max, play, year) {
		$scope.primaryName = name.split(',');
		$scope.primaryName = $scope.primaryName[0];
		$scope.gameDesc = desc;
		$scope.gameMin = min;
		$scope.gameMax = max;
		$scope.gamePlay = play;
		$scope.gameYear = year;
	}

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
				if(gameCollection.length === 0) {
					$scope.errorMsg = "No game found. Sorry!";
					$scope.showTable = false;
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
			console.log($scope.userGameCollection[0].thumbnail);
			$http.post('/users/'+userId+'/collections',
			{
				board_name: $scope.userGameCollection[0].name.toString() || $scope.userGameCollection[0].name._text,
				min_player: $scope.userGameCollection[0].minplayers,
				max_player: $scope.userGameCollection[0].maxplayers,
				playtime: $scope.userGameCollection[0].playingtime,
				published: $scope.userGameCollection[0].yearpublished,
				image: $scope.userGameCollection[0].thumbnail,
				description: $scope.userGameCollection[0].description
			}
		);
			})
			.error(function(err) {
				console.log(err);
			});
			getStoredUserCollection();
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
	};
})
.controller('boardGameCtrl', function() {

})
.controller('homeCtrl', function() {

})
.controller('quickPlayCtrl', function() {

});
