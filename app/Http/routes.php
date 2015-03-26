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

//Route::get('/', 'WelcomeController@index');

/*Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);*/

Route::get('/', function() {   
    View::make('index'); // will return app/views/index.php 
});

Route::get('ask/{question}', function($question) {

	$question = urldecode($question);

    $username = Config::get('watson.username');
    $password = Config::get('watson.password');

	$url = "https://watson-wdc01.ihost.com/instance/522/deepqa/v1/question";

	$data = array("question" => array("questionText" => $question));

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


Route::group(array('prefix' => 'api'), function() {

    // since we will be using this just for CRUD, we won't need create and edit
    // Angular will handle both of those forms
    // this ensures that a user can't access api/create or api/edit when there's nothing there
    Route::resource('project', 'ProjectController');
  
});


App::missing(function($exception) { 
    return View::make('index'); 
});