angular.module('EditCtrl', []).controller('EditController', function($scope, $http) {

	$scope.$on('$locationChangeStart', function( event ) {

	});

	$scope.paintColor = undefined;

	$scope.paintMode = undefined;

	$scope.isDrawing = false;


	$scope.row1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
	$scope.row2 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
	$scope.row3 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
	$scope.row4 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
	$scope.row5 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
	$scope.row6 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
	$scope.row7 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];
	$scope.row8 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45];

	$scope.reset = function(){
		swal({   
	    	title: "Are you sure?",   
	    	text: "You will not be able to recover this map file!",  
	    	type: "warning",   
	    	showCancelButton: true,   
	    	confirmButtonColor: "#DD6B55",   
	    	confirmButtonText: "Reset",   
	    	cancelButtonText: "Cancel",   
	    	closeOnConfirm: true,   
	    	closeOnCancel: true }, 

	    	function(isConfirm){   
	    		if (isConfirm) { 
	    			// reset visual map
					$( ".pixel" ).each(function( index ) {
					  $( this ).css('background-color', $scope.emptyColor);
					});

					// reset actual map data
					$scope.resetMapData();
					$scope.resetMapDataFromLocalStorage();
	    			//swal("Deleted!", "Your imaginary file has been deleted.", "success");   
	    		} 
	    		else {     
	    			//swal("Cancelled", "Your imaginary file is safe :)", "error");   
	    		} 
	    	});
	}

	$scope.recoverMapData = function(){

		// attempt to load map data from localStorage, if no data, just skip
		var resultLoaded = $scope.loadMapDataFromLocalStorage();
		if (!resultLoaded)
			return;

		var rows = [".row1", ".row2", ".row3", ".row4", ".row5", ".row6", ".row7", ".row8"];
		for (var i = 0; i < rows.length; i++){
			$( rows[i] ).each(function( index ) {
				if ($scope.mapData[index][i] === 1)
			  		$( this ).css('background-color', $scope.blockColor); // block
			  	else if ($scope.mapData[index][i] === 3)
			  		$( this ).css('background-color', $scope.bloodColor); // blood
			});
		}
	}
	setTimeout($scope.recoverMapData, 40);

	$scope.runPreview = function(){
		window.location.href = $scope.href_game;
	}

	$scope.submitMapData = function(){

		var isMapDataValid = false;

		// sum all the mapMode datas
		var mapDesignModeSum = 0;
		for (var i = 0; i < $scope.mapData.length; i++){
			for (var j = 0; j < $scope.mapData[i].length; j++){
				mapDesignModeSum += $scope.mapData[i][j];
			}
		}

		// there should be at least some blocks
		if (mapDesignModeSum > 20)
			isMapDataValid = true;

		if (!isMapDataValid){
			swal("Design your map!", "There should some design into this map!", "warning")
			return;
		}

		swal({   
	    	title: "Are you sure?",   
	    	text: "You will not be able to edit this map file anymore!",  
	    	type: "warning",   
	    	showCancelButton: true,   
	    	confirmButtonColor: $scope.blockColor,   
	    	confirmButtonText: "Submit",   
	    	cancelButtonText: "Cancel",   
	    	closeOnConfirm: false,   
	    	closeOnCancel: true }, 

	    	function(isConfirm){   
	    		if (isConfirm) { 
	    			// submitting map to server!
	    			$http.get('/api/maps/counts')
			        .success(function(count){
			        	console.log("count:", count);
			        	$scope.count = count; //  let's use this later
			        	swal({
					        title: "Uploading..",   
					        text: "<p>You create map called '<span style='color:#F8BB86'>" + $scope.map.name + "'!</span></p>",   
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
	    		else {     
	    			//swal("Cancelled", "Continue work", "error");   
	    		} 
	    	});
	}

	$scope.setBlockColor = function(){
		$scope.paintColor = $scope.blockColor;
		$scope.paintMode = 1;		
	}
	$scope.setBlockColor(); // default selection is block color

	$scope.setEraser = function(){
		$scope.paintColor = $scope.emptyColor;
		$scope.paintMode = 0;
	}

	$scope.setBloodColor = function(){
		$scope.paintColor = $scope.bloodColor;
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
		$scope.saveMapDataToLocalStorage();
	}
	$scope.fill2 = function(evt, id){
		$scope.mapData[id][1] = $scope.paintMode;
		applyColor(evt);
		$scope.saveMapDataToLocalStorage();
	}
	$scope.fill3 = function(evt, id){
		$scope.mapData[id][2] = $scope.paintMode;
		applyColor(evt);
		$scope.saveMapDataToLocalStorage();
	}
	$scope.fill4 = function(evt, id){
		$scope.mapData[id][3] = $scope.paintMode;
		applyColor(evt);
		$scope.saveMapDataToLocalStorage();
	}
	$scope.fill5 = function(evt, id){
		$scope.mapData[id][4] = $scope.paintMode;
		applyColor(evt);
		$scope.saveMapDataToLocalStorage();
	}
	$scope.fill6 = function(evt, id){
		$scope.mapData[id][5] = $scope.paintMode;
		applyColor(evt);
		$scope.saveMapDataToLocalStorage();
	}
	$scope.fill7 = function(evt, id){
		$scope.mapData[id][6] = $scope.paintMode;
		applyColor(evt);
		$scope.saveMapDataToLocalStorage();
	}
	$scope.fill8 = function(evt, id){
		$scope.mapData[id][7] = $scope.paintMode;
		applyColor(evt);
		$scope.saveMapDataToLocalStorage();
	}

	document.onmousedown = onmousedown;
	document.onmousemove = onmousemove;
	document.onmouseup = onmouseup;

	function onmousedown(){
		//console.log('start drawing');
		$scope.isDrawing = true;
	};

	function onmouseup(){
		//console.log('done drawing');
		$scope.isDrawing = false
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