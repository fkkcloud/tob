angular.module('EditCtrl', []).controller('EditController', function($scope, $http) {

	var preview = false;

	$scope.$on('$locationChangeStart', function( event ) {
		
		// except when you do preview
		if (preview)
			return;

	    var answer = confirm("You will lose all the saved mapData, is that okay? (Submit your map before you leave)")
	    if (!answer) {
	        event.preventDefault();
	    }
	});

	$scope.paintColor = undefined;

	$scope.paintMode = undefined;

	$scope.row1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
	$scope.row2 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
	$scope.row3 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
	$scope.row4 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
	$scope.row5 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
	$scope.row6 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
	$scope.row7 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
	$scope.row8 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];

	$scope.reset = function(){
		console.log('reset');
		$( ".pixel" ).each(function( index ) {
		  $( this ).css('background-color', '#474646');
		});
		$scope.resetMapData();
	}
	$scope.reset();

	$scope.runPreview = function(){
		window.localStorage.mapData = JSON.stringify($scope.mapData);
		window.location.href = $scope.href_game;
		preview = true;
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

        var mapDataStr = JSON.stringify($scope.mapData);

        var postData = { 
        	'author':$scope.map.author , 
        	'name':$scope.map.name , 
        	'data':mapDataStr ,
        	'width':$scope.map.width ,
        	'height':$scope.map.height 
        };
        $http.post('/api/maps/posts',  postData)
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
		$scope.paintMode = 1;		
	}

	$scope.setTrapColor = function(){
		$scope.paintColor = '#7F00FF';
		$scope.paintMode = 2;	
	}

	$scope.setEraser = function(){
		$scope.paintColor = '#800020';
		$scope.paintMode = 0;
	}

	$scope.setBloodColor = function(){
		$scope.paintColor = '#ab483d';
		$scope.paintMode = 3;		
	}


	function applyColor(evt){
		if ($scope.paintColor == undefined){
			return;
		}
		angular.element(evt.currentTarget).css('background-color', $scope.paintColor);
	}

	$scope.fill1 = function(evt, id){
		$scope.mapData[id][0] = $scope.paintMode;
		applyColor(evt);
	}
	$scope.fill2 = function(evt, id){
		$scope.mapData[id][1] = $scope.paintMode;
		applyColor(evt);
	}
	$scope.fill3 = function(evt, id){
		$scope.mapData[id][2] = $scope.paintMode;
		applyColor(evt);
	}
	$scope.fill4 = function(evt, id){
		$scope.mapData[id][3] = $scope.paintMode;
		applyColor(evt);
	}
	$scope.fill5 = function(evt, id){
		$scope.mapData[id][4] = $scope.paintMode;
		applyColor(evt);
	}
	$scope.fill6 = function(evt, id){
		$scope.mapData[id][5] = $scope.paintMode;
		applyColor(evt);
	}
	$scope.fill7 = function(evt, id){
		$scope.mapData[id][6] = $scope.paintMode;
		applyColor(evt);
	}
	$scope.fill8 = function(evt, id){
		$scope.mapData[id][7] = $scope.paintMode;
		applyColor(evt);
	}

	/*
	function transpose(a) {

	  // Calculate the width and height of the Array
	  var w = a.length ? a.length : 0,
	    h = a[0] instanceof Array ? a[0].length : 0;

	  // In case it is a zero matrix, no transpose routine needed.
	  if(h === 0 || w === 0) { return []; }

	  
	   	// @var {Number} i Counter
	  	// @var {Number} j Counter
	   	// @var {Array} t Transposed data is stored in this array.
	   
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
	};*/
});