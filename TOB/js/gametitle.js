BasicGame.GameTitle = function(game){};

BasicGame.GameTitle.prototype = {

	init: function(){
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

		// enable physics
		me.game.physics.startSystem(Phaser.Physics.ARCADE);

		me.createBG();

		me.createLogo();

		me.createCopyrights();

		me.createInstructions();

		me.createButtons();
	},

	update: function() {
		var me = this;

		this.bg_sky.tilePosition.x -= 0.3;

		this.bg_castle.tilePosition.x -= 0.5;
	},

	createBG: function(){
		var me = this;

		me.bg_sky = game.add.tileSprite(0, 0, me.game.width, me.game.height, "bg_sky");

		var bg_castle_img_cache = game.cache.getImage("bg_castle");
		var castle_height = this.game.height - bg_castle_img_cache.height;
		me.bg_castle = game.add.tileSprite(0, castle_height, me.game.width, me.game.height, "bg_castle");
	},

	startGame: function(){
		this.game.state.start("LevelList");
		//this.game.state.start("Main");
	},

	gotoMaps: function(){
		window.location.href = "http://kingsl-tob.herokuapp.com/map";
	},

	gotoMapEditor: function(){
		window.location.href = "http://kingsl-tob.herokuapp.com/map/edit";
	},



	createLogo: function(){

		this.title = this.game.add.sprite(this.game.width * 0.375, this.game.height * 0.125, 'title');
		this.title.scale.setTo(1.3, 1.3);

	},

	createCopyrights: function(){
		this.titleGroup = this.game.add.group();

		this.title = this.game.add.sprite(0, 0, 'copyrights');
		this.titleGroup.add(this.title);

		this.titleGroup.x = this.game.width * 0.5 - this.title.width * 0.5;
		this.titleGroup.y = this.game.height * 0.9;
	},

	createInstructions: function(){
		var me = this;

		/*
		var fontSize = 18 * window.devicePixelRatio;

		var headingFont = fontSize + "px Arial";
		
		instructionLabel = me.game.add.text(me.game.world.width * 0.7,
			me.game.world.height * 0.8, 
			window.localStorage.mapName, 
			{	font: headingFont, 
				fill: "#fff", 
				align: 'right',
			});
		*/

		//instructionLabel.anchor.setTo(0.5, 1);

		/*
		instructionLabel2 = me.game.add.text(me.game.world.centerX,
			me.game.world.centerY + 50 * window.devicePixelRatio, "AVOID NASTY SQUARE",
			{font:subHeadingFont, fill:'#c0392b'});
		instructionLabel2.anchor.setTo(0.5, 1);
		instructionLabel2.align = 'center';
		

		instructionLabel3 = me.game.add.text(me.game.world.centerX,
			me.game.world.centerY + 100 * window.devicePixelRatio, window.innerWidth,
			{font:subHeadingFont, fill:"#000"});

		instructionLabel3.anchor.setTo(0.5, 1);
		instructionLabel3.align = 'center';
		*/
	},

	onDown: function(but){
		but.scale.setTo(1.1, 1.1);
	},

	onUp: function(but){
		but.scale.setTo(1.0, 1.0);
	},

	createButtons: function(){
		var me = this;

		this.btn_story = this.game.add.button(0, this.game.world.height * 0.2, 'btn_story', this.startGame, this);
		this.btn_story.onInputDown.add(me.onDown, this);
		this.btn_story.onInputUp.add(me.onUp, this);

		this.btn_maplist = this.game.add.button(0, this.game.world.height * 0.4, 'btn_maplist', this.gotoMaps, this);
		this.btn_maplist.onInputDown.add(me.onDown, this);
		this.btn_maplist.onInputUp.add(me.onUp, this);

		this.btn_mapeditor = this.game.add.button(0, this.game.world.height * 0.55, 'btn_mapeditor', this.gotoMapEditor, this);
		this.btn_mapeditor.onInputDown.add(me.onDown, this);
		this.btn_mapeditor.onInputUp.add(me.onUp, this);

		this.btn_option = this.game.add.button(0, this.game.world.height * 0.7, 'btn_option', null, this);
		this.btn_option.onInputDown.add(me.onDown, this);
		this.btn_option.onInputUp.add(me.onUp, this);
	},

}