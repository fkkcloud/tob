BasicGame.ChallengeAI = function(game){};

BasicGame.ChallengeAI.prototype = {

	preload: function(){
		BasicGame.AI_initMapCreator();
		var size = 20;

		BasicGame.storymode = false;
		BasicGame.mapData = BasicGame.AI_createMap(size);
	},

	create: function(){
		var me = this;

		/*
  		me.labelFinalScore = me.game.add.text(me.game.world.centerX,
  			me.game.world.height * 0.2, me.score + 'm', {font: scoreFont, fill:"#fff"});
  		me.labelFinalScore.anchor.setTo(0.5, 0);

  		me.labelHighScoreText = me.game.add.text(me.game.world.centerX,
  			me.game.world.height * 0.3, "BEST", {font: scoreFont, fill: "#fff"});
  		me.labelHighScoreText.anchor.setTo(0.5, 0);

  		me.labelHighScore = me.game.add.text(me.game.world.centerX,
  			me.game.world.height * 0.4, me.highScore + 'm', {font: scoreFont, fill: "#fff"});
  		me.labelHighScore.anchor.setTo(0.5, 0);
  		*/
  		me.createBG();

  		me.createInstructions();

  		me.createButtons();

		window.localStorage.mapName = "Challenge AI";
		BasicGame.mapSpeed = {'value':1.2};
		BasicGame.jumpScale = {'value':1};
	},

	update: function() {
		var me = this;

		me.updateBG();

	},

	createBG: function(){
		var me = this;

		var bg_sky_img_cache = game.cache.getImage("bg_sky");
		var scaleRatio = this.game.height / bg_sky_img_cache.height;

		this.background_sky1 = this.game.add.sprite(0, 0, 'bg_sky');  
		this.background_sky1.scale.setTo(scaleRatio, scaleRatio);

		this.background_sky2 = this.game.add.sprite(bg_sky_img_cache.width * scaleRatio, 0, 'bg_sky');
		this.background_sky2.scale.setTo(scaleRatio, scaleRatio);

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

		this.background_castle2 = this.game.add.sprite(bg_castle_img_cache.width * scaleRatio, castle_height, 'bg_castle');
		this.background_castle2.scale.setTo(scaleRatio, scaleRatio);

		var bg_cloud_img_cache = game.cache.getImage("bg_cloud");
		scaleRatio = this.game.height / bg_cloud_img_cache.height;

		this.background_cloud1 = this.game.add.sprite(0, 0, 'bg_cloud');  
		this.background_cloud1.scale.setTo(scaleRatio, scaleRatio);

		this.background_cloud2 = this.game.add.sprite(bg_cloud_img_cache.width * scaleRatio, 0, 'bg_cloud');
		this.background_cloud2.scale.setTo(scaleRatio, scaleRatio);

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

	updateBG: function() {

		this.moveBackgroundSky1();
		this.moveBackgroundSky2();

		this.moveBackgroundCloud1();
		this.moveBackgroundCloud2();

		this.moveBackgroundCastle1();
		this.moveBackgroundCastle2();

	},

	moveBackgroundCloud2 : function() {  
		var bg_cloud_img_cache = game.cache.getImage("bg_cloud");
		var scaleRatio = this.game.height / bg_cloud_img_cache.height;

		if (this.background_cloud2.position.x < -(bg_cloud_img_cache.width * scaleRatio)  )
		{        
			this.background_cloud2.position.x = bg_cloud_img_cache.width * scaleRatio; 
			this.background_cloud2.position.x -= 0.4;  
		}
		else {
			this.background_cloud2.position.x -= 0.4;  
		}        	  
	},

	moveBackgroundCloud1 : function() {  
		var bg_cloud_img_cache = game.cache.getImage("bg_cloud");
		var scaleRatio = this.game.height / bg_cloud_img_cache.height;

		if (this.background_cloud1.position.x < -(bg_cloud_img_cache.width * scaleRatio)  )
		{        
			this.background_cloud1.position.x = bg_cloud_img_cache.width * scaleRatio; 
			this.background_cloud1.position.x -= 0.4;  
		}
		else {
			this.background_cloud1.position.x -= 0.4;  
		}         	  
	},

	moveBackgroundCastle2 : function() {  
		var bg_castle_img_cache = game.cache.getImage("bg_castle");
		var scaleRatio = this.game.height / bg_castle_img_cache.height;

		if (this.background_castle2.position.x < -(bg_castle_img_cache.width * scaleRatio)  )
		{        
			this.background_castle2.position.x = bg_castle_img_cache.width * scaleRatio; 
			this.background_castle2.position.x -= 0.5;  
		}
		else {
			this.background_castle2.position.x -= 0.5;  
		}        	  
	},

	moveBackgroundCastle1 : function() {  
		var bg_castle_img_cache = game.cache.getImage("bg_castle");
		var scaleRatio = this.game.height / bg_castle_img_cache.height;

		if (this.background_castle1.position.x < -(bg_castle_img_cache.width * scaleRatio)  )
		{        
			this.background_castle1.position.x = bg_castle_img_cache.width * scaleRatio; 
			this.background_castle1.position.x -= 0.5;  
		}
		else {
			this.background_castle1.position.x -= 0.5;  
		}           	  
	},

	moveBackgroundSky2 : function() {  
		var bg_sky_img_cache = game.cache.getImage("bg_sky");
		var scaleRatio = this.game.height / bg_sky_img_cache.height;

		if (this.background_sky2.position.x < -(bg_sky_img_cache.width * scaleRatio)  )
		{        
			this.background_sky2.position.x = bg_sky_img_cache.width * scaleRatio; 
			this.background_sky2.position.x -= 0.3;  
		}
		else {
			this.background_sky2.position.x -= 0.3;  
		}        	  
	},

	moveBackgroundSky1 : function() {  
		var bg_sky_img_cache = game.cache.getImage("bg_sky");
		var scaleRatio = this.game.height / bg_sky_img_cache.height;

		if (this.background_sky1.position.x < -(bg_sky_img_cache.width * scaleRatio)  )
		{        
			this.background_sky1.position.x = bg_sky_img_cache.width * scaleRatio;
			this.background_sky1.position.x -= 0.3;  
		} 
		else {
			this.background_sky1.position.x -= 0.3;  
		}        	  
	},

	startChallenge: function(){
		setTimeout(function () {
			BasicGame.aimode = true;

            this.game.state.start("Main");

        }, 60);
		
	},

	goToMainMenu: function(){
		setTimeout(function () {
			BasicGame.aimode = true;

            this.game.state.start("MainMenu");

        }, 60);
		
	},

	createInstructions: function(){
		var me = this;

		/*
		var fontSize = 32 * window.devicePixelRatio;
		var subFontSize = 18 * window.devicePixelRatio;

		var headingFont = fontSize + "px Impact";
		var subHeadingFont = subFontSize + "px Arial";

		instructionLabel = me.game.add.text(me.game.world.width * 0.5,
			me.game.world.height * 0.2, 
			"Challenging AI", 
			{	font: headingFont,
				fill: "#fff", 
				align: 'center',
			});
		instructionLabel.anchor.setTo(0.5, 1);

		var alphago = me.game.add.sprite(me.game.world.centerX, me.game.world.height * 0.425, "alphago");
		alphago.anchor.setTo(0.5, 0.5);
		// add and play animations
		alphago.animations.add('think');
		alphago.animations.play('think', 4, true);

		instructionLabel2 = me.game.add.text(me.game.world.centerX,
			me.game.world.height * 0.675, "This session is made by AI, a machine learning algorithm.",
			{font:subHeadingFont, fill:'#c0392b'});
		instructionLabel2.anchor.setTo(0.5, 1);
		instructionLabel2.align = 'center';
		
		instructionLabel3 = me.game.add.text(me.game.world.centerX,
			me.game.world.height * 0.75, "As you proceed, AI will create map based on how you play.",
			{font:subHeadingFont, fill:"#fff"});
		instructionLabel3.anchor.setTo(0.5, 1);
		instructionLabel3.align = 'center';
		*/
		this.banner = this.game.add.sprite(this.game.world.width * 0.5, 0, 'banner_ai');  
		this.banner.anchor.setTo(0.5, 0.0);

		this.instruction = this.game.add.sprite(this.game.world.width * 0.5, this.game.world.height * 0.425, 'challengeai');  
		this.instruction.anchor.setTo(0.5, 0.5);
	},


	onDown: function(but){
		but.scale.setTo(1.1, 1.1);
	},

	onUp: function(but){
		but.scale.setTo(1.0, 1.0);
	},

	onNavDown: function(but){
		but.scale.setTo(1.0, 1.0);
	},

	onNavUp: function(but){
		but.scale.setTo(0.9, 0.9);
	},

	createButtons: function(){
		var me = this;

		this.btn = this.game.add.button(this.game.world.width * 0.5, this.game.world.height * 0.86, 'btn_ai', this.startChallenge, this);
		this.btn.scale.setTo(1.0, 1.0);
		this.btn.anchor.setTo(0.5, 0.5);
		this.btn.onInputDown.add(me.onDown, this);
		this.btn.onInputUp.add(me.onUp, this);

		this.btn = this.game.add.button(this.game.world.width * 0.9, this.game.world.height * 0.86, 'btn_levelmenu', this.goToMainMenu, this);
		this.btn.scale.setTo(0.9, 0.9);
		this.btn.anchor.setTo(0.5, 0.5);
		this.btn.onInputDown.add(me.onDown, this);
		this.btn.onInputUp.add(me.onUp, this);
	},

}