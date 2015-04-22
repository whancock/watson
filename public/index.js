angular.module('watson', ['ngRoute', 'ngResource', 'mgcrea.ngStrap'])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$locationProvider.html5Mode(true);

	$routeProvider.when('/', {
		templateUrl: 'templates/index.html'
	}).when('/project', {
		templateUrl: 'templates/project.html'
	}).when('/forum', {
		templateUrl: 'templates/forum.html'
	}).otherwise({
		redirectTo: '/'
	});

}]);