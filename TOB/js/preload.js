BasicGame.Preload = function(game){};

BasicGame.Preload.prototype = {

	preload: function(){ 

		this.kingslLogo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'kingsl_logo');
		this.kingslLogo.anchor.setTo(0.5);

		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.height * 0.8, 'loadingBar');
		this.preloadBar.anchor.setTo(0.5);
		this.load.setPreloadSprite(this.preloadBar);

		this.load.bitmapFont('flappyfont', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');  

		var originalImageWidth;

		if(window.devicePixelRatio >= 3)
		{
	    	this.load.image('bg_sky', 'assets/bg_sky@3.png');
	    	this.load.image('bg_castle', 'assets/bg_castle@3.png');

	    	this.load.image('title', 'assets/title@3.png');
	    	this.load.image('title_gameOver', 'assets/gameover@3.png');

	    	this.load.image('copyrights', 'assets/copyrights@3.png');

	    	this.load.image('startButton', 'assets/start-button@x.png');

		 	this.load.image('restart', 'assets/restart@3.png');

		 	this.load.spritesheet('cha_vamp', 'assets/cha_vamp@3.png', 50*3, 75*3, 3);
		 	this.load.spritesheet('cha_bat', 'assets/cha_bat@3.png', 225, 250, 3);

		 	this.load.image('btn_story', 'assets/btn_storymode@3.png');
		 	this.load.image('btn_maplist', 'assets/btn_maplist@3.png');
		 	this.load.image('btn_mapeditor', 'assets/btn_mapeditor@3.png');
		 	this.load.image('btn_option', 'assets/btn_option@3.png');

		 	this.load.image('btn_menu', 'assets/btn_menu@3.png');
		 	this.load.image('btn_replay', 'assets/btn_replay@3.png');

		 	this.load.image('blood', 'assets/blood@3.png');
		 	this.load.spritesheet('blood_eat', 'assets/blood_eat@3.png', 141, 141, 4);
		 	this.load.spritesheet('blood_fill', 'assets/blood_fill@3.png', 110, 110, 12);

		 	this.load.image('endpoint', 'assets/endpoint@3.png');

		 	this.load.image('trap', 'assets/trap@3.png');

		 	this.load.spritesheet('transform', 'assets/transform@3.png', 200, 200, 6);

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

			this.load.spritesheet('fx_death', 'assets/fx_death@3.png', 330, 330, 16);
			this.load.spritesheet('fx_spawn', 'assets/FX_spawn@3.png', 300, 563, 13);
			this.load.spritesheet('fx_run', 'assets/FX_run@3.png', 150, 75, 8);

		 	originalImageWidth = 47 * 3;
		}
		else if(window.devicePixelRatio == 2)
		{

	    	this.load.image('bg_sky', 'assets/bg_sky@2.png');
	    	this.load.image('bg_castle', 'assets/bg_castle@2.png');

	    	this.load.image('title', 'assets/title@2.png');
	    	this.load.image('title_gameOver', 'assets/gameover@2.png');

	    	this.load.image('copyrights', 'assets/copyrights@2.png');

	    	this.load.image('startButton', 'assets/start-button@2.png');

		 	this.load.image('restart', 'assets/restart@2.png');

		 	this.load.spritesheet('cha_vamp', 'assets/cha_vamp@2.png', 50*2, 75*2, 3);
		 	this.load.spritesheet('cha_bat', 'assets/cha_bat@2.png', 149, 166, 3);

		 	this.load.image('btn_story', 'assets/btn_storymode@2.png');
		 	this.load.image('btn_maplist', 'assets/btn_maplist@2.png');
		 	this.load.image('btn_mapeditor', 'assets/btn_mapeditor@2.png');
		 	this.load.image('btn_option', 'assets/btn_option@2.png');

		 	this.load.image('btn_menu', 'assets/btn_menu@2.png');
		 	this.load.image('btn_replay', 'assets/btn_replay@2.png');

		 	this.load.image('blood', 'assets/blood@2.png');
		 	this.load.spritesheet('blood_eat', 'assets/blood_eat@2.png', 94, 94, 4);
		 	this.load.spritesheet('blood_fill', 'assets/blood_fill@2.png', 73, 73, 12);

		 	this.load.image('endpoint', 'assets/endpoint@2.png');

		 	this.load.image('trap', 'assets/trap@2.png');

		 	this.load.spritesheet('transform', 'assets/transform@2.png', 133, 133, 6);

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

			this.load.spritesheet('fx_death', 'assets/fx_death@2.png', 220, 220, 16);
			this.load.spritesheet('fx_spawn', 'assets/FX_spawn@2.png', 200, 375, 13);
			this.load.spritesheet('fx_run', 'assets/FX_run@2.png', 100, 50, 8);

		 	originalImageWidth = 47 * 2;
		}
		else 
		{
		    this.load.image('bg_sky', 'assets/bg_sky.png');
		    this.load.image('bg_castle', 'assets/bg_castle.png');
		    //this.load.image('bg_sky_bat', 'assets/bg_ground_bat.png');

		    this.load.image('title', 'assets/title.png');
		    this.load.image('title_gameOver', 'assets/gameover.png');

		    this.load.image('copyrights', 'assets/copyrights.png');

		    this.load.image('startButton', 'assets/start-button.png');

		 	this.load.image('restart', 'assets/restart.png');

		 	this.load.spritesheet('cha_vamp', 'assets/cha_vamp.png', 50, 75, 3);
		 	this.load.spritesheet('cha_bat', 'assets/cha_bat.png', 74, 83, 3);

		 	this.load.image('btn_story', 'assets/btn_storymode.png');
		 	this.load.image('btn_maplist', 'assets/btn_maplist.png');
		 	this.load.image('btn_mapeditor', 'assets/btn_mapeditor.png');
		 	this.load.image('btn_option', 'assets/btn_option.png');

		 	this.load.image('btn_menu', 'assets/btn_menu.png');
		 	this.load.image('btn_replay', 'assets/btn_replay.png');

		 	this.load.image('blood', 'assets/blood.png');
		 	this.load.spritesheet('blood_eat', 'assets/blood_eat.png', 47, 47, 4);
		 	this.load.spritesheet('blood_fill', 'assets/blood_fill.png', 36, 36, 12);

		 	this.load.image('endpoint', 'assets/endpoint.png');

		 	this.load.image('trap', 'assets/trap.png');

		 	this.load.spritesheet('transform', 'assets/transform.png', 66, 66, 6);

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

			this.load.spritesheet('fx_death', 'assets/fx_death.png', 110, 110, 16);
			this.load.spritesheet('fx_spawn', 'assets/FX_spawn.png', 100, 188, 13);
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
		console.log('window.localStorage.instantPlay',window.localStorage.instantPlay);
		if (window.localStorage.instantPlay == 1){
			window.localStorage.instantPlay = 0;
			this.game.state.start("Main");
		}
		else {
			this.game.state.start("GameTitle");
		}
	}
}