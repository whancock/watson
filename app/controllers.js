angular.module('watson')

.controller('WatsonCtrl', ['$scope', 'WsWatson', function($scope, WsWatson) {

	console.log('we hit the controller');

	WsWatson.ask('something');

}]);