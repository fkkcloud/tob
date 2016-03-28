BasicGame = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: false,

    /* Your game can check BasicGame.orientated in internal loops to know if it should pause or not */
    orientated: false,

    blockSize: 0,
    preStageUnits: 0,

    mapData: [],

    blockSpriteScale: 1,

    isGameInit: false,

    mapspeed: 1,

    jumpscale: 1,

    ui_level_screen: undefined,
    ui_dialog_complete: undefined,

};

BasicGame.Boot = function(game){

};
  
BasicGame.Boot.prototype = {

	init: function(){
		this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //this.scale.setMinMax(375, 667, 750, 1334);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //this.scale.setMinMax(667, 375, 1334, 750);
            this.scale.pageAlignHorizontally = false;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }

	},

	preload: function(){
        this.load.image('loadingBar', 'assets/bar.png');
        
        if(window.devicePixelRatio >= 3)
            this.load.image('kingsl_logo', 'assets/kingsl_logo@3.png');
        else if(window.devicePixelRatio >= 2)
            this.load.image('kingsl_logo', 'assets/kingsl_logo@2.png');
        else
            this.load.image('kingsl_logo', 'assets/kingsl_logo.png');

        // UI resources
        //this.load.image('assets/img/level-box.png', 'assets/img/level-box.png');
        this.load.image('level-box', 'assets/level_button.png');
        //this.load.image('level-box-locked', 'assets/level_button_locked.png');
        
        //Note that you need to call fixCache here to fix compatibility issue
        //this is temporary fix, it will be replaced with a specific EZGUI Loader
        this.load.onLoadComplete.add(EZGUI.Compatibility.fixCache, this.load, null, null);
	},
	
  	create: function(){
		//this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		
		this.game.state.start("Preload");
	},

    gameResized: function (width, height) {

        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device or resizing the browser window.
        //  Note that this callback is only really useful if you use a ScaleMode of RESIZE and place it inside your main game state.
        
    },

    enterIncorrectOrientation: function () {

        BasicGame.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        BasicGame.orientated = true;

        document.getElementById('orientation').style.display = 'none';
    }

}