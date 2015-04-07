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

	}])

    .controller('ProjectCtrl', [function() {

    	var ctrl = this;


    	ctrl.setQAPairs = [{
    		question: "what is this question?",
    		answer: "It's a moose!"
    	}, {
    		question: "What in the hell?",
    		answer: "Yeah yeah!"
    	}];

    	var cannedResponses = [
    		'You are a cow!',
    		'I am mr kite!',
    		'Go away!'
    	];

    	ctrl.askQuestion = function(question) {
    		this.setQAPairs.push({
    			question: question,
    			answer: cannedResponses.pop()
    		});
    		ctrl.question = '';
    	};


    }])

;
