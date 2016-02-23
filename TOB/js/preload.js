BasicGame.Preload = function(game){};

BasicGame.Preload.prototype = {

	preload: function(){ 

		this.load.bitmapFont('flappyfont', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');  

		this.load.image('bg_sky_flappy', 'assets/bg_sky_flappy.png');
		this.load.image('bg_sky_dash', 'assets/bg_sky_dash.png');

		var originalImageWidth = 54;
		var targetImageWidth = this.game.height / 8.0;
		BasicGame.blockSize = originalImageWidth * (targetImageWidth / originalImageWidth);

		if(window.devicePixelRatio >= 3)
		{
			
	    	this.load.image('bg_ground_flappy', 'assets/bg_ground_flappy@3x.png');
	    	this.load.image('bg_ground_dash', 'assets/bg_ground_dash@3x.png');

	    	this.load.image('title', 'assets/title@3x.png');

	    	this.load.image('startButton', 'assets/start-button@3x.png');

	    	this.load.spritesheet('pipe', 'assets/pipes@3x.png', 54*3,320*3,2);
	    	this.load.spritesheet('crate', 'assets/crate@3x.png');

		 	this.load.image('restart', 'assets/restart@3x.png');

		 	this.load.spritesheet('cha_dash', 'assets/cha_dash@3x.png', 34*3, 24*3, 3);
		 	this.load.spritesheet('cha_flappy', 'assets/cha_flappy@3x.png', 34*3, 24*3, 3);

		 	this.load.image('block', 'assets/block@3x.png');

		}
		else if(window.devicePixelRatio >= 2)
		{

	    	this.load.image('bg_ground_flappy', 'assets/bg_ground_flappy@2x.png');
	    	this.load.image('bg_ground_dash', 'assets/bg_ground_dash@2x.png');

	    	this.load.image('title', 'assets/title@2x.png');

	    	this.load.image('startButton', 'assets/start-button@2x.png');

	    	this.load.spritesheet('pipe', 'assets/pipes@2x.png', 54*2,320*2,2);
	    	this.load.spritesheet('crate', 'assets/crate@2x.png');

		 	this.load.image('restart', 'assets/restart@2x.png');

		 	this.load.spritesheet('cha_dash', 'assets/cha_dash@2x.png', 34*2, 24*2, 3);
		 	this.load.spritesheet('cha_flappy', 'assets/cha_flappy@2x.png', 34*2, 24*2, 3);

		 	this.load.image('block', 'assets/block@2x.png');

		}
		else 
		{

		    this.load.image('bg_ground_flappy', 'assets/bg_ground_flappy.png');
		    this.load.image('bg_ground_dash', 'assets/bg_ground_dash.png');

		    this.load.image('title', 'assets/title.png');

		    this.load.image('startButton', 'assets/start-button.png');

		    this.load.spritesheet('pipe', 'assets/pipes.png', 54,320,2);
		    this.load.spritesheet('crate', 'assets/crate.png');

		 	this.load.image('restart', 'assets/restart.png');

		 	this.load.spritesheet('cha_dash', 'assets/cha_dash.png', 34, 24, 3);
		 	this.load.spritesheet('cha_flappy', 'assets/cha_flappy.png', 34, 24, 3);

		 	this.load.image('block', 'assets/block.png');
		} 

		this.load.audio('flap', 'assets/flap.wav');
		this.load.audio('hit', 'assets/hit.wav');
	},

	create: function(){
		this.game.state.start("GameTitle");
		//this.game.state.start("Main");
	}
}