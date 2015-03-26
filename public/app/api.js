angular.module('watson').

factory('WsWatson', ['$resource', function($resource) {

	return $resource('https://watson-wdc01.ihost.com/instance/522/deepqa/v1/question', {

	}, {

		ask: {
			method: 'POST',
			isArray: false,
			headers: {
				"Content-type": "application/json", 
				"Accept": "application/json", 
				"X-SyncTimeout": "30", 
				"Authorization": "Basic Z2F0X2FkbWluaXN0cmF0b3I6S1lwRHBsMGU=",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "application/json"
			} 
		}

	})

}]);