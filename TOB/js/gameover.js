BasicGame.GameOver = function(game){};

BasicGame.GameOver.prototype = {

  	create: function(){
  		var me = this;

  		me.createBG();

  		var fontSize = 25 * window.devicePixelRatio;
  		var scoreFont = fontSize + "px Verdana";

  		me.labelGameOver = me.game.add.text(me.game.world.centerX,
  			me.game.world.height * 0.1, "Is that all you got?!", {font: scoreFont, fill: "#fff"});
  		me.labelGameOver.anchor.setTo(0.5, 0);

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

  		var restartButton = me.game.add.button(me.game.world.centerX,
  			me.game.world.height * 0.5, "restart", me.restartGame, me);
  		restartButton.anchor.setTo(0.5, 0.5);

	},

	restartGame: function(){
		this.game.state.start("GameTitle");
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

		var bg_sky = game.add.tileSprite(0, 0, 2088, 739, "bg_sky");
		
		//var scale = me.game.width / sprite.width * 1.1;
		//sprite.scale.setTo(scale, scale);

	},

	
}