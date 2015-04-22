angular.module('watson')


	.factory('WsWatson', ['$resource', function($resource) {

		return $resource('/index.php/api/ask/:question', {}, {
			ask: {
				method: 'GET',
				isArray: false
			}
		})
	}])


	.factory('WsConversations', ['$resource', function($resource) {

	    return $resource('/index.php/api/conversations/', {}, {
	    	// default GET
	    })
	}])

	.factory('WsData', ['$resource', function($resource) {
		return $resource('/data.json', {}, {
			query: {
				isArray: false
			}
		});
	}])

	.factory('WsForum', ['$resource', function($resource) {
		return $resource('/dataforum.json', {}, {
			query: {
				isArray: false
			}
		});
	}])

;
