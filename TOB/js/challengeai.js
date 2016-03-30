BasicGame.ChallengeAI = function(game){};

BasicGame.ChallengeAI.prototype = {

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

  		me.createInstructions();

  		me.createButtons();

		BasicGame.AI_initMapCreator();
		var size = 200;

		BasicGame.storymode = false;
		BasicGame.mapData = BasicGame.AI_createMap(size);
		window.localStorage.mapName = "Challenge AI";
		BasicGame.mapSpeed = {'value':1.2};
		BasicGame.jumpScale = {'value':1};

	},

	update: function() {
		
	},

	startChallenge: function(){
		setTimeout(function () {
                    this.game.state.start("Main");
                }, 60);
		
	},

	createInstructions: function(){
		var me = this;

		var fontSize = 24 * window.devicePixelRatio;
		var subFontSize = 18 * window.devicePixelRatio;

		var headingFont = fontSize + "px Arial";
		var subHeadingFont = subFontSize + "px Arial";

		instructionLabel = me.game.add.text(me.game.world.width * 0.5,
			me.game.world.height * 0.2, 
			"Challenging AI", 
			{	font: headingFont,
				fill: "#fff", 
				align: 'center',
			});
		instructionLabel.anchor.setTo(0.5, 1);

		instructionLabel2 = me.game.add.text(me.game.world.centerX,
			me.game.world.height * 0.6, "This session is made by artificial intelligence, a machine learning algorithm.",
			{font:subHeadingFont, fill:'#c0392b'});
		instructionLabel2.anchor.setTo(0.5, 1);
		instructionLabel2.align = 'center';
		
		instructionLabel3 = me.game.add.text(me.game.world.centerX,
			me.game.world.height * 0.7, "As you proceed, AI will create map based on how you play.",
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

		this.btn = this.game.add.button(this.game.world.width * 0.5, this.game.world.height * 0.9, 'btn_next', this.startChallenge, this);
		this.btn.scale.setTo(-1.0, 1.0);
		this.btn.anchor.setTo(0.5, 0.5);
		this.btn.onInputDown.add(me.onDown, this);
		this.btn.onInputUp.add(me.onUp, this);
	},

}