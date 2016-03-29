angular.module('MapsCtrl', []).controller('MapsController', function($scope, $http, $location) {

    $scope.currentLoadedMaps = undefined;

    $scope.itemsCountPerPage = 4; // this should match however many results your API puts on one page
    $scope.totalPages = 0;

    setTimeout(function(){
        getResultsPage(1);
        //getFeaturedMap();
    }, 100)
    
    $scope.pagination = {
        current: 1
    };

    $scope.scaled = false;

    $scope.pageChanged = function(newPage) {
        getResultsPage(newPage);
    };

    $scope.rating = function(id) {
        var queryID = $scope.currentLoadedMaps[id]._id;

        if (isDuplicatedRating(queryID)){
            swal("Don't try to rate it multiple times man!", null, "warning")
            return;
        }

        $scope.currentLoadedMaps[id].rate += 1;
        requestRate(queryID);
    }

    /*
    $scope.rateFeatured = function() {
        var queryID = $scope.featuredMap._id;

        if (isDuplicatedRating(queryID)){
            swal("Don't try to rate it multiple times man!", null, "warning")
            return;
        }

        $scope.featuredMap.rate += 1;
        requestRate(queryID);
    }
    */

    $scope.startMap = function(id) {
        window.localStorage.mapData = $scope.currentLoadedMaps[id].data;
        window.localStorage.mapName = $scope.currentLoadedMaps[id].name;
        window.localStorage.mapSpeed = $scope.currentLoadedMaps[id].mapspeed;
        window.localStorage.jumpScale = $scope.currentLoadedMaps[id].jumpscale;
        window.localStorage.instantPlay = 1;

        var queryID = $scope.currentLoadedMaps[id]._id;

        runMap(queryID);
    }

    /*
    $scope.startFeatured = function() {
        window.localStorage.mapData = $scope.featuredMap.data;
        window.localStorage.mapName = $scope.featuredMap.name;
        window.localStorage.mapSpeed = $scope.featuredMap.mapspeed;
        window.localStorage.jumpScale = $scope.featuredMap.jumpscale;
        window.localStorage.instantPlay = 1;

        var queryID = $scope.featuredMap._id;

        runMap(queryID);
    }
    */

    $scope.editMap = function(id) {
        //window.localStorage.mapData = $scope.currentLoadedMaps[id].data;
        //$scope.mapData = $scope.currentLoadedMaps[id].data;
        $scope.mapSpeed = JSON.parse($scope.currentLoadedMaps[id].mapspeed);
        $scope.jumpScale = JSON.parse($scope.currentLoadedMaps[id].jumpscale);

        $location.path( '/edit' );
        //window.location.href = $scope.href_edit;
    }

    function runMap(queryID) {
        $http.post('/api/maps/inc_playcount', { 'id' : queryID })
        .then(function(result){
            window.location.href = $scope.href_game;
        }); 
    }

    function requestRate(queryID) {

        // make sure browser remember user rated this once
        var idArray = JSON.parse(window.localStorage.ratedMapIds);
        idArray.data.push(queryID);
        window.localStorage.ratedMapIds = JSON.stringify(idArray);

        
        $http.post('/api/maps/inc_rate', { 'id' : queryID })
        .then(function(result){
            //console.log('rated!');
        });
    }

    function isDuplicatedRating(id) {
        var ratedMapIds = JSON.parse(window.localStorage.ratedMapIds);
        for (var i = 0; i < ratedMapIds.data.length; i++){
            var ratedMapId = ratedMapIds.data[i];
            if (ratedMapId == id)
                return true;
        }
        return false;
    }

    /*
    function getFeaturedMap() {

        var testMapId = "56e50f67e4e1f7a0121d6d44";
        var realMapId = "56e4ab054a48ca1100b4f2a1";
        var mapid = (document.location.hostname == "localhost" || document.location.hostname == "192.168.0.11") ? testMapId : realMapId ;

        $http.get('/api/maps/featured/?mapid=' + mapid)
        .then(function(result){

            var map = result.data;

            if (!map)
                return;

            map.imgData = generateImage(map);

            $scope.featuredMap = map;
        })
    }
    */

    function getResultsPage(pageNumber) {

        // this is just an example, in reality this stuff should be in a service
        $http.get('/api/maps/gallery/?page=' + pageNumber)
        .then(function(result) {

        	var items = result.data.pages;
            $scope.currentLoadedMaps = items; // save locally for other interactivity e.g. rating

            for (var i = 0; i < items.length; i++){

                var item = items[i];
                console.log(item);

                items[i].imgData = generateImage(item);
            }
            
            $scope.items = items;
            
            $scope.totalPages = result.data.count;
        });
    }

    function generateImage(item) {

        var mapData2DArray = JSON.parse(item.data);
                
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var imageData = ctx.createImageData(item.width, item.height);
        var data = imageData.data;

        var x_max = item.width - 1;
        var x = 0;
        var y = 0;

        //console.log(item.width, item.height);
        for (var j = 0; j < data.length; j += 4) {
            
            var currMapID = mapData2DArray[x][y];
            var color;
            if (currMapID === 0) // nothing
                color = [0, 0, 0];
            else if (currMapID === 1) // block
                color = [0, 205, 205];
            else if (currMapID === 3) // blood
                color = [138, 6, 6];

            data[j]     = color[0]; // red
            data[j + 1] = color[1]; // green
            data[j + 2] = color[2]; // blue
            data[j + 3] = 255;

            if (x < x_max){
                x++;
            } else {
                y++;
                x = 0;
            }
        }

        var imageMaxWidth = 45;
        var newCanvas = $("<canvas>")
            .attr("width", imageMaxWidth /*imageData.width*/)
            .attr("height", imageData.height)[0];

        newCanvas.getContext("2d").putImageData(imageData, 0, 0);

        if (!$scope.scaled){
            ctx.scale(6.45, 6.45);
            $scope.scaled  = true;
        }

        ctx.drawImage(newCanvas, 0, 0);

        //ctx.putImageData(imageData, 0, 0);
        return canvas.toDataURL();
    }

});