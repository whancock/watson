angular.module('watson')

.controller('WatsonCtrl', ['WsWatson', function(WsWatson) {

	var ctrl = this;

	ctrl.askWatson = function(question) {

		WsWatson.ask({
			question: question
		}, function(result) {
			//console.log(result);
			ctrl.watsonResult = result.question
		});
	};
}]);