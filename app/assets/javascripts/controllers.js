angular.module('app.controllers', ['ngSanitize'])
.controller('appCtrl', function($scope, $http) {

	var parser = new X2JS();
	var gameCollection = [];
	var sort = true;
	$scope.showSpinner = false;
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

	$scope.getStoredUserCollection = function() {
		$http.get('/users/'+userId+'/collections/')
			.success(function(response) {
				$scope.storedUserGameList = response;
			})
			.error(function(err) {
				console.log(err);
			});
	};

	$scope.getStoredUserCollection();

	$scope.tabClick = function(whichTab) {
		$scope.currentTab = whichTab;
	};

	$scope.changeGameName = function(name, desc, min, max, play, year) {
		$scope.primaryName = name;
		$scope.gameDesc = desc;
		$scope.gameMin = min;
		$scope.gameMax = max;
		$scope.gamePlay = play;
		$scope.gameYear = year;
	};

	$scope.removeGameFromVault = function(name) {
		for(var i=0; i < $scope.storedUserGameList.length; i++) {
			if(name == $scope.storedUserGameList[i].board_name) {
				$http.delete('/users/'+userId+'/collections/'+$scope.storedUserGameList[i].id);
				$scope.storedUserGameList.splice(i,1);
			}
		}
		$route.current.templateUrl = home.html;
	};

	$scope.nameClick = function() {
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
		$scope.showSpinner = true;
		$scope.errorMsg = '';
		if(searchParam.length < 2) {
			$scope.showSpinner = false;
			$scope.errorMsg = "Search requires 2 or more characters";
		}

		//$http.get('http://www.boardgamegeek.com/xmlapi/search?search='+searchParam)
		$http.get('http://tiyfe-proxy.herokuapp.com/http%3A%2F%2Fwww.boardgamegeek.com%2Fxmlapi%2Fsearch%3Fsearch%3D%27'+searchParam)
			.success(function(response) {
				$scope.showSpinner = false;
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
				} else {
					$scope.errorMsg = '';
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

	$scope.addItemToCollection = function(gameId, name) {
		//$http.get('http://www.boardgamegeek.com/xmlapi/boardgame/'+gameId)
		$http.get('http://tiyfe-proxy.herokuapp.com/http%3A%2F%2Fwww.boardgamegeek.com%2Fxmlapi%2Fboardgame%2F'+gameId)
			.success(function(response) {

				$scope.userGameCollection = parser.xml_str2json(response);
				$scope.userGameCollection = $scope.userGameCollection.boardgames.boardgame;
				if(!$scope.userGameCollection) {
					$scope.userGameCollection = [];
				}
				if(!_.isArray($scope.userGameCollection)) {
					$scope.userGameCollection = [$scope.userGameCollection];
				} 
			$http.post('/users/'+userId+'/collections',
			{
				board_name: name,
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
	};

	$scope.quickPlay = function(numOfPlayers, timeAvailable) {
		$scope.quickPlayGameList = [];
		if(angular.isUndefined(numOfPlayers) || numOfPlayers === null) {
			$scope.playerErrorMsg = 'Please enter an amount of players';
		}
		if(angular.isUndefined(timeAvailable) || timeAvailable === null) {
			$scope.timeErrorMsg = 'Please enter a time constraint';
		}

		for(var i=0; i < $scope.storedUserGameList.length; i++) {
			if($scope.storedUserGameList[i].min_player > numOfPlayers || 
				$scope.storedUserGameList[i].max_player < numOfPlayers) {
			}
			else if($scope.storedUserGameList[i].playtime > timeAvailable) {
			}
			else {
				$scope.quickPlayGameList.push($scope.storedUserGameList[i]);
			}
		}
	};
})
.controller('boardGameCtrl', function() {

})
.controller('homeCtrl', function($scope) {
	$scope.getStoredUserCollection();
})
.controller('quickPlayCtrl', function() {

});
