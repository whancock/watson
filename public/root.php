<!DOCTYPE html>
<html ng-app="watson">
<head>

	<base href="/">

	<meta charset="UTF-8">
	<title>Watson App</title>
	<meta name="author" content="name">
	<meta name="description" content="description here">
	<meta name="keywords" content="keywords,here">
	<link rel="icon" href="favicon.ico" type="image/vnd.microsoft.icon">

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>

    <!-- the angular libs -->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0-beta.5/angular.min.js"></script>
    <script src="https://code.angularjs.org/1.4.0-beta.5/angular-route.min.js"></script>
    <script src="https://code.angularjs.org/1.4.0-beta.5/angular-resource.min.js"></script>

    <!-- angularStrap -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-strap/2.1.6/angular-strap.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-strap/2.1.6/angular-strap.tpl.min.js"></script>

    <!-- load our own stuff -->
    <script src="index.js"></script>
    <script src="app/controllers.js"></script>
    <script src="app/directives.js"></script>
    <script src="app/api.js"></script>

    <link rel="stylesheet" href="app/app.css">
    
    <!-- load d3 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.js"></script>
    
</head>
<body>
	<div ng-view></div>
</body>
</html>
