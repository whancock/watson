angular.module('watson', ['ngRoute', 'ngResource'])

.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {

	$locationProvider.html5Mode(true);




	//allow cors
	//$httpProvider.defaults.useXDomain = true;
	//$httpProvider.defaults.withCredentials = true;
	//delete $httpProvider.defaults.headers.common["X-Requested-With"];
	//$httpProvider.defaults.headers.common["Accept"] = "application/json";
	//$httpProvider.defaults.headers.common["Content-Type"] = "application/json";





	$routeProvider.when('/', {
		templateUrl: 'templates/index.html',
		controller: 'WatsonCtrl'
	}).otherwise({
		redirectTo: '/'
	});

}]);