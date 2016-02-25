angular.module('EditCtrl', []).controller('EditController', function($scope, $http) {

	$scope.tagline = 'Nothing beats a pocket protector!';
	$scope.paintColor = undefined;
	$scope.map = {};

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
		//console.log(mapData);
		window.localStorage.mapData = JSON.stringify(mapData);
		window.location.href = "http://kingsl-tob.herokuapp.com/";
	}

	$scope.submitMapData = function(){
		$http.get('/api/maps/counts')
        .success(function(count){
        	console.log("count:", count);
        	$scope.count = count; //  let's use this later
        	swal({
		        title: "Uploading..",   
		        text: "<p>You create map '<span style='color:#F8BB86'>" + $scope.map.name + "'!</span></p>",   
		        timer: 10000,
		        html: true
		      })
        	//swal({   title: "Uploading",   text: "Thanks for teaching lindsay!",   timer: 2400,   showConfirmButton: false });
        })
        .error(function(err, b, c, d){
        	console.log('count req failed', err, b, c, d);
        })

        var mapData = transpose($scope.mapData);
        var mapDataStr = JSON.stringify(mapData);
        $http.post('/api/maps/posts', { 'author':$scope.map.author , 'name':$scope.map.name , 'data':mapDataStr } )
        .success(function(post){
        	console.log("uploaded.");
        	console.log('DB created', post);
        })
        .error(function(err, b, c, d){
        	console.log("upload failed.");
        	console.log('DB failed', err, b, c, d);
        })
	}

	$scope.setBlockColor = function(){
		$scope.paintColor = '#00CDCD';		
	}

	$scope.setTrapColor = function(){
		$scope.paintColor = '#7F00FF';		
	}

	$scope.setEraser = function(){
		$scope.paintColor = '#800020';
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