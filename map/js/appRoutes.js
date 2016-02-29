angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/maps.html',
			controller: 'MapsController'
		})

		.when('/edit', {
			templateUrl: 'views/edit.html',
			controller: 'EditController'	
		});

	$locationProvider.html5Mode(true);

}]);