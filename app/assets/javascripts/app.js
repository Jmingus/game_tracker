angular.module('app', ['app.controllers', 'ui.router'])
.config(function($stateProvider, $urlRoutProvider) {
	$stateProvider
	.state ('menu' , {
		url: '/menu',
		templateUrl: 'templates/menu.url',
		controller: ''
	})
	.state('profile', {
		url: '/profile',
		templateUrl: 'templates/profile.url',
		controller: ''
	})
	.state('boardGame', {
		url: '/boardGame',
		templateUrl: 'templates/boardGame.url',
		controller: ''
	})
	.state('quickPlay', {
		url: '/quickPlay',
		templateUrl: 'templates/quickPlay.url',
		controller: ''
	})
	.state('gamerBudies', {
		url: '/gamerBuddies',
		templateUrl: 'templates/gamerBuddies.url',
		controller: ''
	});
	//$urlRouterProvider.otherwise('/menu');
});

