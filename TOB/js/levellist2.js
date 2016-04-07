BasicGame.LevelList2 = function(game){};

BasicGame.LevelList2.prototype = {

	create: function(){
		var me = this;

		me.buttonSize = 0.9;
		me.buttonDownSize = 1.0;

		me.navButtonSize = 0.9;
		me.navButtonDownSize = 1.0;

		me.navButtonReverseSize = -0.9;
		me.navButtonReverseDownSize = -1.0;

		me.buttonXPositions = [0.2, 0.4, 0.6, 0.8, 0.2, 0.4, 0.6, 0.8, 0.2, 0.4, 0.6, 0.8, 0.2, 0.4, 0.6, 0.8, 0.2, 0.4, 0.6, 0.8, 0.2, 0.4, 0.6, 0.8, 0.2, 0.4, 0.6, 0.8, 0.2, 0.4, 0.6, 0.8];
		me.buttonYPositions = [0.33, 0.33, 0.33, 0.33, 0.66, 0.66, 0.66, 0.66, 0.33, 0.33, 0.33, 0.33, 0.66, 0.66, 0.66, 0.66, 0.33, 0.33, 0.33, 0.33, 0.66, 0.66, 0.66, 0.66, 0.33, 0.33, 0.33, 0.33, 0.66, 0.66, 0.66, 0.66];
		me.stageList = {start:8, end:15};

		me.createBG();

		me.createButtons();

		me.createBanner();

		me.clickSound = me.game.add.audio('button');
	},

	update: function() {
		var me = this;
	},

	onNavReverseDown: function(but){
		var me = this;
		this.clickSound.play();
		but.scale.setTo(me.navButtonReverseDownSize, me.navButtonReverseDownSize);
	},

	onNavReverseUp: function(but){
		but.scale.setTo(this.navButtonReverseSize, this.navButtonReverseSize);
	},

	onNavDown: function(but){
		var me = this;
		this.clickSound.play();
		but.scale.setTo(me.buttonDownSize, me.buttonDownSize);
	},

	onNavUp: function(but){
		but.scale.setTo(this.buttonSize, this.buttonSize);
	},

	onBtnLevelDown: function(but){
		var me = this;
		this.clickSound.play();
		but.scale.setTo(me.buttonDownSize, me.buttonDownSize);
	},

	onBtnLevelUp: function(but){
		but.scale.setTo(this.buttonSize, this.buttonSize);
		var stageNumber = this.mapid;
		setTimeout(function () {
	        if (BasicGame.stageProgress && 
	        	BasicGame.stageProgress.length >= stageNumber && 
	        	BasicGame.stageProgress[stageNumber] == 1)
	        {

	            BasicGame.currentStage = stageNumber;

	            BasicGame.storymode = true;
	            BasicGame.mapData   = BasicGame.stageData[BasicGame.currentStage].mapData;
	            window.localStorage.mapName = BasicGame.stageData[BasicGame.currentStage].mapTitle;
	            BasicGame.jumpScale = {'value':BasicGame.stageData[BasicGame.currentStage].jumpScale};
	            BasicGame.mapSpeed  = {'value':BasicGame.stageData[BasicGame.currentStage].mapSpeed};

	            if (stageNumber == 0)
	                this.game.state.start("Tuto1"); // only for stage 1 -> tuto starts!
	            else
	                this.game.state.start("Main");
	        }
	    }, 150);
	},

	goToNextLevel: function(){
		var me = this;
		this.game.state.start("LevelList3");
	},

	goToPrevLevel: function(){
		var me = this;
		this.game.state.start("LevelList1");
	},

	goToMainMenu: function(){
		var me = this;
		this.game.state.start("MainMenu");
	},

	onNavBtnDown: function(but){
		var me = this;
		this.clickSound.play();
		but.scale.setTo(me.navButtonDownSize, me.navButtonDownSize);
	},

	onNavBtnUp: function(but){
		but.scale.setTo(this.navButtonSize, this.navButtonSize);
	},

	createButtons: function(){
		var me = this;

		// level buttons
		for (var i = 0; i < BasicGame.stageProgress.length; i++){

			if ( i >= me.stageList.start && i <= me.stageList.end)
			{
				var stageProgress = BasicGame.stageProgress[i];
				var levelBoxImg = (stageProgress) ? 'level-box' : 'level-box-locked';

				this.btn_start = this.game.add.button(this.game.world.width * me.buttonXPositions[i], this.game.world.height * me.buttonYPositions[i], levelBoxImg, null, this);
				this.btn_start.scale.setTo(me.buttonSize, me.buttonSize);
				this.btn_start.anchor.setTo(0.5, 0.5);
				this.btn_start.onInputDown.add(me.onBtnLevelDown, this);
				this.btn_start.onInputUp.add(me.onBtnLevelUp, {
					mapid: i, 
					buttonSize: me.buttonSize
				});	

				if (stageProgress){
					var scoreText = me.game.add.bitmapText(this.game.world.width * me.buttonXPositions[i], this.game.world.height * me.buttonYPositions[i], 'flappyfont', (i + 1).toString(), 32 * window.devicePixelRatio);
			    	scoreText.anchor.setTo(0.5, 0.5);
			    	scoreText.visible = true;	
				}

			}
		}

		// menu
		this.btn_menu = this.game.add.button(this.game.world.width * 0.92, this.game.world.height * 0.9, 'btn_levelmenu', this.goToMainMenu, this);
		this.btn_menu.anchor.setTo(0.5, 0.5);
		this.btn_menu.scale.setTo(me.navButtonSize, me.navButtonSize);
		this.btn_menu.onInputDown.add(me.onNavBtnDown, this);
		this.btn_menu.onInputUp.add(me.onNavBtnUp, this);
		
		// next
		this.btn_next = this.game.add.button(this.game.world.width * 0.6666, this.game.world.height * 0.9, 'nav_arrow', this.goToNextLevel, this);
		this.btn_next.anchor.setTo(0.5, 0.5);
		this.btn_next.scale.setTo(me.navButtonReverseSize, me.navButtonReverseSize);
		this.btn_next.onInputDown.add(me.onNavReverseDown, this);
		this.btn_next.onInputUp.add(me.onNavReverseUp, this);

		// prev
		this.btn_next = this.game.add.button(this.game.world.width * 0.3333, this.game.world.height * 0.9, 'nav_arrow', this.goToPrevLevel, this);
		this.btn_next.anchor.setTo(0.5, 0.5);
		this.btn_next.scale.setTo(me.navButtonSize, me.navButtonSize);
		this.btn_next.onInputDown.add(me.onNavBtnDown, this);
		this.btn_next.onInputUp.add(me.onNavBtnUp, this);

		this.banner = this.game.add.sprite(this.game.world.width * (0.3333 + 0.3333 / 5), this.game.world.height * 0.9, 'nav_on');  
		this.banner.anchor.setTo(0.5, 0.5);

		this.banner = this.game.add.sprite(this.game.world.width * (0.3333 + 0.3333 * 2 / 5), this.game.world.height * 0.9, 'nav_off');  
		this.banner.anchor.setTo(0.5, 0.5);

		this.banner = this.game.add.sprite(this.game.world.width * (0.3333 + 0.3333 * 3 / 5), this.game.world.height * 0.9, 'nav_on');  
		this.banner.anchor.setTo(0.5, 0.5);

		this.banner = this.game.add.sprite(this.game.world.width * (0.3333 + 0.3333 * 4 / 5), this.game.world.height * 0.9, 'nav_on');  
		this.banner.anchor.setTo(0.5, 0.5);	
	},

	createBanner: function(){

		this.banner = this.game.add.sprite(this.game.world.width * 0.5, 0, 'banner_level');  
		this.banner.anchor.setTo(0.5, 0.0);
	},

	createBG: function() { 
		var me = this;

		var bg_sky_img_cache = game.cache.getImage("bg_sky");
		var scaleRatio = this.game.height / bg_sky_img_cache.height;

		this.background_sky1 = this.game.add.sprite(0, 0, 'bg_sky');  
		this.background_sky1.scale.setTo(scaleRatio, scaleRatio);    

		var bg_castle_img_cache = game.cache.getImage("bg_castle");
		var castle_height;
		if (window.devicePixelRatio < 2){
			scaleRatio = 1;
			castle_height = this.game.height - bg_castle_img_cache.height;
		}
		else {
			scaleRatio = (this.game.height - bg_castle_img_cache.height) / bg_castle_img_cache.height;
			castle_height = this.game.height - (bg_castle_img_cache.height * scaleRatio);
		}

		this.background_castle1 = this.game.add.sprite(0, castle_height, 'bg_castle');  
		this.background_castle1.scale.setTo(scaleRatio, scaleRatio);

		var bg_cloud_img_cache = game.cache.getImage("bg_cloud");
		scaleRatio = this.game.height / bg_cloud_img_cache.height;

		this.background_cloud1 = this.game.add.sprite(0, 0, 'bg_cloud');  
		this.background_cloud1.scale.setTo(scaleRatio, scaleRatio);

		// create a new bitmap data object
	    var bmd = game.add.bitmapData(me.game.width, me.game.height);

	    // draw to the canvas context like normal
	    bmd.ctx.beginPath();
	    bmd.ctx.rect(0,0,me.game.width,me.game.height);
	    bmd.ctx.fillStyle = '#220000';
	    bmd.ctx.fill();

	    // use the bitmap data as the texture for the sprite
	    var sprite = game.add.sprite(0, 0, bmd);
	    sprite.alpha = 0.5;

	},
}