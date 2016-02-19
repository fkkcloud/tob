angular.module('EditCtrl', []).controller('EditController', function($scope) {

	$scope.tagline = 'Nothing beats a pocket protector!';
	$scope.paintColor = undefined;

	$scope.row1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
	$scope.row2 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
	$scope.row3 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
	$scope.row4 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
	$scope.row5 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
	$scope.row6 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
	$scope.row7 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
	$scope.row8 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];

	$scope.setBlockColor = function(){
		$scope.paintColor = '#b8d000';		
	}

	$scope.setTrapColor = function(){
		$scope.paintColor = '#ce4d4d';		
	}

	$scope.setEraser = function(){
		$scope.paintColor = '#474646';
	}

	function applyColor(evt){
		if ($scope.paintColor == undefined){
			return;
		}
		angular.element(evt.currentTarget).css('background-color', $scope.paintColor);
	}

	$scope.fill1 = function(evt, id){
		console.log(0, id);
		applyColor(evt);
	}
	$scope.fill2 = function(evt, id){
		console.log(1, id);
		applyColor(evt);
	}
	$scope.fill3 = function(evt, id){
		console.log(2, id);
		applyColor(evt);
	}
	$scope.fill4 = function(evt, id){
		console.log(3, id);
		applyColor(evt);
	}
	$scope.fill5 = function(evt, id){
		console.log(4, id);
		applyColor(evt);
	}
	$scope.fill6 = function(evt, id){
		console.log(5, id);
		applyColor(evt);
	}
	$scope.fill7 = function(evt, id){
		console.log(6, id);
		applyColor(evt);
	}
	$scope.fill8 = function(evt, id){
		console.log(7, id);
		applyColor(evt);
	}
});