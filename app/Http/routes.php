<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


Route::get('/', function() {
    return View('root');
});

Route::any('project', function() {
    return View('root');
});


Route::group(array('prefix' => 'api'), function() {




    Route::resource('questions', 'QuestionController');
    Route::resource('conversations', 'ConversationController');
    Route::resource('answers', 'AnswerController');

    Route::resource('conversations.questions', 'ConversationQuestionController');





    /*
     * our watson backend
     */
    Route::get('ask/{question}', function($question) {

        $question = urldecode($question);

        $username = Config::get('watson.username');
        $password = Config::get('watson.password');

        $url = "https://watson-wdc01.ihost.com/instance/522/deepqa/v1/question";

	$data = array
		(
			"question" => array
			(
				"questionText" => $question,
				"items" => 10,
				"evidenceRequest" => array
				(
					"items" => 10
				),
			)
		);

        $headers = array(
            "Content-type: application/json",
            "Accept: application/json",
            "X-SyncTimeout: 30"
            );

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));

        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($curl, CURLOPT_USERPWD, $username . ":" . $password);

        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

        $result = curl_exec($curl);

        curl_close($curl);

        return $result;
    });

});
