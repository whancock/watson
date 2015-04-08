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


    	ctrl.needsApproval = false;
    	ctrl.currentQuestion = '';
    	ctrl.currentAnswer = '';

	/*
    	  ctrl.setQAPairs = [{
    	  question: "what is this question?",
    	  answer: "It's a moose!"
    	  }, {
    	  question: "What in the hell?",
    	  answer: "Yeah yeah!"
    	  }];
	*/

        ctrl.setQAPairs = [
            
            {
    		question: "What are good crops to grow in Kigali, Rwanda?",
    		answer: "Reliant on rain-fed agriculture, Rwanda is highly vulnerable to climate change. Increases in temperature and changes to rainfall patterns, resulting in floods, landslides and droughts, significantly reduce crop yields, negatively impacting livelihoods, food security and export earnings. Rising temperatures are also predicted to increase the spread of pests and diseases, while the yield of some crops (including maize and rice) is forecast to drop by 10-15 per cent for every one degree Centigrade rise in minimum temperature. And as temperatures rise, the altitudes at which tea and coffee can be grown will also rise, which may affect the land available to grow these crops, due to differing soils and steeper slopes, and lead to conflict over land."
    	    },
    	    {
    		question: "What are the most popular crops in Kigali, Rwanda?",
    		answer: "The favorable climatic conditions and the generally fertile soils allow cultivation of a wide range of crops in Rwanda. Major food crops include maize, rice, banana (cooking, beer and fruit), Irish potato, sweet potato, cassava, sorghum and beans. Vegetables such as onions, cabbages, dodo, gourds, and eggplants are also widely grown. Cash crops such as coffee, tea and sugarcane are grown on commercial  scales forexports and domestic consumption in Rwanda."
    	    },
            {
		question: "How do I cultivate bananas?",
		answer: "Bananas need rich, moisture and well-drained soil with 40% clay, 75% silt, 85% loam. Bananas prefer a more acidic soil with pH between 6-7.5. Low pH soil makes banana more susceptible to Panama disease. Avoid soil that is sandy, salty, nutritionally deficient and ill-drained soil. If soil is not in the most favorable condition, improve it! Light sandy soil can be improved by placing mulch around the Banana plants. This will improve water retention and prevent nutrients from percolating quickly into the soil. Nutritionally deficient soil can be improved by incorporating organic matter to the soil before you plant your Bananas and then mulch them thickly. This process should be repeated as often as possible. Bananas do not tolerate waterlogging because its roots will rot. This however can be resolved by planting the Bananas in raised beds."
    	    }];
	/*
	  var cannedResponses = [
          'You are a cow!',
          'I am mr kite!',
          'Go away!'
	  ];
	*/
        var cannedResponses = {
            "What can I intercrop with bananas?": ["They have found that banana-coffee intercrop systems have the potential to be the most beneficial for farmers because they leave the yield of the coffee crop virtually untouched, while providing a little something extra in the form of more food for their personal use. Essentially, by combining the two crops farmers are greatly increasing the total yield value of a single plot of land, even if the yield for individual crops doesn’t change much. Bananas are to coffee crops what our free soda is to pizzerias – it doesn’t change the pizza, but it’s a nice bonus nonetheless.",
						   
						   "Inter cropping of of vegetables and bananas is not feasible after 6 months. The reason behind this is that vegetables need a lot of sun.If grow vegetables under shade, they tend to suffer from diseases and pests. However, the ginger crop needs shade. It is common practice in several places to use ginger under the perennial creeper crops of vegetables. Hence it is better to go for ginger as an inter-crop for bananas. The only thing to worry about is that ginger must be planted on elevated beds, with channels to avoid water logging. If needed, please contact for a tutorial on ginger planting at: (555)-555-5555."],
            
            "How do I cultivate ginger?": ["Ginger prefers rich, fertile soil. Soil rich in organic matter provides ginger with the nutrients it needs to produce flavourful, healthy rhizomes, without the need for additional fertilisers and amendments. If your soil is lacking in organic matter, stick to a regular fertilisation schedule for your ginger plant. Some ginger plants suffer tip rot, in which the tip of the rhizome begins to decay. This indicates a lack of calcium in the soil; therefore, a calcium amendment may be necessary. When adding fertilisers and supplements in areas of high rainfall, remember that rainwater pulls and leaches applications from the soil; therefore, try not to fertilise ginger plants directly before a rainstorm.",
					   
					   "Moist, well-draining soil is optimal for ginger plants. It is important that the soil mixture hold moisture; however, it is important that ginger plants not be exposed to overly saturated or waterlogged soil. The best soils for draining and moisture retention include sandy or loamy mixtures. Create a soil mixture using one part sand and one part compost for optimal drainage, as well as the proper amount of organic matter for fertilisation. Because ginger develops beneath the soil, adequate soil coverage is also required to protect the rhizome from the elements above ground. Guard against soil erosion, due to wind and rainfall, by providing a sheltered area for your ginger plant to grow."]
        };
        
    	ctrl.askQuestion = function(question) {
    	    ctrl.needsApproval = true;
    	    ctrl.currentQuestion = question;
    	    //ctrl.currentAnswer = cannedResponses.pop();
    	    ctrl.currentAnswer = cannedResponses[ctrl.currentQuestion].pop();
    	    ctrl.question = '';
    	};

	// Questions for the chat: instantly approved. Merges .askQuestion() and .approve()

	ctrl.chatQuestion = function(question) {
    	    ctrl.needsApproval = false;
    	    ctrl.currentQuestion = '';

	    cannedAnswer = "Hmm... I'm not sure.";
	    if (question in cannedResponses) {cannedAnswer = cannedResponses[question].pop();}

	    this.setQAPairs.push({
    		question: question,
    		answer: cannedAnswer //"I don't know"//cannedResponses[question].pop()// TODO or "I don't know"
    	    });
	    ctrl.question = '';
    	    //ctrl.currentAnswer = cannedResponses.pop();
    	    // ctrl.currentAnswer = cannedResponses[ctrl.currentQuestion].pop();
    	    
    	};
	

    	ctrl.approve = function() {

    	    this.setQAPairs.push({
    		question: ctrl.currentQuestion,
    		answer: ctrl.currentAnswer
    	    });

    	    ctrl.needsApproval = false;
    	    ctrl.currentQuestion = '';
    	    ctrl.currentAnswer = '';
    	};

    	ctrl.deny = function() {

    	    //ctrl.needsApproval = false;
    	    //ctrl.currentQuestion = '';
    	    //ctrl.currentAnswer = '';

    	    //ctrl.currentAnswer = cannedResponses.pop();
    	    ctrl.currentAnswer = cannedResponses[ctrl.currentQuestion].pop();

    	};


    }])

;
