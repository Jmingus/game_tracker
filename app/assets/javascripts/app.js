angular.module('app', ['app.controllers', 'ui.router'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$stateProvider
	.state ('home' , {
		url: '/',
		templateUrl: 'templates/home.html',
		controller: 'homeCtrl'
	})
	.state('profile', {
		url: '/profile',
		templateUrl: 'templates/profile.html',
		controller: ''
	})
	.state('boardGame', {
		url: '/boardGame',
		templateUrl: 'templates/boardGame.html',
		controller: ''
	})
	.state('quickPlay', {
		url: '/quickPlay',
		templateUrl: 'templates/quickPlay.html',
		controller: ''
	})
	.state('gamerBudies', {
		url: '/gamerBuddies',
		templateUrl: 'templates/gamerBuddies.html',
		controller: ''
	})
	.state('addGame', {
		url: '/addGame',
		templateUrl: 'templates/addGame.html',
		controller: 'homeCtrl'
	});
	$urlRouterProvider.otherwise('/');
});
