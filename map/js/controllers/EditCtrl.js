angular.module('EditCtrl', []).controller('EditController', function($scope, $http) {

	$scope.$on('$locationChangeStart', function( event ) {

	});

	$scope.paintColor = undefined;
	$scope.paintMode = undefined;
	$scope.isDrawing = false;


	// create row data
	function createMapDataRow(){
		var arr = [];
		for (var i = 0; i < $scope.map.width; i++){
			arr.push(i);
		}
		return arr;
	}
	$scope.row1 = createMapDataRow();
	$scope.row2 = createMapDataRow();
	$scope.row3 = createMapDataRow();
	$scope.row4 = createMapDataRow();
	$scope.row5 = createMapDataRow();
	$scope.row6 = createMapDataRow();
	$scope.row7 = createMapDataRow();
	$scope.row8 = createMapDataRow();

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
					$scope.resetMapSpeedFromLocalStorage();
					$scope.resetJumpScaleFromLocalStorage();
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
			  	else if ($scope.mapData[index][i] === 2)
			  		$( this ).css('background-color', $scope.trapColor); // trap
			  	else if ($scope.mapData[index][i] === 3)
			  		$( this ).css('background-color', $scope.bloodColor); // blood
			  	else if ($scope.mapData[index][i] === 4)
			  		$( this ).css('background-color', $scope.endColor); // blood
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
		if (mapDesignModeSum > 30)
			isMapDataValid = true;

		if (!isMapDataValid){
			swal("There should some design into this map!", null,"warning")
			return;
		}

		if ($scope.map.name.length < 3 || $scope.map.author.length < 3){
			swal("Please name the map and author name more properly!", null,"warning")
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
		        	swal({
				        title: "Uploading..",   
				        text: "<p>You create map called '<span style='color:#F8BB86'>" + $scope.map.name + "'!</span></p>",   
				        timer: 1500,
				        html: true,
				        showConfirmButton: false,
				    })

			        var mapDataStr = JSON.stringify($scope.mapData);

			        var postData = { 
			        	'author':$scope.map.author , 
			        	'name':$scope.map.name , 
			        	'data':mapDataStr ,
			        	'width':$scope.map.width ,
			        	'height':$scope.map.height,
			        	'mapspeed':JSON.stringify($scope.mapSpeed),
			        	'jumpscale':JSON.stringify($scope.jumpScale)
			        };

			        $http.post('/api/maps/posts', postData)
			        .success(function(post){
			        	console.log("uploaded.");
			        	//console.log('DB created', post);
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

	$scope.setEndColor = function(){
		$scope.paintColor = $scope.endColor;
		$scope.paintMode = 4;
	}

	$scope.setTrapColor = function(){
		$scope.paintColor = $scope.trapColor;
		console.log($scope.trapColor);
		$scope.paintMode = 2;
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
});