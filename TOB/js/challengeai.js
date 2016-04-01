BasicGame.ChallengeAI = function(game){};

BasicGame.ChallengeAI.prototype = {

	preload: function(){
		BasicGame.AI_initMapCreator();
		var size = 300;

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

		this.bg_sky.tilePosition.x -= 0.3;

		this.bg_cloud.tilePosition.x -= 0.4;
	},

	createBG: function(){
		var me = this;

		me.bg_sky = game.add.tileSprite(0, 0, me.game.width, me.game.height, "bg_sky");
		var bg_sky_img_cache = game.cache.getImage("bg_sky");
		var scaleRatio = me.game.height / bg_sky_img_cache.height;
		me.bg_sky.scale.setTo(scaleRatio, scaleRatio);
		me.bg_sky.inputEnabled = true;

		me.bg_cloud = game.add.tileSprite(0, 0, me.game.width, me.game.height, "bg_cloud");
		var bg_cloud_img_cache = game.cache.getImage("bg_cloud");
		scaleRatio = me.game.height / bg_cloud_img_cache.height;
		me.bg_cloud.scale.setTo(scaleRatio, scaleRatio);
		me.bg_cloud.inputEnabled = true;
	},

	startChallenge: function(){
		setTimeout(function () {
			BasicGame.aimode = true;

            this.game.state.start("Main");

        }, 60);
		
	},

	createInstructions: function(){
		var me = this;

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

	},


	onDown: function(but){
		but.scale.setTo(-1.1, 1.1);
	},

	onUp: function(but){
		but.scale.setTo(-1.0, 1.0);
	},

	createButtons: function(){
		var me = this;

		this.btn = this.game.add.button(this.game.world.width * 0.5, this.game.world.height * 0.86, 'btn_next', this.startChallenge, this);
		this.btn.scale.setTo(-1.0, 1.0);
		this.btn.anchor.setTo(0.5, 0.5);
		this.btn.onInputDown.add(me.onDown, this);
		this.btn.onInputUp.add(me.onUp, this);
	},

}