angular.module('watson')

    .controller('WatsonCtrl', ['WsWatson', 'WsConversations', function(WsWatson, WsConversations) {

	var ctrl = this;

	ctrl.askWatson = function(question) {

		WsWatson.ask({
			question: question
		}, function(result) {
			//console.log(result);
			ctrl.watsonResult = result.question
		});
	};

	// WsConversations.query({},function(data) {
	//     ctrl.conversations = data;
	// });

}]);
