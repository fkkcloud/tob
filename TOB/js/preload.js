BasicGame.Preload = function(game){};

BasicGame.Preload.prototype = {

	preload: function(){ 


		this.kingslLogo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'kingsl_logo');
		this.kingslLogo.anchor.setTo(0.5);

		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.height * 0.8, 'loadingBar');
		this.preloadBar.anchor.setTo(0.5);
		this.load.setPreloadSprite(this.preloadBar);

		this.load.bitmapFont('flappyfont', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');  

		this.load.audio('flap', 'assets/flap.wav');
		this.load.audio('hit', 'assets/hit.wav');

		var originalImageWidth;

		if(window.devicePixelRatio >= 3)
		{
	    	
		 	originalImageWidth = 47 * 3;
		}
		else if(window.devicePixelRatio == 2)
		{


		 	originalImageWidth = 47 * 2;
		}
		else 
		{

		 	originalImageWidth = 47;
		} 

		BasicGame.globalGameWidth = this.game.width;
		BasicGame.globalGameHeight = this.game.height;

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

		// get right width
		BasicGame.blockSize = this.game.height/8.0;
		BasicGame.blockSpriteScale = (BasicGame.blockSize / originalImageWidth) * 1.1;

		BasicGame.preStageUnits = this.game.width / (BasicGame.blockSize * 1.0);
		//console.log('preStageInit:', BasicGame.preStageUnits);
	},

	create: function(){
		console.log('window.localStorage.instantPlay',window.localStorage.instantPlay);
		if (window.localStorage.instantPlay == 1){
			window.localStorage.instantPlay = 0;
			this.game.state.start("Main");
		}
		else {
			this.game.state.start("GameTitle");
		}
	},
}