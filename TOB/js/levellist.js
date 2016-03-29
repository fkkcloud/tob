BasicGame.LevelList = function(game){};

BasicGame.LevelList.prototype = {

	preload: function(){
		function setupGUI() {

        	// level list
			EZGUI.components.levelsList.bindChildren('mousedown', function (event, me) {
			    //console.log('mousedown ', me);
			    var ow = me.width;
			    var oh = me.height;
			    me.animateSizeTo(ow * 1.3, oh * 1.3, 100, EZGUI.Easing.Back.Out, function () {
			        me.animateSizeTo(ow, oh, 100);
			    });
			});

			EZGUI.components.levelsList.bindChildren('click', function (event, me) {

                //wait for animation to finish
			    setTimeout(function () {
			    	var stageNumber = Number(me.text) - 1;
			    	if (BasicGame.stageProgress && BasicGame.stageProgress.length >= stageNumber && BasicGame.stageProgress[stageNumber] == 1){
			        	
			        	BasicGame.currentStage = stageNumber;

			        	BasicGame.mapData   = BasicGame.stageData[BasicGame.currentStage].mapData;
						window.localStorage.mapName = BasicGame.stageData[BasicGame.currentStage].mapTitle;
						BasicGame.jumpScale = {'value':BasicGame.stageData[BasicGame.currentStage].jumpScale};
						BasicGame.mapSpeed  = {'value':BasicGame.stageData[BasicGame.currentStage].mapSpeed};

			        	BasicGame.ui_level_screen.visible = false;
			        	this.game.state.start("Main");
					}
			    }, 150);

			});
		}

		BasicGame.reloadStageScreenUI = function () {

		    EZGUI.themes['metalworks'].override(themeOverride);

		    levelSelectScreenJSON.width = BasicGame.globalGameWidth;
		    levelSelectScreenJSON.height = BasicGame.globalGameHeight;
		    levelSelectScreenJSON.children[0].width = BasicGame.globalGameWidth;
		    levelSelectScreenJSON.children[0].height = BasicGame.globalGameHeight;

		    for (var i = 0; i < levelSelectScreenJSON.children[0].children.length; i++){

		    	var level = levelSelectScreenJSON.children[0].children[i];
		    	
		    	level.width = 120 * window.devicePixelRatio;
		    	level.height = 120 * window.devicePixelRatio;
		    	
	    		if (BasicGame.stageProgress && BasicGame.stageProgress.length >= i && BasicGame.stageProgress[i] != 0){
	    			level.skin = "levelBtn";
	    		}
	    		else {
	    			level.skin = "levelBtnLocked";
	    		}
		    	
		    }
		    
			BasicGame.ui_level_screen = EZGUI.create(levelSelectScreenJSON, 'metalworks');
			BasicGame.ui_level_screen.visible = false;
			
			setupGUI();
		};

		EZGUI.Theme.load(['assets/metalworks-theme/metalworks-theme.json'], BasicGame.reloadStageScreenUI);
	},

	create: function(){
		var me = this;
		BasicGame.ui_level_screen.visible = true;
	},

	update: function() {
		var me = this;
	},

}