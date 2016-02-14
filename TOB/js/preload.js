BasicGame.Preload = function(game){};

BasicGame.Preload.prototype = {

	preload: function(){ 

		this.load.bitmapFont('flappyfont', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');  

		this.load.image('background', 'assets/background.png');

		if(window.devicePixelRatio >= 3){
			
	    	this.load.image('ground', 'assets/ground@3x.png');
	    	this.load.image('title', 'assets/title@3x.png');
	    	this.load.image('startButton', 'assets/start-button@3x.png');
	    	this.load.spritesheet('pipe', 'assets/pipes@3x.png', 54*3,320*3,2);
		 	this.game.load.image('restart', 'assets/restart@3x.png');
		 	this.load.spritesheet('bird', 'assets/bird@3x.png', 34*3, 24*3, 3);
		}
		else if(window.devicePixelRatio >= 2){
	    	this.load.image('ground', 'assets/ground@2x.png');
	    	this.load.image('title', 'assets/title@2x.png');
	    	this.load.image('startButton', 'assets/start-button@2x.png');
	    	this.load.spritesheet('pipe', 'assets/pipes@2x.png', 54*2,320*2,2);
		 	this.game.load.image('restart', 'assets/restart@2x.png');
		 	this.load.spritesheet('bird', 'assets/bird@2x.png', 34*2, 24*2, 3);
		}
		else {
		    this.load.image('ground', 'assets/ground.png');
		    this.load.image('title', 'assets/title.png');
		    this.load.image('startButton', 'assets/start-button.png');
		    this.load.spritesheet('pipe', 'assets/pipes.png', 54,320,2);
		 	this.game.load.image('restart', 'assets/restart.png');
		 	this.load.spritesheet('bird', 'assets/bird.png', 34, 24, 3);
		} 

		this.load.audio('flap', 'assets/flap.wav');
		this.game.load.audio('hit', 'assets/hit.wav');
	},

	create: function(){
		this.game.state.start("GameTitle");
		//this.game.state.start("Main");
	}
}