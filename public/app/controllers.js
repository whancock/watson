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

.controller('ProjectCtrl', ['WsData', function(WsData) {

   var ctrl = this;


   WsData.query(function(data) {
        //ctrl.mockedData = data;
        ctrl.setQAPairs = data.seedResponses;
        ctrl.cannedResponses = data.cannedResponses;
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


    this.setQAPairs.push({
      question: question,
      answer: cannedAnswer.answer
  });

    ctrl.question = '';
};


    	/*ctrl.approve = function() {

    	    this.setQAPairs.push({
        		question: ctrl.currentQuestion,
        		answer: ctrl.currentAnswer.answer
    	    });

    	    ctrl.needsApproval = false;
    	    ctrl.currentQuestion = '';
    	    ctrl.currentAnswer = {};

    	};

    	ctrl.deny = function() {
    	    ctrl.currentAnswer = cannedResponses[ctrl.currentQuestion].pop();
    	};*/


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


  })
;
