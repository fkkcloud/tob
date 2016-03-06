angular.module('MainCtrl', []).controller('MainController', function($scope) {

	// map data size 45 * 8 WIP
	$scope.map = {};
	
	$scope.map.width = 45;
	$scope.map.height = 8;

	$scope.bloodColor = '#800020';
	$scope.blockColor = '#00CDCD';
	$scope.emptyColor = '#474646';

	console.log(window.localStorage.ratedMapIds);
	if (!window.localStorage.ratedMapIds || window.localStorage.ratedMapIds == undefined || window.localStorage.ratedMapIds == 'undefined')
		window.localStorage.ratedMapIds = [];

	//$scope.href_game = "http://localhost:4000/";
	$scope.href_game = (document.location.hostname == "localhost" || document.location.hostname == "192.168.0.10") ? "http://192.168.0.10:4000/" : "http://kingsl-tob.herokuapp.com/";

	$scope.mapData = 
		[
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],

			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],

			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],

			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],

			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],

			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],

			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],

			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],

			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0]

		];	
	
	$scope.resetMapData = function(){
		for (var i = 0; i < $scope.mapData.length; i++){
			for (var j = 0; j < $scope.mapData[i].length; j++){
				$scope.mapData[i][j] = 0;
			}
		}
	}

	$scope.loadMapDataFromLocalStorage = function(){
		if (window.localStorage.mapData == undefined || window.localStorage.mapData == 'undefined')
			return false;

		$scope.mapData = JSON.parse(window.localStorage.mapData);
		//console.log($scope.mapData);
		return true;
	}

	$scope.saveMapDataToLocalStorage = function(){
		window.localStorage.mapData = JSON.stringify($scope.mapData);
	}

	$scope.resetMapDataFromLocalStorage = function(){
		if (window.localStorage.mapData == undefined || window.localStorage.mapData == 'undefined')
			return;

		window.localStorage.mapData = undefined;
	}

});