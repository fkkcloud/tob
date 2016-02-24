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

	$scope.runPreview = function(){

		var mapData = transpose($scope.mapData);
		console.log(mapData);
		window.localStorage.mapData = JSON.stringify(mapData);

		window.location.href = "http://kingsl-tob.herokuapp.com/";

	}

	$scope.setBlockColor = function(){
		$scope.paintColor = '#b8d000';		
	}

	$scope.setTrapColor = function(){
		$scope.paintColor = '#479c9d';		
	}

	$scope.setEraser = function(){
		$scope.paintColor = '#474646';
	}

	$scope.setBloodColor = function(){
		$scope.paintColor = '#ab483d';		
	}

	$scope.reset = function(){
		$( ".pixel" ).each(function( index ) {
		  $( this ).css('background-color', '#474646');
		});
	}

	function applyColor(evt){
		if ($scope.paintColor == undefined){
			return;
		}
		angular.element(evt.currentTarget).css('background-color', $scope.paintColor);
	}

	function transpose(a) {

	  // Calculate the width and height of the Array
	  var w = a.length ? a.length : 0,
	    h = a[0] instanceof Array ? a[0].length : 0;

	  // In case it is a zero matrix, no transpose routine needed.
	  if(h === 0 || w === 0) { return []; }

	  /**
	   * @var {Number} i Counter
	   * @var {Number} j Counter
	   * @var {Array} t Transposed data is stored in this array.
	   */
	  var i, j, t = [];

	  // Loop through every item in the outer array (height)
	  for(i=0; i<h; i++) {

	    // Insert a new row (array)
	    t[i] = [];

	    // Loop through every item per item in outer array (width)
	    for(j=0; j<w; j++) {

	      // Save transposed data.
	      t[i][j] = a[j][i];
	    }
	  }

	  return t;
	};

	$scope.fill1 = function(evt, id){
		$scope.mapData[0][id] = 1;
		applyColor(evt);
	}
	$scope.fill2 = function(evt, id){
		$scope.mapData[1][id] = 1;
		applyColor(evt);
	}
	$scope.fill3 = function(evt, id){
		$scope.mapData[2][id] = 1;
		applyColor(evt);
	}
	$scope.fill4 = function(evt, id){
		$scope.mapData[3][id] = 1;
		applyColor(evt);
	}
	$scope.fill5 = function(evt, id){
		$scope.mapData[4][id] = 1;
		applyColor(evt);
	}
	$scope.fill6 = function(evt, id){
		$scope.mapData[5][id] = 1;
		applyColor(evt);
	}
	$scope.fill7 = function(evt, id){
		$scope.mapData[6][id] = 1;
		applyColor(evt);
	}
	$scope.fill8 = function(evt, id){
		$scope.mapData[7][id] = 1;
		applyColor(evt);
	}
});