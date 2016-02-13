var GameOver = function(game){};

GameOver.prototype = {

	init: function(score){

		var me = this;
		me.score = score;

		//Check high score in local storage
		if(localStorage.highScore){
			if(parseInt(localStorage.highScore) < me.score){
				localStorage.highScore = me.score.toString();
				me.highScore = me.score.toString();
			}
			else{
				me.highScore = localStorage.highScore;
			}
		}
		else{
			localStorage.highScore = me.score.toString();
			me.highScore = me.score.toString();
		}

	},

  	create: function(){

  		var me = this;

		var fontSize = 25 * window.devicePixelRatio;
		var scoreFont = fontSize+"px Verdana";

		me.labelGameOver = me.game.add.text(me.game.world.centerX, 30 * window.devicePixelRatio, "YOU DIED!", {font: scoreFont, fill: "#000"});  
		me.labelGameOver.anchor.setTo(0.5, 0);

		me.labelFinalScore = me.game.add.text(me.game.world.centerX, 100 * window.devicePixelRatio, me.score, {font: scoreFont, fill: "#000"});  
		me.labelFinalScore.anchor.setTo(0.5, 0);

		me.labelHighScoreText = me.game.add.text(me.game.world.centerX, 200 * window.devicePixelRatio, "BEST", {font: scoreFont, fill: "#000"});  
		me.labelHighScoreText.anchor.setTo(0.5, 0);

		me.labelHighScore = me.game.add.text(me.game.world.centerX, 270 * window.devicePixelRatio, me.highScore, {font: scoreFont, fill: "#000"});  
		me.labelHighScore.anchor.setTo(0.5, 0);

		var restartButton = me.game.add.button(me.game.world.centerX, me.game.world.height - 200, "restart", me.restartGame, me);
		restartButton.anchor.setTo(0.5, 0.5);
	},

	restartGame: function(){
		this.game.state.start("GameTitle");
	}
	
}