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
	$scope.movingTrapColor   = '#39122f';
	$scope.movingTrapColor2  = '#3912ff';

	if (!window.localStorage.ratedMapIds || window.localStorage.ratedMapIds == null || window.localStorage.ratedMapIds == undefined || window.localStorage.ratedMapIds == 'undefined'){
		var newArray = {'data':['1234567890']};
		window.localStorage.ratedMapIds = JSON.stringify(newArray);
	}

	//$scope.href_game = "http://localhost:4000/";
	$scope.href_game = (document.location.hostname == "localhost" || document.location.hostname == "192.168.0.10") ? "http://192.168.0.10:4000/" : "http://www.touchofblood.com/";
	$scope.href_edit = (document.location.hostname == "localhost" || document.location.hostname == "192.168.0.10") ? "http://192.168.0.10:4000/map/edit" : "http://www.touchofblood.com/map/edit";

	// map data
	function createMapData(){
		var arr = [];
		for (var i = 0; i < $scope.map.width; i++){
			var col = [0, 0, 0, 0, 0, 0, 0, 0];
			arr.push(col);
		}
		return arr;
	}
	$scope.mapData = createMapData();
	$scope.mapSpeed = {};
	$scope.jumpScale = {};
	
	// reset map data
	$scope.resetMapData = function(){
		$scope.mapData = createMapData();
		for (var i = 0; i < $scope.mapData.length; i++){
			for (var j = 0; j < $scope.mapData[i].length; j++){
				$scope.mapData[i][j] = 0;
			}
		}
		$scope.mapSpeed = {value:1.3};
		$scope.jumpScale = {value:1.0};
	}

	// map data ------------------------------------------------------------------------------------------------------------------------------------------------
	$scope.loadMapDataFromLocalStorage = function(){
		if (window.localStorage.mapData == undefined || window.localStorage.mapData == 'undefined')
			return false;
		$scope.mapData = JSON.parse(window.localStorage.mapData);
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

	// map speed ------------------------------------------------------------------------------------------------------------------------------------------------
	$scope.loadMapSpeedFromLocalStorage = function(){
		if (window.localStorage.mapSpeed == undefined || 
			window.localStorage.mapSpeed == 'undefined' || 
			window.localStorage.mapSpeed == 1.3 || 
			window.localStorage.mapSpeed == ''){
			$scope.mapSpeed['value'] = 1.3;
			return;
		}
		$scope.mapSpeed['value'] = JSON.parse(window.localStorage.mapSpeed).value;
	}
	$scope.saveMapSpeedToLocalStorage = function(){
		window.localStorage.mapSpeed = JSON.stringify($scope.mapSpeed);
	}
	$scope.resetMapSpeedFromLocalStorage = function(){
		if (window.localStorage.mapSpeed == undefined || 
			window.localStorage.mapSpeed == 'undefined')
			return;
		window.localStorage.mapSpeed = undefined;
	}
	$scope.loadMapSpeedFromLocalStorage();

	// jump scale ------------------------------------------------------------------------------------------------------------------------------------------------
	$scope.loadJumpScaleFromLocalStorage = function(){
		if (window.localStorage.jumpScale == undefined || 
			window.localStorage.jumpScale == 'undefined' || 
			window.localStorage.jumpScale == 1 || 
			window.localStorage.jumpScale == ''){
			$scope.jumpScale['value'] = 1.0;
			return;
		}
		$scope.jumpScale['value'] = JSON.parse(window.localStorage.jumpScale).value;
	}
	$scope.saveJumpScaleToLocalStorage = function(){
		window.localStorage.jumpScale = JSON.stringify($scope.jumpScale);
	}
	$scope.resetJumpScaleFromLocalStorage = function(){
		if (window.localStorage.jumpScale == undefined || 
			window.localStorage.jumpScale == 'undefined')
			return;
		window.localStorage.jumpScale = undefined;
	}
	$scope.loadJumpScaleFromLocalStorage();

	$scope.gotoGame = function(){
		window.location.href = $scope.href_game;
	};
});