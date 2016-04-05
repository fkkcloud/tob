BasicGame.GameOver = function(game){};

BasicGame.GameOver.prototype = {

  	create: function(){
  		var me = this;

  		me.createBG();

  		var fontSize = 25 * window.devicePixelRatio;
  		var scoreFont = fontSize + "px Verdana";

  		var gameoverTitle = me.game.add.sprite(me.game.world.width * 0.5, me.game.height * 0.36, "title_gameOver");
  		gameoverTitle.anchor.setTo(0.5, 0.5);

  		var restartButton = me.game.add.button(me.game.world.width * 0.4,
  			me.game.world.height * 0.68, "btn_replay", me.restartGame, me);
  		restartButton.anchor.setTo(0.5, 0.5);
  		restartButton.onInputDown.add(me.onDown, this);
		restartButton.onInputUp.add(me.onUp, this);

  		var menuButton = me.game.add.button(me.game.world.width * 0.6,
  			me.game.world.height * 0.68, "btn_menu", me.gotoMenu, me);
  		menuButton.anchor.setTo(0.5, 0.5);
  		menuButton.onInputDown.add(me.onDown, this);
		menuButton.onInputUp.add(me.onUp, this);

	},

	onDown: function(but){
		but.scale.setTo(1.1, 1.1);
	},

	onUp: function(but){
		but.scale.setTo(1.0, 1.0);
	},

	gotoMenu: function(){
		this.game.state.start("GameTitle")
	},

	restartGame: function(){
		this.game.state.start("Main");
	},

	init: function(score){
		var me = this;
		me.score = score;

		//check the high score in local storage
		if (localStorage.highScore){
			if (parseInt(localStorage.highScore) < me.score){
				localStorage.highScore = me.score.toString();
				me.highScore = me.score.toString();
			}
			else {
				me.highScore = localStorage.highScore;
			}
		}
		else {
			localStorage.highScore = me.score.toString();
			me.highScore = me.score.toString();
		}
	},

	createBG: function(){

		var me = this;

	},

	
}