angular.module('MainCtrl', []).controller('MainController', function($scope) {

	// map data size 45 * 8 WIP
	$scope.map = {};
	
	$scope.map.width = 200;
	$scope.map.height = 8;

	$scope.bloodColor = '#800020';
	$scope.blockColor = '#00CDCD';
	$scope.emptyColor = '#474646';
	$scope.trapColor  = '#551A8B';
	$scope.endColor   = '#FF69B4';

	if (!window.localStorage.ratedMapIds || window.localStorage.ratedMapIds == null || window.localStorage.ratedMapIds == undefined || window.localStorage.ratedMapIds == 'undefined'){
		var newArray = {'data':['1234567890']};
		window.localStorage.ratedMapIds = JSON.stringify(newArray);
	}

	//$scope.href_game = "http://localhost:4000/";
	$scope.href_game = (document.location.hostname == "localhost" || document.location.hostname == "192.168.0.11") ? "http://192.168.0.11:4000/" : "http://kingsl-tob.herokuapp.com/";
	$scope.href_edit = (document.location.hostname == "localhost" || document.location.hostname == "192.168.0.11") ? "http://192.168.0.11:4000/map/edit" : "http://kingsl-tob.herokuapp.com/map/edit";

	function createMapData(){
		var arr = [];
		for (var i = 0; i < $scope.map.width; i++){
			var col = [0, 0, 0, 0, 0, 0, 0, 0];
			arr.push(col);
		}
		return arr;
	}
	$scope.mapData = createMapData();
	
	$scope.resetMapData = function(){
		$scope.mapData = createMapData();
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