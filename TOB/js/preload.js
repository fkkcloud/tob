BasicGame.Preload = function(game){};

BasicGame.Preload.prototype = {

	preload: function(){ 

		this.load.bitmapFont('flappyfont', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');  

		var originalImageWidth;

		this.load.image('fullButton', 'assets/full_screen.png');

		if(window.devicePixelRatio >= 3)
		{
	    	this.load.image('bg_sky_vamp', 'assets/bg_ground_vamp@3.png');
	    	//this.load.image('bg_sky_bat', 'assets/bg_ground_bat@3x.png');

	    	this.load.image('title', 'assets/title@3.png');

	    	this.load.image('startButton', 'assets/start-button@x.png');

		 	this.load.image('restart', 'assets/restart@3.png');

		 	this.load.spritesheet('cha_vamp', 'assets/cha_vamp@3.png', 50*3, 75*3, 3);
		 	//this.load.spritesheet('cha_bat', 'assets/cha_bat@3x.png', 34*3, 24*3, 3);

		 	this.load.image('blood', 'assets/blood@3.png');

			this.load.image('open_all', 'assets/open_all@3.png');
			this.load.image('open_none', 'assets/open_none@3.png');

			this.load.image('open_down', 'assets/open_down@3.png');
			this.load.image('open_down_left', 'assets/open_down_left@3.png');
			this.load.image('open_down_right', 'assets/open_down_right@3.png');
			this.load.image('open_down_left_right', 'assets/open_down_left_right@3.png');

			this.load.image('open_left', 'assets/open_left@3.png');
			this.load.image('open_right', 'assets/open_right@3.png');
			this.load.image('open_left_right', 'assets/open_left_right@3.png');

			this.load.image('open_up', 'assets/open_up@3.png');
			this.load.image('open_up_down', 'assets/open_up_down@3.png');
			this.load.image('open_up_down_left', 'assets/open_up_down_left@3.png');
			this.load.image('open_up_down_right', 'assets/open_up_down_right@3.png');
			this.load.image('open_up_left_right', 'assets/open_up_left_right@3.png');
			this.load.image('open_up_left', 'assets/open_up_left@3.png');
			this.load.image('open_up_right', 'assets/open_up_right@3.png');

			this.load.spritesheet('fx_death', 'assets/FX_die@3.png', 220, 275, 10);
			this.load.spritesheet('fx_spawn', 'assets/FX_spawn@3.png', 400, 750, 12);
			this.load.spritesheet('fx_run', 'assets/FX_run@3.png', 150, 75, 8);

		 	originalImageWidth = 47 * 3;
		}
		else if(window.devicePixelRatio >= 2)
		{

	    	this.load.image('bg_sky_vamp', 'assets/bg_ground_vamp@2.png');
	    	//this.load.image('bg_sky_bat', 'assets/bg_ground_bat@2x.png');

	    	this.load.image('title', 'assets/title@2.png');

	    	this.load.image('startButton', 'assets/start-button@2.png');

		 	this.load.image('restart', 'assets/restart@2.png');

		 	this.load.spritesheet('cha_vamp', 'assets/cha_vamp@2.png', 50*2, 75*2, 3);
		 	//this.load.spritesheet('cha_bat', 'assets/cha_bat@2x.png', 34*2, 24*2, 3);

		 	this.load.image('blood', 'assets/blood@2.png');

		 	this.load.image('open_all', 'assets/open_all@2.png');
			this.load.image('open_none', 'assets/open_none@2.png');

			this.load.image('open_down', 'assets/open_down@2.png');
			this.load.image('open_down_left', 'assets/open_down_left@2.png');
			this.load.image('open_down_right', 'assets/open_down_right@2.png');
			this.load.image('open_down_left_right', 'assets/open_down_left_right@2.png');
			
			this.load.image('open_left', 'assets/open_left@2.png');
			this.load.image('open_right', 'assets/open_right@2.png');
			this.load.image('open_left_right', 'assets/open_left_right@2.png');

			this.load.image('open_up', 'assets/open_up@2.png');
			this.load.image('open_up_down', 'assets/open_up_down@2.png');
			this.load.image('open_up_down_left', 'assets/open_up_down_left@2.png');
			this.load.image('open_up_down_right', 'assets/open_up_down_right@2.png');
			this.load.image('open_up_left_right', 'assets/open_up_left_right@2.png');
			this.load.image('open_up_left', 'assets/open_up_left@2.png');
			this.load.image('open_up_right', 'assets/open_up_right@2.png');

			this.load.spritesheet('fx_death', 'assets/FX_die@2.png', 146, 183, 10);
			this.load.spritesheet('fx_spawn', 'assets/FX_spawn@2.png', 266, 500, 12);
			this.load.spritesheet('fx_run', 'assets/FX_run@2.png', 100, 50, 8);

		 	originalImageWidth = 47 * 2;
		}
		else 
		{
		    this.load.image('bg_sky_vamp', 'assets/bg_ground_vamp.png');
		    //this.load.image('bg_sky_bat', 'assets/bg_ground_bat.png');

		    this.load.image('title', 'assets/title.png');

		    this.load.image('startButton', 'assets/start-button.png');

		 	this.load.image('restart', 'assets/restart.png');

		 	this.load.spritesheet('cha_vamp', 'assets/cha_vamp.png', 50, 75, 3);
		 	//this.load.spritesheet('cha_bat', 'assets/cha_bat.png', 34, 24, 3);

		 	this.load.image('blood', 'assets/blood.png');

		 	this.load.image('open_all', 'assets/open_all.png');
			this.load.image('open_none', 'assets/open_none.png');

			this.load.image('open_down', 'assets/open_down.png');
			this.load.image('open_down_left', 'assets/open_down_left.png');
			this.load.image('open_down_right', 'assets/open_down_right.png');
			this.load.image('open_down_left_right', 'assets/open_down_left_right.png');
			
			this.load.image('open_left', 'assets/open_left.png');
			this.load.image('open_right', 'assets/open_right.png');
			this.load.image('open_left_right', 'assets/open_left_right.png');

			this.load.image('open_up', 'assets/open_up.png');
			this.load.image('open_up_down', 'assets/open_up_down.png');
			this.load.image('open_up_down_left', 'assets/open_up_down_left.png');
			this.load.image('open_up_down_right', 'assets/open_up_down_right.png');
			this.load.image('open_up_left_right', 'assets/open_up_left_right.png');
			this.load.image('open_up_left', 'assets/open_up_left.png');
			this.load.image('open_up_right', 'assets/open_up_right.png');

			this.load.spritesheet('fx_death', 'assets/FX_die.png', 72, 91, 10);
			this.load.spritesheet('fx_spawn', 'assets/FX_spawn.png', 133, 250, 12);
			this.load.spritesheet('fx_run', 'assets/FX_run.png', 50, 25, 8);

		 	originalImageWidth = 47;
		} 

		// get right width
		BasicGame.blockSize = this.game.height/8.0;
		BasicGame.blockSpriteScale = (BasicGame.blockSize / originalImageWidth) * 1.1;

		BasicGame.preStageUnits = this.game.width/ (BasicGame.blockSize * 1.0);
		console.log('preStageInit:', BasicGame.preStageUnits);

		this.load.audio('flap', 'assets/flap.wav');
		this.load.audio('hit', 'assets/hit.wav');
	},

	create: function(){
		this.game.state.start("GameTitle");
		//this.game.state.start("Main");
	}
}