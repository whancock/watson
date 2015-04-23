angular.module('watson')

    .controller('WatsonCtrl', ['WsWatson', 'WsConversations', 'WsData', function(WsWatson, WsConversations, WsData) {

	var ctrl = this;

	WsData.query(function(data) {
            ctrl.mockedData = data;
	});

	ctrl.askWatson = function(question) {
	    WsWatson.ask({
		question: question
	    }, function(result) {
    		//console.log(result);
		ctrl.watson_result = {
                    meta: {
			qclasslist: result.question.qclasslist,
			focuslist: result.question.focuslist,
			latlist: result.question.latlist,
			synonymlist: result.question.synonymlist,	
                    },
                    answers: result.question.answers,
                    evidence: result.question.evidencelist
		};
            });
	};

    }])

    .controller('ProjectCtrl', ['WsData','WsWatson', function(WsData, WsWatson) {

	var ctrl = this;


	WsData.query(function(data) {
            //ctrl.mockedData = data;
            ctrl.setQAPairs = [];
            ctrl.cannedResponses = [];
            // ctrl.setQAPairs = data.seedResponses;
            // ctrl.cannedResponses = data.cannedResponses;
 	});


	ctrl.savedAnswers = [];
	ctrl.pinAnswer = function(question, answer) {
	    ctrl.savedAnswers.push({
		question: question,
		answer: answer
	    });
	};

	ctrl.needsApproval = false;
	ctrl.currentQuestion = '';
	ctrl.currentAnswer = '';



	// Questions for the chat: instantly approved. Merges .askQuestion() and .approve()
	ctrl.chatQuestion = function(question) {

	    //var CQ = this;
	    ctrl.needsApproval = false;
	    ctrl.currentQuestion = '';

	    var cannedAnswer = {
		evidence: [],
		link: "NA",
		answer: "Hmm... I'm not sure."
	    };

	    if (question in ctrl.cannedResponses) {
		cannedAnswer = ctrl.cannedResponses[question].pop();
	    }

	    ctrl.currentAnswer = cannedAnswer;


	    ctrl.setQAPairs.push({
		question: question,
		answer: cannedAnswer.answer
	    });

	    ctrl.question = ''; // clear input box after submission
	};


	// Questions for the chat, this time asking Watson (instead of stored data)
	ctrl.chatWatson = function(question) {

	    ctrl.needsApproval = false;
	    ctrl.currentQuestion = '';

	    var cannedAnswer = { // I suppose this isn't necessary, but it can't hurt
		evidence: [],
		link: "NONE",
		answer: "Hmm... I'm not sure."
	    };

	    ctrl.setQAPairs.push({
		question: question,
		answer: "..."
	    });		

	    //cannedAnswer = ctrl.cannedResponses[question].pop();
	    WsWatson.ask({
		question: question,
	    }, function(result) {
		answer = result.question.evidencelist[0].text || "I'm not sure, but " + result.question.evidencelist[1].text;
		// if no answer...

		cannedAnswer = {
                    meta: {
			qclasslist: result.question.qclasslist,
			focuslist: result.question.focuslist,
			latlist: result.question.latlist,
			synonymlist: result.question.synonymlist,	
                    },
                    answers: result.question.answers,
		    //answer: result.question.answers[0],
		    //answer: result.question.evidencelist[0].text, // This is a little goofy and doesn't always work. Look into the difference between evidence and answers for Watson
		    answer: answer,
		    link: "NONE",
                    evidence: result.question.evidencelist
		};
		ctrl.currentAnswer = cannedAnswer;
		//this.setQAPairs.push({
		ctrl.setQAPairs.pop();
		ctrl.setQAPairs.push({
		    question: question,
		    answer: cannedAnswer.answer
		});
		console.log(cannedAnswer.answer);
            });

	    //ctrl.currentAnswer = cannedAnswer;
	    // this.setQAPairs.push({
	    // 	question: question,
	    // 	answer: cannedAnswer.answer
	    // });
	    // console.log(cannedAnswer.answer);
	    ctrl.question = ''; // clear input box after submission
	};
    }])


    .controller('ForumControl', function(WsForum) {


	var ctrl = this;

	WsForum.query(function(data) {

	    ctrl.fdata = data;

	});

	ctrl.showDetails = function(question) {
	    ctrl.detailQuestion = question;
	}

    ctrl.addVote = function() {
      ctrl.detailQuestion.data.votes++;
    };

    ctrl.subVote = function() {
      ctrl.detailQuestion.data.votes--;
    };

    ctrl.addQuestion = function(question) {

      var qObj = {
        question: question,
        answers: [],
        data: {
          tags: [],
          votes: 0
        }
      };

      ctrl.fdata.questions.push(qObj);
      ctrl.curQuestion = "";
      ctrl.detailQuestion = qObj;
    };

    ctrl.addAnswer = function(answer) {
      ctrl.detailQuestion.answers.push(answer);
      ctrl.curAnswer = ""
    };


    })
;
