BasicGame.Preload = function(game){};

BasicGame.Preload.prototype = {

	preload: function(){ 


		this.kingslLogo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'kingsl_logo');
		this.kingslLogo.anchor.setTo(0.5);

		this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.height * 0.8, 'loadingBar');
		this.preloadBar.anchor.setTo(0.5);
		this.load.setPreloadSprite(this.preloadBar);

		this.load.bitmapFont('flappyfont', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');  

		//this.load.audio('flap', 'assets/flap.wav');
		//this.load.audio('hit', 'assets/hit.wav');

        this.load.audio('gameplay', 'assets/audio/game.mp3');
        this.load.audio('mainmenu', 'assets/audio/menu.mp3');

        this.load.audio('bubble', 'assets/audio/bubble.mp3');
        this.load.audio('button', 'assets/audio/button.wav');
        this.load.audio('die', 'assets/audio/die.mp3');
        this.load.audio('fly', 'assets/audio/fly.mp3');
        this.load.audio('vampjump', 'assets/audio/jump.wav');
        this.load.audio('spawn', 'assets/audio/spawn.mp3');
        this.load.audio('transform', 'assets/audio/transform.mp3');
        this.load.audio('stageclear', 'assets/audio/stageclear.mp3');

		if(window.devicePixelRatio >= 3)
        {
            this.load.image('bg_sky', 'assets/bg_sky.png');
            this.load.image('bg_castle', 'assets/bg_castle.png');
            this.load.image('bg_cloud', 'assets/bg_cloud.png');

            this.load.image('title', 'assets/title@3.png');
            this.load.image('title_gameOver', 'assets/gameover@3.png');
            this.load.image('title_stageClear', 'assets/stageclear@3.png');

            this.load.image('copyrights', 'assets/copyrights@3.png');

            this.load.image('tuto1', 'assets/tuto1@3.png');
            this.load.image('tuto2', 'assets/tuto2@3.png');

            this.load.spritesheet('cha_vamp', 'assets/cha_vamp@3.png', 50*3, 75*3, 3);
            this.load.spritesheet('cha_bat', 'assets/cha_bat@3.png', 250, 230, 3);

            this.load.spritesheet('alphago', 'assets/alphago@3.png', 328, 356, 3);

            this.load.image('btn_start', 'assets/PresstoStart@3.png');
            this.load.image('btn_maplist', 'assets/btn_maplist@3.png');
            this.load.image('btn_mapeditor', 'assets/btn_mapeditor@3.png');
            this.load.image('btn_infinity', 'assets/btn_infinitymode@3.png');
            this.load.image('btn_story', 'assets/storymode@3.png');

            this.load.image('btn_menu', 'assets/btn_menu@3.png');
            this.load.image('btn_replay', 'assets/btn_replay@3.png');
            this.load.image('btn_next', 'assets/btn_next@3.png');

            this.load.image('blood', 'assets/blood@3.png');
            this.load.spritesheet('blood_eat', 'assets/blood_eat.png', 47, 47, 4);

            this.load.image('blood_highlight', 'assets/bloodhighlight@3.png');
            this.load.image('blood_guage', 'assets/bloodguage@3.png');
            this.load.image('blood_bar', 'assets/bloodbar@3.png');

            this.load.image('endpoint', 'assets/endpoint@3.png');

            this.load.image('trap', 'assets/trap@3.png');

            this.load.spritesheet('transform', 'assets/transform.png', 66, 66, 6);

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

            this.load.spritesheet('fx_death', 'assets/fx_death.png', 110, 110, 16);
            this.load.spritesheet('fx_spawn', 'assets/FX_spawn@2.png', 200, 375, 13);
            this.load.spritesheet('fx_run', 'assets/FX_run@3.png', 150, 75, 8);

            this.load.image('banner_ai', 'assets/aibanner@3.png');
            this.load.image('banner_level', 'assets/levelbanner@3.png');
            this.load.image('banner_main', 'assets/mainbanner@3.png');
            this.load.image('btn_ai', 'assets/btn_ai@3.png');
            this.load.image('btn_levelmenu', 'assets/btn_levelmenu@3.png');
            this.load.image('challengeai', 'assets/challengeai@3.png');

            // UI resources
            this.load.image('level-box', 'assets/level_button@3.png');
            this.load.image('level-box-locked', 'assets/level_button_locked@3.png');
            this.load.image('nav_arrow', 'assets/nav_arrow@3.png');
            this.load.image('nav_on', 'assets/nav_on@3.png');
            this.load.image('nav_off', 'assets/nav_off@3.png');


        }
        else if(window.devicePixelRatio == 2)
        {

            this.load.image('bg_sky', 'assets/bg_sky.png');
            this.load.image('bg_castle', 'assets/bg_castle.png');
            this.load.image('bg_cloud', 'assets/bg_cloud.png');

            this.load.image('title', 'assets/title@2.png');
            this.load.image('title_gameOver', 'assets/gameover@2.png');
            this.load.image('title_stageClear', 'assets/stageclear@2.png');

            this.load.image('copyrights', 'assets/copyrights@2.png');

            this.load.image('tuto1', 'assets/tuto1@2.png');
            this.load.image('tuto2', 'assets/tuto2@2.png');

            this.load.spritesheet('cha_vamp', 'assets/cha_vamp@2.png', 50*2, 75*2, 3);
            this.load.spritesheet('cha_bat', 'assets/cha_bat@2.png', 166, 153, 3);

            this.load.spritesheet('alphago', 'assets/alphago@2.png', 218, 238, 3);

            this.load.image('btn_start', 'assets/PresstoStart@2.png');
            this.load.image('btn_maplist', 'assets/btn_maplist@2.png');
            this.load.image('btn_mapeditor', 'assets/btn_mapeditor@2.png');
            this.load.image('btn_infinity', 'assets/btn_infinitymode@2.png');
            this.load.image('btn_story', 'assets/storymode@2.png');

            this.load.image('btn_menu', 'assets/btn_menu@2.png');
            this.load.image('btn_replay', 'assets/btn_replay@2.png');
            this.load.image('btn_next', 'assets/btn_next@2.png');

            this.load.image('blood', 'assets/blood@2.png');
            this.load.spritesheet('blood_eat', 'assets/blood_eat.png', 47, 47, 4);

            this.load.image('blood_highlight', 'assets/bloodhighlight@2.png');
            this.load.image('blood_guage', 'assets/bloodgauge@2.png');
            this.load.image('blood_bar', 'assets/bloodbar@2.png');

            this.load.image('endpoint', 'assets/endpoint@2.png');

            this.load.image('trap', 'assets/trap@2.png');

            this.load.spritesheet('transform', 'assets/transform.png', 66, 66, 6);

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

            this.load.spritesheet('fx_death', 'assets/fx_death.png', 110, 110, 16);
            this.load.spritesheet('fx_spawn', 'assets/FX_spawn@2.png', 200, 375, 13);
            this.load.spritesheet('fx_run', 'assets/FX_run@2.png', 100, 50, 8);

            this.load.image('banner_ai', 'assets/aibanner@2.png');
            this.load.image('banner_level', 'assets/levelbanner@2.png');
            this.load.image('banner_main', 'assets/mainbanner@2.png');
            this.load.image('btn_ai', 'assets/btn_ai@2.png');
            this.load.image('btn_levelmenu', 'assets/btn_levelmenu@2.png');
            this.load.image('challengeai', 'assets/challengeai@2.png');

            // UI resources
            this.load.image('level-box', 'assets/level_button@2.png');
            this.load.image('level-box-locked', 'assets/level_button_locked@2.png');
            this.load.image('nav_arrow', 'assets/nav_arrow@2.png');
            this.load.image('nav_on', 'assets/nav_on@2.png');
            this.load.image('nav_off', 'assets/nav_off@2.png');


        }
        else 
        {
            this.load.image('bg_sky', 'assets/bg_sky.png');
            this.load.image('bg_castle', 'assets/bg_castle.png');
            this.load.image('bg_cloud', 'assets/bg_cloud.png');
            //this.load.image('bg_sky_bat', 'assets/bg_ground_bat.png');

            this.load.image('title', 'assets/title.png');
            this.load.image('title_gameOver', 'assets/gameover.png');
            this.load.image('title_stageClear', 'assets/stageclear.png');

            this.load.image('copyrights', 'assets/copyrights.png');

            this.load.image('tuto1', 'assets/tuto1.png');
            this.load.image('tuto2', 'assets/tuto2.png');

            this.load.spritesheet('cha_vamp', 'assets/cha_vamp.png', 50, 75, 3);
            this.load.spritesheet('cha_bat', 'assets/cha_bat.png', 83, 77, 3);

            this.load.spritesheet('alphago', 'assets/alphago.png', 109, 119, 3);

            this.load.image('btn_start', 'assets/PresstoStart.png');
            this.load.image('btn_maplist', 'assets/btn_maplist.png');
            this.load.image('btn_mapeditor', 'assets/btn_mapeditor.png');
            this.load.image('btn_infinity', 'assets/btn_infinitymode.png');
            this.load.image('btn_story', 'assets/storymode.png');

            this.load.image('btn_menu', 'assets/btn_menu.png');
            this.load.image('btn_replay', 'assets/btn_replay.png');
            this.load.image('btn_next', 'assets/btn_next.png');

            this.load.image('blood', 'assets/blood.png');
            this.load.spritesheet('blood_eat', 'assets/blood_eat.png', 47, 47, 4);

            this.load.image('blood_highlight', 'assets/bloodhighlight.png');
            this.load.image('blood_guage', 'assets/bloodgauge.png');
            this.load.image('blood_bar', 'assets/bloodbar.png');

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

            this.load.image('banner_ai', 'assets/aibanner.png');
            this.load.image('banner_level', 'assets/levelbanner.png');
            this.load.image('banner_main', 'assets/mainbanner.png');
            this.load.image('btn_ai', 'assets/btn_ai.png');
            this.load.image('btn_levelmenu', 'assets/btn_levelmenu.png');
            this.load.image('challengeai', 'assets/challengeai.png');

             // UI resources
            this.load.image('level-box', 'assets/level_button.png');
            this.load.image('level-box-locked', 'assets/level_button_locked.png');
            this.load.image('nav_arrow', 'assets/nav_arrow.png');
            this.load.image('nav_on', 'assets/nav_on.png');
            this.load.image('nav_off', 'assets/nav_off.png');


        } 
		var originalImageWidth;
		if(window.devicePixelRatio >= 3)
		{
	    	
		 	originalImageWidth = 47 * 3;
		}
		else if(window.devicePixelRatio == 2)
		{


		 	originalImageWidth = 47 * 2;
		}
		else 
		{

		 	originalImageWidth = 47;
		} 

		BasicGame.globalGameWidth = this.game.width;
		BasicGame.globalGameHeight = this.game.height;

		// get right width
		BasicGame.blockSize = this.game.height/8.0;
		BasicGame.blockSpriteScale = (BasicGame.blockSize / originalImageWidth) * 1.1;

        // how many spage do we have before stage start!
		BasicGame.preStageUnits = this.game.width / (BasicGame.blockSize * 1.0);
	},

	create: function(){

        if (window.localStorage.instantPlay == 1){
            window.localStorage.instantPlay = 0;
            this.game.state.start("Main");
        }
        else {
            this.game.state.start("GameTitle");
        }
		
	},
}